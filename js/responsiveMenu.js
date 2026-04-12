const menuBtn = document.getElementById("mobileBtn");
const menuMobile = document.getElementById("mobileNav");

menuBtn.addEventListener("click", () => {
  menuMobile.classList.toggle("active");
});
