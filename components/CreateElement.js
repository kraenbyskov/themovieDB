

const CreateElement = ({ elmt = "div", content = "", className = "", src = "" }) => {

    const Imageurl = "https://image.tmdb.org/t/p/original/";

    let CreateElmt = document.createElement(elmt);

    if (elmt === "img") {
        if (src) {
            CreateElmt.src = Imageurl + src
        } else {
            CreateElmt.src = "../image/fallback.jpg"
        }
    }
    if (elmt === "a") {
        CreateElmt.href = src
    }
    CreateElmt.innerHTML = content
    CreateElmt.classList.add(className);

    return CreateElmt;
};

export default CreateElement;
