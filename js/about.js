async function fetchData() {
    try {
        const response = await fetch("./json/cv.json");

        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
        }

        const data = await response.json();

        renderWorkExperience(data.workExperience);
        renderEducation(data.education);
        makeToggleButtons();
    } catch (error) {
        console.error("Fetch error:", error);
    }
}


function renderWorkExperience(workExperience) {
    const section = document.querySelector(".work-experience");
    const header = section.querySelector(".section-header");

    section.replaceChildren(header);

    workExperience.forEach(work => {
        const article = document.createElement("article");
        article.classList.add("experience-item");

        article.innerHTML = `
            <div class="experience-header">
                <h3>${work.title}</h3>
                <p class="experience-type">${work.type}</p>
            </div>

            <div class="details">
                <div class="company">
                    <span>
                        <img src="./assets/mdi_office-building.svg" alt="building icon">
                        ${work.company}
                    </span>
                    <p>${work.date}</p>
                </div>

                <div class="location">
                    <span>
                        <img src="./assets/carbon_location.svg" alt="location icon">
                        ${work.location}
                    </span>
                </div>
            </div>
        `;

        section.appendChild(article);
    });
}

function renderEducation(educationList) {
    const section = document.querySelector(".education");
    const header = section.querySelector(".section-header");

    section.replaceChildren(header);

    educationList.forEach(education => {
        const article = document.createElement("article");
        article.classList.add("education-item");

        article.innerHTML = `
            <div class="education-header">
                <h3>${education.title}</h3>
                <p class="experience-type">Full Time</p>
            </div>

            <div class="details">
                <div class="institution">
                    <span>
                        <img src="./assets/mdi_office-building.svg" alt="building icon">
                        ${education.school}
                    </span>
                    <p>${education.date}</p>
                </div>

                <div class="location">
                    <span>
                        <img src="./assets/carbon_location.svg" alt="location icon">
                        ${education.location}
                    </span>
                </div>
            </div>
        `;
        section.appendChild(article);
    });
}
fetchData();

function makeToggleButtons() {
    const sections = document.querySelectorAll(".work-experience, .education");

    sections.forEach(function(section) {
        const button = section.querySelector(".toggle-btn");

        button.addEventListener("click", function() {
            const articles = section.querySelectorAll("article");

            const isHidden = articles[0].hidden;

            articles.forEach(function(article) {
                article.hidden = !isHidden;
            });

            if (isHidden) {
                button.textContent = "Hide";
            } else {
                button.textContent = "Show";
            }
        });
    });
}