package Main.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import Main.Entity.Favorite;
import Main.Service.FavoriteService;

@RestController
@RequestMapping("/favorites")
@CrossOrigin(origins = "*")
public class FavoriteController {

    @Autowired
    private FavoriteService service;

    @PostMapping("/{apiId}")
    public String add(@PathVariable Long apiId,
                      @RequestAttribute("userId") Long userId) {

        service.addFavorite(userId, apiId);
        return "Added to favorites";
    }

    @DeleteMapping("/{apiId}")
    public String remove(@PathVariable Long apiId,
                         @RequestAttribute("userId") Long userId) {

        service.removeFavorite(userId, apiId);
        return "Removed";
    }

    @GetMapping
    public List<Favorite> get(@RequestAttribute("userId") Long userId) {
        return service.getFavorites(userId);
    }
}