package org.kmr.backend.review;

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
}