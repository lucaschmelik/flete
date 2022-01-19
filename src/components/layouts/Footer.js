import "./Footer.css";
import { useMediaQuery } from 'react-responsive'

export default function Footer() {

    // const isDesktopOrLaptop = useMediaQuery({ query: '(min-width: 1224px)' })
    // const isBigScreen = useMediaQuery({ query: '(min-width: 1824px)' })
    // const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' })
    // const isPortrait = useMediaQuery({ query: '(orientation: portrait)' })
    // const isRetina = useMediaQuery({ query: '(min-resolution: 2dppx)' })

    // console.log("isDesktopOrLaptop " + isDesktopOrLaptop)
    // console.log("isBigScreen " + isBigScreen)
    // console.log("isTabletOrMobile " + isTabletOrMobile)
    // console.log("isPortrait " + isPortrait)
    // console.log("isRetina " + isRetina)

    return (
        <footer className="main-footer">
            <div className="container">
                <div className="row">
                    {/* Column1 */}
                    <div className="col">
                    </div>
                    {/* Column2 */}
                    <div className="col">
                    </div>
                    {/* Column3 */}
                    <div className="col">
                    </div>
                </div>
                <div className="row">
                    <p className="col-sm">
                        &copy;{new Date().getFullYear()} | LucasChmelik | todos los derechos reservados.
                    </p>
                </div>
            </div>
        </footer>
    )
}