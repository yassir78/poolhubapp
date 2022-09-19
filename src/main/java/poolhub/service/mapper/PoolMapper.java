package poolhub.service.mapper;

import poolhub.domain.Pool;
import poolhub.service.dto.PoolResponseDto;

public class PoolMapper {

    private PoolMapper() {}

    public static PoolResponseDto mapToListResponse(Pool pool) {
        PoolResponseDto poolListResponseDto = new PoolResponseDto();
        poolListResponseDto.setRef(pool.getRef());
        poolListResponseDto.setLabel(pool.getLabel());
        poolListResponseDto.setBrand(pool.getBrand());
        poolListResponseDto.setDescription(pool.getDescription());
        poolListResponseDto.setImage(pool.getImage());
        poolListResponseDto.setPrice(pool.getPrice());
        poolListResponseDto.setStock(pool.getStock());
        poolListResponseDto.setActive(pool.getActive());
        poolListResponseDto.setVolume(pool.getVolume());
        poolListResponseDto.setWidth(pool.getWidth());
        poolListResponseDto.setLength(pool.getLength());
        poolListResponseDto.setHeight(pool.getHeight());
        poolListResponseDto.setShape(pool.getShape());
        poolListResponseDto.setMaterial(pool.getMaterial());
        poolListResponseDto.setColor(pool.getColor());
        poolListResponseDto.setCategory(pool.getCategory());
        return poolListResponseDto;
    }
}
