/*
Given an object containing chapter names as keys and page numbers as values,and a target page create a function that returns which chapter is nearest to the page you're on.

—------------------------------------
PROBLEM / objective:
  - Given an object where keys are 'chapters' and values are page numbers. AND a number, return the key (chapter) that is closest to the given number argument

Input:
  - Object
  - Number
Output:
  - String

Rules:
  - Return the chapter that is closest to the target page number

Edge Cases:
  - Will there ever be more than one chapter which is the same number pages away? No.
  - Will the object ever be empty? If so, what should we return? Yes.
    - If either the obj is empty or the target is not given, then return an empty object
  - Will the values ever be any data type other than a number?
    - It could be a string that cannot be coerced to a number (ignore it)
    - It could be a string that CAN be coerced to a number (coerce it to a number)
    - If it is not a number (NaN), ignore it
    - There cannot be negative numbers
    - If it's an empty string then ignore it
  - Can the page number be Infinity or -Infinity? No.
  - Can the target page be anything other than a number? No.

—------------------------------------
EXAMPLES / TEST CASES:

Happy path:
  - Given

Edge Cases:
  - If given object is empty or second arg is not given, return an empty object
  - String that cannot be coerced to a number (NaN)
  - String that CAN and should be coered to a number
  - If it's NaN or evaluate to NaN then ignore it
  - If it's an empty string, then ignore it

—------------------------------------
DATA STRUCTURES:
Iterate over the keys of the object and comparing the difference

—------------------------------------
ALGORITHM:
  - If the object is epmpty or the target given as an arg then return {}

  - Declare a varible set to an empty array to hold our `closestChapter`, and the absolute difference

  - Iterate over the keys of the given object -> forEach
    - If the value is a valid number AND `closestChapter` is empty.
      - Then assign index 0 of `closestChapter` to the object
    - Else if the value is a valid number AND `clostChapter` is not empty
      - Then compare the absolute diffence of the current value to the value the property inside the object, inside the array.
      - IF the differnce is less then replace it with the current object
  

  - return the key of the object inside of the array

function nearestChapter(obj, target) {
  if (Object.keys(obj).length < 1 || target === undefined) return {};
  
  let closestChapter = {}

  Object.keys(obj).forEach(key => {
    let currentPage = obj[key]
    let difference;
    if (!Number.isNaN(parseInt(currentPage)) && Object.keys(closestChapter).length < 1) {
      difference = Math.abs(parseInt(currentPage) - target)
      closestChapter[key] = difference
    } else if (!Number.isNaN(parseInt(currentPage))) {
      let currentClosest = Object.entries(closestChapter)[0][1]
      difference = Math.abs(parseInt(currentPage) - target)
      let chapterPage = Object.entries(closestChapter)[0][0]
      chapterPage = obj[chapterPage]
      if (difference <= currentClosest && chapterPage < currentPage) {
        closestChapter = {}
        closestChapter[key] = difference
      }
    }
  })

  return Object.entries(closestChapter)[0][0]

}
*/


// function nearestChapter(chapters, target) {
//   if (Object.keys(chapters).length < 1 || target === undefined) return {};
//   let entries = Object.entries(chapters);
// 
//   let nearestChapter;
//   let pageOfNearestChapter;
//   let smallestDifference;
//   
//   entries.forEach(subArr => {
//     let currentPage = subArr[1];
//     let currentChapter = subArr[0];
//     let currentDifference = Math.abs(currentPage - target);
// 
//     if (!Number.isNaN(parseInt(currentPage))) {
//       currentPage = parseInt(currentPage);
//     } else {
//       currentPage = null;
//     }
// 
//     if (smallestDifference === undefined) {
//       smallestDifference = currentDifference;
//       nearestChapter = currentChapter;
//       pageOfNearestChapter = currentPage;
//     } else if (currentDifference <= smallestDifference && currentPage > pageOfNearestChapter){
//       smallestDifference = currentDifference;
//       nearestChapter = currentChapter;
//       pageOfNearestChapter = currentPage;
//     }
//   })
// 
//   return nearestChapter;
// }

function nearestChapter(chapters, target) {
  if (Object.keys(chapters).length < 1 || target === undefined) return {}

  let targetChapter = Object.entries(chapters).reduce((nearestChapter, subArr) => {
    let currentChapter = subArr[0]
    let currentPage = subArr[1]

    if (!Number.isNaN(parseInt(currentPage))) {
      currentPage = parseInt(currentPage)
    } else {
      currentPage = null
    }
    
    let currentDifference = Math.abs(currentPage - target);

    if (Object.keys(nearestChapter).length < 1) {
      nearestChapter['Chapter'] = currentChapter
      nearestChapter['Page'] = currentPage
      nearestChapter['Difference'] = currentDifference
    } else if (currentDifference <= nearestChapter['Difference'] && nearestChapter['Page'] < currentPage) {
      nearestChapter['Chapter'] = currentChapter
      nearestChapter['Page'] = currentPage
      nearestChapter['Difference'] = currentDifference
    }

    return nearestChapter
  }, {})

  return targetChapter['Chapter'];
}

console.log(nearestChapter({
  "Chapter 1" : 1,
  "Chapter 2" : 15,
  "Chapter 3" : 37
}, 10)); // "Chapter 2"


 console.log(nearestChapter({
   "New Beginnings" : 1,
   "Strange Developments" : 62,
   "The End?" : 194,
   "The True Ending" : 460
 }, 200)); // "The End?"
 
 
 // - If given object is empty or second arg is not given, return an empty object
 console.log(nearestChapter({
 }, 200)); // {}
 
 console.log(nearestChapter({
   "New Beginnings" : 1,
   "Strange Developments" : 62,
   "The End?" : 194,
   "The True Ending" : 460
 })); // {}


// - String that cannot be coerced to a number (NaN)
console.log(nearestChapter({
  "New Beginnings" : 1,
  "Strange Developments" : 62,
  "The End?" : 'someString',
  "The True Ending" : 1000
}, 200)); // "Strange Developments"


// - String that CAN and should be coered to a number
console.log(nearestChapter({
  "New Beginnings" : 1,
  "Strange Developments" : 62,
  "The End?" : '201',
  "The True Ending" : 1000
}, 200)); // "The End?"


// - If it's NaN or evaluates to NaN, or is an empty string then ignore it
console.log(nearestChapter({
  "New Beginnings" : 1,
  "Strange Developments" : 62,
  "The End?" : '',
  "The True Ending" : null
}, 900)); // "Strange Developments"


// Return the chapter with the greater page number if equidistant
// 1 and 5 equidistant from 3.
console.log(nearestChapter({
  "Chapter 1a" : 1,
  "Chapter 1b" : 5
}, 3)); // "Chapter 1b"

