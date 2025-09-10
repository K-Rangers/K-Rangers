package org.kmr.backend.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.client.reactive.ReactorClientHttpConnector; // import 추가
import org.springframework.web.reactive.function.client.WebClient;
import reactor.netty.http.client.HttpClient; // import 추가
import java.time.Duration; // import 추가

@Configuration
public class WebClientConfig {

    @Value("${ai.server.url:http://127.0.0.1:8000}")
    private String aiServerUrl;

    @Bean
    public WebClient aiWebClient() {
        HttpClient httpClient = HttpClient.create()
                .responseTimeout(Duration.ofSeconds(60));
        return WebClient.builder()
                .baseUrl(aiServerUrl)
                .clientConnector(new ReactorClientHttpConnector(httpClient))
                .build();
    }
}
