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
 const youngs = users.filter((user) => {
      //  console.log(user);
       return user.age < 25;
 });
 console.log(youngs);

 // 문제1: user에서 80점 미만인 친구들만 출력
const youngs2 = users.filter((user)=>{
    return user.score < 80
  }) 
 console.log(youngs2);

 const userNames = users.map((user) => {
     return user.name;
 });
 console.log(userNames);
 
 // 문제2: 아이디와 이름만 반환하는 배열을 만들어보세요.
 const userNameID = users.map((user) => {
    //  return user.name, user.id;
     return {name : user.name, id : user.id};
 });
 console.log(userNameID);
 
 //문제3 성적이 80이상인 친구들의 아이디, 이름, 성적 출력
 const highScore = users.map((user) => {
    if (user.score >= 80) {
      return { id : user.id, name : user.name, score : user.score};
    }
 });
 console.log(highScore);

users.forEach((user) => {
  console.log(`${user.name}님의 점수는 ${user.score} 입니다.`);
});