import React, {useState, useEffect} from 'react'
import BookListAPI from './api/BookListAPI'
import BookCard from './components/BookCard'
import Navbar from './components/Navbar'
import { useSelector, } from 'react-redux'; 

type Props = {
    REACT_APP_BACKEND_URI: string,}

const Books: React.FC<Props>= ({
    REACT_APP_BACKEND_URI
}) => {
    const [books, setBooks] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const token = useSelector((state: any) => state?.userInformationStore?.token)

    useEffect(() => {
        if (token){
            BookListAPI(REACT_APP_BACKEND_URI, token, setBooks)
            setLoading(false)
        }
    }, [token])
    return (
        <div>
            <Navbar />
            {
                loading ? <h1 className="mx-28">Loading...</h1> : (
                    <div>
                        <h2 className="text-2xl font-bold text-gray-100 mx-28 mb-10">Metacell Library</h2>
                        <div className='grid grid-cols-2 mx-24 mb-20'>
                            {
                                books ? books.map((book: any) => {
                                    return (
                                        <BookCard
                                            key={book.uuid}
                                            title={book.title}
                                            author={book.author}
                                            description={book.description}
                                            uuid={book.uuid}
                                        />
                                    )
                                }) :  <h1>No books found</h1>
                            }   
                        </div>
                    </div>
                )

            }
        </div>
    )
}

export default Books