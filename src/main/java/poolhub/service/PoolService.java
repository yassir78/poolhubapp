package poolhub.service;

import java.util.List;
import org.springframework.data.domain.Page;
import poolhub.domain.Pool;
import poolhub.service.dto.PoolListResponseDto;
import poolhub.service.dto.PoolSearchDto;

public interface PoolService {
    Page<PoolListResponseDto> getAllPools(Integer page, Integer size);

    Page<PoolListResponseDto> findBySearchCriteria(Integer page, Integer size, PoolSearchDto poolSearchDto);
}
