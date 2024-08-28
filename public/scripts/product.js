const category = window.location.href.split("/").at(-2);
const id = window.location.href.split("/").at(-1);

function titleFromKeyword(keyword) {
  return keyword
    .split("_")
    .map((word) => {
      return word[0].toUpperCase() + word.substring(1);
    })
    .join(" ");
}

fetch(`/api/${category}/${id}`, {
  method: "get",
  headers: new Headers({
    "Content-Type": "application/json",
  }),
})
  .then((response) => response.json())
  .then((data) => {
    document.querySelector(".image").src = `/assets/${data.image}`;
    document.querySelector(".image").alt = data.name;
    document.querySelector(".name").innerHTML = data.name;
    document.querySelector(".description").innerHTML = data.description;

    const specifications = data.specifications;

    for (const [key, value] of Object.entries(specifications)) {
      const div = document.createElement("div");
      div.className = "item";
      div.innerHTML = `<h4>${titleFromKeyword(key)}</h4><p>${value}</p>`;

      document.querySelector(".specification-list").appendChild(div);
    }

    if (Object.hasOwn(data, "brochure") === true) {
      document.querySelector(".brochure").href = `/assets/${data.brochure}`;
    } else {
      document.querySelector(".brochure").style.display = "none";
    }
  });
