import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { Box, IconButton, Modal, Typography } from "@mui/material";
import { useState } from "react";
import { getOneFile } from "../../services/fileService";
import { formatFileSize } from "../../helpers/formatFileSize";
import { formatDate } from "../../helpers/formatDate";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  // border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

/**
 * @function ViewButton
 * @description Componente que muestra un botón para ver los detalles de un archivo. Al hacer clic, abre un modal que muestra la información del archivo como su nombre, tipo, tamaño y fecha de carga.
 *
 * @param {Object} props - Las propiedades del componente.
 * @param {string} props.id - El ID del archivo que se desea ver.
 *
 * @returns {JSX.Element} El componente que incluye el botón para ver los detalles y un modal con la información del archivo.
 */
export default function ViewButton({ id }) {
  const [file, setFile] = useState();
  const [open, setOpen] = useState(false);

  /**
   * @function handleClose
   * @description Cierra el modal de detalles del archivo.
   */
  const handleClose = () => setOpen(false);

  /**
   * @function handleGetOneFile
   * @description Obtiene los detalles de un archivo desde el servidor y los muestra en el modal.
   * @async
   * @throws {Error} Si ocurre un error al obtener los detalles del archivo.
   */
  const handleGetOneFile = async () => {
    setOpen(true);
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No se encontró un token válido");
      return;
    }
    try {
      const fileData = await getOneFile(id, token);
      setFile(fileData);
    } catch (error) {
        alert("Error al obtener los archivos")
      console.error("Error al obtener los archivos", error);
    }
  };

  return (
    <div>
      {/* Botón de ver detalles */}
      <IconButton aria-label="ver" size="small" onClick={handleGetOneFile}>
        <RemoveRedEyeIcon color="primary" fontSize="small" />
      </IconButton>

      {/* Modal para mostrar los detalles del archivo */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            className="text-gray-800"
            id="modal-modal-title"
            variant="h6"
            component="h2"
          >
            Detalles del archivo
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {file ? (
              <div className="grid grid-cols-1 gap-4">
                <span>Nombre: {file?.originalName}</span>
                <span>Tipo de archivo: {file?.fileType}</span>
                <span>Tamaño: {formatFileSize(file?.fileSize)}</span>
                <span>Fecha de carga: {formatDate(file?.uploadedAt)} </span>
              </div>
            ) : (
              <span>Error al cargar los detalles</span>
            )}
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}
