// Маска ввода телефона
var phoneNumber = new PhoneMask(document.getElementById("phoneMask"), {
  pattern: "+7(___)___-__-__",
  patternChar: "_",
  allowedRegExp: /^\d$/
});

function MyForm(id) {
  this.form = document.getElementById(id);
  this.button = this.form.querySelectorAll("#submitButton");
  this.button[0].onclick = () => {
    this.submit();
  };
}

// При отправке формы должна срабатывать валидация полей по следующим правилам:
// * ФИО: Ровно три слова.
// * Email: Формат email-адреса, но только в доменах ya.ru, yandex.ru, yandex.ua, yandex.by, yandex.kz, yandex.com.
// * Телефон: Номер телефона, который начинается на +7, и имеет формат +7(999)999-99-99. Кроме того, сумма всех цифр телефона не должна превышать 30. Например, для +7(111)222-33-11 сумма равняется 24, а для +7(222)444-55-66 сумма равняется 47.

// В глобальной области видимости должен быть определен объект MyForm с методами
// validate() => { isValid: Boolean, errorFields: String[] }
// getData() => Object
// setData(Object) => undefined
// submit() => undefined

function throwError(el) {
  if (el.classList) el.classList.add("error");
  else el.className = "error";
  return 0;
}

MyForm.prototype.validate = function() {
  // Обрабатываем инпуты
  let inputs = Array.from(this.form.querySelectorAll("input"));
  for (let i = 0; i < inputs.length; i++) {
    switch (inputs[i].getAttribute("name")) {
      case "fio": // Валидируем имя
        let arrNames = inputs[i].value.split(" ").filter(el => {
          return el.replace(/[^A-Za-zА-Яа-яё]/gim, "");
        });
        if (arrNames.length == 3) {
          inputs[i].classList.remove("error");
        } else {
          throwError(inputs[i]);
        }
        break;
      case "email": // Валидируем почту
        let emails = [
            "ya.ru",
            "yandex.ru",
            "yandex.ua",
            "yandex.by",
            "yandex.kz",
            "yandex.com"
          ],
          regularEmailChecker = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (regularEmailChecker.test(inputs[i].value.replace(" ", ""))) {
          let mailProvider = inputs[i].value.split("@");
          let flag = 0;
          for (let j = 0; j < emails.length; j++) {
            if (emails[j] == mailProvider[1]) {
              inputs[i].classList.remove("error");
              break;
            } else {
              flag++;
            }
          }
          if (flag == emails.length) throwError(inputs[i]);
        } else {
          throwError(inputs[i]);
        }
        break;
      case "phone":
        // Валидируем телефон
        let numArray = inputs[i].value.replace(/[^0-9]/gim, "").split(""),
          sumNum = 0;
        for (var k = 0; k < numArray.length; k++) {
          sumNum += numArray[k];
        }
        if (numArray.length == 11) {
          for (var k = 0; k < numArray.length; k++) {
            sumNum += numArray[k];
          }
          if (sumNum < 30) {
            throwError(inputs[i]);
          }
        } else {
          throwError(inputs[i]);
        }
        break;
      default:
        break;
    }
  }
};

MyForm.prototype.submit = function() {
  this.validate();
};

let a = new MyForm("myForm");
