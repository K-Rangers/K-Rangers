package org.kmr.backend.config;

import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;
import io.swagger.v3.oas.models.servers.Server;
import io.swagger.v3.oas.models.info.Info;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;


@Configuration
public class SwaggerConfig {
    @Bean
    public OpenAPI openAPI() {
        return new OpenAPI()
                .components(new Components().addSecuritySchemes("bearerAuth",
                        new SecurityScheme()
                                .type(SecurityScheme.Type.HTTP)
                                .scheme("bearer")
                                .bearerFormat("JWT")))
                .addSecurityItem(new SecurityRequirement().addList("bearerAuth"))
                .info(apiInfo())
                .addServersItem(new Server()
                        .url("https://travel.gamja.cloud")
                        .description("Production server"))
                .addServersItem(new Server()
                        .url("http://localhost:9000")
                        .description("local server"));
    }

    private Info apiInfo() {
        return new Info()
                .title("travel-aiga")
                .description("travel-aiga 서버 API Docs")
                .version("1.0.0");
    }
}