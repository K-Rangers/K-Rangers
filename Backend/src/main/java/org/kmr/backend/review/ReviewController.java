package org.kmr.backend.review;

import lombok.RequiredArgsConstructor;
import org.kmr.backend.user.domain.User;
import org.kmr.backend.user.repository.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/v1/main/user/reviews")
@RequiredArgsConstructor
public class ReviewController {
    private final ReviewService reviewService;
    private final UserRepository userRepository;

    @PostMapping("/attr/create/{attractionId}")
    public ResponseEntity<ReviewResponseDTO> createReview(@PathVariable Long attractionId,
                                                          @RequestBody ReviewRequestDTO request,
                                                          @AuthenticationPrincipal UserDetails userDetails) {
        User user = userRepository.findByEmail(userDetails.getUsername())
                .orElseThrow(()-> new IllegalArgumentException("해당 사용자가 존재하지 않습니다."));

        ReviewResponseDTO response = reviewService.createReview(attractionId, user, request);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/attr/{attractionId}")
    public ResponseEntity<List<ReviewResponseDTO>> getReviews(@PathVariable Long attractionId) {
        List<ReviewResponseDTO> reviews = reviewService.getReviewsByAttraction(attractionId);
        return ResponseEntity.ok(reviews);
    }

    @GetMapping("/attr/{attractionId}/avg")
    public ResponseEntity<Double> getAvgRating(@PathVariable Long attractionId) {
        Double avg = reviewService.getAvgRatingByAttraction(attractionId);
        return ResponseEntity.ok(avg);
    }

    @GetMapping("/attr/{attractionId}/summary")
    public ResponseEntity<String> getReviewSummary(@PathVariable Long attractionId) {
        String summary = reviewService.getReviewSummary(attractionId);
        return ResponseEntity.ok(summary);
    }

    @PostMapping("/accom/create/{accommodationId}")
    public ResponseEntity<ReviewAccomResponseDTO> createAccomReview(@PathVariable Long accommodationId,
                                                          @RequestBody ReviewAccomRequestDTO request,
                                                          @AuthenticationPrincipal UserDetails userDetails) {
        User user = userRepository.findByEmail(userDetails.getUsername())
                .orElseThrow(()-> new IllegalArgumentException("해당 사용자가 존재하지 않습니다."));

        ReviewAccomResponseDTO response = reviewService.createAccomReview(accommodationId, user, request);
        return ResponseEntity.ok(response);
    }
    @GetMapping("/accom/{accommodationId}")
    public ResponseEntity<List<ReviewAccomResponseDTO>> getAccomReviews(@PathVariable Long accommodationId) {
        List<ReviewAccomResponseDTO> reviews = reviewService.getReviewsByAccommodation(accommodationId);
        return ResponseEntity.ok(reviews);
    }

    @GetMapping("accom/{accommodationId}/avg")
    public ResponseEntity<Double> getAccomAvgRating(@PathVariable Long accommodationId) {
        Double avg = reviewService.getAvgRatingByAccommodation(accommodationId);
        return ResponseEntity.ok(avg);
    }
}