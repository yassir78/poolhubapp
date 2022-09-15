package poolhub.service.serviceImpl;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.cloud.storage.*;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.Date;
import java.util.Objects;
import java.util.logging.Logger;
import javax.persistence.EntityManager;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;
import poolhub.domain.Pool;
import poolhub.repository.PoolRepository;
import poolhub.service.PoolService;
import poolhub.service.Utils.JpqlUtils;
import poolhub.service.dto.PoolListResponseDto;
import poolhub.service.dto.PoolSearchDto;
import poolhub.service.mapper.PoolMapper;

@Component
public class PoolServiceImpl implements PoolService {

    private final PoolRepository poolRepository;
    private final EntityManager entityManager;
    private final Logger logger = Logger.getLogger(PoolServiceImpl.class.getName());

    public PoolServiceImpl(PoolRepository poolRepository, EntityManager entityManager) {
        this.poolRepository = poolRepository;
        this.entityManager = entityManager;
    }

    @Override
    public Page<PoolListResponseDto> getAllPools(Integer page, Integer size) {
        logger.info("Find all pools service");
        PageRequest pageRequest = PageRequest.of(page, size);
        Page<Pool> pageResult = poolRepository.findAll(pageRequest);
        return new PageImpl<>(
            pageResult.getContent().stream().map(PoolMapper::mapToListResponse).toList(),
            pageRequest,
            pageResult.getTotalElements()
        );
    }

    @Override
    public Page<PoolListResponseDto> findBySearchCriteria(Integer page, Integer size, PoolSearchDto poolSearchDto) {
        String query = JpqlUtils.init(Pool.class);
        query += JpqlUtils.addCriteria("price", poolSearchDto.getPriceMin(), poolSearchDto.getPriceMax());
        query += JpqlUtils.addCriteria("volume", poolSearchDto.getVolumeMin(), poolSearchDto.getVolumeMax());
        query += JpqlUtils.addCriteria("label", poolSearchDto.getLabel(), "LIKE");
        logger.info("Find pools by search criteria service");
        return new PageImpl<>(
            entityManager
                .createQuery(query, Pool.class)
                .setFirstResult(page * size)
                .setMaxResults(size)
                .getResultList()
                .stream()
                .map(PoolMapper::mapToListResponse)
                .toList()
        );
    }


}
