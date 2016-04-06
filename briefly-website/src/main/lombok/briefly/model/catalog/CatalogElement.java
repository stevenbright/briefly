package briefly.model.catalog;

import lombok.*;

import java.util.List;

/**
 * @author Alexander Shabanov
 */
@Getter
@Builder
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@ToString
@EqualsAndHashCode
public final class CatalogElement {
  private final long id;
  private final String name;
  private final List<CatalogAttribute> attributes;
}
