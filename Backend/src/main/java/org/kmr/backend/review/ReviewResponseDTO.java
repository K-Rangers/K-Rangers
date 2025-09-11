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
@Schema(name = "ReviewResponse DTO", description = "리뷰 응답 DTO")
public class ReviewResponseDTO {
    private Long attractionId;
    private String attractionName;
    private Long userId;
    private String userName;
    private String content;
    private Integer rating;
    private LocalDateTime createdAt;
}