import axios from 'axios'


const BookListAPI = async (
    REACT_APP_BACKEND_URI: string,
    token: string,
    setBooks: any,
) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + token,
            }
        };
        let response = await axios.get(REACT_APP_BACKEND_URI + '/book/get_book_catalogue', config);
        let data = await response.data
        setBooks(data.books)
    } catch (err) {
        console.log("BookListAPI  -> ", err);
    }
    return

}


export default BookListAPI;