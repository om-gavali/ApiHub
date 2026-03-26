package Main.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import Main.Entity.Favorite;
import Main.Repository.FavoriteRepository;

@Service
public class FavoriteService {

    @Autowired
    private FavoriteRepository repo;

    public void addFavorite(Long userId, Long apiId) {
        if (repo.findByUserIdAndApiId(userId, apiId).isEmpty()) {
            Favorite f = new Favorite();
            f.setUserId(userId);
            f.setApiId(apiId);
            repo.save(f);
        }
    }

    public void removeFavorite(Long userId, Long apiId) {
        repo.findByUserIdAndApiId(userId, apiId)
            .ifPresent(repo::delete);
    }

    public List<Favorite> getFavorites(Long userId) {
        return repo.findByUserId(userId);
    }
}