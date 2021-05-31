function init() {

    // <option value="Physics">Physics</option>

    document.getElementById("submit").addEventListener('click', (e) => {
        e.preventDefault();
        let cationBox = document.getElementById("cation");
        let anionBox = document.getElementById("anion");

        if (document.getElementById('result-div'))
            document.getElementById('result-div').parentNode.removeChild(document.getElementById('result-div'));
        
        let div = document.createElement('div');
        div.classList.add('center-div');
        div.id = 'result-div';

        if (!areCompatible(anionBox.value, cationBox.value)) {
            let warn = document.createElement('h3');
            warn.classList.add('warn');
            warn.appendChild(document.createTextNode('Invalid salt specified. Please select one of: '));
            div.appendChild(warn);

            let text = document.createElement('div');
            text.style.fontSize = '20px';
            text.innerHTML = getSaltList();
            div.appendChild(text);

            document.body.appendChild(div);
        }
        else {
            let saltName = document.createElement('h3');
            saltName.innerHTML = `You selected ` + getCurrentSalt();
            div.appendChild(saltName);
            

            let testDiv = document.createElement('div');
            testDiv.style.fontSize = '20px';
            testDiv.innerHTML = getAllApplicableTests();
            div.appendChild(testDiv);

            document.body.appendChild(div);
        }
    });

    for (let x of Object.keys(ionData.anions)) {
        let opt = document.createElement('option');
        opt.value = x;
        opt.appendChild(document.createTextNode(x));
        document.getElementById("anion").appendChild(opt);
    }

    for (let x of Object.keys(ionData.cations)) {
        let opt = document.createElement('option');
        opt.value = x;
        opt.appendChild(document.createTextNode(x));
        document.getElementById("cation").appendChild(opt);
    }

}

function areCompatible(ion1name, ion2name) {    
    let ion1 = getIonFromName(ion1name);
    let ion2 = getIonFromName(ion2name);

    return ion1.getCompatible().includes(ion2name) || ion2.getCompatible().includes(ion1name);
}

let getIonFromName = (ionName) => {
    let ion;
    if (ionData.anions.hasOwnProperty(ionName)) {
        ion = ionData.anions[ionName];
    }
    else if (ionData.cations.hasOwnProperty(ionName)) {
        ion = ionData.cations[ionName];
    }

    return ion;
}

let getCurrentSalt = function() {
    let cationBox = document.getElementById("cation");
    let anionBox = document.getElementById("anion");
    let cation = getIonFromName(cationBox.value);
    let anion = getIonFromName(anionBox.value);

    let charge = ['', ''];

    if (anion.charge == -1) {
        charge[1] = '';
    }
    else {
        charge[1] = Math.abs(anion.charge);
    }
    
    if (cation.charge == 1) {
        charge[0] = '';
    }
    else {
        charge[0] += Math.abs(cation.charge);
    }

    if (charge[0] == charge[1]) {
        charge = ['', ''];
    }
    let symbol = `(${symbols.cations[cation.name]})`
    + `<sub>${charge[1]}</sub>`
    + `(${symbols.anions[anion.name]})`
    + `<sub>${charge[0]}</sub>`
    return `${symbol} - ${cationBox.value} ${anionBox.value}`;
}

getSaltList = () => {
    toRet = "";
    for (x in ionData.cations) {
        for (y in getIonFromName(x).getCompatible()) {
            toRet += `<br>${x} ${getIonFromName(x).getCompatible()[y]}`;
        }
    }
    return toRet;
}

getAllApplicableTests = function() {
    let cationBox = document.getElementById("cation");
    let anionBox = document.getElementById("anion");
    let cation = getIonFromName(cationBox.value);
    let anion = getIonFromName(anionBox.value);

    toRet = "";
    for (test of Object.values(testData)) {
        if (test.checkIon(cation) || test.checkIon(anion)) {
            toRet += `<h4> ${test.name} </h4> ${test.procedure}`
            
            if (test.getObservation(cation)){
                toRet += `<br><b> Observation: </b>` + test.getObservation(cation);
            }
            if (test.getObservation(anion)) {
                toRet += `<br><b> Observation: </b>` + test.getObservation(anion);
            }
        }
    }

    return toRet;
}