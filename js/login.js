const signInToggle = document.querySelector("#signin-toggle"),
    credentialSubmitButton = document.querySelector("#credential-submit-btn"),
    invalidEmailLabel = document.querySelector("#invalid-email-label")

// UI
credentialSubmitButton.innerHTML=`Log in`;

signInToggle.addEventListener("change", () => {
    if (signInToggle.checked){
        credentialSubmitButton.innerHTML=`Sign up`;
    } else {
        credentialSubmitButton.innerHTML=`Log in`;
    }
})

// Input Validation
const emailInput=document.querySelector("#login-email"),
    passwordInput=document.querySelector("#login-password");

function validateEmail(email){
    const re = /^\S+@\S+\.\S/;
    return re.test(email);
}

function validatePassword(password){
    const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[a-zA-z\d@$!%*#?&]{8,32}$/;
    return re.test(password);
}

function invalidEmailAlert(){
    if (!validateEmail(emailInput.value) && emailInput.value !== "") {
        invalidEmailLabel.style.display = "block";
        emailInput.style.color = "#ce034c"
    } else {
        invalidEmailLabel.style.display = "none";
        emailInput.style.color = "black"
    }
}

function invalidPasswordAlert() {
    if (!validatePassword(passwordInput.value) && passwordInput.value !== "") {
        passwordInput.style.color = "#ce034c";
    } else {
        passwordInput.style.color = "";
    }
}

signInToggle.addEventListener("change", () => {
    if (signInToggle.checked){
        invalidEmailAlert();
        invalidPasswordAlert();
        emailInput.addEventListener("input", () => {
            invalidEmailAlert();
        })
        passwordInput.addEventListener("input", () => {
            invalidPasswordAlert();
        })
    } else {
        invalidEmailLabel.style.display = "none";
        passwordInput.style.color = "black";
    }
})