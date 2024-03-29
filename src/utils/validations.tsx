export const isEmpty = (inputElement: HTMLInputElement | HTMLTextAreaElement, errorDiv: HTMLDivElement) => {
    errorDiv.innerText = "";
    if(inputElement.value == ""){
        errorDiv.innerText = "This field is required!";
        return true;
    }
    return false;
}

export const isMaxLengthExceeded = (inputElement: HTMLInputElement | HTMLTextAreaElement, errorDiv: HTMLDivElement, length: number) => {
    errorDiv.innerText = "";
    if(inputElement.value.length > length){
        errorDiv.innerText = "Max character limit reached ("+ length + ")";
        return true;
    }
    return false;
}

export const isNotLength = (inputElement: HTMLInputElement | HTMLTextAreaElement, errorDiv: HTMLDivElement, length: number) => {
    errorDiv.innerText = "";
    if(inputElement.value.length == length){
        return false;
    }
    errorDiv.innerText = "This field should be "+ length + " characters long only!";
    return true;
}

export const isNotLengthOrEmpty = (inputElement: HTMLInputElement | HTMLTextAreaElement, errorDiv: HTMLDivElement, length: number) => {
    errorDiv.innerText = "";
    if(inputElement.value.length != 0 && inputElement.value.length != length){
        errorDiv.innerText = "This field should either be empty or "+ length + " characters long only!";
        return true;
    }
    return false;
}

export const isNoOptionSelected = (inputElement: HTMLSelectElement, errorDiv: HTMLDivElement) => {
    errorDiv.innerText = "";
    if(inputElement.value == "-select-"){
        errorDiv.innerText = "This field is required!";
        return true;
    }
    return false;
}

export const isNotEmail = (inputElement: HTMLInputElement | HTMLTextAreaElement, errorDiv: HTMLDivElement) => {
    errorDiv.innerText = "";
    if(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(inputElement.value) == false){
        errorDiv.innerText = "Invalid email format!";
        return true;
    }
    return false;
}
