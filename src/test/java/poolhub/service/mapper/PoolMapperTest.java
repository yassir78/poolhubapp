package poolhub.service.mapper;

import static org.assertj.core.api.Assertions.assertThat;

import java.math.BigDecimal;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import poolhub.domain.Pool;
import poolhub.domain.enumeration.Category;
import poolhub.domain.enumeration.Color;
import poolhub.domain.enumeration.Material;
import poolhub.domain.enumeration.Shape;
import poolhub.service.dto.PoolListResponseDto;

public class PoolMapperTest {

    private Pool pool;

    @BeforeEach
    public void init() {
        pool = new Pool();
        pool.setLabel("label");
        pool.setBrand("brand");
        pool.setDescription("description");
        pool.setImage("image");
        pool.setPrice(BigDecimal.valueOf(100));
        pool.setStock(10);
        pool.setActive(true);
        pool.setVolume(10.0);
        pool.setWidth(10.0);
        pool.setLength(10.0);
        pool.setHeight(10.0);
        pool.setShape(Shape.CIRCULAR);
        pool.setMaterial(Material.BLACK);
        pool.setColor(Color.BLACK);
        pool.setCategory(Category.INGROUND);
    }

    @Test
    void poolToPoolListResponseDtoShouldMapOnlyNonNullPool() {
        PoolListResponseDto poolListResponseDto = PoolMapper.mapToListResponse(pool);
        assertThat(poolListResponseDto).isNotNull();
    }

    @Test
    void poolToPoolListResponseDtoShouldMapAllFields() {
        PoolListResponseDto poolListResponseDto = PoolMapper.mapToListResponse(pool);
        assertThat(poolListResponseDto.getLabel()).isEqualTo(pool.getLabel());
        assertThat(poolListResponseDto.getBrand()).isEqualTo(pool.getBrand());
        assertThat(poolListResponseDto.getDescription()).isEqualTo(pool.getDescription());
        assertThat(poolListResponseDto.getImage()).isEqualTo(pool.getImage());
        assertThat(poolListResponseDto.getPrice()).isEqualTo(pool.getPrice());
        assertThat(poolListResponseDto.getStock()).isEqualTo(pool.getStock());
        assertThat(poolListResponseDto.getActive()).isEqualTo(pool.getActive());
        assertThat(poolListResponseDto.getVolume()).isEqualTo(pool.getVolume());
        assertThat(poolListResponseDto.getWidth()).isEqualTo(pool.getWidth());
        assertThat(poolListResponseDto.getLength()).isEqualTo(pool.getLength());
        assertThat(poolListResponseDto.getHeight()).isEqualTo(pool.getHeight());
        assertThat(poolListResponseDto.getShape()).isEqualTo(pool.getShape());
        assertThat(poolListResponseDto.getMaterial()).isEqualTo(pool.getMaterial());
        assertThat(poolListResponseDto.getColor()).isEqualTo(pool.getColor());
        assertThat(poolListResponseDto.getCategory()).isEqualTo(pool.getCategory());
    }
}
