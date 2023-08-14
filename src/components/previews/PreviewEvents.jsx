import { Link } from "react-router-dom"
import Button from "../common/Button"
import { useEffect, useState } from "react"
import { getEventsUtils } from "../../utils/data/event"
import { formatDate } from "../../utils/common"
// import Spinner from "../../components/common/Spinner"

import "./PreviewEvents.css"

function PreviewEvents() {
  const [events, setEvents] = useState()

  useEffect(() => {
    async function getEvents() {
      const events = await getEventsUtils()
      events.length = 3
      setEvents(events)
    }

    getEvents()
  }, [])

  if (!events) return null

  /*  const uniqueDates = [...new Set(events.map((item) => item.date))];
  let uniqueDatesCounter = 0;
  console.log(uniqueDates); */

  let currentDate = ""
  let currentClub = ""

  const EventList = events?.map((clubevent) => {
    let displayDate = ""
    let displayClub = ""

    if (currentDate !== clubevent.date) {
      displayDate = <div className="date">{formatDate(clubevent.date)}</div>
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
        <div className="artist">
          <Link to={`/artists/${clubevent.artist_url_name}`}>
            {clubevent.first_name} {clubevent.last_name}
          </Link>
        </div>
      </>
    )
  })

  /* WILLDO fix styling names and cleanup */
  return (
    <div className="preview preview-events preview--events">
      <h4>Upcoming Events</h4>
      <div className="clubcalendar">{EventList}</div>

      <Button text="See All Events" modifier="event" target="events" />
    </div>
  )
}
export default PreviewEvents
