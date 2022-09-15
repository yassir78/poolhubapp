package poolhub.service.serviceImpl;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.cloud.storage.*;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import com.google.firebase.cloud.StorageClient;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import poolhub.service.MediaService;

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

@Service
public class MediaServiceImpl implements MediaService {

    public MediaServiceImpl(){}

    @Override
    public String uploadToFirebase(MultipartFile multipartFile) throws IOException{
        String objectName = generateFileName(multipartFile);

        FileInputStream serviceAccount = new FileInputStream(
            "src/main/resources/config/firebase/poolhubapp-859cf-firebase-adminsdk-730ve-e03928dc77.json"
        );/*
        File file = convertMultiPartToFile(multipartFile);
        Path filePath = file.toPath();

        Storage storage = StorageOptions
            .newBuilder()
            .setCredentials(GoogleCredentials.fromStream(serviceAccount))
            .setProjectId("poolhubapp-859cf")
            .build()
            .getService();*/

        FirebaseOptions options = FirebaseOptions.builder()
            .setCredentials(GoogleCredentials.fromStream(serviceAccount))
            .setStorageBucket("poolhubapp-859cf.appspot.com")
            .build();

        FirebaseApp.initializeApp(options);
        /*
        BlobId blobId = BlobId.of(, objectName);
        BlobInfo blobInfo = BlobInfo.newBuilder(blobId).setContentType(multipartFile.getContentType()).build();

        storage.create(blobInfo, Files.readAllBytes(filePath));
*/         Bucket bucket = StorageClient.getInstance().bucket();

        bucket.create(objectName, multipartFile.getBytes(), multipartFile.getContentType());
        //file.delete();

        return String.format(
            "https://firebasestorage.googleapis.com/v0/b/poolhubapp-859cf.appspot.com/o/%s?alt=media",
            URLEncoder.encode(objectName, StandardCharsets.UTF_8)
        );
    }

    private File convertMultiPartToFile(MultipartFile file) throws IOException {
        File convertedFile = new File(Objects.requireNonNull(file.getOriginalFilename()));
        FileOutputStream fos = new FileOutputStream(convertedFile);
        fos.write(file.getBytes());
        fos.close();
        return convertedFile;
    }

    private String generateFileName(MultipartFile multiPart) {
        return "uploaded_images/" + new Date().getTime() + "-" + Objects.requireNonNull(multiPart.getOriginalFilename()).replace(" ", "_");
    }
}
