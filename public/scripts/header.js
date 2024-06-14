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

console.log(document.querySelector(".overlay-accessories").style.display);

function showOverlay(name) {
  if (name === "machines")
    document.querySelector(".overlay-accessories").style.display = "none";
  if (name === "accessories")
    document.querySelector(".overlay-machines").style.display = "none";

  const overlay = document.querySelector(`.overlay-${name}`);

  console.log(overlay.style.display);

  if (overlay.style.display === "none") {
    overlay.style.display = "flex";
  } else {
    overlay.style.display = "none";
  }
}
