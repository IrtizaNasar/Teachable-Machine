let mobilenet;
let predictor;
let video;
let value = 0;
let song;
let speed;
let sliderRate;
let addButton;
let trainButton;


function preload() {
  // Load a sound file
  song = loadSound('assets/Backstreet Boys Everybody Radio Edit.mp3');
}

function modelReady() {
  console.log('Model is ready!!!');
}

function videoReady() {
  console.log('Video is ready!!!');
}

function whileTraining(loss) {
  if (loss == null) {
    console.log('Training Complete');
    predictor.predict(gotResults);
  } else {
    console.log(loss);
  }
}

function gotResults(error, result) {
  if (error) {
    console.error(error);
  } else {
    // updated to work with newer version of ml5
    // value = result;
    value = result.value;
    predictor.predict(gotResults);
  }
}

function setup() {

  createCanvas(640, 480);
  video = createCapture(VIDEO);

  video.hide();
  background(0);
  mobilenet = ml5.featureExtractor('MobileNet', modelReady);
  predictor = mobilenet.regression(video, videoReady);

  sliderRate = createSlider(0, 1, 0, 0.1);
  sliderRate.input(function(){
    console.log(sliderRate.value( ))
  })

  addButton = createButton('Add Example');
  addButton.mousePressed(function() {
    predictor.addImage(sliderRate.value());
    getAudioContext().resume();
    });

  trainButton = createButton('Train');
  trainButton.mousePressed(function() {
    predictor.train(whileTraining);
  });  


  // Loop the sound forever
  // (well, at least until stop() is called)
  song.loop();
}

function draw() {
  
  background(0);
  image(video, 0, 0, 640, 480);

  // Set the volume to a range between 0 and 1.0
  song.amp(1);
 

  // Set the rate to a range between 0.1 and 4
  // Changing the rate alters the pitch
  speed = constrain(value, 0.01, 4);
  song.rate(speed);
  console.log("rate", speed)

  fill(255);
  textSize(16);
  text(value, 30, height - 10);


}