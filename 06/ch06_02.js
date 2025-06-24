const { Sequelize, Model, DataTypes, Op } = require("sequelize");
const sequelize = new Sequelize({
  dialect : "sqlite",
  storage : "sample.db"
})

// 회원 모델 생성 : user
const User = sequelize.define("User", {
  username: {  // ← 콜론(:) 추가
    type: DataTypes.STRING,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false         
  },
  birthDate: {
    type: DataTypes.DATE
  }
}, {
  tableName: "users"
});

(async ()=>{ 
  await sequelize.sync({force: true});

  // 사용자 2명 생성,출력
  const user1 = await User.create({
     username : "전은주",
     password : "pw1234",
     email : "e12@gmail.com",
     birthDate: "1980-02-01"
  });
  // console.log(`user1 create =>${JSON.stringify(user1)}`);

  const user2 = await User.create({
     username : "김아람",
     password : "pw1234",
     email : "e11@gmail.com",
     birthDate: "1970-12-11"
  });
  // console.log(`user2 create =>${JSON.stringify(user2)}`);

  // 3.사용자 전체 검색
  const userAll = await User.findAll();
  console.log(`userAll FindAll => ${JSON.stringify(userAll)}`)

   // 사용자 아이디가 2번인 사람 검색
  const user11 = await User.findByPk(2);
  console.log(`user11 한개만 가져옴 => ${JSON.stringify(user11)}`)

  // 사용자 아이디가 2번인 사람의 이메일을 jihoon@kakao.com 으로 변경
   await User.update(
      { email :"jihoon@kakao.com", }, {where : { id:2,}}
    );

    const user13 = await User.findByPk(2);
    console.log(`user mail 업데이트 => ${JSON.stringify(user13)}`)

    // 사용자 아이디가 2번인 사람 삭제
    await User.destroy({ where: {id:2, }, })
    const userDel = await User.findByPk(2);
    console.log(`user delete => ${JSON.stringify(userDel)}`)
})(); 