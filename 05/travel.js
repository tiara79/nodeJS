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

app.put("/travels/:id",(req,res)=>{
   const id = req.params.id;
   const {category, item, amount } = req.body;
   let sql = `UPDATE travels SET category = ?, item = ? , amount = ? WHERE id = ?`;
   const stmt = db.prepare(sql);
   stmt.run(category, item, amount,id)
   res.json({message:"travels update ok"})
})

app.delete("/travels/:id",(req,res)=>{
  const id = req.params.id;
  let sql =`delete from travels where id =?`;
  const stmt = db.prepare(sql);
  stmt.run(id);
  res.json({message:"travels item delete ok"})
})
app.listen(PORT, ()=>{});