shopt -s nullglob
for f in *.png; do
  convert "$f" -resize "1400x>" -set filename:new "%t_1400" "%[filename:new].png"
  convert "$f" -resize "1200x>" -set filename:new "%t_1200" "%[filename:new].png"
  convert "$f" -resize "800x>" -set filename:new "%t_800" "%[filename:new].png"
  convert "$f" -resize "600x>" -set filename:new "%t_600" "%[filename:new].png"
  convert "$f" -resize "600x>" -set filename:new "%t_400" "%[filename:new].png"

  convert "$f" -quality 50 -define webp:lossless=true -resize "1400x>" -set filename:new "%t_1400" "%[filename:new].webp"
  convert "$f" -quality 50 -define webp:lossless=true -resize "1200x>" -set filename:new "%t_1200" "%[filename:new].webp"
  convert "$f" -quality 50 -define webp:lossless=true -resize "800x>" -set filename:new "%t_800" "%[filename:new].webp"
  convert "$f" -quality 50 -define webp:lossless=true -resize "600x>" -set filename:new "%t_600" "%[filename:new].webp"
  convert "$f" -quality 50 -define webp:lossless=true -resize "400x>" -set filename:new "%t_400" "%[filename:new].webp"
done

tinypng .
