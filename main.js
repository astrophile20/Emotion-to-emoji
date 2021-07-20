var predict_one = "";
var predict_two = "";

Webcam.set({
    width: 350,
    height: 300,
    image_format: 'png',
    png_quality: 90
});

live_camera = document.getElementById("camera");

Webcam.attach(live_camera);

function take_snap() {
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML = "<img id= 'user_img' src= " + data_uri + ">";
    })
}

console.log(ml5.version);

Classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/rvzKIYaOb/model.json", ModelLoaded);

function ModelLoaded() {
    console.log("Model Loaded!");
}

function speak() {
    var synth = window.speechSynthesis;
    speak_data1 = "The first prediction is " + predict_one;
    speak_data2 = "And the second prediction is " + predict_two;

    var utter_this = new SpeechSynthesisUtterance(speak_data1 + speak_data2);
    synth.speak(utter_this);
}

function identify_emotion() {
    img = document.getElementById("user_img");
    Classifier.classify(img, gotResult);
}

function gotResult(error, results) {
    if (error) {
        console.error(error);
    }
    else {
        console.log(results);

        document.getElementById("p1_emo").innerHTML = results[0].label;
        document.getElementById("p2_emo").innerHTML = results[1].label;

        predict_one = results[0].label;
        predict_two = results[1].label;

        speak();

        if (results[0].label == "happy") {
            document.getElementById("update_emoji1").innerHTML = "&#128545;";
        }

        if (results[0].label == "sad") {
            document.getElementById("update_emoji1").innerHTML = "&#128546;";
        } 

        if (results[0].label == "surprised") {
            document.getElementById("update_emoji1").innerHTML = "&#128512;";
        }

        if (results[1].label == "happy") {
            document.getElementById("update_emoji2").innerHTML = "&#128545;";
        }

        if (results[1].label == "sad") {
            document.getElementById("update_emoji2").innerHTML = "&#128546;";
        } 
        
        if (results[1].label == "surprised") {
            document.getElementById("update_emoji2").innerHTML = "&#128512;";
        }
    }
}