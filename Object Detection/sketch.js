// VIDEO SKETCH 

let img;
let detector;
let video;
let detections = [];


function preload() {
  detector = ml5.objectDetector('cocossd');
}

function gotDetections(error, results) {
  if (error) {
    console.log(error);
  }
  detections = results;
  console.log(detections.length);
  detector.detect(video, gotDetections);
}


function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO);
  video.size(640, 480);
  video.hide();
  // detector.detect(video, gotDetections);
  // setTimeout(() => {  detector.detect(video, gotDetections); }, 3000);
  setTimeout(function() {detector.detect(video, gotDetections);}, 3000);

  
  }

function draw() {
  // image(video,0,0);
  // console.log(detections.length);
  
  for (let i =0; i < detections.length; i++) {
    let object = detections[i];
    stroke(0, 255, 0);
    strokeWeight(4);
    noFill();
    rect (object.x, object.y, object.width, object.height);
    noStroke();
    fill(0,255,0);
    textSize(40);
    text (object.label, object.x+5, object.y-20);
    }
  // if (detections.length>2){
  //     background(black);
  //   }
}