package org.kmr.backend.ai.service;

import lombok.RequiredArgsConstructor;
import org.kmr.backend.ai.dto.AIRecommendationRequest;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

@Service
@RequiredArgsConstructor
public class AIServiceClient {

    private final WebClient aiWebClient;

    // --- 반환 타입을 Mono<String>으로 변경 ---
    public Mono<String> fetchRecommendations(AIRecommendationRequest request) {
        return aiWebClient.post()
                .uri("/generate-recommendation")
                .body(Mono.just(request), AIRecommendationRequest.class)
                .retrieve()
                // --- 응답을 String 클래스로 받도록 변경 ---
                .bodyToMono(String.class);
    }
}