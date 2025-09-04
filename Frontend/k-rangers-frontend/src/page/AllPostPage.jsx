import { useLocation, useNavigate } from "react-router-dom";
import AllPostView from "../components/AllPostView";

export default function AllPostPage() {
  const { state } = useLocation();    
  const navigate = useNavigate();

  const title = state?.title ?? "전체 보기";
  const items = state?.items ?? [];   

  return (
    <AllPostView
      title={title}
      items={items}
      onClose={() => navigate(-1)}
    />
  );
}
