setInterval(function () {
  setSpotlight()
}, 2000);

function setSpotlight() {
  fetch(`/api/random`, {
    method: "get",
    headers: new Headers({
      "Content-Type": "application/json",
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      document.querySelector('.spotlight-image').src = `/assets/${data.image}`
      document.querySelector('.spotlight-name').innerHTML = data.name
      document.querySelector('.spotlight-description').innerHTML = data.description
      document.querySelector('.spotlight-link').href =`/${data.keyword}/${data.id}`
    });
}

setSpotlight()