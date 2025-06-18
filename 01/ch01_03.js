// 기본 조건문
let date = new Date();
if (date.getHours()<12){
  console.log("오전")
}else {
  console.log("오후")
}
// 삼항 연산자
const hour = date.getHours();
const timeOfDay = hour < 12 ? "오전" : "오후"
console.log(`현재는 ${timeOfDay} 입니다.`)

// 문제 :
const temperature = 24;
if (temperature >= 30) {
  console.log("더운 날씨 입니다.");
} else if (temperature >= 20) {
  console.log("따듯한 날씨 입니다.");
} else if (temperature >= 10) {
  console.log("선선한 날씨 입니다.");
} else  {
  console.log("추운 날씨 입니다.");
} 

const day = date.getDate()
console.log(day) //16

// 문제2 swith 문으로 요일 출력

const day2 = date.getDay(); 
switch (day2) {
  case(1) : console.log("월요일 입니다."); break;
  case(2) : console.log("화요일 입니다."); break;
  case(3) : console.log("수요일 입니다."); break;
  case(4) : console.log("목요일 입니다."); break;
  case(5) : console.log("금요일 입니다."); break;
  case(6) : console.log("토요일 입니다."); break;
  case(7) : console.log("일요일 입니다."); break;
  default : console.log("알수 없는 요일입니다.");
}

// const name =""
// const displayName = name || "익명님"
// console.log(`환영합니다. ${displayName}`); //환영합니다. 익명님

const name ="지훈님"
const displayName = name || "익명님"
console.log(`환영합니다. ${displayName}`); //환영합니다. 지훈님

//nullish 병합연산자
const userInput = null; // null 또는 undefined
const defaultValue = "기본값" 
const result = userInput ?? defaultValue;
console.log(`결과:${result}` ) // 결과:기본값

// 조건부 실행 
const isLoggedIn = true;
isLoggedIn && console.log("로그인 되었습니다."); //로그인 되었습니다

const isLoggedIn2 = false;
isLoggedIn2 && console.log("로그인 되었습니다."); //아무 것도 출력되지 않음