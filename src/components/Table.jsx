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


const columns = [
    { id: 'fileName', label: 'fileName', minWidth: 170 },
    { id: 'filePath', label: 'filePath', minWidth: 100 },
    {
        id: 'fileSize',
        label: 'fileSize',
        minWidth: 170,
        align: 'right',
        format: (value) => value.toLocaleString('en-US'),
    },
    {
        id: 'fileType',
        label: 'fileType',
        minWidth: 170,
        align: 'right',
        format: (value) => value.toLocaleString('en-US'),
    },
    {
        id: 'originalName',
        label: 'originalName',
        minWidth: 170,
        align: 'right',
        format: (value) => value.toFixed(2),
    },
    {
        id: 'actions',
        label: 'Actions',
        minWidth: 100,
        align: 'center'
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
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{ minWidth: column.minWidth }}
                                >
                                    {column.label}
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
                                                        <ViewButton id={file._id} />
                                                        <DeleteButton id={file._id} />
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
