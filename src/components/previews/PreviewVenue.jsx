import Button from "../common/Button"

function PreviewVenue() {
  return (
    <div className="preview preview-venue">
      <div className="spotlight">Venue</div>
      <h4>Elsewhere</h4>
      <div className="description">
        <p>
          Elsewhere is a multi-room music venue, nightclub, and arts space in
          Bushwick, Brooklyn. Our focus is underground and unbound music,
          presented with love. Since 2017, Elsewhere’s three stories of
          dancefloors and stages have been home to expansive sonic offerings for
          all New Yorkers to explore. We are and will forever remain fiercely
          independent.
        </p>
      </div>
      <Button text="More" modifier="venue" target="venues/elsewhere" />
    </div>
  )
}

export default PreviewVenue
