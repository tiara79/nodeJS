// 이지훈 객체를 표현
// const name ="이지훈";
// const age = 40;
// const job = "developer";

// const name1  ="홍길동";
// const age1 = 20;
// const job1 = "sw 개발자";

// 객체 데이터 접근 방식
const person1 = { name: '이지훈', age: 40, job:'sw engineer'}
console.log(person1.name, person1['name']) // 이지훈 이지훈

// 객체 데이터 추가
person1.hobby =["cook","fushing"]
console.log(person1)
// 결과
// {
//   name: '이지훈',
//   age: 40,
//   job: 'sw engineer',
//   hobby: [ 'cook', 'fushing' ]
// }

// 객체 키 목록 [ 'name', 'age', 'job', 'hobby' ]
console.log(Object.keys(person1));

// 객체 값 목록 [ '이지훈', 40, 'sw engineer', [ 'cook', 'fushing' ] ]
console.log(Object.values(person1));


person1.addAge = function(){
  this.age = this.age+1; // age : 41
}

person1.addAge(); // addAge: [Function (anonymous)] 추가됨
console.log(person1); 


class PersonInfo{
  constructor (name, age, address) {
    this.name = name;
    this.age = age;
    this.address = address;
  }
  addAge(age){
    this.age = this.age + age;
  }
  getAge(){
    return this.age;
  }
}
let p1 = new PersonInfo("이지훈", 50, "신정동")
console.log(p1);
p1.addAge(50);
console.log(p1.getAge());
// PersonInfo { name: '이지훈', age: 50, address: '신정동' } 100

class Emplyee extends PersonInfo{
  constructor(name, age, address, salary) {
    super(name, age, address)
    this.salary= salary;
  }
}
let e1 = new Emplyee("홍길동", 60, "인천 부평", 1000000)
console.log(e1)
// Emplyee { name: '홍길동', age: 60, address: '인천 부평', salary: 1000000 }
// 예외발생
// 예외가 발생해도 이 작업은 반드시 필요


try{
  // 데이터베이스 커넥션 얻어와서 데이터베이서 데이터 질의
  const arr = new Array(-1)
} catch(e){
  //데이터 질의 중 예외 발생 했을때 처리
  console.log( "예외발생")
} finally {
  // 데이터베이스 커넥션 닫아주기
  console.log( "예외가 발생해도 이 작업은 반드시 필요")
}

try{
  const err= new Error("나만의 에러*")
     console.log("나만의 에러");
     console.log("나만의 에러 완성");
  throw err
} catch(e){
  console.log(e.name, e.message) 
  // e.name은 에러의 종류 ("Error", "TypeError", "ReferenceError" 등)을 표현하는 내장함수
  // e.massage는 	에러에 대한 설명 또는 메시지를 표현하는 내장함수
}

// 나만의 에러
// 나만의 에러 완성
// Error 나만의 에러*