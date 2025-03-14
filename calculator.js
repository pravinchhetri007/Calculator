const display=document.getElementById("display");

function appendToDisplay(input){
    display.value+= input;
}

function delDisplay(){
    display.value = display.value.slice(0, -1); 
}
function clearDisplay(){
    display.value="";
}

// function calculate() {
//     try {
//         display.value = eval(display.value) || ""; // Evaluate and prevent null/undefined issues
//     } catch (error) {
//         display.value = "Error"; // Show error for invalid expressions
//         setTimeout(() => display.value = "", 1000); // Clear after 1 second
//     }
// }

function calculate() {
    try {
        if (!display.value) return; // Prevent empty calculations
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
    const maxLength = 10; // Max characters before reducing font size
    let size = 50; // Default font size

    if (display.value.length > maxLength) {
        size = Math.max(20, 50 - (display.value.length - maxLength) * 2); // Reduce but keep readable
    }

    display.style.fontSize = size + "px";
}