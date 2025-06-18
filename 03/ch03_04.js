
// const password1 = "password123!"
const password2 = "Password123!"
// const v1 = validator.isStrongPassword(password1,{
const v1 = validator.isStrongPassword(password2,{
  minLength : 8,
  minLowercase : 1,
  minUppercase: 1,
  minNumbers : 1,
  minSymbols : 1,
});
// console.log(`비밀번호 ${password1} 은 ${v1}`);
console.log(`비밀번호 ${password2} 은 ${v1}`);
// 결과 : (대문자 빠짐)
// 비밀번호 password123! 은 false

//비밀번호 Password123! 은 true
