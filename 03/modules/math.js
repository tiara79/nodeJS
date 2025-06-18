function add(a,b){
  return a+b;
}

function subtract(a,b){
  return a-b;
}
// 외부에서 모듈 사용하기 위해 내보내기
module.exports ={
  add,
  subtract,
}