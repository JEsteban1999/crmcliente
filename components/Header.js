import React from 'react';
import {useQuery, gql} from '@apollo/client';
import {useRouter} from 'next/router';

const OBTENER_USUARIO = gql`
    query obtenerUsuario{
        obtenerUsuario {
            id
            nombre
            apellido
        }
    }
`;

const Header = () => {
    const router = useRouter();
    // Query de Apollo
    const {data, loading, error} = useQuery(OBTENER_USUARIO);
    // Proteger que no accedamos a data antes de tener resultados
    if (loading) return null;
    // Si no hay información
    if (!data) {
        return router.push('/login');
    }
    const {nombre, apellido} = data.obtenerUsuario;
    const cerrarSesion = () => {
        localStorage.removeItem('token');
        router.push('/login');
    }
    return (
        <div className='sm:flex sm:justify-between mb-6'>
            <p className='mr-2 mb-5 lg:mb-0'>Hola: {nombre} {apellido}</p>
            <button onClick={() => cerrarSesion()} type='button' className='bg-blue-800 w-full sm:w-auto font-bold uppercase text-xs rounded py-1 px-2 text-white shadow-md'>Cerrar sesión</button>
        </div>
    )
}

export default Header;