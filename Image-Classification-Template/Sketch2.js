// Teachable Machine
// Adapted from The Coding Train / Daniel Shiffman
// https://thecodingtrain.com/TeachableMachine/1-teachable-machine.html


// The video
let video;
// For displaying the label
let label = "waiting...";
// The classifier
let classifier;
let modelURL = 'https://teachablemachine.withgoogle.com/models/mO2FdmAd3/';

// STEP 1: Load the model! Before loading anything else 
function preload() {
  classifier = ml5.imageClassifier(modelURL + 'model.json');
}

// let x = 50;
// let y = 50;

function setup() {
  createCanvas(640, 520);
  // Create the video
  video = createCapture(VIDEO);
  video.hide();
  // STEP 2: Start classifying
  classifyVideo();
}

// STEP 2 classify the videeo!
function classifyVideo() {
  classifier.classify(video, gotResults);
}

function draw() {
  background(0);

  // Draw the video
  image(video, 0, 0);

  // STEP 4: Draw the label
  textSize(32);
  textAlign(CENTER, CENTER);
  fill(255);
  text(label, width / 2, height - 16);
  fill(0);
  

  //STEP 6: Draw the ellipse
  // ellipse(x, y, 30);

  // STEP 5: Insert your model labels and instructions 
  if (label == "") {
      //Instruction to do something
  } else if (label == "") {
    //Instruction to do something
  } 

  // if (label == "Right" && confidence > 0.9) {
  //   x = x+1;
  // } else if (label == "Left" && confidence > 0.7) {
  //   x = x-1
  // } 
}

// STEP 3: Get the classification!
function gotResults(error, results) {
  // Something went wrong!
  if (error) {
    console.error(error);
    return;
  }
  // Store the label and classify again!
  label = results[0].label;
  console.log(results[0]);
  classifyVideo();
  // confidence = nf(results[0].confidence, 0, 2);
}
