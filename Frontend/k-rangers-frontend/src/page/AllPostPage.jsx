import { useLocation, useNavigate } from "react-router-dom";
import AllPostView from "../components/AllPostView";

export default function AllPostPage() {
  const { state } = useLocation();    // ← RecommendedList에서 보낸 state 받기
  const navigate = useNavigate();

  const title = state?.title ?? "전체 보기";
  const items = state?.items ?? [];   // ← 없으면 빈 배열

  return (
    <AllPostView
      title={title}
      items={items}
      onClose={() => navigate(-1)}
    />
  );
}
