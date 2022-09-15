package poolhub.service;

import java.io.IOException;
import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.web.multipart.MultipartFile;
import poolhub.domain.Pool;
import poolhub.service.dto.PoolListResponseDto;
import poolhub.service.dto.PoolSearchDto;

public interface PoolService {
    Page<PoolListResponseDto> getAllPools(Integer page, Integer size);

    Page<PoolListResponseDto> findBySearchCriteria(Integer page, Integer size, PoolSearchDto poolSearchDto);

    String uploadToFirebase(MultipartFile multipartFile) throws IOException;
}
