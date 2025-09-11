package org.kmr.backend.attraction.api;

import lombok.RequiredArgsConstructor;
import org.kmr.backend.attraction.domain.Attraction;
import org.kmr.backend.attraction.dto.response.AttractionResponse;
import org.kmr.backend.attraction.service.AttractionService;
import org.kmr.backend.common.DaeguDistrict;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;

@RestController
@RequestMapping("/v1/main/attractions")
@RequiredArgsConstructor
public class AttractionApi {
    private final AttractionService attractionService;


    @GetMapping("/by-district/{district}")
    public ResponseEntity<List<AttractionResponse>> getAttractionsByDistrict(@PathVariable DaeguDistrict district) {
        List<Attraction> attractions = attractionService.findAttractionsByDistrict(district);

        List<AttractionResponse> responseDtos = attractions.stream()
                .map(AttractionResponse::from)
                .toList();

        return ResponseEntity.ok(responseDtos);
    }
}
