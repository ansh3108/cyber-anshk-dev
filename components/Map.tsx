"use client";

import React, { useEffect, useRef } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';

export const Map = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<maplibregl.Map | null>(null);

  useEffect(() => {
    if (map.current || !mapContainer.current) return;

    const lng = 77.2090;
    const lat = 28.6139;

    map.current = new maplibregl.Map({
      container: mapContainer.current,
      style: 'https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json',
      center: [lng, lat],
      zoom: 10,
      interactive: true,
      attributionControl: false,
    });

    const markerEl = document.createElement('div');
    markerEl.innerHTML = `
      <div style="position:relative;width:0;height:0">
        <div style="position:absolute;width:30px;height:30px;border-radius:50%;background:rgba(147,51,234,0.2);transform:translate(-50%,-50%);animation:ping 1.8s cubic-bezier(0,0,.2,1) infinite"></div>
        <div style="position:absolute;width:12px;height:12px;border-radius:50%;background:#9333ea;border:2px solid #a855f7;transform:translate(-50%,-50%);box-shadow:0 0 15px rgba(147,51,234,0.8)"></div>
      </div>
      <style>
        @keyframes ping {
          75%, 100% { transform: translate(-50%,-50%) scale(2.5); opacity: 0; }
        }
      </style>
    `;

    new maplibregl.Marker({ element: markerEl })
      .setLngLat([lng, lat])
      .setPopup(new maplibregl.Popup({ offset: 18, closeButton: false })
        .setHTML(`<span style="font-family:monospace;font-size:12px;color:#9333ea;font-weight:bold;">Delhi, India 🇮🇳</span>`))
      .addTo(map.current);

    map.current.dragRotate.disable();
    map.current.touchZoomRotate.disableRotation();

    const resizer = new ResizeObserver(() => map.current?.resize());
    resizer.observe(mapContainer.current);

    return () => {
      map.current?.remove();
      resizer.disconnect();
    };
  }, []);

  return (
    <div className="w-full h-full min-h-[300px] grayscale brightness-75 contrast-125">
      <div ref={mapContainer} className="w-full h-full" />
    </div>
  );
};