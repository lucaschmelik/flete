import "./Footer.css";
import { useMediaQuery } from 'react-responsive'

export default function Footer(props) {

    const EsCelular = useMediaQuery({ query: '(min-device-width: 785px)' })

    var classNameResponsive = !EsCelular || props.clase == "true" ? "main-footer" : "footer"

    return (
        <footer className={classNameResponsive}>
            <div className="container">
                <div className="row">
                    <p className="col-sm">
                        &copy;{new Date().getFullYear()} | LucasChmelik | todos los derechos reservados.
                    </p>
                </div>
            </div>
        </footer>
    )
}