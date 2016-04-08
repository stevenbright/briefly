package briefly.website.service.support;

import briefly.eolaire.model.EolaireModel;
import briefly.model.catalog.CatalogAttribute;
import briefly.model.catalog.CatalogElement;
import briefly.model.catalog.NamedValue;
import briefly.website.service.CatalogAdapterService;
import briefly.website.service.EolaireItemService;
import org.springframework.util.Assert;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

/**
 * @author Alexander Shabanov
 */
public final class DefaultCatalogAdapterService implements CatalogAdapterService {

  private final EolaireItemService itemService;

  private final long bookId;
  private final long genreId;
  private final long authorId;

  public DefaultCatalogAdapterService(EolaireItemService itemService) {
    this.itemService = itemService;
    bookId = getRelationTypeId("book");
    genreId = getRelationTypeId("genre");
    authorId = getRelationTypeId("author");
  }

  @Override
  public List<CatalogElement> getElements(Long startId, int limit) {
    final List<Long> ids = itemService.getItemIdsByType(bookId, null, 8);
    final List<CatalogElement> elements = ids.stream().map((id) -> {
      final EolaireModel.Item item = itemService.getItemById(id);

      final List<NamedValue> genreEntries = new ArrayList<>();
      final List<NamedValue> authorEntries = new ArrayList<>();
      final List<EolaireModel.ItemRelation> relations = itemService
          .getItemRelations(item.getId(), EolaireModel.RelationsFilterMode.ALL);
      for (final EolaireModel.ItemRelation relation : relations) {
        final EolaireModel.Item relItem = itemService.getItemById(relation.getTargetItemId());
        if (genreId == relation.getRelationTypeId()) {
          genreEntries.add(new NamedValue(relItem.getId(), relItem.getName()));
        } else if (authorId == relation.getRelationTypeId()) {
          authorEntries.add(new NamedValue(relItem.getId(), relItem.getName()));
        }
      }

      final List<CatalogAttribute> catalogAttributes = new ArrayList<>();
      if (!genreEntries.isEmpty()) {
        catalogAttributes.add(new CatalogAttribute("Genre", genreEntries));
      }
      if (!authorEntries.isEmpty()) {
        catalogAttributes.add(new CatalogAttribute("Author", authorEntries));
      }

      return CatalogElement.builder()
          .id(item.getId())
          .name(item.getName())
          .attributes(catalogAttributes)
          .build();
    }).collect(Collectors.toList());

    return Collections.unmodifiableList(elements);
  }

  //
  // Private
  //

  private long getRelationTypeId(String name) {
    final List<EolaireModel.EntityType> entityTypes = itemService.getEntityTypeByName(name);
    Assert.state(!entityTypes.isEmpty(), name + " type has not been found");
    return entityTypes.get(0).getId();
  }
}
