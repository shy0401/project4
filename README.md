이 프로젝트는 다운로드 후 아래 단계를 수행하면 바로 실행할 수 있습니다:

프로젝트 디렉터리로 이동: cd pj4
필수 패키지 설치: npm install
앱 실행: npm start
브라우저에서 http://localhost:3000을 열어 확인


프로젝트는 환경 변수 파일을 사용하여 API 키를 관리합니다. 개발과 프로덕션 환경에 따라 각각 다른 파일을 사용합니다.

개발 환경 (.env):
VITE_KAKAO_REST_API_KEY=
VITE_KAKAO_REDIRECT_URI=http://localhost:3000/auth
VITE_TMDB_API_KEY=

개발 환경 (.env-dev):
VITE_KAKAO_REST_API_KEY=
VITE_KAKAO_REDIRECT_URI=http://localhost:3000/auth
VITE_TMDB_API_KEY=

배포 환경 (.env-prod)
VITE_KAKAO_REST_API_KEY=
VITE_KAKAO_REDIRECT_URI=http://localhost:3000/auth
VITE_TMDB_API_KEY=

yaml 코드 복사 주의: .env 파일은 버전 관리 시스템에 포함하지 않도록 .gitignore에 추가하세요.



프로젝트 디렉터리로 이동: cd pj4
종속성 설치: npm install
앱 실행: npm start
테스트 실행: npm test
앱 빌드: npm run build
설정 노출: npm run eject

