import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import AllPostView from "../components/CardOption/AllPostView";
import styles from "../css/PageCss/AllPostPage.module.css";

function AllPostPage() {
    const { state } = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const title = state?.title ?? "";
    const items = state?.items ?? [];
    const reviews = state?.reviews ?? [];
    const reason = state?.reasons ?? [];

    return (
        <div className={styles.app}>
            <div className={styles.phone}>
                <div className={styles.content}>
                    <AllPostView
                        title={title}
                        items={items}
                        onClose={() => navigate(-1)}
                        reviews={reviews}
                        reasons = {reason}
                    />
                </div>
            </div>
        </div>
    );
}

export default AllPostPage;