package briefly.website.util;

import javax.annotation.Nonnull;

/**
 * Helper for transforming IDs to Tokens and vice versa.
 * TODO: make reusable
 *
 * @author Alexander Shabanov
 */
public final class ListQueryUtil {
  public static final int MAX_SIZE = 16;

  private static final String LONG_NUM_PREFIX = "OL-";
  private static final String INVALID_OFFSET_TOKEN_MESSAGE = "Invalid offset token";

  private ListQueryUtil() {} // Hidden

  public static long longFromOffsetToken(@Nonnull String offsetToken) {
    try {
      if (!offsetToken.startsWith(LONG_NUM_PREFIX)) {
        throw new IllegalArgumentException(INVALID_OFFSET_TOKEN_MESSAGE);
      }
      return Long.parseLong(offsetToken.substring(LONG_NUM_PREFIX.length()));
    } catch (NumberFormatException e) {
      throw new IllegalArgumentException(INVALID_OFFSET_TOKEN_MESSAGE, e);
    }
  }

  @Nonnull
  public static String toOffsetToken(long id) {
    //noinspection StringBufferReplaceableByString
    final StringBuilder result = new StringBuilder(20);
    result.append(LONG_NUM_PREFIX);
    result.append(id);
    return result.toString();
  }

  public static int checkLimit(int limit) {
    if (limit > MAX_SIZE) {
      throw new IllegalArgumentException("Size exceeds maximum: " + MAX_SIZE);
    }

    if (limit < 0) {
      throw new IllegalArgumentException("Size can't be negative");
    }

    return limit;
  }
}
