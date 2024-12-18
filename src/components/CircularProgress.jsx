import * as React from 'react';
import PropTypes from 'prop-types';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

/**
 * @function CircularUploadProgress
 * @description Componente de progreso circular que muestra el porcentaje de carga (upload) en el centro del círculo.
 * 
 * Este componente usa el componente `CircularProgress` de Material-UI y coloca el porcentaje de carga como un texto en su centro.
 * 
 * @param {Object} props - Propiedades del componente.
 * @param {number} props.value - El valor actual del progreso (porcentaje) a mostrar en el círculo. Debe ser un número entre 0 y 100.
 * 
 * @returns {JSX.Element} Un círculo de progreso con el porcentaje centrado en su interior.
 */
export default function CircularUploadProgress(props) {
    return (
        <Box sx={{ position: 'relative', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
            {/* Componente CircularProgress con un progreso determinado */}
            <CircularProgress variant="determinate" {...props} />
            
            <Box
                sx={{
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                    position: 'absolute',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                {/* Muestra el porcentaje en el centro del círculo */}
                <Typography
                    variant="caption"
                    component="div"
                    sx={{ color: 'text.secondary' }}
                >
                    {`${Math.round(props.value)}%`}
                </Typography>
            </Box>
        </Box>
    );
}
