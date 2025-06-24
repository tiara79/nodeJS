const { Sequelize, Model, DataTypes, Op } = require("sequelize");
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "posts.db",
});

// 1. 회원모델 정의
const User = sequelize.define(
  "User", {
    username: {
      type: DataTypes.STRING, allowNull: false,
      // 사용자 이름이 2자리 부터 5자리 까지만 허용 
      validate: { len: [2, 5],  },
     },
      // 이메일 형식
    email: {
      type: DataTypes.STRING, allowNull: false,
      unique: true, validate: { isEmail: true, }, 
    },
    password: {
      // 단방향 암호화 bcrypt
      type: DataTypes.STRING, allowNull: false,validate: {len: [6, 20],},
    },
    age: {
      type: DataTypes.INTEGER, allowNull: true, validate: { min: 0, max: 150,},
    },
    status: { type: DataTypes.ENUM("active", "inactive"), defaultValue: "active", },
  },
  { tableName: "Users" }
); // User table end

// 2. 게시판모델 정의
const Post = sequelize.define("Post", {
  title: { type: DataTypes.STRING,allowNull: false, },
  content: { type: DataTypes.TEXT,allowNull: true,  },
  count: { type: DataTypes.INTEGER, defaultValue: 0 },
}); // Post table end


User.hasMany(Post, {
  foreignKey: "authorId", // 여기서는 FK 컬럼명 지정
});
Post.belongsTo(User, {
  foreignKey: "authorId", // 동일한 FK 컬럼명을 지정해야 합니다.
});


// start
(async () => {
  await sequelize.sync({ force: true });

  // Post 테이블에는 1명의 유저 ID 있다. 데이터 생성

  // 1. 사용자 정보
  const user1 = await User.create({
    username: "이은주",
    email: "eunjoo@example.com",
    password: "secure123",
    age: 45
  });
  const user2 = await User.create({
    username: "김준호",
    email: "junho@example.com",
    password: "password456",
    age: 30
  });

  // 2. 게시글 정보
  const post1 = await Post.create({
    title: "개발자로서의 첫 발걸음",
    content: "처음으로 웹 서버를 혼자 배포해봤다. 감격 그 자체!",
    authorId: user2.id,
  });
  const post2 = await Post.create({
    title: "Sequelize 관계 설정 완전 정복",
    content: "hasMany, belongsTo를 실제로 써보니 이해가 훨씬 쉬워졌다.",
    authorId: user2.id,
  });

  // 모든 정보 출력하는데 각 게시글에 연결된 작성자(User) 정보도 함께 가져옴
  const posts = await Post.findAll({
    include: [ { model: User, },],
  });
  console.log(`posts => ${JSON.stringify(posts)}`);

  const users = await User.findByPk(2, {
    include: [ { model: Post, }, ],
  });
  console.log(`users => ${JSON.stringify(users)}`);
})();