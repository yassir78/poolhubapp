package poolhub;

import java.net.InetAddress;
import java.net.UnknownHostException;
import java.util.Arrays;
import java.util.Collection;
import java.util.Optional;
import javax.annotation.PostConstruct;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.liquibase.LiquibaseProperties;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.core.env.Environment;
import poolhub.config.ApplicationProperties;
import poolhub.config.CRLFLogConverter;
import poolhub.repository.PoolRepository;
import tech.jhipster.config.DefaultProfileUtil;
import tech.jhipster.config.JHipsterConstants;

@SpringBootApplication
@EnableConfigurationProperties({ LiquibaseProperties.class, ApplicationProperties.class })
public class PoolhubApp implements CommandLineRunner {

    private static final Logger log = LoggerFactory.getLogger(PoolhubApp.class);

    @Autowired
    private PoolRepository poolRepository;

    private final Environment env;

    public PoolhubApp(Environment env) {
        this.env = env;
    }

    /**
     * Initializes poolhub.
     * <p>
     * Spring profiles can be configured with a program argument --spring.profiles.active=your-active-profile
     * <p>
     * You can find more information on how profiles work with JHipster on <a
     * href="https://www.jhipster.tech/profiles/">https://www.jhipster.tech/profiles/</a>.
     */
    @PostConstruct
    public void initApplication() {
        Collection<String> activeProfiles = Arrays.asList(env.getActiveProfiles());
        if (
            activeProfiles.contains(JHipsterConstants.SPRING_PROFILE_DEVELOPMENT) &&
            activeProfiles.contains(JHipsterConstants.SPRING_PROFILE_PRODUCTION)
        ) {
            log.error(
                "You have misconfigured your application! It should not run " + "with both the 'dev' and 'prod' profiles at the same time."
            );
        }
        if (
            activeProfiles.contains(JHipsterConstants.SPRING_PROFILE_DEVELOPMENT) &&
            activeProfiles.contains(JHipsterConstants.SPRING_PROFILE_CLOUD)
        ) {
            log.error(
                "You have misconfigured your application! It should not " + "run with both the 'dev' and 'cloud' profiles at the same time."
            );
        }
    }

    /**
     * Main method, used to run the application.
     *
     * @param args the command line arguments.
     */
    public static void main(String[] args) {
        SpringApplication app = new SpringApplication(PoolhubApp.class);
        DefaultProfileUtil.addDefaultProfile(app);
        Environment env = app.run(args).getEnvironment();
        logApplicationStartup(env);
    }

    private static void logApplicationStartup(Environment env) {
        String protocol = Optional.ofNullable(env.getProperty("server.ssl.key-store")).map(key -> "https").orElse("http");
        String serverPort = env.getProperty("server.port");
        String contextPath = Optional
            .ofNullable(env.getProperty("server.servlet.context-path"))
            .filter(StringUtils::isNotBlank)
            .orElse("/");
        String hostAddress = "localhost";
        try {
            hostAddress = InetAddress.getLocalHost().getHostAddress();
        } catch (UnknownHostException e) {
            log.warn("The host name could not be determined, using `localhost` as fallback");
        }
        log.info(
            CRLFLogConverter.CRLF_SAFE_MARKER,
            "\n----------------------------------------------------------\n\t" +
            "Application '{}' is running! Access URLs:\n\t" +
            "Local: \t\t{}://localhost:{}{}\n\t" +
            "External: \t{}://{}:{}{}\n\t" +
            "Profile(s): \t{}\n----------------------------------------------------------",
            env.getProperty("spring.application.name"),
            protocol,
            serverPort,
            contextPath,
            protocol,
            hostAddress,
            serverPort,
            contextPath,
            env.getActiveProfiles().length == 0 ? env.getDefaultProfiles() : env.getActiveProfiles()
        );
    }

    @Override
    public void run(String... args) throws Exception {
        log.info("Running command line runner");
        /*  Pool pool = new Pool();
        pool.setStock(100);
        pool.ref("ref1");
        pool.label("piscine");
        pool.setPrice(BigDecimal.valueOf(100));
        Long poolId = poolRepository.save(pool).getId();
        log.info("Pool created with id {}", poolId);
        ExecutorService es = Executors.newFixedThreadPool(2);

        // User 1
        es.submit(() -> {
            System.out.println(" -- user1 updating salary to 2000 --");
            Pool p = poolRepository.findById(poolId).get();
            System.out.println("user1 loaded entity: " + p);
            p.setStock(p.getStock() - 1);

            //little delay
            try {
                Thread.sleep(1000);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
            try {
                poolRepository.save(p);
            } catch (Exception e) {
                log.error("User 2 failed to buy a ticket", e);
                return;
            }
        });

        // User 2
        es.submit(() -> {
            System.out.println(" -- user2 updating salary to 2000 --");
            Pool p = poolRepository.findById(poolId).get();
            System.out.println("user2 loaded entity: " + p);
            p.setStock(p.getStock() - 2);

            try {
                poolRepository.save(p);
                log.info("User 2 bought 2 tickets");
            } catch (Exception e) {
                log.error("User 2 failed to buy a ticket", e);
                return;
            }
        });
        es.shutdown();
        try {
            es.awaitTermination(10, TimeUnit.MINUTES);
        } catch (InterruptedException e) {
            e.printStackTrace();
        } */
    }
}
