// 구조 분해 할당(Destructuring Assignment) 예제
console.log("=== 구조 분해 할당 기본 예제 ===\n");

// 기본적인 배열 구조 분해
const fruits = ["사과","수박", "바나나", "오렌지"];
const [first,second] = fruits;
console.log(first,second);

// 3. 객체 구조 분해 - 기본
const student = {
  name: "이지훈",
  age: 50,
  grade: "B",
};
const {name,age,grade} = student;
console.log(name,age,grade);
const {name: name1,age :age1,grade: grade1} = student; // 중복시 변수명 재정의
console.log(name1,age1,grade1);

// 없는 속성에 기본값 설정
const person ={ name:"홍길동"};
const {name:personName, age: personAge= 25} = person;
console.log(personName,personAge);

const printStudentInfo =({name,age,grade="B"})=>{
  console.log("학생정보");
  console.log(`- 이름:${name}`);
  console.log(`- 나이:${age}`);
  console.log(`- 성적:${grade}`);
}
// 객체가 인자로 들어옴
printStudentInfo(student);

const book ={
  title: "자바스크립트 최고",
  author :"홍길동",
  publisher : "한빛출판사"
}

//문제1. book 객체를 출력 하는 함수, printBook 매개변수 객체구조 분해 할당 이용
const printBook = ({title,author,publisher})=>{
  console.log("책정보");
  console.log(`제목:${title}`);
  console.log(`저자:${author}`);
  console.log(`출판사:${publisher}`);
}
printBook(book);

const user = {
  id: 1,
  info: {
    name: "홍길동",
    address: {
      city: "서울",
      street: "강남대로",
    },
  },
};
// const {
//   id,
//   info: {
//     name: userName,
//     address: {city:street },
//   },
// }= user

// console.log(`ID: ${id}`);
// console.log(`이름: ${useName}`);
// console.log(`도시: ${cityName}`);
// console.log(`거리: ${street}`);

//문제 : city 변수 이름은 cityName 으로 변경
const {
  id,
  info: {
    name: userName,
    address: {city:cityName, street },
  },
}= user

// 문제: 첫번째 요소는 firstcolor, 두번째 secondcolor 에 할당 
const colors = ["빨강","파랑","노랑","초록","보라"];
const [firstcolor,secondcolor, ...others] = colors;
console.log(firstcolor,secondcolor, others)

// 문제 2: 함수 formatUserInfo 를 생성하세요.
const user1  ={name: "소지섭",age: 45, email:"so@email.com"};
const user2 ={name: "전종서", age: 30 };

const formatUserInfo=({name, age, email ="이메일 없음"})=>{
   return `이름은:${name}, 나이는 ${age}, 이메일은 ${email} 입니다. `
};

console.log(formatUserInfo(user1));
console.log(formatUserInfo(user2));
