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

fetch(`/api/coffee-machine/${id}`, {
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
    document.querySelector(".user_interface").value =
      data.specifications.user_interface;
    document.querySelector(".canisters").value = data.specifications.canisters;
    document.querySelector(".mixing_blows").value =
      data.specifications.mixing_blows;
    document.querySelector(".coffee_brewer").value =
      data.specifications.coffee_brewer;
    document.querySelector(".boilers").value = data.specifications.boilers;
    document.querySelector(".height").value = data.specifications.height;
    document.querySelector(".weight").value = data.specifications.weight;
    document.querySelector(".depth").value = data.specifications.depth;
    document.querySelector(".power_consumption").value =
      data.specifications.power_consumption;
    document.querySelector(".frequency").value = data.specifications.frequency;
    document.querySelector(".beans_capacity").value =
      data.specifications.beans_capacity;
    document.querySelector(".height_delivery_area").value =
      data.specifications.height_delivery_area;
  });

document.querySelector("form").action = `/api/edit/coffee-machine/${id}`;

document.querySelector(".delete").onclick = (e) => {
  e.preventDefault();

  fetch(`/api/coffee-machine/${id}`, {
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
