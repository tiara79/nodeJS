const winston = require("winston");

const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp(), //시간 포맷
    winston.format.simple() //간단 포맷
  ),
  transports: [
    new winston.transports.Console(), // 콘솔에 출력
    new winston.transports.File({ filename: "app.log" }), //app.log 파일에 출력
  ],
}); // logger 설정

const logging = (req, res, next) => {
  const start = Date.now();
  
  // res.on 의 두번째 함수는 요청이 끝났을 때 호출 됨
  res.on("finish", () => {
    const duration = Date.now() - start; // 요청 처리시간
    // 사용 메소드, url - 사용 코드, 요청 처리시간  출력
    logger.info(`${req.method} ${req.url} - ${res.statusCode} (${duration}ms)`);
  });

  next();
};

module.exports = {
  logger,
  logging,
};