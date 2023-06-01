let questions = [];

questions.push([
  "In the UK, the abbreviation NHS stands for National what Service?",
  ["Humanity", "Health", "Honour", "Household"],
  1,
  100,
]);
questions.push([
  "Which Disney character famously leaves a glass slipper behind at a royal ball?",
  ["Pocahontas", "Sleeping Beauty", "Cinderella", "Elsa"],
  2,
  200,
]);
questions.push([
  "What name is given to the revolving belt machinery in an airport that delivers checked luggage from the plane to baggage reclaim?",
  ["Hangar", "Terminal", "Concourse", "Carousel"],
  3,
  300,
]);
questions.push([
  "Which of these brands was chiefly associated with the manufacture of household locks?",
  ["Phillips", "Flymo", "Chubb", "Ronseal"],
  2,
  500,
]);
questions.push([
  "The hammer and sickle is one of the most recognisable symbols of which political ideology?",
  ["Republicanism", "Communism", "Conservatism", "Liberalism"],
  1,
  1000,
]);
questions.push([
  "Which toys have been marketed with the phrase “robots in disguise”?",
  ["Bratz Dolls", "Sylvanian Families", "Hatchimals", "Transformers"],
  3,
  2000,
]);
questions.push([
  "What does the word loquacious mean?",
  ["Angry", "Chatty", "Beautiful", "Shy"],
  1,
  2000,
]);
questions.push([
  "Obstetrics is a branch of medicine particularly concerned with what?",
  ["Childbirth", "Broken bones", "Heart conditions", "Old age"],
  0,
  8000,
]);
questions.push([
  "In Doctor Who, what was the signature look of the fourth Doctor, as portrayed by Tom Baker?",
  [
    "Bow-tie, braces and tweed jacket",
    "Wide-brimmed hat and extra long scarf",
    "Pinstripe suit and trainers",
    "Cape, velvet jacket and frilly shirt",
  ],
  1,
  16000,
]);
questions.push([
  "Which of these religious observances lasts for the shortest period of time during the calendar year?",
  ["Ramadan", "Diwali", "Lent", "Hanukkah"],
  1,
  32000,
]);
questions.push([
  "At the closest point, which island group is only 50 miles south-east of the coast of Florida?",
  ["Bahamas", "US Virgin Islands", "Turks and Caicos Islands", "Bermuda"],
  0,
  64000,
]);
questions.push([
  "Construction of which of these famous landmarks was completed first?",
  [
    "Empire State Building",
    "Royal Albert Hall",
    "Eiffel Tower",
    "Big Ben Clock Tower",
  ],
  3,
  64000,
]);
questions.push([
  "Which of these cetaceans is classified as a “toothed whale”?",
  ["Gray whale", "Minke whale", "Sperm whale", "Humpback whale"],
  2,
  250000,
]);
questions.push([
  "Who is the only British politician to have held all four “Great Offices of State” at some point during their career?",
  ["David Lloyd George", "Harold Wilson", "James Callaghan", "John Major"],
  2,
  500000,
]);
questions.push([
  "In 1718, which pirate died in battle off the coast of what is now North Carolina?",
  ["Calico Jack", "Blackbeard", "Bartholomew Roberts", "Captain Kidd"],
  1,
  1000000,
]);


window.alert("Welcome to the game who wants to be billionaire! Lets begin!");

//незгораюча сума
let nonBurnable = 0;

let nonBurnableQuestions = [5, 10, 15];

let currentScore = 0;
window.alert(
  `To make a choice, type number of answer option.`
);

for (let i = 0; i < questions.length; i++) 
{
  let stake = questions[i][3];
  let answerOptions = questions[i][1];
  let rightAnswer = questions[i][2];

  let question = `${questions[i][0]}\n(Cost for this question - ${stake})\n
    1.) ${answerOptions[0]};\n
    2.) ${answerOptions[1]};\n
    3.) ${answerOptions[2]};\n
    4.) ${answerOptions[3]};`;

  let answer = parseInt(window.prompt(question));

  if (isNaN(answer) || (answer < 1 || answer > 4)) 
  {
    let flag = window.confirm(
      'There\'s no such answer option. To try again choose "Ok", to end the game choose "Cancel".'
    );

    if (flag) 
    {
      i--;
      continue;
    } 
    else 
    {
      break;
    }
  }

  if (answer - 1 === rightAnswer)
  {

    currentScore = stake;
    
    for (let j = 0; j < nonBurnableQuestions.length; j++)
    {
      if ((nonBurnableQuestions[j] - 1) === i) 
      {
        nonBurnable = stake;
      }
    }

    if (questions.length - 1 === i)
    {
      window.alert(`Congratulations! You are the absolute winner. You've won the max prize - $${nonBurnable}`);
    }
    else
    {
      let flag = window.confirm(
        `Congratulations! This was the right answer, your winnings for this question ${stake}.\n` +
        `Your score now - ${currentScore}. Do you want to continue the game or take the money and leave?\n` +
        `Your non-burnable amount of money is equal ${nonBurnable}.\n` +
        `(\"Ok\" - Continue; \"Cancel\" - Leave)`
      );
  
      if (!flag) 
      {
        window.alert(`Thanks for the game. You've won $${nonBurnable}. Goodbye!`);
        break;
      }
    }
  } 
  else
  {
    window.alert(
      `Unfortunately! This was the wrong answer, we must say goodbye to you.\n` +
      `Your non-burnable amount of money is equal $${nonBurnable}`
    );
    isEndGame = true;
    break;
  }
}
