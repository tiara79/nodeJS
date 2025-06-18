// 기본 출력 예제
let pi;
console.log(pi); // undefined
pi = 3.141592;
console.log(pi); // 3.141592

// 문자열 연산 및 이스케이프
let radius = 12;
console.log(`넓이: ${pi* radius * radius}`) // pi^2 // 452.38
console.log(`둘레: ${pi*2 *radius}`) //둘레: 75.398

//문제. area 변수 만들어 radius 15 인 경우 area 넓이를 계산
let area;
let radius2 = 15;
area = pi* radius2 *radius2
console.log(`넓이: ${area}`);


//문제 2. 사각형의 넓이를 계산 width, height ,area2 변수에 넓이 저장 후 출력
let width =3;
let height = 5;
area =width * height 
console.log (`사각형의 넓이: ${area}`);

// 증감 연산자
let num = 0;
num++; //num = num +1
console.log(num); //1
num--; //num = num - 1
console.log(num); //0

console.log(String(52)); //52
console.log(typeof String(52)); // String

console.log(Number(52)); //52
console.log(typeof Number(52)); // Number

console.log(parseInt("1234")); // 1234
console.log(parseInt("1234.56")); //1234
console.log(parseFloat("1234.56")); //1234.56

//NaN 함수, 함수 처리
console.log(Number("hello")) //NaN
console.log(isNaN(Number("hello"))); //true

console.log(typeof 10); //number
console.log(typeof "hello"); //string 

//JS의 type 종류
console.log(typeof true); //boolean
console.log(typeof function(){}); //function
console.log(typeof {});  //object
console.log(typeof []); //object


const test="변경불가";
test ="값이 변경 하나요?"
console.log(test);
// 결과 : TypeError: Assignment to constant variable.






