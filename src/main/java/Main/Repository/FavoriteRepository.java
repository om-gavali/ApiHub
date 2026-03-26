package Main.Repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import Main.Entity.Favorite;

public interface FavoriteRepository extends JpaRepository<Favorite, Long>{

	 List<Favorite> findByUserId(Long userId);
	    Optional<Favorite> findByUserIdAndApiId(Long userId, Long apiId);
}
