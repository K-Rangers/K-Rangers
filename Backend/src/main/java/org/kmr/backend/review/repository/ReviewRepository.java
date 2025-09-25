package org.kmr.backend.review.repository;

import org.kmr.backend.review.domain.ReviewEntity;
import org.kmr.backend.user.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ReviewRepository extends JpaRepository<ReviewEntity, Long> {
    List<ReviewEntity> findByAttractionIdOrderByCreatedAtDesc(Long attraction);
    @Query("SELECT AVG(r.rating) FROM ReviewEntity r WHERE r.attraction.id =:attractionId")
    Double findAvgRatingByAttractionId(@Param("attractionId") Long attractionId);
    List<ReviewEntity> findByAccommodationIdOrderByCreatedAtDesc(Long attraction);
    @Query("SELECT AVG(r.rating) FROM ReviewEntity r WHERE r.accommodation.id =:accommodationId")
    Double findAvgRatingByAccommodationId(@Param("accommodationId") Long accommodationId);

    List<ReviewEntity> findByUserOrderByCreatedAtDesc(User user);
}