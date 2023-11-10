package com.korea.basic1.security;

import com.korea.basic1.member.Member;
import com.korea.basic1.member.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class MyOauth2Service extends DefaultOAuth2UserService {

    private final MemberRepository memberRepository;
    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        OAuth2User oAuth2User = super.loadUser(userRequest);

        Member member = memberRepository.findByLoginId(oAuth2User.getName());
        if(member == null) {
            Member newMember = new Member();
            newMember.setLoginId(oAuth2User.getName());
            newMember.setPassword("");
            newMember.setEmail("");
            newMember.setCreateDate(LocalDateTime.now());
            newMember.setUpdateDate(LocalDateTime.now());
            memberRepository.save(newMember);
        }

        List<SimpleGrantedAuthority> authorities = new ArrayList<>();
        authorities.add(new SimpleGrantedAuthority("ROLE_USER"));

        return new MyOauth2User(oAuth2User.getName(), "", authorities);
    }
}
