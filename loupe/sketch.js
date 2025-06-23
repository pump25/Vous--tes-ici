let isTouching = false
let isMoving = false
let mouse = { x: 0, y: 0 }
let pos = { x: 0, y: 0 }
let posTarget = { x: 0, y: 0 }

let glassSize = 0
let glassSizeTarget = 0
let img1, img2
let mask

let parameters = document.getElementById("parameters");
let zf = document.getElementById("zf");
let zh = document.getElementById("zh");
let legend1 = document.getElementById("legend1");
let legend2 = document.getElementById("legend2");
let aprovebutton = document.getElementById("aprovebutton");
let parametersbutton = document.getElementById("parametersbutton");

// metaball
const minSpeed = 0;
const maxSpeed = 0;
const entities = 2;
let blobs = [];
const res = 4;

function preload() {
  img1 = loadImage('img/fond1.png')
  img2 = loadImage('img/fond2.png')
}

function setup() {
  createCanvas(windowWidth, windowHeight)
  pos.x = width/2
  pos.y = height/2
  posTarget.x = width/2
  posTarget.y = height/2

  mask = createGraphics(width, height)

  if(width>height) {
    img1.resize(width, width)
    img2.resize(width, width)
  }
  else {
    img1.resize(height, height)
    img2.resize(height, height)
  }

  imageMode(CENTER)
  mask.imageMode(CENTER)

  //metaballs
  createBlobs();
  grid = createGrid(res);
}

function draw() {
  image(img1, width/2, height/2)

  glassSize = lerp(glassSize, glassSizeTarget, 0.1)
  pos.x = lerp(pos.x, posTarget.x, 0.1)
  pos.y = lerp(pos.y, posTarget.y, 0.1)

  noStroke()
  fill('#EC6619')
  circle(pos.x, pos.y, 30)

  if(glassSize > 1) {
    mask.clear()

    mask.push()
    mask.beginClip({ invert: false })
    mask.circle(pos.x, pos.y, glassSize)
    mask.endClip()
    mask.image(img2, width/2, height/2)
    mask.pop()

    image(mask, width/2, height/2)

    noFill()
    // tracer rond initial
    //circle(width/2, height/2, 30)

    strokeWeight(map(glassSize, 10, glassSizeTarget, 0, 2))

    circle(pos.x, pos.y, glassSize)

    stroke('#EC6619')
    //metaballs
    blobs.map(blob => {
      blob.update();
    });
    blobs[1].x = pos.x;
    blobs[1].y = pos.y;
    blobs[1].r = glassSize/2;

    grid.update()

  }
}

function touchStarted() {
  mouse.x = mouseX
  mouse.y = mouseY
  posTarget.x = mouseX
  posTarget.y = mouseY

  isTouching = true
  glassSizeTarget = 200
}

function touchEnded() {
  isTouching = false
  isMoving = false
  glassSizeTarget = 0
  posTarget.x = width/2
  posTarget.y = height/2
}

function touchMoved() {
  mouse.x = mouseX
  mouse.y = mouseY
  posTarget.x = mouseX
  posTarget.y = mouseY
  isMoving = true
}

// vector definition
class RandSpeedVec {
  constructor(r) {
    const coef = (r / (4 * maxSpeed));
    const xSign = Math.random() < 0.5 ? -1 : 1;
    const ySign = Math.random() < 0.5 ? -1 : 1;
    this.x = xSign * (Math.random() * (maxSpeed - minSpeed) + minSpeed) / coef;
    this.y = ySign * (Math.random() * (maxSpeed - minSpeed) + minSpeed) / coef;
  }
}

// blob definition
class Blob {
  constructor(x, y, r) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.vel = new RandSpeedVec(r);
    this.update = () => {
      this.x = this.x + this.vel.x;
      this.y = this.y + this.vel.y;
      if (this.x + this.r > width || this.x - this.r < 0) {
        this.vel.x = this.vel.x * (-1);
      }
      if (this.y + this.r > height || this.y - this.r < 0) {
        this.vel.y = this.vel.y * (-1);
      }
    };
  }
}

// grid definition
class Grid {
  constructor() {
    this.cells = [];
    this.nodes = [];
    this.update = () => {
      for (var k = 0; k < this.nodes.length; k++) {
        this.nodes[k].forEach(node => {
          node.update();
          //node.show();
        });
      }
      for (var l = 0; l < this.cells.length; l++) {
        this.cells[l].forEach(cell => {
          cell.update();
          //cell.show();
        });
      }
    };
  }
}

// helpers for Cell
function getDirection(cornerPos, cellOrigin) {
  let coeff = 0;
  if (cornerPos > cellOrigin) {
    coeff = -1;
  } else {
    coeff = 1;
  }
  return coeff;
}

class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

// helper 
function findClosestPointFromMe(me, pointArray) {
  let dists = [];
  pointArray.forEach(point => {
    dists.push(dist(me.x, me.y, point.x, point.y));
  });
  return pointArray[dists.indexOf(Math.min(...dists))];
}

// cell definition
class Cell {
  constructor(x, y, corners) {
    this.x = x;
    this.y = y;
    this.corners = corners;
    this.show = () => {
      //noFill();
      stroke('blue');
      strokeWeight(0.5);
      square(this.x, this.y, res);
    };
    this.getArcTask = () => {
      // arcToDo = [[[first link],[second link]]]
      let arcToDo = [
        []
      ];
      let tasks = 0;
      let activeCount = 0;
      this.corners.forEach(corner => {
        if (corner.active == false) {
          let horizNeighbourX = corner.x + (getDirection(corner.x, this.x) * res);
          let horizNeighbour = getNode(horizNeighbourX / res, corner.y / res);
          let vertNeighbourY = corner.y + (getDirection(corner.y, this.y) * res);
          let vertNeighbour = getNode(corner.x / res, vertNeighbourY / res);
          if (arcToDo.length != tasks + 1) {
            arcToDo.push([]);
          }
          if (horizNeighbour.active == true && vertNeighbour.active == true) {
            arcToDo[tasks].push([corner, horizNeighbour]);
            arcToDo[tasks].push([corner, vertNeighbour]);
            tasks += 1;
          }
          else {
            if (horizNeighbour.active == true) {
              arcToDo[tasks].push([corner, horizNeighbour]);
            }
            if (vertNeighbour.active == true) {
              arcToDo[tasks].push([corner, vertNeighbour]);
            }
          }
        }
        else {
          activeCount += 1;
        }
      });
      return arcToDo;
    };
    // returns a Point object 
    // link = [unactive cell, active cell]
    this.createPointFromLink = link => {
      let unactive = link[0];
      let active = link[1];
      let tempX = null;
      let tempY = null;
      if (link[0].x == link[1].x) {
        tempX = link[0].x;
      }
      else if (link[0].y == link[1].y) {
        tempY = link[0].y;
      }
      if (tempY == null) {
        tempY = unactive.y + ((active.y - unactive.y) * ((1 - unactive.sum) / (active.sum - unactive.sum)));
      }
      else if (tempX == null) {
        tempX = unactive.x + ((active.x - unactive.x) * ((1 - unactive.sum) / (active.sum - unactive.sum)));
      }
      return new Point(tempX, tempY);
    };
    // arcToDo = [[[first link],[second link]]]
    this.update = () => {
      let arcToDo = this.getArcTask();
      let activeCorners = [];
      this.corners.forEach(corner => {
        if (corner.active == true) {
          activeCorners.push(corner);
        }
      });
      if (arcToDo[0].length != 0) {



        for (let task = 0; task < arcToDo.length; task++) {
          let points = [];
          for (let link = 0; link < 2; link++) {
            let point = this.createPointFromLink(arcToDo[task][link]);
            points.push(point);
          }
          fill('red')
          beginShape();
          vertex(points[0].x, points[0].y);
          vertex(points[1].x, points[1].y);
          endShape(CLOSE)
        }

      }
    };
  }
}

// node definition
class Node {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.active = false;
    this.sum = 0;
    this.update = () => {
      this.sum = 0;
      blobs.forEach(blob => {
        this.sum = this.sum + (Math.pow(blob.r, 2) / (Math.pow(this.x - blob.x, 2) + Math.pow(this.y - blob.y, 2)));
      });
      if (this.sum >= 1) {
        this.active = true;
      }
      else {
        this.active = false;
      }
    };
    this.show = () => {
      noStroke();
      if (this.active === true) {
        fill('red');
      }
      else {
        fill('blue');
      }
      circle(this.x, this.y, 3);
    };
  }
}

// initializer
function createGrid(res) {
  let newGrid = new Grid();

  // numbers of cells X and Y
  const nX = Math.ceil(width / res);
  const nY = Math.ceil(height / res);

  // generate the nodes
  for (var x = 0; x < nX + 1; x++) {
    newGrid.nodes.push([]);
    for (var y = 0; y < nY + 1; y++) {
      newGrid.nodes[x].push(new Node(x * res, y * res));
    }
  }

  // generate the cells and associate the nodes
  for (var cellX = 0; cellX < nX; cellX++) {
    newGrid.cells.push([]);
    for (var cellY = 0; cellY < nY; cellY++) {
      // get corners [topLeft, topRight, bottomLeft, bottomRight]
      let corners = [newGrid.nodes[cellX][cellY], newGrid.nodes[cellX + 1][cellY], newGrid.nodes[cellX][cellY + 1], newGrid.nodes[cellX + 1][cellY + 1]];
      // create cell
      newGrid.cells[cellX].push(new Cell((cellX * res), (cellY * res), corners));
    }
  }

  return newGrid;
}

// initializer
function createBlobs() {
    var randX = width/2;
    var randY = height/2;
  for (var i = 0; i < 1; i++) {
    // blob centrak
    blobs.push(new Blob(randX, randY, 12));
  }
  // blob de la loupe
  blobs.push(new Blob(mouseX-randX, mouseY-randY, 100));
}

// global grid
let grid;

// grid helper 
function getNode(x, y) {
  return grid.nodes[x][y];
}


//-------------------Interface--------------------------------//

zf.addEventListener("click", function(){
  legend1.style.display = "flex";
  legend2.style.display ="none";
  img2 = loadImage('img/fond2.png');
  zf.classList.add('active');
  zh.classList.remove('active');
});

zh.addEventListener("click", function(){
  legend1.style.display = "none";
  legend2.style.display ="flex";
  img2 = loadImage('img/fond3.png');
  zh.classList.add('active');
  zf.classList.remove('active');
});

aprovebutton.addEventListener("click", function(){
  parameters.style.top = "100vh";
  parameters.style.opacity = "0";
  setTimeout(function(){
    parameters.style.display = "none";
  }, 600);
});

parametersbutton.addEventListener("click", function(){
  parameters.style.display = "flex";
  setTimeout(function(){
  parameters.style.top = "0";
  parameters.style.opacity = "100";
  }, 20);
});

function addzf(color, text) {
  // Create legends
  const zfflex = document.createElement("div");
  const zfcolor = document.createElement("div");
  const zftext = document.createElement("div");
  zfflex.classList.add("flexbox");
  zfcolor.classList.add("colorRec");
  zfcolor.style.setProperty("--colorRec", color);
  zftext.classList.add("text");
  zftext.innerHTML = "<p>" + text + "</p>";
  legend1.appendChild(zfflex);
  zfflex.appendChild(zfcolor);
  zfflex.appendChild(zftext);
}

addzf("#F4F5F9", "15 - 20 C°");
addzf("#97ACFF", "20 - 30 C°");
addzf("#4B7BF4", "30 - 35 C°");
addzf("#0043FF", "35 - 40 C°");


