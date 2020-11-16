const testWrapper = document.querySelector(".test-wrapper");
const testArea = document.querySelector("#test-area");
const originText = document.querySelector("#origin-text p").innerHTML;
const resetButton = document.querySelector("#reset");
const theTimer = document.querySelector(".timer");
const textArray = document.querySelector(".text");
const topScores = document.querySelector(".topScores");
var timer;
//we need to store our min,sec and hundred thousand in different variable so we use array
var myTimer = [0, 0, 0, 0];
//create this because we need to use interval out side the startTimer function
var timeInterval;
//originally timer is not running
var timerRunning = false;
//will store error variable in erro to count users error
var error = 0;
//we need to store the top 5 score
var scores = new Array();
var text = [
  { text: "hello" },
  { text: "how are you" },
  // { text: "First, solve the problem. Then, write the code." },
  { text: "Java is to JavaScript what car is to Carpet." },
  { text: "Knowledge is power." },
  { text: "Simplicity is the soul of efficiency." },
  { text: "Make it work, make it right, make it fast." },
  {
    text:
      "The question of whether a computer can think is no more interesting than the question of whether a submarine can swim."
  }
];
var topFives;

// Add leading zero to numbers 9 or below (purely for aesthetics):
//when our timer hit 9 we need to change it to 10 here we use string we will add string 0 to our timer. js will treat this string 0 as integer .
function leadingZero(t) {
  if (t <= 9) {
    t = "0" + t;
  }
  return t;
}

// Run a standard minute/second/hundredths timer:

function startTimer() {
  //we need to keep track of the time so we create some variable
  //every time startMyTimer runs  we pass each value to leadingZero function and get string as return
  timer =
    leadingZero(myTimer[0]) +
    ":" +
    leadingZero(myTimer[1]) +
    ":" +
    leadingZero(myTimer[2]);
  //as soon the timer start running each 1000ms should we increase the time
  theTimer.innerHTML = timer;
  //we will increase and update the last value in our array
  myTimer[3]++;

  //define each one of our variable min sec hundred
  //define min , use floor because we don't need decimal
  myTimer[0] = Math.floor(myTimer[0] / 100 / 60);
  //define sec , we will subtract the min*60 from the thousand that will help as son as hit the 60 the value return 0
  myTimer[1] = Math.floor(myTimer[3] / 100 - myTimer[0] * 60);
  //define hundred of sec, we subtract sec*100 from thousand of sec will get back to 0 , and alo subtract min *6000 every time min reach 100 will return 0
  myTimer[2] = Math.floor(myTimer[3] - myTimer[1] * 100 - myTimer[0] * 6000);
}

// Match the text entered with the provided text on the page:
//here we will have function which will check the input.
function checkInput() {
  // console.dir(testArea);
  // console.dir(originText);

  //save the user input into a variable
  let textEntered = testArea.value;
  //save original text into variable, use substring method which alow use to pull substring and compare them
  //0 is where to start and how long should be here we set it to the textEnter length
  let originalTextMatch = originText.substring(0, textEntered.length);

  //check if they are same or not if they are not stop everything
  if (textEntered == originText) {
    testWrapper.style.borderColor = "#429890";
    window.alert(
      "Great job! you finished it, You had " + error + " errors"
    );
    topFiveRecord(timer);
    clearInterval(timeInterval);
  } else {
    if (textEntered == originalTextMatch) {
      testWrapper.style.borderColor = "#65ccf3";
    } else {
      testWrapper.style.borderColor = "#FF0000";
    }
  }
  //just check and see what is output
  // console.log(textEntered);
}

// Start the timer:
function start() {
  //use textLength property to the length and know when to start the timer after enter(keydown) the first word textLength will be 1
  //used console.dir to see all properties of this object
  // console.dir(start);
  let textEnteredLength = testArea.textLength;
  //just check and see what is output
  // console.log(textEnteredLength);
  //check if length is 0 and also timeRunning is false if is true we won't continue the time we will restart it.
  if (textEnteredLength === 0 && timerRunning === false) {
    //we will make the timerRunning to true that case if we delete the text and start typing timer won't be running
    timerRunning = true;
    //use seInterval to start interval , as soon as the length is 1 this function will start running the function.
    //run this startMyTimer function every 1000 s.
    timeInterval = setInterval(startTimer, 10);
  }
}

// Reset everything:
function reset() {
  testArea.value = "";
  //we need to reset the interval so use clearInterval and pass timerInterval as parameter
  clearInterval(timeInterval);
  //we have to set timerInterval variable into null so next time we won't setup new interval with new index number
  timeInterval = null;
  //set clock back to 0
  myTimer = [0, 0, 0, 0];
  //make timerRunning to false to make it ready for next start point
  timerRunning = false;
  //we need to set the front to be zero too
  theTimer.innerHTML = "00:00:00";
  // console.log(originText);

  //change our border color to normal
  testWrapper.style.borderColor = "gray";
  //will give alert to user and print number of error and their top five score
  window.alert ("your highest scores are : " + topFives );
}

function topFiveRecord(timer) {
  // console.log(scores);
  //push the time to our array
  scores.push(timer);
 //sort the array of score
  scores.sort();
  //get the top five and store in topFive variable to be able to print it out
  topFives = scores.slice(0, 5);
  // console.log(topFives);
  
}

// Event listeners for keyboard input and the reset button:
//when user type the first word we want to start our timer so the eventListener type will be keypress
testArea.addEventListener("keypress", start, false);
//when we leave the keyboard (keyup) we need to check the words user type
testArea.addEventListener("keyup", checkInput, false);
//when click event happen when clear all texted in the testArea
resetButton.addEventListener("click", reset, false);
//when press down key if is delete will count the as error which user deleted
testArea.addEventListener("keydown", function() {
  var key = event.keyCode;
  // console.dir(key);
  //if the key pressed cose is 8 or 27 will count as error or mistake that user made so count as error.
  if (key == 8 || key == 27) {
    return error++;
  }
});

// watched Linkedin learning and learn all of these stuff from there
// <q></q>

