package poolhub.service;
import static org.assertj.core.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.InputStreamReader;
import java.net.URI;
import java.net.URL;
import java.nio.charset.Charset;
import java.util.Properties;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import javax.mail.Multipart;
import javax.mail.Session;
import javax.mail.internet.MimeBodyPart;
import javax.mail.internet.MimeMessage;
import javax.mail.internet.MimeMultipart;

import org.junit.BeforeClass;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentCaptor;
import org.mockito.Captor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.domain.Page;
import org.springframework.mail.MailSendException;
import org.springframework.mail.javamail.JavaMailSender;
import poolhub.IntegrationTest;
import poolhub.config.Constants;
import poolhub.domain.User;
import poolhub.service.dto.PoolListResponseDto;
import tech.jhipster.config.JHipsterProperties;

public class PoolServiceImplTest {
    private static Page<PoolListResponseDto> pg ;

    @BeforeClass
    public void init(){
        pg = mock(Page.class);

    }
    @Test
    void testgetAllPools() throws Exception {

    }

}
