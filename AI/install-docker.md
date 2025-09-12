# Docker 설치 가이드 (Ubuntu)

## 1. 시스템 업데이트
```bash
sudo apt update
sudo apt upgrade -y
```

## 2. Docker 설치 (공식 방법)
```bash
# 필요한 패키지 설치
sudo apt install apt-transport-https ca-certificates curl software-properties-common -y

# Docker GPG 키 추가
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg

# Docker 저장소 추가
echo "deb [arch=amd64 signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

# Docker 설치
sudo apt update
sudo apt install docker-ce docker-ce-cli containerd.io docker-compose-plugin -y
```

## 3. Docker 서비스 시작
```bash
sudo systemctl start docker
sudo systemctl enable docker
```

## 4. 사용자를 docker 그룹에 추가 (sudo 없이 사용하기 위해)
```bash
sudo usermod -aG docker $USER
```

**중요: 이 명령어 후에는 로그아웃 후 다시 로그인해야 합니다!**

## 5. 설치 확인
```bash
# 재로그인 후
docker --version
docker compose version
```

## 6. 빠른 설치 (snap 사용 - 간단하지만 권장하지 않음)
```bash
sudo snap install docker
```

## 추천: 공식 방법 사용
snap 대신 공식 Docker 저장소에서 설치하는 것을 강력히 추천합니다.
