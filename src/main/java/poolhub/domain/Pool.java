package poolhub.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.math.BigDecimal;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import javax.persistence.Version;
import javax.validation.constraints.NotNull;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import poolhub.domain.enumeration.Category;
import poolhub.domain.enumeration.Color;
import poolhub.domain.enumeration.Material;
import poolhub.domain.enumeration.Shape;

/**
 * A Pool.
 */
@Entity
@Table(name = "jhi_pool")
@SuppressWarnings("common-java:DuplicatedBlocks")
public class Pool implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @NotNull
    @Column(name = "ref", nullable = false)
    private String ref;

    @NotNull
    @Column(name = "label", nullable = false)
    private String label;

    @Column(name = "brand")
    private String brand;

    @Column(name = "description")
    private String description;

    @Column(name = "image")
    private String image;

    @Column(name = "price", precision = 21, scale = 2)
    private BigDecimal price;

    @Column(name = "stock")
    private Integer stock;

    @Version
    private Integer version;

    @Column(name = "active")
    private Boolean active;

    @Column(name = "volume")
    private Double volume;

    @Column(name = "width")
    private Double width;

    @Column(name = "length")
    private Double length;

    @Column(name = "warranty")
    private int warranty;

    @Column(name = "height")
    private Double height;

    @Enumerated(EnumType.STRING)
    @Column(name = "shape")
    private Shape shape;

    @Enumerated(EnumType.STRING)
    @Column(name = "material")
    private Material material;

    @Enumerated(EnumType.STRING)
    @Column(name = "color")
    private Color color;

    @Enumerated(EnumType.STRING)
    @Column(name = "category")
    private Category category;

    @OneToMany(mappedBy = "pool", cascade = CascadeType.DETACH)
    @JsonIgnoreProperties(value = { "pool" }, allowSetters = true)
    private Set<Order> orders = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties(value = { "pools" }, allowSetters = true)
    private User user;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Pool id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getVersion() {
        return version;
    }

    public void setVersion(Integer version) {
        this.version = version;
    }

    public int getWarranty() {
        return warranty;
    }

    public void setWarranty(int warranty) {
        this.warranty = warranty;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public String getRef() {
        return this.ref;
    }

    public Pool ref(String ref) {
        this.setRef(ref);
        return this;
    }

    public void setRef(String ref) {
        this.ref = ref;
    }

    public String getLabel() {
        return this.label;
    }

    public Pool label(String label) {
        this.setLabel(label);
        return this;
    }

    public void setLabel(String label) {
        this.label = label;
    }

    public String getBrand() {
        return this.brand;
    }

    public Pool brand(String brand) {
        this.setBrand(brand);
        return this;
    }

    public void setBrand(String brand) {
        this.brand = brand;
    }

    public String getDescription() {
        return this.description;
    }

    public Pool description(String description) {
        this.setDescription(description);
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getImage() {
        return this.image;
    }

    public Pool image(String image) {
        this.setImage(image);
        return this;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public BigDecimal getPrice() {
        return this.price;
    }

    public Pool price(BigDecimal price) {
        this.setPrice(price);
        return this;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    public Integer getStock() {
        return this.stock;
    }

    public Pool stock(Integer stock) {
        this.setStock(stock);
        return this;
    }

    public void setStock(Integer stock) {
        this.stock = stock;
    }

    public Boolean getActive() {
        return this.active;
    }

    public Pool active(Boolean active) {
        this.setActive(active);
        return this;
    }

    public void setActive(Boolean active) {
        this.active = active;
    }

    public Double getVolume() {
        return this.volume;
    }

    public Pool volume(Double volume) {
        this.setVolume(volume);
        return this;
    }

    public void setVolume(Double volume) {
        this.volume = volume;
    }

    public Double getWidth() {
        return this.width;
    }

    public Pool width(Double width) {
        this.setWidth(width);
        return this;
    }

    public void setWidth(Double width) {
        this.width = width;
    }

    public Double getLength() {
        return this.length;
    }

    public Pool length(Double length) {
        this.setLength(length);
        return this;
    }

    public void setLength(Double length) {
        this.length = length;
    }

    public Double getHeight() {
        return this.height;
    }

    public Pool height(Double height) {
        this.setHeight(height);
        return this;
    }

    public void setHeight(Double height) {
        this.height = height;
    }

    public Shape getShape() {
        return this.shape;
    }

    public Pool shape(Shape shape) {
        this.setShape(shape);
        return this;
    }

    public void setShape(Shape shape) {
        this.shape = shape;
    }

    public Material getMaterial() {
        return this.material;
    }

    public Pool material(Material material) {
        this.setMaterial(material);
        return this;
    }

    public void setMaterial(Material material) {
        this.material = material;
    }

    public Color getColor() {
        return this.color;
    }

    public Pool color(Color color) {
        this.setColor(color);
        return this;
    }

    public void setColor(Color color) {
        this.color = color;
    }

    public Category getCategory() {
        return this.category;
    }

    public Pool category(Category category) {
        this.setCategory(category);
        return this;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

    public Set<Order> getOrders() {
        return this.orders;
    }

    public void setOrders(Set<Order> orders) {
        if (this.orders != null) {
            this.orders.forEach(i -> i.setPool(null));
        }
        if (orders != null) {
            orders.forEach(i -> i.setPool(this));
        }
        this.orders = orders;
    }

    public Pool orders(Set<Order> orders) {
        this.setOrders(orders);
        return this;
    }

    public Pool addOrders(Order order) {
        this.orders.add(order);
        order.setPool(this);
        return this;
    }

    public Pool removeOrders(Order order) {
        this.orders.remove(order);
        order.setPool(null);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Pool)) {
            return false;
        }
        return id != null && id.equals(((Pool) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Pool{" +
            "id=" + getId() +
            ", ref='" + getRef() + "'" +
            ", label='" + getLabel() + "'" +
            ", brand='" + getBrand() + "'" +
            ", description='" + getDescription() + "'" +
            ", image='" + getImage() + "'" +
            ", price=" + getPrice() +
            ", stock=" + getStock() +
            ", active='" + getActive() + "'" +
            ", volume=" + getVolume() +
            ", width=" + getWidth() +
            ", length=" + getLength() +
            ", height=" + getHeight() +
            ", shape='" + getShape() + "'" +
            ", material='" + getMaterial() + "'" +
            ", color='" + getColor() + "'" +
            ", category='" + getCategory() + "'" +
            "}";
    }
}
