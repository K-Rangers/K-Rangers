package org.kmr.backend.review.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.*;

@Builder
@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Schema(name = "ReviewRequest DTO", description = "관광지 리뷰 요청 DTO")
public class ReviewRequestDTO {
    private String content;
    private Integer rating;
}