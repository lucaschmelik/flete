import "./Footer.css";

export default function Footer() {
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