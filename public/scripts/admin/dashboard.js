const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const param = urlParams.get("context");

if (param === "add success") {
  alert("Product added successfully!");
}

let allData = [];

fetch(`/api/coffee-machines`, {
  method: "get",
  headers: new Headers({
    "Content-Type": "application/json",
  }),
})
  .then((response) => response.json())
  .then((data) => {
    if (data.length === 0) {
      document.querySelector(".coffee-machines").innerHTML =
        "<p>No coffee machines found.</p>";
    } else {
      data.forEach((product) => {
        const div = document.createElement("div");
        div.innerHTML = `<a href="/admin/coffee-machine/${product.id}"><div class="product"><img src="../../assets/${product.image}" alt="${product.name}"><div class="product-info"><p>#<span class="id">${product.id}</span></p><h3 class="name">${product.name}</h3><p>${product.category}</p></div></div></a>`;

        document.querySelector(".coffee-machines").appendChild(div);
        allData.push(product);
      });
    }
  });

fetch(`/api/coffee-grinders`, {
  method: "get",
  headers: new Headers({
    "Content-Type": "application/json",
  }),
})
  .then((response) => response.json())
  .then((data) => {
    if (data.length === 0) {
      document.querySelector(".coffee-grinders").innerHTML =
        "<p>No coffee grinders found.</p>";
    } else {
      data.forEach((product) => {
        const div = document.createElement("div");
        div.innerHTML = `<a href="/admin/coffee-grinder/${product.id}"><div class="product"><img src="../../assets/${product.image}" alt="${product.name}"><div class="product-info"><p>#<span class="id">${product.id}</span></p><h3 class="name">${product.name}</h3><p>Coffee Grinder</p></div></div></a>`;

        document.querySelector(".coffee-grinders").appendChild(div);
        allData.push(product);
      });
    }
  });

fetch(`/api/products`, {
  method: "get",
  headers: new Headers({
    "Content-Type": "application/json",
  }),
})
  .then((response) => response.json())
  .then((data) => {
    if (data.length === 0) {
      document.querySelector(".products").innerHTML =
        "<p>No other products found.</p>";
    } else {
      data.forEach((product) => {
        const div = document.createElement("div");
        div.innerHTML = `<a href="/admin/product/${product.id}"><div class="product"><img src="../../assets/${product.image}" alt="${product.name}"><div class="product-info"><p>#<span class="id">${product.id}</span></p><h3 class="name">${product.name}</h3><p>${product.category}</p></div></div></a>`;

        document.querySelector(".products").appendChild(div);
        allData.push(product);
      });
    }
  });

function search() {
  document.querySelector(".search-results").innerHTML = "";
  const keyword = document.querySelector("input").value;

  if (keyword.length > 0) {
    document.querySelector(".search-results").style.display = "grid";

    const filteredData = allData.filter((i) =>
      i.name.toLowerCase().includes(keyword.toLowerCase())
    );

    if (filteredData.length > 0) {
      filteredData.forEach((product) => {
        const div = document.createElement("div");
        div.innerHTML = `<a href="/admin/${product.keyword}/${product.id}" ><div class="search-result"><img src="../../assets/${product.image}" alt=""><section><h4>${product.name}</h2><p>${product.category}</p></section></div></a>`;

        document.querySelector(".search-results").appendChild(div);
      });
    } else {
      document.querySelector(
        ".search-results"
      ).innerHTML = `<p>No search result for "${keyword}" found.</p>`;
    }
  }

  if (keyword === "") {
    document.querySelector(".search-results").style.display = "none";
  }
}

document
  .querySelector("input")
  .addEventListener("keydown", function onEvent(event) {
    if (event.keyCode === 13) {
      event.preventDefault();
      search();
    }
  });
