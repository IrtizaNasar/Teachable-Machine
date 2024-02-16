// Teachable Machine
// Adapted from The Coding Train / Daniel Shiffman
// https://thecodingtrain.com/TeachableMachine/1-teachable-machine.html


// The video
let video;
// For displaying the label
let label = "waiting...";

// The classifier
let classifier;
let modelURL = 'https://teachablemachine.withgoogle.com/models/UHRXjQM2L/'; // Replace with model URL



// STEP 1: Load the model! Before loading anything else 
function preload() {
  classifier = ml5.imageClassifier(modelURL + 'model.json');
}

let x = 50;
let y = 50;

function setup() {
  createCanvas(640, 520);

  // Create the video
  video = createCapture(VIDEO);
  video.hide();

  // STEP 3: Start classifying
  classifyVideo();
}

// STEP 2 Classify the video
function classifyVideo() {
  classifier.classify(video, gotResults);
}

function draw() {
  background(0);

  // Draw the video on canvas
  image(video, 0, 0);

  // STEP 5: Draw the label on canvas
  textSize(32);
  textAlign(CENTER, CENTER);
  fill(255);
  text(label, width / 2, height - 16);
  fill(0);
  
ellipse(x, y, 30)

  // STEP 6: Insert your model labels and instructions 
  if (label == "Bottle" && confidence>0.9) {
      //Instruction to do something
      x = x+1
  } else if (label == "No Bottle" && confidence>0.9) {
    //Instruction to do something
    x = x-1
  } 
}

// STEP 4: Get the classification!
function gotResults(error, results) {
  // Something went wrong!
  if (error) {
    console.error(error);
    return;
  }
  // Store the label and classify again!
  label = results[0].label; // By accessing results[0].label, we are retrieving the label with the highest confidence score from the array and assigning it to the label variable. 
  // console.log(results[0]);
  
  classifyVideo();
  confidence = nf(results[0].confidence, 0,2);
}
