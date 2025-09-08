package org.kmr.backend.review;

import lombok.RequiredArgsConstructor;
import org.kmr.backend.attraction.domain.Attraction;
import org.kmr.backend.attraction.repository.AttractionRepository;
import org.kmr.backend.user.domain.User;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ReviewService {
    private final ReviewRepository reviewRepository;
    private final AttractionRepository attractionRepository;

    // 리뷰 생성
    public ReviewResponseDTO createReview(Long attractionId, User user,ReviewRequestDTO request) {
        Attraction attraction = attractionRepository.findById(attractionId)
                .orElseThrow(()-> new IllegalArgumentException("해당 관광지가 존재하지 않습니다."));

        ReviewEntity review = ReviewEntity.builder()
                .attraction(attraction)
                .user(user)
                .content(request.getContent())
                .rating(request.getRating())
                .build();

        return reviewRepository.save(review).toDTO();
    }

    // 관광지별 모든 리뷰 조회
    public List<ReviewResponseDTO> getReviewsByAttraction(Long attractionId) {
        return reviewRepository.findByAttractionIdOrderByCreatedAtDesc(attractionId).stream()
                .map(ReviewEntity::toDTO)
                .collect(Collectors.toList());
    }

    // 관광지별 평균 평점 조회
    public Double getAvgRatingByAttraction(Long attractionId) {
        Double avg = reviewRepository.findAvgRatingByAttractionId(attractionId);
        if (avg == null) {
            return 0.0;
        }
        return Math.round(avg * 10) / 10.0;
    }
}
