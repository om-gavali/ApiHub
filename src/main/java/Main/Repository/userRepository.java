package Main.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import Main.Entity.user;
import java.util.Optional;

public interface userRepository extends JpaRepository<user, Long> {
    Optional<user> findByUsername(String username);
}