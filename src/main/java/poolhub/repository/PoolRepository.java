package poolhub.repository;

import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import poolhub.domain.Pool;

/**
 * Spring Data JPA repository for the Pool entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PoolRepository extends JpaRepository<Pool, Long> {
    Optional<Pool> findByLabel(String label);

    Optional<Pool> findByRef(String ref);

    @Modifying
    @Query("UPDATE Pool p SET p.stock = :stock WHERE p.id = :poolId")
    int updateAddress(@Param("stock") int stock, @Param("poolId") Long id);
}
