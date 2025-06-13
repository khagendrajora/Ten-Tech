import React, { useState } from 'react'
import { forgetpassword } from '../components/auth'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

const ForgetPassword = () => {
    const [email, setEmail] = useState('')

    const handleSubmit = e => {
        e.preventDefault()
        forgetpassword({ email })
            .then(data => {
                if (data.error) {
                    console.log(data.error)
                }
                else {
                    setEmail('')
                    toast.success("Reset Link send to Email")
                }
            })
            .catch(err => console.log(err))
    }
    return (
        <>
            <ToastContainer theme='colored' position='top-right' />
            <div className='container my-5'>
                <div className='row d-flex justify-content-center'>
                    <div className="col-md-5">
                        <form className='shadow p-3'>
                            <h2 className='text-center text-muted'>
                                Forget Password
                            </h2>
                            <div className="mb-2">
                                <label htmlfor="email">Email</label>
                                <input type='email' name='email' id='email' className='form-control'
                                    value={email} onChange={e => setEmail(e.target.value)} />
                            </div>
                            <div className="mb-2">
                                <button className='btn btn-primary'
                                    onClick={handleSubmit}>Send Password reset link</button>
                            </div>

                        </form>
                    </div>
                </div>
            </div>

        </>
    )
}

export default ForgetPassword