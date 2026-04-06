(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/components/checkout/MapPicker.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>MapPicker
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
function MapPicker({ lat, lng, onChange }) {
    _s();
    const containerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const mapRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const markerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "MapPicker.useEffect": ()=>{
            if (!containerRef.current) return;
            let destroyed = false;
            __turbopack_context__.A("[project]/node_modules/leaflet/dist/leaflet.css [app-client] (css, async loader)").then({
                "MapPicker.useEffect": ()=>__turbopack_context__.A("[project]/node_modules/leaflet/dist/leaflet-src.js [app-client] (ecmascript, async loader)").then({
                        "MapPicker.useEffect": (mod)=>{
                            if (destroyed || !containerRef.current) return;
                            const L = mod.default ?? mod;
                            // eslint-disable-next-line @typescript-eslint/no-explicit-any
                            delete L.Icon.Default.prototype._getIconUrl;
                            L.Icon.Default.mergeOptions({
                                iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
                                iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
                                shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png'
                            });
                            const map = L.map(containerRef.current, {
                                center: [
                                    lat,
                                    lng
                                ],
                                zoom: 15
                            });
                            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
                                maxZoom: 19
                            }).addTo(map);
                            const marker = L.marker([
                                lat,
                                lng
                            ], {
                                draggable: true
                            }).addTo(map);
                            // eslint-disable-next-line @typescript-eslint/no-explicit-any
                            marker.on('dragend', {
                                "MapPicker.useEffect": ()=>{
                                    const p = marker.getLatLng();
                                    onChange(p.lat, p.lng);
                                }
                            }["MapPicker.useEffect"]);
                            map.on('click', {
                                "MapPicker.useEffect": (e)=>{
                                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                    marker.setLatLng([
                                        e.latlng.lat,
                                        e.latlng.lng
                                    ]);
                                    onChange(e.latlng.lat, e.latlng.lng);
                                }
                            }["MapPicker.useEffect"]);
                            mapRef.current = map;
                            markerRef.current = marker;
                        }
                    }["MapPicker.useEffect"])
            }["MapPicker.useEffect"]);
            return ({
                "MapPicker.useEffect": ()=>{
                    destroyed = true;
                    if (mapRef.current) {
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        mapRef.current.remove();
                        mapRef.current = null;
                        markerRef.current = null;
                    }
                }
            })["MapPicker.useEffect"];
        // eslint-disable-next-line react-hooks/exhaustive-deps
        }
    }["MapPicker.useEffect"], []);
    // Sync external lat/lng (e.g. from geocoding)
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "MapPicker.useEffect": ()=>{
            if (!markerRef.current || !mapRef.current) return;
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            markerRef.current.setLatLng([
                lat,
                lng
            ]);
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            mapRef.current.setView([
                lat,
                lng
            ], 15);
        }
    }["MapPicker.useEffect"], [
        lat,
        lng
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: containerRef,
        className: "w-full rounded-xl border border-border overflow-hidden",
        style: {
            height: 220
        },
        "aria-label": "Delivery location map"
    }, void 0, false, {
        fileName: "[project]/src/components/checkout/MapPicker.tsx",
        lineNumber: 74,
        columnNumber: 5
    }, this);
}
_s(MapPicker, "joZL/+F/mkRfL3U5shbZ7Q5UoaQ=");
_c = MapPicker;
var _c;
__turbopack_context__.k.register(_c, "MapPicker");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/checkout/MapPicker.tsx [app-client] (ecmascript, next/dynamic entry)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/src/components/checkout/MapPicker.tsx [app-client] (ecmascript)"));
}),
]);

//# sourceMappingURL=src_components_checkout_MapPicker_tsx_31d45a0c._.js.map