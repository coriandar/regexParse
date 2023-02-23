
function cleanData(input) {
    input = input.replace(/(kWh|1.4em>)/gm, '\n'); // add seperator
    input = input.replace(/^.{20,}(\r?\n|$)/gm, ''); // remove over 20chars
    input = input.replace(/(\s+)$/gm, '\n'); // remove white space end of data
    input = input.replace(/^\s*(\r?\n|$|)/gm, ''); // remove carriage & \n
    return input;
}

function createWeek(input) {
    // create array of max length 7
    const week = [];
    for (let i = 0; i < 8; i++) {
        week.push(input.slice(0, 48)); // gets 0 -> 47
        input.splice(0, 48); // removes 0 -> 47
    }
    return week.filter(currentDay => currentDay[0] !== undefined); // if index[0] of currentDay of week 
}

function transformData(input) {
    const week = createWeek(cleanData(input).split('\n').slice(0, -2)); // removes last 2 index
    let weekData = '';

    // print in reverse order
    for (let reading = 0; reading <= 47; reading++) {
        for (let currentDay = week.length - 1; currentDay >= 0; --currentDay) {
            weekData += week[currentDay][reading];
            // can have nested ternary
            weekData += currentDay !== 0 ? '\t' : (reading !== 47 ? '\n' : '');
        }
    }
    return weekData;
}

function showOnInput() {
    const inputData = document.querySelector('#inputData');
    const outputData = document.querySelector('#outputData');

    inputData.addEventListener('input', () => {
        outputData.textContent = transformData(inputData.value);
    })
}

showOnInput();