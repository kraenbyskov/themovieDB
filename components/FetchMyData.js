


const FetchMyData = async ({ id, credits }) => {
    const Key = `6dbaab84138f7fe0967c258d01551d91`;
    const startUrl = "https://api.themoviedb.org/3/"
    const url = `${startUrl}movie/${id}${credits ? credits : ""}?api_key=${Key}&language=en-US`;


    const fetchMyData = new Promise((resolve, reject) => {
        fetch(url)
            .then((response) => response.json())
            .then((result) => resolve(result))
            .catch((err) => {
                reject(err);
            });
    });
    return (fetchMyData)
}




export default FetchMyData;