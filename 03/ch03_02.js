//npm i winston 설치 후 사용
// https://github.com/winstonjs/winston/tree/master/examples

const winston = require("winston")

// 로깅 레벨(info 이상의 로깅레벨 출력, 간단한 텍스트 형식)
const logger = winston.createLogger({
  level:"info",
  format:winston.format.simple(),
  transports: [
      new winston.transports.Console(),
      new winston.transports.File({
        filename:"app.log",
      }),
  ],
});

console.log("---로그 레벨")
console.log("로그 레벨: error > warn > info > debug >verbose")

logger.info("정보 - 일반적인 정보메세지를 출력할 때는 info를 출력")
logger.error("에러가 발생 했을때 사용")
logger.warn("경고 ! = 주의가 필요할 때만 사용")
logger.debug("디버그 ! - 개발중에만 사용")

// 타임스탬프가 포함된 로그
const simpleLogger = winston.createLogger ({
  level : "info",
  format: winston.format.combine(
  winston.format.timestamp(),
  winston.format.printf(({timestamp, level, message})=>{
     return `${timestamp} [${level}] :${message}`;
  })
),
  transports: [new winston.transports.Console() ],
});

simpleLogger.info("타임스탬프가 포함된 로그")