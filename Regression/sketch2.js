let mobilenet;
let predictor;
let video;
let value = 0;
let song;
let sliderRate;
let sliderVolume
let addButton;
let trainButton;
let bg_value;


function preload() {

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
//   background(0);
  mobilenet = ml5.featureExtractor('MobileNet', modelReady);
  predictor = mobilenet.regression(video, videoReady);

  sliderRate = createSlider(0, 1, 0, 0.1);
  sliderRate.input(function(){
    console.log(sliderRate.value( ))
  })

  // sliderVolume = createSlider(0, 1, 0, 0.1);

  addButton = createButton('Add Example');
  addButton.mousePressed(function() {
    predictor.addImage(sliderRate.value());
    getAudioContext().resume();
    });

  trainButton = createButton('Train');
  trainButton.mousePressed(function() {
    predictor.train(whileTraining);
  });  

 
 
  // createCanvas(710, 400);

  // Loop the sound forever
  // (well, at least until stop() is called)
//   song.loop();
}

function draw() {
  bg_value = map(value, 0, 1, 0, 255)
  console.log("BG", bg_value);
  background(255, bg_value, 255);
//   background(0);
//   image(video, 0, 0, 640, 480);





  fill(255);
  textSize(16);
  text(value, 30, height - 10);
  // song.rate(speed);

  // Draw some circles to show what is going on
  // stroke(0);
  // fill(51, 100);
  // ellipse(mouseX, 100, 48, 48);
  // stroke(0);
  // fill(51, 100);
  // ellipse(100, mouseY, 48, 48);
}