1. start

```
npm install
npm run build > npm run start
or
npm run dev (nodemon)
```

2. 구조

root/
 ├── public/                     # 프론트엔드 관련 정적 파일
 ├── src/
 │   ├── app/                    # Presentation Layer
 │   │   ├── payment/
 │   │   │   ├── payment.controller.ts
 │   │   │   ├── payment.route.ts
 │   │
 │   │
 │   ├── common/                  # 공통 유틸리티 및 미들웨어
 │   │   ├── constants/           
 │   │   ├── exception/
 │   │   ├── middlewares/          
 │   │
 │   │
 │   ├── config/                   # 환경 변수 및 DI Container등
 │   │
 │   │
 │   ├── domain/                   # Business Layer
 │   │   ├── payment/
 │   │   │   ├── dto/
 │   │   │   │   ├── payment-request.dto.ts
 │   │   │   ├── payment.service.ts
 │   │
 │   │
 │   ├── external/                  # 3rd party 관리 (Infra로 통합)
 │   │   ├── portone/
 │   │   │   ├── portone-api.provider.ts
 │   │
 │   │
 │   ├── routes/                     # 전역 라우트
 │   │   ├── index.ts
 │   │
 │   │
 │   ├── test/                       # 테스트
 │   │
 │   │
 │   ├── utils/                      
 │   │
 │   │
 │   ├── app.ts                    
 │   ├── server.ts                 
 
