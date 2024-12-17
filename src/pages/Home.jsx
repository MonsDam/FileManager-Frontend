import React from 'react';
import FilesTable from '../components/Table';
import FormDialog from '../components/Dialog';
import LogoutButton from '../components/actions/LogoutButton';

const Home = () => {
    return (
        <div>
            <h1>Bienvenido a la página de inicio</h1>
            <LogoutButton />
            <FormDialog />
            <FilesTable />
        </div>

    );
};

export default Home;
