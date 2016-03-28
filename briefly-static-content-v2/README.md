
# Watching & Run Script

Install ``brew install fswatch`` then do:

```
fswatch -r -0 $(PWD)/freemarker/* $(PWD)/css/* | xargs -0 -n1 -I{} make static
```
