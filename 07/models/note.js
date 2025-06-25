// 속성	      설명
// 아이디(id)	노트 아이디
// 제목(title)	노트 제목(간단한)
// 내용(content)	노트 본문(자세한)
// 태그(tag)	태그 (예, 공부, 일기, 강의 백앤드 등)
// 생성 시각	노트 생성시각
// 수정 시각	노트 수정시각
module.exports = (sequelize, DataTypes) => {
  const Note = sequelize.define(
    "Note",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      tag: {
        type: DataTypes.ENUM("공부", "일기", "강의", "백앤드"),
        allowNull: false,
      },
    },
    {
      tableName: "notes",timestamps: true,
    }
  );
  return Note;
};