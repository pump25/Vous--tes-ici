var circle = document.getElementById("circle");
var circle2 = document.getElementById("circle2");
var circle3 = document.getElementById("circle3");
const add = document.getElementById("add");
const remove = document.getElementById("remove");
const image1 = document.getElementById("image1");
const image2 = document.getElementById("image2");
const image3 = document.getElementById("image3");

const content = document.getElementById("content");
const content2 = document.getElementById("content2");

const filter1 = document.getElementById("filter1");
const filter2 = document.getElementById("filter2");
const tagcontainer1 = document.getElementById("tagcontainer1");
const tagcontainer2 = document.getElementById("tagcontainer2");
const all1 = document.getElementById("all1");
const all2 = document.getElementById("all2");

const info = document.getElementById("info");
const close = document.getElementById("close");
const legends = document.getElementById("legends");
const loyers = document.getElementById("loyers");
const salaires = document.getElementById("salaires");

var mc = new Hammer(circle);
mc.get("pan").set({ direction: Hammer.DIRECTION_ALL });
mc.get("press").set({ time: 400 });

let step1 = true;
let step2 = false;

let widgetvisible = false;

mc.on("press", function () {
  if (step1 === true) {
    add.style.transform = "translate(-50%, -50%) scale(1)";
    widgetvisible = true;
    circle.classList.add("paused");
  } else if (step2 === true && step1 === false) {
    add.style.transform = "translate(-50%, -50%) scale(1)";
    remove.style.transform = "translate(-50%, -50%) scale(1)";
    add.style.height = "25%";
    add.style.top = "80%";
    image1.style.height = "33vh";
    image2.style.height = "33%";
    image2.style.top = "33%";
    widgetvisible = true;
    circle2.style.top = "16.5%";
    content.style.height = "33%";
    content2.style.top = "33%";
    content2.style.height = "33%";
    circle.classList.add("paused");
  
  
  
  }else{
    remove.style.transform = "translate(-50%, -50%) scale(1)";
    remove.style.top = "50%";
    widgetvisible = true;
    circle.classList.add("paused");
  }
});

mc.on("pressup", function () {
  if (step1 === true) {
    add.style.transform = "translate(-50%, -50%) scale(0)";
    widgetvisible = false;
    circle.classList.remove("paused");
  } else if (step2 === true && step1 === false) {
    add.style.transform = "translate(-50%, -50%) scale(0)";
    remove.style.transform = "translate(-50%, -50%) scale(0)";
    image1.style.height = "50vh";
    image2.style.height = "50%";
    image2.style.top = "50%";
    widgetvisible = false;
    circle2.style.top = "25%";
    content.style.height = "50%";
    content2.style.top = "50%";
    content2.style.height = "50%";
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
  } else if (step2 === true && step1 === false) {
    let seuil1 = window.innerHeight * 0.3;
    let seuil2 = window.innerHeight * 0.7;

    if (y < seuil1) {
      add.style.transform = "translate(-50%, -50%) scale(0)";
      remove.style.height = "40%";
      remove.style.top = "25%";
      image1.style.height = "50vh";
      image2.style.height = "50%";
      image2.style.top = "50%";
      circle2.style.top = "25%";
      content.style.height = "50%";
      content2.style.top = "50%";
      content2.style.height = "50%";
    
    } else if (y < seuil2) {
      add.style.transform = "translate(-50%, -50%) scale(1)";
      remove.style.transform = "translate(-50%, -50%) scale(1)";
      remove.style.height = "25%";
      remove.style.top = "18%";
      add.style.height = "25%";
      add.style.top = "80%";
      image1.style.height = "33vh";
      image2.style.height = "33%";
      image2.style.top = "33%";
      widgetvisible = true;
      circle2.style.top = "16.5%";
      content.style.height = "33%";
      content2.style.top = "33%";
      content2.style.height = "33%";
    
    } else {
      remove.style.transform = "translate(-50%, -50%) scale(0)";
      add.style.height = "40%";
      add.style.top = "75%";
      image1.style.height = "0vh";
      image2.style.height = "50%";
      image2.style.top = "0%";
      circle2.style.top = "25%";
      content.style.height = "50%";
      content2.style.top = "50%";
      content2.style.height = "50%";
    }
  } else {
    let seuil3 = window.innerHeight * 0.6;
    
    if( seuil3 > y){
      remove.style.height = "40%";
      remove.style.top = "75%";
      image1.style.height = "50vh";
      image2.style.height = "50%";
      image2.style.top = "50%";
      image3.style.opacity = "0%";
      circle2.style.top = "25%";
      circle3.style.opacity = "0%"
      content.style.height = "50%";
      content2.style.top = "50%";
      content2.style.height = "50%";
    } else {
      remove.style.height = "25%";
      remove.style.top = "50%";
      image1.style.height = "33vh";
      image2.style.height = "33%";
      image2.style.top = "33%";
      image3.style.opacity = "100%";
      circle2.style.top = "25%";
      circle3.style.opacity = "0%"
      content.style.height = "33%";
      content2.style.top = "33%";
      content2.style.height = "33%";
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
      content2.style.display = "flex";
      content.style.height = "50%";
      widgetvisible = false;
      circle.classList.remove("paused");
      salaires.style.display = "flex";
      step1 = false;
      step2 = true;
    } else {
      add.style.transform = "translate(-50%, -50%) scale(0)";
      image1.style.height = "100vh";
      image2.style.opacity = "0%";
      circle.style.top = "55%";
      circle.style.left = "46.5%";
      circle2.style.opacity = "0%";
      content2.style.display = "none";
      widgetvisible = false;
      content.style.height = "100%";
      circle.classList.remove("paused");
    }
  } else if (step2 === true && step1 === false) {
    let seuil1 = window.innerHeight * 0.3;
    let seuil2 = window.innerHeight * 0.7;

    if (y < seuil1) {
      add.style.transform = "translate(-50%, -50%) scale(0)";
      remove.style.transform = "translate(-50%, -50%) scale(0)";
      image1.style.height = "100vh";
      image2.style.opacity = "0%";
      circle.style.top = "50%";
      circle.style.left = "46.5%";
      circle2.style.opacity = "0%";
      content2.style.display = "none";
      widgetvisible = false;
      content.style.height = "100%";
      circle.classList.remove("paused");
      step1 = true;
      step2 = false;
    } else if (y < seuil2) {
      add.style.transform = "translate(-50%, -50%) scale(0)";
      remove.style.transform = "translate(-50%, -50%) scale(0)";
      image1.style.height = "50vh";
      image2.style.height = "50%";
      image2.style.top = "50%";
      widgetvisible = false;
      circle.style.top = "75%";
      circle.style.left = "46.5%";
      circle2.style.top = "25%";
      content.style.height = "50%";
      content2.style.top = "50%";
      content2.style.height = "50%";
      circle.classList.remove("paused");
    } else {
      image3.style.opacity = "100%";
      image1.style.height = "33vh";
      image2.style.height = "33%";
      image2.style.top = "33%";
      add.style.transform = "translate(-50%, -50%) scale(0)";
      add.style.height = "25%";
      remove.style.transform = "translate(-50%, -50%) scale(0)";
      remove.style.top = "50%";
      circle2.style.top = "18%";
      circle3.style.opacity = "100%";
      circle.style.top = "82%";
      circle.style.left = "46.5%";
      content.style.height = "33%";
      content2.style.top = "33%";
      content2.style.height = "33%";
      circle.classList.remove("paused");
      widgetvisible = false;
      step2 = false;
    }
  
  } else {
    let seuil3 = window.innerHeight * 0.6;

    if( seuil3 > y){
      image2.style.opacity = "100%";
      add.style.transform = "translate(-50%, -50%) scale(0)";
      remove.style.transform = "translate(-50%, -50%) scale(0)";
      setTimeout(function(){
      remove.style.height = "25%";
      remove.style.top = "15%";
      },900);
      circle.style.top = "75%";
      circle.style.left = "46.5%";
      circle2.style.opacity = "100%";
      content2.style.display = "flex";
      content.style.height = "50%";
      widgetvisible = false;
      circle.classList.remove("paused");
      salaires.style.display = "flex";
      step1 = false;
      step2 = true;
    } else {
      image3.style.opacity = "100%";
      image1.style.height = "33vh";
      image2.style.height = "33%";
      image2.style.top = "33%";
      add.style.transform = "translate(-50%, -50%) scale(0)";
      add.style.height = "25%";
      remove.style.transform = "translate(-50%, -50%) scale(0)";
      remove.style.top = "50%";
      circle2.style.top = "18%";
      circle3.style.opacity = "100%";
      circle.style.top = "82%";
      circle.style.left = "46.5%";
      content.style.height = "33%";
      content2.style.top = "33%";
      content2.style.height = "33%";
      circle.classList.remove("paused");
      widgetvisible = false;
      step2 = false;
      step1 = false;
    }
    
  }
  
});

// Buttons filter

let display = false;
let display2 = false;

filter1.addEventListener("click", function () {
  if (display === false) {
    tagcontainer1.style.display = "flex";
    display = true;
  } else {
    tagcontainer1.style.display = "none";
    display = false;
  }
});

filter2.addEventListener("click", function () {
  if (display2 === false) {
    tagcontainer2.style.display = "flex";
    display2 = true;
  } else {
    tagcontainer2.style.display = "none";
    display2 = false;
  }
});

// click an element to change background

function addColor(color, img) {
  // Create button
  const btn = document.createElement("div");
  btn.classList.add("rect");
  btn.style.setProperty("--color", color);
  tagcontainer1.appendChild(btn);

  btn.addEventListener("click", () => {
    image1.src = "./img/" + img + ".png";
  });
  all1.addEventListener("click", () => {
    image1.src = "img/fond1.png";
  });
}

addColor("#3E5268", "fond1-5");
addColor("#758495", "fond1-4");
addColor("#96A5B6", "fond1-3");
addColor("#ACBED2", "fond1-2");
addColor("#CFE6FF", "fond1-1");

function addColor2(color, img) {
  // Create button
  const btn = document.createElement("div");
  btn.classList.add("rect");
  btn.style.setProperty("--color", color);
  tagcontainer2.appendChild(btn);

  btn.addEventListener("click", () => {
    image2.src = "./img/" + img + ".png";
  });
  all2.addEventListener("click", () => {
    image2.src = "img/fond2.png";
  });
}

addColor2("#2A457A", "fond2-5");
addColor2("#5470A7", "fond2-4");
addColor2("#7992C4", "fond2-3");
addColor2("#9EB3DC", "fond2-2");
addColor2("#B7CFFE", "fond2-1");

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

function addLoyer(color, text) {
  // Create legends
  const loyer = document.createElement("div");
  const colorloyer = document.createElement("div");
  const textloyer = document.createElement("div");
  loyer.classList.add("flexbox");
  colorloyer.classList.add("colorRec");
  colorloyer.style.setProperty("--colorRec", color);
  textloyer.classList.add("text");
  textloyer.innerHTML = "<p>" + text + "</p>";
  loyers.appendChild(loyer);
  loyer.appendChild(colorloyer);
  loyer.appendChild(textloyer);
}

addLoyer("#3E5268", "11 - 11.6€/m²");
addLoyer("#758495", "11.6 - 12.2€/m²");
addLoyer("#96A5B6", "12.2 - 12.8€/m²");
addLoyer("#ACBED2", "12.8 - 13.5€/m²");
addLoyer("#CFE6FF", "13.5 - 14.1€/m²");

function addSalaire(color, text) {
  // Create legends
  const salaire = document.createElement("div");
  const colorsalaire = document.createElement("div");
  const textsalaire = document.createElement("div");
  salaire.classList.add("flexbox");
  colorsalaire.classList.add("colorRec");
  colorsalaire.style.setProperty("--colorRec", color);
  textsalaire.classList.add("text");
  textsalaire.innerHTML = "<p>" + text + "</p>";
  salaires.appendChild(salaire);
  salaire.appendChild(colorsalaire);
  salaire.appendChild(textsalaire);
}

addSalaire("#2A457A", "12 770 à 19 430 €");
addSalaire("#5470A7", "19 620 à 23 190 €");
addSalaire("#96A5B6", "23 260 à 25 900 €");
addSalaire("#ACBED2", "25 910 à 28 420 €");
addSalaire("#CFE6FF", "28 430 à 44 350 €");
