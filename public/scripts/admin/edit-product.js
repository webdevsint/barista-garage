const id = window.location.href.split("/").at(-1);

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const param = urlParams.get("context");

if (param === "edit success") {
  alert("Product edit successful.");
}

const inputContainer = document.querySelector("form");

inputContainer.addEventListener("change", (event) => {
  if (event.target.tagName === "INPUT") {
    document.querySelector(".submit").disabled = false;
  }
});

document.querySelector("textarea").onchange = () => {
  document.querySelector(".submit").disabled = false;
};

fetch(`/api/product/${id}`, {
  method: "get",
  headers: new Headers({
    "Content-Type": "application/json",
  }),
})
  .then((response) => response.json())
  .then((data) => {
    document.querySelector(".product_name").value = data.name;
    document.querySelector(".category").value = data.category;
    document.querySelector(".description").value = data.description;
    document.querySelector(".version").value = data.specifications.version;
    document.querySelector(".height").value = data.specifications.height;
    document.querySelector(".weight").value = data.specifications.weight;
    document.querySelector(".depth").value = data.specifications.depth;
    document.querySelector(".beans_capacity").value =
      data.specifications.beans_capacity;
  });

document.querySelector("form").action = `/api/edit/product/${id}`;

document.querySelector(".delete").onclick = (e) => {
  e.preventDefault();

  fetch(`/api/product/${id}`, {
    method: "delete",
    headers: new Headers({
      "Content-Type": "application/json",
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      window.location.replace("/admin");
    });
};