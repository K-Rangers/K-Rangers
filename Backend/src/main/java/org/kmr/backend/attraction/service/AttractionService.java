package org.kmr.backend.attraction.service;

import lombok.RequiredArgsConstructor;
import org.kmr.backend.attraction.domain.Attraction;
import org.kmr.backend.attraction.repository.AttractionRepository;
import org.kmr.backend.common.DaeguDistrict;
import org.kmr.backend.review.ReviewService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.Comparator;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class AttractionService {
    private final AttractionRepository attractionRepository;
    private final ReviewService reviewService;

    public List<Attraction> findAttractionsByDistrict(DaeguDistrict district) {
        List<Attraction> attractions;

        if (district == DaeguDistrict.ALL) {
            attractions = attractionRepository.findAll();
        } else {
            String districtName = district.getKoreanName();
            attractions = attractionRepository.findByAddressContaining(districtName);
        }

        attractions.sort(Comparator.comparing(
                attraction -> reviewService.getAvgRatingByAttraction(attraction.getId()),
                Comparator.reverseOrder()
        ));

        return attractions;
    }
}
