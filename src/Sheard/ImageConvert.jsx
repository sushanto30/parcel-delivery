 

export const imageConvert = async(photoURL)=>{

         console.log("IMGBB KEY:", import.meta.env.VITE_ApiKey);


        const fromData = new FormData()
        fromData.append( 'image' , photoURL )


        const result = await fetch(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_ApiKey}`, {
            method: 'POST',
            body: fromData
        })
        const imgDta = await result.json()
        const convertImg = imgDta.data?.url
        return convertImg 
        // console.log("✔️ Uploaded Image Info:", convertImg);



        // console.log(photoURL)
 }