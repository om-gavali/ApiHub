package Main.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import Main.Entity.User;
import Main.Entity.Api;
import Main.Repository.UserRepository;
import Main.Repository.ApiRepository;

import java.util.List;

@RestController
@RequestMapping("/admin")
@CrossOrigin(origins = "*")
public class AdminController {

    @Autowired
    private UserRepository userRepo;

    @Autowired
    private ApiRepository apiRepo;

   
    @GetMapping("/users")
    public List<User> getUsers() {
        return userRepo.findAll();
    }

    
    @DeleteMapping("/user/{id}")
    public String deleteUser(@PathVariable Long id) {
        userRepo.deleteById(id);
        return "User deleted";
    }

     
    @GetMapping("/apis")
    public List<Api> getApis() {
        return apiRepo.findAll();
    }

     
    @DeleteMapping("/api/{id}")
    public String deleteApi(@PathVariable Long id) {
        apiRepo.deleteById(id);
        return "API deleted";
    }
}