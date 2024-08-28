let category;
let subCategory = undefined;

if (window.location.href.split("/").length === 5) {
  category = window.location.href.split("/").at(-2);

  subCategory = window.location.href.split("/").at(-1);
} else {
  category = window.location.href.split("/").at(-1);
}

let title;

function titleFromKeyword(keyword) {
  return keyword
    .split("-")
    .map((word) => {
      return word[0].toUpperCase() + word.substring(1);
    })
    .join(" ");
}

if (subCategory !== undefined) {
  title = titleFromKeyword(subCategory);
} else {
  title = titleFromKeyword(category);
}

document.title = title;
document.querySelector(".category").innerHTML = title;

fetch(`/api/${category}`, {
  method: "get",
  headers: new Headers({
    "Content-Type": "application/json",
  }),
})
  .then((response) => response.json())
  .then((data) => {
    if (subCategory !== undefined && subCategory !== "beans") {
      subCategory = subCategory.slice(0, -1);

      const filteredData = data.filter(
        (i) => i.category.toLowerCase().split(" ").join("-") === subCategory
      );

      if (filteredData.length > 0) {
        filteredData.forEach((product) => {
          const a = document.createElement("a");
          a.className = "grid-item";
          a.href = `/${category.slice(0, -1)}/${product.id}`;
          a.innerHTML = `<img src="/assets/${product.image}" alt="${product.name}" /><h3>${product.name}</h3>`;

          document.querySelector(".product-grid").appendChild(a);
        });
      } else {
        document.querySelector(".product-grid").innerHTML =
          `<h2><i class="fa-solid fa-circle-info"></i> Sorry, we don't have any products currently available.</h2>`;
      }
    } else if (subCategory === "beans") {
      const filteredData = data.filter(
        (i) => i.category.toLowerCase().split(" ").join("-") === subCategory
      );

      if (filteredData.length > 0) {
        filteredData.forEach((product) => {
          const a = document.createElement("a");
          a.className = "grid-item";
          a.href = `/${category}/${product.id}`;
          a.innerHTML = `<img src="/assets/${product.image}" alt="${product.name}" /><h3>${product.name}</h3>`;

          document.querySelector(".product-grid").appendChild(a);
        });
      } else {
        document.querySelector(".product-grid").innerHTML =
          `<h2><i class="fa-solid fa-circle-info"></i> Sorry, we don't have any products currently available.</h2>`;
      }
    } else {
      if (data.length > 0) {
        data.forEach((product) => {
          const a = document.createElement("a");
          a.className = "grid-item";
          a.href = `/${category.slice(0, -1)}/${product.id}`;
          a.innerHTML = `<img src="/assets/${product.image}" alt="${product.name}" /><h3>${product.name}</h3>`;

          document.querySelector(".product-grid").appendChild(a);
        });
      } else {
        document.querySelector(".product-grid").innerHTML =
          `<h2><i class="fa-solid fa-circle-info"></i> Sorry, we don't have any products currently available.</h2>`;
      }
    }
  });
