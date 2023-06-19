(() => {
  let loginForm = document.querySelector("#main_form");
  loginForm.querySelector("#submit_btn").addEventListener("click", () => {
    let validator = new Validator(loginForm.querySelector("#email_address").value);
    let errorLabel = loginForm.querySelector("#label_error");

    validator.IsEmail().MinLength(9).MaxLength(256);
    if(!GetError()) return;

    validator.Validate(loginForm.querySelector("#password").value).IsComplexityPassword().MinLength(8).MaxLength(50);
    if(!GetError()) return;

    function GetError(){
      if(validator.GetErrors().length > 0) {
        errorLabel.innerHTML = validator.GetError();
        return false;
      }
      return true;
    }

    loginForm.submit();
  });
})()