package briefly.website.service;

import briefly.eolaire.model.EolaireModel;

import javax.annotation.Nonnull;
import javax.annotation.Nullable;
import java.util.List;

/**
 * Exposes business logic operations on items.
 *
 * @author Alexander Shabanov
 */
public interface EolaireItemService {
  @Nonnull
  EolaireModel.Item getItemById(long id);

  @Nonnull
  List<EolaireModel.ItemProfile> getItemProfile(long itemId);

  @Nonnull
  List<EolaireModel.EntityType> getEntityTypeByName(@Nonnull String name);

  @Nonnull
  List<EolaireModel.EntityType> getEntityTypesOrderedById(@Nullable Long startEntityId, int limit);

  @Nonnull
  List<Long> getItemIdsByType(long itemTypeId, @Nullable Long startEntityId, int limit);

  @Nonnull
  List<Long> getItemIdsByRelation(long itemId,
                                  @Nullable Long relationTypeId,
                                  @Nullable Long relatedItemTypeId,
                                  @Nullable Long startEntityId,
                                  int limit);

  @Nonnull
  List<EolaireModel.ItemRelation> getItemRelations(long itemId, EolaireModel.RelationsFilterMode filterMode);


  //
  // Save functionality
  //

  long saveItem(String name,
                long itemTypeId,
                String description,
                long createdTimestamp,
                long flags,
                EolaireModel.Metadata metadata);

  void addRelations(long itemId, List<EolaireModel.ItemRelation> relations);
}
