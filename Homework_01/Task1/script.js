function GetRandomNumber(lowerBound, upperBound)
{
  return lowerBound + Math.floor(Math.random() * (upperBound - lowerBound));
}


function fullCopyArray(arr)
{
  let copy = [];

  for (let i = 0; i < arr.length; i++)
  {
    if (Array.isArray(arr[i])) 
      copy[i] = fullCopyArray(arr[i]);
    else 
      copy[i] = arr[i];
  }

  return copy;
}


function quickSort(arr)
{
  if(arr.length <= 1) 
  {
    return arr;
  }

  const pivot = arr[Math.floor(arr.length / 2)];
  const smaller = [];
  const equal = [];
  const greater = [];

  for (const element of arr) 
  {
    if (element < pivot) 
      smaller.push(element);
    else if(element === pivot)
      equal.push(element);
    else
      greater.push(element);
  }

  return [...quickSort(smaller), ...equal, ...quickSort(greater)];
}

function sortJaggedArray(arr) 
{
  for (let i = 0; i < arr.length; i++) 
  {
    if (Array.isArray(arr[i])) 
      arr[i] = quickSort(arr[i]);
  }

  return arr;
}


let lowerBoundArr = 1, 
    upperBoundArr = 10,
    upperBoundNum = 100;

let array = [];


for (let i = 0; i < GetRandomNumber(lowerBoundArr, upperBoundArr); i++) 
{
  array[i] = [];
}


for (let i = 0; i < array.length; i++) 
{
  for (let j = 0; j < GetRandomNumber(lowerBoundArr, upperBoundArr); j++) 
  {
    array[i][j] = GetRandomNumber(lowerBoundArr, upperBoundNum);
  }
}


console.log("Jagged Array", array);



let sortedArray = sortJaggedArray(fullCopyArray(array));

// for (let i = 0; i < sortedArray.length; i++) {
//   sortedArray[i].sort(function(a, b) {
//     return a - b;
//   });
// }



console.log("Sorted Jagged Array", sortedArray);