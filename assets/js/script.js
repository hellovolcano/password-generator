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
  return pw;
}

// Get criteria from the user's form:
function getCriteria() {
  charOptions = [];   // reset variables to zero

  var charSelection = document.querySelectorAll(".charCheck:checked");

  passwordCriteria.length = document.getElementById("password-length").value;

  if (passwordCriteria.length >= 8 && passwordCriteria.length <= 128) {
    // check to ensure that the user has selected at least one option from the password criteria section
    if (charSelection == null || charSelection.length == 0) {
      window.alert("You must select at least one options from the list above!");
    } else {
      // scan object to add values to an array
        for (var i = 0; i < charSelection.length; i++ ) {
          charOptions.push(charSelection[i].value);
        }
        console.log("Character Options array length " + charOptions.length + " . Items in the array: " + charOptions)
      }
  } else {
    window.alert("You much specify a length between 8 and 128");
  }
  

  
} // end of getCriteria function

// container function to reset variable, obtain the user's criteria, add characters to master lists, and then build the password.
var generatePassword = function() {
  pw = ""; //reinitialize to zero so the password doesn't keep growing with each button click!
  getCriteria();
  addChars(charOptions);
  buildPW(passwordCriteria.length,passwordCriteria.charList);
  return pw;
}


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