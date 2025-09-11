package org.kmr.backend.review;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.*;

@Builder
@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Schema(name = "Review Accommodation Request DTO", description = "숙박시설 리뷰 요청 DTO")
public class ReviewAccomRequestDTO {
    private String content;
    private Integer rating;
}
