import { useContext, useEffect, useState } from "react";
import Menu from "../../../components/Ecommerce/Menu";
import { EcommerceContext } from "../../../contexts/ecommerce";
import Order from "../../../models/Order";

const ProfilePage = function () {

    const { getMeusPedidos } = useContext(EcommerceContext);
    const [orderList, setOrderList] = useState([]);

    const orderInstance = new Order();

    useEffect(() => {
        setOrderList([]);
        getMeusPedidos().then((data) => {
            setOrderList(data);
        }).catch((exc) => {
            console.log(exc);
        });
    }, []);

    return (
        <div>
            <Menu />
            <h3>Minhas informações</h3>
            <h4>Meus pedidos</h4>
            <div className="p-3">
                {orderList && orderList.length ? (orderList.map((order) => (
                    <div
                        key={order.id}
                        className="card mb-3"
                    >
                        <div className="card-body">
                            <h5 className="card-title">#{order.id}</h5>
                            <p className="card-text">{orderInstance.STATUS_LIST[parseInt(order.situacao)]}</p>
                        </div>
                    </div>
                ))) : <p className="mt-3">Você ainda não fez nenhum pedido.</p>}
            </div>
        </div>
    );

}

export default ProfilePage;