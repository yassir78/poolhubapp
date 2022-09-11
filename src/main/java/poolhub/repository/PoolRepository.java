package poolhub.repository;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;
import poolhub.domain.Pool;

/**
 * Spring Data JPA repository for the Pool entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PoolRepository extends JpaRepository<Pool, Long> {}
