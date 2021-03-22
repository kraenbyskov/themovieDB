import CreateElement from "../components/CreateElement.js";

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get("id");

const Root = document.getElementById("Root");
/* Key til APIen */
const Key = `6dbaab84138f7fe0967c258d01551d91`;
/* Url */
const url = `https://api.themoviedb.org/3/movie/${id}?api_key=${Key}&language=en-US`;

const fetchMyData = new Promise((resolve, reject) => {
  fetch(url)
    .then((response) => response.json())
    .then((result) => resolve(result))
    .catch((err) => {
      reject(err);
    });
});

fetchMyData
  .then((Data) => {
    console.log(Data);
    const GenresContainer = CreateElement({
      elmt: "ul",
      className: "GenresContainer",
    });
    const Container = CreateElement({ className: "Movie_Container" });
    Root.appendChild(Container);

    const Title = CreateElement({
      elmt: "h4",
      content: Data.title,
      className: "Card_title",
    });
    const Overview = CreateElement({
      elmt: "p",
      content: Data.overview,
      className: "Card_overview",
    });
    const Backdrop = CreateElement({
      elmt: "img",
      src: Data.backdrop_path,
      className: "Card_Backdrop",
    });

    Data.genres.map((genres) => {
      const Genres = CreateElement({
        elmt: "li",
        content: genres.name,
        className: "genres",
      });
      GenresContainer.appendChild(Genres);
    });

    Container.appendChild(Backdrop);
    Container.appendChild(Title);
    Container.appendChild(Overview);
    Container.appendChild(GenresContainer);
  })
  .catch((error) => {
    console.log(error);
  });
