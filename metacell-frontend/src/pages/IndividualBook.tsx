import React from 'react'
import { useParams } from 'react-router-dom'
import Ratings from './components/Ratings'
import MyNotes from './components/MyNotes'
import Navbar from './components/Navbar'


const IndividualBook = () => {
    const [loading, setLoading] = React.useState(true)
    const { uuid } = useParams<{ uuid: string }>()
    const [bookInfo, setBookInfo] = React.useState<any>({})

    React.useEffect(() => {
        let data: any = {
            "uuid": uuid,
            "title": 'The Alchemist',
            "author": 'Paulo Coelho',
            "description": 'I created a new ReactJS app and corded it as below. It doesn\'t work. I need const person call into const app, How to do that?',
        }
        setBookInfo(data)
        setLoading(!loading)
    }, [])

    return (
        <div>
            <Navbar />
            <div className="mx-32 my-5">
                <div className="shadow-lg rounded-lg overflow-hidden mb-10">
                    <div className="">
                        <h1 className="font-bold text-xl mb-1 text-gray-400">{bookInfo.title}</h1>
                        <p className="text-gray-100 text-base mb-8">Author: {bookInfo.author}</p>
                        <p className="text-gray-100 text-base">{bookInfo.description}</p>
                    </div>
                </div>
                <MyNotes
                    bookname={'bookname'}
                    notes={'notes'}
                />
                <Ratings
                    commentInfo={'commentInfo'}
                />
            </div>



        </div>
    )
}

export default IndividualBook