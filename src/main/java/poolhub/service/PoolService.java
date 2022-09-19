package poolhub.service;

import org.springframework.data.domain.Page;
import poolhub.service.dto.PoolResponseDto;
import poolhub.service.dto.PoolSearchDto;

public interface PoolService {
    Page<PoolResponseDto> getAllPools(Integer page, Integer size);

    Page<PoolResponseDto> findBySearchCriteria(Integer page, Integer size, PoolSearchDto poolSearchDto);
}
