function languageStrings(lang) {
    document.querySelectorAll("[data-il8n]").forEach(element => {
        const key = element.getAttribute("data-il8n");
        element.textContent = lang[key];
    });
}

function setLanguage(lang) {
    localStorage.setItem("language", lang);
    location.reload();
}