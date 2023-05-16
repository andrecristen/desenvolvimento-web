import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Render from "../../../components/Admin/Render";
import { faBug } from "@fortawesome/free-solid-svg-icons";

const AdminHomePage = function () {

    return (
        <Render>
            <h1>Teste</h1>
            <FontAwesomeIcon icon={faBug}></FontAwesomeIcon>
        </Render>
    )
}

export default AdminHomePage;