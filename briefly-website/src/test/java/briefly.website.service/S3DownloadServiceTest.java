package briefly.website.service;

import briefly.eolaire.model.EolaireModel;
import briefly.eolaire.model.MetadataKeys;
import briefly.website.service.support.S3DownloadService;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.GeneratePresignedUrlRequest;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.ArgumentCaptor;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletResponse;

import java.io.IOException;
import java.net.URL;
import java.util.List;

import static org.junit.Assert.assertEquals;
import static org.mockito.Mockito.*;

/**
 * Tests for {@link S3DownloadService}.
 *
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

  @Test
  public void shouldSaveExistingItem() throws IOException {
    // Given:
    final long itemId = 1100L;
    final long libId = 5423187L;
    final HttpServletResponse response = mock(HttpServletResponse.class);
    final URL url = new URL("http://omozon.zz/sample/file");
    itemService.updateMetadata(itemId, MetadataKeys.addLibId(EolaireModel.Metadata.newBuilder(), libId).build());
    final ArgumentCaptor<GeneratePresignedUrlRequest> genUrlCaptor = ArgumentCaptor
        .forClass(GeneratePresignedUrlRequest.class);
    when(amazonS3Mock.generatePresignedUrl(genUrlCaptor.capture()))
        .thenReturn(url);

    // When:
    downloadService.download(itemId, response);

    // Then:
    verify(response).sendRedirect(eq(url.toString()));

    final List<GeneratePresignedUrlRequest> requestList = genUrlCaptor.getAllValues();
    assertEquals(1, requestList.size());
    final GeneratePresignedUrlRequest request = requestList.get(0);
    assertEquals("myBucket/RussianBooks/" + libId + ".fb2.zip", request.getKey());
  }
}
