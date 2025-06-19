
// RestFullAPI (HTTP 기반 + JSON data를 주고 받는 방식)
// Representational State Transfer (표현 상태 전송) 아키텍처 스타일을 따르는 웹 API를 의미

const express = require('express')
const app = express();
const PORT = 3000;

const books =[
  {id:1, title: "node.js 교과서", author : "이지훈"},
  {id:2, title: "한눈에 보이는 node.js", author : "이지훈"},
  {id:3, title: "node.js 디지인패턴", author : "이지훈"},
];

app.use(express.json()); //미들웨어 : 응답과 요청시에 JSON 을 처리 담당
app.get("/books",(req,res)=>{
  res.json(books);
})


// ------------------------------- 매번 수정 후 서버 재시동

// 책 id 없을 경우 , http://localhost:books/1, http://localhost:books/2
app.get("/books/:id",(req,res)=>{
  const id= req.params.id; //문자열
  const book = books.find((b) => b.id === parseInt(id) ); // === 타입이랑 값이 동일
  if (!book) {
    return res.status(404).json({message:"책을 찾을 수 없어요"});
  }
  res.json(book); // status 200 : 정상
}) 

// 책 info 추가
app.post("/books", (req,res)=>{
  // 요청 본문에서 title, author 를 추출
  const{title,author}= req.body; 
  const book ={
    id: books.length +1,
    title, author,
  };
  books.push(book);  //push 배열에 book 객체 추가
  res.status(201).json(book);
})

// 책 info 수정 , htrp://localhost:3000/books/1
app.put("/books/:id",(req,res)=> {
  const id= req.params.id;
  const {title,author} =req.body;
  const book = books.find((book) => book.id === parseInt(id));
  if(!book){
    return res.status(404).json({errow:"책을 찾을 수 없어요."})
  }
  book.title = title;
  book.author = author;
  res.json(book);
});

//라우터 연결
app.listen(PORT,()=>{
  console.log(`서버가 http://localhost:${PORT}에서 실행중`);
})