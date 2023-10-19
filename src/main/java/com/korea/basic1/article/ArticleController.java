package com.korea.basic1.article;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Controller
@RequestMapping("/article")
public class ArticleController {

    private enum DetailMode {
        EDIT,
        VIEW
    }

    @Autowired
    ArticleRepository articleRepository;

    @RequestMapping("/test")
    public String test() {
        return "test";
    }

    @RequestMapping("/add")
    @ResponseBody
    public String add(String title, String content) {
        Article article = Article.builder()
                .title(title)
                .content(content)
                .hit(0)
                .createDate(LocalDateTime.now())
                .build();
        articleRepository.save(article); // save -> ID가 없으면 insert, ID가 있으면 update

        return "게시물이 등록되었습니다.";
    }


    @RequestMapping("/list/{id}")
    public String list(Model model, @PathVariable Long id, @RequestParam(defaultValue = "EDIT") DetailMode mode) {
        List<Article> articles = articleRepository.findAll();
        Article article = articleRepository.findById(id).get();
        model.addAttribute("articleList", articles);
        model.addAttribute("detail", article);
        model.addAttribute("mode", mode);

        return "article_list";
    }

    @RequestMapping("update")
    public String update(Long id, String title, String content) {

        Optional<Article> op = articleRepository.findById(id);
        Article article = op.get();
        if (article == null) {
            new IllegalArgumentException("해당 게시물은 존재하지 않습니다.");
        } else {
            article.setTitle(title);
            article.setContent(content);
            articleRepository.save(article); // save는 ID가 있으면 update, ID가 없으면 insert
        }

        return String.format("redirect:/article/list/%d", id);
    }
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
