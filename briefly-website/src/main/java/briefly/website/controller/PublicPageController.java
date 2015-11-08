package briefly.website.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

/**
 * Main controller that responds with user page.
 */
@Controller
@RequestMapping("/g/")
public final class PublicPageController implements SecurityControllerMixin {

  @RequestMapping("/index")
  public String index() {
    return "page/index";
  }

  @RequestMapping("/articles")
  public ModelAndView articles() {
    return new ModelAndView("page/articles", "articles", Collections.emptyList());
  }

  @RequestMapping("/about")
  public ModelAndView about() {
    final Map<String, Object> params = new HashMap<>();
    params.put("userId", hasUserAccount() ? getUserId() : -1L);
    params.put("userAccount", getUserAccount());
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
