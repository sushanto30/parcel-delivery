import React, { use, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import { AuthContext } from '../../Auth/AuthContext';
import useAxiosSecure from '../../hook/useAxiosSecure';


const generateTrackingId = () => {
  const date = new Date();
  const formattedDate = date.toISOString().slice(0, 10).replace(/-/g, ''); // 20250702
  const randomPart = Math.random().toString(36).substring(2, 6).toUpperCase(); // e.g., X8ZP
  return `TRK-${formattedDate}-${randomPart}`; // e.g., TRK-20250702-X8ZP
};


const AddParcels = () => {

    const {user}=use(AuthContext)
    const axiosSecure = useAxiosSecure()

    const { register, handleSubmit, watch, formState: { errors } } = useForm();

    // State to store division data
    const [division, setDivision] = useState([]);
    // Separate states for sender and receiver region selection
    const [selectSenderDivision, setSelectSenderDivision] = useState('');
    const [selectReceiverDivision, setSelectReceiverDivision] = useState('');

    // Watching the parcel type
    const type = watch('type');

    // Fetch division data on component mount
    useEffect(() => {
        fetch('/warehouses.json')
            .then(res => res.json())
            .then(data => setDivision(data));
    }, []);

    const regions = Array.from(new Set(division.map((item) => item.region)));

    // Get service centers based on selected region
    const getServiceCentersByRegion = (region) => {
        return division
            .filter((item) => item.region === region)
            .flatMap((item) => item.covered_area);
    };







    // Handle form submission
    const onSubmit = (data) => {
        const { type, weight, senderRegion, receiverRegion } = data;

        const isSameRegion = senderRegion === receiverRegion;
        const deliveryZone = isSameRegion ? "Within City" : "Outside District";

        const w = parseFloat(weight);
        let base = 0;
        let extra = 0;
        let note = "";

        // --- Base & Extra Calculation ---
        if (type === "document") {
            base = isSameRegion ? 60 : 80;
            note = "Flat rate for document delivery.";
        } else if (type === "non-document") {
            if (w <= 3) {
                base = isSameRegion ? 110 : 150;
                note = `Non-document up to 3kg (${deliveryZone})`;
            } else {
                base = isSameRegion ? 110 : 150;
                const extraWeight = w - 3;
                const perKg = extraWeight * 40;
                const outsideCharge = isSameRegion ? 0 : 40;
                extra = perKg + outsideCharge;

                note = `
        Non-document over 3kg (${deliveryZone})<br>
        ➤ 40 x ${extraWeight}kg = ৳${perKg}
        ${!isSameRegion ? "<br>➤ +৳40 for outside district delivery" : ""}
      `;
            }
        }

        const total = base + extra;

        // --- SweetAlert Breakdown ---
        Swal.fire({
            icon: 'info',
            title: 'Delivery Cost Breakdown',
            html: `
      <div style="text-align: left; font-size: 16px;">
        <p><strong>📦 Parcel Type:</strong> ${type}</p>
        <p><strong>⚖️ Weight:</strong> ${w} kg</p>
        <p><strong>🚚 Delivery Zone:</strong> ${deliveryZone}</p>
        <hr>
        <p><strong>💰 Base Cost:</strong> ৳${base}</p>
        <p><strong>➕ Extra Charges:</strong> ৳${extra}</p>
        <div style="background: #f9f9f9; padding: 8px; border-radius: 6px; margin-top: 6px;">
          <small>${note}</small>
        </div>
        <hr>
        <h3 style="color: green; font-size: 20px;"><strong>Total Cost: ৳${total}</strong></h3>
      </div>
    `,
            showCancelButton: true,
            confirmButtonText: '✅ Proceed to Payment',
            cancelButtonText: '✏️ Continue Editing',
            focusConfirm: false
        }).then((result) => {
            if (result.isConfirmed) {
                // যদি ইউজার "Proceed to Payment" ক্লিক করে
                const trackingId = generateTrackingId();
                const finalData = {
                    ...data,
                    cost: total,
                    trackingId,
                    created_by: user?.email,
                    payment_status: 'nuPaid',
                    delivery_status: 'not collected',
                    createdAt: new Date().toISOString()
                };

                console.log("Submitted Parcel Data:", finalData);
                axiosSecure.post('/addParcels',finalData)
                .then(res=>{
                    console.log(res.data)
                })
                .catch(error => console.log(error))

                // console.log("Submitted Parcel Data:", finalData);
                // এখানে API call বা অন্য প্রসেসিং করো
            } else {
                console.log("User chose to continue editing.");
            }
        });
    };


    return (
        <div className="max-w-5xl mx-auto p-6">
            <h1 className="text-3xl font-bold mb-2">Door to Door Parcel Delivery</h1>
            <p className="text-gray-600 mb-6">Fill out the form to schedule your pickup and delivery</p>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                {/* Parcel Info Section */}
                <div className="card bg-base-100 shadow p-6">
                    <h2 className="card-title mb-4">Parcel Info</h2>
                    <div className="flex items-center gap-6">
                        <label className="label cursor-pointer">
                            <span className="label-text">Document</span>
                            <input type="radio" value="document" {...register("type")} className="radio ml-2" />
                        </label>
                        <label className="label cursor-pointer">
                            <span className="label-text">Non-document</span>
                            <input type="radio" value="non-document" {...register("type")} className="radio ml-2" />
                        </label>
                    </div>
                    <input {...register("title", { required: true })} placeholder="Parcel Title" className="input input-bordered w-full mt-4" />
                    {type === "non-document" && (
                        <div className="mt-4">
                            <input
                                type="number"
                                step="0.1"
                                {...register("weight", { required: true })}
                                placeholder="Weight (kg)"
                                className="input input-bordered w-full"
                            />
                            {errors.weight && <p className="text-red-500 mt-1">Weight is required for non-documents</p>}
                        </div>
                    )}
                </div>

                {/* Sender and Receiver Info Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Sender Info */}
                    <div className="card bg-base-100 shadow p-6">
                        <h2 className="card-title mb-4">Sender Info</h2>
                        <input {...register("senderName", { required: true })} placeholder="Sender Name" className="input input-bordered w-full mb-2" />
                        <input {...register("senderContact", { required: true })} placeholder="Contact" className="input input-bordered w-full mb-2" />
                        <select {...register("senderRegion")} className="select select-bordered w-full mb-2" onChange={e => setSelectSenderDivision(e.target.value)}>
                            <option value="">Select Region</option>
                            {regions.map((region, ind) => <option key={ind} value={region}>{region}</option>)}
                        </select>
                        <select {...register("senderServiceCenter", { required: true })} className="select select-bordered w-full mb-2">
                            <option value="">Select Service Center</option>
                            {getServiceCentersByRegion(selectSenderDivision).map(center => <option key={center} value={center}>{center}</option>)}
                        </select>
                        <textarea {...register("senderAddress", { required: true })} placeholder="Address" className="textarea textarea-bordered w-full mb-2" />
                        <textarea {...register("pickupInstruction", { required: true })} placeholder="Pickup Instruction" className="textarea textarea-bordered w-full" />
                    </div>

                    {/* Receiver Info */}
                    <div className="card bg-base-100 shadow p-6">
                        <h2 className="card-title mb-4">Receiver Info</h2>
                        <input {...register("receiverName", { required: true })} placeholder="Receiver Name" className="input input-bordered w-full mb-2" />
                        <input {...register("receiverContact", { required: true })} placeholder="Contact" className="input input-bordered w-full mb-2" />
                        <select {...register("receiverRegion", { required: true })} className="select select-bordered w-full mb-2" onChange={e => setSelectReceiverDivision(e.target.value)}>
                            <option value="">Select Region</option>
                            {regions.map((region, ind) => <option key={ind} value={region}> {region}</option>)}
                        </select>
                        <select {...register("receiverServiceCenter")} className="select select-bordered w-full mb-2">
                            <option value="">Select Service Center</option>
                            {getServiceCentersByRegion(selectReceiverDivision).map(center => <option key={center} value={center}>{center}</option>)}
                        </select>
                        <textarea {...register("receiverAddress", { required: true })} placeholder="Address" className="textarea textarea-bordered w-full mb-2" />
                        <textarea {...register("deliveryInstruction", { required: true })} placeholder="Delivery Instruction" className="textarea textarea-bordered w-full" />
                    </div>
                </div>

                {/* Submit Button */}
                <div className="text-center">
                    <button type="submit" className="btn btn-primary px-6">
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddParcels;
