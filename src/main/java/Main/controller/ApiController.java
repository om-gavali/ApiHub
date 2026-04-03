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

    @PostMapping
    public Api addApi(@RequestBody Api api) {
        return repo.save(api);
    }

    @GetMapping("/category/{category}")
    public List<Api> getByCategory(@PathVariable String category) {
        return repo.findByCategory(category);
    }

    @GetMapping("/search")
    public List<Api> search(@RequestParam String keyword) {
        return repo.search(keyword);
    }

    @DeleteMapping("/{id}")
    public String deleteApi(@PathVariable Long id) {
        repo.deleteById(id);
        return "Deleted Successfully";
    }

    @PostMapping("/{id}/visit")
    public Api incrementVisit(@PathVariable Long id) {
        Api api = repo.findById(id).orElseThrow();
        api.setVisitCount(api.getVisitCount() == null ? 1 : api.getVisitCount() + 1);
        return repo.save(api);
    }

    @GetMapping("/top")
    public List<Api> getTopVisited() {
        return repo.findTop5ByOrderByVisitCountDesc();
    }
}