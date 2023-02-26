import React, {useState, useEffect} from 'react'
import LoginAPI from './api/LoginAPI'
import Navbar from './components/Navbar'
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux'; 


type Props = {
    REACT_APP_BACKEND_URI: string,
}

const Login: React.FC<Props>= ({
    REACT_APP_BACKEND_URI
}) => {
    const [userEmail, setUserEmail] = useState('')
    const [userPassword, setUserPassword] = useState('')
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        console.log('Login page loaded', REACT_APP_BACKEND_URI)
        setLoading(false)
    }, [])

    return (
        <div>
            <Navbar />
            {
                loading ? <h1>Loading...</h1> : (
                    <div className='flex flex-col items-center mt-32'>
                        <h2 className="text-2xl font-bold text-gray-100 mx-28 mb-10">Metacell Library Login</h2>
                        <div className='mx-24 mb-20 w-2/5'>
                            <input 
                                type="email" 
                                className="flex w-11/12 resize-none bg-gray-900 text-gray-100 rounded-lg border-2 border-gray-900 focus:outline-none focus:border-gray-500 px-4 py-2 mb-5" 
                                placeholder="User email" 
                                value={userEmail}
                                onChange={e => setUserEmail(e.target.value)}
                            />
                            <input 
                                type="password" 
                                className="flex w-11/12 resize-none bg-gray-900 text-gray-100 rounded-lg border-2 border-gray-900 focus:outline-none focus:border-gray-500 px-4 py-2 mb-5" 
                                placeholder="Password" 
                                value={userPassword}
                                onChange={e => setUserPassword(e.target.value)}
                            />
                            <div className='flex flex-row justify-center'>
                                <button onClick={() => LoginAPI(REACT_APP_BACKEND_URI, userEmail, userPassword, navigate, dispatch)} className="flex -ml-4 bg-gray-900 text-gray-100 rounded-lg border-2 border-gray-900 focus:outline-none  justify-center focus:border-gray-500 px-4 py-2 mb-5">Login</button>
                            </div>
                        </div>
                    </div>
                )

            }
        </div>
    )
}

export default Login