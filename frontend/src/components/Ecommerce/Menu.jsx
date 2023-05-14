import { useContext, useEffect } from "react";
import { PublicContext } from "../../contexts/public";

const Menu = (props) => {

    const { logout, authenticated, cart } = useContext(PublicContext);

    const onClickLogout = () => {
        logout();
    }

    useEffect(() => {

    }, [authenticated]);


    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark" style={{ "padding": "10px" }}>
            <a className="navbar-brand" href="/">Droneseta</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item">
                        <a className="nav-link" href="/cart">Meu Carrinho
                            {Object.keys(cart).length
                                ?
                                <span style={{ "background-color": "white", "color": "black", "border-radius": "30px", "padding": "5px 10px", "width": "6px", "margin": "4px" }}>{Object.keys(cart).length}</span>
                                :
                                ""
                            }</a>
                    </li>
                    {!authenticated ?
                        <li className="nav-item">
                            <a className="nav-link" href="/login">Login</a>
                        </li> : null}
                    {authenticated ?
                        <li className="nav-item">
                            <a className="nav-link" href="/profile">Minha conta</a>
                        </li> : null}
                    {authenticated ?
                        <li className="nav-item">
                            <a className="nav-link" href="" onClick={onClickLogout}>Logout</a>
                        </li> : null}

                </ul>
            </div>
        </nav>
    );
}

export default Menu;