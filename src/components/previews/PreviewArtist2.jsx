import React from "react"
import Button from "../common/Button"

function PreviewArtist() {
  return (
    <div className="preview preview-artist preview-artist2">
      <div class="spotlight">Featured Artist</div>
      <h3>Rissa Garcia</h3>
      <div className="description">
        NYC-based Rissa Garcia, is the Dancing Room Only resident DJ and founder
        of NightChild Records.Inspired by Danny Tenaglia during his residency at
        Club Vinyl from 1999 - 2004, Rissa Garcia has been avidly collecting
        records and rinsing them at various high-profile club gigs for over a
        decade.
      </div>
      <Button
        text="Read More"
        modifier="artist"
        target="artists/rissa-garcia"
      />
    </div>
  )
}

export default PreviewArtist
