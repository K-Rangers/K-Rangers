package org.kmr.backend.review.domain;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.kmr.backend.accommodation.domain.Accommodation;
import org.kmr.backend.attraction.domain.Attraction;
import org.kmr.backend.review.dto.ReviewResponseDTO;
import org.kmr.backend.review.dto.ReviewAccomResponseDTO;
import org.kmr.backend.user.domain.User;
import java.time.LocalDateTime;

@Entity
@Table(name="t_review")
@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ReviewEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "attraction_id")
    private Attraction attraction;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;


    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "accommodation_id")
    private Accommodation accommodation;

    @Lob
    private String content;

    @CreationTimestamp
    private LocalDateTime createdAt;

    private Integer rating;

    public ReviewResponseDTO toDTO() {
        return ReviewResponseDTO.builder()
                .userId(user.getId())
                .userName(user.getName())
                .attractionId(attraction.getId())
                .attractionName(attraction.getName())
                .content(content)
                .createdAt(createdAt)
                .rating(rating)
                .build();
    }

    public ReviewAccomResponseDTO toAccomDTO() {
        return ReviewAccomResponseDTO.builder()
                .userId(user.getId())
                .userName(user.getName())
                .accommodationId(accommodation.getId())
                .accommodationName(accommodation.getName())
                .content(content)
                .createdAt(createdAt)
                .rating(rating)
                .build();
    }
}
