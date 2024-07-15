// This assignment is inspired by a problem on Exercism (https://exercism.org/tracks/javascript/exercises/etl) that demonstrates Extract-Transform-Load using Scrabble's scoring system. 

const input = require("readline-sync");

const oldPointStructure = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
};

function oldScrabbleScorer(word) {
	word = word.toUpperCase();
	let letterPoints = "";
 
	for (let i = 0; i < word.length; i++) {
 
	  for (const pointValue in oldPointStructure) {
 
		 if (oldPointStructure[pointValue].includes(word[i])) {
			letterPoints += `Points for '${word[i]}': ${pointValue}\n`
		 }
 
	  }
	}
	return letterPoints;
 }

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //

function initialPrompt() {
   console.log("Let's play some scrabble!\n");
   let wordFromUser = input.question("Enter a word to score: ");
   //let allowedEntry ="qwertyuiopasdfghjklzxcvbnm ";
   
   return wordFromUser;
};

let newPointStructure = transform(oldPointStructure);

let simpleScorer = function(word){
   return word.length;
};

let vowelBonusScorer=function(word){
   let vowelScore=0;
   for (let i=0; i<word.length; i++){
      if(word[i].toUpperCase()==='A'||
         word[i].toUpperCase()==='E'||
         word[i].toUpperCase()==='I'||
         word[i].toUpperCase()==='O'||
         word[i].toUpperCase()==='U'){
         vowelScore += 3;
      }
      else{
         vowelScore +=1;
      }
   }
   return vowelScore;
};

let scrabbleScorer =function(word){
   word = word.toLowerCase();
	let letterPoints = 0;
	for (let i = 0; i < word.length; i++){ 
      letterPoints+=newPointStructure[word[i]];  
	}
	return letterPoints;
};

let simpleObj = {
   name:"Simple Score",
   description: "Each letter is worth 1 point.",
   scorerFunction:simpleScorer
};
let bonusVowelObj = {
   name:"Bonus Vowels",
   description: "Vowels are 3 pts, consonants are 1 pt.",
   scorerFunction:vowelBonusScorer
};
let scrabbleObj = {
   name:"Scrabble",
   description: "The scrabble scoring algorithm.",
   scorerFunction:scrabbleScorer
};
const scoringAlgorithms = [simpleObj,bonusVowelObj,scrabbleObj];


function scorerPrompt(arr) {
   console.log(`Which scoring algorithm would you like to use?\n
      0 - ${arr[0].name}: ${arr[0].description}
      1 - ${arr[1].name}: ${arr[1].description}
      2 - ${arr[2].name}: ${arr[2].description}`);
   let optionNum = Number(input.question("Enter the number 0, 1, or 2: "));
   while(optionNum >2 || optionNum<0 || isNaN(optionNum)){
      optionNum =Number(input.question("Invalid Number! Please enter number 0, 1 or 2: "));
   }
   return arr[optionNum];
}

function transform(obj) {
   let transformedObj ={};
   for(key in obj){
      let array = obj[key];
      for(let i=0; i<array.length; i++){      
         transformedObj[array[i].toLowerCase()] = Number(key);
      }
   }
   return transformedObj;
};

function runProgram() {
   let userEntryWord=initialPrompt();
   let chosenScorer=scorerPrompt(scoringAlgorithms);
   console.log(`Chosen algrithm name: ${chosenScorer.name}`);
   console.log(`Score for '${userEntryWord}': ${chosenScorer.scorerFunction(userEntryWord)}`);

}

// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScorer: simpleScorer,
   vowelBonusScorer: vowelBonusScorer,
   scrabbleScorer: scrabbleScorer,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
	runProgram: runProgram,
	scorerPrompt: scorerPrompt
};
