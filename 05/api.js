// 설치
// npm init -y 
// npm i express nodemon better-sqlite3 moment

// 실행
// npx nodemon api.js    

 const express = require('express');
 const moment = require("moment");
 const Database = require("better-sqlite3");
 const path = require("path");

 // DB setting
 const db_name = path.join (__dirname,"posts.db");
 const db = new Database(db_name);

//  express 설정
const app = express();
const PORT= 3000;
app.use(express.json());

// 1. post.db 게시판 전용 테이블을 생성
const create_sql = `
   create table if not exists posts(
   id integer primary key autoincrement,
   title varchar(255),
   content text,
   author varchar(100),
   createdAt datetime default current_timestamp,
   count integer default 0
   ) `;
db.exec(create_sql);

// 게시판 정보 입력
app.post("/posts",(req,res)=>{
  const {title, content, author } = req.body;
  let sql = `INSERT INTO posts(title, content, author) VALUES (?, ?, ?);`
  db.prepare(sql).run(title,content,author);
  res.status(201).json({message:"ok"});
})

// 게시판 전체 정보 조회
app.get("/posts",(req,res)=>{
  let sql= `select id, title, content, author, createdAt from posts order by createdAt desc`
  // 쿼리를 준비
  const stmt = db.prepare(sql);
  // 쿼리를 날림
  const rows = stmt.all();
  console.log(rows);
  res.status(200).json({data: rows});
})

// 게시글 상세 조회 : 아이디 한개만 가져옴 http://localhost:3000/posts/3
app.get("/posts/:id", (req,res)=>{
  const id = req.params.id;
  let sql = `select id, title,content,author, createdAt, count from posts where id = ?`;
  const stmt = db.prepare(sql);
  const post = stmt.get(id);
  res.status(200).json({data:post});
})

//게시글 수정 http://localhost:3000/posts/3
app.put("/posts/:id",(req,res)=>{
  const id = req.params.id;
  const {title, content} = req.body;
  let sql = `update posts set title =?,content=? where id=?`
  const stmt = db.prepare(sql);
  stmt.run(title, content, id) // 실제 쿼리로 데이터베이스 실행
  res.redirect("/posts");
  // res.json({message:"ok"})
})

// 게시글 삭제 
app.delete("/posts/:id" ,(req,res) => {
  const id = req.params.id;
  let sql =`delete from posts where id = ?`
  const stmt = db.prepare(sql); // 쿼리문 준비
  stmt.run(id);
  res.json({message:"ok"});
})

//server start
app.listen(PORT,()=>{ });