package briefly.website.controller.rest;

import briefly.website.controller.SecurityControllerMixin;
import briefly.website.service.EolaireItemService;
import briefly.website.util.ListQueryUtil;
import com.truward.brikar.server.controller.AbstractRestController;
import com.truward.orion.eolaire.model.EolaireModel;
import com.truward.orion.eolaire.model.EolaireRestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;
import java.util.Objects;

/**
 * Implementation of {@link EolaireRestService} that exposes major operations on catalog.
 *
 * @author Alexander Shabanov
 */
@Controller
@RequestMapping("/rest/eolaire")
public final class EolaireRestController extends AbstractRestController implements EolaireRestService, SecurityControllerMixin {
  private final EolaireItemService itemService;

  @Autowired
  public EolaireRestController(EolaireItemService itemService) {
    this.itemService = Objects.requireNonNull(itemService);
  }

  @Override
  public EolaireModel.Item getItemById(@PathVariable("id") long id) {
    return itemService.getItemById(id);
  }

  @Override
  public EolaireModel.GetItemsResponse getItemsByIds(@RequestBody EolaireModel.GetItemsRequest request) {
    final EolaireModel.GetItemsResponse.Builder builder = EolaireModel.GetItemsResponse.newBuilder();
    for (final long id : request.getItemIdsList()) {
      builder.addItems(itemService.getItemById(id));
    }
    return builder.build();
  }

  @Override
  public EolaireModel.GetItemProfileResponse getItemProfile(@PathVariable("id") long id) {
    final List<EolaireModel.ItemProfile> profiles = itemService.getItemProfile(id); // should contain 0 or 1 entry

    final EolaireModel.GetItemProfileResponse.Builder builder = EolaireModel.GetItemProfileResponse.newBuilder();

    if (!profiles.isEmpty()) {
      assert profiles.size() == 1;
      builder.setProfile(profiles.get(0));
    }

    return builder.build();
  }

  @Override
  public EolaireModel.GetEntityTypeResponse getEntityTypeByName(@RequestParam("name") String name) {
    final EolaireModel.GetEntityTypeResponse.Builder builder = EolaireModel.GetEntityTypeResponse.newBuilder();

    final List<EolaireModel.EntityType> types = itemService.getEntityTypeByName(name);
    if (!types.isEmpty()) {
      assert types.size() == 1;
      builder.setType(types.get(0));
    }

    return builder.build();
  }

  @Override
  public EolaireModel.GetAllEntityTypesResponse getAllEntities(@RequestBody EolaireModel.GetAllEntityTypesRequest request) {
    final int limit = ListQueryUtil.checkLimit(request.getLimit());

    // convert offset token
    final Long startEntityId = request.hasOffsetToken() ? ListQueryUtil.longFromOffsetToken(request.getOffsetToken()) : null;

    // prepare response builder
    final EolaireModel.GetAllEntityTypesResponse.Builder builder = EolaireModel.GetAllEntityTypesResponse.newBuilder();
    if (limit == 0) {
      if (request.hasOffsetToken()) {
        builder.setOffsetToken(request.getOffsetToken());
      }
      return builder.build();
    }

    // fetch result list
    final List<EolaireModel.EntityType> entityTypes = itemService.getEntityTypesOrderedById(startEntityId, limit);
    builder.addAllTypes(entityTypes);
    if (entityTypes.size() == limit) {
      builder.setOffsetToken(ListQueryUtil.toOffsetToken(entityTypes.get(limit - 1).getId()));
    }

    return builder.build();
  }

  @Override
  public EolaireModel.GetItemByTypeResponse getItemByType(@RequestBody EolaireModel.GetItemByTypeRequest request) {
    final int limit = ListQueryUtil.checkLimit(request.getLimit());

    // prepare response
    final EolaireModel.GetItemByTypeResponse.Builder builder = EolaireModel.GetItemByTypeResponse.newBuilder();
    if (limit == 0) {
      if (request.hasOffsetToken()) {
        builder.setOffsetToken(request.getOffsetToken());
      }
      return builder.build();
    }

    // convert offset token
    final Long startEntityId = request.hasOffsetToken() ? ListQueryUtil.longFromOffsetToken(request.getOffsetToken()) : null;

    // fetch result list
    final List<Long> itemIds = itemService.getItemIdsByType(request.getItemTypeId(), startEntityId, limit);
    builder.addAllItemIds(itemIds);
    if (itemIds.size() == limit) {
      builder.setOffsetToken(ListQueryUtil.toOffsetToken(itemIds.get(limit - 1)));
    }

    return builder.build();
  }

  @Override
  public EolaireModel.GetItemByRelationResponse getItemByRelation(@RequestBody EolaireModel.GetItemByRelationRequest request) {
    final int limit = ListQueryUtil.checkLimit(request.getLimit());

    // prepare response
    final EolaireModel.GetItemByRelationResponse.Builder builder = EolaireModel.GetItemByRelationResponse.newBuilder();
    if (limit == 0) {
      if (request.hasOffsetToken()) {
        builder.setOffsetToken(request.getOffsetToken());
      }
      return builder.build();
    }

    // convert offset token
    final Long startEntityId = request.hasOffsetToken() ? ListQueryUtil.longFromOffsetToken(request.getOffsetToken()) : null;
    final Long relationTypeId = request.hasRelationTypeId() ? request.getRelationTypeId() : null;
    final Long relatedItemTypeId = request.hasRelatedItemTypeId() ? request.getRelatedItemTypeId() : null;

    // fetch result list
    final List<Long> itemIds = itemService.getItemIdsByRelation(request.getItemId(), relationTypeId,
        relatedItemTypeId, startEntityId, limit);

    builder.addAllItemIds(itemIds);
    if (itemIds.size() == limit) {
      builder.setOffsetToken(ListQueryUtil.toOffsetToken(itemIds.get(limit - 1)));
    }

    return builder.build();
  }
}
