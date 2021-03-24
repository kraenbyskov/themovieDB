

const GetUrlParams = (type) => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const id = urlParams.get(type);
    return id;
};

export default GetUrlParams