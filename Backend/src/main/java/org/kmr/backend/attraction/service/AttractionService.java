package org.kmr.backend.attraction.service;

import com.fasterxml.jackson.databind.ObjectMapper; // Jackson 라이브러리 import
import lombok.RequiredArgsConstructor;
import org.kmr.backend.ai.dto.AIRecommendationRequest;
import org.kmr.backend.ai.dto.AIRecommendationResponse;
import org.kmr.backend.ai.dto.AttractionInfoRequest;
import org.kmr.backend.ai.service.AIServiceClient;
import org.kmr.backend.attraction.domain.Attraction;
import org.kmr.backend.attraction.repository.AttractionRepository;
import org.kmr.backend.common.DaeguDistrict;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.IOException; // 예외 처리를 위한 import
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class AttractionService {

    private final AttractionRepository attractionRepository;
    private final AIServiceClient aiServiceClient;
    private final ObjectMapper objectMapper = new ObjectMapper(); // JSON 변환기 생성

    public List<Attraction> findAttractionsByDistrict(DaeguDistrict district) {
        String districtName = district.getKoreanName();
        return attractionRepository.findByAddressContaining(districtName);
    }

    // --- 이 메서드의 로직 전체를 수정합니다 ---
    public AIRecommendationResponse getRecommendedAttractions(DaeguDistrict district) {
        List<Attraction> attractions = findAttractionsByDistrict(district);

        List<AttractionInfoRequest> attractionInfoRequests = attractions.stream()
                .map(AttractionInfoRequest::from)
                .collect(Collectors.toList());

        AIRecommendationRequest request = new AIRecommendationRequest(attractionInfoRequests);

        // 1. AI 서버로부터 순수한 JSON 문자열을 받습니다.
        String jsonResponse = aiServiceClient.fetchRecommendations(request).block();

        // 2. 받은 원시 데이터를 콘솔에 출력하여 눈으로 확인합니다.
        System.out.println("====================================================");
        System.out.println(">>> AI 서버로부터 받은 실제 응답 (Raw JSON):");
        System.out.println(jsonResponse);
        System.out.println("====================================================");

        // 3. 받은 JSON 문자열을 수동으로 Java 객체로 변환합니다.
        try {
            return objectMapper.readValue(jsonResponse, AIRecommendationResponse.class);
        } catch (IOException e) {
            // 변환에 실패하면, 오류를 출력하고 비어있는 응답을 반환합니다.
            System.err.println(">>> JSON을 객체로 변환하는 데 실패했습니다: " + e.getMessage());
            return new AIRecommendationResponse(); // 비어있는 객체 반환
        }
    }
}
