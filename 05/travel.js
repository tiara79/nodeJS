// # nodeJS

// # 체크리스트 시스템 백엔드 만들기
// # 첫번째 요구사항


// 여행을 갈 경우
// 2025년 여름 휴가 준비물 : 여권, 충전기, 세면도구, .. 옷류, 점퍼.. 
// 캠핑 준비물 : 텐트, 의자, 랜턴, 침낭..

// 백엔드 작성
// 테이블 설계도 : 
// - 아이디 pk -> id integer
// - 캠핑 준비물, 여행 휴가 준비물을 담을 수 있는 그룹핑 항목 -> category text
// - 실제 준비해야 할 물건 -> item text
// - 수량 -> amount integer
// - 체크 여부 -> checkyn boolean

//  REST API
// POST /checkList -> 체크리스트 입력
// GET /checkList?category -> 여름 휴가 준비물
// PUT /checkList/:id -> 체크 여부를 toggle 0->1, 1->0
// DELETE /checkList/:id 


const express = require('express')
const moment = require('moment')
const Database = require('better-sqlite3')
const path = require('path')


const db_name = path.join(__dirname,"travel.db")
const db = new Database(db_name)

const app = express()
const PORT = 3000;
app.use(express.json())

const create_sql = `
   create table if not exists travels(
      id integer primary key autoincrement,
      category text varchar(100),
      item text,
      amount integer,
      checkyn boolean default 0
   )`;
db.exec(create_sql);

app.post("/travels", (req,res)=>{
  const {category, item, amount } = req.body;
  let sql = `insert into travels(category, item, amount) values ( ?, ?, ?);`
  db.prepare(sql).run(category, item, amount);
  res.status(201).json({message:"travels insert ok"})
})

app.get("/travels",(req,res)=>{
  let sql =`
     select id, category, item, amount, checkyn from travels order by checkyn desc
  ;`
  const stmt = db.prepare(sql);
  const rows = stmt.all();
  console.log(rows);
  res.status(200).json({data: rows})
})

app.get("/travels/:id",(req,res)=>{
  const id = req.params.id;
  let sql = `
    select id, category, item, amount, checkyn from travels where id =?
 `;
 const stmt = db.prepare(sql);
 const travels = stmt.get(id);
 res.status(200).json({data:travels});
})

app.put("/travels/:id", (req, res) => {
  const id = req.params.id;

  // checkyn이 1이면 0으로, 0이면 1로 토글
  db.prepare(`
    UPDATE travels 
    SET checkyn = CASE checkyn WHEN 1 THEN 0 ELSE 1 END 
    WHERE id = ?
  `).run(id);

  // 업데이트된 항목 조회
  const item = db.prepare(`SELECT * FROM travels WHERE id = ?`).get(id);

  res.status(200).json({ message: "ok", data: item });
});

app.delete("/travels/:id",(req,res)=>{
  const id = req.params.id;
  let sql =`delete from travels where id =?`;
  const stmt = db.prepare(sql);
  stmt.run(id);
  res.json({message:"travels item delete ok"})
})
app.listen(PORT, ()=>{});