// Глобальный объект MyForm
function MyForm(id) {
  this.form = document.getElementById(id);
  this.button = this.form.querySelectorAll("#submitButton")[0];
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
  // Обрабатываем инпуты
  let inputs = Array.from(this.form.querySelectorAll("input"));
  for (let i = 0; i < inputs.length; i++) {
    switch (inputs[i].getAttribute("name")) {
      case "fio": // Валидируем имя
        this.nameValidation(inputs[i]);
        break;
      case "email": // Валидируем почту
        this.emailValidation(inputs[i]);
        break;
      case "phone": // Валидируем телефон
        this.phoneValidate(inputs[i]);
        break;
      default:
        break;
    }
  }
};

// Функция показа ошибки
function throwError(el) {
  if (el.classList) el.classList.add("error");
  else el.className = "error";
  return 0;
}

// Функция обработки ФИО
MyForm.prototype.nameValidation = function(el) {
  let arrNames = el.value.split(" ").filter(el => {
    return el.replace(/[^A-Za-zА-Яа-яё]/gim, "");
  });
  if (arrNames.length == 3) {
    el.classList.remove("error");
  } else {
    throwError(el);
  }
};

// Функция обработки Email
MyForm.prototype.emailValidation = function(el) {
  let emails = [
      "ya.ru",
      "yandex.ru",
      "yandex.ua",
      "yandex.by",
      "yandex.kz",
      "yandex.com"
    ],
    regularEmailChecker = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (regularEmailChecker.test(el.value.replace(" ", ""))) {
    let mailProvider = el.value.split("@");
    let flag = 0;
    for (let j = 0; j < emails.length; j++) {
      if (emails[j] == mailProvider[1]) {
        el.classList.remove("error");
        break;
      } else {
        flag++;
      }
    }
    if (flag == emails.length) throwError(el);
  } else {
    throwError(el);
  }
};

// Маска ввода телефона
var phoneNumber = new PhoneMask(document.getElementById("phoneMask"), {
  pattern: "+7(___)___-__-__",
  patternChar: "_",
  allowedRegExp: /^\d$/
});

// Валидируем номер телефона
MyForm.prototype.phoneValidate = function(el) {
  let numArray = el.value.replace(/[^0-9]/gim, "").split(""),
    sumNum = 0;
  if (numArray.length == 11) {
    for (var k = 0; k < numArray.length; k++) {
      sumNum += +numArray[k];
    }
    if (sumNum > 30) {
      throwError(el);
    }
  } else {
    throwError(el);
  }
};

MyForm.prototype.submit = function() {
  this.validate();
};

let a = new MyForm("myForm");
