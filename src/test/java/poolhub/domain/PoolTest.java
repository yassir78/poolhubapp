package poolhub.domain;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.Test;
import poolhub.web.rest.TestUtil;

class PoolTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Pool.class);
        Pool pool1 = new Pool();
        pool1.setId(1L);
        Pool pool2 = new Pool();
        pool2.setId(pool1.getId());
        assertThat(pool1).isEqualTo(pool2);
        pool2.setId(2L);
        assertThat(pool1).isNotEqualTo(pool2);
        pool1.setId(null);
        assertThat(pool1).isNotEqualTo(pool2);
    }
}
