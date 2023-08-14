import { Link } from "react-router-dom"
import { useEffect, useState } from "react"
import { getArtistsUtils } from "../../utils/data/artist"
import Spinner from "../../components/common/Spinner"
import Button from "../../components/common/Button"
import twitterLogo from "../../assets/images/icons/twitter.png"
import soundcloudLogo from "../../assets/images/icons/soundcloud.png"
import spotifyLogo from "../../assets/images/icons/spotify.png"
import instagramLogo from "../../assets/images/icons/instagram.png"
import facebookLogo from "../../assets/images/icons/facebook.png"

import "./ArtistList.css"

function ArtistList() {
  const [artists, setArtists] = useState(null)

  useEffect(() => {
    getArtists()
  }, [])

  async function getArtists() {
    const artists = await getArtistsUtils()
    setArtists(artists)
  }

  const Artist = (person) => (
    <li key={person.id}>
      <div>
        <div className="artist-name">
          <Link to={`/artists/${person.url_name}`}>
            {person.first_name} {person.last_name}
          </Link>
        </div>
        <Button
          text="See Schedule"
          modifier="artists-schedule"
          target={`/artists/${person.url_name}`}
        />

        <div className="social-media">
          {person?.spotify_id && (
            <a href={`https://open.spotify.com/person/${person.spotify_id}`}>
              <img src={spotifyLogo} className="sm_icon" />
            </a>
          )}
          {person?.soundcloud && (
            <a href={person.soundcloud}>
              <img src={soundcloudLogo} className="sm_icon" />
            </a>
          )}
          {person?.twitter && (
            <a href={person.twitter}>
              <img src={twitterLogo} className="sm_icon" />
            </a>
          )}
          {person?.instagram && (
            <a href={person.instagram}>
              <img src={instagramLogo} className="sm_icon" />
            </a>
          )}
          {person?.facebook && (
            <a href={person.facebook}>
              <img src={facebookLogo} className="sm_icon" />
            </a>
          )}
        </div>
      </div>
      <div>{person.bio}</div>

      <div className="spotify">
        <iframe
          src={`https://open.spotify.com/embed/artist/${person.spotify_id}`}
          width="300"
          height="160"
          frameBorder="0"
          allowfullscreen=""
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
        ></iframe>
      </div>
    </li>
  )

  const Artists = () => <ul>{artists.map((person) => Artist(person))}</ul>

  if (!artists) return <Spinner />

  return (
    <div className="page page--artist artists">
      <Artists />
    </div>
  )
}

export default ArtistList
