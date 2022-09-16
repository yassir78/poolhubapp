package poolhub.service;

import static org.junit.Assert.assertEquals;
import static org.mockito.Mockito.when;

import java.util.ArrayList;
import java.util.List;
import javax.persistence.EntityManager;
import org.junit.Test;
import org.junit.jupiter.api.BeforeEach;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.transaction.annotation.Transactional;
import poolhub.IntegrationTest;
import poolhub.domain.Pool;
import poolhub.repository.PoolRepository;
import poolhub.service.dto.PoolListResponseDto;
import poolhub.service.mapper.PoolMapper;
import poolhub.service.serviceImpl.PoolServiceImpl;

@IntegrationTest
@Transactional
public class PoolServiceImplTest {

    @Mock
    private PoolRepository poolRepository;

    @Mock
    private EntityManager em;

    private PoolService poolService;

    private List<Pool> poolDb;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        poolService = new PoolServiceImpl(poolRepository, em);

        for (int i = 0; i < 3; i++) {
            Pool mp = new Pool();
            mp.setId((long) i);
            mp.setRef("a" + i);
            mp.setLabel(i + "a" + i);
            poolDb.add(mp);
        }
    }

    @Test
    void getAllPool() {
        //set the findAll() comportment
        int nbPage = 1;
        int pageSize = 6;

        Pageable pageable = PageRequest.of(nbPage, pageSize);
        Page<Pool> result = new PageImpl<>(poolDb, pageable, poolDb.size()); //on search test, replace poolDb by a list containing only the results that validate the filters

        when(poolRepository.findAll(pageable)).thenReturn(result);

        //create the expected result
        Page<PoolListResponseDto> expected = new PageImpl<>(
            result.map(PoolMapper::mapToListResponse).toList(),
            pageable,
            result.getTotalElements()
        );

        // get the result of the method
        Page<PoolListResponseDto> newResult = poolService.getAllPools(nbPage, pageSize);

        // verify the result is equal to the expected result
        assertEquals(expected.getTotalElements(), result.getTotalElements());

        for (int i = 0; i < expected.getTotalElements(); i++) {
            //assertTrue(expected.getContent().map(/*garder que l'id pour chaque element*/).contains(/*result[i].id*/));
        }
    }
}
