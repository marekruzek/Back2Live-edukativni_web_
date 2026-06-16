const progressBar = document.querySelector("#scrollProgress");
const backToTopButton = document.querySelector(".back-to-top");
const readingTime = document.querySelector("#readingTime");
const performanceChart = document.querySelector(".sleep-chart--performance");
const sleepDurationCard = document.querySelector(".sleep-duration-card");

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

function animateOnFirstView(element, className, threshold = 0.35) {
    if (!element) return;

    if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver((entries, activeObserver) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;

                entry.target.classList.add(className);
                activeObserver.unobserve(entry.target);
            });
        }, {
            threshold
        });

        observer.observe(element);
    } else {
        element.classList.add(className);
    }
}

animateOnFirstView(performanceChart, "is-animated");
animateOnFirstView(sleepDurationCard, "is-animated", 0.28);

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
