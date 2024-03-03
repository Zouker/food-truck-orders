import 'bootstrap/dist/css/bootstrap.min.css'
import React from "react";

type OrderType = {
    id: number,
    name: string,
    status: string
}

const statuses = ['new', 'cooking', 'ready', 'delivered'];

function App() {
    const [name, setName] = React.useState('');
    const [orders, setOrders] = React.useState<OrderType[]>([{id: 0, name: name, status: ''}])

    const onAdd = () => {
        setName('');
        const biggestIdInBorders = Math.max(...orders.map((order) => order.id));
        setOrders([
                ...orders,
                {
                    id: biggestIdInBorders + 1,
                    name: name,
                    status: 'new'
                }
            ]
        )
    }

    const onNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    }

    const onOrderClick = (order: OrderType) => {
        const currentStatus = order.status;
        const nextStatus = statuses[statuses.indexOf(currentStatus) + 1];
        const newOrders = orders.map((o) => {
            if (o.id === order.id) {
                return {
                    ...o,
                    status: nextStatus
                };
            }
            return o;
        })
        setOrders(newOrders)
    };

    return (
        <div className={'p-4'}>
            <div className="input-group mb-3">
                <input type="text" onChange={onNameChange} value={name} className="form-control"/>
                <button onClick={onAdd} className="btn btn-primary">Add</button>
            </div>
            <div className={'row'}>
                {statuses.map(status => (
                    <div className={'col'}>
                        <h3>{status}</h3>
                        {orders.filter(order => order.status === status)
                            .map(order => (
                                <div key={order.id}
                                     className={'d-flex align-items-center border mb-2'}
                                     onClick={() => {
                                         onOrderClick(order)
                                     }}
                                >
                                    <div className={'h1 me-4'}>{order.id}</div>
                                    {order.name}
                                </div>
                            ))}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default App
