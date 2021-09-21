const decValueElement = document.getElementById("decimal-input");
const binValueElement = document.getElementById("binary-input");
const helpText = document.getElementById("help-text");
const interface = document.getElementById("interface");

lastChanged = "none";
calculated = false;

function removeLetters(){
    decValueElement.value = decValueElement.value.replace(/[^0-9]/g, '');
    binValueElement.value = binValueElement.value.replace(/[^0-9]/g, '');
}


function checkValues(){
    removeLetters();

    helpText.innerHTML = "";

    if(lastChanged == "none"){
        helpText.innerHTML = "Invalid value";
        return false;
    }
    else if(lastChanged == "decimal" && decValueElement.value == ""){
        helpText.innerHTML = "Invalid value";
        return false;
    }
    else if(lastChanged == "binary" && binValueElement.value == ""){
        helpText.innerHTML = "Invalid value";
        return false;
    }
    else if(lastChanged == "binary" && binValueElement.value.replace(/[0-1]/g, '') != ""){
        helpText.innerHTML = "Invalid binary value";
        return false;
    }

    return true;
}


function convert(){
    if(!checkValues())
        return;

    calculated = true;

    if(lastChanged == "decimal"){
        binValueElement.value = parseInt(decValueElement.value, 10).toString(2);
    }
    else if(lastChanged == "binary"){
        decValueElement.value = parseInt(binValueElement.value, 2).toString();
    }
}


function changed(elementType){
    lastChanged = elementType;
    calculated = false;
}


function save(){
    if(!calculated){
        helpText.innerHTML = "Convert the values";
        return;
    }

    if(binValueElement.value.length > 53){
        helpText.innerHTML = "Too large value";
        return;
    }

    calculated = false;

    const table = document.getElementById("saved-values-table");

    if(table.style.display == ""){
        table.style.display = "block";
        interface.style.justifyContent = "space-evenly";
    }

    const newRow = table.insertRow(-1);
    let newCell = newRow.insertCell(0);
    let newText = document.createTextNode(binValueElement.value);
    newCell.appendChild(newText);

    newCell = newRow.insertCell(1);
    newText = document.createTextNode(decValueElement.value);
    newCell.appendChild(newText);
}