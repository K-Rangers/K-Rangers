package org.kmr.backend.accommodation.dto.response;

import lombok.Builder;
import lombok.Getter;
import org.kmr.backend.accommodation.domain.Accommodation;

@Getter
@Builder
public class AccommodationResponse {

    private final Long id;
    private final String name;
    private final String address;

    public static AccommodationResponse from(Accommodation accommodation) {
        return AccommodationResponse.builder()
                .id(accommodation.getId())
                .name(accommodation.getName())
                .address(accommodation.getAddress())
                .build();
    }
}
