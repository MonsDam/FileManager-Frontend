/**
 * @function formatDate
 * @description Formatea una cadena de fecha en un formato personalizado.
 * 
 * Esta función convierte una cadena de fecha en un formato legible, con la opción de incluir hora, minuto y segundo si se necesita.
 * 
 * @param {string} dateString - La cadena que representa una fecha. Puede ser un string en formato ISO, fecha completa, etc.
 * @param {string} [format="dd/mm/yyyy"] - El formato deseado para la fecha. Los valores disponibles son:
 *  - "dd": Día en dos dígitos.
 *  - "mm": Mes en dos dígitos.
 *  - "yyyy": Año en cuatro dígitos.
 *  - "hh": Hora en formato de 24 horas (opcional).
 *  - "MM": Minutos en formato de dos dígitos (opcional).
 *  - "ss": Segundos en formato de dos dígitos (opcional).
 * 
 * @returns {string} La fecha formateada según el formato especificado.
 * 
 * @example
 * // Ejemplo 1: Formatear solo la fecha (día, mes, año).
 * formatDate("2024-12-17T15:30:00", "dd/mm/yyyy");
 * // Resultado: "17/12/2024"
 * 
 * @example
 * // Ejemplo 2: Formatear la fecha con hora, minuto y segundo.
 * formatDate("2024-12-17T15:30:00", "dd/mm/yyyy hh:MM:ss");
 * // Resultado: "17/12/2024 15:30:00"
 */
export function formatDate(dateString, format = "dd/mm/yyyy") {
    const date = new Date(dateString);

    // Extrae los componentes de la fecha
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Los meses van de 0 a 11
    const year = date.getFullYear();

    // Extraer hora, minutos y segundos si es necesario
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    // Reemplaza el formato según lo indicado
    return format
        .replace("dd", day)
        .replace("mm", month)
        .replace("yyyy", year)
        .replace("hh", hours)
        .replace("MM", minutes)
        .replace("ss", seconds);
}
