const projectList = document.querySelector(".project-list");

function showLoading() {
    projectList.innerHTML = "<p>Loading projects...</p>";
}

function showError(message) {
    projectList.innerHTML = "";

    const errorMessage = document.createElement("p");
    errorMessage.classList.add("error-message");
    errorMessage.setAttribute("role", "alert");
    errorMessage.textContent = message;

    projectList.appendChild(errorMessage);
}


function createLink(url, icon, text) {
    const link = document.createElement("a");

    link.href = url;

    const span = document.createElement("span");
    span.setAttribute("aria-hidden", "true");

    const image = document.createElement("img");
    image.src = icon;
    image.alt = "";

    span.appendChild(image);
    link.append(span, document.createTextNode(text));

    return link;
}


function createProjects(repositories) {
    projectList.innerHTML = "";

    if (repositories.length === 0) {
        projectList.textContent = "No public projects found.";
        return;
    }

    repositories.forEach(repo => {

        const article = document.createElement("article");
        article.classList.add("project-card");

        const projectImage = document.createElement("img");
        projectImage.src = "./assets/Rectangle-4.png";

        const content = document.createElement("div");
        content.classList.add("project-content");

        const title = document.createElement("h2");
        title.textContent = repo.name;

        const description = document.createElement("p");
        description.textContent = repo.description || "No description available.";

        const techStack = document.createElement("p");

        const strong = document.createElement("strong");
        strong.textContent = "Tech Stack: ";

        techStack.append(strong, document.createTextNode(repo.language || "Not specified"));

        const links = document.createElement("div");
        links.classList.add("project-links");

        if (repo.homepage) {
            links.appendChild(createLink(repo.homepage, "./assets/akar-icons_link-chain.svg", "Live Preview"));
        }

        links.appendChild(createLink(repo.html_url, "./assets/akar-icons_github-fill.svg", "View Code"));

        content.append(title, description, techStack, links);
        article.append(projectImage, content);

        projectList.appendChild(article);
    });
}


async function fetchProjects() {

    showLoading();

    try {
        const response = await fetch(`https://api.github.com/users/Danteh26/repos`);

        if (!response.ok) {
            throw new Error(
                `Failed to fetch projects. Status: ${response.status}`);
        }

        const repositories = await response.json();

        createProjects(repositories);

    } catch (error) {

        console.error("Github APi error:", error);

        showError("Unable to fetch projects from GIthub.");
    }
}

fetchProjects();