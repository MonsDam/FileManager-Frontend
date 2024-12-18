/**
 * @function formatFileSize
 * @description Convierte un tamaño de archivo en bytes a una representación legible (KB, MB, GB, etc.).
 * 
 * Esta función toma un tamaño de archivo en bytes y lo convierte en una cadena con la unidad de medida adecuada (KB, MB, GB, TB).
 * El valor se redondea a dos decimales para mayor legibilidad.
 * 
 * @param {number} sizeInBytes - El tamaño del archivo en bytes.
 * 
 * @returns {string} El tamaño formateado con la unidad correspondiente.
 * 
 * @example
 * // Ejemplo 1: Convertir 1024 bytes a KB
 * formatFileSize(1024);
 * // Resultado: "1.00 KB"
 * 
 * @example
 * // Ejemplo 2: Convertir 1048576 bytes a MB
 * formatFileSize(1048576);
 * // Resultado: "1.00 MB"
 * 
 * @example
 * // Ejemplo 3: Convertir 1073741824 bytes a GB
 * formatFileSize(1073741824);
 * // Resultado: "1.00 GB"
 */
export function formatFileSize(sizeInBytes) {
    if (sizeInBytes === 0) return '0 Bytes'; // Si el tamaño es 0, se devuelve '0 Bytes'
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']; // Unidades de medida para el tamaño de archivo
    const i = Math.floor(Math.log(sizeInBytes) / Math.log(1024)); // Determina la unidad adecuada
    const formattedSize = (sizeInBytes / Math.pow(1024, i)).toFixed(2); // Convierte el tamaño y redondea a 2 decimales
    return `${formattedSize} ${sizes[i]}`; // Devuelve el tamaño con la unidad correspondiente
}
