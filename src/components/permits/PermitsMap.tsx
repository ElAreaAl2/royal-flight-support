import React, { useState } from 'react';
import { ComposableMap, Geographies, Geography, Marker, ZoomableGroup } from 'react-simple-maps';
import { permitsData, regionalPermits, countryNames } from '../../data/permits';
import { motion, AnimatePresence } from 'framer-motion';

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

const PermitsMap = () => {
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [tooltipContent, setTooltipContent] = useState("");

  const handleCountryClick = (geo: any) => {
    const { ISO_A3 } = geo.properties;
    if (permitsData[ISO_A3]) {
      setSelectedCountry(ISO_A3);
    }
  };

  const handleMarkerClick = (iso: string) => {
    setSelectedCountry(iso);
  };

  return (
    <div className="relative w-full h-[600px] bg-black/50 rounded-xl overflow-hidden border border-white/10">
      <ComposableMap projection="geoMercator" projectionConfig={{ scale: 120 }}>
        <ZoomableGroup center={[-70, 0]} zoom={2}>
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map((geo) => {
                const isPermitCountry = permitsData[geo.properties.ISO_A3];
                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    onClick={() => handleCountryClick(geo)}
                    style={{
                      default: {
                        fill: isPermitCountry ? "#D4AF37" : "#333", // Gold for permit countries
                        outline: "none",
                        stroke: "#000",
                        strokeWidth: 0.5,
                      },
                      hover: {
                        fill: isPermitCountry ? "#F4CF57" : "#444",
                        outline: "none",
                        cursor: isPermitCountry ? "pointer" : "default",
                      },
                      pressed: {
                        fill: isPermitCountry ? "#B48F17" : "#222",
                        outline: "none",
                      },
                    }}
                  />
                );
              })
            }
          </Geographies>

          {Object.entries(permitsData).map(([iso, data]) => (
            <Marker key={iso} coordinates={data.coordinates} onClick={() => handleMarkerClick(iso)}>
              <circle r={4} fill="#FFF" stroke="#D4AF37" strokeWidth={2} className="cursor-pointer hover:scale-150 transition-transform" />
            </Marker>
          ))}
        </ZoomableGroup>
      </ComposableMap>

      {/* Regional Permits Overlay */}
      <div className="absolute top-4 left-4 bg-black/80 p-4 rounded border border-white/10">
        <h3 className="text-gold font-serif mb-2">Regional Permits</h3>
        {regionalPermits.map((permit) => (
          <div key={permit.name} className="text-white text-sm">
            <span className="font-bold">{permit.name}</span>: {permit.type}
          </div>
        ))}
      </div>

      {/* Selected Country Modal/Overlay */}
      <AnimatePresence>
        {selectedCountry && permitsData[selectedCountry] && (
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            className="absolute top-0 right-0 h-full w-80 bg-black/95 border-l border-white/10 p-6 overflow-y-auto backdrop-blur-md"
          >
            <button
              onClick={() => setSelectedCountry(null)}
              className="absolute top-4 right-4 text-white/50 hover:text-white"
            >
              ✕
            </button>
            
            <h2 className="text-2xl font-serif text-white mb-6 border-b border-white/10 pb-4">
              {countryNames[selectedCountry] || selectedCountry}
            </h2>

            <div className="space-y-6">
              {permitsData[selectedCountry].overflight && (
                <div className="bg-white/5 p-4 rounded">
                  <h3 className="text-gold font-bold mb-2">Overflight Permit</h3>
                  <p className="text-white/70 text-sm">Available</p>
                </div>
              )}

              {permitsData[selectedCountry].landing && (
                <div className="bg-white/5 p-4 rounded">
                  <h3 className="text-gold font-bold mb-2">Landing Permit</h3>
                  <p className="text-white/70 text-sm">Available</p>
                </div>
              )}

              {permitsData[selectedCountry].handling && (
                <div className="bg-white/5 p-4 rounded">
                  <h3 className="text-gold font-bold mb-2">Handling Services</h3>
                  <ul className="space-y-2">
                    {permitsData[selectedCountry].handling?.map((h) => (
                      <li key={h.code} className="text-white/70 text-sm flex justify-between">
                        <span>{h.name}</span>
                        <span className="text-white/40 font-mono">{h.code}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {permitsData[selectedCountry].other && (
                <div className="bg-white/5 p-4 rounded">
                  <h3 className="text-gold font-bold mb-2">Other Permits</h3>
                  <ul className="list-disc list-inside text-white/70 text-sm">
                    {permitsData[selectedCountry].other?.map((p) => (
                      <li key={p}>{p}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PermitsMap;
