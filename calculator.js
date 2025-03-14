const display = document.getElementById("display");
const keys = document.getElementById("keys");

keys.addEventListener("click", (event) => {
    const value = event.target.dataset.value;
    if (!value) return;

    if (value === "=") {
        calculate();
    } else if (value === "AC") {
        clearDisplay();
    } else if (value === "clr") {
        delDisplay();
    } else {
        appendToDisplay(value);
    }
});

function appendToDisplay(input) {
    if (input === "%" && display.value !== "") {
        display.value += "/100"; // Convert % to decimal
    } else {
        display.value += input;
    }
    adjustFontSize(); // Fix alignment after adding input
}


function delDisplay() {
    display.value = display.value.slice(0, -1);
}

function clearDisplay() {
    display.value = "";
}

function calculate() {
    try {
        if (!display.value) return;
        let result = new Function("return " + display.value)();
        if (!isFinite(result)) throw new Error("Invalid");
        display.value = result;
        adjustFontSize();
    } catch {
        showError();
    }
}

function showError() {
    display.value = "Error";
    setTimeout(() => {
        display.value = "";
        adjustFontSize();
    }, 1000);
}

function adjustFontSize() {
    display.style.fontSize = "3rem"; 
    display.scrollLeft = display.scrollWidth; // Scrolls to the end automatically
}