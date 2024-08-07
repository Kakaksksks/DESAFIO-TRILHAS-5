
const form = document.getElementById("form")
const username = document.getElementById("username")
const email = document.getElementById("email")
const password = document.getElementById("password")
const passwordConfirmation = document.getElementById("password-confirmation");

form.addEventListener("submit", (event) => {
    event.preventDefault();

    const isValid = checkForm();
    if(isValid){
        axios.post("http://localhost:3000/usuarios", {
            name: username.value, email: email.value, password: password.value
        })
        alert("INSCRIÇÃO REALIZADA COM SUCESSO!")
    }

})

username.addEventListener("blur", () => {
    checkInputUsername();
})

email.addEventListener("blur", () => {
    checkInputEmail();
})

password.addEventListener("blur", () => {
    checkInputPassword();
})

passwordConfirmation.addEventListener("blur", () => {
    checkInputpasswordConfirmation();
})

function checkInputUsername(){ 
    const usernameValue = username.value;

    if(usernameValue === ""){
        errorInput(username, "PREENCHA UM USERNAME!")
    }else{
        const formItem = username.parentElement;
        formItem.className = "form-content"
    }

}

function checkInputEmail(){ 
    const emailValue = email.value;

    if(emailValue === ""){
        errorInput(email, "O EMAIL É OBRIGATÓRIO.")
    }else{
        const formItem = email.parentElement;
        formItem.className = "form-content"
    }

}

function checkInputPassword(){ 
    const passwordValue = password.value;

    if(passwordValue === ""){
        errorInput(password, "A SENHA É OBRIGATÓRIA.")
    }else if(passwordValue.length < 8){
        errorInput(password, "A senha precisa ter no mínimo 8 carecteres.")
    }else{
        const formItem = password.parentElement;
        formItem.className = "form-content"
    }

}

function checkInputpasswordConfirmation(){ 
    const passwordValue = password.value;
    const passwordConfirmationValue = passwordConfirmation.value;

    if(passwordConfirmationValue === ""){
        errorInput(passwordConfirmation, "A confirmação de senha é obrigatória.")
    }else if(passwordConfirmationValue !== passwordValue){
        errorInput(passwordConfirmation, "As senhas não são iguais")
    }else{
        const formItem = passwordConfirmation.parentElement;
        formItem.className = "form-content"
    }
    
}

function errorInput(input, message){
    const formItem = input.parentElement;
    const textMessage = formItem.querySelector("a")

    textMessage.innerText = message;

    formItem.className = "form-content error"
}

function checkForm(){
    checkInputUsername();
    checkInputEmail();
    checkInputPassword();
    checkInputpasswordConfirmation();

    const formItems = form.querySelectorAll(".form-content")

    const isValid = [...formItems].every( (item) => {
        return item.className === "form-content"
    });

    return isValid
}