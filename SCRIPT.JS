const calculatorDisplay = document.querySelector('h1');
const inbutBtns = document.querySelectorAll('button');
const clearBtn =document.getElementById('clear-btn');

const calculate = {
    '/' : (firstNumber, secondNumber) => firstNumber / secondNumber,

    '*' : (firstNumber, secondNumber) => firstNumber * secondNumber,

    '+' : (firstNumber, secondNumber) => firstNumber + secondNumber,

    '-' : (firstNumber, secondNumber) => firstNumber - secondNumber,

    '=' : (firstNumber, secondNumber) => secondNumber,
}

let firstValue = 0;
let  operatorValue ='';
let awaitingNextValue = false;


function sendNumberValue(number){
    // replace current display vlaue if firs value is entred
    if(awaitingNextValue){
        calculatorDisplay.textContent=number;
        awaitingNextValue = false;
    }else{
        //if current display value is 0,replace.if not add number
    const displayValue =calculatorDisplay.textContent;
    calculatorDisplay.textContent=displayValue=== '0' ? number : displayValue+number;
    }
}

// Reset display 
function resetAll(){
     firstValue = 0;
     operatorValue ='';
     awaitingNextValue = false;
    calculatorDisplay.textContent='0';
}

function addDecimal(){
    // if operator pressed dont add decimal 
    if(awaitingNextValue) return;
    if (!calculatorDisplay.textContent.includes('.')){
        calculatorDisplay.textContent=`${calculatorDisplay.textContent}.`;
    }
}
 function useOperator(operator){
    const currentValue = Number(calculatorDisplay.textContent);
    // prevent multiple operators 
    if (operatorValue && awaitingNextValue) {
        operatorValue=operator;
         return;}
    //Assign First value if no value
   if (!firstValue){
    firstValue = currentValue;
   }else{
    const calculation =calculate [operatorValue](firstValue, currentValue);
    calculatorDisplay.textContent = calculation;
    firstValue = calculation;
   }
   
   // Ready for next value, store operator
   awaitingNextValue = true;
   operatorValue = operator;
 }
// add event listener for numbers ,operators , decimal button
inbutBtns.forEach((inbutBtn)=>{
    if(inbutBtn.classList.length===0){
        inbutBtn.addEventListener('click',()=> sendNumberValue(inbutBtn.value));
    }else if (inbutBtn.classList.contains('operator')){
        inbutBtn.addEventListener('click',()=>useOperator(inbutBtn.value));
    } else if (inbutBtn.classList.contains('decimal')){
        inbutBtn.addEventListener('click',()=> addDecimal());
    }
});

// Event listener 
clearBtn.addEventListener('click',resetAll);