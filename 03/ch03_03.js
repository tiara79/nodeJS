
const moment = require("moment")

const nowDate = moment();
// console.log(nowDate); //Moment<2025-06-18T12:14:18+09:00>

console.log(nowDate.format("YYYY-MM-DD HH:mm:ss")); 
console.log(nowDate.format(`YYYY 년 MM 월 DD 일`)); 
console.log(nowDate.format(`YYYY년 MM월 DD일 HH시mm분ss초`)); 
// 결과
// 2025-06-18 12:16:45
// 2025 년 06 월 18 일
// 2025년 06월 18일 12시16분45초

//문제1 : 현재 날짜와 시각을  2025/06/18로 출력
console.log(nowDate.format(`YYYY/MM/DD`)); 

// 특정 날짜 포맷팅 : 과거 날짜의 문자열을 모멘트 객체 형태로 변경 예제
const dateMoment = moment("2024-03-30")
console.log(dateMoment); // Moment<2024-03-30T00:00:00+09:00>

// 시간을 추기 및 빼기 (현재시간 6월 18일 에서 7일 후 계산)
const nextDays = nowDate.add(7,"days")
console.log(nextDays) //Moment<2025-06-25T12:21:17+09:00>

const nextWeek = nowDate.add(7,"weeks")
console.log(nextWeek) //Moment<2025-08-13T12:24:28+09:00>

const startDate = moment();
const endDate = moment("2025-08-20")
const diffDay = endDate.diff(startDate,"days")
console.log("과정 종료까지 남은 일수: ", diffDay) // 62

// const moment = require("moment")
//문제2 : 오늘 부터 100일 후의 날짜를 년 월 일로 표시
const todayDay = moment();
const t100 = todayDay.add(100,"days")
console.log(`${moment().format("YYYY 년 MM 월 DD 일")} 에서 100일 후의 날짜는 ${t100.format("YYYY 년 MM 월 DD 일")}`);

//문제3 : 2024-03-15 부터 2025-09-20일까지 몇 개월이 지났는지 계산
const dueDate1 = moment("2024-03-15");
const dueDate2 = moment("2025-08-20");
const diffMonth = dueDate2.diff(dueDate1,"months")
console.log(diffMonth+'개월');

//문제4 : 크리스마스까지 남은 일수 계산
const s2 = moment();
const christmas = moment("2025-12-25")
const diffChristmas = christmas.diff(s2,"days")
console.log("크리스마스까지 남은 일수: ", diffChristmas) 

//결과 
// 2025 년 06 월 18 일 에서 100일 후의 날짜는 2025 년 09 월 26 일
// 18
// 과정 종료까지 남은 일수:  189

// const moment = require("moment")
const s3 = moment();
// console.log(`요일: ${s3.format("d")}`)
// console.log(`요일: ${s3.format("dd")}`)
// console.log(`요일: ${s3.format("ddd")}`)
// console.log(`요일: ${s3.format("dddd")}`)


require("moment/locale/ko");
moment.locale("ko")
console.log(`요일: ${s3.format("dddd")}`) 
// 결과 : 요일: Wednesday //d : 3

//문제5: 올해 크리스 마스는 무슨 요일 일까요?
const s4 = moment("2025-12-25")
console.log(`올해 크리스 마스는 ${s4.format("dddd")} 입니다.`) //목요일

//문제6: 자신이 태어날 날의 요일을 출력
const s5 = moment("1980-02-01");
console.log(`내가 태어난 날의 요일은 ${s5.format("dddd")} 입니다.`)  //금요일