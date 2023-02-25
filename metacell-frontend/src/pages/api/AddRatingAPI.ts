
const AddRatingAPI = async (
    baseURL: string,
    token: string,
    setCurrentBalance: any,
    setArt: any,
) => {
    let itemBody = {
        "itemid": 1,
    }
    try {
        let response = await fetch(baseURL + '/buy', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
            body: JSON.stringify(itemBody),
        });
        let data = await response.json();
        console.log("AddRatingAPI -> data", data)
        setCurrentBalance(data.balance);
    } catch (err) {
        console.log("ErrorEarthArt  -> ", err);
    }
}


export default AddRatingAPI;