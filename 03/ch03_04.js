// npm i validator 설치 :    "validator": "^13.15.15"
const validator = require("validator")

const email = "test@example.com"
console.log(`이메일 검증 ${email}은 ${validator.isEmail(email)}`)

// 이메일 검증 test@example.com!은 false 예제
// const email = "test@example.com!" 
// console.log(`이메일 검증 ${email}은 ${validator.isEmail(email)}`)

const url = "www.naver.com"
console.log(`url 검증 ${url}은 ${validator.isURL(url)}`)
// url 검증 www.naver.com은 true

const ip = "3.25.152.150"
console.log(`ip 검증 ${ip}은 ${validator.isIP(ip)}`)
//ip 검증 3.25.152.150은 true

const phone = "010-555-6789"
console.log(`phone 검증 ${phone}은 ${validator.isMobilePhone(phone,"ko-KR")}`)
// phone 검증 010-555-6789은 true

const num1 = "12345"
console.log(`숫자검증 ${num1} ${validator.isNumeric(num1)}`)
//숫자검증 12345 true

const date1  = "2025-08-20"
console.log(`날짜검증 ${date1} ${validator.isDate(date1)}`)
// 날짜검증 2025-08-20 true
