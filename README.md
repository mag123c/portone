1. start
 host: localhost
 port: 3000

```
npm install
npm run build > npm run start
or
npm run dev (nodemon)
```

2. API
  - POST api/v1/payemnts

3. 구조
 - public: 간단한 결제 연동 Form FE
 - src
   - app: Presentation Layer
   - domain: Business Layer
   - external: 3rd-party (Infra)
   - routes: 전역 routes
   - common: 공통 미들웨어, 상수 관리 등
   - config: 앱 설정 (환경변수, DI Container 등)
   - utils: 유틸리티
