package poolhub.api;

import static org.hamcrest.Matchers.hasSize;
import static org.mockito.ArgumentMatchers.anyInt;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.setup.MockMvcBuilders.standaloneSetup;

import java.util.List;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.MockitoJUnitRunner;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import poolhub.service.PoolService;
import poolhub.service.dto.PoolResponseDto;
import poolhub.web.rest.pool.PoolController;

@RunWith(MockitoJUnitRunner.class)
public class PoolControllerTest {

    @Mock
    private PoolService poolService;

    @InjectMocks
    PoolController poolController;

    private MockMvc mockMvc;

    @Before
    public void init() {
        mockMvc = standaloneSetup(poolController).build();
    }

    @Test
    public void findAll_should_return_list_of_identities_with_status_ok() throws Exception {
        Page<PoolResponseDto> poolsPage = new PageImpl<>(List.of(new PoolResponseDto()));

        when(poolService.getAllPools(anyInt(), anyInt())).thenReturn(poolsPage);
        mockMvc
            .perform(get("/api/pool/page/{page}/size/{size}", 0, 1))
            .andExpect(MockMvcResultMatchers.status().isOk())
            .andExpect(jsonPath("$.content", hasSize(1)));
    }
}
