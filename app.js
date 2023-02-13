
function sepLines(input) {
    return input.replaceAll(' kWh </div></div>', '\n\n');
}

function sepValue(input) {
    return input.replaceAll('1.4em>', '\n\n');
}

function removeBloat(input) {
    return input.replace(/^.{20,}(\r?\n|$)/gm, '');
}

function removeNewline(input) {
    return input.replace(/^\s*(\r?\n|$)/gm, '');
}

function stringToArray(input) {
    const array = input.split('\n');
    array.pop();
    array.pop();
    return array;
}

function stringPerDay(input) {
    let output = '';
    if (input.length >= 47) {
        for(let i = 0; i <= 47; i++){
            output += input[i];
            if(i !== 47) {
                output += '\n' ;
            }
        }
    }
    else {
        for(let i = 0; i < input.length; i++){
            output += input[i];
            if(i !== input.length - 1) {
                output += '\n' ;
            }
        }
    }
    return output;
}

function removeDay(input) {
    const array  = input;
    for (let i = 0; i <= 47; i++) {
        array.shift();
    }
    return array;
}

function showOnInput() {
    const input = document.querySelector('#input');
    const output1 = document.querySelector('#output1');
    const output2 = document.querySelector('#output2');
    const output3 = document.querySelector('#output3');
    const output4 = document.querySelector('#output4');
    const output5 = document.querySelector('#output5');
    const output6 = document.querySelector('#output6');
    const output7 = document.querySelector('#output7');
    
    input.addEventListener('input', () => {
        const outputText = document.querySelector('#input').value;
        let out  = sepLines(outputText);
        out = sepValue(out);
        out = removeBloat(out);
        out = removeNewline(out);

        const dayData = stringToArray(out);
        let outDay = stringPerDay(dayData);
        output1.textContent = outDay;
        output2.textContent = stringPerDay(removeDay(dayData));
        output3.textContent = stringPerDay(removeDay(dayData));
        output4.textContent = stringPerDay(removeDay(dayData));
        output5.textContent = stringPerDay(removeDay(dayData));
        output6.textContent = stringPerDay(removeDay(dayData));
        output7.textContent = stringPerDay(removeDay(dayData));
    })
}

showOnInput();