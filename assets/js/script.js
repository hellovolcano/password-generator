// Define the global variables

// Character sets available to add to the master character list for the password
var charSets = {
  uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  lowercase: "abcdefghijklmnopqrstuvwxyz",
  number: "0123456789",
  special: "!#$%&()*+,-./:;<=>?@[]^_ `{|}~'"
};

// Initialize the passwordCriteria object so we can add the length to it later
var passwordCriteria = {
  charList: ""
};

// Initialize array for the user's character option selection
var charOptions = [];

//Initialize empty string -- moved this to a global variable outside the buildPW function to troubleshoot
var pw = ""; 

// Build the master character list based on user's input
var addChars = function(x) {
  passwordCriteria.charList = "";

  for (var i = 0; i < x.length; i++) {
    switch (x[i]) {
      case 'uppercase':
        passwordCriteria.charList += charSets.uppercase;
         break;
      case 'lowercase':
        passwordCriteria.charList += charSets.lowercase;
        break;
      
      case "special":
        passwordCriteria.charList += charSets.special;
        break;
      case "numbers":
        passwordCriteria.charList += charSets.number;
        break;
  
      default:
         break;
     }
  }
  return passwordCriteria.charList;
} // end of addChars function


// build the password!
var buildPW = function(length, charList) {
  for (i = 0; i < length; i++) {
    
    var randomNum = (Math.floor(Math.random() * passwordCriteria.charList.length));

    pw += charList.charAt(randomNum);

  }
  console.log(pw);
  return pw;
}

// Get criteria from the user's form:
function getCriteria() {
  // reset variables to zero
  charOptions = [];

  var charSelection = document.querySelectorAll(".charCheck:checked");

  passwordCriteria.length = document.getElementById("password-length").value;

  if (passwordCriteria.length >= 8 && passwordCriteria.length <= 128) {
    if (charSelection == null || charSelection.length == 0) {
      window.alert("You must select at least one options from the list above!");
    } else {
      // scan object to add values to an array
        console.log("Number of items that should be added to the charOptions array: " + charSelection.length);
        for (var i = 0; i < charSelection.length; i++ ) {
          charOptions.push(charSelection[i].value);
          console.log(i);
          console.log(charSelection[i].value)
        }
        console.log("Character Options array length " + charOptions.length + " . Items in the array: " + charOptions)
      }
  } else {
    window.alert("You much specify a length between 8 and 128");
  }
  

  // TODO: Move these out of the getCriteria function so they don't run 

    // addChars(charOptions);

    // buildPW(passwordCriteria.length,passwordCriteria.charList);

  

  
} // end of getCriteria function

var generatePassword = function() {
  pw = "" //reinitialize to zero so the password doesn't keep growing with each button click!
  getCriteria();
  addChars(charOptions);
  buildPW(passwordCriteria.length,passwordCriteria.charList);
  return pw;
}


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
// submitCriteria.addEventListener("click", getCriteria);


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