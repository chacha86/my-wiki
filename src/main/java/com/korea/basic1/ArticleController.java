package com.korea.basic1;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.ArrayList;
import java.util.Scanner;

@Controller
public class ArticleController {

    ArticleView articleView = new ArticleView();

    @Autowired
    ArticleRepository articleRepository;
    Scanner scan = new Scanner(System.in);


    @RequestMapping("add")
    @ResponseBody
    public String add(String title, String content) {
        Article article = new Article(1, title, content, Util.getCurrentDate());
        articleRepository.save(article);

        return "게시물이 등록되었습니다.";
    }


//    @RequestMapping("list")
//    public String list(Model model) {
//        ArrayList<Article> articles = articleRepository.findAllArticles();
//
//        model.addAttribute("articleList", articles);
//        // 템플릿 필요 -> 나 html에서 자바 하고싶어요.
//        return "article_list";
//    }
//
//
//    @RequestMapping("update")
//    @ResponseBody
//    public String update(int targetId, String newTitle, String newContent) {
//
//        Article article = articleRepository.findById(targetId);
//
//        if (article == null) {
//            return "없는 게시물입니다.";
//        } else {
//            article.setTitle(newTitle);
//            article.setContent(newContent);
//
//            return "수정이 완료되었습니다.";
//        }
//    }
//
//
//    @RequestMapping("delete")
//    @ResponseBody
//    public String delete(int targetId) {
//
//        Article article = articleRepository.findById(targetId);
//
//        if (article == null) {
//            return "없는 게시물입니다.";
//        } else {
//            articleRepository.delete(article);
//            return "삭제가 완료되었습니다.";
//        }
//    }
//
//    @RequestMapping("detail")
//    @ResponseBody
//    public String detail(int targetId) {
//        Article article = articleRepository.findById(targetId);
//
//        if (article == null) {
//            return "존재하지 않는 게시물입니다.";
//        } else {
//            article.setHit(article.getHit() + 1);
//            String jsonString = "";
//
//            try {
//                // ObjectMapper 인스턴스 생성
//                ObjectMapper mapper = new ObjectMapper();
//
//                // Java 객체를 JSON 문자열로 변환
//                 jsonString = mapper.writeValueAsString(article);
//
//            } catch (Exception e) {
//                e.printStackTrace();
//            }
//
//            return jsonString;
//        }
//   }
//
//    @RequestMapping("search")
//    @ResponseBody
//    public ArrayList<Article> search(@RequestParam(defaultValue = "") String keyword) {
//        ArrayList<Article> searchedArticles = articleRepository.findByTitle(keyword);
//        return searchedArticles;
//    }
}
