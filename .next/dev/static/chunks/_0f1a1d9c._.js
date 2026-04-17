(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/services/mappers.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "mapAppointment",
    ()=>mapAppointment,
    "mapAppointmentStatus",
    ()=>mapAppointmentStatus,
    "mapAppointmentStatusForRequest",
    ()=>mapAppointmentStatusForRequest,
    "mapConsultationType",
    ()=>mapConsultationType,
    "mapConsultationTypeForRequest",
    ()=>mapConsultationTypeForRequest,
    "mapConversation",
    ()=>mapConversation,
    "mapDoctorFromDetail",
    ()=>mapDoctorFromDetail,
    "mapDoctorFromList",
    ()=>mapDoctorFromList,
    "mapLabResult",
    ()=>mapLabResult,
    "mapMedicalCertificate",
    ()=>mapMedicalCertificate,
    "mapMedicine",
    ()=>mapMedicine,
    "mapMessage",
    ()=>mapMessage,
    "mapNotification",
    ()=>mapNotification,
    "mapPatientFromDetail",
    ()=>mapPatientFromDetail,
    "mapPrescription",
    ()=>mapPrescription,
    "mapReview",
    ()=>mapReview
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
const nowIso = ()=>new Date().toISOString();
const toStr = (v)=>v === null || v === undefined ? "" : String(v);
const toNum = (v)=>v === null || v === undefined || v === "" ? 0 : Number(v);
const toAbsUrl = (url)=>{
    if (!url) return "";
    if (url.startsWith("http")) {
        // Convert absolute backend media URLs to relative so they go through Next.js proxy
        try {
            const u = new URL(url);
            if (u.pathname.startsWith("/media/")) return u.pathname;
        } catch  {
        // fall through
        }
        return url;
    }
    const base = ("TURBOPACK compile-time value", "http://127.0.0.1:8000") ?? "";
    return `${base}${url}`;
};
const mapAppointmentStatus = (status)=>{
    if (status === "in_progress") return "in-progress";
    if (status === "no_show") return "no-show";
    return status || "pending";
};
const mapAppointmentStatusForRequest = (status)=>{
    if (!status) return status;
    if (status === "in-progress") return "in_progress";
    if (status === "no-show") return "no_show";
    return status;
};
const mapConsultationType = (t)=>{
    if (t === "in_clinic") return "in-clinic";
    if (t === "on_demand") return "online";
    return t || "online";
};
const mapConsultationTypeForRequest = (t)=>{
    if (!t) return t;
    if (t === "in-clinic") return "in_clinic";
    if (t === "on-demand") return "on_demand";
    return t;
};
const buildDoctor = (data)=>{
    const profileId = data?.id ?? data?.profile_id ?? data?.doctor_profile_id;
    const userId = data?.user_id ?? data?.userId ?? data?.doctor_id ?? data?.doctor;
    const hospitals = Array.isArray(data?.hospitals) ? data.hospitals : [];
    const services = Array.isArray(data?.services) ? data.services : [];
    const hmos = Array.isArray(data?.hmos) ? data.hmos : [];
    const hospitalName = data?.clinic_name ?? data?.clinicName ?? hospitals[0]?.name ?? "";
    return {
        id: toStr(profileId || userId),
        userId: userId ? toStr(userId) : undefined,
        email: data?.email ?? "",
        name: data?.full_name ?? data?.fullName ?? data?.name ?? "",
        role: "doctor",
        avatar: toAbsUrl(data?.profile_photo ?? data?.profilePhoto ?? data?.avatar),
        phone: data?.phone ?? undefined,
        createdAt: data?.created_at ?? data?.createdAt ?? nowIso(),
        specialty: data?.specialty ?? "",
        specialties: data?.sub_specialties ?? data?.subSpecialties ?? [],
        hospital: hospitalName,
        location: data?.city ?? data?.location ?? "",
        experience: toNum(data?.years_of_experience ?? data?.yearsOfExperience ?? data?.experience),
        consultationFee: toNum(data?.consultation_fee_in_person ?? data?.consultationFeeInPerson ?? data?.consultationFee),
        onlineConsultationFee: toNum(data?.consultation_fee_online ?? data?.consultationFeeOnline ?? data?.onlineConsultationFee),
        rating: toNum(data?.avg_rating ?? data?.rating),
        reviewCount: toNum(data?.review_count ?? data?.reviewCount),
        bio: data?.bio ?? "",
        education: data?.education ?? [],
        languages: data?.languages_spoken ?? data?.languages ?? [],
        isVerified: Boolean(data?.is_verified ?? data?.isVerified),
        /**
     * isInstantAvailable — ONLY true when backend returns is_available_now: true.
     * This means the doctor has on-demand mode on AND pinged within ~10-15 min.
     * Never falls back to is_verified. Offline verified doctors → false.
     */ isInstantAvailable: Boolean(data?.is_available_now ?? data?.isAvailableNow ?? false),
        /**
     * isBookable — true for all verified doctors regardless of online status.
     * Gates the "Book Appointment" button for scheduled consultations.
     */ isBookable: Boolean(data?.is_verified ?? data?.isVerified ?? false),
        // acceptsOnline: backend-computed (schedule + fee), fallback to fee > 0
        acceptsOnline: data?.accepts_online !== undefined ? Boolean(data.accepts_online) : toNum(data?.consultation_fee_online ?? data?.consultationFeeOnline ?? data?.onlineConsultationFee) > 0,
        // acceptsInClinic: backend-computed (schedule + fee), fallback to fee > 0
        acceptsInClinic: data?.accepts_in_clinic !== undefined ? Boolean(data.accepts_in_clinic) : toNum(data?.consultation_fee_in_person ?? data?.consultationFeeInPerson ?? data?.consultationFee) > 0,
        // Deprecated alias kept so existing code referencing isAvailable still compiles.
        isAvailable: Boolean(data?.is_available_now ?? data?.isAvailableNow ?? false),
        isOnDemand: Boolean(data?.is_on_demand ?? data?.isOnDemand),
        availableSlots: data?.availableSlots ?? [],
        hmoAccepted: hmos.map((h)=>h?.name).filter(Boolean),
        services: services.map((s)=>s?.name).filter(Boolean),
        clinicAddress: data?.clinic_address ?? data?.clinicAddress,
        weeklySchedule: data?.weekly_schedule ?? data?.weeklySchedule,
        clinicLat: data?.clinic_lat != null ? Number(data.clinic_lat) : undefined,
        clinicLng: data?.clinic_lng != null ? Number(data.clinic_lng) : undefined,
        signature: data?.signature ?? undefined
    };
};
const buildPatient = (data)=>{
    const id = data?.id ?? data?.patient_id ?? data?.patient;
    return {
        id: toStr(id),
        email: data?.email ?? "",
        name: data?.name ?? data?.full_name ?? data?.patient_name ?? "",
        role: "patient",
        avatar: data?.avatar ?? "",
        phone: data?.phone ?? undefined,
        createdAt: data?.created_at ?? data?.createdAt ?? nowIso(),
        dateOfBirth: data?.birthdate ?? data?.dateOfBirth,
        gender: data?.gender,
        address: data?.address,
        bloodType: data?.bloodType,
        allergies: data?.allergies,
        emergencyContact: data?.emergencyContact,
        hmoProvider: data?.hmoProvider,
        hmoNumber: data?.hmoNumber,
        walletBalance: data?.walletBalance
    };
};
const mapDoctorFromList = (data)=>buildDoctor(data);
const mapPatientFromDetail = (data)=>buildPatient({
        ...data,
        name: [
            data?.first_name,
            data?.middle_name,
            data?.last_name
        ].filter(Boolean).join(" "),
        dateOfBirth: data?.birthdate
    });
const mapDoctorFromDetail = (data)=>{
    const doctor = buildDoctor(data);
    // Attach recent_reviews from the detail endpoint so the profile page
    // can use them directly without a separate reviews API call.
    if (Array.isArray(data?.recent_reviews)) {
        doctor.recentReviews = data.recent_reviews.map((r)=>({
                id: String(r.id),
                doctorId: String(data.user_id ?? data.id),
                patientId: "",
                patient: {
                    id: "",
                    email: "",
                    name: r.patient_name ?? "Patient",
                    role: "patient",
                    createdAt: r.created_at
                },
                appointmentId: String(r.appointment),
                rating: Number(r.rating),
                comment: r.comment ?? "",
                createdAt: r.created_at ?? "",
                doctorReply: r.doctor_reply ?? null,
                replyAt: r.reply_at ?? null
            }));
    }
    return doctor;
};
const mapAppointment = (data)=>{
    const patientId = toStr(data?.patient);
    const doctorId = toStr(data?.doctor);
    const doctorProfileId = data?.doctor_profile_id ? toStr(data?.doctor_profile_id) : undefined;
    const bookedForName = data?.booked_for_name || undefined;
    const bookedForRelationship = data?.booked_for_relationship || "self";
    // Extract patient profile data from patient_profile_data field
    const profileData = data?.patient_profile_data;
    const displayName = bookedForName && bookedForName.trim() ? bookedForName : profileData?.full_name || data?.patient_name || "";
    const patient = displayName ? buildPatient({
        id: patientId,
        name: displayName,
        // Use patient_profile_data fields if available, fallback to direct fields
        email: profileData?.email || data?.patient_email || data?.patient_account_email,
        phone: data?.patient_phone,
        birthdate: profileData?.date_of_birth || data?.patient_birthdate || data?.patient_date_of_birth,
        gender: profileData?.sex || data?.patient_gender,
        address: profileData?.home_address || data?.patient_address || data?.patient_home_address,
        avatar: data?.patient_avatar || data?.patient_photo
    }) : undefined;
    const doctor = data?.doctor_name ? buildDoctor({
        id: doctorProfileId ?? doctorId,
        user_id: doctorId,
        full_name: data.doctor_name,
        specialty: data?.doctor_specialty,
        profile_photo: data?.doctor_avatar ?? data?.doctor_photo
    }) : undefined;
    return {
        id: toStr(data?.id),
        patientId,
        doctorId,
        doctorProfileId,
        patient,
        doctor,
        date: data?.date ?? "",
        time: data?.time ?? "",
        type: mapConsultationType(data?.type),
        status: mapAppointmentStatus(data?.status),
        queueNumber: data?.queue_number ?? undefined,
        queuePosition: data?.queue_position ?? undefined,
        estimatedWaitMinutes: data?.estimated_wait_minutes ?? undefined,
        paymentStatus: data?.payment_status ?? undefined,
        paymentDisplayNote: data?.payment_display_note ?? undefined,
        paymongoPaymentId: data?.paymongo_payment_id ?? undefined,
        symptoms: data?.symptoms ?? undefined,
        notes: data?.notes ?? undefined,
        fee: data?.effective_fee ?? data?.fee ? toNum(data?.effective_fee ?? data?.fee) : undefined,
        hmoUsed: data?.hmo_provider ? true : undefined,
        videoRoomUrl: data?.video_room_url ?? undefined,
        videoPassword: data?.video_password ?? undefined,
        videoStartedAt: data?.video_started_at ?? undefined,
        videoEndedAt: data?.video_ended_at ?? undefined,
        consultTranscript: data?.consult_transcript ?? undefined,
        consultNotes: data?.consult_notes ?? undefined,
        consultSummary: data?.consult_summary ?? undefined,
        clinicInfo: data?.clinic_info ?? undefined,
        sharedDocuments: Array.isArray(data?.shared_documents) ? data.shared_documents.map((d)=>({
                id: d?.id,
                docType: d?.doc_type,
                documentId: d?.document_id,
                title: d?.title ?? undefined,
                summary: d?.summary ?? undefined,
                createdAt: d?.created_at ?? undefined,
                createdBy: d?.created_by_name ?? undefined
            })) : undefined,
        // booked-for-other fields (NowServing pattern)
        bookedForName: bookedForName,
        bookedForAge: profileData?.age ?? data?.booked_for_age ?? undefined,
        bookedForGender: profileData?.sex || data?.booked_for_gender || undefined,
        bookedForRelationship: bookedForRelationship || undefined,
        familyMember: data?.family_member ?? undefined,
        // Review attached to this appointment (NowServing pattern)
        review: data?.review ? mapReview(data.review) : undefined,
        createdAt: data?.created_at ?? nowIso(),
        updatedAt: data?.updated_at ?? data?.created_at ?? nowIso()
    };
};
const mapMessage = (data, ctx)=>{
    // sender can be an integer PK (WS/REST) or sender_id — normalise to string
    const senderId = toStr(data?.sender_id ?? data?.sender);
    let senderRole = data?.sender_role;
    if (!senderRole && ctx?.patientId && ctx?.doctorId) {
        senderRole = senderId === String(ctx.patientId) ? "patient" : "doctor";
    }
    const fileName = data?.file_name ?? data?.fileName;
    const contentFallback = !data?.content && fileName ? `📎 ${fileName}` : data?.content ?? "";
    // msg_type is the WS field name; type is the REST/serializer field name.
    // Never let the WS envelope type ("chat.message") bleed in here — callers
    // must strip the envelope before calling mapMessage.
    const msgType = data?.msg_type ?? data?.type ?? "text";
    return {
        id: toStr(data?.id),
        conversationId: toStr(data?.conversation ?? ctx?.conversationId),
        senderId,
        senderRole: senderRole || "patient",
        content: contentFallback,
        type: msgType,
        isRead: Boolean(data?.is_read ?? data?.isRead),
        readAt: data?.read_at ?? data?.readAt ?? null,
        timestamp: data?.timestamp ?? nowIso(),
        fileName: fileName ?? undefined,
        fileUrl: data?.file_url ?? data?.fileUrl ?? undefined,
        fileSize: data?.file_size ?? data?.fileSize ?? undefined
    };
};
const mapConversation = (data)=>{
    const patientId = toStr(data?.patient);
    const doctorId = toStr(data?.doctor);
    const lastMessage = data?.last_message ? mapMessage(data.last_message, {
        conversationId: toStr(data?.id),
        patientId,
        doctorId
    }) : undefined;
    return {
        id: toStr(data?.id),
        participants: [
            patientId,
            doctorId
        ].filter(Boolean),
        patientId,
        doctorId,
        patient: data?.patient_name ? buildPatient({
            id: patientId,
            name: data.patient_name,
            avatar: data?.patient_avatar ?? ''
        }) : undefined,
        doctor: data?.doctor_name ? buildDoctor({
            user_id: doctorId,
            full_name: data.doctor_name,
            specialty: data?.doctor_specialty,
            profile_photo: data?.doctor_avatar ?? data?.doctor_photo
        }) : undefined,
        lastMessage,
        unreadCount: toNum(data?.unread_count ?? data?.unreadCount),
        createdAt: data?.created_at ?? nowIso(),
        updatedAt: data?.updated_at ?? nowIso()
    };
};
const mapNotificationType = (t)=>{
    if (!t) return "system";
    return t.replace(/_/g, "-");
};
const mapNotification = (data)=>({
        id: toStr(data?.id),
        userId: toStr(data?.user ?? data?.user_id),
        type: mapNotificationType(data?.type),
        title: data?.title ?? "",
        message: data?.message ?? "",
        isRead: Boolean(data?.is_read ?? data?.isRead),
        data: data?.data ?? undefined,
        createdAt: data?.created_at ?? nowIso()
    });
const mapPrescription = (data)=>({
        id: toStr(data?.id),
        appointmentId: toStr(data?.appointment),
        patientId: toStr(data?.patient),
        doctorId: toStr(data?.doctor),
        doctor: data?.doctor_name ? buildDoctor({
            user_id: data?.doctor,
            full_name: data.doctor_name
        }) : undefined,
        date: data?.date ?? "",
        diagnosis: data?.diagnosis ?? "",
        medications: data?.medications ?? [],
        instructions: data?.instructions ?? "",
        validUntil: data?.valid_until ?? data?.validUntil ?? "",
        isDigital: Boolean(data?.is_digital ?? data?.isDigital),
        // Keep as full absolute URL — do NOT pass through toAbsUrl which strips to /media/...
        // The blob-fetch download needs the full http://backend/media/... URL
        pdfUrl: data?.pdf_url ?? undefined
    });
const mapLabResult = (data)=>({
        id: toStr(data?.id),
        patientId: toStr(data?.patient),
        doctorId: toStr(data?.doctor),
        doctor: data?.doctor_name ? buildDoctor({
            user_id: data?.doctor,
            full_name: data.doctor_name
        }) : undefined,
        appointmentId: data?.appointment ? toStr(data?.appointment) : undefined,
        testName: data?.test_name ?? data?.testName ?? "",
        testType: data?.test_type ?? data?.testType ?? "",
        date: data?.date ?? "",
        status: data?.status ?? "pending",
        results: data?.results ?? undefined,
        notes: data?.notes ?? undefined,
        fileUrl: data?.file_url ?? data?.fileUrl ?? undefined,
        laboratory: data?.laboratory ?? undefined
    });
const mapMedicalCertificate = (data)=>({
        id: toStr(data?.id),
        patientId: toStr(data?.patient),
        doctorId: toStr(data?.doctor),
        doctor: data?.doctor_name ? buildDoctor({
            user_id: data?.doctor,
            full_name: data.doctor_name
        }) : undefined,
        date: data?.date ?? "",
        purpose: data?.purpose ?? "",
        diagnosis: data?.diagnosis ?? "",
        restDays: toNum(data?.rest_days ?? data?.restDays),
        validFrom: data?.valid_from ?? data?.validFrom ?? "",
        validUntil: data?.valid_until ?? data?.validUntil ?? "",
        pdfUrl: data?.pdf_url ?? undefined
    });
const mapReview = (data)=>({
        id: toStr(data?.id),
        doctorId: toStr(data?.doctor),
        patientId: toStr(data?.patient),
        patient: data?.patient_name ? buildPatient({
            id: data?.patient,
            name: data.patient_name
        }) : undefined,
        appointmentId: toStr(data?.appointment),
        rating: toNum(data?.rating),
        comment: data?.comment ?? "",
        createdAt: data?.created_at ?? nowIso(),
        doctorReply: data?.doctor_reply ?? null,
        replyAt: data?.reply_at ?? null
    });
const mapMedicine = (data)=>({
        id: toStr(data?.id),
        name: data?.name ?? "",
        genericName: data?.generic_name ?? data?.genericName ?? "",
        category: data?.category ?? "",
        price: toNum(data?.price),
        description: data?.description ?? "",
        dosageForm: data?.dosage_form ?? data?.dosageForm ?? "",
        manufacturer: data?.manufacturer ?? "",
        requiresPrescription: Boolean(data?.requires_prescription ?? data?.requiresPrescription),
        inStock: Boolean(data?.in_stock ?? data?.inStock),
        quantity: toNum(data?.quantity),
        image: data?.image_url ?? data?.image ?? undefined,
        pharmacyPartner: data?.pharmacy_partner ?? data?.pharmacyPartner ?? undefined
    });
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/services/notificationService.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "notificationService",
    ()=>notificationService
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/api.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$mappers$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/mappers.ts [app-client] (ecmascript)");
;
;
const notificationService = {
    async getNotifications (_userId) {
        const data = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"].get(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["API_ENDPOINTS"].NOTIFICATIONS);
        return {
            data: data.map(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$mappers$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mapNotification"]),
            success: true
        };
    },
    async markAsRead (notificationId) {
        await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"].post(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["API_ENDPOINTS"].NOTIFICATION_READ(notificationId), {});
        return {
            data: undefined,
            success: true
        };
    },
    async markAllAsRead (_userId) {
        await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"].post(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["API_ENDPOINTS"].NOTIFICATIONS_READ_ALL, {});
        return {
            data: undefined,
            success: true
        };
    },
    async getUnreadCount (_userId) {
        const res = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"].get(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["API_ENDPOINTS"].NOTIFICATIONS_UNREAD);
        return {
            data: res.unread_count,
            success: true
        };
    },
    // kept for compatibility — notifications are created server-side
    async createNotification (_data) {
        return {
            data: null,
            success: false,
            error: "Use server-side notification creation."
        };
    },
    async deleteNotification (notificationId) {
        await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"].delete(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["API_ENDPOINTS"].NOTIFICATION_DELETE(notificationId));
        return {
            data: undefined,
            success: true
        };
    }
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/store/incomingCallStore.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useIncomingCallStore",
    ()=>useIncomingCallStore
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$react$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/zustand/esm/react.mjs [app-client] (ecmascript)");
;
const useIncomingCallStore = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$react$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["create"])((set)=>({
        call: null,
        setCall: (call)=>set({
                call
            }),
        clearCall: ()=>set({
                call: null
            })
    }));
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/hooks/useNotifications.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useNotifications",
    ()=>useNotifications
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/api.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/store/index.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$notificationService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/notificationService.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$incomingCallStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/store/incomingCallStore.ts [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
function useNotifications() {
    _s();
    const user = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuthStore"])({
        "useNotifications.useAuthStore[user]": (s)=>s.user
    }["useNotifications.useAuthStore[user]"]);
    const { addNotification, setNotifications } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useNotificationStore"])();
    const { setCall } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$incomingCallStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useIncomingCallStore"])();
    const wsRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const retryRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(0);
    const shouldReconnectRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(true);
    const reconnectTimerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useNotifications.useEffect": ()=>{
            if (!user) return;
            const base = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getBaseUrl"])();
            if (!base) return;
            const wsUrl = base.replace(/^http/, "ws").replace(/\/$/, "") + "/ws/notifications/";
            shouldReconnectRef.current = true;
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$notificationService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["notificationService"].getNotifications(String(user.id)).then({
                "useNotifications.useEffect": (res)=>{
                    if (res.success && res.data) setNotifications(res.data);
                }
            }["useNotifications.useEffect"]);
            const connect = {
                "useNotifications.useEffect.connect": ()=>{
                    const ws = new WebSocket(wsUrl);
                    wsRef.current = ws;
                    ws.onopen = ({
                        "useNotifications.useEffect.connect": ()=>{
                            retryRef.current = 0;
                        }
                    })["useNotifications.useEffect.connect"];
                    ws.onmessage = ({
                        "useNotifications.useEffect.connect": (event)=>{
                            try {
                                const payload = JSON.parse(event.data);
                                if (payload.type !== "notification") return;
                                const notif = {
                                    id: String(payload.id),
                                    userId: user.id,
                                    type: payload.notif_type,
                                    title: payload.title,
                                    message: payload.message,
                                    isRead: false,
                                    data: payload.data ?? {},
                                    createdAt: payload.created_at
                                };
                                addNotification(notif);
                                // Show incoming call overlay when doctor starts video
                                const data = payload.data ?? {};
                                if (payload.notif_type === "appointment" && data.room_name && data.appointment_id) {
                                    // Extract doctor name from message: "Dr. X has started your video consultation..."
                                    const match = payload.message?.match(/^(Dr\.\s[^\s]+(?:\s[^\s]+)?)/);
                                    const doctorName = match ? match[1] : "Your Doctor";
                                    setCall({
                                        appointmentId: String(data.appointment_id),
                                        doctorName,
                                        doctorSpecialty: "",
                                        doctorAvatar: undefined
                                    });
                                }
                            } catch  {
                            // ignore malformed frames
                            }
                        }
                    })["useNotifications.useEffect.connect"];
                    ws.onclose = ({
                        "useNotifications.useEffect.connect": (event)=>{
                            if (shouldReconnectRef.current && retryRef.current < 5 && event.code !== 1000 && event.code !== 1001 && event.code !== 4001) {
                                const delay = Math.min(30000, 1000 * 2 ** retryRef.current);
                                retryRef.current += 1;
                                reconnectTimerRef.current = setTimeout(connect, delay);
                            }
                        }
                    })["useNotifications.useEffect.connect"];
                    ws.onerror = ({
                        "useNotifications.useEffect.connect": ()=>{
                            ws.close();
                        }
                    })["useNotifications.useEffect.connect"];
                }
            }["useNotifications.useEffect.connect"];
            connect();
            return ({
                "useNotifications.useEffect": ()=>{
                    shouldReconnectRef.current = false;
                    clearTimeout(reconnectTimerRef.current);
                    wsRef.current?.close();
                    wsRef.current = null;
                }
            })["useNotifications.useEffect"];
        }
    }["useNotifications.useEffect"], [
        user?.id
    ]); // eslint-disable-line react-hooks/exhaustive-deps
}
_s(useNotifications, "AIm06dt+CIPiiJgPywab31kVq+A=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuthStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useNotificationStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$incomingCallStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useIncomingCallStore"]
    ];
});
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/ui/page-loader.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PageLoader",
    ()=>PageLoader
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
;
function PageLoader() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "fixed inset-0 z-50 flex items-center justify-center bg-background",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "h-12 w-12 rounded-full border-4 border-primary/20 border-t-primary animate-spin"
        }, void 0, false, {
            fileName: "[project]/src/components/ui/page-loader.tsx",
            lineNumber: 4,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/ui/page-loader.tsx",
        lineNumber: 3,
        columnNumber: 5
    }, this);
}
_c = PageLoader;
var _c;
__turbopack_context__.k.register(_c, "PageLoader");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/ui/avatar.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Avatar",
    ()=>Avatar,
    "AvatarFallback",
    ()=>AvatarFallback,
    "AvatarImage",
    ()=>AvatarImage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$avatar$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@radix-ui/react-avatar/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-client] (ecmascript)");
;
;
;
;
const Avatar = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"](_c = ({ className, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$avatar$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Root"], {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/avatar.tsx",
        lineNumber: 10,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0)));
_c1 = Avatar;
Avatar.displayName = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$avatar$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Root"].displayName;
const AvatarImage = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"](_c2 = ({ className, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$avatar$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Image"], {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("aspect-square h-full w-full", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/avatar.tsx",
        lineNumber: 22,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0)));
_c3 = AvatarImage;
AvatarImage.displayName = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$avatar$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Image"].displayName;
const AvatarFallback = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"](_c4 = ({ className, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$avatar$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fallback"], {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("flex h-full w-full items-center justify-center rounded-full bg-muted", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/avatar.tsx",
        lineNumber: 30,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0)));
_c5 = AvatarFallback;
AvatarFallback.displayName = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$avatar$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fallback"].displayName;
;
var _c, _c1, _c2, _c3, _c4, _c5;
__turbopack_context__.k.register(_c, "Avatar$React.forwardRef");
__turbopack_context__.k.register(_c1, "Avatar");
__turbopack_context__.k.register(_c2, "AvatarImage$React.forwardRef");
__turbopack_context__.k.register(_c3, "AvatarImage");
__turbopack_context__.k.register(_c4, "AvatarFallback$React.forwardRef");
__turbopack_context__.k.register(_c5, "AvatarFallback");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/ui/button.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Button",
    ()=>Button,
    "buttonVariants",
    ()=>buttonVariants
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$slot$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@radix-ui/react-slot/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/class-variance-authority/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-client] (ecmascript)");
;
;
;
;
;
const buttonVariants = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cva"])("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0", {
    variants: {
        variant: {
            default: "bg-primary text-primary-foreground hover:bg-primary/90",
            destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
            outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
            secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
            ghost: "hover:bg-accent hover:text-accent-foreground",
            link: "text-primary underline-offset-4 hover:underline"
        },
        size: {
            default: "h-10 px-4 py-2",
            sm: "h-9 rounded-md px-3",
            lg: "h-11 rounded-md px-8",
            icon: "h-10 w-10"
        }
    },
    defaultVariants: {
        variant: "default",
        size: "default"
    }
});
const Button = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"](_c = ({ className, variant, size, asChild = false, ...props }, ref)=>{
    const Comp = asChild ? __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$slot$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Slot"] : "button";
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Comp, {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])(buttonVariants({
            variant,
            size,
            className
        })),
        ref: ref,
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/button.tsx",
        lineNumber: 42,
        columnNumber: 12
    }, ("TURBOPACK compile-time value", void 0));
});
_c1 = Button;
Button.displayName = "Button";
;
var _c, _c1;
__turbopack_context__.k.register(_c, "Button$React.forwardRef");
__turbopack_context__.k.register(_c1, "Button");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/patient/IncomingCallOverlay.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>IncomingCallOverlay
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/components/AnimatePresence/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$video$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Video$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/video.js [app-client] (ecmascript) <export default as Video>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$phone$2d$off$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__PhoneOff$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/phone-off.js [app-client] (ecmascript) <export default as PhoneOff>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$avatar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/avatar.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$incomingCallStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/store/incomingCallStore.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
;
function IncomingCallOverlay() {
    _s();
    const { call, clearCall } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$incomingCallStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useIncomingCallStore"])();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    // Simple ringtone via Web Audio API
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "IncomingCallOverlay.useEffect": ()=>{
            if (!call) return;
            const ctx = new AudioContext();
            let stopped = false;
            const ring = {
                "IncomingCallOverlay.useEffect.ring": ()=>{
                    if (stopped) return;
                    const osc = ctx.createOscillator();
                    const gain = ctx.createGain();
                    osc.connect(gain);
                    gain.connect(ctx.destination);
                    osc.frequency.value = 880;
                    gain.gain.setValueAtTime(0.3, ctx.currentTime);
                    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.4);
                    osc.start(ctx.currentTime);
                    osc.stop(ctx.currentTime + 0.4);
                    setTimeout(ring, 1200);
                }
            }["IncomingCallOverlay.useEffect.ring"];
            ring();
            return ({
                "IncomingCallOverlay.useEffect": ()=>{
                    stopped = true;
                    ctx.close();
                }
            })["IncomingCallOverlay.useEffect"];
        }
    }["IncomingCallOverlay.useEffect"], [
        call?.appointmentId
    ]); // eslint-disable-line react-hooks/exhaustive-deps
    const handleAccept = ()=>{
        if (!call) return;
        const id = call.appointmentId;
        clearCall();
        router.push(`/patient/teleconsult/${id}`);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimatePresence"], {
        children: call && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
            initial: {
                opacity: 0,
                y: -80
            },
            animate: {
                opacity: 1,
                y: 0
            },
            exit: {
                opacity: 0,
                y: -80
            },
            transition: {
                type: "spring",
                stiffness: 300,
                damping: 28
            },
            className: "fixed top-4 left-1/2 -translate-x-1/2 z-[9999] w-full max-w-sm px-4",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-gray-900 border border-white/10 rounded-2xl shadow-2xl p-4 flex items-center gap-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "relative shrink-0",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$avatar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Avatar"], {
                                className: "h-14 w-14 ring-2 ring-green-500/50",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$avatar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AvatarImage"], {
                                        src: call.doctorAvatar
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/patient/IncomingCallOverlay.tsx",
                                        lineNumber: 62,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$avatar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AvatarFallback"], {
                                        className: "bg-primary text-primary-foreground text-lg",
                                        children: call.doctorName.charAt(0)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/patient/IncomingCallOverlay.tsx",
                                        lineNumber: 63,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/patient/IncomingCallOverlay.tsx",
                                lineNumber: 61,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-gray-900 animate-pulse"
                            }, void 0, false, {
                                fileName: "[project]/src/components/patient/IncomingCallOverlay.tsx",
                                lineNumber: 67,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/patient/IncomingCallOverlay.tsx",
                        lineNumber: 60,
                        columnNumber: 13
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex-1 min-w-0",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-white font-semibold text-sm truncate",
                                children: call.doctorName
                            }, void 0, false, {
                                fileName: "[project]/src/components/patient/IncomingCallOverlay.tsx",
                                lineNumber: 71,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-white/50 text-xs truncate",
                                children: call.doctorSpecialty
                            }, void 0, false, {
                                fileName: "[project]/src/components/patient/IncomingCallOverlay.tsx",
                                lineNumber: 72,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-green-400 text-xs font-medium mt-0.5 animate-pulse",
                                children: "Incoming video call…"
                            }, void 0, false, {
                                fileName: "[project]/src/components/patient/IncomingCallOverlay.tsx",
                                lineNumber: 73,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/patient/IncomingCallOverlay.tsx",
                        lineNumber: 70,
                        columnNumber: 13
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex gap-2 shrink-0",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                size: "icon",
                                variant: "ghost",
                                className: "h-10 w-10 rounded-full bg-red-500/20 hover:bg-red-500/40 text-red-400",
                                onClick: clearCall,
                                title: "Decline",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$phone$2d$off$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__PhoneOff$3e$__["PhoneOff"], {
                                    className: "h-4 w-4"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/patient/IncomingCallOverlay.tsx",
                                    lineNumber: 86,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/patient/IncomingCallOverlay.tsx",
                                lineNumber: 79,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                size: "icon",
                                className: "h-10 w-10 rounded-full bg-green-500 hover:bg-green-600 text-white",
                                onClick: handleAccept,
                                title: "Accept",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$video$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Video$3e$__["Video"], {
                                    className: "h-4 w-4"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/patient/IncomingCallOverlay.tsx",
                                    lineNumber: 94,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/patient/IncomingCallOverlay.tsx",
                                lineNumber: 88,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/patient/IncomingCallOverlay.tsx",
                        lineNumber: 78,
                        columnNumber: 13
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/patient/IncomingCallOverlay.tsx",
                lineNumber: 59,
                columnNumber: 11
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/components/patient/IncomingCallOverlay.tsx",
            lineNumber: 52,
            columnNumber: 9
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/patient/IncomingCallOverlay.tsx",
        lineNumber: 50,
        columnNumber: 5
    }, this);
}
_s(IncomingCallOverlay, "CzBXiSykasaB5PpcQZO7XSIhkqQ=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$incomingCallStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useIncomingCallStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c = IncomingCallOverlay;
var _c;
__turbopack_context__.k.register(_c, "IncomingCallOverlay");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/(patient)/layout.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>PatientLayout
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/store/index.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useNotifications$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/hooks/useNotifications.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$page$2d$loader$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/page-loader.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$patient$2f$IncomingCallOverlay$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/patient/IncomingCallOverlay.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
function PatientLayout({ children }) {
    _s();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const user = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuthStore"])({
        "PatientLayout.useAuthStore[user]": (s)=>s.user
    }["PatientLayout.useAuthStore[user]"]);
    const isLoading = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuthStore"])({
        "PatientLayout.useAuthStore[isLoading]": (s)=>s.isLoading
    }["PatientLayout.useAuthStore[isLoading]"]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useNotifications$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useNotifications"])();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "PatientLayout.useEffect": ()=>{
            if (!isLoading && !user) router.replace('/signin');
        }
    }["PatientLayout.useEffect"], [
        isLoading,
        user,
        router
    ]);
    if (isLoading) return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$page$2d$loader$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PageLoader"], {}, void 0, false, {
        fileName: "[project]/app/(patient)/layout.tsx",
        lineNumber: 25,
        columnNumber: 25
    }, this);
    if (!user) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$patient$2f$IncomingCallOverlay$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                fileName: "[project]/app/(patient)/layout.tsx",
                lineNumber: 30,
                columnNumber: 7
            }, this),
            children
        ]
    }, void 0, true);
}
_s(PatientLayout, "U+WXw3NaITXyUshTWrH3DWrJnog=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuthStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuthStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useNotifications$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useNotifications"]
    ];
});
_c = PatientLayout;
var _c;
__turbopack_context__.k.register(_c, "PatientLayout");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=_0f1a1d9c._.js.map