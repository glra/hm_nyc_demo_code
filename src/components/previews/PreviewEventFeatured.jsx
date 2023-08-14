import Button from "../common/Button"

function PreviewEventFeatured() {
  return (
    <div className="preview preview-event-featured">
      <div className="spotlight">Event</div>
      <h4>Space at Bossa Nova Civic Club</h4>
      <div className="description">
        A night of dancing, Orci varius natoque penatibus et magnis dis
        parturient montes, nascetur ridiculus mus. In hac habitasse platea
        dictumst. Ut fermentum, enim vel sodales auctor
        <p>Date: June 05, 2033</p>
        <p>Doors open at 10pm</p>
        <p>$15 in advance, $20 at the door</p>
      </div>
      <Button text="Get Tickets" modifier="featured-event" target="events" />
    </div>
  )
}

export default PreviewEventFeatured
