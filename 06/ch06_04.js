const { Sequelize, Model, DataTypes, Op } = require("sequelize");

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "posts.db",
});

// 1. 회원 모델 정의
const User = sequelize.define("User", {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    // 사용자 이름이 2자리부터 5자리까지만 허용
    validate: { len: [2, 5] },
  },
  email: {
    // 이메일 형식
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: { isEmail: true },
  },
  password: {
    // 단방향 암호화 bcrypt (구현 안 되어 있음)
    type: DataTypes.STRING,
    allowNull: false,
    validate: { len: [6, 20] },
  },
  age: {
    type: DataTypes.INTEGER,
    allowNull: true,
    validate: { min: 0, max: 150 },
  },
  status: {
    type: DataTypes.ENUM("active", "inactive"),
    defaultValue: "active",
  },
}, {
  tableName: "Users",
});

// 2. 게시판 모델 정의
const Post = sequelize.define("Post", {
  title: { type: DataTypes.STRING, allowNull: false },
  content: { type: DataTypes.TEXT, allowNull: true },
  count: { type: DataTypes.INTEGER, defaultValue: 0 },
});

// 3. 댓글 모델 정의
const Comment = sequelize.define("Comment", {
  content: { type: DataTypes.TEXT, allowNull: false },
}, {
  tableName: "comments",
});

// 관계 설정

// User ↔ Post
User.hasMany(Post, { foreignKey: "authorId" });
Post.belongsTo(User, { foreignKey: "authorId" });

// User ↔ Comment
User.hasMany(Comment, { foreignKey: "userId" });
Comment.belongsTo(User, { foreignKey: "userId" });

// Post ↔ Comment
Post.hasMany(Comment, { foreignKey: "postId" });
Comment.belongsTo(Post, { foreignKey: "postId" });

// 실행
(async () => {
  await sequelize.sync({ force: true });

  // 사용자 생성
  const user1 = await User.create({
    username: "이은주",
    email: "eunjoo@example.com",
    password: "secure123",
    age: 45,
  });

  const user2 = await User.create({
    username: "김준호",
    email: "junho@example.com",
    password: "password456",
    age: 30,
  });

  // 게시글 생성
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

  // 댓글 생성
  const comment1 = await Comment.create({
    content: "정말 멋진 시작이네요! 응원합니다!",
    userId: user1.id,
    postId: post2.id,
  });

  const comment2 = await Comment.create({
    content: "저도 이거 하면서 구조가 확실히 이해됐어요.",
    userId: user1.id,
    postId: post2.id,
  });

  // 게시글 전체 조회 (작성자 + 댓글 포함)
  const posts = await Post.findAll({
    include: [
      { model: User },              // 작성자
      { model: Comment, include: [User] } // 댓글 + 댓글 작성자
    ],
  });
  console.log(JSON.stringify(posts, null, 2));

  // 특정 사용자 조회 (작성한 게시글 포함)
  const userDetail = await User.findByPk(2, {
    include: [{ model: Post }],
  });

  console.log(JSON.stringify(userDetail, null, 2));
})();
