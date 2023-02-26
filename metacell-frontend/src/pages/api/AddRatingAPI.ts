import IndividualBookAPI from './IndividualBookAPI'

const AddRatingAPI = async (
    REACT_APP_BACKEND_URI: string,
    token: string,
    ratings: any,
    comment: any,
    book_id: string,
    user_id: string,
    setBookInfo: any,
    setNewComment: any,
) => {
    let itemBody = {
        "rating": ratings,
        "comment": comment,
        "book_id": book_id,
        "user_id": user_id
    }
    console.log("AddRatingAPI -> itemBody", user_id, book_id, comment, ratings)
    try {
        let response = await fetch(REACT_APP_BACKEND_URI + '/book/add_rating', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
            body: JSON.stringify(itemBody),
        });
        let data = await response.json();
        console.log("AddRatingAPI -> data", data)
        IndividualBookAPI(REACT_APP_BACKEND_URI, token, book_id, setBookInfo)
        setNewComment("")
    } catch (err) {
        console.log("AddRatingAPI Error  -> ", err);
    }
}


export default AddRatingAPI;