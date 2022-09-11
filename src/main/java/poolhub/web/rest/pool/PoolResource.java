package poolhub.web.rest.pool;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import poolhub.domain.Pool;
import poolhub.repository.PoolRepository;
import poolhub.web.rest.exceptions.BadRequestAlertException;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link poolhub.domain.Pool}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class PoolResource {

    private final Logger log = LoggerFactory.getLogger(PoolResource.class);

    private static final String ENTITY_NAME = "pool";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final PoolRepository poolRepository;

    public PoolResource(PoolRepository poolRepository) {
        this.poolRepository = poolRepository;
    }

    /**
     * {@code POST  /pools} : Create a new pool.
     *
     * @param pool the pool to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new pool, or with status {@code 400 (Bad Request)} if the pool has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/pools")
    public ResponseEntity<Pool> createPool(@Valid @RequestBody Pool pool) throws URISyntaxException {
        log.debug("REST request to save Pool : {}", pool);
        if (pool.getId() != null) {
            throw new BadRequestAlertException("A new pool cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Pool result = poolRepository.save(pool);
        return ResponseEntity
            .created(new URI("/api/pools/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /pools/:id} : Updates an existing pool.
     *
     * @param id the id of the pool to save.
     * @param pool the pool to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated pool,
     * or with status {@code 400 (Bad Request)} if the pool is not valid,
     * or with status {@code 500 (Internal Server Error)} if the pool couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/pools/{id}")
    public ResponseEntity<Pool> updatePool(@PathVariable(value = "id", required = false) final Long id, @Valid @RequestBody Pool pool)
        throws URISyntaxException {
        log.debug("REST request to update Pool : {}, {}", id, pool);
        if (pool.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, pool.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!poolRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Pool result = poolRepository.save(pool);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, pool.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /pools/:id} : Partial updates given fields of an existing pool, field will ignore if it is null
     *
     * @param id the id of the pool to save.
     * @param pool the pool to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated pool,
     * or with status {@code 400 (Bad Request)} if the pool is not valid,
     * or with status {@code 404 (Not Found)} if the pool is not found,
     * or with status {@code 500 (Internal Server Error)} if the pool couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/pools/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<Pool> partialUpdatePool(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody Pool pool
    ) throws URISyntaxException {
        log.debug("REST request to partial update Pool partially : {}, {}", id, pool);
        if (pool.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, pool.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!poolRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<Pool> result = poolRepository
            .findById(pool.getId())
            .map(existingPool -> {
                if (pool.getRef() != null) {
                    existingPool.setRef(pool.getRef());
                }
                if (pool.getLabel() != null) {
                    existingPool.setLabel(pool.getLabel());
                }
                if (pool.getBrand() != null) {
                    existingPool.setBrand(pool.getBrand());
                }
                if (pool.getDescription() != null) {
                    existingPool.setDescription(pool.getDescription());
                }
                if (pool.getImage() != null) {
                    existingPool.setImage(pool.getImage());
                }
                if (pool.getPrice() != null) {
                    existingPool.setPrice(pool.getPrice());
                }
                if (pool.getStock() != null) {
                    existingPool.setStock(pool.getStock());
                }
                if (pool.getActive() != null) {
                    existingPool.setActive(pool.getActive());
                }
                if (pool.getVolume() != null) {
                    existingPool.setVolume(pool.getVolume());
                }
                if (pool.getWidth() != null) {
                    existingPool.setWidth(pool.getWidth());
                }
                if (pool.getLength() != null) {
                    existingPool.setLength(pool.getLength());
                }
                if (pool.getHeight() != null) {
                    existingPool.setHeight(pool.getHeight());
                }
                if (pool.getShape() != null) {
                    existingPool.setShape(pool.getShape());
                }
                if (pool.getMaterial() != null) {
                    existingPool.setMaterial(pool.getMaterial());
                }
                if (pool.getColor() != null) {
                    existingPool.setColor(pool.getColor());
                }
                if (pool.getCategory() != null) {
                    existingPool.setCategory(pool.getCategory());
                }

                return existingPool;
            })
            .map(poolRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, pool.getId().toString())
        );
    }

    /**
     * {@code GET  /pools} : get all the pools.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of pools in body.
     */
    @GetMapping("/pools")
    public List<Pool> getAllPools() {
        log.debug("REST request to get all Pools");
        return poolRepository.findAll();
    }

    /**
     * {@code GET  /pools/:id} : get the "id" pool.
     *
     * @param id the id of the pool to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the pool, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/pools/{id}")
    public ResponseEntity<Pool> getPool(@PathVariable Long id) {
        log.debug("REST request to get Pool : {}", id);
        Optional<Pool> pool = poolRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(pool);
    }

    /**
     * {@code DELETE  /pools/:id} : delete the "id" pool.
     *
     * @param id the id of the pool to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/pools/{id}")
    public ResponseEntity<Void> deletePool(@PathVariable Long id) {
        log.debug("REST request to delete Pool : {}", id);
        poolRepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
