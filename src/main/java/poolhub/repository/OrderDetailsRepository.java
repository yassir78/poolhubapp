package poolhub.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import poolhub.domain.OrderDetails;

public interface OrderDetailsRepository extends JpaRepository<OrderDetails, Long> {}
