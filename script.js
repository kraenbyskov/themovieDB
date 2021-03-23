import CreateElement from "./components/CreateElement.js";

const Root = document.getElementById("Root");

// myFunction();

/* Key til APIen */
const Key = `6dbaab84138f7fe0967c258d01551d91`;
/* Kategori for hvad vi ønsker at hente */
const category = `popular`;
/* Url */
const url = `https://api.themoviedb.org/3/movie/${category}?api_key=${Key}`;

const fetchMyData = new Promise((resolve, reject) => {
  fetch(url)
    .then((response) => response.json())
    .then((result) => resolve(result.results))
    .catch((err) => {
      reject(err);
    });
});

fetchMyData
  .then((Data) => {
    Data.map((data) => {
      const Card = CreateElement({ className: "Card" });

      const Link = CreateElement({
        elmt: "a",
        src: `/movie.html?id=${data.id}`,
        className: "Card_Link",
      });

      const Title = CreateElement({
        elmt: "h4",
        content: data.title,
        className: "Card_title",
      });

      const Rating = CreateElement({
        elmt: "p",
        content: data.vote_average,
        className: "Card_Rating",
      });

      const Poster = CreateElement({
        elmt: "img",
        src: data.poster_path,
        className: "Card_Poster",
      });

      Root.appendChild(Link);
      Link.appendChild(Card);
      Card.appendChild(Poster);
      Card.appendChild(Title);
      Card.appendChild(Rating);
    });
  })
  .catch((error) => {
    console.log(error);
  });
