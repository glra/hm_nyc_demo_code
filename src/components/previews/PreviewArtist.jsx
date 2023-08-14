import React from "react"
import Button from "../common/Button"

function PreviewArtist() {
  return (
    <div className="preview preview-artist">
      <div class="spotlight">Featured Artist</div>
      <h3>MomaReady</h3>
      <div className="description">
        Wyatt D. Stevens aka MoMA READY is an audio visual artist & film maker
        as well as the Owner of the lifestyle and music label Haus of Altr. Both
        MoMa Ready and the label draw inspiration from the energy of deep house,
        techno and rave, with an underbelly of skateboarding culture. Using
        soulful vocal track, deep 909 beats, rolling acid cuts and unmatched
        energy, MoMa gets his point across.
      </div>
      <Button text="Read More" modifier="artist" target="artists/moma-ready" />
    </div>
  )
}

export default PreviewArtist
