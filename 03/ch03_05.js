// npm i dotenv 설치 , package.json 파일에 버전확인  "dotenv": "^16.5.0"
// .env 파일 생성

// .env 파일을 프로그램상에 로드 
require("dotenv").config();
console.log(`서버 포트: ${process.env.PORT}`);

// 문제1: 
console.log(`디비 이름: ${process.env.DB_NAME}`);
console.log(`디비 유저: ${process.env.DB_USER}`);
console.log(`디비 패스워드: ${process.env.DB_PASSWORD}`);
console.log(`API KEY: ${process.env.API_KEY}`);
console.log(`NODE_ENV: ${process.env.NODE_ENV}`);

// 정보 없는 경우 : DB 포트: undefined
console.log(`DB 포트: ${process.env.DB_PORT}`);
// 정보 없는데 기본값 설정
console.log(`DB 포트: ${process.env.DB_PORT || 5432}`);

// OPENAI_API_KEY 업는 경우 메세지 처리
if (!process.env.OPENAI_API_KEY){
  console.log("오픈 AI 키가 필요 합니다.")
}

const isDevelopment = process.env.NODE_ENV === "development"
if(isDevelopment) {
  console.log("개발 환경에서의 로직처리")
} else {
  console.log("운영 환경에서의 로직처리")
}