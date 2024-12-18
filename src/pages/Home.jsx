import React from 'react';
import FilesTable from '../components/Table'; // Importa el componente de la tabla que lista los archivos
import FormDialog from '../components/Dialog'; // Importa el componente que contiene el formulario para agregar archivos
import AppBarHome from '../components/AppBar'; // Importa la barra de navegación superior de la aplicación

/**
 * Home es el componente principal que se renderiza al ingresar a la página inicial de la aplicación.
 * Muestra una barra de navegación, un título de la sección, un formulario para agregar archivos,
 * y una tabla que lista los archivos cargados en el sistema.
 */
export default function Home() {
    return (
        <div className='min-h-screen bg-gray-100 p-8' >
            {/* Barra de navegación superior */}
            <AppBarHome />
            
            {/* Título principal de la página */}
            <h1 className='text-4xl text-center mt-4'>
                Listado de Archivos
            </h1>
            
            {/* Formulario para agregar nuevos archivos */}
            <FormDialog />
            
            {/* Tabla que muestra la lista de archivos existentes */}
            <FilesTable />
        </div>
    )
}
