async function FetchProjects() {
  const res = await fetch("/api/projects");
  if (!res.ok) {
    throw new Error(`HTTP ${res.status}`);
  }

  const data = await res.json();
  return data;
}

async function LoadProjects() {
  const proyectos = await FetchProjects();
  const proyectosContainer = document.getElementById("projectSection");
  const stackPillContainer = document.querySelectorAll(".stackPill");
  proyectos.forEach((proyecto) => {
    proyectosContainer.innerHTML += `
        <div class="card" key="${proyecto.id}">
            <img src="${proyecto.imageUrl}" alt="">
            <div class="stack" id="stackPill">
                ${proyecto.technologies
                  .map(
                    (tech) =>
                      `<div class="stack-pill pill1">${tech.technology.name}</div>`,
                  )
                  .join("")}
            </div>
            <div class="details">
                <h3 class="title">${proyecto.title}</h3>
                <p class="description">
                    ${proyecto.shortDescription}
                </p>
            </div>
            <div class="btns">
                <a href="${proyecto.demoUrl}" class="btn btn-primary" target="_blank">
                    Ver Web
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
                        fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                        stroke-linejoin="round" class="lucide lucide-external-link-icon lucide-external-link">
                        <path d="M15 3h6v6" />
                        <path d="M10 14 21 3" />
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                    </svg>
                </a>
                <a href="${proyecto.repositoryUrl}" class="btn btn-secundary" target="_blank">
                    Ver Codigo
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
                        fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                        stroke-linejoin="round" class="lucide lucide-code-icon lucide-code">
                        <path d="m16 18 6-6-6-6" />
                        <path d="m8 6-6 6 6 6" />
                    </svg>
                </a>
            </div>
        </div>
        `;
  });
}

LoadProjects();
