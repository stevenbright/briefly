package briefly.website.controller;

import briefly.eolaire.model.EolaireModel;
import briefly.model.catalog.CatalogAttribute;
import briefly.model.catalog.CatalogElement;
import briefly.model.catalog.NamedValue;
import briefly.website.service.EolaireItemService;
import org.springframework.stereotype.Controller;
import org.springframework.util.Assert;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

import javax.annotation.PostConstruct;
import javax.annotation.Resource;
import java.util.*;
import java.util.stream.Collectors;

/**
 * Main controller that responds with user page.
 */
@Controller
@RequestMapping("/g/")
public final class PublicPageController implements SecurityControllerMixin {

  @Resource
  private EolaireItemService itemService;

  private long bookId;
  private long genreId;
  private long authorId;

  @PostConstruct
  public void init() {
    bookId = getRelationTypeId("book");
    genreId = getRelationTypeId("genre");
    authorId = getRelationTypeId("author");
  }

  private long getRelationTypeId(String name) {
    final List<EolaireModel.EntityType> entityTypes = itemService.getEntityTypeByName(name);
    Assert.state(!entityTypes.isEmpty(), name + " type has not been found");
    return entityTypes.get(0).getId();
  }

  @RequestMapping("/index")
  public ModelAndView index() {
    final Map<String, Object> params = newMapWithAccount();

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

    params.put("catalogElements", elements);

    return new ModelAndView("page/index", params);
  }

  @RequestMapping("/articles")
  public ModelAndView articles() {
    final Map<String, Object> params = newMapWithAccount();
    params.put("articles", Collections.emptyList());
    return new ModelAndView("page/articles", params);
  }

  @RequestMapping("/about")
  public ModelAndView about() {
    final Map<String, Object> params = newMapWithAccount();
    params.put("userId", hasUserAccount() ? getUserId() : -1L);
    params.put("currentTime", System.currentTimeMillis());
    return new ModelAndView("page/about", params);
  }

  @RequestMapping("/login")
  public ModelAndView login(@RequestParam(value = "error", required = false) String loginError) {
    final Map<String, Object> params = new HashMap<>();
    params.put("loginError", loginError);
    params.put("currentTime", System.currentTimeMillis());
    return new ModelAndView("page/login", params);
  }
}
