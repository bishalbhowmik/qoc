import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import '../SignUp/SignUp';
import { signinApi } from '../../Api/AuthApi';
import { saveToken } from '../../Functions/AuthFunctions';
import Spinner from '../../components/Spinner'

const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [message, setMessage] = useState('')
    const [spin, setSpin] = useState(false)

    const navigate = useNavigate();

    const handleLogin = (data) => {

        setSpin(true)
        signinApi(data).then(data => {
            
            setSpin(false)
            if (data.error) throw data.message

            setMessage(data.message)
            saveToken(data.value.token)
            navigate('/')
            window.location.reload(false)

        })
            .catch(err => setMessage(err))

    }
    return (
        <div className='flex flex-col items-center justify-center h-[100vh] bg-[#FAF8FF]'>
            <div className='shadow-lg p-10 rounded w-[500px] signup'>
                <form onSubmit={handleSubmit(handleLogin)}>
                    <h2 className='text-black text-center text-3xl'>Login</h2>
                    <div>
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input type="email" {...register("email", {
                            required: "This field is required"
                        })} name="email" className="input input-bordered w-full" />
                        {errors.email && <p>{errors.email?.message}</p>}
                    </div>


                    <div className='mb-4'>

                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <input type="password" {...register("password", {
                            required: "This field is required",
                            // minLength: { value: 6, message: 'Password must be 6 character long' }
                        })} name="password" className="input input-bordered w-full" />
                        {errors.password && <p>{errors.password?.message}</p>}

                    </div>

                    <div className='text-red-500'>

                    </div>

                    <button className='btn btn-accent w-full text-white'>Login</button>

                    <div className='my-4 text-center text-red-500'>{message}</div>

                    <h3 className='text-sm mt-4 w-[90%] text-center'>New to QOC Learning? <Link to='/signup' className='text-secondary'>Create New Account</Link></h3>

                    <div className="flex flex-col w-full border-opacity-50">

                        <div className="divider">OR</div>
                    </div>

                </form>
                <button className='btn btn-outline w-full'>Continue With Google</button>
            </div>

            {spin ? <Spinner /> : ''}
        </div>
    );
};

export default Login;