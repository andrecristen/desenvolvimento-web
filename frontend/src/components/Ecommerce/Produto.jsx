import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const Produto = (props) => {

    const navigate = useNavigate();

    const view = () => {
        navigate("/produto/" + props.data.id);
    }

    return (
        <div className="col-md-3 p-3" onClick={view}>
            <div className="card">
                <img className="card-img-top" style={{"height": "200px"}} src={props.data.linkImagem} alt="Imagem do produto" />
                <div className="card-body">
                    <h5 className="card-title">{props.data.nome}</h5>
                    <p className="card-text">{props.data.descricao}</p>
                </div>
                <div className="card-footer">
                    <button className="btn btn-success float-right"><FontAwesomeIcon icon={faSearch} /> Visualizar</button>
                </div>
            </div>
        </div>
    );
}

export default Produto;