package com.korea.basic1;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.ArrayList;
import java.util.Scanner;

@Controller
public class ArticleController {

    ArticleView articleView = new ArticleView();
    ArticleRepository articleRepository = new ArticleRepository();
    Scanner scan = new Scanner(System.in);


    @RequestMapping("add")
    @ResponseBody
    public String add(String title, String content) {
        articleRepository.insert(title, content);

        return "게시물이 등록되었습니다.";
    }


    @RequestMapping("list")
    @ResponseBody
    public ArrayList<Article> list() {
        ArrayList<Article> articles = articleRepository.findAllArticles();
        return articles;

    }


    @RequestMapping("update")
    @ResponseBody
    public String update(int targetId, String newTitle, String newContent) {

        Article article = articleRepository.findById(targetId);

        if (article == null) {
            return "없는 게시물입니다.";
        } else {
            article.setTitle(newTitle);
            article.setContent(newContent);

            return "수정이 완료되었습니다.";
        }
    }


    @RequestMapping("delete")
    @ResponseBody
    public String delete(int targetId) {

        Article article = articleRepository.findById(targetId);

        if (article == null) {
            return "없는 게시물입니다.";
        } else {
            articleRepository.delete(article);
            return "삭제가 완료되었습니다.";
        }
    }

    @RequestMapping("detail")
    @ResponseBody
    public String detail(int targetId) {
        Article article = articleRepository.findById(targetId);

        if (article == null) {
            return "존재하지 않는 게시물입니다.";
        } else {
            article.setHit(article.getHit() + 1);
            String jsonString = "";

            try {
                ObjectMapper mapper = new ObjectMapper();
                jsonString = mapper.writeValueAsString(article);
            } catch (Exception e) {
                e.printStackTrace();
            }

            return jsonString;
        }
    }

    public void search() {
        System.out.print("검색 키워드를 입력해주세요 : ");
        String keyword = scan.nextLine();
        ArrayList<Article> searchedArticles = articleRepository.findByTitle(keyword);
        articleView.printArticles(searchedArticles);
    }

    public int getParamInt(String input, int defaulValue) {

        try {
            int num = Integer.parseInt(input);
            return num;

        } catch (NumberFormatException e) {
            System.out.println("숫자만 입력 가능합니다.");
        }

        return defaulValue;
    }
}
