function createStars(id, count) {
    const container = document.getElementById(id);

    for (let i = 0; i < count; i++) {
        const star = document.createElement("div");

        const size = Math.random() * 2;

        star.style.position = "absolute";
        star.style.width = size + "px";
        star.style.height = size + "px";
        star.style.background = "white";
        star.style.borderRadius = "50%";

        star.style.top = Math.random() * 100 + "%";
        star.style.left = Math.random() * 100 + "%";

        star.style.opacity = Math.random();
        star.style.animation = `twinkle ${2 + Math.random() * 5}s infinite`;

        container.appendChild(star);
    }
}

createStars("stars", 120);
createStars("stars2", 80);
createStars("stars3", 50);

const modal = document.getElementById("modal");
const closeBtn = document.getElementById("close");

const modalTitle = document.getElementById("modal-title");
const modalDesc = document.getElementById("modal-desc");
const modalStack = document.getElementById("modal-stack");
const modalSoftSkill = document.getElementById("modal-soft-skill");
const modalAnalyse = document.getElementById("modal-analyse");
const modalLink = document.getElementById("modal-link");

const modalProblem = document.getElementById("modal-problem");
const modalSolution = document.getElementById("modal-solution");

const modalImage = document.getElementById("modal-image");

document.querySelectorAll(".project-card").forEach(card => {
    card.addEventListener("click", () => {

        modalTitle.textContent = card.dataset.title || "";

        modalImage.src = card.dataset.image;

        if (modalProblem) {
            modalProblem.textContent = card.dataset.problem || "";
        }

        modalDesc.textContent = card.dataset.desc || "";

        if (modalSolution) {
            modalSolution.textContent = card.dataset.solution || "";
        }

        modalStack.textContent = "Stack : " + (card.dataset.stack || "");
        modalSoftSkill.textContent = "Soft Skills : " + (card.dataset.softSkill || "");
        modalAnalyse.textContent = (card.dataset.analyse || "");

        if (card.dataset.link) {
            modalLink.href = card.dataset.link;
            modalLink.style.display = "inline-block";
        } else {
            modalLink.style.display = "none";
        }

        modal.classList.remove("hidden");
    });
});

function closeModal() {
    modal.classList.add("hidden");
}

closeBtn.addEventListener("click", closeModal);

modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
});

document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeModal();
});