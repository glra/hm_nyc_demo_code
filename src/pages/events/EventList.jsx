import React from "react"
import { Link } from "react-router-dom"
import { useEffect, useState } from "react"
import { getEventsUtils } from "../../utils/data/event"
import { formatDate } from "../../utils/common"
import Spinner from "../../components/common/Spinner"

import "./EventList.css"

function EventList() {
  const [events, setEvents] = useState()

  useEffect(() => {
    async function getEvents() {
      const events = await getEventsUtils()
      setEvents(events)
    }

    getEvents()
  }, [])

  if (!events) return <Spinner />

  /*  const uniqueDates = [...new Set(events.map((item) => item.date))];
  let uniqueDatesCounter = 0;
  console.log(uniqueDates); */

  let currentDate = ""
  let currentClub = ""

  const displayEvents = events.map((clubevent) => {
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

  return (
    <div className="page page--events events">
      <div className="clubcalendar">{displayEvents}</div>
    </div>
  )
}
export default EventList
