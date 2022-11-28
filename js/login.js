const signInToggle = document.querySelector("#signin-toggle"),
    pwdConfirmationRow = document.querySelector("#pwd-confirmation-row"),
    credentialSubmitButton = document.querySelector("#credential-submit-btn");

credentialSubmitButton.innerHTML=`Log in`;

signInToggle.addEventListener("change", () => {
    if (signInToggle.checked){
        pwdConfirmationRow.style.display="block";
        credentialSubmitButton.innerHTML=`Sign up`;
    } else {
        pwdConfirmationRow.style.display="none";
        credentialSubmitButton.innerHTML=`Log in`;
    }
})