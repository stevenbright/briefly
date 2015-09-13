package briefly.model;

import lombok.Builder;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.ToString;

/**
 * Represents favorites entries.
 */
@Getter
@Builder
@EqualsAndHashCode
@ToString
public class Favorites {
  private final String name;
}
