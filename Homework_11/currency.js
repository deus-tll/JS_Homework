window.addEventListener("load", () => {
  const mainCurrencyCC = "UAH";

  //Метод для більш простого і компактного створення Html елементів
  ///////////////////////////////////////////////////////////
  let createDOMElement = (tagName = "", options, parent = null) => {
    if (tagName.length == 0) console.error("Incorrect tag name");
    let node = document.createElement(tagName);

    for (const key in options) {
      node.setAttribute(key, options[key]);
    }

    parent.appendChild(node);
    return node;
  };
  ///////////////////////////////////////////////////////////


  //Створення основних контейнерів для даних
  ///////////////////////////////////////////////////////////
  let currencyContainer = document.querySelector(".currency");

  let header = createDOMElement(
    "div",
    {
      class: "currency-header",
      title: "Elements panel",
    },
    currencyContainer
  );

  let body = createDOMElement(
    "div",
    {
      class: "currency-body",
      title: "List of available currencies",
    },
    currencyContainer
  );
  ///////////////////////////////////////////////////////////


  //Метод який повертає структуру з окремо розділеними роком, місяцем, та днем, для простого управління сьогоднішньою датою
  ///////////////////////////////////////////////////////////
  let getToday = () => {
    let today = new Date();

    return {
      year: today.getFullYear(),
      month: (today.getMonth() + 1).toString().padStart(2, "0"),
      day: today.getDate().toString().padStart(2, "0"),
    };
  };
  ///////////////////////////////////////////////////////////

  
  //Структура для більш зручного користування, а саме при запитах, отримуванні та зберіганні данних з серверу. Її початкова ініціалізація.
  ///////////////////////////////////////////////////////////
  let today = getToday();

  let environment = {
    currenciesList: [],
    selectedDate: today.year + today.month + today.day,
  };

  environment.bankUriApi = `https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?date=${environment.selectedDate}&json`;
  ///////////////////////////////////////////////////////////


  //Рендер таблиці яка буде містити всі валюти і її властивості
  ///////////////////////////////////////////////////////////
  let renderTable = (currenciesList) => {
    let table = document.querySelector(".currency-table-list");
    if (table !== null) table.parentNode.removeChild(table);

    table = createDOMElement(
      "table",
      {
        class: "currency-table-list",
      },
      body
    );

    let headRow = createDOMElement("tr", {}, table);
    let headTitles = ["Currency Code", "Name", "Cost", "ISO 4217"];
    headTitles.forEach((value, index) => {
      createDOMElement("th", {}, headRow).innerHTML = value;
    });

    currenciesList.forEach((oneCurr, index) => {
      let oneRow = createDOMElement("tr", {}, table);
      createDOMElement("td", {}, oneRow).innerHTML = oneCurr.r030;
      createDOMElement("td", {}, oneRow).innerHTML = oneCurr.txt;
      createDOMElement("td", {}, oneRow).innerHTML = oneCurr.rate;
      createDOMElement("td", {}, oneRow).innerHTML = oneCurr.cc;
    });
  };
  ///////////////////////////////////////////////////////////


  //Створення верхньої панелі всередині хедера яка буде містити заголовок та селектор дати
  ///////////////////////////////////////////////////////////
  let topPanel = createDOMElement("div", { class: "top-panel" }, document.querySelector(".currency-header"));
  let bodyHeaderText = createDOMElement("div", { class: "body-header-text" }, topPanel);
  let headerText = createDOMElement("h2", {}, bodyHeaderText);
  headerText.innerHTML = "КОНВЕРТЕР ВАЛЮТ";
  let bodyInputDate = createDOMElement("div", { class: "body-input-date" }, topPanel);
  let inputDate = createDOMElement("input", {}, bodyInputDate);
  inputDate.type = "date";

    
  if (inputDate.value === "") {
    let today = getToday();
    var defaultValue = today.year + "-" + today.month + "-" + today.day;
    inputDate.value = defaultValue;
  }

  inputDate.addEventListener("change", () => {
    let selectedDate = inputDate.value;
    let parts = selectedDate.split("-");
    environment.selectedDate = parts[0] + parts[1] + parts[2];

    environment.bankUriApi = `https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?date=${environment.selectedDate}&json`;

    fetchData();
  });
  ///////////////////////////////////////////////////////////


  //Рендер контролів для конвертації
  ///////////////////////////////////////////////////////////
  let renderControls = (env) => {
    let currencies = env.currenciesList;

    //Створення контейнеру, створення інпутів для чисел, а також створення та заповнення 
    //значеннями селекторів для вибору валюти
    //////////////////////////////////////////
    let converter = document.querySelector(".converter");
    if (converter !== null) converter.parentNode.removeChild(converter);

    converter = createDOMElement("div", { class: "converter" }, header);

    let mainPanel = createDOMElement("div", { class: "main-panel" }, converter);

    let blockFrom = createDOMElement("div", { class: "block-from" }, mainPanel);
    let blockArrows = createDOMElement("div",{ class: "block-arrows" }, mainPanel);
    let blockTo = createDOMElement("div", { class: "block-to" }, mainPanel);

    let controlsFrom = createDOMElement("div", { class: "controls-from" }, blockFrom);

    let textFrom = createDOMElement("p", { class: "input-text" }, controlsFrom);
    textFrom.innerHTML = "Міняю";

    let bodyInputFrom = createDOMElement("div", {}, controlsFrom);
    let inputFrom = createDOMElement("input", {}, bodyInputFrom);
    inputFrom.type = "number";
    inputFrom.placeholder = "0.000";

    let selectCurrencyFrom = createDOMElement("select", {}, bodyInputFrom);

    let arrows = createDOMElement("p", { class: "arrows" }, blockArrows);
    arrows.innerHTML = "&#8644;";

    let controlsTo = createDOMElement("div", { class: "controls-to" }, blockTo);

    let textTo = createDOMElement("p", { class: "input-text" }, controlsTo);
    textTo.innerHTML = "Отримую";

    let bodyInputTo = createDOMElement("div", {}, controlsTo);
    let inputTo = createDOMElement("input", {}, bodyInputTo);
    inputTo.type = "number";
    inputTo.placeholder = "0.000";

    let selectCurrencyTo = createDOMElement("select", {}, bodyInputTo);

    currencies.forEach((currency, index) => {
      createDOMElement("option", {}, selectCurrencyFrom).innerHTML = currency.cc;
      createDOMElement("option", {}, selectCurrencyTo).innerHTML = currency.cc;
    });
    //////////////////////////////////////////


    //Розрахунки при конвертації
    //////////////////////////////////////////
    let func = (inputFrom, inputTo, selectCurrencyFrom, selectCurrencyTo) => {
      if(currencies[selectCurrencyFrom.selectedIndex].cc == mainCurrencyCC){
        inputTo.value = (parseFloat(inputFrom.value) / currencies[selectCurrencyTo.selectedIndex].rate).toFixed(3);
      }
      else if (parseFloat(inputFrom.value) !== 0) {
        inputTo.value = (
          (parseFloat(inputFrom.value) * currencies[selectCurrencyFrom.selectedIndex].rate) /
          currencies[selectCurrencyTo.selectedIndex].rate
        ).toFixed(3);
      } else {
        inputTo.value = "0.000";
      }
    };

    inputFrom.addEventListener("input", () => {
      func(inputFrom, inputTo, selectCurrencyFrom, selectCurrencyTo);
    });

    inputTo.addEventListener("input", () => {
      func(inputTo, inputFrom, selectCurrencyTo, selectCurrencyFrom);
    });

    selectCurrencyFrom.addEventListener("change", () => {
      func(inputFrom, inputTo, selectCurrencyFrom, selectCurrencyTo);
    });

    selectCurrencyTo.addEventListener("change", () => {
      func(inputTo, inputFrom, selectCurrencyTo, selectCurrencyFrom);
    });
    //////////////////////////////////////////
  };
  ////////////////////////////////////////////////////////////


  //Отримання даних з серверу
  ////////////////////////////////////////////////////////////
  let fetchData = () => {    
    fetch(environment.bankUriApi, {
      method: "GET",
    })
      .then((response) => {
        return response.json();
      })
      .then((currencies) => {
        environment.currenciesList = currencies;

        //Додавання головної валюти, тобто тієї на яку переводяться всі інші в джерелі, до загального списку валют
        //////////////////////////////////////////
        let mainCurrency = {
          r030: 980,
          txt: "Українська гривня",
          cc: mainCurrencyCC,
          rate: 1
        }

        environment.currenciesList.unshift(mainCurrency);
        //////////////////////////////////////////

        renderTable(environment.currenciesList);
        renderControls(environment);
      });
  };
  ////////////////////////////////////////////////////////////


  //Початкова ініціалізація даних
  fetchData();
});
