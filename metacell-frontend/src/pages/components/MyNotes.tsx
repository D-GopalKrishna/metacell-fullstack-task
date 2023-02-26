import AddNoteAPI from 'pages/api/AddNoteAPI'
import React from 'react'
import { useSelector } from 'react-redux'; 

type Props = {
    bookname: string,
    notes: string,
    REACT_APP_BACKEND_URI: string,
    token: string,
    book_id: string,
    setBookInfo: any,
}

const MyNotes: React.FC<Props> = ({
    bookname, notes, REACT_APP_BACKEND_URI, token, book_id, setBookInfo
}) => {
    const [editing, setEditing] = React.useState(false)
    const useruuid = useSelector((state: any) => state?.userInformationStore?.userinfo?.data?.user?.uuid)
    const [localNotes, setLocalNotes] = React.useState(notes)
    const submitNote = () => {
        if (useruuid) {
            AddNoteAPI(REACT_APP_BACKEND_URI, token, localNotes, book_id, useruuid, setEditing, setBookInfo)
        }else {
            console.log("User not logged in")
        }
    }
    return (
        <div className='mb-16'>
            <h2 className="text-2xl font-bold text-gray-100 mb-5">My Notes for the book - {bookname}</h2>
            <div className="bg-gray-900 shadow-lg rounded-lg overflow-hidden">

            </div>
            <div className='flex flex-row justify-between'>
                {
                    editing ? (
                        <textarea 
                            value={localNotes} 
                            onChange={(e) => setLocalNotes(e.target.value)}
                            className="flex w-11/12 resize-none bg-gray-900 text-gray-100 rounded-lg border-2 border-gray-900 focus:outline-none focus:border-gray-500 px-4 py-2 mb-5" placeholder="Write note" />
                    ) : (
                        <div className="w-11/12 bg-gray-900 shadow-lg rounded-lg overflow-hidden">
                            <div className="px-6 py-4">
                                <h2 className="font-medium mb-1 text-gray-300">{notes}</h2>
                            </div>
                        </div>
                    )
                }
                {
                    editing ? (
                        <button onClick={() => submitNote()} className="hover:bg-slate-900 bg-gray-900 w-36 h-20 text-gray-100 rounded-lg px-4 ml-5 py-2 mb-5 hover:border-2 hover:border-blue-900" >Add Note</button>
                    ) : (
                        <button onClick={() => setEditing(!editing)} className="hover:bg-slate-900 bg-gray-900 w-36 h-20 text-gray-100 rounded-lg px-4 ml-5 py-2 mb-5 hover:border-2 hover:border-blue-900">Edit your Note</button>
                    )
                }
            </div>
        </div>

    )
}

export default MyNotes