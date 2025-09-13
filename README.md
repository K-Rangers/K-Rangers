## (1) 프로젝트명
<img width="890" height="494" alt="image" src="https://github.com/user-attachments/assets/7418cb79-529b-49c8-8b04-7331996015b0" />

---
## (2) 프로젝트 목표

**“맛집 평점은 쉽게 찾는데, 휠체어 입장은 가능할까?”**

저희는 이 간단한 질문에 대한 답을 찾기 너무나도 어렵다는 현실에서 출발했습니다. 여행을 계획할 때, 누군가에게는 설렘이 가득한 과정이 교통약자에게는 수많은 검색과 전화 문의로 가득한 '넘어야 할 산'이 되곤 합니다.

저희는 그 해답이 실제 방문객들이 남긴 '생생한 리뷰' 속에 숨어있다고 생각했습니다. AI를 통해 이 속에 숨겨진 보석 같은 정보들을 찾아내고, 정말로 필요한 사람들에게 전달해주자. 이것이 저희 프로젝트의 시작이었습니다.

기술을 통해 정보의 장벽을 허물고, 누구나 망설임 없이 떠날 수 있는 세상을 만드는 것. 그것이 이 프로젝트의 목표입니다.

### 개발 기간 

- 2024.08.28 ~ 2024.09.13 ( 약 2주 )

--- 

## (3) 배포 주소

> **https://travel-aiga.netlify.app**

---

## (4) 팀원 소개

| Backend | Backend | Frontend | Frontend |
|:-------:|:-------:|:--------:|:--------:|
| <img src="https://avatars.githubusercontent.com/u/132471478?s=100&v=4" width="100px;" alt=""/> | <img src="https://avatars.githubusercontent.com/u/180482872?v=4" width="100px;" alt=""/> | <img src="https://avatars.githubusercontent.com/u/157056310?v=4" width="100px;" alt=""/> | <img src="https://avatars.githubusercontent.com/u/155972130?s=100&v=4" width="100px;" alt=""/> |
| [**곽희원**](https://github.com/kiw0n) | [**최은서**](https://github.com/eunseo16) | [**이재욱**](https://github.com/Ukja2) | [**현지유**](https://github.com/101nov) |
| Backend | Backend | Frontend | Frontend |

- `곽희원` : OpenAI 기반 리뷰 요약 서비스, 공공데이터 연동 서비스, 회원 시스템 구현 및 서버 배포

- `최은서` : 관광·숙박 상세정보 및 리뷰 기능(생성/조회/삭제), 평점 평균/정렬, 이미지 관리 API 개발

- `현지유` : 하단 네비게이션 바 컴포넌트 제작, 로그인/회원가입/내 정보 페이지 구현 및 API 연동

- `이재욱` : 카카오맵 SDK 연동, 여행지 관련 API 및 컴포넌트 구현, UI 디자인

---

## (5) 프로젝트 소개

본 프로젝트는 교통약자를 위한 여행지 접근성 추천 서비스로, AI가 실제 방문객 리뷰를 분석해 화장실·엘리베이터·주차장 등 접근성 정보를 추출하고, 카카오맵을 통해 여행지를 시각화하여 누구나 쉽고 편리하게 여행지를 찾아볼 수 있도록 했습니다. 

또한 **Progressive Web App(PWA)** 형태로 개발해 모바일에서도 앱처럼 설치해 사용할 수 있습니다.

### 요구사항

```
Node.js: v18.17.0

npm: v9.6.7

React: 18.2.0
```

### 설치 및 실행

1.  **레포지토리를 클론하고 해당 폴더로 이동합니다.**

    ```bash
    git clone [https://github.com/K-Rangers/K-Rangers.git](https://github.com/K-Rangers/K-Rangers.git)
    cd K-Rangers
    ```

2.  **프론트엔드 프로젝트 폴더로 들어갑니다.**

    ```bash
    cd Frontend/k-rangers.frontend
    ```

3.  **필요한 패키지를 설치합니다.**
    
    ```bash
    npm install 
    ```

4.  **개발 서버를 실행합니다.**

    ```bash
    npm start
    ```

### 기술 스택  

**Backend**  
![Spring Boot](https://img.shields.io/badge/SpringBoot-6DB33F?style=for-the-badge&logo=springboot&logoColor=white)![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white)![H2](https://img.shields.io/badge/H2-000000?style=for-the-badge&logo=h2&logoColor=white)![JPA](https://img.shields.io/badge/JPA-59666C?style=for-the-badge&logo=hibernate&logoColor=white)  

**Frontend**  
![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)  

**Deployment**  
![Netlify](https://img.shields.io/badge/Netlify-00C7B7?style=for-the-badge&logo=netlify&logoColor=white)  

**External API & Data**  
![OpenAI](https://img.shields.io/badge/OpenAI-412991?style=for-the-badge&logo=openai&logoColor=white)![KakaoMap](https://img.shields.io/badge/KakaoMap-FFCD00?style=for-the-badge&logo=kakao&logoColor=black)![PublicData](https://img.shields.io/badge/공공데이터포털-00A0E2?style=for-the-badge&logo=data&logoColor=white)  


### 주요 기능
1. 맞춤 필터링 검색

- 원하는 지역과 필수 편의시설(엘리베이터, 경사로, 장애인 화장실 등)을 직접 선택하여 조건에 꼭 맞는 여행지만 추천받을 수 있습니다.

2. 카카오맵 연동 시각화
- 추천된 여행지들의 위치를 카카오맵 지도 위에 마커로 표시하여 한눈에 위치와 동선을 파악할 수 있습니다.

3. AI 기반 여행지 추천
- AI가 수많은 방문객 리뷰를 분석하여 숨겨진 접근성 정보를 찾아내고, 사용자에게 만족도가 가장 높을 여행지를 추천합니다.
