import CreateElement from "../components/CreateElement.js";

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get("id");

const Root = document.getElementById("Root");
const Genre = document.getElementById("Genre");
/* Key til APIen */
const Key = `6dbaab84138f7fe0967c258d01551d91`;
/* Url */

const fetchDetails = () => {
  const urlDetails = `https://api.themoviedb.org/3/movie/${id}?api_key=${Key}&language=en-US`;

  const fetchMyData = new Promise((resolve, reject) => {
    fetch(urlDetails)
      .then((response) => response.json())
      .then((result) => resolve(result))
      .catch((err) => {
        reject(err);
      });
  });

  fetchMyData
    .then((Data) => {
      document.title = "MySite: " + Data.title;
      const ProductionContainer = CreateElement({
        elmt: "ul",
        className: "Production_Container",
      });
      const GenresContainer = CreateElement({
        elmt: "ul",
        className: "Genres_Container",
      });
      const Container = CreateElement({ className: "Movie_Container" });
      Root.appendChild(Container);

      const Title = CreateElement({
        elmt: "h2",
        content: `Title:  ${Data.title}`,
        className: "Movie_title",
      });

      const Overview = CreateElement({
        elmt: "p",
        content: Data.overview,
        className: "Movie_overview",
      });
      const Backdrop = CreateElement({
        elmt: "img",
        src: Data.backdrop_path,
        className: "Movie_Backdrop",
      });

      Data.genres.map((genres) => {
        const Genres = CreateElement({
          elmt: "span",
          content: genres.name,
          className: "Movie_genres",
        });
        GenresContainer.appendChild(Genres);
      });

      Data.production_companies.map((companies) => {
        const Name = CreateElement({
          elmt: "h4",
          content: companies.name,
          className: "Production_genres",
        });

        const Logo = CreateElement({
          elmt: "img",
          src: companies.logo_path,
          className: "Production_Logo",
        });

        ProductionContainer.appendChild(Name);
        if (companies.logo_path) {
          ProductionContainer.appendChild(Logo);
        }
      });

      Container.appendChild(Backdrop);
      Container.appendChild(Title);
      Container.appendChild(Overview);
      Container.appendChild(GenresContainer);
      Container.appendChild(ProductionContainer);
    })
    .catch((error) => {
      console.log(error);
    });
};

const fetchGenre = () => {
  const urlGenre = `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${Key}&language=en-US`;
  const fetchMyData = new Promise((resolve, reject) => {
    fetch(urlGenre)
      .then((response) => response.json())
      .then((result) => resolve(result.cast))
      .catch((err) => {
        reject(err);
      });
  });

  fetchMyData
    .then((Data) => {
      Data.map((data) => {
        const Container = CreateElement({ className: "Genre_Container" });
        Genre.appendChild(Container);
        // character

        const Character = CreateElement({
          elmt: "h2",
          content: `Character:  ${data.character}`,
          className: "Genre_Character",
        });

        // name

        const Name = CreateElement({
          elmt: "p",
          content: `Name:  ${data.name}`,
          className: "Genre_Name",
        });

        // profile_path

        const Profile = CreateElement({
          elmt: "img",
          src: data.profile_path,
          className: "Genre_Profile",
        });

        Container.appendChild(Character);
        Container.appendChild(Name);
        Container.appendChild(Profile);
      });
    })
    .catch((error) => {
      console.log(error);
    });
};

fetchDetails();
fetchGenre();
