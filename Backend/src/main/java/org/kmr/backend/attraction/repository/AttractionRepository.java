package org.kmr.backend.attraction.repository;

import org.kmr.backend.attraction.domain.Attraction;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AttractionRepository extends JpaRepository<Attraction, Long> {

    List<Attraction> findByAddressContaining(String districtName);
}
