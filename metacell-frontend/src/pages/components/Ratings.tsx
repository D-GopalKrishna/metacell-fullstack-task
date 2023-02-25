import React from 'react'

type Props = {
    commentInfo: string
}

const Ratings: React.FC<Props> = ({
     commentInfo
}) => {
    console.log(commentInfo)
    return (
        <div className='mb-16'>
            <h2 className="text-2xl font-bold text-gray-100 mb-5">Comments and Ratings</h2>
            {/* add new comment */}
            <div className='flex flex-row justify-between'>
                <textarea className="flex w-11/12 resize-none bg-gray-900 text-gray-100 rounded-lg border-2 border-gray-900 focus:outline-none focus:border-gray-500 px-4 py-2 mb-5" placeholder="Add a comment" />
                <button className="bg-gray-900 text-gray-100 rounded-lg px-4 ml-5 py-2 mb-5">Add Comment</button>
            </div>
            <div className="bg-gray-900 shadow-lg rounded-lg overflow-hidden">
                <div className="px-6 py-4">
                    <h2 className="font-medium mb-1 text-gray-300">{commentInfo}</h2>
                </div>
            </div>
        </div>

    )
}

export default Ratings