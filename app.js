
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

function getDay(input) {
    const array  = [];
    for (let i = 0; i <= 47; i++) {
        array.push(input[i]);
    }
    return array;
}

function createWeek(input) {
    const week = [];
    for (let i = 0; i < 7; i++) {
        week.push(getDay(input));
        removeDay(input);
    }

    const weekCleaned = [];
    for (let i = 0; i < week.length - 1; i++) {
        if (week[i][0] !== undefined) {
            weekCleaned.push(week[i]);
        }
    }
    return weekCleaned;
}

function createTable(input) {
    const week = createWeek(input);
    let string = '';

    const length = week.length - 1;

    for (let i = 0; i <= 47; i++) {
        for (let j = length; j >= 0; --j) {
            string += week[j][i];
            if (j !== 0) {
                string += '\t';
            }

            if (j === 0 && i !== 47) {
                string += '\n';
            }
        }
    }
    return string;
}

function showOnInput() {
    const input = document.querySelector('#input');
    const output = document.querySelector('#output');
    
    input.addEventListener('input', () => {
        const outputText = document.querySelector('#input').value;
        let out  = sepLines(outputText);
        out = sepValue(out);
        out = removeBloat(out);
        out = removeNewline(out);
    
        const dayData = stringToArray(out);
        let outDay = stringPerDay(dayData);
        output.textContent = createTable(dayData);
    })
}

showOnInput();