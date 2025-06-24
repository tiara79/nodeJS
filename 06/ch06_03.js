// 문제 todo
// 제목, 할일 설명, 완료 여부, 생성시간, 우선순위
  //  create table if not exists todos(
  //     id integer primary key autoincrement,
  //     task varchar(255),
  //     description text,
  //     completed boolean default 0,
  //     createdAt datetime default current_timestamp,
  //     priority integer default 1 );

// op: Operators
  const { Model,Op, Sequelize, DataTypes } = require("sequelize")
  const sequelize = new Sequelize({
    dialect : "sqlite",
    storage : "sample.db"
  })
  
  // todo 모델 생성 : todos , allowNull: false : not null
  const todos = sequelize.define("todos", {
    task : {
      type: DataTypes.STRING,
      allowNull: false
    },
    description :{
      type: DataTypes.STRING,
      allowNull: false
    },  
    completed: {
      type: DataTypes.STRING,
      allowNull: false
    },
    priority : {
      type: DataTypes.INTEGER,
      defaultValue: 1
    },

  }, {
    tableName: "Todos", timestamps: true  
  });

  // 2. 문제 2 : 즉시 실행 함수, 테이블 2개 입력  
(async ()=>{ 
  await sequelize.sync({force: true});

const todo1 = await todos.create({
    task: "장보기",
    description: "마늘, 양파, 고추 사기",
  });
  
  const todo2 = await todos.create({
    task: "스터디 준비",
    description: "sequelize 예제 만들기",
  });

  // 3. 문제 3 : 테이블 전체 조회
  const todosAll = await todos.findAll();
  console.log(`todosAll FindAll => ${JSON.stringify(todosAll)}`)

  // 4. 문제 4 : 아이디가 2번인 항목 조회
  const todo4 = await todos.findByPk(2);
  console.log(`todo1 한개만 가져옴 => ${JSON.stringify(todo4)}`)

  // 5. 문제 5 : 아이디가 2번인 항목의 completed 를 완료로 바꿈 
  await todos.update(
      { completed:"true", }, {where : { id:2,}}
    );
    const todo5 = await todos.findByPk(2);
    console.log(`todo 완료여부 업데이트 => ${JSON.stringify(todo5)}`)

  // 6. 문제 6 : 아이디가 2번인 항목 삭제
    await todos.destroy({ where: {id:2, }, })
    const todoDel = await todos.findByPk(2);
    console.log(`todo delete => ${JSON.stringify(todoDel)}`)
})(); 