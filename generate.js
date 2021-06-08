const tilebelt = require('@mapbox/tilebelt')
const fs = require('fs')
const MAXZOOM = 13
const DELTA = 3

const jumpIn = tile => {
  let f = {
    type: 'Feature',
    geometry: tilebelt.tileToGeoJSON(tile),
    properties: {
      z: tile[2],
      x: tile[0],
      y: tile[1]
    },
    tippecanoe: {
      layer: 'tilegrid',
      minzoom: tile[2] - DELTA,
      maxzoom: tile[2] - DELTA
    }
  }
  if (f.tippecanoe.minzoom >= 0) {
    fs.writeSync(1, `\x1e${JSON.stringify(f)}\n`)
  }
  next(tile)
}

const next = tile => {
  if (tile[2] == MAXZOOM) {
  } else {
    for(t of tilebelt.getChildren(tile)) {
      jumpIn(t)
    }
  }
}

jumpIn([3, 1, 2])
