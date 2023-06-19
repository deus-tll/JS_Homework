'use sctrict'

class Validator {
  #_validateStr = "";
  #_errors = [];
  #_etalonSimple = "0123456789_()qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM";
  #_etalonExt = "0123456789_$@.()qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM";

  constructor(validateStr) {
     this.Validate(validateStr);
  }

  GetError = (index = 0) => {
    return this.#_errors[index]
  }

  GetErrors = () => {
    return this.#_errors;
  }

  Validate = (validateStr) => {
    this.#_validateStr = validateStr;
    this.#_errors = [];
    return this;
  }

  MaxLength = (maxCountLetters = 32) => {
    if(this.#_validateStr.length > maxCountLetters) {
      this.#_errors.push("Too large count of symbols");
    }
    return this;
  }

  MinLength = (minCountLetters = 3) => {
    if(this.#_validateStr.length < minCountLetters) {
      this.#_errors.push("Too small count of symbols");
    }
    return this;
  }

  IsWrongSimpleLetters = () => {
    for (let i = 0; i < this.#_validateStr.length; i++) {
      if(!this.#_etalonSimple.includes(this.#_validateStr[i])) {
        this.#_errors.push("Contains incorrect symbols");
        return this;
      }
    }

    return this;
  }

  IsWrongExtLetters = () => {
    for (let i = 0; i < this.#_validateStr.length; i++) {
      if(!this.#_etalonExt.includes(this.#_validateStr[i])) {
        this.#_errors.push("Contains incorrect symbols");
        return this;
      }
    }

    return this;
  }

  IsComplexityPassword = () => {
    const passwordRegPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if(!passwordRegPattern.test(this.#_validateStr)) {
      this.#_errors.push("The password is not strong enough");
    }
    return this;
  }

  ConfirmPasword = (password) => {
    if(password !== this.#_validateStr) {
      this.#_errors.push("The passwords is not the same");
    }
    return this;
  }

  IsEmail = () => {
    const emailRegPattern = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

    if(!emailRegPattern.test(this.#_validateStr)) {
      this.#_errors.push("Email incorrect");
    }
    return this;
  }

  IsPhoneNumber = () => {
    const phoneNumberRegPattern = /^\+?[1-9]\d{1,14}$/;

    if(!phoneNumberRegPattern.test(this.#_validateStr)) {
      this.#_errors.push("The phone number is incorrect");
    }
    return this;
  }

  IsLogin = () => {
    const loginRegPattern = /^[a-zA-Z0-9._-]{3,}$/;

    if(!loginRegPattern.test(this.#_validateStr)) {
      this.#_errors.push("The login is incorrect");
    }
    return this;
  }
}