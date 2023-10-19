package com.korea.basic1.member;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/user")
public class MemberController {
    @GetMapping("/login")
    public String login() {
        return "login_form";
    }

    @GetMapping("/test")
    public String test() {
        return "test";
    }
}
