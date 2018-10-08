"use strict";
console.log("script loaded");

// get reference of DOM elements
const inputElement = document.getElementById("nbr");
const resultElement = document.getElementById("result");
const loadingDiv = document.getElementById("loading");
const resultDiv = document.getElementById("resultdiv");

// checks if a given number is prime
const isPrime = n => {
  if (n < 2) return false;
  if (n === 2) return true;
  for (let i = 3; i * i <= n; i += 2) {
    if (n % i === 0) {
      return false;
    }
  }
  return true;
};

// generates the list of partitiions where n = p + q
const getPrimePartition = n => {
  const allPatitions = [];

  //   if n is odd then return blank
  if (n % 2 !== 0) {
    return allPatitions;
  }

  // as n is even then n = 2m
  // n = p + q where p, q are prime
  const m = Math.floor(n / 2);
  for (let p = 3; p <= m; p += 2) {
    if (isPrime(p)) {
      const q = n - p;
      if (isPrime(q)) {
        allPatitions.push(`(${p}, ${q})`);
      }

      // as the number goes big the number of partitions grows exponentially
      // so rather than finding all partitions breaks the loop when 100 partitions are
      // found for a given number.
      if (allPatitions.length >= 100) {
        break;
      }
    }
  }
  return allPatitions;
};

// insert the result into the DOM
const showResult = p => {
  const li = document.createElement("li");
  const node = document.createTextNode(p);
  li.appendChild(node);
  resultElement.appendChild(li);
};

// clears the previous result i.e remove all nodes from the DOM
const clearPreviousResults = () => {
  while (resultElement.firstChild) {
    resultElement.removeChild(resultElement.firstChild);
  }
};

// for sufficiently big number, prime number check might take few seconds
// show a loading indicator for that time
const showLoading = () => {
  loadingDiv.style.display = "block";
  resultDiv.style.display = "none";
};

// hide the loading indicator when result obtained
const hideLoading = () => {
  loadingDiv.style.display = "none";
  resultDiv.style.display = "block";
};

// calculate the result for the given input
// show it in the DOM
const calculate = n => {
  const allPatitions = getPrimePartition(n);
  for (let i = 0; i < allPatitions.length; i++) {
    showResult(allPatitions[i]);
  }
  hideLoading();
};

// onkeyup callback, act when user hits enter
const onKeyUp = ({ keyCode }) => {
  // we don't care if it is not the ENTER key
  if (keyCode !== 13) return;
  const v = inputElement.value;

  // exit if somehow a non number input is provided
  if (!Number(v)) return;

  // show loading indicator before starting the calculation
  // which might take some time depending on how big the input is
  showLoading();

  // clear the previous result from the DOM
  clearPreviousResults();

  // setTimeout function will allow the event loop to update the DOM
  // before starting on a potentially big calculation (if the input is very big number)
  setTimeout(() => calculate(v), 0);
};

// clear and set the page on load
const onLoad = () => {
  inputElement.focus();
  inputElement.value = "";
  hideLoading();
  resultDiv.style.display = "none";
};

// attach onkeyup listener to it
inputElement.addEventListener("keyup", onKeyUp);

// call the onLoad function to set the page properly at the beginning
onLoad();
