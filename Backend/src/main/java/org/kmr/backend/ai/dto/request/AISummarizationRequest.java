package org.kmr.backend.ai.dto.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import java.util.List;

@Getter
@AllArgsConstructor
public class AISummarizationRequest {
    @JsonProperty("place_name")
    private String placeName;
    private List<String> reviews;
}
