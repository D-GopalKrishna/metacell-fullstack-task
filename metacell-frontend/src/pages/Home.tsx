import React, {useState, useEffect} from 'react'
import Navbar from './components/Navbar'
import { useNavigate } from "react-router-dom";

type Props = {

}

const Home: React.FC<Props>= () => {
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate();

    useEffect(() => {
        setLoading(false)
        if (localStorage.getItem('token')){
            console.log("asdf")
            navigate('books')
        }
    }, [])

    return (
        <div>
            <Navbar />
            {
                loading ? <h1>Loading...</h1> : (
                    <div>
                        <div className='flex flex-col items-center mt-36'>
                            <h2 className="text-2xl font-bold text-gray-100 mx-28 mb-10">Welcome to Metacell Book Library</h2>
                            <div className='mx-24 mb-20 w-2/5'>
                                <p className="resize-none bg-gray-900 text-gray-100 rounded-lg border-2 border-gray-900 focus:outline-none focus:border-gray-500 px-4 py-2 mb-5">This is a simple book library application. You can add books to the library, edit and delete them. You can also search for books by title or author.</p>
                                <p className="resize-none bg-gray-900 text-gray-100 rounded-lg border-2 border-gray-900 focus:outline-none focus:border-gray-500 px-4 py-2 mb-5">To access the library, please login or register.</p>
                                <p className="resize-none bg-gray-900 text-gray-100 rounded-lg border-2 border-gray-900 focus:outline-none focus:border-gray-500 px-4 py-2 mb-5">To access the admin panel, please login with the admin credentials. Here is the django-admin panel for you to go to - <a href='http://localhost:8000/' className="text-blue-500">Backend Link</a></p>
                            </div>
                        </div>
                    </div>
                )

            }
        </div>
    )
}

export default Home