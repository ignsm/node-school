function MyForm(id) {
  this.form = document.getElementById(id);
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

MyForm.prototype.validate = function() {
  // Обрабатываем инпуты
  let inputs = Array.from(this.form.querySelectorAll("input"));
  for (let i = 0; i < inputs.length; i++) {
    switch (inputs[i].getAttribute("name")) {
      case "fio":
        // Валидируем имя
        let arrNames = inputs[i].value.split(" ").filter(el => {
          return el.replace(/[^A-Za-zА-Яа-яё]/gim, "");
        });
        if (arrNames.length == 3) {
          // Отправляем успех
        } else {
          // Отдаём ошибку
        }
        break;
      case "email":
        // Валидируем почту

        break;
      case "phone":
        // Валидируем телефон

        break;
      default:
        break;
    }
  }
};

let a = new MyForm("myForm");
a.validate();
