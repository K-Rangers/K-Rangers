package org.kmr.backend.user.api;

import lombok.RequiredArgsConstructor;
import org.kmr.backend.user.dto.request.UserJoinRequestDto;
import org.kmr.backend.user.dto.request.UserLoginRequestDto;
import org.kmr.backend.user.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/v1/main")
public class UserApi { // 클래스 이름을 UserController에서 UserApi로 변경

    private final UserService userService;

    @PostMapping
    public ResponseEntity<String> join(@RequestBody UserJoinRequestDto requestDto) {
        userService.join(requestDto.getEmail(), requestDto.getPassword(), requestDto.getName());
        return ResponseEntity.ok("회원가입이 완료되었습니다.");
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody UserLoginRequestDto requestDto) {
        String token = userService.login(requestDto.getEmail(), requestDto.getPassword());
        return ResponseEntity.ok(token);
    }
}
