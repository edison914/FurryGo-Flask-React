import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getSpotsThunk } from "../../redux/spots"
import SpotSimpleView from "../SpotSimpleView/SpotSimpleView"


const SplashPage =( ) => {
    const dispatch = useDispatch()
    const spots = useSelector(state => state.spots?.allSpots)
    // console.log(spots)
    useEffect(() => {
        dispatch(getSpotsThunk())
    }, [dispatch])

    return (
        <div>
            <h1>All Places</h1>
            <div>
                {spots?.map(spot => (
                    <div key ={spot.id}>
                        <SpotSimpleView spot={spot}/>
                    </div>
                ))}
            </div>
            <footer className="splashPageFooter">
                <p>©2024 Developed by Eddie Ding for educational purpose.</p>
                <div>
                    <a href="https://github.com/edison914" target="_blank" rel="noreferrer">Eddie&apos;s Github</a>
                </div>

            </footer>
        </div>
    )
}


export default SplashPage
