"use strict";

class CardInitializer {
  static #values = ["6", "7", "8", "9", "10", "V", "Q", "K", "A"];
  static #suits = ["♠", "♥", "♦", "♣"];
  static #powers = [6, 7, 8, 9, 10, 11, 12, 13, 14];

  static getCountCards = () => {
    return this.#values.length * this.#suits.length;
  };

  static checkIndex = (index) => {
    return index >= 0 && index < this.getCountCards() ? true : false;
  };

  static getOneCard = (index) => {
    if (!this.checkIndex(index)) console.error("Incorrect index Card");

    return {
      value: this.#values[index % this.#values.length],
      suit: this.#suits[index % this.#suits.length],
      power: this.#powers[index % this.#powers.length],
    };
  };
}

var CardState = {
  ONDECK: "ondeck",
  ONHAND: "onhand",
  ONFOLDED: "onfolded",
  ONGAME: "ongame",
};

CardState = Object.freeze(CardState);

class Card {
  #value = null;
  #suit = null;
  #power = null;
  #state = CardState.ONDECK;
  #isTrump = false;

  constructor(cardObj) {
    this.#value = cardObj.value;
    this.#suit = cardObj.suit;
    this.#power = cardObj.power;
  }

  getSuit = () => {
    return this.#suit;
  };

  getValue = () => {
    return this.#value;
  };

  getPower = () => {
    return this.#power;
  };

  getTrump = () => {
    return this.#isTrump;
  };

  getState = () => {
    return this.#state;
  };

  changeState = (newState) => {
    if (this.#state == CardState.ONHAND && newState == CardState.ONGAME) {
      this.#state = newState;
      return true;
    } else if (
      this.#state == CardState.ONDECK &&
      newState == CardState.ONHAND
    ) {
      this.#state = newState;
      return true;
    } else if (
      this.#state == CardState.ONGAME &&
      newState == CardState.ONFOLDED
    ) {
      this.#state = newState;
      return true;
    } else if (
      this.#state == CardState.ONGAME &&
      newState == CardState.ONHAND
    ) {
      this.#state = newState;
      return true;
    }

    return false;
  };

  changeTrump = (newTrump = true) => {
    if (this.#state == CardState.ONDECK && this.#isTrump == false && newTrump == true)
    {
      this.#isTrump = newTrump;
      this.#power += 100;
    }
    else if (this.#state != CardState.ONDECK && this.#isTrump == true && newTrump == false)
    {
      this.#isTrump = false;
      this.#power -= 100;
    }
    else if (this.#state == CardState.ONDECK && this.#isTrump == true && newTrump == false)
    {
      this.#isTrump = false;
      this.#power -= 100;
    }
  };

  ToString = () => {
    return `Value: ${this.#value}; suit: ${this.#suit}; Power: ${
      this.#power
    }; Trump: ${this.#isTrump}`;
  };
}

class CardDeck {
  #cards = [];

  constructor() {
    this.init();
  }

  init = () => {
    this.#cards = [];
    for (let i = 0; i < CardInitializer.getCountCards(); i++) {
      this.#cards.push(new Card(CardInitializer.getOneCard(i)));
    }
  };

  getCard = (index) => {
    if (!CardInitializer.checkIndex(index))
      console.error("Incorrect Card index");
    return this.#cards[index];
  };

  shuffleCards = (count) => {
    if (isNaN(count)) console.error("quadraticEquation => incorrect arguments");

    let shuffle = () => {
      let currentIndex = this.#cards.length;

      while (currentIndex !== 0)
      {
        let randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        let tempValue = this.#cards[currentIndex];
        this.#cards[currentIndex] = this.#cards[randomIndex];
        this.#cards[randomIndex] = tempValue;
      }
    };

    for (let i = 0; i < count; i++) shuffle();
  };

  highlightTrumpSuit = () =>
  {
    let randomIndex = Math.floor(Math.random() * this.#cards.length);

    let suit = this.#cards[randomIndex].getSuit();

    let isTrump = false;
    for (let i = 0; i < this.#cards.length; i++)
    {
      isTrump = this.#cards[i].getSuit() === suit;
      this.#cards[i].changeTrump(isTrump);
    }
  }
}

var cd = new CardDeck();
for (let i = 0; i < CardInitializer.getCountCards(); i++) {
  console.log(cd.getCard(i).ToString());
}


console.log("\n\n");

cd.shuffleCards(3);

for (let i = 0; i < CardInitializer.getCountCards(); i++) {
  console.log(cd.getCard(i).ToString());
}


cd.highlightTrumpSuit();

console.log("\n\n");

for (let i = 0; i < CardInitializer.getCountCards(); i++) {
  console.log(cd.getCard(i).ToString());
}


cd.highlightTrumpSuit();

console.log("\n\n");

for (let i = 0; i < CardInitializer.getCountCards(); i++) {
  console.log(cd.getCard(i).ToString());
}