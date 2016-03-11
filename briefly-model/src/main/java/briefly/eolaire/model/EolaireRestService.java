package briefly.eolaire.model;

import org.springframework.web.bind.annotation.*;

import static briefly.eolaire.model.EolaireModel.*;

/**
 * Defines a contract for major RESTful operations on user service.
 *
 * @author Alexander Shabanov
 */
public interface EolaireRestService {

  @RequestMapping(value = "/item/entry/{id}", method = RequestMethod.GET)
  @ResponseBody
  Item getItemById(@PathVariable("id") long id);

  @RequestMapping(value = "/item/list", method = RequestMethod.POST)
  @ResponseBody
  GetItemsResponse getItemsByIds(@RequestBody GetItemsRequest request);

  @RequestMapping(value = "/item/profile/{id}", method = RequestMethod.GET)
  @ResponseBody
  GetItemProfileResponse getItemProfile(@PathVariable("id") long id);

  @RequestMapping(value = "/entity", method = RequestMethod.GET)
  @ResponseBody
  GetEntityTypeResponse getEntityTypeByName(@RequestParam("name") String name);

  @RequestMapping(value = "/entity/list", method = RequestMethod.POST)
  @ResponseBody
  GetAllEntityTypesResponse getAllEntities(@RequestBody GetAllEntityTypesRequest request);

  @RequestMapping(value = "/item/query/by-type", method = RequestMethod.POST)
  @ResponseBody
  GetItemByTypeResponse getItemByType(@RequestBody GetItemByTypeRequest request);

  @RequestMapping(value = "/item/query/by-rel", method = RequestMethod.POST)
  @ResponseBody
  GetItemByRelationResponse getItemByRelation(@RequestBody GetItemByRelationRequest request);

  @RequestMapping(value = "/item/relations", method = RequestMethod.POST)
  @ResponseBody
  GetItemRelationsResponse getItemRelations(@RequestBody GetItemRelationsRequest request);
}