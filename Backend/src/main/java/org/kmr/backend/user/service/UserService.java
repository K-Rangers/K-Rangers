package org.kmr.backend.user.service;

import lombok.RequiredArgsConstructor;
import org.kmr.backend.security.JwtTokenProvider;
import org.kmr.backend.user.domain.User;
import org.kmr.backend.user.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider jwtTokenProvider;

    public Long join(String email, String password, String name) {
        // 중복 회원 검증
        userRepository.findByEmail(email).ifPresent(user -> {
            throw new IllegalStateException("이미 존재하는 회원입니다.");
        });

        User user = User.builder()
                .email(email)
                .password(passwordEncoder.encode(password))
                .name(name)
                .build();

        userRepository.save(user);
        return user.getId();
    }

    public String login(String email, String password) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("가입되지 않은 이메일입니다."));

        if (!passwordEncoder.matches(password, user.getPassword())) {
            throw new IllegalArgumentException("잘못된 비밀번호입니다.");
        }

        return jwtTokenProvider.createToken(user.getEmail());
    }
}
