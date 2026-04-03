package Main.Repository;

import java.util.List;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import Main.Entity.Api;

public interface ApiRepository extends JpaRepository<Api, Long> {

    List<Api> findByCategory(String category);

    @Query("SELECT a FROM Api a WHERE LOWER(a.name) LIKE LOWER(CONCAT('%',:keyword,'%')) OR LOWER(a.description) LIKE LOWER(CONCAT('%',:keyword,'%'))")
    List<Api> search(@Param("keyword") String keyword);

    List<Api> findTop5ByOrderByVisitCountDesc();
}