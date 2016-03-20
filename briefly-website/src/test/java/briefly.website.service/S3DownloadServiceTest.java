package briefly.website.service;

import com.amazonaws.services.s3.AmazonS3;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletResponse;

import java.io.IOException;

import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.verifyZeroInteractions;

/**
 * @author Alexander Shabanov
 */
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = "/spring/S3DownloadServiceTest-context.xml")
@Transactional
public final class S3DownloadServiceTest {

  @Resource EolaireItemService itemService;

  @Resource DownloadService downloadService;

  @Resource AmazonS3 amazonS3Mock;


  @Test
  public void shouldNotSaveNonExistingItem() throws IOException {
    // Given:
    final HttpServletResponse response = mock(HttpServletResponse.class);
    final long id = 987654654654123165L;

    // When:
    downloadService.download(id, response);

    // Then:
    verify(response).sendError(HttpServletResponse.SC_NOT_FOUND);
    verifyZeroInteractions(amazonS3Mock);
  }
}
