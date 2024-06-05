const validationPhoneNumber = (number:string):boolean =>{
    const phoneRegex = /^[0-9]{10,11}$/;
    if(!phoneRegex.test(number)){
        return true;
    }else {
        return false;
    }
}

const removeSpaces = (input: string):string =>{
    return input.replace(/\s+/g,"")
}

export { validationPhoneNumber, removeSpaces }