import AddRatingAPI from 'pages/api/AddRatingAPI'
import React from 'react'
import { useSelector } from 'react-redux'; 

type Props = {
    commentInfo: any
    REACT_APP_BACKEND_URI: any
    token: any
    book_id: any
    setBookInfo: any
}

const Ratings: React.FC<Props> = ({
    commentInfo, REACT_APP_BACKEND_URI, token, book_id, setBookInfo
}) => {
    console.log(commentInfo)
    const useruuid = useSelector((state: any) => state?.userInformationStore?.userinfo?.data?.user?.uuid)
    const [newcomment, setNewComment] = React.useState('')
    return (
        <div className='mb-16'>
            <h2 className="text-2xl font-bold text-gray-100 mb-5">Comments and Ratings</h2>
            {/* add new comment */}
            <div className='flex flex-row justify-between'>
                <textarea
                    value={newcomment}
                    onChange={(e) => setNewComment(e.target.value)}
                    className="flex w-11/12 resize-none bg-gray-900 text-gray-100 rounded-lg border-2 border-gray-900 focus:outline-none focus:border-gray-500 px-4 py-2 mb-5" placeholder="Add a comment" 
                />
                <button onClick={() => {
                    AddRatingAPI(REACT_APP_BACKEND_URI, token, 5, newcomment, book_id, useruuid, setBookInfo, setNewComment)
                }} className="bg-gray-900 text-gray-100 rounded-lg px-4 ml-5 py-2 mb-5">Add Comment</button>
            </div>
            <div>
                {
                    commentInfo ? commentInfo.map((comment: any) => {
                        return (
                            <div className="bg-gray-900 shadow-lg rounded-lg overflow-hidden mb-2">
                                <div className="px-6 py-4">
                                    <h2 className="font-medium mb-1 text-gray-300">{comment.comment}</h2>
                                </div>
                            </div>
                        )
                    }) : null
                }
            </div>
            {/* <div className="bg-gray-900 shadow-lg rounded-lg overflow-hidden">
                <div className="px-6 py-4">
                    <h2 className="font-medium mb-1 text-gray-300">{}</h2>
                </div>
            </div> */}
        </div>

    )
}

export default Ratings