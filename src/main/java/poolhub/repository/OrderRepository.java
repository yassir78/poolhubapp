package poolhub.repository;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;
import poolhub.domain.Order;

/**
 * Spring Data JPA repository for the Order entity.
 */
@SuppressWarnings("unused")
@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {}
