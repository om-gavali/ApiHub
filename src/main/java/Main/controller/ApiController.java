package Main.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import Main.Entity.Api;
import Main.Repository.ApiRepository;

@RestController
@RequestMapping("/apis")
@CrossOrigin(origins = "*")
public class ApiController {

    @Autowired
    private ApiRepository repo;

    
    @GetMapping
    public List<Api> getAllApis() {
        return repo.findAll();
    }

    @GetMapping("/category/{category}")
    public List<Api> getByCategory(@PathVariable String category) {
        return repo.findByCategory(category);
    }

    @GetMapping("/search")
    public List<Api> search(@RequestParam String keyword) {
        return repo.search(keyword);
    }
}