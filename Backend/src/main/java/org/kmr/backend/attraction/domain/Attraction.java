package org.kmr.backend.attraction.domain;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.kmr.backend.common.TourCategory;

@Entity
@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Attraction {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String address;
    private String elevator;
    private String parking;
    private String facility;
    private String ramp;
    private String informationCenter;
    private String restroom;
    private String wheelchairRental;
    private String restaurant;
    private String tableType;
    private String lift;

    @Enumerated(EnumType.STRING)
    private TourCategory category;

    public Attraction(String name, String address, String elevator, String parking, String facility,
                      String ramp, String informationCenter, String restroom,
                      String wheelchairRental, String restaurant, String tableType, String lift, TourCategory category) {
        this.name = name;
        this.address = address;
        this.elevator = elevator;
        this.parking = parking;
        this.facility = facility;
        this.ramp = ramp;
        this.informationCenter = informationCenter;
        this.restroom = restroom;
        this.wheelchairRental = wheelchairRental;
        this.restaurant = restaurant;
        this.tableType = tableType;
        this.lift = lift;
        this.category = category;
    }
}
