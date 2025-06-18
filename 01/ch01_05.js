// 기본함수
function add1(x,y) {
  return x+y
}
console.log(add1(1,2)) //3

// 익명함수
const add2 = function(x,y) {
  return x+y
}
console.log(add1(2,3)) //5

// arrow 함수
const add3 =(x,y) => {
  return x+y
}
console.log(add3(3,4)) //7

// callback 함수
const ten =(cb) => {
  for(let i=0; i<10; i++) {
      cb();  //함수 실행 
  }
}
ten(function() {
  console.log('call function')
})

// 타이머 함수
setTimeout(function(){
  console.log(`1초 뒤에 호출`)
},1000) // 1000 ms => 1초

// setInterval
setInterval(function(){
  console.log(`1초 마다 호출`)
}, 1000)  //  1000ms =>1 초 간격으로 계속 실행, ctrl+c 종료

