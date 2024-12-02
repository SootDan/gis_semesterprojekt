const submitButton = document.getElementById("settings_save") as HTMLInputElement;
submitButton.addEventListener("click", changeSettings);


/**
 * Gets currently selected language.
 */
function changeLang(): string {
    const lang = document.querySelector("#settings_lang") as HTMLSelectElement;
    return lang.value;
}


/**
 * Gets currently selected time format.
 */
function changeTimeFormat(): string {
    const time = document.querySelector("#settings_time_format") as HTMLSelectElement;
    return time.value;
}


/**
 * Applies settings and reloads page.
 */
function changeSettings() {
    document.cookie = `language=${changeLang()}`;
    location.reload();
}