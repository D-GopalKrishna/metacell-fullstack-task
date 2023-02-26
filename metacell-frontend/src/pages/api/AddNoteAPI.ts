import IndividualBookAPI from './IndividualBookAPI'

const AddNoteAPI = async (
    REACT_APP_BACKEND_URI: string,
    token: string,
    note: any,
    book_id: string,
    user_id: string,
    setEditing: any,
    setBookInfo: any,
) => {
    let itemBody = {
        "note": note,
        "book_id": book_id,
        "user_id": user_id
    }
    try {
        let response = await fetch(REACT_APP_BACKEND_URI + '/book/add_note', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
            body: JSON.stringify(itemBody),
        });
        let data = await response.json();
        console.log("AddNoteAPI -> data", data)
        IndividualBookAPI(REACT_APP_BACKEND_URI, token, book_id, setBookInfo)
        setEditing(false)

    } catch (err) {
        console.log("AddNoteAPI Error  -> ", err);
    }
}


export default AddNoteAPI;