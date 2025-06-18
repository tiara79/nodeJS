const users = [
  { id:1, name: "김민수", age: 25 , score :88},
  { id:2, name: "이수진", age: 22, score : 92},
  { id:3, name: "박지훈", age: 28, score : 76},
  { id:4, name: "최유리", age: 24, score : 85},
  { id:5, name: "정현우", age: 27, score : 90},
  { id:6, name: "한지민", age: 28, score : 81},
  { id:7, name: "오세훈", age: 26, score : 79},
  { id:8, name: "윤아름", age: 21, score : 95},
];
const totalScore = users. reduce((sum,user)=>{
  return sum +user.score;
}, 0);
console.log(totalScore);

// 문제4 :나이가 25 이상인 사람들의 토탈 점수를 구하라.
const totalAge = users
  .filter(user => user.age >= 25)
  .reduce((sum, user) => sum + user.score, 0);
console.log(totalAge);

const sortedByAge = [...users].sort((a,b)=>{
  return a.age- b.age;
  // a.age - b.age 가 음수이면 a 가  b 앞에 있고
  // a.age - b.age 가 양수이면 a 가  b 뒤에 있고
  // a.age - b.age 가 0이면  아무것도 안함
}) // 나이 오름차순 정렬
console.log(sortedByAge);

const os = require("os");
  console.log(`운영체제 : ${os.type()}`)
  console.log(`플랫폼 : ${os.platform()}`)
  console.log(`아키텍처 : ${os.arch()}`)
  console.log(`호스트명 : ${os.hostname()}`)

  // cpu 정보
const cpus = os.cpus();
console.log(`cpu 코어수: ${cpus.length}`);
console.log(`cpu 모델: ${cpus[0].model}`);
console.log(`cpu 속도: ${cpus[0].speed}MHz`);

// 메모리 정보 -> /KB/MB/GB
const totalMemoryGB = os.totalmem()/1024/1024/1024;
const freeMemoryGB = os.freemem()/1024/1024/1024;
console.log("\n메모리 정보 : ")
console.log(`총 메모리: ${totalMemoryGB} GB`)
console.log(`사용 가능한 메모리: ${freeMemoryGB.toFixed(2)} GB`)

// 사용자 정보 가지고 오기
const userInfo = os.userInfo();
console.log("\n 사용자 정보")
console.log(`사용자 이름: ${userInfo.username}`)
console.log(`홈 디렉토리: ${userInfo.homedir}`);
console.log(`쉘: ${userInfo.shell}`)
