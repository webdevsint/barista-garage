// shadow on scroll
window.addEventListener("scroll", (event) => {
  let scroll = this.scrollY;
  if (scroll > 10) {
    document.querySelector("header").classList.add("shadow");
  } else {
    document.querySelector("header").classList.remove("shadow");
  }
});

// overlay
document.querySelector(".overlay-machines").style.display = "none";
document.querySelector(".overlay-accessories").style.display = "none";

function showOverlay(name) {
  if (name === "machines")
    document.querySelector(".overlay-accessories").style.display = "none";
  if (name === "accessories")
    document.querySelector(".overlay-machines").style.display = "none";

  const overlay = document.querySelector(`.overlay-${name}`);

  if (overlay.style.display === "none") {
    overlay.style.display = "flex";
    document.body.style.overflowY = "hidden";
  } else {
    overlay.style.display = "none";
    document.body.style.overflowY = "scroll";
  }
}


const navigation = document.querySelector("nav");
const navToggle = document.querySelector(".nav-toggle");
const closeToggle = document.querySelector(".close-toggle");

navToggle.onclick = () => {
  navigation.setAttribute("data-visible", true);
  navToggle.style.display = 'none'
}

closeToggle.onclick = () => {
  navigation.setAttribute("data-visible", false);
  navToggle.style.display = 'block'
}