import React from 'react'
import { Link } from 'react-router-dom';
import MetacellImg from '../../assets/Metacell.png'
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux'; 
import { setupUserInformation } from 'state/reducers/userInformationSlice';

const screenWidth = window.innerWidth;

const Navbar = () => {
    const [isLoggedIn, setIsLoggedIn] = React.useState(0)
    const navigate = useNavigate()
  const dispatch = useDispatch();

    React.useEffect(() => {
        if (localStorage.getItem('token')){
            setIsLoggedIn(1)
        }
    }, [])

    const removeToken = () => {
        if (localStorage.getItem('token')){
            localStorage.removeItem('token')
            localStorage.removeItem('userinfo')
            let userinfo = {
                token: '',
            }
            dispatch(setupUserInformation(userinfo))
        }
        navigate('/')
    } 
    return (
        <div style={styles.container}>
            <div className='flex flex-row justify-between  my-10 -ml-12'>
                <Link to='/'>
                    <img src={MetacellImg} alt="Logo" className="w-100 h-20" />
                </Link>

                {
                    isLoggedIn ? (
                        <button onClick={() => removeToken()} >
                            <div className="bg-gray-900 shadow-lg rounded-lg overflow-hidden h-12 mt-4 flex items-center ">
                                <div className="px-6 py-4">
                                    <h2 className="font-medium mb-1 text-gray-300">Logout</h2>
                                </div>
                            </div>
                        </button>
                    ) : (
                        <Link to='/login'>
                            <div className="bg-gray-900 shadow-lg rounded-lg overflow-hidden h-12 mt-4 flex items-center ">
                                <div className="px-6 py-4">
                                    <h2 className="font-medium mb-1 text-gray-300">Login</h2>
                                </div>
                            </div>
                        </Link>    
                    )
                }
            </div>

        </div>
    )
}

const styles = {
    container: {
        width: '100%',
        paddingLeft: screenWidth > 660 ? '8%' : '5%',
        paddingRight: screenWidth > 660 ? '8%' : '5%',
    }
}


export default Navbar