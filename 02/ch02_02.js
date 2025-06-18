const path = require("path");
const fs = require("fs"); // fireSystem의 약어
const dirPath = path.join(__dirname,"new-dir");
console.log(dirPath);
if(!fs.existsSync(dirPath)) {
  fs.mkdirSync(dirPath);
} //경로가 있으면 true, 없으면 false

const dirPath2 = path.join(__dirname,"tasks");
console.log(dirPath2);
if(!fs.existsSync(dirPath2)) {
  fs.mkdirSync(dirPath2);
} 

//문제1
// const dirPath3 = path.join(__dirname,"tasks","jobs");
const dirPath3 = path.join(__dirname,"tasks","jobs","01");
if(!fs.existsSync(dirPath3)) {
  fs.mkdirSync(dirPath3,{recursive:true});
} 

const filePath = path.join(dirPath3,"test.txt");
fs.writeFileSync(filePath,"디렉토리 생성후 파일 생성");

//문제2: 현재 디렉토리 / main/src/code/javascript.txt 파일을 생성하고 파일 안에 " 자바스트립트 테스트 파일 입니다." 쓰세요.
const path = require("path");
const fs = require("fs"); // fireSystem의 약어
const dirPath4 = path.join(__dirname,"main","src","code");
if(!fs.existsSync(dirPath4)) {
  fs.mkdirSync(dirPath4,{recursive:true});
} 

const filePath4 = path.join(dirPath4,"javascript.txt");
fs.writeFileSync(filePath4,"자바스트립트 테스트 파일 입니다.");

// 디렉토리 이름 변경 / 경로 변경  == 파일 이동 (mv)

// const dirPath = path.join(__dirname, "new-dir");
const newDirPath = path.join(__dirname,"rename-dir");
// fs.renameSync(dirPath,newDirPath);

// 디렉토리 삭제
fs.rmSync(newDirPath,{ recursive: true, force: true });
