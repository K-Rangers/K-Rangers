package org.kmr.backend.accommodation.api;

import lombok.RequiredArgsConstructor;
import org.kmr.backend.accommodation.domain.Accommodation;
import org.kmr.backend.accommodation.dto.response.AccommodationResponse;
import org.kmr.backend.accommodation.service.AccommodationService;
import org.kmr.backend.common.DaeguDistrict;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;

@RestController
@RequestMapping("/v1/main/user/accommodations")
@RequiredArgsConstructor
public class AccommodationApi {
    private final AccommodationService accommodationService;

    @GetMapping("/by-district/{district}")
    public ResponseEntity<List<AccommodationResponse>> getAccommodationsByDistrict(@PathVariable DaeguDistrict district) {
        List<Accommodation> accommodations = accommodationService.findAccommodationsByDistrict(district);

        List<AccommodationResponse> responseDtos = accommodations.stream()
                .map(AccommodationResponse::from)
                .toList();

        return ResponseEntity.ok(responseDtos);
    }
}
