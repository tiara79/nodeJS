// 나만의 웹서버 생성

const http = require('http');
//req : HTTP 요청, res : HTTP 응답, 
const server = http.createServer((req,res)=>{
  //요청이 올때 마다 실행되는 콜백 함수 // 브라우저에게 응답 200 은 성공, 컨텐트 타입은 기본 텍스트, 언어는 utf-8 
  res.writeHead(200,{"Content-Type":"text/plain; charset=UTF-8;"})
  // 본문에 내용을 기재 하여 클라이언트에게 전송
  res.end("안녕하세요~. 전은주의 첫번째 웹서버 입니다.")
});

// 서버 실행
const PORT = 3000;
server.listen(PORT,()=>{
  // 서버가 3000번 포트로 요청 중..이란 의미
  console.log(`나만의 웹서버가 http://localhost:${PORT} 에서 실행 중입니다.`);
} );