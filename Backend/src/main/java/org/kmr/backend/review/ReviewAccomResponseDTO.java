package org.kmr.backend.review;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.*;

import java.time.LocalDateTime;

@Builder
@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Schema(name = "Review Accommodation Response DTO", description = "숙박시설 리뷰 요청 DTO")
public class ReviewAccomResponseDTO {
    private Long accommodationId;
    private String accommodationName;
    private Long userId;
    private String userName;
    private String content;
    private Integer rating;
    private LocalDateTime createdAt;
}
