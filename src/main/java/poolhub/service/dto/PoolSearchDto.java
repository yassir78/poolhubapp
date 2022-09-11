package poolhub.service.dto;

import java.math.BigDecimal;
import poolhub.domain.enumeration.Category;
import poolhub.domain.enumeration.Color;
import poolhub.domain.enumeration.Material;
import poolhub.domain.enumeration.Shape;

public class PoolSearchDto {

    private String label;
    private BigDecimal priceMin;
    private BigDecimal priceMax;
    private Double volumeMin;
    private Double volumeMax;
    private Double widthMin;
    private Double widthMax;
    private Double lengthMin;
    private Double lengthMax;
    private Double heightMin;
    private Double heightMax;
    private Shape shape;
    private Material material;
    private Category category;
    private Color color;

    public BigDecimal getPriceMin() {
        return priceMin;
    }

    public void setPriceMin(BigDecimal priceMin) {
        this.priceMin = priceMin;
    }

    public BigDecimal getPriceMax() {
        return priceMax;
    }

    public void setPriceMax(BigDecimal priceMax) {
        this.priceMax = priceMax;
    }

    public Double getVolumeMin() {
        return volumeMin;
    }

    public void setVolumeMin(Double volumeMin) {
        this.volumeMin = volumeMin;
    }

    public Double getVolumeMax() {
        return volumeMax;
    }

    public void setVolumeMax(Double volumeMax) {
        this.volumeMax = volumeMax;
    }

    public Double getWidthMin() {
        return widthMin;
    }

    public void setWidthMin(Double widthMin) {
        this.widthMin = widthMin;
    }

    public Double getWidthMax() {
        return widthMax;
    }

    public void setWidthMax(Double widthMax) {
        this.widthMax = widthMax;
    }

    public Double getLengthMin() {
        return lengthMin;
    }

    public void setLengthMin(Double lengthMin) {
        this.lengthMin = lengthMin;
    }

    public Double getLengthMax() {
        return lengthMax;
    }

    public void setLengthMax(Double lengthMax) {
        this.lengthMax = lengthMax;
    }

    public Double getHeightMin() {
        return heightMin;
    }

    public void setHeightMin(Double heightMin) {
        this.heightMin = heightMin;
    }

    public Double getHeightMax() {
        return heightMax;
    }

    public void setHeightMax(Double heightMax) {
        this.heightMax = heightMax;
    }

    public Shape getShape() {
        return shape;
    }

    public void setShape(Shape shape) {
        this.shape = shape;
    }

    public Material getMaterial() {
        return material;
    }

    public void setMaterial(Material material) {
        this.material = material;
    }

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

    public Color getColor() {
        return color;
    }

    public void setColor(Color color) {
        this.color = color;
    }

    public String getLabel() {
        return label;
    }

    public void setLabel(String label) {
        this.label = label;
    }
}
