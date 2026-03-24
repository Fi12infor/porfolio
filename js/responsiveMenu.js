const menuBtn = document.getElementById("mobileBtn");
const menuMobile = document.getElementById("mobileNav");

console.log("Script cargado");
menuBtn.addEventListener("click", () => {
  menuMobile.classList.toggle("active");
});
