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
    document.title = "MySite: " + Data.title;
    const ProductionContainer = CreateElement({
      elmt: "ul",
      className: "GenresContainer",
    });
    const GenresContainer = CreateElement({
      elmt: "ul",
      className: "GenresContainer",
    });
    const Container = CreateElement({ className: "Movie_Container" });
    Root.appendChild(Container);

    const Title = CreateElement({
      elmt: "h4",
      content: `Title:  ${Data.title}`,
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

    Data.production_companies.map((companies) => {
      const Name = CreateElement({
        elmt: "li",
        content: companies.name,
        className: "genres",
      });
      const Country = CreateElement({
        elmt: "li",
        content: companies.origin_country,
        className: "Country",
      });

      const Logo = CreateElement({
        elmt: "img",
        src: companies.logo_path,
        className: "Card_Backdrop",
      });

      ProductionContainer.appendChild(Name);
      ProductionContainer.appendChild(Country);
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
