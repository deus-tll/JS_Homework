class Timer {
  #timerInterval = null;
  #endDate = null;
  timerElement = null;

  constructor(endDate) {
    this.#endDate = endDate;
  }

  start() {
    this.timerElement = document.createElement("div");
    this.timerElement.classList.add("timer-container");
    this.#updateTimer();
    this.#timerInterval = setInterval(() => this.#updateTimer(), 1000);
  }

  stop() {
    clearInterval(this.#timerInterval);
  }

  #createTimerItem(value, label) {
    const itemContainer = document.createElement("div");
    itemContainer.classList.add("timer-item");

    const valueElement = document.createElement("span");
    valueElement.classList.add("timer-value");
    valueElement.textContent = value;

    const labelElement = document.createElement("span");
    labelElement.classList.add("timer-label");
    labelElement.textContent = label;

    itemContainer.appendChild(valueElement);
    itemContainer.appendChild(labelElement);

    return itemContainer;
  }

  #createColonElement() {
    const colonElement = document.createElement("span");
    colonElement.classList.add("timer-colon");
    colonElement.textContent = ":";
    return colonElement;
  }

  #dividerDays = 1000 * 60 * 60 * 24;
  #dividerHours = 1000 * 60 * 60;
  #dividerMinutes = 1000 * 60;

  #updateTimer() {
    const now = new Date();
    const timeRemaining = Math.max(this.#endDate - now, 0);
    const days = Math.floor(timeRemaining / this.#dividerDays);
    const hours = Math.floor((timeRemaining % this.#dividerDays) / this.#dividerHours);
    const minutes = Math.floor((timeRemaining % this.#dividerHours) / this.#dividerMinutes);
    const seconds = Math.floor((timeRemaining % this.#dividerMinutes) / 1000);

    this.timerElement.innerHTML = '';

    const timerInnerContainer = document.createElement("div");
    timerInnerContainer.classList.add("timer-inner-container");

    timerInnerContainer.appendChild(this.#createTimerItem(days, "днів"));
    timerInnerContainer.appendChild(this.#createColonElement());
    timerInnerContainer.appendChild(this.#createTimerItem(hours.toString().padStart(2, '0'), "годин"));
    timerInnerContainer.appendChild(this.#createColonElement());
    timerInnerContainer.appendChild(this.#createTimerItem(minutes.toString().padStart(2, '0'), "хвилин"));
    timerInnerContainer.appendChild(this.#createColonElement());
    timerInnerContainer.appendChild(this.#createTimerItem(seconds.toString().padStart(2, '0'), "секунд"));

    this.timerElement.appendChild(timerInnerContainer);
  }
}