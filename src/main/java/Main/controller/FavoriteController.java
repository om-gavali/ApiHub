package Main.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import Main.Entity.Favorite;
import Main.Entity.User;
import Main.Repository.UserRepository;
import Main.Service.FavoriteService;

@RestController
@RequestMapping("/favorites")
@CrossOrigin(origins = "*")
public class FavoriteController {

    @Autowired
    private FavoriteService service;

    @Autowired
    private UserRepository userRepo;

    private User getCurrentUser(Authentication auth) {
        return userRepo.findByUsername(auth.getName())
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    @PostMapping("/{apiId}")
    public String add(@PathVariable Long apiId, Authentication auth) {

        User user = getCurrentUser(auth);
        service.addFavorite(user.getId(), apiId);

        return "Added to favorites";
    }

    @DeleteMapping("/{apiId}")
    public String remove(@PathVariable Long apiId, Authentication auth) {

        User user = getCurrentUser(auth);
        service.removeFavorite(user.getId(), apiId);

        return "Removed";
    }

    @GetMapping
    public List<Favorite> get(Authentication auth) {

        User user = getCurrentUser(auth);
        return service.getFavorites(user.getId());
    }
}