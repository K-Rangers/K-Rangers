package org.kmr.backend.attraction.dto.response;
import org.kmr.backend.attraction.domain.Attraction;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class AttractionResponse {

    private final Long id;
    private final String name;
    private final String address;

    public static AttractionResponse from(Attraction attraction) {
        return AttractionResponse.builder()
                .id(attraction.getId())
                .name(attraction.getName())
                .address(attraction.getAddress())
                .build();
    }
}