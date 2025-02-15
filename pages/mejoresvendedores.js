import React, { useEffect } from 'react';
import Layout from '@/components/Layout';
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { gql, useQuery } from '@apollo/client'

const MEJORES_VENDEDORES = gql`
    query mejoresVendedores {
        mejoresVendedores {
            vendedor {
                nombre
                email
            }
            total
        }
    }
`;

const MejoresVendedores = () => {
    const { data, loading, error, startPolling, stopPolling } = useQuery(MEJORES_VENDEDORES);
    useEffect(() => {
        startPolling(1000);
        return () => {
            stopPolling();
        }
    }, [startPolling, stopPolling])
    if (loading) return 'Cargando...';
    const { mejoresVendedores } = data;
    const vendedorGrafica = [];
    mejoresVendedores.map((vendedor, index) => {
        vendedorGrafica[index] = {
            ...vendedor.vendedor[0],
            total: vendedor.total
        }
    })
    console.log(vendedorGrafica);
    return (
        <Layout>
            <h1 className="text-2xl text-gray-800 font-light">Mejores vendedores</h1>
            <ResponsiveContainer width={'99%'} height={500}>
                <BarChart
                    className='mt-10'
                    width={600}
                    height={450}
                    data={vendedorGrafica}
                    margin={{
                        top: 5,
                        right: 10,
                        left: 75,
                        bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="nombre" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="total" fill="#3182CE" activeBar={<Rectangle fill="blue" stroke="orange" />} />
                </BarChart>
                </ResponsiveContainer>
        </Layout>
    )
}

export default MejoresVendedores