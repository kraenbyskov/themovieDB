import CreateElement from "../components/CreateElement.js";

const input = document.querySelector("input");

const updateValue = async (e) => {
  let Value = new Promise((myResolve, myReject) => {
    setTimeout(() => {
      myResolve(e.target.value);
    }, 1000);
  });

  const Root = document.getElementById("Root");
  const results = await Value;
  console.log("Efter");
  const Key = `7c105b21789fdf773ab798b1c284f40e`;
  const url = `https://api.themoviedb.org/3/search/movie?api_key=${Key}&language=en-US&query=${results}&page=1&include_adult=false`;

  const fetchMyData = new Promise((resolve, reject) => {
    fetch(url)
      .then((response) => response.json())
      .then((result) => resolve(result.results))
      .catch((err) => {
        reject(err);
      });
  });

  Root.innerHTML = "";

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
};

input.addEventListener("input", updateValue);
