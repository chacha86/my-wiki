package com.korea.basic1.security;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MyUserDetailsService implements UserDetailsService {

    private final PasswordEncoder passwordEncoder;

    @Override
    public UserDetails loadUserByUsername(String username) {
        String targetUsername = "chacha";
        if(!username.equals(targetUsername)) {
            throw new UsernameNotFoundException("해당 유저를 찾을 수 없습니다.");
        }
        MyUserDetail detail = new MyUserDetail();
        detail.setUsername(username);
        detail.setPassword(passwordEncoder.encode("1234"));
        detail.setEnable(true);
        return detail;
    }
}
