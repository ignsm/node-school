// Глобальный объект MyForm
function MyForm(id) {
  this.form = document.getElementById(id);
  this.inputFio = this.form.querySelector("input[name='fio']");
  this.inputEmail = this.form.querySelector("input[name='email']");
  this.inputPhone = this.form.querySelector("input[name='phone']");
  this.button = this.form.querySelector("#submitButton");
  this.resultContainer = this.form.querySelector("#resultContainer");
  this.isValid = 1;
  this.errorFields = [];
  this.button.onclick = () => {
    this.submit();
  };
  this.inputPhone.onfocus = function() {
    var phoneNumber = new PhoneMask(this, {
      pattern: "+7(___)___-__-__",
      patternChar: "_",
      allowedRegExp: /^\d$/
    });
  };
}

MyForm.prototype.validate = function() {
  let data = this.getData();
  this.errorFields = [];
  if (!this.nameValidation(data.fio)) {
    this.isValid = 0;
    this.errorFields.push("fio");
  } else this.inputFio.classList.remove("error");
  if (!this.emailValidation(data.email)) {
    this.isValid = 0;
    this.errorFields.push("email");
  } else this.inputEmail.classList.remove("error");
  if (!this.phoneValidation(data.phone)) {
    this.isValid = 0;
    this.errorFields.push("phone");
  } else this.inputPhone.classList.remove("error");
  if (this.errorFields.length) {
    this.errorFields.forEach(name =>
      this.form
        .querySelector("input[name='" + name + "']")
        .classList.add("error")
    );
    return 0;
  } else {
    return (this.isValid = 1);
  }
};

// Функция обработки ФИО
MyForm.prototype.nameValidation = function(str) {
  let arrNames = str.split(" ").filter(el => {
    return el.replace(/[^A-Za-zА-Яа-яё]/gim, "");
  });
  return arrNames.length == 3;
};

// Функция обработки Email
MyForm.prototype.emailValidation = function(str) {
  const pattern = /[a-zA-Z0-9.+@]+@(ya\.ru|(yandex\.(ru|ua|by|kz|com)))/;
  return Boolean(str.match(pattern));
};

// Валидируем номер телефона
MyForm.prototype.phoneValidation = function(str) {
  let numArray = str.replace(/[^0-9]/gim, "").split(""),
    sumNum = 0;
  if (numArray.length != 11) return (this.inputPhone.isValid = false);
  for (var k = 0; k < numArray.length; k++) sumNum += +numArray[k];
  return sumNum < 30;
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
  this.inputFio.value = obj.fio;
  this.inputEmail.value = obj.email;
  this.inputPhone.value = obj.phone;
};

MyForm.prototype.sendRequest = function() {
  var request = new XMLHttpRequest();
  request.open("GET", this.form.action);
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

let form = new MyForm("myForm");
