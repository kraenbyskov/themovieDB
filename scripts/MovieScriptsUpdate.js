import CreateElement from "../components/CreateElement.js";
import FetchMyData from "../components/FetchMyData.js";
import GetUrlParams from "../components/GetUrlParams.js";

const Root = document.getElementById("Root");
const Genre = document.getElementById("Genre");

const buildDetails = (url) => {
  const myData = FetchMyData(url);
  myData
    .then((Data) => {
      document.title = "MySite: " + Data.title;

      const ProductionContainer = CreateElement({
        elmt: "div",
        className: "Production_Container",
      });

      const GenresContainer = CreateElement({
        elmt: "div",
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
      const Youtube = CreateElement({
        elmt: "iframe",
        Attribute: [
          {
            type: "width",
            input: "560",
          },
          {
            type: "height",
            input: "315",
          },
          {
            type: "src",
            input: "https://www.youtube.com/embed/Mus_vwhTCq0",
          },
          {
            type: "title",
            input: "YouTube video player",
          },
          {
            type: "frameborder",
            input: "0",
          },
          {
            type: "allow",
            input: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture",
          },
        ]

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
        const ProductionCard = CreateElement({
          elmt: "div",
          className: "Production_Card",
        });
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
        ProductionCard;
        ProductionContainer.appendChild(ProductionCard);
        ProductionCard.appendChild(Name);
        if (companies.logo_path) {
          ProductionCard.appendChild(Logo);
        }
      });

      Container.appendChild(Youtube);
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

const buildGenre = (url) => {
  const myData = FetchMyData(url);

  myData
    .then((Data) => {
      Data.cast.slice(0, 6).map((data) => {
        const Container = CreateElement({ className: "Genre_Container" });
        Genre.appendChild(Container);

        // character

        const Character = CreateElement({
          elmt: "h3",
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

buildDetails({ id: GetUrlParams("id") });
buildGenre({ id: GetUrlParams("id"), credits: "/credits" });
