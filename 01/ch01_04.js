// 배열의 요소 출력
let arr = [5,23, "hello", true, "wold",-9]
console.log(arr); // [ 5, 23, 'hello', true, 'wold', -9 ]
console.log(arr[1]);  //23

//for (초기값; 조건문; 증감문)
for(let i=0; i< arr.length; i++) {
  console.log(`${i} is ${arr[i]}`)
}
// --------------------------------- for in
for(i in arr) {
  console.log(`${i} is ${arr[i]}`)
}
// --------------------------------- for of
for(e of arr) {
  console.log(e)
}
// --------------------------------- for와 for in와 for of 결과값 동일
// 0 is 5
// 1 is 23
// 2 is hello
// 3 is true
// 4 is wold
// 5 is -9