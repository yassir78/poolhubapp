package poolhub.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static poolhub.web.rest.TestUtil.sameNumber;

import java.math.BigDecimal;
import java.util.List;
import java.util.Random;
import java.util.concurrent.atomic.AtomicLong;
import javax.persistence.EntityManager;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;
import poolhub.IntegrationTest;
import poolhub.domain.Pool;
import poolhub.domain.enumeration.Category;
import poolhub.domain.enumeration.Color;
import poolhub.domain.enumeration.Material;
import poolhub.domain.enumeration.Shape;
import poolhub.repository.PoolRepository;
import poolhub.web.rest.pool.PoolResource;

/**
 * Integration tests for the {@link PoolResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class PoolResourceIT {

    private static final String DEFAULT_REF = "AAAAAAAAAA";
    private static final String UPDATED_REF = "BBBBBBBBBB";

    private static final String DEFAULT_LABEL = "AAAAAAAAAA";
    private static final String UPDATED_LABEL = "BBBBBBBBBB";

    private static final String DEFAULT_BRAND = "AAAAAAAAAA";
    private static final String UPDATED_BRAND = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    private static final String DEFAULT_IMAGE = "AAAAAAAAAA";
    private static final String UPDATED_IMAGE = "BBBBBBBBBB";

    private static final BigDecimal DEFAULT_PRICE = new BigDecimal(1);
    private static final BigDecimal UPDATED_PRICE = new BigDecimal(2);

    private static final Integer DEFAULT_STOCK = 1;
    private static final Integer UPDATED_STOCK = 2;

    private static final Boolean DEFAULT_ACTIVE = false;
    private static final Boolean UPDATED_ACTIVE = true;

    private static final Double DEFAULT_VOLUME = 1D;
    private static final Double UPDATED_VOLUME = 2D;

    private static final Double DEFAULT_WIDTH = 1D;
    private static final Double UPDATED_WIDTH = 2D;

    private static final Double DEFAULT_LENGTH = 1D;
    private static final Double UPDATED_LENGTH = 2D;

    private static final Double DEFAULT_HEIGHT = 1D;
    private static final Double UPDATED_HEIGHT = 2D;

    private static final Shape DEFAULT_SHAPE = Shape.RECTANGULAR;
    private static final Shape UPDATED_SHAPE = Shape.CIRCULAR;

    private static final Material DEFAULT_MATERIAL = Material.WOOD;
    private static final Material UPDATED_MATERIAL = Material.BLACK;

    private static final Color DEFAULT_COLOR = Color.BLUE;
    private static final Color UPDATED_COLOR = Color.BLACK;

    private static final Category DEFAULT_CATEGORY = Category.INGROUND;
    private static final Category UPDATED_CATEGORY = Category.SEMI_INGROUND;

    private static final String ENTITY_API_URL = "/api/pools";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private PoolRepository poolRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restPoolMockMvc;

    private Pool pool;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Pool createEntity(EntityManager em) {
        Pool pool = new Pool()
            .ref(DEFAULT_REF)
            .label(DEFAULT_LABEL)
            .brand(DEFAULT_BRAND)
            .description(DEFAULT_DESCRIPTION)
            .image(DEFAULT_IMAGE)
            .price(DEFAULT_PRICE)
            .stock(DEFAULT_STOCK)
            .active(DEFAULT_ACTIVE)
            .volume(DEFAULT_VOLUME)
            .width(DEFAULT_WIDTH)
            .length(DEFAULT_LENGTH)
            .height(DEFAULT_HEIGHT)
            .shape(DEFAULT_SHAPE)
            .material(DEFAULT_MATERIAL)
            .color(DEFAULT_COLOR)
            .category(DEFAULT_CATEGORY);
        return pool;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Pool createUpdatedEntity(EntityManager em) {
        Pool pool = new Pool()
            .ref(UPDATED_REF)
            .label(UPDATED_LABEL)
            .brand(UPDATED_BRAND)
            .description(UPDATED_DESCRIPTION)
            .image(UPDATED_IMAGE)
            .price(UPDATED_PRICE)
            .stock(UPDATED_STOCK)
            .active(UPDATED_ACTIVE)
            .volume(UPDATED_VOLUME)
            .width(UPDATED_WIDTH)
            .length(UPDATED_LENGTH)
            .height(UPDATED_HEIGHT)
            .shape(UPDATED_SHAPE)
            .material(UPDATED_MATERIAL)
            .color(UPDATED_COLOR)
            .category(UPDATED_CATEGORY);
        return pool;
    }

    @BeforeEach
    public void initTest() {
        pool = createEntity(em);
    }

    @Test
    @Transactional
    void createPool() throws Exception {
        int databaseSizeBeforeCreate = poolRepository.findAll().size();
        // Create the Pool
        restPoolMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(pool)))
            .andExpect(status().isCreated());

        // Validate the Pool in the database
        List<Pool> poolList = poolRepository.findAll();
        assertThat(poolList).hasSize(databaseSizeBeforeCreate + 1);
        Pool testPool = poolList.get(poolList.size() - 1);
        assertThat(testPool.getRef()).isEqualTo(DEFAULT_REF);
        assertThat(testPool.getLabel()).isEqualTo(DEFAULT_LABEL);
        assertThat(testPool.getBrand()).isEqualTo(DEFAULT_BRAND);
        assertThat(testPool.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
        assertThat(testPool.getImage()).isEqualTo(DEFAULT_IMAGE);
        assertThat(testPool.getPrice()).isEqualByComparingTo(DEFAULT_PRICE);
        assertThat(testPool.getStock()).isEqualTo(DEFAULT_STOCK);
        assertThat(testPool.getActive()).isEqualTo(DEFAULT_ACTIVE);
        assertThat(testPool.getVolume()).isEqualTo(DEFAULT_VOLUME);
        assertThat(testPool.getWidth()).isEqualTo(DEFAULT_WIDTH);
        assertThat(testPool.getLength()).isEqualTo(DEFAULT_LENGTH);
        assertThat(testPool.getHeight()).isEqualTo(DEFAULT_HEIGHT);
        assertThat(testPool.getShape()).isEqualTo(DEFAULT_SHAPE);
        assertThat(testPool.getMaterial()).isEqualTo(DEFAULT_MATERIAL);
        assertThat(testPool.getColor()).isEqualTo(DEFAULT_COLOR);
        assertThat(testPool.getCategory()).isEqualTo(DEFAULT_CATEGORY);
    }

    @Test
    @Transactional
    void createPoolWithExistingId() throws Exception {
        // Create the Pool with an existing ID
        pool.setId(1L);

        int databaseSizeBeforeCreate = poolRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restPoolMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(pool)))
            .andExpect(status().isBadRequest());

        // Validate the Pool in the database
        List<Pool> poolList = poolRepository.findAll();
        assertThat(poolList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void checkRefIsRequired() throws Exception {
        int databaseSizeBeforeTest = poolRepository.findAll().size();
        // set the field null
        pool.setRef(null);

        // Create the Pool, which fails.

        restPoolMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(pool)))
            .andExpect(status().isBadRequest());

        List<Pool> poolList = poolRepository.findAll();
        assertThat(poolList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void checkLabelIsRequired() throws Exception {
        int databaseSizeBeforeTest = poolRepository.findAll().size();
        // set the field null
        pool.setLabel(null);

        // Create the Pool, which fails.

        restPoolMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(pool)))
            .andExpect(status().isBadRequest());

        List<Pool> poolList = poolRepository.findAll();
        assertThat(poolList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void getAllPools() throws Exception {
        // Initialize the database
        poolRepository.saveAndFlush(pool);

        // Get all the poolList
        restPoolMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(pool.getId().intValue())))
            .andExpect(jsonPath("$.[*].ref").value(hasItem(DEFAULT_REF)))
            .andExpect(jsonPath("$.[*].label").value(hasItem(DEFAULT_LABEL)))
            .andExpect(jsonPath("$.[*].brand").value(hasItem(DEFAULT_BRAND)))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION)))
            .andExpect(jsonPath("$.[*].image").value(hasItem(DEFAULT_IMAGE)))
            .andExpect(jsonPath("$.[*].price").value(hasItem(sameNumber(DEFAULT_PRICE))))
            .andExpect(jsonPath("$.[*].stock").value(hasItem(DEFAULT_STOCK)))
            .andExpect(jsonPath("$.[*].active").value(hasItem(DEFAULT_ACTIVE.booleanValue())))
            .andExpect(jsonPath("$.[*].volume").value(hasItem(DEFAULT_VOLUME.doubleValue())))
            .andExpect(jsonPath("$.[*].width").value(hasItem(DEFAULT_WIDTH.doubleValue())))
            .andExpect(jsonPath("$.[*].length").value(hasItem(DEFAULT_LENGTH.doubleValue())))
            .andExpect(jsonPath("$.[*].height").value(hasItem(DEFAULT_HEIGHT.doubleValue())))
            .andExpect(jsonPath("$.[*].shape").value(hasItem(DEFAULT_SHAPE.toString())))
            .andExpect(jsonPath("$.[*].material").value(hasItem(DEFAULT_MATERIAL.toString())))
            .andExpect(jsonPath("$.[*].color").value(hasItem(DEFAULT_COLOR.toString())))
            .andExpect(jsonPath("$.[*].category").value(hasItem(DEFAULT_CATEGORY.toString())));
    }

    @Test
    @Transactional
    void getPool() throws Exception {
        // Initialize the database
        poolRepository.saveAndFlush(pool);

        // Get the pool
        restPoolMockMvc
            .perform(get(ENTITY_API_URL_ID, pool.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(pool.getId().intValue()))
            .andExpect(jsonPath("$.ref").value(DEFAULT_REF))
            .andExpect(jsonPath("$.label").value(DEFAULT_LABEL))
            .andExpect(jsonPath("$.brand").value(DEFAULT_BRAND))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION))
            .andExpect(jsonPath("$.image").value(DEFAULT_IMAGE))
            .andExpect(jsonPath("$.price").value(sameNumber(DEFAULT_PRICE)))
            .andExpect(jsonPath("$.stock").value(DEFAULT_STOCK))
            .andExpect(jsonPath("$.active").value(DEFAULT_ACTIVE.booleanValue()))
            .andExpect(jsonPath("$.volume").value(DEFAULT_VOLUME.doubleValue()))
            .andExpect(jsonPath("$.width").value(DEFAULT_WIDTH.doubleValue()))
            .andExpect(jsonPath("$.length").value(DEFAULT_LENGTH.doubleValue()))
            .andExpect(jsonPath("$.height").value(DEFAULT_HEIGHT.doubleValue()))
            .andExpect(jsonPath("$.shape").value(DEFAULT_SHAPE.toString()))
            .andExpect(jsonPath("$.material").value(DEFAULT_MATERIAL.toString()))
            .andExpect(jsonPath("$.color").value(DEFAULT_COLOR.toString()))
            .andExpect(jsonPath("$.category").value(DEFAULT_CATEGORY.toString()));
    }

    @Test
    @Transactional
    void getNonExistingPool() throws Exception {
        // Get the pool
        restPoolMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putExistingPool() throws Exception {
        // Initialize the database
        poolRepository.saveAndFlush(pool);

        int databaseSizeBeforeUpdate = poolRepository.findAll().size();

        // Update the pool
        Pool updatedPool = poolRepository.findById(pool.getId()).get();
        // Disconnect from session so that the updates on updatedPool are not directly saved in db
        em.detach(updatedPool);
        updatedPool
            .ref(UPDATED_REF)
            .label(UPDATED_LABEL)
            .brand(UPDATED_BRAND)
            .description(UPDATED_DESCRIPTION)
            .image(UPDATED_IMAGE)
            .price(UPDATED_PRICE)
            .stock(UPDATED_STOCK)
            .active(UPDATED_ACTIVE)
            .volume(UPDATED_VOLUME)
            .width(UPDATED_WIDTH)
            .length(UPDATED_LENGTH)
            .height(UPDATED_HEIGHT)
            .shape(UPDATED_SHAPE)
            .material(UPDATED_MATERIAL)
            .color(UPDATED_COLOR)
            .category(UPDATED_CATEGORY);

        restPoolMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedPool.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedPool))
            )
            .andExpect(status().isOk());

        // Validate the Pool in the database
        List<Pool> poolList = poolRepository.findAll();
        assertThat(poolList).hasSize(databaseSizeBeforeUpdate);
        Pool testPool = poolList.get(poolList.size() - 1);
        assertThat(testPool.getRef()).isEqualTo(UPDATED_REF);
        assertThat(testPool.getLabel()).isEqualTo(UPDATED_LABEL);
        assertThat(testPool.getBrand()).isEqualTo(UPDATED_BRAND);
        assertThat(testPool.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
        assertThat(testPool.getImage()).isEqualTo(UPDATED_IMAGE);
        assertThat(testPool.getPrice()).isEqualByComparingTo(UPDATED_PRICE);
        assertThat(testPool.getStock()).isEqualTo(UPDATED_STOCK);
        assertThat(testPool.getActive()).isEqualTo(UPDATED_ACTIVE);
        assertThat(testPool.getVolume()).isEqualTo(UPDATED_VOLUME);
        assertThat(testPool.getWidth()).isEqualTo(UPDATED_WIDTH);
        assertThat(testPool.getLength()).isEqualTo(UPDATED_LENGTH);
        assertThat(testPool.getHeight()).isEqualTo(UPDATED_HEIGHT);
        assertThat(testPool.getShape()).isEqualTo(UPDATED_SHAPE);
        assertThat(testPool.getMaterial()).isEqualTo(UPDATED_MATERIAL);
        assertThat(testPool.getColor()).isEqualTo(UPDATED_COLOR);
        assertThat(testPool.getCategory()).isEqualTo(UPDATED_CATEGORY);
    }

    @Test
    @Transactional
    void putNonExistingPool() throws Exception {
        int databaseSizeBeforeUpdate = poolRepository.findAll().size();
        pool.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restPoolMockMvc
            .perform(
                put(ENTITY_API_URL_ID, pool.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(pool))
            )
            .andExpect(status().isBadRequest());

        // Validate the Pool in the database
        List<Pool> poolList = poolRepository.findAll();
        assertThat(poolList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchPool() throws Exception {
        int databaseSizeBeforeUpdate = poolRepository.findAll().size();
        pool.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restPoolMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(pool))
            )
            .andExpect(status().isBadRequest());

        // Validate the Pool in the database
        List<Pool> poolList = poolRepository.findAll();
        assertThat(poolList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamPool() throws Exception {
        int databaseSizeBeforeUpdate = poolRepository.findAll().size();
        pool.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restPoolMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(pool)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Pool in the database
        List<Pool> poolList = poolRepository.findAll();
        assertThat(poolList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdatePoolWithPatch() throws Exception {
        // Initialize the database
        poolRepository.saveAndFlush(pool);

        int databaseSizeBeforeUpdate = poolRepository.findAll().size();

        // Update the pool using partial update
        Pool partialUpdatedPool = new Pool();
        partialUpdatedPool.setId(pool.getId());

        partialUpdatedPool
            .ref(UPDATED_REF)
            .label(UPDATED_LABEL)
            .description(UPDATED_DESCRIPTION)
            .image(UPDATED_IMAGE)
            .stock(UPDATED_STOCK)
            .volume(UPDATED_VOLUME)
            .height(UPDATED_HEIGHT)
            .material(UPDATED_MATERIAL)
            .color(UPDATED_COLOR)
            .category(UPDATED_CATEGORY);

        restPoolMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedPool.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedPool))
            )
            .andExpect(status().isOk());

        // Validate the Pool in the database
        List<Pool> poolList = poolRepository.findAll();
        assertThat(poolList).hasSize(databaseSizeBeforeUpdate);
        Pool testPool = poolList.get(poolList.size() - 1);
        assertThat(testPool.getRef()).isEqualTo(UPDATED_REF);
        assertThat(testPool.getLabel()).isEqualTo(UPDATED_LABEL);
        assertThat(testPool.getBrand()).isEqualTo(DEFAULT_BRAND);
        assertThat(testPool.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
        assertThat(testPool.getImage()).isEqualTo(UPDATED_IMAGE);
        assertThat(testPool.getPrice()).isEqualByComparingTo(DEFAULT_PRICE);
        assertThat(testPool.getStock()).isEqualTo(UPDATED_STOCK);
        assertThat(testPool.getActive()).isEqualTo(DEFAULT_ACTIVE);
        assertThat(testPool.getVolume()).isEqualTo(UPDATED_VOLUME);
        assertThat(testPool.getWidth()).isEqualTo(DEFAULT_WIDTH);
        assertThat(testPool.getLength()).isEqualTo(DEFAULT_LENGTH);
        assertThat(testPool.getHeight()).isEqualTo(UPDATED_HEIGHT);
        assertThat(testPool.getShape()).isEqualTo(DEFAULT_SHAPE);
        assertThat(testPool.getMaterial()).isEqualTo(UPDATED_MATERIAL);
        assertThat(testPool.getColor()).isEqualTo(UPDATED_COLOR);
        assertThat(testPool.getCategory()).isEqualTo(UPDATED_CATEGORY);
    }

    @Test
    @Transactional
    void fullUpdatePoolWithPatch() throws Exception {
        // Initialize the database
        poolRepository.saveAndFlush(pool);

        int databaseSizeBeforeUpdate = poolRepository.findAll().size();

        // Update the pool using partial update
        Pool partialUpdatedPool = new Pool();
        partialUpdatedPool.setId(pool.getId());

        partialUpdatedPool
            .ref(UPDATED_REF)
            .label(UPDATED_LABEL)
            .brand(UPDATED_BRAND)
            .description(UPDATED_DESCRIPTION)
            .image(UPDATED_IMAGE)
            .price(UPDATED_PRICE)
            .stock(UPDATED_STOCK)
            .active(UPDATED_ACTIVE)
            .volume(UPDATED_VOLUME)
            .width(UPDATED_WIDTH)
            .length(UPDATED_LENGTH)
            .height(UPDATED_HEIGHT)
            .shape(UPDATED_SHAPE)
            .material(UPDATED_MATERIAL)
            .color(UPDATED_COLOR)
            .category(UPDATED_CATEGORY);

        restPoolMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedPool.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedPool))
            )
            .andExpect(status().isOk());

        // Validate the Pool in the database
        List<Pool> poolList = poolRepository.findAll();
        assertThat(poolList).hasSize(databaseSizeBeforeUpdate);
        Pool testPool = poolList.get(poolList.size() - 1);
        assertThat(testPool.getRef()).isEqualTo(UPDATED_REF);
        assertThat(testPool.getLabel()).isEqualTo(UPDATED_LABEL);
        assertThat(testPool.getBrand()).isEqualTo(UPDATED_BRAND);
        assertThat(testPool.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
        assertThat(testPool.getImage()).isEqualTo(UPDATED_IMAGE);
        assertThat(testPool.getPrice()).isEqualByComparingTo(UPDATED_PRICE);
        assertThat(testPool.getStock()).isEqualTo(UPDATED_STOCK);
        assertThat(testPool.getActive()).isEqualTo(UPDATED_ACTIVE);
        assertThat(testPool.getVolume()).isEqualTo(UPDATED_VOLUME);
        assertThat(testPool.getWidth()).isEqualTo(UPDATED_WIDTH);
        assertThat(testPool.getLength()).isEqualTo(UPDATED_LENGTH);
        assertThat(testPool.getHeight()).isEqualTo(UPDATED_HEIGHT);
        assertThat(testPool.getShape()).isEqualTo(UPDATED_SHAPE);
        assertThat(testPool.getMaterial()).isEqualTo(UPDATED_MATERIAL);
        assertThat(testPool.getColor()).isEqualTo(UPDATED_COLOR);
        assertThat(testPool.getCategory()).isEqualTo(UPDATED_CATEGORY);
    }

    @Test
    @Transactional
    void patchNonExistingPool() throws Exception {
        int databaseSizeBeforeUpdate = poolRepository.findAll().size();
        pool.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restPoolMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, pool.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(pool))
            )
            .andExpect(status().isBadRequest());

        // Validate the Pool in the database
        List<Pool> poolList = poolRepository.findAll();
        assertThat(poolList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchPool() throws Exception {
        int databaseSizeBeforeUpdate = poolRepository.findAll().size();
        pool.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restPoolMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(pool))
            )
            .andExpect(status().isBadRequest());

        // Validate the Pool in the database
        List<Pool> poolList = poolRepository.findAll();
        assertThat(poolList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamPool() throws Exception {
        int databaseSizeBeforeUpdate = poolRepository.findAll().size();
        pool.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restPoolMockMvc
            .perform(patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(pool)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Pool in the database
        List<Pool> poolList = poolRepository.findAll();
        assertThat(poolList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deletePool() throws Exception {
        // Initialize the database
        poolRepository.saveAndFlush(pool);

        int databaseSizeBeforeDelete = poolRepository.findAll().size();

        // Delete the pool
        restPoolMockMvc
            .perform(delete(ENTITY_API_URL_ID, pool.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Pool> poolList = poolRepository.findAll();
        assertThat(poolList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
