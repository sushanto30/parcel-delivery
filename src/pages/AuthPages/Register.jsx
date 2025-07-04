import React, { use, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router';
import { AuthContext } from '../../Auth/AuthContext';
import { imageConvert } from '../../Sheard/ImageConvert';
import { updateProfile } from 'firebase/auth';


const Register = () => {

    const { handleRegisterWithPass } = use(AuthContext)
    const [images, setImages] = useState(null)


    const { register, handleSubmit } = useForm()

    const handleRegister = async (data) => {

        const email = data.email
        // const name = data.name
        const password = data.password
        const photoURL = data?.photo[0]
        const photo = await imageConvert(photoURL)
        setImages(photo)
        console.log('convet photo', photo)
        console.log(" namer:", data);

        try {
            const currentUser = await handleRegisterWithPass(email, password)
            //   

            const registerUser = currentUser.user

            await updateProfile(registerUser, {
                displayName: data.username,
                photoURL: photo

            })
            console.log("User:", currentUser,);

        }
        catch {
            error => console.error("Firebase Error:", error);

        }

        // console.log(data)
        // console.log(data.photo[0])




    }

    return (
        <div className="w-full   p-8 space-y-3 rounded-l-xl bg-gray-100  ">
            <h1 className="text-2xl font-bold text-center">Sign up</h1>
            <form onSubmit={handleSubmit(handleRegister)} className="space-y-6">
                <div className="space-y-1 text-sm flex flex-col  justify-center">
                    <div className="avatar">
                        {
                            images? <div className="w-12">
                            <img src={images} />
                        </div> : ''
                        }
                        
                    </div>
                    <div className=' '>
                        <input id='photo' className='border hidden' {...register('photo')} type="file" accept='image' />
                        <label
                            htmlFor="photo"
                            className="inline-block text-white px-6 py-2 rounded-lg cursor-pointer  bg-[#CAEB66] transition"
                        >
                            Upload Image
                        </label>
                    </div>
                </div>
                <div className="space-y-1 text-sm">
                    <label htmlFor="username" className="block  ">Username</label>
                    <input type="text" name="username" {...register('username')} id="username" placeholder="Username" className="w-full px-4 py-3 rounded-md border border-gray-300 " />
                </div>
                <div className="space-y-1 text-sm">
                    <label htmlFor="email" className="block  ">Email</label>
                    <input type="email" name="email" {...register('email')} id="email" placeholder="email" className="w-full px-4 py-3 rounded-md border border-gray-300 " />
                </div>
                <div className="space-y-1 text-sm">
                    <label htmlFor="password" className="block  ">Password</label>
                    <input type="password" name="password" {...register('password')} id="password" placeholder="Password" className="w-full px-4 py-3 rounded-md border border-gray-300 " />

                </div>
                <button className=" text-white w-full p-3 text-center rounded-sm bg-[#CAEB66] ">Sign up</button>
            </form>
            <div className="flex items-center pt-4 space-x-1">
                <div className="flex-1 h-px sm:w-16  "></div>
                <p className="px-3 text-sm  ">Sign up with social accounts</p>
                <div className="flex-1 h-px sm:w-16  "></div>
            </div>
            <div className="flex justify-center space-x-4">
                <button aria-label="Log in with Google" className="p-3 rounded-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="w-5 h-5 fill-current">
                        <path d="M16.318 13.714v5.484h9.078c-0.37 2.354-2.745 6.901-9.078 6.901-5.458 0-9.917-4.521-9.917-10.099s4.458-10.099 9.917-10.099c3.109 0 5.193 1.318 6.38 2.464l4.339-4.182c-2.786-2.599-6.396-4.182-10.719-4.182-8.844 0-16 7.151-16 16s7.156 16 16 16c9.234 0 15.365-6.49 15.365-15.635 0-1.052-0.115-1.854-0.255-2.651z"></path>
                    </svg>
                </button>

            </div>
            <p className="text-xs text-center sm:px-6 dark:text-gray-600">Already have an account?
                <Link to={'/login'} className="underline dark:text-gray-800">Sign In</Link>
            </p>
        </div>
    );
};

export default Register;