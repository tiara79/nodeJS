# nodeJS

# 체크리스트 시스템 백엔드 만들기
# 첫번째 요구사항

<!-- 
여행을 갈 경우
2025년 여름 휴가 준비물 : 여권, 충전기, 세면도구, .. 옷류, 점퍼.. 
캠핑 준비물 : 텐트, 의자, 랜턴, 침낭..

백엔드 작성
테이블 설계도 : 
- 아이디 pk -> id integer
- 캠핑 준비물, 여행 휴가 준비물을 담을 수 있는 그룹핑 항목 -> category text
- 실제 준비해야 할 물건 -> item text
- 수량 -> amount integer
- 체크 여부 -> checkyn boolean

-> REST API
POST /checkList -> 체크리스트 입력
GET /checkList?category -> 여름 휴가 준비물
PUT /checkList/:id -> 체크 여부를 toggle 0->1, 1->0
DELETE /checkList/:id 
-->