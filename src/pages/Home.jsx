import React from 'react';
import FilesTable from '../components/Table';
import FormDialog from '../components/Dialog';
import AppBarHome from '../components/AppBar';


export default function Home() {
    return (
        <div className='min-h-screen bg-gray-100 p-8' >
            <AppBarHome />
            {/* <h1 className='text-4xl text-center ' >Bienvenido a la página de inicio</h1> */}
            <h1 className='text-4xl text-center mt-4 ' >Listado de Archivos</h1>
            <FormDialog />
            <FilesTable />
        </div>
    )
}
