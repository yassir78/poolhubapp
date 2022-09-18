package poolhub.service.serviceImpl;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.cloud.storage.Bucket;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import com.google.firebase.cloud.StorageClient;
import java.io.FileInputStream;
import java.io.IOException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.Date;
import java.util.Objects;
import java.util.logging.Logger;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import poolhub.service.MediaService;

@Service
public class MediaServiceImpl implements MediaService {

    private Logger logger = Logger.getLogger(MediaServiceImpl.class.getName());
    private final String CONFIG_PATH = "src/main/resources/config/firebase/poolhubapp-859cf-firebase-adminsdk-730ve-e03928dc77.json";
    private final String BUCKET_NAME = "poolhubapp-859cf.appspot.com";
    private final String BASE_URL = "https://firebasestorage.googleapis.com/v0/b/poolhubapp-859cf.appspot.com/o/%s?alt=media";

    public MediaServiceImpl() {}

    @Override
    public String uploadToFirebase(MultipartFile multipartFile) throws IOException {
        logger.info("Uploading file to firebase");
        if (Objects.isNull(multipartFile)) {
            logger.warning("File is null");
            return "";
        }
        logger.info("File name: " + multipartFile.getName());
        String objectName = generateFileName(multipartFile);
        FileInputStream serviceAccount = new FileInputStream(CONFIG_PATH);

        FirebaseOptions options = FirebaseOptions
            .builder()
            .setCredentials(GoogleCredentials.fromStream(serviceAccount))
            .setStorageBucket(BUCKET_NAME)
            .build();
        if (FirebaseApp.getApps().isEmpty()) {
            FirebaseApp.initializeApp(options);
        } else {
            FirebaseApp.getApps().get(0);
        }
        Bucket bucket = StorageClient.getInstance().bucket();
        bucket.create(objectName, multipartFile.getBytes(), multipartFile.getContentType());
        return String.format(BASE_URL, URLEncoder.encode(objectName, StandardCharsets.UTF_8));
    }

    private String generateFileName(MultipartFile multiPart) {
        return "uploaded_images/" + new Date().getTime() + "-" + Objects.requireNonNull(multiPart.getOriginalFilename()).replace(" ", "_");
    }
}
