import React from 'react'
import { useParams } from 'react-router-dom'
import Ratings from './components/Ratings'
import MyNotes from './components/MyNotes'
import Navbar from './components/Navbar'
import IndividualBookAPI from './api/IndividualBookAPI'
import { useSelector, } from 'react-redux'; 

type Props = {
    REACT_APP_BACKEND_URI: string,
}

const IndividualBook: React.FC<Props>= ({
    REACT_APP_BACKEND_URI,
}) => {
    const [loading, setLoading] = React.useState(true)
    const { bookid } = useParams()
    const [bookInfo, setBookInfo] = React.useState<any>({})
    const token = useSelector((state: any) => state?.userInformationStore?.token)
    React.useEffect(() => {
        console.log("Uuid: ", bookid, setBookInfo)
        if (bookid && token) {
            IndividualBookAPI(REACT_APP_BACKEND_URI, token, bookid, setBookInfo)
        }
        setLoading(!loading)
    }, [token, bookid])
    return (
        <div>
            <Navbar />
            <div className="mx-32 my-5">
                <div className="shadow-lg rounded-lg overflow-hidden mb-10">
                    <div className="">
                        <h1 className="font-bold text-xl mb-1 text-gray-400">{bookInfo?.book?.title}</h1>
                        <p className="text-gray-100 text-base mb-1">Author: {bookInfo?.book?.author}</p>
                        <p className="text-gray-100 text-base mb-1">Price: {bookInfo?.book?.price}</p>
                        <p className="text-gray-100 text-base">Summary: {bookInfo?.book?.description}</p>
                    </div>
                </div>
                <MyNotes
                    bookname={bookInfo?.book?.title}
                    notes={bookInfo?.my_book_notes?.length>0 ? bookInfo?.my_book_notes[bookInfo?.my_book_notes?.length - 1]?.note : ''}
                    REACT_APP_BACKEND_URI={REACT_APP_BACKEND_URI}
                    token={token}
                    book_id={bookid ? bookid : ''}
                    setBookInfo={setBookInfo}
                />
                <Ratings
                    commentInfo={bookInfo?.rating_obj}
                    REACT_APP_BACKEND_URI={REACT_APP_BACKEND_URI}
                    token={token}
                    book_id={bookid ? bookid : ''}
                    setBookInfo={setBookInfo}
                />
            </div>



        </div>
    )
}

export default IndividualBook