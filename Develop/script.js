// Assignment code here

// Global variable
const PASSWORD_CONFIG = {};

console.log(PASSWORD_CONFIG);

let alphabet = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
];
let alphabet_upper = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
];
let special_char = [
  "~",
  ":",
  "'",
  "+",
  "[",
  "@",
  "^",
  "{",
  "%",
  "(",
  "-",
  '"',
  "*",
  "|",
  ",",
  "&",
  "<",
  "`",
  "}",
  ".",
  "_",
  "=",
  "]",
  "!",
  ">",
  ";",
  "?",
  "#",
  "$",
  ")",
  "/",
];
let numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

const QUESTIONS = {
  PASSWORD_LENGTH:
    "How long do you want your password to be? (from 8 - 128 characters)",
  PASSWORD_UPPER_LOWER:
    "Would you like the password to include both uppercase and lowercase letters? (Y for both, N for only lowercase)",
  PASSWORD_NUMERIC: "Would you like your pasword to be numeric? (Y or N)",
  PASSWORD_SPECIAL:
    "Would you like your password to have special characters? (Y or N)",
  FINAL_PASSWORD: "Password Genearated!",
};

// Get references to the #generate element
var generateBtn = document.querySelector("#generate");

// Write password to the #password input
function writePassword() {
  var txt1 = document.getElementsByClassName("card-header")[0];
  //function to clear the console
  function clear_console() {
    passwordText.textContent = "";
  }

  function first_text() {
    txt1.innerHTML = `<h2>${QUESTIONS.PASSWORD_LENGTH}</h2>`;
  }

  first_text();
}

// ------- FUNCTIONS FOR THE USER -------
// Length of the password
function pass_length_function(txt1, password) {
  var password_len = parseInt(password.value);
  console.log(password_len);

  if (password_len < 8 || password_len > 128) {
    alert("I need a password longer than 8 digits and no longer than 128");
    return;
  } else {
    setQuestionAndClearPassword(password, QUESTIONS.PASSWORD_UPPER_LOWER, txt1);
    PASSWORD_CONFIG.PASSWORD_LENGTH = password_len;
    console.log(PASSWORD_CONFIG);
  }
}

// ------- Final Password Function -------
function final_password_generator() {
  var password_len = PASSWORD_CONFIG.PASSWORD_LENGTH;
  let password = "";
  const my_answers = check_config();
  var for_loop_count = 0
  var original_len_password = password_len
  console.log(`My chosen asnwers equal to ${my_answers.length}`);
  console.log(my_answers);
  console.log(my_answers.values);
  breakme: if (my_answers.length == 3) {
      password_len = Math.floor(PASSWORD_CONFIG.PASSWORD_LENGTH / 3);
    } else if (my_answers.length == 2) {
      password_len = Math.floor(PASSWORD_CONFIG.PASSWORD_LENGTH / 2);
    } else {
      break breakme;
    }
  console.log(`The amount of times the for loop will run is ${password_len} `)

  while (password_len >=0) {
    for (let i = 0; i < my_answers.length; i++) {
      // IF I WANT MY PASSWORD WITH UPPERCASE LETTERS
      if (my_answers[i] == "PASSWORD_UPPER_LOWER") {
        password +=alphabet_upper[Math.floor(Math.random() * alphabet_upper.length)];
      }
      // IF I WANT MY PASSWORD WITH NUMBERS
      else if (my_answers[i] == "PASSWORD_NUMERIC") {
        password += numbers[Math.floor(Math.random() * numbers.length)];
      } else if (my_answers[i] == "PASSWORD_SPECIAL") {
        password += special_char[Math.floor(Math.random() * special_char.length)];
      }
    }
    for_loop_count += 1
    console.log(`I have run ${for_loop_count} times!`)
    password_len -= 1;
    console.log(`Len of the password is ${password_len}`);
    console.log(`My password is ${password}`);
  }
  while (password.length > original_len_password) {
    password = password.slice(1);
    console.log(`My password is ${password}`);
    console.log(`My password len ${password.length}`);
  }
}

function check_config() {
  let all_y_answers = [];
  for (let [key, value] of Object.entries(PASSWORD_CONFIG)) {
    if (value == "y") {
      all_y_answers.push(key);
    }
  }
  return all_y_answers;
}

// ------- Configuration Functions -------
function yesornoQuestions(txt1, password, question, config_value) {
  const txt1Value = password.value.toLowerCase();
  const validAnswers = ["y", "n"];
  if (validAnswers.includes(txt1Value)) {
    setQuestionAndClearPassword(password, QUESTIONS[question], txt1);
    PASSWORD_CONFIG[config_value] = txt1Value;
    if (question == `FINAL_PASSWORD`) {
      final_password_generator();
    }
  } else {
    alert('Please write "Y or N"');
  }
}

function setQuestionAndClearPassword(password, question, txt1) {
  txt1.innerHTML = `<h2>${question}</h2>`;
  password.value = "";
}

// ------- SWITCH FUNCTION -------
function questions() {
  var txt1 = document.getElementsByClassName("card-header")[0];
  var password = document.getElementById("password");
  switch (txt1.innerText) {
    case QUESTIONS.PASSWORD_LENGTH:
      pass_length_function(txt1, password);
      break;
    case QUESTIONS.PASSWORD_UPPER_LOWER:
      yesornoQuestions(
        txt1,
        password,
        "PASSWORD_NUMERIC",
        "PASSWORD_UPPER_LOWER"
      );
      break;
    case QUESTIONS.PASSWORD_NUMERIC:
      yesornoQuestions(txt1, password, "PASSWORD_SPECIAL", "PASSWORD_NUMERIC");
      break;
    case QUESTIONS.PASSWORD_SPECIAL:
      yesornoQuestions(txt1, password, "FINAL_PASSWORD", "PASSWORD_SPECIAL");
      break;
    default:
      alert("Error");
  }
}

// Add event listener to generate button
btn1.addEventListener("click", questions);
generateBtn.addEventListener("click", writePassword);