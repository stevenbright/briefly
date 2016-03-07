package briefly.dbinit;

import briefly.dbinit.model.LaunchMode;
import briefly.dbinit.service.CheckService;
import briefly.dbinit.service.MigrationService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import org.springframework.core.env.PropertiesPropertySource;
import org.springframework.core.io.Resource;
import org.springframework.core.io.support.PropertiesLoaderUtils;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Properties;

public final class App implements Runnable {
  private final Logger log;
  private final MigrationService.Contract migrationService;
  private final CheckService.Contract checkService;
  private final LaunchMode launchMode;

  public App(MigrationService.Contract migrationService, CheckService.Contract checkService, LaunchMode launchMode) {
    this.log = LoggerFactory.getLogger(App.class);
    this.migrationService = Objects.requireNonNull(migrationService, "migrationService");
    this.checkService = Objects.requireNonNull(checkService, "checkService");
    this.launchMode = Objects.requireNonNull(launchMode, "launchMode");
  }

  public static void main(String[] args) throws Exception {
    final String[] contextPaths = {"classpath:/brieflyDbinit/spring/app-context.xml"};

    try (final ConfigurableApplicationContext context = new ClassPathXmlApplicationContext(contextPaths, false)) {
      addEnvironmentProperties(context);
      context.refresh(); // explicitly refresh the context
      context.start();

      // get Runnable application bean and run it
      context.getBean("app", Runnable.class).run();
    }
  }

  @Override
  public void run() {
    log.info("App is running, launchMode={}", launchMode);

    switch (launchMode) {
      case MIGRATION:
        migrationService.runMigration();
        break;

      case CHECK:
        checkService.check();
        break;

      default:
        log.error("Unsupported launchMode={}", launchMode);
    }
  }

  //
  // Private
  //

  private static void addEnvironmentProperties(ConfigurableApplicationContext context) throws IOException {
    final List<Resource> resources = new ArrayList<>(2);
    resources.add(context.getResource("classpath:/brieflyDbinit/core.properties"));

    // do we have property override? if yes - add it
    final String propsOverridePath = System.getProperty("app.properties.override");
    if (propsOverridePath != null) {
      resources.add(context.getResource(propsOverridePath));
    }

    // fill properties
    final Properties properties = new Properties();
    for (final Resource resource : resources) {
      if (!resource.exists()) {
        throw new IOException("Resource " + resource.getFilename() + " does not exist");
      }

      PropertiesLoaderUtils.fillProperties(properties, resource);
    }

    // create property source and insert it into a context
    final PropertiesPropertySource propertySource = new PropertiesPropertySource("brieflyDbinitApp", properties);
    context.getEnvironment().getPropertySources().addFirst(propertySource);
  }
}
