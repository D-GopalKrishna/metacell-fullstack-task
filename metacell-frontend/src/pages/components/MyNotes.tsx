import React from 'react'

type Props = {
    bookname: string
    notes: string
}

const MyNotes: React.FC<Props> = ({
    bookname, notes
}) => {
    console.log(bookname, notes)
    const [editing, setEditing] = React.useState(false)
    return (
        <div className='mb-16'>
            <h2 className="text-2xl font-bold text-gray-100 mb-5">My Notes for the book - {bookname}</h2>
            <div className="bg-gray-900 shadow-lg rounded-lg overflow-hidden">

            </div>
            <div className='flex flex-row justify-between'>
                {
                    editing ? (
                        <textarea className="flex w-11/12 resize-none bg-gray-900 text-gray-100 rounded-lg border-2 border-gray-900 focus:outline-none focus:border-gray-500 px-4 py-2 mb-5" placeholder="Write note" />
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
                        <button onClick={() => setEditing(!editing)} className="hover:bg-slate-900 bg-gray-900 w-36 h-20 text-gray-100 rounded-lg px-4 ml-5 py-2 mb-5 hover:border-2 hover:border-blue-900" >Add Note</button>
                    ) : (
                        <button onClick={() => setEditing(!editing)} className="hover:bg-slate-900 bg-gray-900 w-36 h-20 text-gray-100 rounded-lg px-4 ml-5 py-2 mb-5 hover:border-2 hover:border-blue-900">Edit your Note</button>
                    )
                }
            </div>
        </div>

    )
}

export default MyNotes