const signInToggle = document.querySelector("#signin-toggle"),
    credentialSubmitButton = document.querySelector("#credential-submit-btn");

// UI
credentialSubmitButton.innerHTML=`Log in`;

signInToggle.addEventListener("change", () => {
    if (signInToggle.checked){
        credentialSubmitButton.innerHTML=`Sign up`;
    } else {
        credentialSubmitButton.innerHTML=`Log in`;
    }
})

// Client-side Input Validation
const emailTextbox=document.querySelector("#login-email-box"),
    passwordTextbox=document.querySelector("#login-password-box"),
    invalidEmailLabel = document.querySelector("#invalid-email-label"),
    passwordRequirementContainer = document.querySelector(".password-requirement-container"),
    lengthIndicator = document.querySelector("#length-indicator"),
    characterIndicator = document.querySelector("#character-indicator"),
    numberIndicator = document.querySelector("#number-indicator"),
    symbolIndicator = document.querySelector("#symbol-indicator");

function validateEmail(email){
    const re = /^\S+@\S+\.\S/;
    return re.test(email);
}

function validatePassword(password){
    const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&.])[a-zA-z\d@$!%*#?&.]{8,32}$/;
    return re.test(password);
}

function checkLength(password){
    if (password.length >= 8 && password.length <= 32) {
        lengthIndicator.style.borderColor = "#00b2a3";
    } else {
        lengthIndicator.style.borderColor = "#ff4e8e";
    }
}

function checkCharacter(password){
    const re = /^(?=.*[a-z])(?=.*[A-Z]).*$/;
    if (re.test(password)) {
        characterIndicator.style.borderColor = "#00b2a3";
    } else {
        characterIndicator.style.borderColor = "#ff4e8e";
    }
}

function checkNumber(password){
    const re = /^(?=.*\d).*$/;
    if (re.test(password)) {
        numberIndicator.style.borderColor = "#00b2a3";
    } else {
        numberIndicator.style.borderColor = "#ff4e8e";
    }
}

function checkSymbol(password){
    const re = /^(?=.*[@$!%*#?&.]).*$/;
    if (re.test(password)) {
        symbolIndicator.style.borderColor = "#00b2a3";
    } else {
        symbolIndicator.style.borderColor = "#ff4e8e";
    }
}

function invalidEmailAlert(){
    if (!validateEmail(emailTextbox.value) && emailTextbox.value !== "") {
        invalidEmailLabel.style.display = "block";
        emailTextbox.style.color = "#ce034c";
    } else {
        invalidEmailLabel.style.display = "none";
        emailTextbox.style.color = "black";
    }
}

function invalidPasswordAlert() {
    if (!validatePassword(passwordTextbox.value) && passwordTextbox.value !== "") {
        passwordTextbox.style.color = "#ce034c";
    } else {
        passwordTextbox.style.color = "black";
    }
}

function checkEmailFull() {
    invalidEmailAlert();
    credentialSubmitButton.disabled = !(validateEmail(emailTextbox.value) && validatePassword(passwordTextbox.value));
}

function checkPasswordFull() {
    invalidPasswordAlert();
    checkLength(passwordTextbox.value);
    checkCharacter(passwordTextbox.value);
    checkNumber(passwordTextbox.value);
    checkSymbol(passwordTextbox.value);
    credentialSubmitButton.disabled = !(validateEmail(emailTextbox.value) && validatePassword(passwordTextbox.value));
}

signInToggle.addEventListener("change", () => {
    if (signInToggle.checked){
        passwordRequirementContainer.style.display = "block";
        checkEmailFull();
        checkPasswordFull();
        emailTextbox.addEventListener("input", checkEmailFull, true)
        passwordTextbox.addEventListener("input", checkPasswordFull, true)
    } else {
        passwordRequirementContainer.style.display = "none";
        invalidEmailLabel.style.display = "none";
        emailTextbox.style.color = "black";
        passwordTextbox.style.color = "black";
        credentialSubmitButton.disabled = false;
        emailTextbox.removeEventListener("input", checkEmailFull, true)
        passwordTextbox.removeEventListener("input", checkPasswordFull, true)
    }
})