package org.kmr.backend.accommodation.service;

import lombok.RequiredArgsConstructor;
import org.kmr.backend.accommodation.domain.Accommodation;
import org.kmr.backend.accommodation.repository.AccommodationRepository;
import org.kmr.backend.common.DaeguDistrict;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class AccommodationService {

    private final AccommodationRepository accommodationRepository;

    public List<Accommodation> findAccommodationsByDistrict(DaeguDistrict district) {
        String districtName = district.getKoreanName();
        return accommodationRepository.findByAddressContaining(districtName);
    }
}
