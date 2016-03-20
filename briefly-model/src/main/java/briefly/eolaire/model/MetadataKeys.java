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

  public static EolaireModel.Metadata.Builder addLibId(EolaireModel.Metadata.Builder builder, long libId) {
    return builder.addEntries(EolaireModel.MetadataEntry.newBuilder().setKey(MetadataKeys.LIB_ID_KEY)
        .setType(EolaireModel.VariantType.INT64)
        .setValue(EolaireModel.VariantValue.newBuilder().setLongValue(libId)));
  }

  public static EolaireModel.Metadata.Builder addLibAdded(EolaireModel.Metadata.Builder builder, long libAdded) {
    return builder.addEntries(EolaireModel.MetadataEntry.newBuilder().setKey(MetadataKeys.LIB_ADDED_KEY)
        .setType(EolaireModel.VariantType.INT64)
        .setValue(EolaireModel.VariantValue.newBuilder().setLongValue(libAdded)));
  }

  public static EolaireModel.Metadata.Builder addLibSize(EolaireModel.Metadata.Builder builder, int fileSize) {
    return builder.addEntries(EolaireModel.MetadataEntry.newBuilder().setKey(MetadataKeys.LIB_FILE_SIZE_KEY)
        .setType(EolaireModel.VariantType.INT32)
        .setValue(EolaireModel.VariantValue.newBuilder().setIntValue(fileSize)));
  }

  public static EolaireModel.Metadata.Builder addSeriesPos(EolaireModel.Metadata.Builder builder, int seriesPos) {
    return builder.addEntries(EolaireModel.MetadataEntry.newBuilder().setKey(MetadataKeys.SERIES_POS_KEY)
        .setType(EolaireModel.VariantType.INT32)
        .setValue(EolaireModel.VariantValue.newBuilder().setIntValue(seriesPos)));
  }
}
