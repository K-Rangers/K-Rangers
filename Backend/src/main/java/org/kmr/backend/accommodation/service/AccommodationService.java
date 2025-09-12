package org.kmr.backend.accommodation.service;

import lombok.RequiredArgsConstructor;
import org.kmr.backend.accommodation.domain.Accommodation;
import org.kmr.backend.accommodation.repository.AccommodationRepository;
import org.kmr.backend.attraction.domain.Attraction;
import org.kmr.backend.common.DaeguDistrict;
import org.kmr.backend.review.ReviewRepository;
import org.kmr.backend.review.ReviewService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Comparator;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class AccommodationService {
    private final AccommodationRepository accommodationRepository;
    private final ReviewService reviewService;

    public List<Accommodation> findAccommodationsByDistrict(DaeguDistrict district) {
        String districtName = district.getKoreanName();
        List<Accommodation> accommodations = accommodationRepository.findByAddressContaining(districtName);

        accommodations.sort(Comparator.comparing(
                accommodation -> reviewService.getAvgRatingByAccommodation(accommodation.getId()),
                Comparator.reverseOrder()
        ));

        return accommodations;
    }
}
