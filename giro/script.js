// On récupère l'élément <img> avec l'ID "image"
const image = document.getElementById("img");
const image2 = document.getElementById("img2");
const line = document.getElementById("line");
const circle = document.getElementById("circle");
const rect1 = document.getElementById("rect1");
const rect2 = document.getElementById("rect2");
const content = document.getElementById("content");
const check = document.getElementById("check");
const max = document.getElementById("max");

// Tableau contenant les chemins des différentes images à afficher
//const images = ["IMG/img1.png", "IMG/img2.png"];

let checked = false;
// Événement déclenché quand le téléphone est orienté différemment
window.addEventListener(
  "deviceorientation",
  (event) => {
    // gamma : inclinaison gauche-droite du téléphone (-90 à +90)
    const gamma = event.gamma;

    // beta : inclinaison avant-arrière (non utilisé ici mais disponible)
    const beta = event.beta;

    // Selon l'inclinaison latérale, on change l’image :
    if (gamma < -60) {
      // Si le téléphone est penché vers la gauche (arrière si horizontal)
      image2.style.opacity = "100%";
      image.style.opacity = "0%";
      content.style.display = "flex";
      line.style.height = "89vh";
      line.style.top = "13%";
      circle.style.top = "8%";
      rect1.style.top = "100%";
      rect2.style.top = "100%";
      rect1.style.opacity = "0%";
      rect2.style.opacity = "0%";
      check.style.opacity = "0%";
      checked = true;
      max.style.opacity = "1";
    } else if (gamma < -30) {
      // Si le téléphone est penché vers la droite (avant)
      max.style.opacity = "0";
      image.style.display = "block";
      image.style.opacity = "100%";
      image.style.transform = "rotateX(0deg)";
      image2.style.opacity = "0%";
      line.style.height = "1px";
      line.style.top = "50%";
      circle.style.top = "50%";
      rect1.style.width = "50vw";
      rect2.style.width = "50vw";
      rect1.style.top = "53%";
      rect2.style.top = "53%";
      rect1.style.opacity = "100%";
      rect2.style.opacity = "100%";
      content.style.display = "none";

      if (checked === true) {
        check.style.opacity = "1";
      } else {
        check.style.opacity = "0%";
      }
    } else {
      // Si le téléphone est à peu près droit
      image.style.display = "block";
      image2.style.opacity = "0%";
      line.style.height = "1px";
      line.style.top = "50%";
      circle.style.top = "50%";
      rect1.style.width = "0vw";
      rect2.style.width = "0vw";
      rect1.style.top = "53%";
      rect2.style.top = "53%";
    }
  },
  true,
);
