import React, { use } from 'react';
import { Link } from 'react-router';
import { AuthContext } from '../../Auth/AuthContext';
import useUserAxios from '../../Sheard/useUserAxios';

const Login = () => {

    const { handleSign, user,GoogleLogin } = use(AuthContext)
    const userAxios =useUserAxios()

    console.log(user)

    const handleLoginPass = (e) => {
        e.preventDefault()
        const form = e.target
        const email = form.email.value
        const password = form.password.value
        console.log(email, password)
        handleSign(email, password)
            .then(res => console.log(res))
            .catch(error => console.log(error))


    }

    const handelSocialLogin = () => {

        GoogleLogin()
            .then(async (res) => {

                const email = res.user.email
                const name = res.user.displayName
                const userInfo = {
                    email: email,
                    name: name,
                    role: 'user',
                    create_at: new Date().toISOString(),
                    Last_Login: new Date().toISOString()
                }


                try {
                    const res = await userAxios.post('/users', userInfo)

                    console.log(res.data)
                }
                catch {
                    error => console.log('user error ', error)
                }


            })
            .catch(error => console.log(error))
    }





    return (
        <div className="w-full   p-8 space-y-3 rounded-l-xl bg-gray-100  ">
            <h1 className="text-2xl font-bold text-center">Login</h1>
            <form onSubmit={handleLoginPass} className="space-y-6">
                <div className="space-y-1 text-sm">
                    <label htmlFor="email" className="block  ">email</label>
                    <input type="email" name="email" id="email" placeholder="email" className="w-full px-4 py-3 rounded-md border border-gray-300 " />
                </div>
                <div className="space-y-1 text-sm">
                    <label htmlFor="password" className="block  ">Password</label>
                    <input type="password" name="password" id="password" placeholder="Password" className="w-full px-4 py-3 rounded-md border border-gray-300 " />
                    <div className="flex justify-end text-xs  ">
                        <a rel="noopener noreferrer" href="#">Forgot Password?</a>
                    </div>
                </div>
                <button className=" text-white w-full p-3 text-center rounded-sm bg-[#CAEB66] ">Sign in</button>
            </form>
            <div className="flex items-center pt-4 space-x-1">
                <div className="flex-1 h-px sm:w-16  "></div>
                <p className="px-3 text-sm  ">Login with social accounts</p>
                <div className="flex-1 h-px sm:w-16  "></div>
            </div>
            <div className="flex justify-center space-x-4">
                <button  onClick={handelSocialLogin} aria-label="Log in with Google" className="p-3 rounded-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="w-5 h-5 fill-current">
                        <path d="M16.318 13.714v5.484h9.078c-0.37 2.354-2.745 6.901-9.078 6.901-5.458 0-9.917-4.521-9.917-10.099s4.458-10.099 9.917-10.099c3.109 0 5.193 1.318 6.38 2.464l4.339-4.182c-2.786-2.599-6.396-4.182-10.719-4.182-8.844 0-16 7.151-16 16s7.156 16 16 16c9.234 0 15.365-6.49 15.365-15.635 0-1.052-0.115-1.854-0.255-2.651z"></path>
                    </svg>
                </button>

            </div>
            <p className="text-xs text-center sm:px-6 dark:text-gray-600">Don't have an account?
                <Link to={'/register'} className="underline dark:text-gray-800">Sign up</Link>
            </p>
        </div>
    );
};

export default Login;