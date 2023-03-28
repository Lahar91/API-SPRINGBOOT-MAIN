package io.spring.api.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * RestEmployeeControll
 */
@Controller
@RequestMapping("employee")
public class EmployeeControll {
    @GetMapping
    public String index(Model model){
        return "employee/index";
    }
    
}