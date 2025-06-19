// npm i nodemon  설치  "express": "^5.1.0",   "version": "3.1.10",

const express = require('express')
const app = express();
const PORT = 3000;
const moment = require("moment")

const memos= [
  {id:1, title:"샘플 메모 1" ,content: "오늘 점심은?" ,createAt:"2025-06-19",},
  {id:2, title:"샘플 메모 2" ,content: "오늘 저녁은?" ,createAt:"2025-06-19",},
]
//createdAt : moment().format("YYYY-MM-DD")
app.use(express.json()); //요청 본문에 json 포맷인식 및 처리

// 1. 메모 목록 반환
app.get("/memos",(req,res)=>{
  res.json(memos);
})
// 2. 메모 1개 반환(id)
app.get("/memos/:id",(req,res)=>{
  const id= req.params.id; //문자열
  const memo = memos.find((memo) => memo.id === parseInt(id) ); 
  if (!memo) {
    return res.status(404).json({message:"메모를 찾을 수 없어요"});
  }
  res.status(200).json(memo);
})

// 3. 메모 쓰기
app.post("/memos",(req,res)=>{
  const{title,content}= req.body; 
    
  const memo = { 
    id: memos.length +1,
    title, content,createAt: moment().format("YYYY-MM-DD"),
  };
  memos.push(memo); 
  res.status(201).json(memo);
})

// 4. 메모 수정
app.put("/memos/:id",(req,res)=>{
  const id= req.params.id;
  const {title,content,createAt} =req.body;
  const memo = memos.find((memo) => memo.id === parseInt(id));
  if(!memo){
    return res.status(404).json({error:"메모를 찾을 수 없어요."})
  }
  memo.title = title;
  memo.content = content;
  memo.createAt = moment().format("YYYY-MM-DD"),
  res.status(200).json(memo);
})

// 5. 메모 삭제
app.delete("/memos/:id",(req,res)=>{
    const id = req.params.id;
    const index = memos.findIndex((memo)=> memo.id === parseInt(id));
    if (index === -1){
      return res.status(404).json({error:"메모를  찾을 수 없어요."})
    }
    memos.splice(index,1);
    res.status(204).send(); 
})

app.listen(PORT,()=>{
  console.log(`서버가 http://localhost:${PORT}에서 실행중`);
})
