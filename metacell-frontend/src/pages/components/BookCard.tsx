import React from 'react'
import { Link } from 'react-router-dom'

type Props = {
    title: string,   // this is the book name
    author: string,
    description: string,   /// this is the book short summary
    uuid: string   
}
const BookCard: React.FC<Props> = ({
    title, author, description, uuid
}) => {
    return (
        <div className="bg-purple mx-5 my-5">
            <div className="bg-gray-900 shadow-lg rounded-lg overflow-hidden">
                <div className="px-6 py-4">
                    <h2 className="font-bold text-xl mb-1 text-gray-400">{title}</h2>
                    <p className="text-gray-100 text-base mb-8">Author: {author}</p>
                    <p className="text-gray-100 text-base">{description}</p>
                </div>
                <div className="px-6 pt-2 pb-5">
                    <Link to={ uuid ? `/${uuid}` : ''} >
                        <button className="bg-violet-900 hover:bg-violet-700 text-white font-bold py-2 px-4 rounded">Read more</button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default BookCard