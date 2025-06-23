 const express = require('express');
 const moment = require("moment");
 const Database = require("better-sqlite3");
 const path = require("path");

// db setting
const db_name = path.join(__dirname,"expense.db");
const db = new Database(db_name);


const app = express();
const PORT = 3000;
app.use(express.json()); // middleware -> 전체 엔드포인트에 특정 기능을 일괄적용

// 테이블 : 아이디, 이름, 가격, 날짜(YYYY-MM-DD), 메모
const create_sql = `create table if not exists expense(
     id integer primary key autoincrement,
     title text not null,
     amount integer not null,
     date text not null,
     memo text
)`;
db.exec(create_sql);

// 1. 가계부 입력 POST /expense
app.post("/expense", (req, res) => {
  const { title, amount, date, memo } = req.body;
  let sql = `
     INSERT INTO expense(title, amount, date, memo) VALUES (?, ?, ?, ?);
     `;
  db.prepare(sql).run(title, amount, date, memo);
  res.status(201).json({message:"insert ok"});
});

// 2. 가계부 전체 목록 조회  GET /expense
app.get("/expense",(req,res)=>{
  let sql= `SELECT id, title, amount, date, memo FROM expense ORDER BY date DESC`
  const stmt = db.prepare(sql);
  const rows = stmt.all();
  console.log(rows);
  res.status(200).json({data: rows});
})

// 3. 가계부 목록 날짜별 조회  GET /expense/2025-06-23 -> 해당 날짜의 내역만 조회
app.get("/expense/:date", (req,res)=>{
  const date = req.params.date;
  let sql = `SELECT id, title, amount, date, memo FROM expense WHERE date = ?`;
  const stmt = db.prepare(sql);  //select 쿼리문이 준비 완료
  const rows = stmt.all(date);  // {} 로 반환
  res.status(200).json({message:"date select ok", data:rows}); // json 문자열로 리턴 됨
})

// 4. 가계부 수정 PUT /expense/12 -> 금액수정, 항목등 수정 , 12는 아이디
app.put("/expense/:id",(req,res)=>{  
  const id = req.params.id;
  const {title, amount, date, memo} = req.body; 
  let sql = `UPDATE expense SET title = ?, amount= ? , date= ? , memo= ?  WHERE id= ?`
  const stmt = db.prepare(sql); 
  stmt.run(title, amount, date, memo, id) 
  res.status(200).json({message:"update ok"}); 
});

// 5. 가계부 삭제 DELETE /expense/12 -> 해당 가계부의 12번 항목 삭제 
app.delete("/expense/:id" ,(req,res) => {
  const id = req.params.id; 
  let sql =`DELETE FROM expense WHERE id = ?` 
  const stmt = db.prepare(sql); 
  res.status(200).json({message:"delete ok"}); 
})  

app.listen(PORT,()=>{ });