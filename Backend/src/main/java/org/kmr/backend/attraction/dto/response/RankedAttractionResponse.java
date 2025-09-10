package org.kmr.backend.attraction.dto.response;

import lombok.Builder;
import lombok.Getter;
import org.kmr.backend.attraction.domain.Attraction;

@Getter
@Builder
public class RankedAttractionResponse {
    private int rank; // 순위
    private Long id;
    private String name;
    private String address;
    private String recommendation; // AI의 추천 문구
    private double score; // AI가 계산한 점수

    public static RankedAttractionResponse of(int rank, Attraction attraction, String recommendation, double score) {
        return RankedAttractionResponse.builder()
                .rank(rank)
                .id(attraction.getId())
                .name(attraction.getName())
                .address(attraction.getAddress())
                .recommendation(recommendation)
                .score(score)
                .build();
    }
}
