// 06 폴더 생성과 설치 
// npm init -y
// npm i sequelize
// npm i sqlite3 

const { Sequelize, Model, DataTypes, Op } = require("sequelize");
const sequelize = new Sequelize({
  dialect : "sqlite",
  storage : "sample.db"
})

// 모델 생성 :Post
const Post = sequelize.define("Post", {
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  content: {
    type: DataTypes.STRING
  },
  author: {
    type: DataTypes.STRING
  }
}, {
  tableName: "posts" // 옵션 객체는 두 번째 인자로 따로 전달
});


(async ()=>{  // 함수는 즉시실행하는 함수 
  // sequelize는 Promise를 이용해서 작업하는데 async/await 를 이용하여
  // Promise 작업을 하기 위해 즉시 실행함수 안에서 코딩함
  await sequelize.sync({force: false});

  const post1 = await Post.create({
    title : "orm 첫 예제",
    content: "객체로 생성",
    author : "전은주",
  });
  // console.log(`post1 create =>${JSON.stringify(post1)}`);
  
  const post2 = await Post.create({
    title : "orm 두번째 예제",
    content: "객체로 생성2",
    author : "전은주",
  });
  // console.log(`post1 create =>${JSON.stringify(post2)}`);

   // select * from posts;
  const posts = await Post.findAll();
  console.log(`post FindAll => ${JSON.stringify(posts)}`)
  
  // select * from posts where id = 1;
  const post11 = await Post.findByPk(1);
  console.log(`post11 한개만 가져옴 => ${JSON.stringify(post11)}`)
  
  // 마지막 1개 SELECT * FROM posts WHERE id = 1 LIMIT 1;
  const post12 = await Post.findOne({ 
    where:{author: "전은주"},
  });
  console.log(`findOne=> ${JSON.stringify(post12)}`);
  
  //UPDATE posts SET title = 'orm 공부하는 날' WHERE id = 1;
  await Post.update(
    { title:"orm 공부하는 날", }, {where : { id:1,}}
  );
   // findByPk(1)는 기본 키(PK)가 1인 레코드를 조회하는 메서드
  const post13 = await Post.findByPk(1);
  // Sequelize 인스턴스는 단순 객체가 아니기 때문에, 해당 인스턴스를 
  // JSON 형식 문자열로 변환하여 콘솔에 뿌려줌
  console.log(`post13 업데이트 => ${JSON.stringify(post13)}`)
  
  // delete from posts where id = 1;
  await Post.destroy({
    where: {id:1, },
  })
  const post14 = await Post.findByPk(1);
  console.log(`post14 delete => ${JSON.stringify(post14)}`)
  
})(); 