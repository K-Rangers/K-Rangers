package org.kmr.backend.ai.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.kmr.backend.attraction.domain.Attraction;

@Getter
@AllArgsConstructor
public class AttractionInfoRequest {
    private Long id;
    private String name;
    // url 필드를 다시 제거합니다.

    // from 정적 메서드도 원래대로 복원합니다.
    public static AttractionInfoRequest from(Attraction attraction) {
        return new AttractionInfoRequest(attraction.getId(), attraction.getName());
    }
}
