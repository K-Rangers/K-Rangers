package org.kmr.backend.ai.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter; // import 추가

@Getter
@Setter // Setter 추가
@NoArgsConstructor
public class AIResult {
    @JsonProperty("attraction_id")
    private Long attractionId;
    private String recommendation;
}
