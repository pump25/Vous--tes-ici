var circle = document.getElementById("circle");
var circle2 = document.getElementById("circle2");
const add = document.getElementById("add");
const remove = document.getElementById("remove");
const image1 = document.getElementById("image1");
const image2 = document.getElementById("image2");

const content = document.getElementById("content");

const info = document.getElementById("info");
const close = document.getElementById("close");
const legends = document.getElementById("legends");
const fleuve = document.getElementById("fleuve");


var mc = new Hammer(circle);
mc.get("pan").set({ direction: Hammer.DIRECTION_ALL });
mc.get("press").set({ time: 400 });

let step1 = true;
let step2 = false;
fleuve.style.display = "none";

let widgetvisible = false;

mc.on("press", function () {
  if (step1 === true) {
    add.style.transform = "translate(-50%, -50%) scale(1)";
    widgetvisible = true;
    circle.classList.add("paused");
  } else {
    remove.style.transform = "translate(-50%, -50%) scale(1)";
    remove.style.top = "25%"
    remove.style.height = "40%";
    widgetvisible = true;
    circle.classList.add("paused");
  }
});

mc.on("pressup", function () {
  if (step1 === true) {
    add.style.transform = "translate(-50%, -50%) scale(0)";
    widgetvisible = false;
    circle.classList.remove("paused");
  } else {
    remove.style.transform = "translate(-50%, -50%) scale(0)";
    widgetvisible = false;
    circle.classList.remove("paused");
  }
});

mc.on("pan", (ev) => {
  if (!widgetvisible) return;

  const x = ev.center.x;
  const y = ev.center.y;
  const seuil = window.innerHeight * 0.5;

  circle.style.left = `${x}px`;
  circle.style.top = `${y}px`;

  if (step1 === true) {
    if (ev.direction === Hammer.DIRECTION_DOWN) {
      image1.style.height = "50vh";
      add.style.transform = "translate(-50%, -50%) scale(1)";
      content.style.height = "50%";
      circle.classList.add("paused");
    }

    if (y < seuil) {
      image1.style.height = "100vh";
      add.style.transform = "translate(-50%, -50%) scale(0)";
      circle.style.top = "55%";
      circle.style.left = "46.5%";
      content.style.height = "100%";
      circle.classList.add("paused");
    }
  } else {
    let seuil1 = window.innerHeight * 0.5;

    if (y > seuil1) {
      remove.style.transform = "translate(-50%, -50%) scale(0)";
    } else {
      remove.style.transform = "translate(-50%, -50%) scale(1)";
    }
  }
});

mc.on("panend", (ev) => {
  const y = ev.center.y;
  const seuil = window.innerHeight * 0.7;
  widgetvisible = false;

  if (step1 === true) {
    if (y > seuil) {
      // déclencher animation
      image2.style.opacity = "100%";
      add.style.transform = "translate(-50%, -50%) scale(0)";
      circle.style.top = "75%";
      circle.style.left = "46.5%";
      circle2.style.opacity = "100%";
      content.style.height = "50%";
      widgetvisible = false;
      circle.classList.remove("paused");
      step1 = false;
      step2 = true;
      fleuve.style.display = "flex";
    } else {
      add.style.transform = "translate(-50%, -50%) scale(0)";
      image1.style.height = "100vh";
      image2.style.opacity = "0%";
      circle.style.top = "55%";
      circle.style.left = "46.5%";
      circle2.style.opacity = "0%";
      widgetvisible = false;
      content.style.height = "100%";
      circle.classList.remove("paused");
    }
  } else {
    let seuil1 = window.innerHeight * 0.5;

    if (y < seuil1) {
      add.style.transform = "translate(-50%, -50%) scale(0)";
      remove.style.transform = "translate(-50%, -50%) scale(0)";
      image1.style.height = "100vh";
      image2.style.opacity = "0%";
      circle.style.top = "55%";
      circle.style.left = "46.5%";
      circle2.style.opacity = "0%";
      widgetvisible = false;
      content.style.height = "100%";
      circle.classList.remove("paused");
      fleuve.style.display = "none";
      step1 = true;
      step2 = false;
    } else {
      add.style.transform = "translate(-50%, -50%) scale(0)";
      remove.style.transform = "translate(-50%, -50%) scale(0)";
      image1.style.height = "50vh";
      image2.style.height = "50%";
      image2.style.top = "50%";
      widgetvisible = false;
      circle.style.top = "75%";
      circle.style.left = "";
      circle.style.left = "46.5%";
      circle2.style.top = "25%";
      content.style.height = "50%";
      circle.classList.remove("paused");
      fleuve.style.display = "flex";
    } 
  }
});


let hide = true;

info.addEventListener("click", function () {
  if (hide === true) {
    legends.style.display = "flex";
    hide = false;
  } else {
    legends.style.display = "none";
    hide = true;
  }
});

close.addEventListener("click", function () {
  if (hide === false) {
    legends.style.display = "none";
    hide = true;
  } else {
    legends.style.display = "flex";
    hide = false;
  }
});

