window.addEventListener("scroll", () => {
    document.getElementById("header").classList.toggle("scrolled", window.scrollY > 50);
});

document.getElementById("getStartedBtn").addEventListener("click", () => {
    document.getElementById("contact").scrollIntoView({ behavior: "smooth" });
});

let questions = document.querySelectorAll(".question");
questions.forEach((q) => {
    q.addEventListener("click", () => {
        document.querySelectorAll(".answer").forEach(a => a.style.display = "none");
        q.nextElementSibling.style.display = "block";
    });
});

document.getElementById("contactForm").addEventListener("submit", (e) => {
    e.preventDefault();
    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let msg = document.getElementById("message").value;

    if (!name || !email || !msg) {
        alert("Please fill all fields!");
        return;
    }
    alert("Message Sent!");
});

const topBtn = document.getElementById("backToTop");
window.addEventListener("scroll", () => {
    topBtn.style.display = window.scrollY > 300 ? "block" : "none";
});

topBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
});
