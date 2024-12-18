export function formatFileSize(sizeInBytes) {
    if (sizeInBytes === 0) return '0 Bytes';
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(sizeInBytes) / Math.log(1024));
    const formattedSize = (sizeInBytes / Math.pow(1024, i)).toFixed(2); // Redondea a 2 decimales
    return `${formattedSize} ${sizes[i]}`;
}
