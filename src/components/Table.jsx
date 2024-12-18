import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { getAllFiles } from '../services/fileService';
import DeleteButton from './actions/DeleteButton';
import ViewButton from './actions/ViewButton';
import { formatFileSize } from '../helpers/formatFileSize';


const columns = [
    { id: 'originalName', label: 'Nombre del Archivo', minWidth: 170 },
    {
        id: 'fileSize',
        label: 'Tamaño',
        minWidth: 170,
        format: (value) => formatFileSize(value),
    },
    { id: 'filePath', label: 'Ruta de almacenamiento', minWidth: 100, },
    {
        id: 'fileType',
        label: 'Tipo',
        minWidth: 170,
        format: (value) => value.toLocaleString('en-US'),
    },
    {
        id: 'actions',
        label: 'Acciones',
        minWidth: 100,
    },
];


export default function FilesTable() {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [files, setFiles] = React.useState();

    const handleGetFiles = async () => {

        const token = localStorage.getItem('token');
        if (!token) {
            console.error('No se encontró un token válido');
            return;
        }
        try {
            const filesData = await getAllFiles(token);
            setFiles(filesData);
            console.log(filesData)
        } catch (error) {
            console.error('Error al obtener los archivos', error);
        }
    };

    console.log(files)

    React.useEffect(() => {
        console.log('first')
        handleGetFiles();
    }, [])

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <TableContainer sx={{ maxHeight: 440 }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead  >
                        <TableRow >
                            {columns.map((column) => (
                                <TableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{ minWidth: column.minWidth }}
                                >
                                    <span className='font-medium text-lg text-gray-600'>

                                        {column.label.charAt(0).toUpperCase() + column.label.slice(1)}
                                    </span>
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {files && files
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((file) => {
                                return (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={file._id}>
                                        {columns.map((column) => {
                                            if (column.id === 'actions') {
                                                return (
                                                    <TableCell key={column.id} align={column.align}>
                                                        <span className='flex'>
                                                            <ViewButton id={file._id} />
                                                            <DeleteButton id={file._id} />
                                                        </span>
                                                    </TableCell>
                                                );
                                            }
                                            const value = file[column.id];
                                            return (
                                                <TableCell key={column.id} align={column.align}>
                                                    {column.format && typeof value === 'number'
                                                        ? column.format(value)
                                                        : value}
                                                </TableCell>
                                            );
                                        })}
                                    </TableRow>
                                );
                            })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={files?.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    );
}
