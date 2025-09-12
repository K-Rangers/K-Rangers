package org.kmr.backend.review.api;

import lombok.RequiredArgsConstructor;
import org.kmr.backend.review.dto.ReviewRequestDTO;
import org.kmr.backend.review.dto.ReviewResponseDTO;
import org.kmr.backend.review.service.ReviewService;
import org.kmr.backend.review.dto.ReviewAccomRequestDTO;
import org.kmr.backend.review.dto.ReviewAccomResponseDTO;
import org.kmr.backend.user.domain.User;
import org.kmr.backend.user.repository.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequiredArgsConstructor
public class ReviewController {
    private final ReviewService reviewService;
    private final UserRepository userRepository;

    @PostMapping("/v1/main/user/reviews/attr/create/{attractionId}")
    public ResponseEntity<ReviewResponseDTO> createReview(@PathVariable Long attractionId,
                                                          @RequestBody ReviewRequestDTO request,
                                                          @AuthenticationPrincipal UserDetails userDetails) {
        User user = userRepository.findByEmail(userDetails.getUsername())
                .orElseThrow(()-> new IllegalArgumentException("해당 사용자가 존재하지 않습니다."));

        ReviewResponseDTO response = reviewService.createReview(attractionId, user, request);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/v1/main/reviews/attr/{attractionId}")
    public ResponseEntity<List<ReviewResponseDTO>> getReviews(@PathVariable Long attractionId) {
        List<ReviewResponseDTO> reviews = reviewService.getReviewsByAttraction(attractionId);
        return ResponseEntity.ok(reviews);
    }

    @GetMapping("/v1/main/reviews/attr/{attractionId}/avg")
    public ResponseEntity<Double> getAvgRating(@PathVariable Long attractionId) {
        Double avg = reviewService.getAvgRatingByAttraction(attractionId);
        return ResponseEntity.ok(avg);
    }

    @GetMapping("/v1/main/reviews/attr/{attractionId}/summary")
    public ResponseEntity<String> getReviewSummary(@PathVariable Long attractionId) {
        String summary = reviewService.getReviewSummary(attractionId);
        return ResponseEntity.ok(summary);
    }

    @PostMapping("/v1/main/user/reviews/accom/create/{accommodationId}")
    public ResponseEntity<ReviewAccomResponseDTO> createAccomReview(@PathVariable Long accommodationId,
                                                                    @RequestBody ReviewAccomRequestDTO request,
                                                                    @AuthenticationPrincipal UserDetails userDetails) {
        User user = userRepository.findByEmail(userDetails.getUsername())
                .orElseThrow(()-> new IllegalArgumentException("해당 사용자가 존재하지 않습니다."));

        ReviewAccomResponseDTO response = reviewService.createAccomReview(accommodationId, user, request);
        return ResponseEntity.ok(response);
    }
    
    @GetMapping("/v1/main/reviews/accom/{accommodationId}")
    public ResponseEntity<List<ReviewAccomResponseDTO>> getAccomReviews(@PathVariable Long accommodationId) {
        List<ReviewAccomResponseDTO> reviews = reviewService.getReviewsByAccommodation(accommodationId);
        return ResponseEntity.ok(reviews);
    }

    @GetMapping("/v1/main/reviews/accom/{accommodationId}/avg")
    public ResponseEntity<Double> getAccomAvgRating(@PathVariable Long accommodationId) {
        Double avg = reviewService.getAvgRatingByAccommodation(accommodationId);
        return ResponseEntity.ok(avg);
    }

    @DeleteMapping("/v1/main/user/reviews/{reviewId}")
    public ResponseEntity<Void> deleteReview(@PathVariable Long reviewId, @AuthenticationPrincipal UserDetails userDetails) {
        User user = userRepository.findByEmail(userDetails.getUsername())
                .orElseThrow(() -> new IllegalArgumentException("해당 사용자가 존재하지 않습니다."));
        reviewService.deleteReview(reviewId, user);
        return ResponseEntity.noContent().build();
    }
}