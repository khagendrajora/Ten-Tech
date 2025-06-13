import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { API } from '../Config/config'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { Nav } from '../components/Nav'

const UserDetail = () => {
    const navigate = useNavigate()
    const [user, setUser] = useState([])
    const params = useParams()
    useEffect(() => {
        const id = params.user_id
        axios.get(`${API}/userdetail/${id}`, {
            method: 'POST',
            headers: {
                Accept: "application.json",
                'Content-Type': 'application/json'
            },
        })
            .then(res => setUser(res.data))
            .catch(err => console.log(err))
    }, [params.user_id])

    const userEdit = id => {
        navigate(`/edituser/${id}`)
    }
    return (
        <>
            <ToastContainer theme='colored' position='top-right' />
            <Nav />
            <div className='user-detail'>
                <div className='subUser-detail'>

                    <div className='user-info'>
                        <div className='user-name mb-3'><span className='user-titles'>Name:</span>{user.userName} </div>
                        <div className='user-email mb-3'><span className='user-email'>Email:</span>{user.email}</div>
                        <div className='btn d-flex'>
                            <button class="btn bg-success text-white me-2" onClick={() => userEdit(user._id)}>Edit</button>
                        </div>
                    </div>
                </div>
            </div>




        </>
    )
}

export default UserDetail