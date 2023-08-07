// input element
let userName = document.getElementById("cardName");
let cardNumber = document.getElementById("cardNumber");
let month = document.getElementById("month");
let year = document.getElementById("year");
let cvcNumber = document.getElementById("cvcNumber");
let Confirm = document.getElementById("Confirm");
let inputs = document.querySelectorAll("input");
let mainInputDiv = document.getElementById("mainInputDiv");
let complete = document.getElementById("complete");
let Continue = document.getElementById("Continue");
// output Element
let frontCardName = document.getElementById("frontCardName");
let frontCardNumber = document.getElementById("frontCardNumber");
let mm = document.getElementById("mm");
let yy = document.getElementById("yy");
let backCardCvc = document.getElementById("backCardCvc");
//  valiadtion
let emptyValidationValue = false;
let numbersValidationValue = false;
let numberOnlyInpu = [cardNumber, month, year, cvcNumber];

//events and add to on scren card
userName.addEventListener("keyup", () => {
  getData(userName, frontCardName);
});
cardNumber.addEventListener("keyup", () => {
  frontCardNumber.textContent = `${cardNumber.value.substring(
    0,
    4
  )} ${cardNumber.value.substring(4, 8)} ${cardNumber.value.substring(
    8,
    12
  )} ${cardNumber.value.substring(12, 16)}`;
});
cardNumber.addEventListener("blur", () => {
  if (cardNumber.value.length === 16) {
    cardNumber.value = frontCardNumber.textContent;
  }
});
month.addEventListener("keyup", () => {
  if (month.value.length === 1) {
    mm.textContent = `0${month.value}`;
  } else if (month.value.length === 2) {
    mm.textContent = month.value;
  }
});
month.addEventListener("blur", () => {
  if (month.value.length === 1) {
    month.value = `0${month.value}`;
  }
});
year.addEventListener("blur", () => {
  if (year.value.length === 1) {
    year.value = `${year.value}0`;
  }
});
year.addEventListener("keyup", () => {
  if (year.value.length === 1) {
    yy.textContent = `${year.value}0`;
  } else if (month.value.length === 2) {
    yy.textContent = year.value;
  }
});
cvcNumber.addEventListener("keyup", () => {
  getData(cvcNumber, backCardCvc);
});

// validation and click
Confirm.addEventListener("click", (e) => {
  // empty all note paragraph
  emptyNotes();
  //empty feiedl validation
  emptyField();
  // numbers validation
  numbersOnly();
  // if all true
  validationPass();
});

// Continue
Continue.addEventListener("click", () => {
  reset();
});
//functions
function emptyNotes() {
  let allNotes = document.querySelectorAll(".note");
  for (let i = 0; i < allNotes.length; i++) {
    allNotes[i].textContent = "";
  }
  let allInputs = document.querySelectorAll("input");
  for (let i = 0; i < allInputs.length; i++) {
    allInputs[i].className = "normalborder";
  }
}
function getData(inputElement, outputElemnt) {
  outputElemnt.textContent = inputElement.value;
}
function emptyField() {
  for (let i = 0; i < inputs.length; i++) {
    let note = document.querySelector(`#${inputs[i].id} + p`);
    if (inputs[i].value === "") {
      note.innerHTML = "cant be empty";
      inputs[i].className = "borderred";
      emptyValidationValue = false;
    } else {
      emptyValidationValue = true;
    }
  }
}
function numbersOnly() {
  for (let i = 0; i < numberOnlyInpu.length; i++) {
    let note = document.querySelector(`#${numberOnlyInpu[i].id} + p`);
    value = numberOnlyInpu[i].value.replace(/\s+/g, "");
    if (+value != value) {
      //only numbers
      note.innerHTML = "numbers only";
      numberOnlyInpu[i].className = "borderred";

      numbersValidationValue = false;
    } else if (value.length != +numberOnlyInpu[i].getAttribute("maxlength")) {
      //equal to length
      note.innerHTML = `less then ${+numberOnlyInpu[i].getAttribute(
        "maxlength"
      )} numbers`;
      numberOnlyInpu[i].className = "borderred";

      numbersValidationValue = false;
    } else {
      numberOnlyInpu[i].className = "normalborder";

      numbersValidationValue = true;
    }
  }
}
function validationPass() {
  if (numbersValidationValue === true && emptyValidationValue === true) {
    mainInputDiv.style.display = "none";
    complete.style.display = "flex";
  }
}
function emptyInputs() {
  let allInputs = document.querySelectorAll("input");
  for (let i = 0; i < allInputs.length; i++) {
    allInputs[i].value = "";
  }
}
function reset() {
  emptyInputs();
  emptyNotes();
  mainInputDiv.style.display = "block";
  complete.style.display = "none";
}
