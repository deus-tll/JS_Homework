//1
function quadraticEquation(a, b, c)
{
  if (isNaN(a) || isNaN(b) || isNaN(c))
  {
    console.error("quadraticEquation => incorrect arguments");
  }

  let discriminant = b * b - 4 * a * c;

  if(discriminant > 0)
  {
    let root1 = (-b + Math.sqrt(discriminant)) / (2 * a);
    let root2 = (-b - Math.sqrt(discriminant)) / (2 * a);

    return [root1, root2];
  }
  else if(discriminant === 0)
  {
    let root = -b / (2 * a);

    return [root];
  }
  else
  {
    return [];
  }
}

let result = quadraticEquation(1, -3, 2);
console.log(result);


//2
function calculateDistanceTwoD(x1, y1, x2, y2)
{
  let deltaX = x2 - x1;
  let deltaY = y2 - y1;

  let distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

  return distance;
}

let distanceTwoD = calculateDistanceTwoD(1, 2, 7, 9);
console.log(distanceTwoD);


//3
function calculateDistanceThreeD(x1, y1, z1, x2, y2, z2)
{
  if (isNaN(x1) || isNaN(y1) || isNaN(z1) || isNaN(x2) || isNaN(y2) || isNaN(z2)) 
  {
    console.error("calculateDistanceThreeD => incorrect arguments");
  }

  let dx = x2 - x1;
  let dy = y2 - y1;
  let dz = z2 - z1;

  let distance = Math.sqrt(dx * dx + dy * dy + dz * dz);

  return distance;
}

let distanceThreeD = calculateDistanceThreeD(1, 2, 3, 4, 5, 6);
console.log(distanceThreeD);


//4 recursion
function countDigitsRecursion(number) 
{
  if (number < 10) 
  {
    return 1;
  } 
  else 
  {
    return 1 + countDigitsRecursion(Math.floor(number / 10));
  }
}

let numberRecursion = 3677732;
let digitCountRecursion = countDigitsRecursion(numberRecursion);
console.log(`Кількість цифр у числі ${numberRecursion}: ${digitCountRecursion}`);


//4 iterativly
function countDigitsIterativly(number) 
{
  let count = 0;
  
  while (number > 0) 
  {
    count++;
    number = Math.floor(number / 10);
  }
  
  return count;
}

let numberIterativly = 3677732;
let digitCountIterativly = countDigitsIterativly(numberIterativly);
console.log(`Кількість цифр у числі ${numberIterativly}: ${digitCountIterativly}`);


//5 recursion
function sumDigitsRecursion(number)
{
  if (number < 10)
  {
    return number;  
  }
  else
  {
    lastDigit = number % 10;
    return lastDigit + sumDigitsRecursion(Math.floor(number / 10));
  }
}

let numberSumDigitsRecursion = 12345;
let digitSumRecursion = sumDigitsRecursion(numberSumDigitsRecursion);
console.log(`Сума цифр у числі ${numberSumDigitsRecursion}: ${digitSumRecursion}`);


//5 iterativly
function sumDigitsIterativly(number) {
  let sum = 0;
  
  while (number > 0)
  {
    let digit = number % 10;
    sum += digit;
    number = Math.floor(number / 10);
  }
  
  return sum;
}

let numberSumDigitsIterativly = 12345;
let digitSumIterativly = sumDigitsIterativly(numberSumDigitsIterativly);
console.log(`Сума цифр у числі ${numberSumDigitsIterativly}: ${digitSumIterativly}`);


//6
function findMax(arr)
{
  function find(arr, n)
  {
    if (n === 1) 
    {
      return arr[0];
    }
    else 
    {
      let maxWithinRemaining = find(arr, n - 1);

      if (maxWithinRemaining > arr[n - 1])
        return maxWithinRemaining;
      else
        return arr[n - 1];
    }
  }

  return find(arr, arr.length);
}

let array = [14, 73, 3, 10, 99, 12];
let maxElement = findMax(array);
console.log(`Максимальний елемент у масиві: ${maxElement}`);


//7
function decimalToBinary(decimal) {
  if (decimal <= 0)
  {
    return '0';
  }
  else
  {
    const remaining = decimal % 2;
    const ratio = Math.floor(decimal / 2);
    return decimalToBinary(ratio) + remaining;
  }
}

const decimalNumber = 100;
const binaryNumber = decimalToBinary(decimalNumber);
console.log(`Двійкове представлення десяткового числа ${decimalNumber}: ${binaryNumber}`);