package org.kmr.backend.ai.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import java.util.List;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class AIRecommendationRequest {
    private List<AttractionInfoRequest> attractions;
}
