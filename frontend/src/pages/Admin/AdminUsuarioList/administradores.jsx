import Render from "../../../components/Admin/Render";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AdminContext } from "../../../contexts/admin";
import Order from "../../../models/Order";
import User from "../../../models/User";


const AdminUsuarioAdmistradorList = function () {

    const navigate = useNavigate();

    const { getUsuariosTipo } = useContext(AdminContext);
    const [usuarios, setUsuarios] = useState([]);

    useEffect(() => {
        load();
    }, []);

    const load = () => {
        const userInstance = new User();
        setUsuarios([]);
        getUsuariosTipo(userInstance.TIPO_ADMINISTRADOR).then((data) => {
            setUsuarios(data);
        }).catch((exc) => {
            console.log(exc);
        });
    }

    return (
        <Render>
            <h3>Administradores</h3>
            <div className="btn-group display-table">
                {/* Ações Sem linha */}
            </div>
            <table className="table">
                <thead className="thead-dark">
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Nome</th>
                        <th scope="col">CPF</th>
                        <th scope="col">Login</th>
                        <th scope="col">Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {usuarios && usuarios.map(usuario => {
                        return (
                            <tr>
                                <th>{usuario.id}</th>
                                <td>{usuario.nome}</td>
                                <td>{usuario.cpf}</td>
                                <td>{usuario.email} </td>
                                <td> </td>
                            </tr>);
                    })}
                </tbody>
            </table>
        </Render>
    )
}

export default AdminUsuarioAdmistradorList;