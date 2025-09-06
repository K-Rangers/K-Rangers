export const KAKAO_JS_KEY = process.env.REACT_APP_KAKAO_JS_KEY || "";

if (!KAKAO_JS_KEY) {
  console.warn("[ENV] REACT_APP_KAKAO_JS_KEY is missing. Check your .env.local");
}
