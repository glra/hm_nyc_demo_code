import React from "react"
import { useState } from "react"
import * as buffer from "buffer"
import Spinner from "../../components/common/Spinner"
import PreviewEvents from "../../components/previews/PreviewEvents"
import PreviewArtist from "../../components/previews/PreviewArtist"
import PreviewArtist2 from "../../components/previews/PreviewArtist2"
import PreviewEventFeatured from "../../components/previews/PreviewEventFeatured"
import PreviewVenue from "../../components/previews/PreviewVenue"
import "./Home.css"
// DF: What's the window.Buffer for?
window.Buffer = buffer.Buffer

const Home = () => {
  if (!PreviewEvents && PreviewArtist && PreviewEventFeatured && PreviewVenue)
    return (
      <div class="homepage">
        <Spinner />
      </div>
    )

  return (
    <div class="homepage">
      <PreviewEvents />
      <PreviewArtist />
      <PreviewArtist2 />
      <PreviewVenue />
    </div>
  )
}

export default Home
