package poolhub.service.serviceImpl;

import java.util.Optional;
import java.util.logging.Logger;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import poolhub.domain.Order;
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
    @Transactional
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
                Pool foundedPool = poolRepository.findByRef(pool.getRef()).orElseThrow(() -> new RuntimeException("Pool not found"));
                Pool managedPool = poolRepository.findById(foundedPool.getId()).get();
                if (foundedPool.getStock() - 1 < 0) {
                    throw new RuntimeException("Pool not available");
                }
                logger.info("Pool found with label: " + managedPool.getLabel());
                logger.info("Pool stock updated" + managedPool.getStock());
                poolRepository.updateAddress(managedPool.getStock() - 1, managedPool.getId());
                logger.info("Pool saved");
                order.setPool(foundedPool);
            });
        logger.info("Order saved ");
        /* ptional
            .of(order.getOrderDetails())
            .ifPresent(orderDetails -> {
                order.setOrderDetails(null);
                logger.info("Order details found");
                OrderDetails savedOrderDetails = orderDetailsRepository.save(orderDetails);
                order.setOrderDetails(savedOrderDetails);
                logger.info(
                    "order details saved successfuly " + savedOrderDetails.getId().toString());
            });*/
        orderRepository.save(order);
    }
}
