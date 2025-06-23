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
 const db_name = path.join (__dirname,"posts2.db");
 const db = new Database(db_name);

//  express 설정
const app = express();
const PORT= 3000;
app.use(express.json());
app.use((req,res,next) =>{
  console.log("나의 첫번째 미들웨어");
  next();
})

// 1. post.db 게시판 전용 테이블을 생성
const create_sql = `
   create table if not exists posts(
    id integer primary key autoincrement,
    title varchar(255),
    content text,
    author varchar(100),
    createdAt datetime default current_timestamp,
    count integer default 0
    ); 
     
    create table if not exists comments(
      id integer primary key autoincrement,
      content text,
      author text,
      createdAt datetime default current_timestamp,
      postId integer,
      foreign key(postId) references posts(id) on delete cascade
    );
  `;
db.exec(create_sql);

// 게시판 정보 입력
app.post("/posts",(req,res)=>{
  const {title, content, author } = req.body;
  let sql = `INSERT INTO posts(title, content, author) VALUES (?, ?, ?);`
  const stmt = db.prepare(sql);
  const result = stmt.run(title, content, author)
  const newPost = db.prepare(`SELECT * FROM posts WHERE id = ?`).get(result.lastInsertRowid)
  res.status(201).json({message:"ok"},{data:newPost});
})


// 전체 게시글의 5개 목록 조회 : PageNation , http://localhost:3000/posts?page=2 GET
app.get("/posts",(req,res)=>{
  const page = req.query.page ? parseInt(req.query.page) :1;
  const limit =5;
  const offset = (page -1) *limit;
  let sql = `
     select id, title, author, createdAt , count from posts order by createdAt desc limit? offset?
  `;
  const stmt = db.prepare(sql);
  const rows = stmt.all(limit, offset);
  console.log(rows);

  const totalCount = db
      .prepare(`select count(*) as count from posts`)
      .get().count;
  const totalPages = Math.ceil(totalCount/limit); // 20/ 5 => 4

  res.status(200).json({
    data: rows,
    pagination:{
      currentPage:page,
      totoalPages: totalPages,
      totalCount: totalCount,
      limit: limit,
    },
  });
});

// 게시글 상세 조회 : 아이디 한개만 가져옴 http://localhost:3000/posts/3
app.get("/posts/:id", (req,res)=>{
  const id = req.params.id;
  let sql = `select id, title,content, author, createdAt, count from posts where id = ?`;
  let ac_sql = `update posts set count = count+1 where id =? `;
  db.prepare(ac_sql).run(id);
  const stmt = db.prepare(sql);
  const post = stmt.get(id);
  res.status(200).json({data:post});
})

//게시글 수정 http://localhost:3000/posts/3
app.put("/posts/:id",(req,res)=>{
  const id = req.params.id;
  const {title, content} = req.body;
  let sql = `UPDATE posts SET title = ?, content = ? WHERE id = ?`
  const stmt = db.prepare(sql);
  stmt.run(title, content, id);
  
  const updatedPost = db.prepare(`select * from posts where id = ?`).get(id);
  if( !updatedPost) {
    return res.status(404).json({message: "게시물을 찾을 수 없습니다."});
  }
  res.status(200).json({message: "ok", data: updatedPost})
})

// 게시글 삭제 
app.delete("/posts/:id" ,(req,res) => {
  const id = req.params.id;
  let sql =`delete from posts where id = ?`
  const stmt = db.prepare(sql); 
  stmt.run(id);
  res.json({message:"ok"});
})

// ################################################


// 답글 쓰기
app.post("/posts/:id/comments",(req,res)=>{
  const postId = req.params.id;
  const {content, author} = req.body;

  //1. 게시글이 있는지 확인
  const post = db.prepare (`select id from posts where id = ?` ).get(postId); 
    if(!post){
      return res.status(404).json({message:"게시글을 찾을 수 없어요."})
    }

    // 2. 답변 추가
    const sql =`insert into comments(postId, author, content) values (?,?,?)`
    const result = db.prepare(sql).run(postId, author, content);

    //3. 신규 답변 조회 및 반환
    const newComment = db.prepare(`select * from comments where id = ?`).get(result.lastInsertRowid)
      res.status(201).json({message:"ok",data:newComment})
});

// 답변 목록 가져오기
app.get("/posts/:id/comments",(req,res)=>{
  const postId = req.params.id;
  const post = db.prepare(`select id from posts where id = ?`).get(postId);
  if(!post){
    return res.status(404).json({message:" 게시물을 찾을 수 없어요."})
  }
  const sql = `
    select id , author, content, createdAt from comments where postId = ?
    order by id  desc`;
  const comments = db.prepare(sql).all(postId);
  res.status(200).json({data: comments},{message:"ok"})
})
// 답글 수정 (부분 업데이트)
app.put("/posts/:postId/comments/:commentId",(req,res)=>{
  const {postId, commentId} = req.params;
  const { author, content} = req.body;

  const comment = db
       .prepare(`select * from comments where postId = ? and id = ?`)
       .get(postId, commentId);
  if (!comment){
    return res.status(404).json({message:"postID와 일치하는 댓글이 없어 수정할 수 없어요."})
  }
  //정된 댓글 id를 찾아서 author/content를 수정
  const newAuthor = author !== undefined ? author : comment.author;
  const newContent = content !== undefined ? content : comment.content;

  db.prepare(`update comments set author = ?, content = ? where id = ?`)
     .run( newAuthor, newContent, commentId);
  //방금 수정된 댓글을 다시 가져와서 결과로 응답
  const updateComment = db
       .prepare(`select * from comments where id = ? `)
       .get(commentId);
  res.status(200).json({message : "ok" , data : updateComment})
})

// 답변 삭제
app.delete ("/posts/:postId/commons/:commentId",(req,res)=>{
  const {postId,commentId} = req.params;
  const comment = db 
     .prepare(`select id from comments where postId = ? and id = ?`)
     .get(postId, commentId);
  if(!comment){
    return res.status(404).json({message:"댓글을 찾을 수 없어요."})
  }
  const sql =`delete from comments where id = ? `;
  db.prepare(sql).run(commentId);
  res.status(204).end()
})

//server start
app.listen(PORT,()=>{ });