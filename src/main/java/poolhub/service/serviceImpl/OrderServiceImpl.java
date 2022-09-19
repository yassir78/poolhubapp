package poolhub.service.serviceImpl;

import java.util.Optional;
import java.util.logging.Logger;
import org.springframework.stereotype.Service;
import poolhub.domain.Order;
import poolhub.domain.OrderDetails;
import poolhub.domain.Pool;
import poolhub.domain.User;
import poolhub.domain.enumeration.State;
import poolhub.repository.OrderDetailsRepository;
import poolhub.repository.OrderRepository;
import poolhub.repository.PoolRepository;
import poolhub.repository.UserRepository;
import poolhub.service.OrderService;

@Service
public class OrderServiceImpl implements OrderService {

    private Logger logger = Logger.getLogger(OrderServiceImpl.class.getName());

    private final OrderRepository orderRepository;
    private final OrderDetailsRepository orderDetailsRepository;
    private final UserRepository userRepository;
    private final PoolRepository poolRepository;

    public OrderServiceImpl(
        OrderRepository orderRepository,
        OrderDetailsRepository orderDetailsRepository,
        UserRepository userRepository,
        PoolRepository poolRepository
    ) {
        this.orderRepository = orderRepository;
        this.orderDetailsRepository = orderDetailsRepository;
        this.userRepository = userRepository;
        this.poolRepository = poolRepository;
    }

    @Override
    public void createOrder(Order order) {
        logger.info("Create order Service implementtation");
        order.setState(State.PROCESSING);
        Optional
            .of(order.getUser())
            .ifPresent(user -> {
                User foundedUser = userRepository
                    .findOneByEmailIgnoreCase(order.getUser().getEmail())
                    .orElseThrow(() -> new RuntimeException("User not found"));
                logger.info("User found with email: " + foundedUser.getEmail());
                order.setUser(foundedUser);
            });
        Optional
            .of(order.getPool())
            .ifPresent(pool -> {
                Pool foundedPool = poolRepository.findByLabel(pool.getLabel()).orElseThrow(() -> new RuntimeException("Pool not found"));
                logger.info("Pool found with label: " + foundedPool.getLabel());
                foundedPool.setStock(foundedPool.getStock() - 1);
                poolRepository.save(foundedPool);
                order.setPool(foundedPool);
            });
        Optional
            .of(order.getOrderDetails())
            .ifPresent(orderDetails -> {
                OrderDetails savedOrderDetails = orderDetailsRepository.save(orderDetails);
                logger.info("order details saved successfuly " + savedOrderDetails.getId().toString());
                order.setOrderDetails(savedOrderDetails);
            });
        orderRepository.save(order);
    }
}
