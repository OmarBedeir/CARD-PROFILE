const lightClick = document.querySelector(".lights-input");
const light = document.querySelector(".lights");
lightClick.addEventListener("click", () => {
  light.classList.toggle("active");
});
const bottomColumns = document.querySelectorAll(".column");
for (let i = 0; i < bottomColumns.length; i++) {
  const element = bottomColumns[i];
  element.addEventListener("mouseenter", () => {
    element.classList.add("anemation");
  });
  element.addEventListener("mouseleave", () => {
    element.classList.remove("anemation");
  });
}

bottomColumns.forEach((element) => {
  element.addEventListener("click", () => {
    element.classList.toggle("active"); // Toggle the "active" class on click
  });
});
bottomColumns.forEach((element, index) => {
  setTimeout(() => {
    element.classList.add("active");
  }, index * 300); // Delay each column's animation by 300ms
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
      } else {
        entry.target.classList.remove("active");
      }
    });
  },
  {
    threshold: 0.5, // Trigger when 50% of the element is visible
  }
);

bottomColumns.forEach((element) => {
  observer.observe(element);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "ArrowRight") {
    bottomColumns.forEach((element) => {
      element.classList.add("active");
    });
  } else if (event.key === "ArrowLeft") {
    bottomColumns.forEach((element) => {
      element.classList.remove("active");
    });
  }
});

// fetch("projects.json")
//   .then((response) => response.json())
//   .then((data) => {
//     const projectsSection = document.getElementById("projects");
//     data.forEach((project) => {
//       projectsSection.innerHTML += `
//                 <div class="project">
//                     <h3>${project.title}</h3>
//                     <p>${project.description}</p>
//                     <a href="${project.link}" target="_blank">View Project</a>
//                 </div>
//             `;
//     });
//   });

// Fetch translations and projects data
Promise.all([
  fetch("translations.json").then((response) => response.json()),
  fetch("projects.json").then((response) => response.json()),
])
  .then(([translations, projects]) => {
    const languageToggle = document.getElementById("language-toggle");
    let currentLang = "en"; // Default language

    // Function to update the page content
    function updateContent(lang) {
      // Update static text
      document.getElementById("my-name").textContent =
        translations[lang]["my-name"];
      document.getElementById("profession").textContent =
        translations[lang]["profession"];
      document.getElementById("projects-title").textContent =
        translations[lang]["projects-title"];

      // Update dynamic projects
      const projectsSection = document.getElementById("project-list");
      projectsSection.innerHTML = ""; // Clear existing content
      projects.forEach((project) => {
        projectsSection.innerHTML += `
          <div class="project">
            <h3>${translations[lang][`${project.id}-title`]}</h3>
            <p>${translations[lang][`${project.id}-description`]}</p>
            <a href="${project.link}" target="_blank">${
          translations[lang]["view-project"]
        }</a>
          </div>
        `;
      });
    }

    // Toggle between English and Arabic
    languageToggle.addEventListener("click", () => {
      if (currentLang === "en") {
        currentLang = "ar";
        languageToggle.textContent = "English";
      } else {
        currentLang = "en";
        languageToggle.textContent = "عربي";
      }
      updateContent(currentLang);
    });

    // Initialize the page with the default language
    updateContent(currentLang);
  })
  .catch((error) => console.error("Error loading data:", error));
