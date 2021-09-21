const decValueElement = document.getElementById("decimal-input");
const binValueElement = document.getElementById("binary-input");
const helpText = document.getElementById("help-text");

lastChanged = "none";


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

    if(lastChanged == "decimal"){
        binValueElement.value = parseInt(decValueElement.value, 10).toString(2);
    }
    else if(lastChanged == "binary"){
        decValueElement.value = parseInt(binValueElement.value, 2).toString();
    }
}


function changed(elementType){
    lastChanged = elementType;
}