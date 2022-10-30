function preload(){
    classifier = ml5.imageClassifier('DoodleNet');
}
function setup() {
    canvas = createCanvas(600, 600);
    canvas.center();
    background("white");
    canvas.mouseReleased(classifyCanvas);
    synth = window.speechSynthesis;
}
function draw(){
    strokeWeight(10);
    stroke(0);
    if (mouseIsPressed) {
        line(pmouseX, pmouseY, mouseX, mouseY);
    }
}
function clearCanvas() {
    background("white");
}
function classifyCanvas() {
    classifier.classify(canvas, gotResult);
}
function gotResult(error, results) {
    if (error) {
        console.error(error);
    } else {
        console.log(results);
        document.getElementById("drawing").innerHTML = "You drew a/an: " + results[0].label;
        document.getElementById("confidence").innerHTML = "I am " + Math.round(results[0].confidence * 100) + "% confident that you drew a/an " + results[0].label;
        utterThis = new SpeechSynthesisUtterance(results[0].label);
        synth.speak(utterThis);
    }
}