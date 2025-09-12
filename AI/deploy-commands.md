# AI 서버 배포 명령어

## 1. 기존 컨테이너 정리
```bash
# 기존 AI 서버 컨테이너 중지 및 제거
docker stop k-rangers-ai-server 2>/dev/null || true
docker rm k-rangers-ai-server 2>/dev/null || true

# 기존 이미지 제거 (선택적)
docker rmi ai-k-rangers-ai 2>/dev/null || true
```

## 2. 새로운 컨테이너 빌드 및 실행
```bash
# 이미지 빌드 및 컨테이너 실행
docker-compose up -d --build

# 컨테이너 상태 확인
docker ps
docker logs k-rangers-ai-server
```

## 3. 네트워크 확인
```bash
# gamjanet 네트워크 확인
docker network ls
docker network inspect gamjanet

# AI 서버가 gamjanet에 연결되었는지 확인
docker inspect k-rangers-ai-server | grep NetworkMode
```

## 4. 연결 테스트
```bash
# 호스트에서 AI 서버 테스트
curl http://localhost:8001/

# Backend 컨테이너에서 AI 서버 테스트 (Backend 컨테이너 내부에서)
curl http://k-rangers-ai-server:8001/
```

## Backend 서버 설정 변경 필요사항:
travel.env 파일에서:
```
AI_SERVER_URL=http://k-rangers-ai-server:8001
```
