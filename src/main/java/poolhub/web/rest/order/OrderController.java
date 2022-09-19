package poolhub.web.rest.order;

import java.util.logging.Logger;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import poolhub.service.OrderService;
import poolhub.service.dto.CreateOrderDTO;
import poolhub.service.mapper.OrderMapper;

@RestController
@RequestMapping("/api/order")
public class OrderController {

    private Logger logger = Logger.getLogger(OrderController.class.getName());
    private OrderService orderService;

    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @PostMapping
    public ResponseEntity<Void> createOrder(@RequestBody CreateOrderDTO createOrderDTO) {
        logger.info("Create order");
        orderService.createOrder(OrderMapper.mapToOrder(createOrderDTO));
        return ResponseEntity.ok().build();
    }
}
