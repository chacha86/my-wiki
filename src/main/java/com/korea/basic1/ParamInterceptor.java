package com.korea.basic1;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.korea.basic1.note.NoteUIParam;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

public class ParamInterceptor implements HandlerInterceptor {
    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        String noteUIParamJson = request.getParameter("noteUIParamJson");
        if(noteUIParamJson == null) {
            return HandlerInterceptor.super.preHandle(request, response, handler);
        }

        ObjectMapper objectMapper = new ObjectMapper();
        NoteUIParam noteUIParam = objectMapper.readValue(noteUIParamJson, NoteUIParam.class);
        request.getSession().setAttribute("noteUIParam", noteUIParam);
        return HandlerInterceptor.super.preHandle(request, response, handler);
    }

    @Override
    public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler, ModelAndView modelAndView) throws Exception {
        if(modelAndView == null) {
            return;
        }
        NoteUIParam noteUIParam = (NoteUIParam)request.getSession().getAttribute("noteUIParam");
        modelAndView.addObject("noteUIParam", noteUIParam);
        HandlerInterceptor.super.postHandle(request, response, handler, modelAndView);
    }

    @Override
    public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) throws Exception {
        HandlerInterceptor.super.afterCompletion(request, response, handler, ex);
    }
}
