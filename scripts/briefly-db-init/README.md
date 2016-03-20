
# Overview

Demonstrates performing manual SQL migration to the completely new schema.

Sample Run: ``mvn exec:java -Dapp.properties.override=file:/Users/alex/opt/config/briefly-dbinit.properties``

Sample property files:

```
#briefly.dbinit.mode=CHECK
briefly.dbinit.mode=MIGRATION

# DataSource
briefly.dbinit.dao.dataSource.url=jdbc:h2:/tmp/brieflydb/brieflydb-v2
briefly.dbinit.dao.dataSource.username=SA
briefly.dbinit.dao.dataSource.password=
```

# H2 cheats

## Initialize

Create a property override file:

```
eol.dao.dataSource.url=jdbc:h2:/tmp/lairedb
```

... and use it by referring to it in JVM properties: ``-Dapp.properties.override=file:/Path/to/eol.properties``.

## Import data

Set up scheme:

```
java -cp ~/.m2/repository/com/h2database/h2/1.4.183/h2-1.4.183.jar org.h2.tools.RunScript -url jdbc:h2:/tmp/brieflydb/brieflydb-v2 -user sa -script ~/proj/github/booklib/booklib-website/src/main/resources/booklibWebsite/h2/book/book-schema.sql
java -cp ~/.m2/repository/com/h2database/h2/1.4.183/h2-1.4.183.jar org.h2.tools.RunScript -url jdbc:h2:/tmp/brieflydb/brieflydb-v2 -user sa -script ~/proj/github/briefly/briefly-website/src/main/resources/brieflyWebsite/sql/eolaire/eolaire-schema.sql
```

Add sample data:

```
java -cp ~/.m2/repository/com/h2database/h2/1.4.183/h2-1.4.183.jar org.h2.tools.RunScript -url jdbc:h2:/tmp/brieflydb/brieflydb-v2 -user sa -script ~/proj/github/booklib/booklib-website/src/main/resources/booklibWebsite/h2/book/book-fixture.sql
```


## Connect

```
rlwrap java -cp ~/.m2/repository/com/h2database/h2/1.4.183/h2-1.4.183.jar org.h2.tools.Shell -url jdbc:h2:/tmp/brieflydb/brieflydb-v2 -user sa
```

Connect to backup database:

```
rlwrap java -cp ~/.m2/repository/com/h2database/h2/1.4.183/h2-1.4.183.jar org.h2.tools.Shell -url jdbc:h2:zip:~/Downloads/backup/brieflydb-v2.mv.db.zip -user sa
```


## Defragmentation

Connect to DB and then use

```
SHUTDOWN DEFRAG;
```

See also http://www.h2database.com/html/features.html
