export function formatDate(dateString, format = "dd/mm/yyyy") {
    const date = new Date(dateString);

    // Extrae los componentes de la fecha
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Meses van de 0 a 11
    const year = date.getFullYear();

    // Opcional: Extraer hora si es necesario
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