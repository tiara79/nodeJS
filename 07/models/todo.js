// 설치
// npm init -y  
// npm i express nodemon sequelize sequelize-cli sqlite3
// npx sequelize-cli init

// 폴더안 config.json 변경 
  //  {
  // "development": {
  //   "dialect": "sqlite",
  //   "storage": "sample.db"
  // },

// ## Directory Structure
// - config : 데이터베이스 연결 설정 정보
// - migrations : sequlize-cli 로 마이그레이션 할 때 생성되는 파일
// - models : sequelize.define 모델 파일들만 보관 디렉토리
// - seeders : 초기 데이터 생성 파일들이 있는 디렉토리 , sequelize-cli

module.exports = (sequelize, DataTypes) => {
  const Todo = sequelize.define(
    "Todo",
    {
      task: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
      },
      completed: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      priority: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
      },
    },
    {
      tableName: "todos",
    }
  );
  return Todo;
};