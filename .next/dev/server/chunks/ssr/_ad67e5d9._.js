module.exports = [
"[project]/features/doctor/prescriptions/actions.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"40601638647a5a450f59562f3449afa5b836e4fb4a":"getDoctorPrescriptions","40826c30ba294216730ad084ad9aac0bb6df40a70f":"issuePrescription"},"",""] */ __turbopack_context__.s([
    "getDoctorPrescriptions",
    ()=>getDoctorPrescriptions,
    "issuePrescription",
    ()=>issuePrescription
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-rsc] (ecmascript)");
;
async function issuePrescription(input) {
    return {
        id: `rx-${Date.now()}`,
        appointmentId: input.appointmentId ?? '',
        patientId: input.patientId,
        doctorId: input.doctorId,
        date: new Date().toISOString().split('T')[0],
        diagnosis: input.diagnosis || 'General Consultation',
        medications: input.medications.split('\n').filter(Boolean).map((line)=>({
                name: line.split('-')[0]?.trim() || line.trim(),
                dosage: line.split('-')[1]?.trim() || '500mg',
                frequency: 'Once daily',
                duration: '7 days'
            })),
        instructions: input.instructions || 'Take with food. Stay hydrated.',
        validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        isDigital: true
    };
}
async function getDoctorPrescriptions(doctorId) {
    return {
        doctorId,
        fetchedAt: new Date().toISOString()
    };
}
;
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ensureServerEntryExports"])([
    issuePrescription,
    getDoctorPrescriptions
]);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(issuePrescription, "40826c30ba294216730ad084ad9aac0bb6df40a70f", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getDoctorPrescriptions, "40601638647a5a450f59562f3449afa5b836e4fb4a", null);
}),
"[project]/.next-internal/server/app/(doctor)/doctor/prescriptions/page/actions.js { ACTIONS_MODULE0 => \"[project]/features/doctor/prescriptions/actions.ts [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$doctor$2f$prescriptions$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/features/doctor/prescriptions/actions.ts [app-rsc] (ecmascript)");
;
;
}),
"[project]/.next-internal/server/app/(doctor)/doctor/prescriptions/page/actions.js { ACTIONS_MODULE0 => \"[project]/features/doctor/prescriptions/actions.ts [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "40601638647a5a450f59562f3449afa5b836e4fb4a",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$features$2f$doctor$2f$prescriptions$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getDoctorPrescriptions"],
    "40826c30ba294216730ad084ad9aac0bb6df40a70f",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$features$2f$doctor$2f$prescriptions$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["issuePrescription"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f2e$next$2d$internal$2f$server$2f$app$2f28$doctor$292f$doctor$2f$prescriptions$2f$page$2f$actions$2e$js__$7b$__ACTIONS_MODULE0__$3d3e$__$225b$project$5d2f$features$2f$doctor$2f$prescriptions$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$server__actions__loader$2c$__ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i('[project]/.next-internal/server/app/(doctor)/doctor/prescriptions/page/actions.js { ACTIONS_MODULE0 => "[project]/features/doctor/prescriptions/actions.ts [app-rsc] (ecmascript)" } [app-rsc] (server actions loader, ecmascript) <locals>');
var __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$doctor$2f$prescriptions$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/features/doctor/prescriptions/actions.ts [app-rsc] (ecmascript)");
}),
"[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

/* eslint-disable import/no-extraneous-dependencies */ Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "registerServerReference", {
    enumerable: true,
    get: function() {
        return _server.registerServerReference;
    }
});
const _server = __turbopack_context__.r("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)"); //# sourceMappingURL=server-reference.js.map
}),
"[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// This function ensures that all the exported values are valid server actions,
// during the runtime. By definition all actions are required to be async
// functions, but here we can only check that they are functions.
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ensureServerEntryExports", {
    enumerable: true,
    get: function() {
        return ensureServerEntryExports;
    }
});
function ensureServerEntryExports(actions) {
    for(let i = 0; i < actions.length; i++){
        const action = actions[i];
        if (typeof action !== 'function') {
            throw Object.defineProperty(new Error(`A "use server" file can only export async functions, found ${typeof action}.\nRead more: https://nextjs.org/docs/messages/invalid-use-server-value`), "__NEXT_ERROR_CODE", {
                value: "E352",
                enumerable: false,
                configurable: true
            });
        }
    }
} //# sourceMappingURL=action-validate.js.map
}),
];

//# sourceMappingURL=_ad67e5d9._.js.map