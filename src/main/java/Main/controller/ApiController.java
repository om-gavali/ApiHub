package Main.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import Main.Entity.Api;
import Main.Repository.ApiRepository;

@RestController
@RequestMapping("/apis")
@CrossOrigin(origins = "*") // allow React
public class ApiController {

    @Autowired
    private ApiRepository repo;

    // Get all APIs
    @GetMapping
    public List<Api> getAllApis() {
        return repo.findAll();
    }

    // Get APIs by category
    @GetMapping("/category/{category}")
    public List<Api> getByCategory(@PathVariable String category) {
        System.out.println("Category: " + category); // debug
        return repo.findByCategory(category);
    }
}