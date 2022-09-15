package poolhub.web.rest.media;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import poolhub.service.MediaService;

import java.io.IOException;
import java.util.logging.Logger;

@RestController
@RequestMapping("/api/medias")
public class MediaController {

    private final MediaService mediaService;
    private Logger logger = Logger.getLogger(MediaController.class.getName());

    public MediaController(MediaService mediaService) {
        this.mediaService = mediaService;
    }

    @PostMapping("/upload")
    public ResponseEntity<String> uploadFile(@RequestBody MultipartFile file) throws IOException {
        logger.info("upload image " + file.getOriginalFilename());
        return new ResponseEntity<>(mediaService.uploadToFirebase(file), HttpStatus.CREATED);
    }

}

