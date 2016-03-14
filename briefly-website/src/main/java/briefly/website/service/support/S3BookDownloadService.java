package briefly.website.service.support;

import briefly.website.service.DownloadService;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.GeneratePresignedUrlRequest;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.net.URL;
import java.util.Date;

/**
 * @author Alexander Shabanov
 */
public final class S3BookDownloadService extends AbstractService implements DownloadService {
  private final long urlExpirationMillis = 60000L;
  private final String bucketKeyPrefix = "myBucket"; // TODO: properties
  private final String bucketKeySuffix = ".fb2.zip";
  private final String bucketName = "testBucketName";
  private final AmazonS3 s3Client;

  public S3BookDownloadService(AmazonS3 s3Client) {
    this.s3Client = s3Client;
  }

  @Override
  public void download(long id, HttpServletResponse response) throws IOException {
    final String presignedUrl = getPresignedBookUrl(id);
    log.info("Using presigned URL={}", presignedUrl);
    response.sendRedirect(presignedUrl);
  }

  private String getPresignedBookUrl(long id) {
    final String bookOrigin = "myorigin";
    final long bookId = 1000L + id;
    final String s3Key = bucketKeyPrefix + '/' + bookOrigin + '/' + bookId + bucketKeySuffix;
    final Date expirationTime = new Date(System.currentTimeMillis() + urlExpirationMillis);
    final GeneratePresignedUrlRequest request = new GeneratePresignedUrlRequest(bucketName, s3Key)
        .withExpiration(expirationTime);

    final URL url = s3Client.generatePresignedUrl(request);
    return url.toString();
  }
}
