const { Sequelize, Model, DataTypes, Op } = require("sequelize");
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "users.db",
});

// 1. 회원모델 정의
const User = sequelize.define(
  "User",
  {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [2, 5], // 사용자 이름이 2자리 부터 5자리 까지만 허용
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true, // 이메일 형식이어야 지만 들어올 수 있어용 ~
      },
    },
    password: {
      // 단방향 암호화 bcrypt
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [6, 20],
      },
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: {
        min: 0,
        max: 150,
      },
    },
    status: {
      type: DataTypes.ENUM("active", "inactive"),
      defaultValue: "active",
    },
  },
  { tableName: "users" }
);

(async () => {
  await sequelize.sync({ force: true });

  const user1 = await User.create({
    username: "홍길동",
    email: "a@example.com",
    password: "12345678",
    age: 20,
  });
  const user2 = await User.create({
    username: "박길동",
    email: "b@example.com",
    password: "12345678",
    age: 10,
  });
  const user3 = await User.create({
    username: "서길동",
    email: "c@example.com",
    password: "12345678",
    age: 30,
  });
  const user4 = await User.create({
    username: "이길동",
    email: "d@example.com",
    password: "12345678",
    age: 40,
  });
  const user5 = await User.create({
    username: "고길동",
    email: "e@example.com",
    password: "12345678",
    age: 50,
  });

  //  .com으로 끝나는 사용자의 email,username 출력
  const users1 = await User.findAll({
    where: {
      email: { [Op.like]: "%.com", },
    },
  });
  console.log(
    users1.map((u) => {
      return { email: u.email, name: u.username,  };
    })
  );

  //  "홍길동" 또는 "박길동"인 사용자의 이름만 출력
  const users2 = await User.findAll({
    where: {
      username: {
        [Op.in]: ["홍길동", "박길동"],
      },
    },
  });
  console.log(users2.map((u) => u.username));

  const users3 = await User.findAll({
    where: {
      //나이가 20 미만인 사용자만 조회됩니다.
      age: {
        [Op.lt]: 20, // lt less than == '<', gt : greater than  '>'
        // lte == '<='       gte == '>='
      },
      // "%%"는 와일드카드 전체 매칭이므로, 모든 이메일이 해당됨,  // 이메일이 어떤 값이든 포함되면 (항상 true)
      email: {
        [Op.like]: "%%",
      },
    },
  });

  // JSON.stringify(value, replacer, space)
  // value	문자열로 변환할 JavaScript 객체 (users3 등)
  // replacer	어떤 속성을 포함시킬지 결정하는 함수 또는 배열. 대부분 null 사용함.
  // space	들여쓰기(indentation) 수준 지정. 숫자(예: 2) 또는 문자열("\t" 등) 가능.
  console.log(JSON.stringify(users3, null, 2));

})();