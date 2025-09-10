package org.kmr.backend.ai.service;

import lombok.RequiredArgsConstructor;
import org.kmr.backend.ai.dto.AISummarizationRequest;
import org.kmr.backend.ai.dto.AISummarizationResponse;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

@Service
@RequiredArgsConstructor
public class AIServiceClient {
    private final WebClient aiWebClient;

    public AISummarizationResponse fetchSummary(AISummarizationRequest request) {
        return aiWebClient.post()
                .uri("/summarize-reviews")
                .bodyValue(request)
                .retrieve()
                .bodyToMono(AISummarizationResponse.class)
                .block();
    }
}
