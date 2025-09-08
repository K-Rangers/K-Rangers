package org.kmr.backend.attraction.dto.response;
import org.kmr.backend.attraction.domain.Attraction;

import lombok.Builder;
import lombok.Getter;
import org.kmr.backend.common.TourCategory;

@Getter
@Builder
public class AttractionResponse {

    private final Long id;
    private final String name;
    private final String address;
    private final String elevator;
    private final String parking;
    private final String facility;
    private final String ramp;
    private final String informationCenter;
    private final String restroom;
    private final String wheelchairRental;
    private final String restaurant;
    private final String tableType;
    private final String lift;
    private final TourCategory category;

    public static AttractionResponse from(Attraction attraction) {
        return AttractionResponse.builder()
                .id(attraction.getId())
                .name(attraction.getName())
                .address(attraction.getAddress())
                .elevator(attraction.getElevator())
                .parking(attraction.getParking())
                .facility(attraction.getFacility())
                .ramp(attraction.getRamp())
                .informationCenter(attraction.getInformationCenter())
                .restroom(attraction.getRestroom())
                .wheelchairRental(attraction.getWheelchairRental())
                .restaurant(attraction.getRestaurant())
                .tableType (attraction.getTableType())
                .lift(attraction.getLift())
                .category(attraction.getCategory())
                .build();
    }
}