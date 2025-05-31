
import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Corrigir ícones padrão do Leaflet (importantíssimo)

// Corrigir ícones padrão do Leaflet (importantíssimo)
// eslint-disable-next-line @typescript-eslint/no-explicit-any
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
    iconUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
    shadowUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
});


const locations: [number, number][] = [
    [-15.793889, -47.882778], // Brasília
    [-23.55052, -46.633308],  // São Paulo
    [-22.906847, -43.172896], // Rio de Janeiro
];

const MapComponent = () => {
    return (
        <div style={{ height: "400px", width: "100%" }}>
            <MapContainer
                center={[-15.793889, -47.882778]}
                zoom={4}
                scrollWheelZoom={false}
                style={{ height: "100%", width: "100%" }}
            >
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                {locations.map((pos, idx) => (
                    <Marker key={idx} position={pos}>
                        <Popup>Ponto {idx + 1}</Popup>
                    </Marker>
                ))}
            </MapContainer>
        </div>
    );
};

export default MapComponent;
