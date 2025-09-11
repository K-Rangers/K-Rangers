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
    private final String phoneNumber;
    private final String restroom;
    private final String elevator;
    private final String parking;
    private final String facility;
    private final String ramp;
    private final String accommodation;
    private final String room;
    private final String latitude;
    private final String longitude;

    public static AccommodationResponse from(Accommodation accommodation) {
        return AccommodationResponse.builder()
                .id(accommodation.getId())
                .name(accommodation.getName())
                .address(accommodation.getAddress())
                .phoneNumber(accommodation.getPhoneNumber())
                .restroom(accommodation.getRestroom())
                .elevator(accommodation.getElevator())
                .parking(accommodation.getAccommodation())
                .facility(accommodation.getFacility())
                .ramp(accommodation.getRamp())
                .accommodation(accommodation.getAccommodation())
                .room(accommodation.getRoom())
                .latitude(accommodation.getLatitude())
                .longitude(accommodation.getLongitude())
                .build();
    }
}
