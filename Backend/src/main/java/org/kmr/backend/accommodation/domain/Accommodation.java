package org.kmr.backend.accommodation.domain;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Accommodation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String address;
    private String phoneNumber;
    private String restroom;
    private String elevator;
    private String parking;
    private String facility;
    private String ramp;
    private String accommodation;
    private String room;
    private String latitude;
    private String longitude;

    public Accommodation(String name, String address, String phoneNumber, String restroom, String elevator,
                         String parking, String facility, String ramp, String accommodation, String room,
                         String latitude, String longitude) {
        this.name = name;
        this.address = address;
        this.phoneNumber = phoneNumber;
        this.restroom = restroom;
        this.elevator = elevator;
        this.parking = parking;
        this.facility = facility;
        this.ramp = ramp;
        this.accommodation = accommodation;
        this.room = room;
        this.latitude = latitude;
        this.longitude = longitude;
    }
}
