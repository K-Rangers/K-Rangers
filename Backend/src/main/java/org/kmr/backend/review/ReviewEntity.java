package org.kmr.backend.review;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.kmr.backend.attraction.domain.Attraction;
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
}
