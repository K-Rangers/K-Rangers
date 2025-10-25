#!/bin/bash

DEPLOY_DIR="/home/ubuntu/cicd" 

echo "--- 배포 시작: $(date) ---"

echo "> 현재 실행 중인 애플리케이션 PID 확인"
CURRENT_PID=$(ps -ef | grep "java -jar $DEPLOY_DIR/.*\.jar" | grep -v grep | awk '{print $2}')

if [ -z "$CURRENT_PID" ]; then
    echo "> 현재 실행 중인 애플리케이션이 없습니다."
else
    echo "> 실행 중인 애플리케이션 발견 (PID: $CURRENT_PID)"
    echo "> 애플리케이션(PID: $CURRENT_PID)을 종료합니다."
    kill -15 $CURRENT_PID
    sleep 5 
fi

echo "> 새 애플리케이션 JAR 파일 확인"
JAR_PATH=$(ls -t $DEPLOY_DIR/*.jar | head -n 1)

if [ -z "$JAR_PATH" ]; then
    echo "> 오류: $DEPLOY_DIR 디렉토리에서 JAR 파일을 찾을 수 없습니다."
    exit 1
fi

echo "> 실행할 JAR 파일: $JAR_PATH"

echo "> 새 애플리케이션을 백그라운드로 실행합니다."
nohup java -jar $JAR_PATH > $DEPLOY_DIR/nohup.out 2>&1 &

echo "--- 배포 완료 ---"
