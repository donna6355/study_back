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


# Dockerfile
# - Config image. Run line by line and create layers during build time. Layer can be reused when build similar image
# - Commands
# - FROM: Set base image. e.g. ubuntu:18.04, node:20
# - RUN: Run command usully to install somehing e.g. npm install
# - CMD: Run command when image started
# - ARG: Set ARG
# - ENV: Set ENV
# - COPY: Copy local file/directory to image
# - ADD: Similar to COPY but also supports tar auto-extraction and URLs
# - EXPOSE: Set port to export

# - Core commands
# docker images: Show the list of images
#     - docker build: Create image with Dockerfile
#         - t: name and tag to identify image (Without this, still accessible with hash)
#         - -build-arg: set ARGs
#         - f: Select docker file manually
#     - docker rmi: Remove image
#     - docker run: Run image and create container
#         - -restart no/always/unless
#         - p: Port bind
#         - e
#         - -env-file: Set ENVs with file
#         - i: Interactive
#         - t: Can use terminal
#         - it
#     - docker ps: Show containers
#         - a: Show every con
# - docker ps: Show containers
# - -a: Show every containers regardless stoped or running (Without this, shows only running items)
# - status:
#     - docker logs: Watch logs of container
#         - f: Live
#     - docker restart: Restart container
#     - docker stop: Stop container
#     - docker rm: Remove container
#         - f: Force to remove a running container
#     - docker push: Upload a image to a remote registry
# - Practice
#     - docker build .
#     - docker run -it -p 3000:3000 --env-file .env 998