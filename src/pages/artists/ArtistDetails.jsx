import { useEffect, useMemo, useState } from "react"

import { useParams } from "react-router-dom"
import { Link } from "react-router-dom"

import { getEventsUtils } from "../../utils/data/event"
import { getArtistUtils } from "../../utils/data/artist"
import Spinner from "../../components/common/Spinner"
import { formatDate } from "../../utils/common"
import twitterLogo from "../../assets/images/icons/twitter.png"
import soundcloudLogo from "../../assets/images/icons/soundcloud.png"
import spotifyLogo from "../../assets/images/icons/spotify.png"
import instagramLogo from "../../assets/images/icons/instagram.png"
import facebookLogo from "../../assets/images/icons/facebook.png"

import "./ArtistDetails.css"

function ArtistDetails(props) {
  const { id: artistId } = useParams()

  const [artist, setArtist] = useState()
  const [events, setEvents] = useState([])
  const [accessToken, setAccessToken] = useState()
  const [spotifyArtist, setSpotifyArtist] = useState()

  async function getAuthToken() {
    const response = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        Authorization: process.env.REACT_APP_SPOTIFY,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: "grant_type=client_credentials",
      json: true,
    })
    // .then((response) => response.json())
    // .then((result) => console.log(result));

    if (response.ok) {
      const jsonResponse = await response.json()
      const foo = jsonResponse.access_token
      return foo
    }
  }

  async function getSpotifyArtistContent(currAccessToken) {
    const response = await fetch(
      `https://api.spotify.com/v1/artists/${artist.spotify_id}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + currAccessToken,
        },
      }
    )

    if (response.ok) {
      const jsonResponse = await response.json()
      return jsonResponse
    }
  }

  useEffect(() => {
    async function getArtist() {
      const artist = await getArtistUtils(artistId)
      setArtist(artist)
    }

    async function getAuthTokenWrapper() {
      const authToken2 = await getAuthToken()
      setAccessToken(authToken2)
    }

    async function getEvents() {
      const events = await getEventsUtils()
      setEvents(events)
    }

    getAuthTokenWrapper()
    getArtist()

    getEvents()
  }, [])

  // Get Spotify artist data from Spotify API
  useEffect(() => {
    if (!!artist && !!accessToken) {
      const getSpotifyArtistData = async () => {
        const spotifyResponse = await getSpotifyArtistContent(accessToken)
        const spotifyArtistResponseContent = await spotifyResponse
        setSpotifyArtist(spotifyArtistResponseContent)
      }

      getSpotifyArtistData()
    }
  }, [accessToken, artist])

  // Display related code before render method

  if (!artist && !spotifyArtist) return <Spinner />

  let currentDate = ""
  let currentClub = ""

  const eventsFiltered = events.filter((event) => event.url_name === artistId)

  const displayEvents = eventsFiltered.map((clubevent) => {
    let displayDate = ""
    let displayClub = ""

    if (currentDate !== clubevent.date) {
      displayDate = <h5 className="date">{formatDate(clubevent.date)}</h5>
      currentDate = clubevent.date
      currentClub = "" //we're at a new date so need a new club
    }

    if (currentClub !== clubevent.name) {
      displayClub = (
        <div className="club">
          <Link to={`/venues/${clubevent.venue_url_name}`}>
            {clubevent.name}
          </Link>
        </div>
      )
      currentClub = clubevent.name
    }

    return (
      <>
        {displayDate}
        {displayClub}
      </>
    )
  })

  /* willdo: put in artistsocialmedia component ,desaturating twutter logo colors */
  return (
    <div className="page page--artist">
      <div className="cols col1">
        <div className="artistinfo">
          <div className="artist-name">
            {artist.first_name} {artist.last_name}
          </div>
          <div className="bio">{artist.bio}</div>
          <div className="socialmedia">
            {artist?.spotify_id && (
              <a href={`https://open.spotify.com/artist/${artist.spotify_id}`}>
                <img src={spotifyLogo} className="sm_icon" />
              </a>
            )}
            {artist?.soundcloud && (
              <a href={artist.soundcloud}>
                <img src={soundcloudLogo} className="sm_icon" />
              </a>
            )}
            {artist?.twitter && (
              <a href={artist.twitter}>
                <img src={twitterLogo} className="sm_icon" />
              </a>
            )}
            {artist?.instagram && (
              <a href={artist.instagram}>
                <img src={instagramLogo} className="sm_icon" />
              </a>
            )}
            {artist?.facebook && (
              <a href={artist.facebook}>
                <img src={facebookLogo} className="sm_icon" />
              </a>
            )}
            {artist?.website && (
              <p>
                <a href={`https://${artist.website}`}>{artist.website}</a>
              </p>
            )}
          </div>
          <div className="eventdates">
            {currentDate && <h4>Upcoming Shows</h4>}
            {currentDate ? displayEvents : "No events scheduled"}
          </div>
        </div>
      </div>
      <div className="cols col2">
        <div className="artistphoto">
          <div>
            <img className="artist-image" src={spotifyArtist?.images[0].url} />
          </div>
          <div className="youtube">
            <iframe
              width="420"
              height="236"
              src={`https://www.youtube.com/embed/${artist.youtube_video}`}
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowfullscreen
            ></iframe>
          </div>
          <div className="spotify">
            <iframe
              src={`https://open.spotify.com/embed/artist/${artist.spotify_id}`}
              width="100%"
              height="352"
              frameBorder="0"
              allowfullscreen=""
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ArtistDetails
