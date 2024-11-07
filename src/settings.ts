const lang: HTMLSelectElement = document.querySelector("#settings_lang") as HTMLSelectElement;
lang.addEventListener("change", changeLang);

const time: HTMLSelectElement = document.querySelector("#settings_time_format") as HTMLSelectElement;
time.addEventListener("change", changeTimeFormat);

function changeLang() {
    console.log("TODO");
}

function changeTimeFormat() {
    console.log("TODO");
}