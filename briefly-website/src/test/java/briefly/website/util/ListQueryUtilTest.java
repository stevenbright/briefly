package briefly.website.util;

import org.junit.Test;

import static org.junit.Assert.assertEquals;

/**
 * @author Alexander Shabanov
 */
public final class ListQueryUtilTest {

  @Test
  public void shouldSerializeOffsetToken() {
    // Given:
    final long id = 123L;

    // When:
    final String token = ListQueryUtil.toOffsetToken(id);

    // Then:
    assertEquals(id, ListQueryUtil.longFromOffsetToken(token));
  }
}
