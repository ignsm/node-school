// Глобальный объект MyForm
function MyForm(id) {
  this.form = document.getElementById(id);
  this.inputFio = this.form.querySelector("input[name='fio']");
  this.inputEmail = this.form.querySelector("input[name='email']");
  this.inputPhone = this.form.querySelector("input[name='phone']");
  this.button = this.form.querySelector("#submitButton");
  this.resultContainer = this.form.querySelector("#resultContainer");
  this.isValid = false;
  this.errorFields = [];
  this.button.onclick = () => {
    this.submit();
  };
}

MyForm.prototype.validate = function() {
  let data = this.getData();
  if (
    this.nameValidation(data.fio) &&
    this.emailValidation(data.email) &&
    this.phoneValidation(data.phone)
  ) {
    this.isValid = true;
  } else {
    this.isValid = false;
  }
  return { isValid: this.isValid, errorFields: this.errorFields };
};

// Функция вызова ошибки
MyForm.prototype.throwError = function(el) {
  this.errorFields.push(el.name);
  el.classList.add("error");
  return 0;
};

// Убираем ошибку, если всё ок
MyForm.prototype.disableError = function(el) {
  this.errorFields.splice(this.errorFields.indexOf(el.name), 1);
  el.classList.remove("error");
  return 0;
};

// Функция обработки ФИО
MyForm.prototype.nameValidation = function(str) {
  let arrNames = str.split(" ").filter(el => {
    return el.replace(/[^A-Za-zА-Яа-яё]/gim, "");
  });
  if (arrNames.length == 3) {
    this.disableError(this.inputFio);
    return (this.inputFio.isValid = true);
  } else {
    this.throwError(this.inputFio);
    return (this.inputFio.isValid = false);
  }
};

// Функция обработки Email
MyForm.prototype.emailValidation = function(str) {
  const pattern = /[a-zA-Z0-9.+@]+@(ya\.ru|(yandex\.(ru|ua|by|kz|com)))/;
  if (str.match(pattern)) {
    this.disableError(this.inputEmail);
    return (this.inputEmail.isValid = true);
  } else {
    this.throwError(this.inputEmail);
    return (this.inputEmail.isValid = false);
  }
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
  if (numArray.length != 11) {
    this.throwError(this.inputPhone);
    return (this.inputPhone.isValid = false);
  }
  for (var k = 0; k < numArray.length; k++) sumNum += +numArray[k];
  if (sumNum > 30) {
    this.throwError(this.inputPhone);
    return (this.inputPhone.isValid = false);
  } else {
    this.disableError(this.inputPhone);
    return (this.inputPhone.isValid = true);
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
  [this.inputFio.value, this.inputEmail.value, this.inputPhone.value] = [
    obj.fio,
    obj.email,
    obj.phone
  ];
};

MyForm.prototype.sendRequest = function() {
  var request = new XMLHttpRequest();
  // console.log(this.form);
  let action = this.form.getAttribute("action");
  request.open("GET", action);
  request.send();
  request.onreadystatechange = function() {
    if (request.readyState != 4) return 0;
    if (request.status != 200) {
      console.log(request.status + ": " + request.statusText);
    } else {
      let resp = JSON.parse(request.responseText);
      if (resp.status == "success") {
        el.classList.remove("progress");
        this.resultContainer.className += " success";
        this.resultContainer.innerHTML = "Success";
      } else if (resp.status == "error") {
        el.classList.remove("progress");
        this.resultContainer.className += " error";
        this.resultContainer.innerHTML = resp.reason;
      } else if (resp.status == "progress") {
        this.resultContainer.className += "progress";
        setTimeout(this.sendRequest.bind(this), resp.timeout);
      }
    }
  }.bind(this);
};

MyForm.prototype.submit = function() {
  this.validate();
  if (this.isValid) {
    this.button.setAttribute("disabled", true);
    this.sendRequest();
  }
};

let nodeTest = new MyForm("myForm");
