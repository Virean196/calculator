// Create a variable called display to point at the DOM element with ID = display
let display = document.getElementById("display");

// Initialize an empty array for all the calculations
let calcArray = [];

// Initialize the display content at "0"
display.textContent = "0";

// Add, subtract, multiply and divide n1 by n2
// Round the value down to 10 decimal numbers if there is any
function add(n1,n2){
    return (n1 + n2).toFixed(10);
}

function subtract(n1,n2){
    return (n1 - n2).toFixed(10);
}

function multiply(n1,n2){
    return (n1 * n2).toFixed(10);
}

function divide(n1,n2){
    return (n1 / n2).toFixed(10);
}


// Updates the display when a button is clicked removing the first 0 on the left size
// Checks for "-" or "." to avoid duplicates, if there isn't any, simply add the value to the screen
function updateDisplay(value){
    if(display.textContent === "0" && event.target.textContent != "."){
        display.textContent = "";
    }
    if(value == "-" && !display.textContent.includes("-")){
        display.textContent = "-" + display.textContent;
    }
    else if(value == "-" && display.textContent.includes("-")){
        display.textContent = display.textContent.slice(1);
    }
    else if(value == "." && !display.textContent.includes(".")){
        display.textContent += ".";
    }
    else if(value != "-" && value!= "+" && value != "."){
        display.textContent += value;
    }
}

// Resets the entire calculator by setting the display content to "0" and wiping the calculation array
function resetCalc(){
    display.textContent = "0";
    calcArray = [];
}

// This function does all the calculation, uses basic rules of math for prioritization
// Initializes "prevTotal" to save the previous total of a calculation to proceed
// Loops through the entire array looking for an operant, "*", "/", "+" or "-"
// When it does, it saves the calculation of the value of the array items 1 index before and after
// It then slices the array to remove the 1st value, the operand and 2nd value while replacing it
// With the calculation, then resets "i" to "0" and runs the whole array again until the 
// Array has a length of "1"
function calculate(arr){
    let prevTotal;
    for(let i = 0; i<arr.length; i++){
        if(arr.length==1){
            break;
        }
        if(arr[i] === "*" || arr[i] === "/"){
            if(arr[i] === "*"){
                prevTotal = multiply(parseFloat(arr[i-1]),parseFloat(arr[i+1]));
                arr.splice(i-1, 3, prevTotal);
                display.textContent = parseFloat(prevTotal);
                i=0;
            }
            else if(arr[i] === "/"){
                prevTotal = divide(parseFloat(arr[i-1]),parseFloat(arr[i+1]));
                arr.splice(i-1, 3, prevTotal);
                display.textContent = parseFloat(prevTotal);
                i=0;
            }
        }
        if(!arr.includes("*") && !arr.includes("/")){
            if(arr[i] === "+" || arr[i] === "-"){
                if(arr[i] === "+"){
                    prevTotal = add(parseFloat(arr[i-1]),parseFloat(arr[i+1]));
                    arr.splice(i-1, 3, prevTotal);
                    display.textContent = parseFloat(prevTotal);
                    i=0;
                }
                else if(arr[i] === "-"){
                    prevTotal = subtract(parseFloat(arr[i-1]),parseFloat(arr[i+1]));
                    arr.splice(i-1, 3, prevTotal);
                    display.textContent = parseFloat(prevTotal);
                    i=0;
                }
            }
        }
    }
}

// Simply returns a value divided by 100
function toPercent(val){
    return val/100;
}

// Checks if the operands exist already in the display text to prevent duplicates
function checkForRepeatedOperands(string){
    if(string != "+" && string!= "-" && string!= "*" && string!= "/"){
        return true;
    }
    return false;
}

// Adds an event listener to the parent "container" and if the child node has a tag name of "BUTTON"
// It then proceeds to execute code based on the button pressed
document.querySelector(".container").addEventListener('click', function(event){
    if(event.target.tagName==="BUTTON"){
        const buttonValue = event.target.textContent; // Saves the content of the button pressed
        let tempValue;
        if(buttonValue >= 0 && buttonValue <= 9){
            updateDisplay(buttonValue);
        }
        else if(buttonValue == "AC"){
            resetCalc();   
        }
        else if(buttonValue == "+/-"){
            updateDisplay("-");
        }
        else if(buttonValue == "."){
            updateDisplay(".")
        }

        // Comment to be added

        switch (buttonValue) {
            case "+":
                if(checkForRepeatedOperands(display.textContent.charAt((display.textContent).length-1))){
                    display.textContent += "+";
                }
                break;
            case "-":
                if(checkForRepeatedOperands(display.textContent.charAt((display.textContent).length-1))){
                    display.textContent += "-";
                }
                break;
            case "*":
                if(checkForRepeatedOperands(display.textContent.charAt((display.textContent).length-1))){
                    display.textContent += "*";
                }
                break;
            case "/":
                if(checkForRepeatedOperands(display.textContent.charAt((display.textContent).length-1))){
                    display.textContent += "/";
                }
                break;
            case "%":
                display.textContent = toPercent(parseInt(display.textContent));
                break;        
            case "=":
                calcArray = display.textContent.split(/([\+\-\*\/])/);
                calculate(calcArray);
                console.log(calcArray);
            default:
                break;
        }
    }
});
