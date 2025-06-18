//  npm init -y  , npm i express  설치 , package.json 의 "express": "^5.1.0" 확인 

//1. Express 모듈 가저오기
const express = require('express');

//2.app 애플리케이션 설정
const app = express();

//3. 포트 설정
const PORT = 3000;

//4.라우팅 설정 : GET 요청을 처리하는데 http://localhost:3000
app.get("/",(req,res)=>{  
   // req: HTTP 요청, 
   res.send("Hello world!");
})

// http://localhost:3000/hello
//  ** 재시동 해야 결과 나옴
app.get("/hello",(req,res)=>{
  res.send("안녕 /hello 주소에 접근 하셨습니다.")
})

//문제1 : http://localhost:3000/world GET 요청 할 경우 " 안녕 /world 주소에 접근 하셨습니다." 실행
app.get("/world",(req,res)=>{
  res.send("안녕 /world 주소에 접근 하셨습니다.")
})

//5. 서버 시작
app.listen(PORT,()=>{
  console.log(`서버가 http://localhost:${PORT} 에서 실행중 입니다.`)
})

