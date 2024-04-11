# 기반 이미지로 Node.js v20.11.1을 사용
FROM node:20.11.1

# 앱 디렉토리 생성
WORKDIR /usr/src/app

# 애플리케이션 의존성 파일 복사
# package.json 및 epackage-lock.json (있을 경우)
# COPY할 때 물론 package*.json이 딸려 오지만 이렇게 하는 까닭은 레이어 캐싱을 효과적으로 사용하기 위함
COPY package*.json ./

# 패키지 설치
RUN npm ci --production

# 앱 소스 추가
COPY . .

# 앱이 사용할 포트를 지정
EXPOSE 3000

# 앱 실행
CMD [ "node", "index.js" ]