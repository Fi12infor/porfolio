// Declaración de variables
const btn = document.querySelector(".modes-btn");
const darkModeIcon = document.querySelector(".darkmode");
const lightModeIcon = document.querySelector(".lightmode");
const mode = localStorage.getItem("theme");

// Codigo principal
// Detectar si en el localstorage tiene el theme con dark
if (mode === "dark") {
  darkModeIcon.classList.add("active");
  lightModeIcon.classList.remove("active");
  btn.classList.toggle("active");
  document.body.classList.add("dark");
  document.documentElement.classList.add("dark");
}

// si btn no contiene la clase active se activa el lightmode active
if (!btn.classList.contains("active")) {
  lightModeIcon.classList.add("active");
}

// Detectamos el evento del click en el boton y cuando pulse añadimos dark o light
btn.addEventListener("click", () => {
  darkModeIcon.classList.toggle("active");
  lightModeIcon.classList.toggle("active");
  btn.classList.toggle("active");
  document.documentElement.classList.toggle("dark");
  document.body.classList.toggle("dark");

  if (document.documentElement.classList.contains("dark")) {
    localStorage.setItem("theme", "dark");
  } else {
    localStorage.setItem("theme", "light");
  }
});
