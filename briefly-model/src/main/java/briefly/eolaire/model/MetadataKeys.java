package briefly.eolaire.model;

/**
 * Keys for metadata entries.
 *
 * @author Alexander Shabanov
 */
public final class MetadataKeys {
  private MetadataKeys() {}

  /**
   * Corresponding value - INT32.
   */
  public static final String SERIES_POS_KEY = "seriesPos";

  /**
   * Corresponding value - INT64.
   */
  public static final String LIB_ID_KEY = "libId";

  /**
   * Meaning: file size in lib.
   * Corresponding value - INT32.
   */
  public static final String LIB_FILE_SIZE_KEY = "libSize";

  /**
   * Meaning: UTC timestamp of date added.
   * Corresponding value - INT64.
   */
  public static final String LIB_ADDED_KEY = "libAdded";
}
