// import fs form "fs" -> common Js 방식
// 파일 다루기 fs 모듈 방식
const fs = require("fs");
fs.writeFileSync("test.txt","hello world! ");
console.log("파일 쓰기 완료");

// 문제1: hello.txt 생성, 내용 : 안녕하세요. 반값습니다. 제이름은 전은주 입니다.
fs.writeFileSync("hello.txt","안녕하세요. 반값습니다. 제이름은 전은주 입니다.");
console.log("파일 쓰기 완료");

// 파일 읽기
const fs = require("fs");
const data = fs.readFileSync("test.txt","utf-8")
console.log(data);

//문제2: hello.txt 읽어서 콘솔에 출력
const data2 = fs.readFileSync("hello.txt","utf-8")
console.log(data2);

// 만약 hello.txt 가 1GB 라면 console.log(data2);는 실행이 완료 될때 까지 대기
fs.writeFile("async-test.txt","Async Hello Wold!",(err)=>{
  if(err) {
    console.log(err);
  }
  console.log("비동기 파일 쓰기 완료");
});

const stats1 = fs.statSync("test.txt");
console.log(stats1);
//  결과 (파일정보)
// Stats {
//   dev: 16777231,
//   mode: 33188,
//   nlink: 1,
//   uid: 502,
//   gid: 20,
//   rdev: 0,
//   blksize: 4096,
//   ino: 12845393,
//   size: 13,
//   blocks: 8,
//   atimeMs: 1750122802793.1223,
//   mtimeMs: 1750122801495.712,
//   ctimeMs: 1750122801495.712,
//   birthtimeMs: 1750122713421.9534
// }

//문제3 : async-hello.txt 생성 fs.writeFile 사용
fs.writeFile("async-hello.txt","안녕하세요. 비동기 파일 쓰기 테스트 작업입니다.!",(err)=>{
  if(err) {
    console.log(err);
  }
  console.log("*비동기 파일 쓰기 완료*");
});

// 파일 읽어오기
const fs = require("fs");
fs.readFile("async-test.txt","utf-8",(err,data) =>{
  if(err) {
    console.log("읽기 에러",err);
  }
  console.log("* 비동기 파일 읽기 : ",data);
});

// 문제4 : async-hello.txt를 fs.readFile 로 읽어오기
fs.readFile("async-hello.txt","utf-8",(err,data) =>{
  if(err) {
    console.log("읽기 에러",err);
  }
  console.log("* 비동기 파일 읽기 : ",data);
});

// promise 방식 사용
const fsPromise = require("fs").promises;
// const fileOP = async ()=>{
//   try {
//     await fsPromise.writeFile("promise-test","Promise Hello World!");
//     console.log("파일 쓰기 완료");
//   }catch {
  //     console.log(e);
  
  //   }
  // };
  // fileOP();
  
const fsPromise = require("fs").promises;
const fileOP = async ()=>{
    try {   
        await fsPromise.writeFile("promise-test","Promise Hello World!");
        console.log("파일 쓰기 완료");

    const data = await fsPromise.readFile("./promise-test","utf-8");
    console.log("파일 읽기: ",data);
  }catch(e) {
    console.log(e);
  }
};
fileOP();


//문제5 : fileOp2 함수 생성 promist-hello.txt 
const fsPromise = require("fs").promises;
const fileOP2 = async ()=>{
  try {   
        // await fsPromise.writeFile("promise-hello.txt","안녕하세요. 프로미스 방식으로 파일을 읽는 연습을 하고 있어요.");
        // console.log("파일 쓰기 완료");

        const data = await fsPromise.readFile("./promise-hello.txt","utf-8");
        console.log("파일 읽기: ",data);
} catch(e) {
  console.log(e);
}
};
fileOP2();


// 현재 파일의 디렉토리 절대경로를 가져옴
const path = require("path");
const fullPath = path.join(__dirname,"files","test.txt");
console.log(`전체 경로 : ${fullPath}`);


//문제1 : fullPath2 변수에 현재디렉토리/files/tasks/jobs/01.txt 경로 생성
// const fullPath2 = path.join(__dirname,"files","tasks","jobs","01.txt");
console.log(`전체 경로 : ${fullPath2}`);

const path = require("path");

// const fullPath = path.join(__dirname,"files","a","b","test.txt");
console.log(`전체 경로 : ${fullPath}`);
//전체 경로 : /Users/poca/tutorial/02/files/a/b/test.txt

const pathParts = path.parse(fullPath);
console.log(pathParts);

// 문제2: fullPath2를 parse를 이용해서 경로를 분리해 보세요
const fullPath2 = path.join(__dirname,"files","tasks","jobs","01.txt");
console.log(`전체 경로 : ${fullPath2}`);
const pathParts2 = path.parse(fullPath2);
console.log(pathParts2);

// 문제3 : 확장자만 가져오기
const ext = path.extname(fullPath);
console.log(ext);