import React, {useReducer} from 'react';
import PedidoContext from './PedidoContext';
import PedidoReducer from './PedidoReducer';

import {
    SELECCIONAR_CLIENTE,
    SELECCIONAR_PRODUCTO,
    CANTIDAD_PRODUCTOS,
    ACTUALIZAR_TOTAL
} from '../../types';

const PedidoState = ({children}) => {
    // State de pedidos
    const initialState = {
        cliente: {},
        productos: [],
        total: 0
    }

    const [state, dispatch] = useReducer(PedidoReducer, initialState);

    // Modifica el cliente
    const agregarCliente = cliente => {
        dispatch({
            type: SELECCIONAR_CLIENTE,
            payload: cliente
        })
    }

    // Modifica las cantidades de los productos
    const cantidadProductos = nuevoProducto => {
        dispatch({
            type: CANTIDAD_PRODUCTOS,
            payload: nuevoProducto
        })
    }

    const actualizarTotal = () => {
        dispatch({
            type: ACTUALIZAR_TOTAL
        })
    }

    // Modifica los productos
    const agregarProductos = productosSeleccionados => {
        let nuevoState;
        if (state.productos.length > 0) {
            // Tomar del segundo arreglo, una copia para asignarlo al primero
            nuevoState = productosSeleccionados.map(producto => {
                const nuevoObjeto = state.productos.find(productoState => productoState.id === producto.id);
                return {...producto, ...nuevoObjeto}
            })
        } else {
            nuevoState = productosSeleccionados;
        }
        dispatch({
            type: SELECCIONAR_PRODUCTO,
            payload: nuevoState
        })
    }
    return (
        <PedidoContext.Provider
            value={{
                productos: state.productos,
                total: state.total,
                cliente: state.cliente,
                agregarCliente,
                agregarProductos,
                cantidadProductos,
                actualizarTotal
            }}
            > {children}
        </PedidoContext.Provider>
    )
}

export default PedidoState;