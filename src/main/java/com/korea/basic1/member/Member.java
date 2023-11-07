package com.korea.basic1.member;

import com.korea.basic1.security.MyUserDetail;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Member {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(length = 50, nullable = false)
    private String loginId;
    @Column(columnDefinition = "TEXT", nullable = false)
    private String password;
    @Column(length = 20, nullable = false)
    private String email;
    @Column(length = 20, nullable = false)
    private LocalDateTime createDate;
    @Column(length = 20, nullable = false)
    private LocalDateTime updateDate;

}
