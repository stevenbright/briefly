package briefly.website.service.support;

import briefly.eolaire.model.EolaireModel;
import briefly.eolaire.model.MetadataKeys;
import briefly.website.service.DownloadService;
import briefly.website.service.EolaireItemService;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.GeneratePresignedUrlRequest;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.net.URL;
import java.util.Date;
import java.util.List;

/**
 * @author Alexander Shabanov
 */
public final class S3BookDownloadService extends AbstractService implements DownloadService {
  private final long urlExpirationMillis = 60000L;
  private final String bucketKeyPrefix = "myBucket"; // TODO: properties
  private final String bucketKeySuffix = ".fb2.zip";
  private final String bucketName = "testBucketName";
  private final EolaireItemService itemService;
  private final AmazonS3 s3Client;
  private long cachedOriginId = -1;

  public S3BookDownloadService(EolaireItemService itemService, AmazonS3 s3Client) {
    this.itemService = itemService;
    this.s3Client = s3Client;
  }

  @Override
  public void download(long id, HttpServletResponse response) throws IOException {
    final String presignedUrl = getPresignedBookUrl(id);
    log.info("Using presigned URL={}", presignedUrl);
    response.sendRedirect(presignedUrl);
  }

  private String getPresignedBookUrl(long itemId) {
    final List<EolaireModel.ItemProfile> itemProfiles = itemService.getItemProfile(itemId);
    if (itemProfiles.isEmpty()) {
      log.trace("No item with id={}", itemId);
      return null;
    }
    final Long bookId = getLibId(itemProfiles.get(0));
    if (bookId == null) {
      log.trace("No download link for id={}", itemId);
      return null;
    }

    final String bookOrigin = getOrigin(itemId);
    if (bookOrigin == null) {
      log.warn("No origin for item with id={}", itemId);
      return null;
    }

    final String s3Key = bucketKeyPrefix + '/' + bookOrigin + '/' + bookId + bucketKeySuffix;
    final Date expirationTime = new Date(System.currentTimeMillis() + urlExpirationMillis);
    final GeneratePresignedUrlRequest request = new GeneratePresignedUrlRequest(bucketName, s3Key)
        .withExpiration(expirationTime);

    final URL url = s3Client.generatePresignedUrl(request);
    return url.toString();
  }

  private long getOriginId() {
    if (cachedOriginId >= 0) {
      return cachedOriginId;
    }

    final List<EolaireModel.EntityType> entityTypes = itemService.getEntityTypeByName("origin");
    if (entityTypes.isEmpty()) {
      throw new IllegalStateException("No origin entity type");
    }

    cachedOriginId = entityTypes.get(0).getId();
    return cachedOriginId;
  }

  private String getOrigin(long itemId) {
    final List<EolaireModel.ItemRelation> relations = itemService
        .getItemRelations(itemId, EolaireModel.RelationsFilterMode.ALL);

    for (final EolaireModel.ItemRelation relation : relations) {
      if (relation.getRelationTypeId() == getOriginId()) {
        final long targetItemId = relation.getTargetItemId();
        final EolaireModel.Item item = itemService.getItemById(targetItemId);
        return item.getName();
      }
    }

    return null;
  }

  private static Long getLibId(EolaireModel.ItemProfile itemProfile) {
    for (final EolaireModel.MetadataEntry metadataEntry : itemProfile.getMetadata().getEntriesList()) {
      if (MetadataKeys.LIB_ID_KEY.equals(metadataEntry.getKey())) {
        return metadataEntry.getValue().getLongValue();
      }
    }
    return null;
  }
}
