#!/bin/bash

docker-compose run --rm cli option get cptui_post_types --format=yaml | tee export/cpt.yml
docker-compose run --rm cli option get cptui_post_types --format=json | tee export/cpt.json

docker-compose run --rm cli option get cptui_taxonomies --format=yaml | tee export/taxonomy.yml
docker-compose run --rm cli option get cptui_taxonomies --format=json | tee export/taxonomy.json

# docker-compose run --rm cli option get pagenavi_options --format=yaml | tee export/pagenavi.yml
# docker-compose run --rm cli option get pagenavi_options --format=json | tee export/pagenavi.json