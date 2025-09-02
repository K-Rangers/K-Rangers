package org.kmr.backend.accommodation.repository;

import org.kmr.backend.accommodation.domain.Accommodation;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AccommodationRepository extends JpaRepository<Accommodation, Long> {

    List<Accommodation> findByAddressContaining(String districtName);
}
