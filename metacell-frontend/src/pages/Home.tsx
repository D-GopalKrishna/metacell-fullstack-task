import React, {useState, useEffect} from 'react'
import BookCard from './components/BookCard'
import Navbar from './components/Navbar'

const Home = () => {
    const [books, setBooks] = useState<any[]>([])
    const [loading, setLoading] = useState(true)

        useEffect(() => {
        // fetch('http://localhost:5000/books')
        let data: any = {
            "uuid": '123',
            "title": 'The Alchemist',
            "author": 'Paulo Coelho',
            "description": 'I created a new ReactJS app and corded it as below. It doesn\'t work. I need const person call into const app, How to do that?',
        }
        setBooks([data, data, data, data, data, data])
        setLoading(false)
    }, [])

    return (
        <div>
            <Navbar />
            {
                loading ? <h1>Loading...</h1> : (
                    <div>
                        <h2 className="text-2xl font-bold text-gray-100 mx-28 mb-10">Metacell Library</h2>
                        <div className='grid grid-cols-2 mx-24 mb-20'>
                            {
                                books.map((book: any) => {
                                    return (
                                        <BookCard
                                            key={book.uuid}
                                            title={book.title}
                                            author={book.author}
                                            description={book.description}
                                            uuid={book.uuid}
                                        />
                                    )
                                })
                            }   
                        </div>
                    </div>
                )

            }
        </div>
    )
}

export default Home