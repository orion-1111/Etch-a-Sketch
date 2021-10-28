const mainContainer = document.querySelector('#container');
const newGridBtn = document.querySelector('#new-grid-btn');

function generateGrid(squares) {
    mainContainer.innerHTML = '';
    mainContainer.style.gridTemplateColumns = 'repeat(' + squares + ', 1fr)';
    mainContainer.style.gridTemplateRows = 'repeat(' + squares + ', 1fr)';
    
    for (let i=1; i<squares+1; i++) {
        for (let j=1; j<squares+1; j++) {
            let newBox = document.createElement('div');
            newBox.setAttribute('class', 'container-box');
            mainContainer.appendChild(newBox);
        }
    }    
}

function randomIntFromInterval(min, max) { // min and max included 
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function changeBoxColorOnHover(e) {
    if (e.target && e.target.nodeName == 'DIV') {
        if (!e.target.style.backgroundColor) {
            const color1 = randomIntFromInterval(1, 255);
            const color2 = randomIntFromInterval(1, 255);
            const color3 = randomIntFromInterval(1, 255);
        
            e.target.style.backgroundColor = 'rgb(' + color1 + ', ' + color2 + ', ' + color3 + ')';        
        } else {
            let rgbStringWithParentheses = e.target.style.backgroundColor.slice(3);
            let rgbString = rgbStringWithParentheses.slice(1, rgbStringWithParentheses.length-1);
            let rgbArray = rgbString.split(', ');
            let rgbSetterArray = [0, 0, 0];
            
            rgbArray.forEach(function(item, index) {
                let value = parseInt(item, 10)
                value -= 25;
                value = (value < 0) ? 0 : value;           
                rgbSetterArray[index] = value;
            });
            
            e.target.style.backgroundColor = 'rgb(' + rgbSetterArray[0] + ', ' + rgbSetterArray[1] + ', ' + rgbSetterArray[2] + ')';
        }
    }
}

function cleanInput(squares) {
    let trimmedInput = squares.trim();
    
    return parseInt(trimmedInput, 10);
}

function createNewGrid() {
    let squares = prompt("Enter the number of square in the new grid (max 100)");
    
    let cleanedInput = cleanInput(squares);
    if (cleanedInput) {
        if (cleanedInput > 100) {
            cleanedInput = 100;
            alert("Exceeded maximum allowable squares. Automatically set to 100.");
        }
        
        generateGrid(cleanedInput);
    } else {
        alert("Please enter a valid number.")
        createNewGrid();
    }
}

function clearGrid() {
    let boxes = document.querySelectorAll('.container-box')
    
    for (let i=0; i<boxes.length; i++) { 
        boxes[i].style.backgroundColor = 'white';
    }
    
    createNewGrid();
}

generateGrid(16);
mainContainer.addEventListener('mouseover', changeBoxColorOnHover);
newGridBtn.addEventListener('click', clearGrid);