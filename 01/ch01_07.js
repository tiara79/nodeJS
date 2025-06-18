// 문제1 : 배열 1,2,'멈춰', 3,4, true, false 에서 멈춰가 나오면 멈추는 코드를 만들어 보세요.
console.log ("------------------ 문제 1 ---------------------------")
let arr = [1,2,'멈춰', 3,4, true, false];

for (i in arr){
  if(arr[i] === "멈춰"){
    break;
  }
  console.log(arr[i]);
}

console.log ("------------------ 문제 2 ---------------------------")
// 문제2 : 배열 [5,10,15,20,25] 에서 20이상 나오면 멈추는 코드를 만들어 보세요.
let list = [5,10,15,20,25] ;

for (i in list){
  if(list[i] >= 20){
    break;
  }
  console.log(list[i]);
}

console.log ("------------------ 문제 3 ---------------------------")
// 문제3 : 배열 [1,2,3,4,5,6,7,8,9,10] 에서 짝수만 나오는 코드. continue 사용
let num =  [1,2,3,4,5,6,7,8,9,10]  ;

for (i in num){
  if(num[i] %2 != 0){
    continue;
  }
  console.log(num[i]);
}

console.log ("------------------ 문제 4 ---------------------------")
// 문제4 : 1부터 10까지 돌면서 3의 배수는 건너 띄고 나머지를 출력 하는 코드를 만들어 보세요.

for (i=1 ; i<10 ; i++){
  if(num[i] %3 == 0){
    continue;
  }
  console.log(num[i]);
}
console.log ("------------------ 문제 5 ---------------------------")
// 문제5 : 배열 ["사과","바나나",2,"포도",false] 에서 문자만 나오는 코드를 만들어 보세요
const p5 =  ["사과","바나나",2,"포도",false] ;
for(i in p5){
  if (typeof p5[i]=="string") {
    console.log(p5[i])
  }
}

// 문제1 :CarInfo를 상속 받아서 ElectricCarInfo를 생성 , 추가 속성 battery,
//      charge() 속성은 "모델 xx가 달리는 중" , stop() ->"모델 xx가 멈췄습니다."
// 객체를 2개정도 생성 후에 drive, stop 메소드 추출 해보기
class CarInfo{
  constructor(brand, color, model) {
    this.brand = brand;
    this.color = color;
    this.model = model;
  }
  drive() {
    console.log(`모델 ${this.brand}가 달리는 중`);
  }
  stop(){
    console.log(`모델 ${this.brand}가 멈췄습니다.`);
  }
}
c1 = new CarInfo("제네시스","red","G80");
c2 = new CarInfo("소나타","black","s70");
c1.drive();
c2.drive()


//문제2 : CarInfo를 상속 받아서 ElectricCarInfo를 생성 , 추가 속성 battery,
//      charge() 속성은 "모델 xx가 충전 중" , stop() ->"모델 xx가 멈췄습니다."
// 객체를 2개정도 생성 후에 drive, stop 메소드 추출 해보기
class ElectricCarInfo extends CarInfo {
  constructor( brand, color, model, battery ){
  super(brand, color, model );
  this.battery = battery;
 } 
 charge(){
    console.log(`모델 ${this.brand}가 충전 중`);
 }
 stop(){
    console.log(`모델 ${this.brand}가 멈췄습니다.`);
  }
}
c3 = new ElectricCarInfo("테슬라","쥐색","tc",300000);
c3.charge();
c3.stop();




// 콜백을 이용한 비동기 처리
const fetchData=(callback)=>{
  // callback <- handleData
  setTimeout(()=>{
     const data = "서버에서 받은 데이터";
     callback(data);
  },1000)
}
const handleData =(data) =>{
  // 서버에서 받은 데이터 처리, 데이터 파싱 등
  console.log("콜백에서 받은 데이터",data)
}

// const cb1 = callback(callback) // callback 지옥 
// fetchData(handleData)

// Promise를 이용한 비동기 처리
const fetchDataPromise = () => {
  // 함수 1개만 옴 , resolve 함수, reject 함수
  return new Promise((resolve, reject) =>{
    setTimeout(()=>{
      const success = true; 
      // 외부db 에서 데이터를 가지고 오는 로직 있는 처리
      if (success) {
        resolve("외부 DB에서 받은 데이터입니다!");
      }else {
        reject("데이터 요청 실패");
      }
    }, 1000);
  });
}

fetchDataPromise()
.then((data) => {console.log("프라미스에서 받은 데이터",data);})
.catch((error)=>{ console.log("에러",error)});

console.log("-------------------------")
// -- 위와 동일 async로 변환
const getData = async () => {
  try { //resolve
    const data = await fetchDataPromise();
    console.log("async/await data:", data);
  } catch (e) { // reject
    console.error("에러:", error);  
  }
}

getData();

// 문제 1: 2초후에 "안녕하세요"라는 메세지 출력, Promise 만들고 실행.
const greet =()=>{
  return new Promise((resolve, reject) =>{
    setTimeout(()=>{
      resolve("안녕하세요!");
      } , 2000);
    });
};
greet().then((message)=>{
  console.log(message);
})

// 문제 2 : async, await 사용하여 greet 를 사용해 보세요. "안녕하세요"라는 메세지 출력
const sayHi = async() => {
  try {
    const data = await greet();
    console.log("안녕하세요 *",data);
  } catch (error) {
    console.error("에러:", error);
  }
}

sayHi();