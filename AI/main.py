from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from typing import List
from analyzer import summarize_reviews_with_openai

app = FastAPI(
    title="K-Rangers AI-Server",
    description="관광지 리뷰 요약을 위한 AI 분석 서버입니다.",
    version="1.0.0"
)

# CORS 설정 추가
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # 개발 환경에서는 모든 오리진 허용
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class SummarizationRequest(BaseModel):
    """Backend로부터 받을 리뷰 요약 요청 모델"""
    place_name: str = Field(..., description="관광지 이름")
    reviews: List[str] = Field(..., description="요약할 리뷰 텍스트 목록")

class SummarizationResponse(BaseModel):
    """AI 서버가 Backend로 보낼 요약 응답 모델"""
    summary: str = Field(..., description="AI가 생성한 요약문")

@app.post(
    "/summarize-reviews",
    response_model=SummarizationResponse,
    summary="리뷰 요약 생성",
    description="리뷰 텍스트 목록을 받아 OpenAI를 통해 요약문을 생성합니다."
)
async def summarize_reviews(request: SummarizationRequest):
    """
    Backend 서버로부터 관광지 이름과 리뷰 목록을 받아 요약 로직을 수행하는 API입니다.
    """
    print("="*50)
    print(f">>> '{request.place_name}' 리뷰 요약 요청을 받았습니다! <<<")
    
    summary_text = summarize_reviews_with_openai(request.place_name, request.reviews)
    
    print(">>> 요약 완료. Backend 서버로 최종 결과를 응답합니다. <<<")

    return SummarizationResponse(summary=summary_text)

@app.get("/", summary="서버 상태 확인")
def read_root():
    """서버가 정상적으로 실행 중인지 확인하는 기본 엔드포인트입니다."""
    return {"status": "K-Rangers AI Server is running!"}