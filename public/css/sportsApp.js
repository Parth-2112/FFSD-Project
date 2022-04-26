var after = "";

function fetchSports() {
  //colorChange();

  if (document.getElementById("sports")) {
    document.getElementById("sports").remove();
  }

  let parentdiv = document.createElement("div");
  parentdiv.id = "sports";
  fetch(`https://www.reddit.com/r/movies.json?after=${after}`)
    .then((response) => response.json())
    .then((body) => {
      after = body.data.after;
      for (let index = 0; index < body.data.children.length; index++) {
        if (body.data.children[index].data.post_hint === "image") {
          let div = document.createElement("div");
          let h4 = document.createElement("h4");
          let image = document.createElement("img");
          image.src = body.data.children[index].data.url_overridden_by_dest;
          h4.textContent = body.data.children[index].data.title;
          div.appendChild(h4);
          div.appendChild(image);
          parentdiv.appendChild(div);
        }
      }
      document.body.appendChild(parentdiv);
    })
    .catch((e) => {
      console.log(e);
    });
}








