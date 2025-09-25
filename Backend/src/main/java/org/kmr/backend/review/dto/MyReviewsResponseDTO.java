package org.kmr.backend.review.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class MyReviewsResponseDTO {
    private List<ReviewResponseDTO> attractionReviews;
    private List<ReviewAccomResponseDTO> accommodationReviews;
}
