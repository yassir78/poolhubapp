package poolhub.web.rest.media;

import java.io.IOException;
import java.util.logging.Logger;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import poolhub.service.MediaService;

@RestController
@RequestMapping("/api/media")
public class MediaController {

    private final MediaService mediaService;
    private Logger logger = Logger.getLogger(MediaController.class.getName());

    public MediaController(MediaService mediaService) {
        this.mediaService = mediaService;
    }

    @PutMapping("/upload")
    public ResponseEntity<String> uploadFile(@RequestParam(value = "file") MultipartFile file) throws IOException {
        logger.info("Uploading file");
        logger.info("upload image " + file.getBytes().length);
        return new ResponseEntity<>(mediaService.uploadToFirebase(file), HttpStatus.CREATED);
    }
}
