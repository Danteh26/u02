const themeToggle = document.querySelector(".theme-toggle");
const savedTheme = localStorage.getItem("theme");

if (savedTheme === "dark") {
    document.documentElement.classList.add("dark-mode");
    themeToggle.textContent = "Light mode";
} else {
    document.documentElement.classList.remove("dark-mode");
    themeToggle.textContent = "Dark mode";
}

themeToggle.addEventListener("click", () => {
    document.documentElement.classList.toggle("dark-mode");

    if (document.documentElement.classList.contains("dark-mode")) {
        localStorage.setItem("theme", "dark");
        themeToggle.textContent = "Light mode";
    } else {
        localStorage.setItem("theme", "light");
        themeToggle.textContent = "Dark mode";
    }
});