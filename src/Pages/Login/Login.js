import { faHandsClapping } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { signinApi } from '../../Api/AuthApi';
import { saveToken, tokenDecode } from '../../Functions/AuthFunctions';
import Spinner from '../../components/Spinner';
import '../SignUp/SignUp';

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

            tokenDecode().then(data => {
                navigate(navigate(`/${data.role}-dashboard`))
                window.location.reload(true)
            })



        })
            .catch(err => setMessage(err))

    }
    return (
        <div className='flex flex-col items-center justify-center py-16'>

            <div className='text-center mb-10'>
                <FontAwesomeIcon className='text-amber-500 fa-2xl mb-5' icon={faHandsClapping} />
                <div className='text-4xl font-semibold mb-5'>Welcome Back</div>
                <div style={{ letterSpacing: "1px" }}>Please login to access your account</div>
            </div>


            <div className='shadow-lg p-5 md:p-10 rounded signup'>
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

                    <h3 className='text-sm mt-4 w-[90%] text-center'>New to QOC Learning? <Link to='/signup' className='text-secondary inline'>Create New Account</Link></h3>

                    {/* <div className="flex flex-col w-full border-opacity-50">

                        <div className="divider">OR</div>
                    </div> */}

                </form>
                {/* <button className='btn btn-outline w-full'>Continue With Google</button> */}
            </div>

            {spin ? <Spinner /> : ''}
        </div>
    );
};

export default Login;