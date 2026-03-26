package Main.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import Main.Entity.Review;
import java.util.*;
public interface ReviewRepository extends JpaRepository<Review, Long> {

    List<Review> findByApiId(Long apiId);

    @Query("SELECT AVG(r.rating) FROM Review r WHERE r.apiId = :apiId")
    Double getAverageRating(Long apiId);
}