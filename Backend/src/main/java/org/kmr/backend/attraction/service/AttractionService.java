package org.kmr.backend.attraction.service;

import lombok.RequiredArgsConstructor;
import org.kmr.backend.attraction.domain.Attraction;
import org.kmr.backend.attraction.repository.AttractionRepository;
import org.kmr.backend.common.DaeguDistrict;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class AttractionService {
    private final AttractionRepository attractionRepository;

    public List<Attraction> findAttractionsByDistrict(DaeguDistrict district) {
        String districtName = district.getKoreanName();
        return attractionRepository.findByAddressContaining(districtName);
    }
}
