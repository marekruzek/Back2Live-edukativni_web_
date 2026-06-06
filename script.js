const progressBar = document.querySelector("#scrollProgress");
const backToTopButton = document.querySelector(".back-to-top");
const readingTime = document.querySelector("#readingTime");

function updateReadingTime() {
    if (!readingTime) return;

    const article = document.querySelector(".article-shell");
    if (!article) return;

    const words = article.innerText.trim().split(/\s+/).filter(Boolean).length;
    const minutes = Math.max(1, Math.ceil(words / 180));
    readingTime.textContent = `${minutes} min čtení`;
}

function updateScrollUi() {
    const scrollTop = window.scrollY;
    const pageHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = pageHeight > 0 ? (scrollTop / pageHeight) * 100 : 0;

    if (progressBar) {
        progressBar.style.width = `${progress}%`;
    }

    if (backToTopButton) {
        backToTopButton.classList.toggle("is-visible", scrollTop > 420);
    }
}

updateReadingTime();
updateScrollUi();

window.addEventListener("scroll", updateScrollUi, { passive: true });
window.addEventListener("resize", updateScrollUi);

if (backToTopButton) {
    backToTopButton.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
}
