import { useParams, Link } from "react-router-dom"
import { useEffect, useState } from "react"
import { getEventsUtils } from "../../utils/data/event"
import { getVenueUtils } from "../../utils/data/venue"
import Spinner from "../../components/common/Spinner"
import { formatDate } from "../../utils/common"
import "./VenueDetails.css"

function Venue() {
  const { id: venueId } = useParams()

  const [venue, setVenue] = useState()
  const [events, setEvents] = useState()

  useEffect(() => {
    async function getEvents() {
      const events = await getEventsUtils()
      setEvents(events)
    }

    async function getVenue() {
      const venue = await getEventsUtils()
      setVenue(await getVenueUtils(venueId))
    }

    getVenue()
    getEvents()
  }, [])

  if (!venue || !events) return <Spinner />
  // if (!!venue || !!events) return <LoaderBlock />;
  // becomes `<LoaderBlock />`   `<div className="LoaderBlock"><p>loading...</p></div>`

  // only show events which match the venueId
  const eventsFiltered = events.filter(
    (event) => event.venue_url_name === venueId
  )

  console.log(eventsFiltered)

  let currentDate = ""

  const DisplayEvents = eventsFiltered.map((clubevent) => {
    let displayDate = ""

    if (currentDate !== clubevent.date) {
      currentDate = clubevent.date
      displayDate = <div className="date">{formatDate(clubevent.date)}</div>
    }

    return (
      <>
        {displayDate}
        <div className="artist">
          <Link to={`/artists/${clubevent.artist_url_name}`}>
            {clubevent.first_name} {clubevent.last_name}
          </Link>
        </div>
      </>
    )
  })

  return (
    <div className="page page--venue venues">
      <div className="cols col1">
        <div className="venue-name">{venue.name}</div>
        <div>{venue.info}</div>
        <div className="venue-address">
          {venue.location_street} {venue.location_city} {venue.location_state}{" "}
          {venue.location_zip}
        </div>
      </div>
      <div className="cols col2">
        <div className="event-dates clubcalendar">
          {currentDate ? DisplayEvents : "No events scheduled"}
        </div>
      </div>
    </div>
  )
}
export default Venue
