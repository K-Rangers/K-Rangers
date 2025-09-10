package org.kmr.backend.ai.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter; // import 추가
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
public class AIRecommendationResponse {
    private List<AIResult> results;
}
