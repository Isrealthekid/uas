# Drone media

Gallery photographs were downloaded from https://www.briechuas.com/products
(the /img/{drone}{1,2,3} source files), resized to at most 1800 px wide and JPEG-compressed for the web. Each gallery combines the supplied studio video with three photographs, advancing every 4.5 seconds while visible. Reduced motion disables automatic cycling.

The original OBJ/MTL pairs live in public/assets/video (ignored by Git). To regenerate a model, remove its generated file from public/assets/drones/models, then run:

    node --max-old-space-size=8192 scripts/prepare-drone-models.mjs

The script converts OBJ materials to GLB, simplifies geometry with a 0.001 error tolerance, and uses Meshopt compression. Generated GLBs are committed; no conversion runs during deployment. The viewer loads Three.js and its model only after the visitor selects Explore in 3D.
