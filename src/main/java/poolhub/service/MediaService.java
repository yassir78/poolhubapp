package poolhub.service;

import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface MediaService {
    String uploadToFirebase(MultipartFile multipartFile) throws IOException;
}
