module.exports = [
"[project]/features/doctor/consult/actions.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"402e679a1f1ed7db81a304e6ef5acdd793f3ec47db":"sendLabRequest","405fd670c4c8ea10d8db03b84ef2f31f6002d13af3":"sendMedicalCertificate","406052d845a5af03ff1cfb7507ec28bcf9529ef7fe":"endConsult","40e0e049f2e23c0f06000eeefa4c8d538eb86d350e":"sendPrescription"},"",""] */ __turbopack_context__.s([
    "endConsult",
    ()=>endConsult,
    "sendLabRequest",
    ()=>sendLabRequest,
    "sendMedicalCertificate",
    ()=>sendMedicalCertificate,
    "sendPrescription",
    ()=>sendPrescription
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-rsc] (ecmascript)");
;
async function endConsult(appointmentId) {
    return {
        appointmentId,
        endedAt: new Date().toISOString(),
        transcript: 'Consultation ended. Summary recorded by doctor.'
    };
}
async function sendPrescription(input) {
    const meds = input.medications.split('\n').filter(Boolean).map((line)=>({
            name: line.split('-')[0]?.trim() || line.trim(),
            dosage: '500mg',
            frequency: 'Once daily',
            duration: '7 days'
        }));
    return {
        id: `rx-${Date.now()}`,
        appointmentId: input.appointmentId,
        patientId: input.patientId,
        doctorId: input.doctorId,
        date: new Date().toISOString().split('T')[0],
        diagnosis: input.diagnosis || 'General Consultation',
        medications: meds.length ? meds : [
            {
                name: input.medications || 'Paracetamol',
                dosage: '500mg',
                frequency: 'Every 6 hours',
                duration: '3 days'
            }
        ],
        instructions: input.instructions || 'Take with food. Stay hydrated.',
        validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        isDigital: true
    };
}
async function sendLabRequest(input) {
    return {
        id: `lab-${Date.now()}`,
        patientId: input.patientId,
        doctorId: input.doctorId,
        appointmentId: input.appointmentId,
        testName: input.testName || 'Laboratory Test',
        testType: 'Lab Request',
        date: new Date().toISOString().split('T')[0],
        status: 'pending',
        notes: input.notes,
        laboratory: 'NowServing Partner Lab'
    };
}
async function sendMedicalCertificate(input) {
    const today = new Date();
    const validFrom = today.toISOString().split('T')[0];
    const validUntilDate = new Date(today);
    validUntilDate.setDate(today.getDate() + (input.restDays || 1));
    return {
        id: `cert-${Date.now()}`,
        patientId: input.patientId,
        doctorId: input.doctorId,
        date: validFrom,
        purpose: input.purpose || 'Medical Certificate',
        diagnosis: input.diagnosis || 'General Consultation',
        restDays: input.restDays || 1,
        validFrom,
        validUntil: validUntilDate.toISOString().split('T')[0]
    };
}
;
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ensureServerEntryExports"])([
    endConsult,
    sendPrescription,
    sendLabRequest,
    sendMedicalCertificate
]);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(endConsult, "406052d845a5af03ff1cfb7507ec28bcf9529ef7fe", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(sendPrescription, "40e0e049f2e23c0f06000eeefa4c8d538eb86d350e", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(sendLabRequest, "402e679a1f1ed7db81a304e6ef5acdd793f3ec47db", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(sendMedicalCertificate, "405fd670c4c8ea10d8db03b84ef2f31f6002d13af3", null);
}),
"[project]/features/doctor/messages/actions.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"7086cdf6fdfd851a02e9fbede8fa140cb2d5925ecf":"attachDocument","70fee0dce18f060ec78c9701ccef2c48eda9cc926a":"sendMessage"},"",""] */ __turbopack_context__.s([
    "attachDocument",
    ()=>attachDocument,
    "sendMessage",
    ()=>sendMessage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-rsc] (ecmascript)");
;
async function sendMessage(conversationId, senderId, content) {
    return {
        id: `msg-${Date.now()}`,
        conversationId,
        senderId,
        content,
        createdAt: new Date().toISOString()
    };
}
async function attachDocument(conversationId, senderId, documentId) {
    return {
        id: `msg-doc-${Date.now()}`,
        conversationId,
        senderId,
        documentId,
        createdAt: new Date().toISOString()
    };
}
;
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ensureServerEntryExports"])([
    sendMessage,
    attachDocument
]);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(sendMessage, "70fee0dce18f060ec78c9701ccef2c48eda9cc926a", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(attachDocument, "7086cdf6fdfd851a02e9fbede8fa140cb2d5925ecf", null);
}),
"[project]/.next-internal/server/app/(doctor)/doctor/messages/page/actions.js { ACTIONS_MODULE0 => \"[project]/features/doctor/consult/actions.ts [app-rsc] (ecmascript)\", ACTIONS_MODULE1 => \"[project]/features/doctor/messages/actions.ts [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$doctor$2f$consult$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/features/doctor/consult/actions.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$doctor$2f$messages$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/features/doctor/messages/actions.ts [app-rsc] (ecmascript)");
;
;
;
;
;
}),
"[project]/.next-internal/server/app/(doctor)/doctor/messages/page/actions.js { ACTIONS_MODULE0 => \"[project]/features/doctor/consult/actions.ts [app-rsc] (ecmascript)\", ACTIONS_MODULE1 => \"[project]/features/doctor/messages/actions.ts [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "402e679a1f1ed7db81a304e6ef5acdd793f3ec47db",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$features$2f$doctor$2f$consult$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sendLabRequest"],
    "405fd670c4c8ea10d8db03b84ef2f31f6002d13af3",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$features$2f$doctor$2f$consult$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sendMedicalCertificate"],
    "40e0e049f2e23c0f06000eeefa4c8d538eb86d350e",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$features$2f$doctor$2f$consult$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sendPrescription"],
    "7086cdf6fdfd851a02e9fbede8fa140cb2d5925ecf",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$features$2f$doctor$2f$messages$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["attachDocument"],
    "70fee0dce18f060ec78c9701ccef2c48eda9cc926a",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$features$2f$doctor$2f$messages$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sendMessage"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f2e$next$2d$internal$2f$server$2f$app$2f28$doctor$292f$doctor$2f$messages$2f$page$2f$actions$2e$js__$7b$__ACTIONS_MODULE0__$3d3e$__$225b$project$5d2f$features$2f$doctor$2f$consult$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29222c$__ACTIONS_MODULE1__$3d3e$__$225b$project$5d2f$features$2f$doctor$2f$messages$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$server__actions__loader$2c$__ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i('[project]/.next-internal/server/app/(doctor)/doctor/messages/page/actions.js { ACTIONS_MODULE0 => "[project]/features/doctor/consult/actions.ts [app-rsc] (ecmascript)", ACTIONS_MODULE1 => "[project]/features/doctor/messages/actions.ts [app-rsc] (ecmascript)" } [app-rsc] (server actions loader, ecmascript) <locals>');
var __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$doctor$2f$consult$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/features/doctor/consult/actions.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$doctor$2f$messages$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/features/doctor/messages/actions.ts [app-rsc] (ecmascript)");
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

//# sourceMappingURL=_46452a27._.js.map