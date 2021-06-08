task :produce do
  sh [
    "node generate.js | ",
    "tippecanoe --force --output=tiles.mbtiles ",
    "--detect-shared-borders"
  ].join
end

task :optimize do
  sh "node ../vt-optimizer/index.js -m tiles.mbtiles"
end

