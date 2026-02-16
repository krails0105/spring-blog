package com.example.blog.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

// @Controller: 이 클래스가 웹 요청을 처리하는 컨트롤러임을 Spring에 알림
// @ComponentScan에 의해 자동으로 탐색되어 Spring이 관리하는 객체(Bean)로 등록됨
@Controller
public class HomeController {

    // @GetMapping("/"): HTTP GET 요청이 "/" (루트 경로)로 오면 이 메서드가 실행됨
    // 반환값 "Home" → Thymeleaf가 templates/Home.html 파일을 찾아 HTML로 렌더링
    @GetMapping("/")
    public String home(){
        return "Home";
    }
}
