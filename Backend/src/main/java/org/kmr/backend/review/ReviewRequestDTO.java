package org.kmr.backend.review;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.*;

@Builder
@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Schema(name = "ReviewRequest DTO", description = "리뷰 요청 DTO")
public class ReviewRequestDTO {
    private String content;
    private Integer rating;
}