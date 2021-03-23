

const CreateElement = ({ elmt = "div", content = "", className = "", src = "" }) => {

    const Imageurl = "https://image.tmdb.org/t/p/original/";

    let CreateElmt = document.createElement(elmt);

    if (elmt === "img") {
        CreateElmt.src = Imageurl + src
    }
    if (elmt === "a") {
        CreateElmt.href = src
    }
    CreateElmt.innerHTML = content
    CreateElmt.classList.add(className);

    return CreateElmt;
};

export default CreateElement;
