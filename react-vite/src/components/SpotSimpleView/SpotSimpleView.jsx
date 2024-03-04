import { NavLink } from 'react-router-dom'
import "./SpotSimpleView.css"
const SpotSimpleView = (spot) => {

    const currentSpot = spot.spot

    // console.log(`current spot`,currentSpot.category[0])

    return (
        <NavLink to={`/spots/${currentSpot.id}`} className='SpotSimpleViewContainer'>
            <img src={currentSpot?.spot_images[0].image_url} title={currentSpot?.name}></img>
            <div>{currentSpot?.category[0].toUpperCase()}{currentSpot?.category.slice(1)}</div>
            <div>{currentSpot?.name}</div>
            <div>{currentSpot?.city}, {currentSpot?.state}</div>
        </NavLink>
    )
}

export default SpotSimpleView
