const decValueEl = document.getElementById("decimal-input");
const binValueEl = document.getElementById("binary-input");
const helpText = document.getElementById("help-text");

let savedValues = {};
let lastChanged = "none";
let calculated = false;

decValueEl.addEventListener("input", e => convert());
binValueEl.addEventListener("input", e => convert());

document.addEventListener("DOMContentLoaded", loadSaved);
window.addEventListener("beforeunload", storageSavedValues);

function removeLetters(){
    decValueEl.value = decValueEl.value.replace(/[^0-9]/g, '');
    binValueEl.value = binValueEl.value.replace(/[^0-9]/g, '');
}

function inputChangedTo(elementType){
    lastChanged = elementType;
    calculated = false;
}

function convert(){
    if(!checkValues())
        return;

    calculated = true;

    if(lastChanged == "decimal"){
        binValueEl.value = parseInt(decValueEl.value, 10).toString(2);
        decValueEl.value = decValueEl.value.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }
    else if(lastChanged == "binary"){
        decValueEl.value = parseInt(binValueEl.value, 2).toString();
        decValueEl.value = decValueEl.value.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }
}

function checkValues(){
    removeLetters();

    helpText.innerHTML = "";

    if(lastChanged == "none"){
        helpText.innerHTML = "Invalid value";
        return false;
    }
    else if(lastChanged == "decimal" && decValueEl.value == ""){
        helpText.innerHTML = "Invalid value";
        return false;
    }
    else if(lastChanged == "binary" && binValueEl.value == ""){
        helpText.innerHTML = "Invalid value";
        return false;
    }
    else if(lastChanged == "binary" && binValueEl.value.replace(/[0-1]/g, '') != ""){
        helpText.innerHTML = "Invalid binary value";
        return false;
    }

    return true;
}

function save(){
    if(!calculated){
        helpText.innerHTML = "Convert an new value";
        return;
    }

    if(binValueEl.value.length > 53){
        helpText.innerHTML = "Too large value";
        return;
    }

    calculated = false;

    const savedValuesLength = Object.keys(savedValues).length;

    insertRow(binValueEl.value, decValueEl.value, savedValuesLength);
    
    savedValues[savedValuesLength] = {
        bin: binValueEl.value,
        dec: decValueEl.value
    }
}

function loadSaved(){
    const storage = localStorage.getItem("binary-converter-saved-values");

    if(storage)
        savedValues = JSON.parse(storage);
    else
        savedValues = {};
        
    for(const k in savedValues){
        insertRow(savedValues[k].bin, savedValues[k].dec, k);
    }
}

function storageSavedValues(){
    localStorage.setItem("binary-converter-saved-values", JSON.stringify(savedValues));
}

function insertRow(binValue, decValue, id){
    if(document.getElementById("saved-values").style.display == "none"){
        document.getElementById("saved-values").style.display = "block";
        document.getElementById("interface").style.justifyContent = "space-evenly";
    }

    const table = document.getElementById("saved-values-table");
    const newRow = table.insertRow(-1);
    newRow.id = "saved-values-"+id;

    let newCell = newRow.insertCell(0);
    let newContent = document.createTextNode(binValue);
    newCell.appendChild(newContent);

    newCell = newRow.insertCell(1);
    newContent = document.createTextNode(decValue);
    newCell.appendChild(newContent);

    newCell = newRow.insertCell(2);
    newContent = document.createElement("img");
    newContent.src = "./delete.png";
    newContent.id = id;
    newCell.appendChild(newContent);

    newContent.addEventListener("click", e => deleteRowValue(id));
}

function deleteRowValue(id){
    const table = document.getElementById("saved-values-table");

    delete savedValues[id];

    document.getElementById("saved-values-"+id).remove();

    if(table.rows.length == 1){
        document.getElementById("saved-values").style.display = "none";
    }

    calculated = true;
}