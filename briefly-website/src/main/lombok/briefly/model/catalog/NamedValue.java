package briefly.model.catalog;

import lombok.*;

/**
 * @author Alexander Shabanov
 */
@Getter
@AllArgsConstructor
@ToString
@EqualsAndHashCode
public final class NamedValue {
  private final long id;
  private final String name;
}
