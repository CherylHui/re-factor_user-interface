let canvas;
let button;
let button2;
let f = 0.0;
let spcX, spcY;
let slider;
let slider2;
let a =4;
let w = 10;

let displayState = 0;

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent("sketch-container"); //move our canvas inside this HTML element
  spcX= windowWidth / a; //Remember to call it in Resize
  spcY= windowHeight / a; //Remember to call it in Resize
  addGUI();


}

function draw() { 

  f += slider.value()*0.02;
  a = slider2.value();
  spcX= windowWidth / a; //Remember to call it in Resize
  spcY= windowHeight / a; //Remember to call it in Resize
  background(255);
for (let i = 0; i < a; i++) {
    for (let j = 0; j < a; j++) {
      a = slider2.value();
      // push and pop matrix so that we dont cumulatively translate 
      push();
      
      // move to the current location in the grid
      translate(spcX/2 + i * spcX, spcY/2 +  j * spcY);
      rotate(radians(45+f*100));
      
      // call a function which draws something at (0, 0)
      drawLines(i+1,j+1);

      pop();
      
  

    }
  }
      f +=0.05;
}
function drawLines(i,j){


 beginShape();
  for (k=0;k<30;k++){
   let r= noise((i+k + w)*10)*255;
    let g= noise(j*10+w)*255;
    let b= noise(k*10+w)*255;
    let a = noise(i*j*k*w)*4*100;
    fill(r,g,b,a);
    noStroke();
    // vertex(noise(i*k+j*f)*spc-spc/2, noise(j*k+i)*spc-spc/2);
     curveVertex(noise(i*2*k+j*f)*spcX-spcX/2, noise(j*k+i)*spcY-spcY/2);
  // ellipse(noise(i*2*k+j*f)*spc-spc/2, noise(j*k+i)*spc-spc/2,50*noise(j*k+i), 20*noise(j*k+i));
  
    push();
    translate(spcX/2,spcY/2);
    rotate(f*10);
    pop();
  }
  endShape();

}

function addGUI(){
  
  slider = createSlider(-10,10,2.5);
  slider.parent("gui-container");
  slider.position( 20, windowHeight - 120);
  slider.addClass("slider");
  slider2 = createSlider(1,8,4);
  slider2.parent("gui-container");
  slider2.position(20, windowHeight - 60);
  slider2.addClass("slider2");



  button = createButton("RESET");
  button.parent("gui-container");
  button.position(20, windowHeight - 40);
  button.addClass("button");
  button.mousePressed(handleButtonPress);

  button2 = createButton("Colour Change");
  button2.parent("gui-container");
  button2.position(80, windowHeight - 40);
  button2.addClass("button2");
  button2.mousePressed(handleButtonPress2);
  

}

function handleButtonPress(){
  
slider.value(2.5);
slider2.value(4);
a = slider2.value();
f += slider.value()*0.02;

}

function handleButtonPress2(){
  
  w = random (10,50);

  }

function windowResized() {
console.log("Hello");
  resizeCanvas(windowWidth, windowHeight);
  spcX= windowWidth / a; //Reset everytime
  spcY= windowHeight / a; //Reset everytime
  a = slider2.value();
  f += slider.value()*0.02;
  slider.position( 20, windowHeight - 120); //Reset everytime
  slider2.position( 20, windowHeight - 60); //Reset everytime
  button.position(20, windowHeight - 40); //Reset everytime
  button2.position(80, windowHeight - 40);
}