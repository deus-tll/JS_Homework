(() => {
  let registrationForm = document.querySelector("#main_form");
  registrationForm.querySelector("#submit_btn").addEventListener("click", () => {
    let validator = new Validator(registrationForm.querySelector("#email_address").value);
    let errorLabel = registrationForm.querySelector("#label_error");

    validator.IsEmail().MinLength(9).MaxLength(256);
    if(!GetError()) return;

    validator.Validate(registrationForm.querySelector("#login").value).IsLogin().MinLength(8).MaxLength(50);
    if(!GetError()) return;

    const password = registrationForm.querySelector("#password").value;
    validator.Validate(password).IsComplexityPassword().MinLength(8).MaxLength(50);
    if(!GetError()) return;

    validator.Validate(registrationForm.querySelector("#confirm_password").value).ConfirmPasword(password);
    if(!GetError()) return;

    validator.Validate(registrationForm.querySelector("#phone_number").value).IsPhoneNumber();
    if(!GetError()) return;

    function GetError(){
      if(validator.GetErrors().length > 0) {
        errorLabel.innerHTML = validator.GetError();
        return false;
      }
      return true;
    }

    registrationForm.submit();
  });
})()