package org.kmr.backend.review;

import lombok.RequiredArgsConstructor;
import org.kmr.backend.accommodation.domain.Accommodation;
import org.kmr.backend.accommodation.repository.AccommodationRepository;
import org.kmr.backend.ai.dto.request.AISummarizationRequest;
import org.kmr.backend.ai.dto.response.AISummarizationResponse;
import org.kmr.backend.ai.service.AIServiceClient;
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
    private final AIServiceClient aiServiceClient;
    private final AccommodationRepository accommodationRepository;

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

    public List<ReviewResponseDTO> getReviewsByAttraction(Long attractionId) {
        return reviewRepository.findByAttractionIdOrderByCreatedAtDesc(attractionId).stream()
                .map(ReviewEntity::toDTO)
                .collect(Collectors.toList());
    }

    public Double getAvgRatingByAttraction(Long attractionId) {
        Double avg = reviewRepository.findAvgRatingByAttractionId(attractionId);
        if (avg == null) {
            return 0.0;
        }
        return Math.round(avg * 10) / 10.0;
    }

    public String getReviewSummary(Long attractionId) {
        Attraction attraction = attractionRepository.findById(attractionId)
                .orElseThrow(() -> new IllegalArgumentException("해당 관광지가 존재하지 않습니다."));

        List<ReviewEntity> reviews = reviewRepository.findByAttractionIdOrderByCreatedAtDesc(attractionId);

        if (reviews.isEmpty()) {
            return "요약할 리뷰가 없습니다.";
        }

        List<String> reviewContents = reviews.stream()
                .map(ReviewEntity::getContent)
                .collect(Collectors.toList());

        AISummarizationRequest request = new AISummarizationRequest(attraction.getName(), reviewContents);

        AISummarizationResponse response = aiServiceClient.fetchSummary(request);
        return response.getSummary();
    }

    public ReviewAccomResponseDTO createAccomReview(Long accommodationId, User user,ReviewAccomRequestDTO request) {
        Accommodation accommodation = accommodationRepository.findById(accommodationId)
                .orElseThrow(() -> new IllegalArgumentException("해당 숙박시설이 존재하지 않습니다."));

        ReviewEntity review = ReviewEntity.builder()
                .accommodation(accommodation)
                .user(user)
                .content(request.getContent())
                .rating(request.getRating())
                .build();

        return reviewRepository.save(review).toAccomDTO();
    }
    public List<ReviewAccomResponseDTO> getReviewsByAccommodation(Long accommodationId) {
        return reviewRepository.findByAccommodationIdOrderByCreatedAtDesc(accommodationId).stream()
                .map(ReviewEntity::toAccomDTO)
                .collect(Collectors.toList());
    }

    public Double getAvgRatingByAccommodation(Long accommodationId) {
        Double avg = reviewRepository.findAvgRatingByAccommodationId(accommodationId);
        if (avg == null) {
            return 0.0;
        }
        return Math.round(avg * 10) / 10.0;
    }
}