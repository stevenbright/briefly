package briefly.model.catalog;

import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.ToString;

import java.util.List;

/**
 * @author Alexander Shabanov
 */
@Getter
@AllArgsConstructor
@ToString
@EqualsAndHashCode
public final class CatalogAttribute {
  private final String name;
  private final List<NamedValue> entries;
}
