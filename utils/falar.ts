export const falar = (texto: string, idioma: string = "pt") => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
        const langMap: Record<string, string> = {
            pt: "pt-BR",
            es: "es-ES",
        };

        window.speechSynthesis.cancel(); // para qualquer fala anterior

        const fala = new SpeechSynthesisUtterance(texto);
        fala.lang = langMap[idioma] || "pt-BR";
        window.speechSynthesis.speak(fala);
    }
};
