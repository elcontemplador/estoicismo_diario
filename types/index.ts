export interface Quote {
    id: number;          // OJO: Es numérico
    author: string;      // Ej: "Epicteto", "Cleantes"
    text: string;        // El contenido de la cita
    date?: string;       // Ej: "2023-01-01" (puede usarse o ignorarse)
    favorite?: boolean;  // Estado interno de la app (no viene en el JSON)
}
