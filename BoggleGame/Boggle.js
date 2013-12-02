// Christi Hagen
// Web Lab - Fall 2013
// Final Project
//
// Boggle is a word-finding game where cubes with letters on each side are randomized
// onto a grid. You must connect adjacent tiles (without repeating the same tile) to
// form words. The game is played for 3 minutes only.
//

var boggleWords = new Array();
var currentString = "";
var mousedown = 0;
var resetsec = 5;
var resetmin = 0;
var sec = 5;
var min = 0;
var countdownTime;
var dictionaryWords; //words from boggleDictionary.txt

// Boggle Letters from http://www.moonatnoon.com/puzzles/reference/boggle.html
var cube1 = new Array('A', 'A', 'C', 'I', 'O', 'T');
var cube2 = new Array('A', 'B', 'I', 'L', 'T', 'Y');
var cube3 = new Array('A', 'B', 'J', 'M', 'O', 'Q');
var cube4 = new Array('A', 'C', 'D', 'E', 'M', 'P');
var cube5 = new Array('D', 'E', 'N', 'O', 'S', 'W');
var cube6 = new Array('D', 'K', 'N', 'O', 'T', 'U');
var cube7 = new Array('E', 'E', 'F', 'H', 'I', 'Y');
var cube8 = new Array('E', 'G', 'I', 'N', 'T', 'V');
// copied the cubes 1-8 for cubes 9-16
var cube9 = new Array('A', 'A', 'C', 'I', 'O', 'T');
var cube10 = new Array('A', 'B', 'I', 'L', 'T', 'Y');
var cube11 = new Array('A', 'B', 'J', 'M', 'O', 'Q');
var cube12 = new Array('A', 'C', 'D', 'E', 'M', 'P');
var cube13 = new Array('D', 'E', 'N', 'O', 'S', 'W');
var cube14 = new Array('D', 'K', 'N', 'O', 'T', 'U');
var cube15 = new Array('E', 'E', 'F', 'H', 'I', 'Y');
var cube16 = new Array('E', 'G', 'I', 'N', 'T', 'V');

var grid = new Array(cube1, cube2, cube3, cube4, cube5, cube6, cube7, cube8, cube9, cube10,
					 cube11, cube12, cube13, cube14, cube15, cube16);

// returns a random letter from the cube
function chooseLetter(cube){
	 return cube[Math.floor((Math.random()*6))];
}

// returns a random ordering for the cubes in the grid, used Knuth Shuffle from:
// http://www.htmlblog.us/random-javascript-array
Array.prototype.randomize = function(){
	var i = this.length; 
	var j; 
	var temp;
	while (--i)
	{
		j = Math.floor( Math.random() * (i - 1) );
		temp = this[i];
		this[i] = this[j];
		this[j] = temp;
	}
}

function shuffleBoggleGrid(){
	clearBoard();
	clearlist();
	grid.randomize();
	var stringOfI;
	for (var i = 1; i < grid.length+1; i++){
		stringOfI = "cube"+i.toString();
		var letter = chooseLetter(grid[i-1]);
		if (letter == 'Q'){letter = "Qu";}
		//window.alert(i + " " + letter);
		document.getElementById(stringOfI).textContent = letter;
	}
	//clear out timer if player is wants to play before current game has finished
	if (min >= '00' && sec >= '00'){
		window.clearTimeout(countdownTime);
		sec = resetsec;
		min = resetmin;
	}

	countdownTimer();
	return;

}

// initiate and regulates countdown of timer
function countdownTimer(){
 	sec--;
  	if (sec == -01) {
   		sec = 59;
   		min = min - 1; 
	}
  	else {
   		min = min; 
	}
	if (sec<=9) { 
		document.getElementById("countdownTimer").innerHTML = min + ":0" + sec;
	}
	else{
		document.getElementById("countdownTimer").innerHTML  = min + ":" + sec;
	}

	countdownTime = window.setTimeout("countdownTimer();", 1000);

	if (min == '00' && sec == '00') { 
		window.clearTimeout(countdownTime); 
		sec = resetsec;
		min = resetmin;
		document.getElementById("score_overlay").style.visibility = "visible";
		document.getElementById("score_screen").style.visibility = "visible";
		scoreGame();

	}
}


// called when mouse press over tile and tile isn't already activated
function buildWord(event){
	var cube = event.target;
	prevcube = cube.id.match(/\d/g);
	if (cube.style.backgroundColor != "rgb(51, 153, 255)"){
		cube.style.backgroundColor = "rgb(51, 153, 255)";
		currentString = currentString.concat(cube.textContent);
		console.log(currentString);
		if (mousedown == 0){mousedown++;}
	}
}

function buildingWord(event){
	if (mousedown == 1){
		var cube = event.target;
		if (cube.style.backgroundColor != "rgb(51, 153, 255)"){
			cube.style.backgroundColor = "rgb(51, 153, 255)";
			currentString = currentString.concat(cube.textContent);
			console.log(currentString);
		if (mousedown == 0){mousedown=1;}
		}
	}
}

function submitWord(event){
	if (mousedown == 1){
		// if the word is long enough, add it to the word list
		if (currentString.length >= 3){
			boggleWords.push(currentString);
			var wl = document.getElementById("wordList");
			updateList(boggleWords, wl);
		}
		clearBoard();
		//window.alert(boggleWords);
	}
}

function clearBoard(){
	var grid = document.getElementById("boggleGrid");
	var cubes = grid.getElementsByTagName("div");
	for (var i=0; i<cubes.length; i++)
	{
     	if (cubes[i].style.backgroundColor == "rgb(51, 153, 255)"){
     		cubes[i].style.backgroundColor = "orange";
     	}
	}
	currentString = "";
	mousedown = 0;
	return;
}

function clearlist(){
	boggleWords.length = 0; //empty word list
	var wl = document.getElementById("wordList");
	while (document.getElementById("wordList").hasChildNodes()){
		document.getElementById("wordList").removeChild(document.getElementById("wordList").firstChild);
	}
}

// checks to see if new word is a duplicate, makes all duplicates red, then adds new word to word list
function updateList(array, wl){
	var duplicate = false;
	var index = array.length-1;
	for (var i = 0, row; row = wl.rows[i]; i++){
		if (row.innerHTML == array[index]){
			row.style.color = "rgb(255, 0, 0)"; // make previous duplicate red
			duplicate = true;
		}
	}
	wl.insertRow(index);
	wl.rows[index].innerHTML = array[index];
	
	if (duplicate == true){
		wl.rows[index].style.color = "rgb(255, 0, 0)"; // if duplicate, add and make red, but do not score
		wl.rows[index].cells[0].innerHTML = "/"; 
	}
	else{
		wl.rows[index].cells[0].innerHTML = getScores(wl.rows[index].innerHTML);// not a duplicate, score it
	}
}

//get score for each word and sum of scores
function getScores(word){
	if (word){}

}


window.onload = function(){
	// var request = new XMLHttpRequest();
	// request.open('GET', 'boggleDictionary.txt', false);
	// request.send();
	$.get('boggleDictionary.txt', function(data) {dictionaryWords = data;});
	window.alert(dictionaryWords);
}
