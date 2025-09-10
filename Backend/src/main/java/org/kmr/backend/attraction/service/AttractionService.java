package org.kmr.backend.attraction.service;

// import com.fasterxml.jackson.databind.ObjectMapper; // 삭제
import lombok.RequiredArgsConstructor;
// import org.kmr.backend.ai.dto.AIRecommendationRequest; // 삭제
// import org.kmr.backend.ai.dto.AIRecommendationResponse; // 삭제
// import org.kmr.backend.ai.dto.AttractionInfoRequest; // 삭제
// import org.kmr.backend.ai.service.AIServiceClient; // 삭제
import org.kmr.backend.attraction.domain.Attraction;
import org.kmr.backend.attraction.repository.AttractionRepository;
import org.kmr.backend.common.DaeguDistrict;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

// import java.io.IOException; // 삭제
import java.util.List;
// import java.util.stream.Collectors; // 삭제

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class AttractionService {

    private final AttractionRepository attractionRepository;
    // private final AIServiceClient aiServiceClient; // 삭제
    // private final ObjectMapper objectMapper = new ObjectMapper(); // 삭제

    public List<Attraction> findAttractionsByDistrict(DaeguDistrict district) {
        String districtName = district.getKoreanName();
        return attractionRepository.findByAddressContaining(districtName);
    }

    // --- 더 이상 사용하지 않는 AI 추천 관련 메서드를 모두 삭제합니다. ---
    /*
    public AIRecommendationResponse getRecommendedAttractions(DaeguDistrict district) {
        // ... (모든 내용 삭제)
    }
    */
}
