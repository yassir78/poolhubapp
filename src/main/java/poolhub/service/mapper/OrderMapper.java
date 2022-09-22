package poolhub.service.mapper;

import java.util.UUID;
import poolhub.domain.Order;
import poolhub.domain.OrderDetails;
import poolhub.domain.Pool;
import poolhub.domain.User;
import poolhub.service.dto.CreateOrderDTO;

public class OrderMapper {

    public static Order mapToOrder(CreateOrderDTO createOrderDTO) {
        Order order = new Order();
        User user = new User();
        Pool pool = new Pool();
        OrderDetails orderDetails = new OrderDetails();
        pool.setLabel(createOrderDTO.getPool().getLabel());
        pool.setRef(createOrderDTO.getPool().getRef());
        user.setEmail(createOrderDTO.getEmail());
        order.setSum(createOrderDTO.getSum());
        order.setRef(UUID.randomUUID().toString());
        orderDetails.setFirstName(createOrderDTO.getFirstName());
        orderDetails.setLastName(createOrderDTO.getLastName());
        orderDetails.setPhone(createOrderDTO.getPhone());
        orderDetails.setShippingAddress(createOrderDTO.getShippingAddress());
        orderDetails.setZipCode(createOrderDTO.getZipCode());
        orderDetails.setCity(createOrderDTO.getCity());
        //order.setOrderDetails(orderDetails);
        order.setUser(user);
        order.setPool(pool);
        return order;
    }
}
