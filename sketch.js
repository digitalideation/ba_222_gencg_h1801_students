// Noise generated circle

// Global var
// Some of the var might be initialised in gui.js
var canvas, backgroundGrey, radius;
var actRandomSeed, count, points, increment;

function setup() {
  // Canvas setup
  canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent("p5Container");
  // Detect screen density (retina)
  // Comment it out if the sketch is too slow
  var density = displayDensity();
  pixelDensity(density);
  // Init var
  // some of the var are initialised in gui.js
  backgroundGrey = 0;
  count = 150;
  points = [count];
  background(backgroundGrey);
  radius = 20;
  increment = +1;
}

function draw() {
  // background(backgroundGrey, 20);
  smooth();

  // Create points array
  let faderX = .1;
  let t = millis()/1000;
  // let r = map(mouseY,0,height,10,radius);
  if (radius>width/1.7 && radius>height/1.7) increment = -increment;
  else if (radius<20) increment = -increment;
  radius += increment; 
  let angle = radians(360/count);

  for (let i=0; i<count; i++){
    let radiusRand = radius - noise(t, i*faderX)*50;
    let x = width/2 + cos(angle*i)*radiusRand;
    let y = height/2 + sin(angle*i)*radiusRand;
    points[i] = createVector(x,y);
  }

  // Draw
  // stroke(noise(t/10)*255,0,noise(t/1)*100,255);
  strokeHsluv(noise(t/10)*360,noise(t/20)*50,noise(t)*80);
  strokeWeight(20);
  noFill();
  beginShape();
  for (let i=0; i<count; i++){
    // fill(255);
    // ellipse(points[i].x, points[i].y,2,2);
    // noFill();
    curveVertex(points[i].x, points[i].y);
    if (i==0 || i==count-1) curveVertex(points[i].x, points[i].y);
  }
  endShape(CLOSE);
}

function keyPressed() {
  if (key == DELETE || key == BACKSPACE) background(360);  
  if (key == 's' || key == 'S') saveThumb(650, 350);
}

// Color functions
function fillHsluv(h, s, l) {
  var rgb = hsluv.hsluvToRgb([h, s, l]);
  fill(rgb[0] * 255, rgb[1] * 255, rgb[2] * 255);
}

function strokeHsluv(h, s, l) {
  var rgb = hsluv.hsluvToRgb([h, s, l]);
  stroke(rgb[0] * 255, rgb[1] * 255, rgb[2] * 255);
}

function colorHsluv(h, s, l) {
  var rgb = hsluv.hsluvToRgb([h, s, l]);
  return color(rgb[0] * 255, rgb[1] * 255, rgb[2] * 255);
}

// Tools

// resize canvas when the window is resized
function windowResized() {
  resizeCanvas(windowWidth, windowHeight, false);
}

//  conversion
function toInt(value) {
  return ~~value;
}

// Timestamp
function timestamp() {
  return Date.now();
}

// Thumb
function saveThumb(w, h) {
  let img = get(width / 2 - w / 2, height / 2 - h / 2, w, h);
  save(img, 'thumb.jpg');
}