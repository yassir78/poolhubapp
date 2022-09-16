package poolhub.web.rest.pool;

import java.util.Objects;
import java.util.logging.Logger;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import poolhub.service.PoolService;
import poolhub.service.dto.PoolListResponseDto;
import poolhub.service.dto.PoolSearchDto;

@RestController
@RequestMapping("/api/pool")
public class PoolController {

    private final PoolService poolService;
    private Logger logger = Logger.getLogger(PoolController.class.getName());

    public PoolController(PoolService poolService) {
        this.poolService = poolService;
    }

    @GetMapping("/page/{page}/size/{size}")
    public ResponseEntity<Page<PoolListResponseDto>> findAll(@PathVariable Integer page, @PathVariable Integer size) {
        logger.info("Find all pools");
        return new ResponseEntity<>(poolService.getAllPools(page, size), HttpStatus.OK);
    }

    @PostMapping("/search/page/{page}/size/{size}")
    public ResponseEntity<Page<PoolListResponseDto>> findBySearchCriteria(
        @PathVariable Integer page,
        @PathVariable Integer size,
        @RequestBody PoolSearchDto poolSearchDto
    ) {
        logger.info("Find pools by search criteria");
        return new ResponseEntity<>(poolService.findBySearchCriteria(page, size, poolSearchDto), HttpStatus.OK);
    }
}
