package com.korea.basic1.security;

import com.korea.basic1.member.Member;
import com.korea.basic1.member.MemberRepository;
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
    private final MemberRepository memberRepository;

    @Override
    public UserDetails loadUserByUsername(String username) {
        Member member = memberRepository.findByLoginId(username);
        if(!username.equals(member.getLoginId())) {
            throw new UsernameNotFoundException("해당 유저를 찾을 수 없습니다.");
        }
        MyUserDetail detail = new MyUserDetail();
        detail.setUsername(member.getLoginId());
        detail.setPassword(member.getPassword());
        detail.setEnable(true);
        return detail;
    }
}
