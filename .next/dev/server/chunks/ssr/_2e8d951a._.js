module.exports = [
"[project]/features/patient/booking/actions.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"401bbb71494d5dc9d4fbf9f19b44ebb2e2546bf4eb":"retrievePaymongoCheckoutSession","4083061800210e1e79464de3105005c7d411d343bb":"createPaymongoCheckoutSession"},"",""] */ __turbopack_context__.s([
    "createPaymongoCheckoutSession",
    ()=>createPaymongoCheckoutSession,
    "retrievePaymongoCheckoutSession",
    ()=>retrievePaymongoCheckoutSession
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-rsc] (ecmascript)");
;
const PAYMONGO_API_BASE = "https://api.paymongo.com/v1";
// PayMongo checkout session supports: gcash, card, paymaya, brankas_bdo,
// brankas_landbank, brankas_metrobank (brankas requires separate activation).
// For test mode, use "card" as the bank-transfer equivalent.
const BANK_METHODS = [
    "card"
];
const getAuthHeader = ()=>{
    const secretKey = process.env.PAYMONGO_SECRET_KEY;
    if (!secretKey || secretKey.length < 10) {
        throw new Error("PayMongo secret key is not configured. Set PAYMONGO_SECRET_KEY in .env.local with a real key from https://dashboard.paymongo.com");
    }
    const token = Buffer.from(`${secretKey}:`).toString("base64");
    return `Basic ${token}`;
};
const toCentavos = (amount)=>Math.round(amount * 100);
async function createPaymongoCheckoutSession(input) {
    const lineItemAmount = toCentavos(input.amount);
    const billing = {
        name: input.patientName,
        email: input.patientEmail,
        ...input.patientPhone ? {
            phone: input.patientPhone
        } : {}
    };
    const body = {
        data: {
            attributes: {
                payment_method_types: input.method === "gcash" ? [
                    "gcash"
                ] : BANK_METHODS,
                line_items: [
                    {
                        name: `Consultation with ${input.doctorName}`,
                        amount: lineItemAmount,
                        currency: "PHP",
                        quantity: 1
                    }
                ],
                description: "Doctor consultation booking",
                success_url: input.successUrl,
                cancel_url: input.cancelUrl,
                billing,
                metadata: input.metadata ?? {},
                send_email_receipt: true
            }
        }
    };
    let res;
    try {
        res = await fetch(`${PAYMONGO_API_BASE}/checkout_sessions`, {
            method: "POST",
            headers: {
                Authorization: getAuthHeader(),
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body),
            cache: "no-store"
        });
    } catch (error) {
        if (error.code === 'EAI_AGAIN' || error.cause?.code === 'EAI_AGAIN') {
            throw new Error("Unable to connect to PayMongo. Please check your internet connection and try again.");
        }
        throw new Error(`Network error: ${error.message || 'Unable to reach payment service'}`);
    }
    const json = await res.json();
    if (!res.ok) {
        const message = json?.errors?.[0]?.detail || json?.errors?.[0]?.code || "Failed to create PayMongo checkout session.";
        throw new Error(message);
    }
    const checkoutId = json?.data?.id;
    const checkoutUrl = json?.data?.attributes?.checkout_url;
    if (!checkoutId || !checkoutUrl) {
        throw new Error("PayMongo response missing checkout session data.");
    }
    return {
        checkoutId,
        checkoutUrl
    };
}
async function retrievePaymongoCheckoutSession(checkoutId) {
    let res;
    try {
        res = await fetch(`${PAYMONGO_API_BASE}/checkout_sessions/${checkoutId}`, {
            method: "GET",
            headers: {
                Authorization: getAuthHeader(),
                "Content-Type": "application/json"
            },
            cache: "no-store"
        });
    } catch (error) {
        if (error.code === 'EAI_AGAIN' || error.cause?.code === 'EAI_AGAIN') {
            throw new Error("Unable to connect to PayMongo. Please check your internet connection and try again.");
        }
        throw new Error(`Network error: ${error.message || 'Unable to reach payment service'}`);
    }
    const json = await res.json();
    if (!res.ok) {
        const message = json?.errors?.[0]?.detail || json?.errors?.[0]?.code || "Failed to retrieve PayMongo checkout session.";
        throw new Error(message);
    }
    return json?.data;
}
;
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ensureServerEntryExports"])([
    createPaymongoCheckoutSession,
    retrievePaymongoCheckoutSession
]);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(createPaymongoCheckoutSession, "4083061800210e1e79464de3105005c7d411d343bb", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(retrievePaymongoCheckoutSession, "401bbb71494d5dc9d4fbf9f19b44ebb2e2546bf4eb", null);
}),
"[project]/.next-internal/server/app/(patient)/patient/book/[doctorId]/page/actions.js { ACTIONS_MODULE0 => \"[project]/features/patient/booking/actions.ts [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$patient$2f$booking$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/features/patient/booking/actions.ts [app-rsc] (ecmascript)");
;
;
}),
"[project]/.next-internal/server/app/(patient)/patient/book/[doctorId]/page/actions.js { ACTIONS_MODULE0 => \"[project]/features/patient/booking/actions.ts [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "401bbb71494d5dc9d4fbf9f19b44ebb2e2546bf4eb",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$features$2f$patient$2f$booking$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["retrievePaymongoCheckoutSession"],
    "4083061800210e1e79464de3105005c7d411d343bb",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$features$2f$patient$2f$booking$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createPaymongoCheckoutSession"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f2e$next$2d$internal$2f$server$2f$app$2f28$patient$292f$patient$2f$book$2f5b$doctorId$5d2f$page$2f$actions$2e$js__$7b$__ACTIONS_MODULE0__$3d3e$__$225b$project$5d2f$features$2f$patient$2f$booking$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$server__actions__loader$2c$__ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i('[project]/.next-internal/server/app/(patient)/patient/book/[doctorId]/page/actions.js { ACTIONS_MODULE0 => "[project]/features/patient/booking/actions.ts [app-rsc] (ecmascript)" } [app-rsc] (server actions loader, ecmascript) <locals>');
var __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$patient$2f$booking$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/features/patient/booking/actions.ts [app-rsc] (ecmascript)");
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

//# sourceMappingURL=_2e8d951a._.js.map