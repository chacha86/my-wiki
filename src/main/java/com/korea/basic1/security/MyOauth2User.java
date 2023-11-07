package com.korea.basic1.security;

import com.korea.basic1.member.Member;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.List;
import java.util.Map;

@Getter
@Setter
@AllArgsConstructor
public class MyOauth2User implements OAuth2User {

    private String loginId;
    private String password;
    private List<SimpleGrantedAuthority> authorities;

    @Override
    public Map<String, Object> getAttributes() {
        return this.getAttributes();
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return this.authorities;
    }

    @Override
    public String getName() {
        return loginId;
    }
}
