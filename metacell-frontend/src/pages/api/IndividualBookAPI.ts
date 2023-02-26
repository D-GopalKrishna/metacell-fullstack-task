import axios from 'axios'


const IndividualBookAPI = async (
    REACT_APP_BACKEND_URI: string,
    token: string,
    uuid: string,
    setBookInfo: any,
) => {
    console.log("token->", token, REACT_APP_BACKEND_URI, uuid)
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + token,
            }
        };
        let response = await axios.get(REACT_APP_BACKEND_URI + '/book/book_details/' + uuid, config);
        console.log("IndividualBookAPI -> response", response)
        let data = await response.data
        console.log("IndividualBookAPI -> data", data)
        setBookInfo(data)
    } catch (err) {
        console.log("IndividualBookAPI  -> ", err);
    }
    return

}


export default IndividualBookAPI;