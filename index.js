// Глобальный объект MyForm
function MyForm(id) {
  this.form = document.getElementById(id);
  this.inputFio = this.form.querySelector("input[name='fio']");
  this.inputEmail = this.form.querySelector("input[name='email']");
  this.inputPhone = this.form.querySelector("input[name='phone']");
  this.isValid = true;
  this.errorFields = [];
  this.button = this.form.querySelector("#submitButton");
  this.button.onclick = () => {
    this.submit();
  };
}

// В глобальной области видимости должен быть определен объект MyForm с методами
// validate() => { isValid: Boolean, errorFields: String[] }
// getData() => Object
// setData(Object) => undefined
// submit() => undefined

MyForm.prototype.validate = function() {
  let data = this.getData();
  this.nameValidation(data.fio);
  this.emailValidation(data.email);
  this.phoneValidation(data.phone);
  return { isValid: this.isValid, errorFields: this.errorFields };
};

// Функция вызова ошибки
MyForm.prototype.throwError = function(el) {
  this.isValid = false;
  this.errorFields.push(el.name);
  if (el.classList) el.classList.add("error");
  else el.className = "error";
  return 0;
};

// Функция обработки ФИО
MyForm.prototype.nameValidation = function(str) {
  let arrNames = str.split(" ").filter(el => {
    return el.replace(/[^A-Za-zА-Яа-яё]/gim, "");
  });
  if (arrNames.length == 3) {
    //
  } else {
    this.throwError(this.inputFio);
  }
};

// Функция обработки Email
MyForm.prototype.emailValidation = function(str) {
  let emails = [
      "ya.ru",
      "yandex.ru",
      "yandex.ua",
      "yandex.by",
      "yandex.kz",
      "yandex.com"
    ],
    regularEmailChecker = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (regularEmailChecker.test(str.replace(" ", ""))) {
    let mailProvider = str.split("@");
    let flag = 0;
    for (let j = 0; j < emails.length; j++) {
      if (emails[j] == mailProvider[1]) {
        // убрать класс ошибки
        break;
      } else {
        flag++;
      }
    }
    if (flag == emails.length) this.throwError(this.inputEmail); // Выкинуть ошибку;
  } else {
    this.throwError(this.inputEmail);
  }
  return 0;
};

// Маска ввода телефона
var phoneNumber = new PhoneMask(document.getElementById("phone_mask"), {
  pattern: "+7(___)___-__-__",
  patternChar: "_",
  allowedRegExp: /^\d$/
});

// Валидируем номер телефона
MyForm.prototype.phoneValidation = function(str) {
  let numArray = str.replace(/[^0-9]/gim, "").split(""),
    sumNum = 0;
  if (numArray.length == 11) {
    for (var k = 0; k < numArray.length; k++) {
      sumNum += +numArray[k];
    }
    if (sumNum > 30) {
      this.throwError(this.inputPhone);
    }
  } else {
    this.throwError(this.inputPhone);
  }
};

// Получаем данные с формы
MyForm.prototype.getData = function() {
  let formData = {},
    inputs = Array.from(this.form.querySelectorAll("input"));
  for (let i = 0; i < inputs.length; i++) {
    formData[inputs[i].name] = inputs[i].value;
  }
  return formData;
};

MyForm.prototype.setData = function(obj) {
  let inputs = Array.from(this.form.querySelectorAll("input"));
  for (let i = 0; i < inputs.length; i++) {
    formData[inputs[i].name] = inputs[i].value;
  }
};

MyForm.prototype.submit = function() {
  this.validate();
  this.getData();
};

let a = new MyForm("myForm");
