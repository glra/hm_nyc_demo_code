import { Link } from "react-router-dom"
import { useEffect, useState } from "react"
import { getVenuesUtils } from "../../utils/data/venue"
import Spinner from "../../components/common/Spinner"
import "./VenueList.css"
import instagramLogo from "../../assets/images/icons/instagram.png"

function VenueList() {
  const [venues, setVenues] = useState()

  useEffect(() => {
    const getVenue = async () => {
      const venueData = await getVenuesUtils()
      setVenues(venueData)
    }
    getVenue()
  }, [])

  if (!venues) return <Spinner />

  return (
    <div className="page page--venue venues">
      <ul>
        {venues.map((venue) => (
          <li key={venue.id}>
            <div className="venue-name">
              <Link to={`/venues/${venue.url_name}`}>{venue.name}</Link>
              {venue?.instagram && (
                <a href={venue.instagram}>
                  <img src={instagramLogo} className="sm_icon" />
                </a>
              )}
            </div>
            <div>{venue.info}</div>
            <div>
              <p>{venue.location_street}</p>
              <p>{venue.location_city}</p>
              <p>
                {venue.location_state}, {venue.location_zip}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default VenueList
