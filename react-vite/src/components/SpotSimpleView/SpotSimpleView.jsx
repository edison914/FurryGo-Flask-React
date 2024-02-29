import { NavLink } from 'react-router-dom'

const SpotSimpleView = (spot) => {

    const currentSpot = spot.spot

    // console.log(`current spot`,currentSpot.spot_images[0].image_url)

    return (
        <NavLink to={`/spots/${currentSpot.id}`} className='SpotSimpleViewContainer'>
            <img src={currentSpot?.spot_images[0].image_url} title={currentSpot?.name}></img>
            <div>{currentSpot?.category.toUpperCase()}</div>
            <div>{currentSpot?.name}</div>
            <div>{currentSpot?.city}, {currentSpot?.state}</div>
        </NavLink>
    )
}

export default SpotSimpleView
