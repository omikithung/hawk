// const menu  = document.querySelector('.header .menu'); //already declared in home.js
const vnavi = document.querySelector(".vnavi");
const look = document.querySelector(".look");
menu.addEventListener("click", () => {
  if (vnavi.style.display === "none") {
    vnavi.style.display = "flex";
    navi.style.display = "none";
    settingsMenu.style.display = "none";
    look.style.display = "flex";
  } else {
    vnavi.style.display = "none";
    navi.style.display = "flex";
    look.style.display = "none";
  }
});

const settingsT = document.querySelector("#settingsT");
const settingsMenu = document.querySelector(".settings");
settingsT.addEventListener("click", () => {
  if (settingsMenu.style.display === "flex") {
    settingsMenu.style.display = "none";
    navi.style.display = "none";
    vnavi.style.display = "none";
  } else {
    settingsMenu.style.display = "flex";
    navi.style.display = "none";
    vnavi.style.display = "none";
  }
});
const closeT = document.querySelector(".close");
closeT.addEventListener("click", () => {
  if (settingsMenu.style.display === "flex") {
    vnavi.style.display = "flex";
    settingsMenu.style.display = "none";
  }
});

//for id = "time"
setInterval(() => {
  var time = new Date().toLocaleTimeString();
  document.querySelector("#time").innerHTML =
    `<i class="far fa-clock"></i> ` + time;
}, 1000);
