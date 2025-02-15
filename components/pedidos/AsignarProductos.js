import React, {useEffect, useState, useContext} from 'react';
import Select from 'react-select';
import { gql, useQuery } from '@apollo/client';
import PedidoContext from '@/context/pedidos/PedidoContext';

const OBTENER_PRODUCTOS = gql`
    query obtenerProductos {
        obtenerProductos {
            id
            nombre
            precio
            existencia
        }
    }
`;

const AsignarProductos = () => {
    // State local del componente
    const [productos, setProductos] = useState([]);
    // Utilizar context y extraer sus valores
    const pedidoContext = useContext(PedidoContext);
    const { agregarProductos } = pedidoContext;
    // Consultar la base de datos
    const { data, loading, error } = useQuery(OBTENER_PRODUCTOS);

    useEffect(() => {
        agregarProductos(productos);
    }, [productos]);
    
    const seleccionarProducto = producto => {
        setProductos(producto);
    }
    if (loading) return null;
    const { obtenerProductos } = data;
    return (
        <>
            <p className='mt-10 my-2 bg-white border-l-4 border-gray-800 text-gray-700 p-2 text-sm font-bold'>2. Selecciona o busca los productos</p>
            <Select className='mt-3' 
            options={obtenerProductos} 
            onChange={(opcion) => seleccionarProducto(opcion)} 
            getOptionValue={(opciones) => opciones.id} 
            getOptionLabel={(opciones) => `${opciones.nombre} - ${opciones.existencia} disponibles`} 
            placeholder="Busque o seleccione el producto" 
            noOptionsMessage={() => "No hay resultados"}
            isMulti={true} />
        </>
    )
}

export default AsignarProductos