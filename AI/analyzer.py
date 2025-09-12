import os
from openai import OpenAI
from dotenv import load_dotenv

# .env 파일 로드
load_dotenv()

try:
    api_key = os.getenv('OPENAI_API_KEY')
    if not api_key or api_key == 'your-openai-api-key-here' or api_key == '':
        raise ValueError("OPENAI_API_KEY 환경변수가 설정되지 않았습니다.")
    
    client = OpenAI(api_key=api_key)
    API_KEY_CONFIGURED = True
    print(f"--- [성공] OpenAI API 키가 정상적으로 설정되었습니다. ---")
except Exception as e:
    print(f"--- [경고] OpenAI API 키가 설정되지 않았습니다. 분석 기능을 스킵합니다. ---")
    print(f"--- 에러: {e} ---")
    client = None
    API_KEY_CONFIGURED = False

def summarize_reviews_with_openai(place_name: str, reviews: list[str]) -> str:
    """
    OpenAI API를 사용하여 주어진 리뷰 텍스트 목록을 요약합니다.
    """
    if not API_KEY_CONFIGURED:
        return f"'{place_name}'에 대한 AI 요약을 건너뛰었습니다. (API 키 미설정)"

    print(f"--- [AI 요약 시작] '{place_name}'의 리뷰 {len(reviews)}개를 OpenAI로 보냅니다. ---")

    reviews_text = "\n- ".join(reviews)

    prompt_messages = [
        {
            "role": "system",
            "content": "당신은 장애인을 위한 여행 리뷰 전문 분석가입니다. 주어진 방문객 리뷰들을 바탕으로, 해당 장소의 특징과 분위기를 알 수 있도록 핵심 내용을 1~2문장으로 요약하는 역할을 맡았습니다. 긍정적인 점과 부정적인 점을 객관적으로 포함하여, 다음 방문객에게 유용한 정보를 제공하는 스타일로 추천하는 글을 작성해주세요."
        },
        {
            "role": "user",
            "content": f"""
            장소 이름: {place_name}

            아래는 이 장소에 대한 실제 방문객 리뷰 목록입니다.
            ---
            - {reviews_text}
            ---

            이 리뷰들을 종합적으로 분석해서, 이 장소의 핵심적인 특징을 요약 및 추천해주세요.
            """
        }
    ]

    try:
        response = client.chat.completions.create(
            model="gpt-4.1-nano-2025-04-14",
            messages=prompt_messages,
            temperature=0.6,
            max_tokens=300
        )

        summary = response.choices[0].message.content
        print(f"--- [AI 요약 완료] 요약문 생성 성공! ---")
        return summary.strip()

    except Exception as e:
        print(f"--- [오류] OpenAI API 호출 중 에러가 발생했습니다: {e} ---")
        return f"'{place_name}'에 대한 리뷰를 요약하는 데 실패했습니다."