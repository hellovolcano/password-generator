var charSets = {
  uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  lowercase: "abcdefghijklmnopqrstuvwxyz",
  number: "0123456789",
  special: "!#$%&()*+,-./:;<=>?@[]^_ `{|}~'"
};

var passwordCriteria = {
  charList: ""
};

var charOptions = [];

// Assignment code here

// Build the master character list based on user's input

// function to check with character set to concatenate 
var addChars = function (x) {
   switch (x) {
    case "uppercase":
      charList += charSets.uppercase;
       break;
    case "lowercase":
      charList += charSets.lowercase;
      break;
    
    case "special":
      charList += charSets.special;
      break;
    case "numbers":
      charList += charSets.number;
      break;

    default:
       break;
   }
}

// Get criteria from the user's form:
function getCriteria() {
  // reset variables to zero
  charOptions = [];

  passwordCriteria.length = document.getElementById("password-length").value;

  if (passwordCriteria.length >= 8 && passwordCriteria.length <= 128) {
    console.log(passwordCriteria.length);
    
  } else {
    window.alert("You much specify a length between 8 and 128");
  }
  

  var charSelection = document.querySelectorAll(".charCheck:checked");

  if (charSelection == null) {
    window.alert("You must select at least one options from the list above!");
  } else {
    // scan object to add values to an array
    // console.log(charSelection.length);
    for (var i = 0; i < charSelection.length; i++ ) {
      charOptions.push(charSelection[i].value);
    }

    console.log(charOptions);  
  }
}
  // console.log(document.getElementById("lowercase").value); 
  // console.log(document.getElementById("numbers").value);
  // console.log(document.getElementById("special").value);


// selectCriteria();

// Define a for loop for (var i = 0, i < passwordCriteria.length, i++)
// Use Math.random() to randomly select which type of character to log based on options in passwordCriteria
// Use Math.random() to randomly select a character from the selected type

// Get references to the #submitPassword element
var submitCriteria = document.querySelector("#submitPasswordCriteria");

// Get references to the #generate element
var generateBtn = document.querySelector("#generate");

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;

}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
submitCriteria.addEventListener("click", getCriteria);


// GIVEN I need a new, secure password
// WHEN I click the button to generate a password
// THEN I am presented with a series of prompts for password criteria
// WHEN prompted for password criteria
// THEN I select which criteria to include in the password
// ------WHEN prompted for the length of the password
// ------THEN I choose a length of at least 8 characters and no more than 128 characters
// ------WHEN asked for character types to include in the password
// ------THEN I confirm whether or not to include lowercase, uppercase, numeric, and/or special characters
// ------WHEN I answer each prompt
// ------THEN my input should be validated and at least one character type should be selected
// WHEN all prompts are answered
// THEN a password is generated that matches the selected criteria
// WHEN the password is generated
// THEN the password is either displayed in an alert or written to the page