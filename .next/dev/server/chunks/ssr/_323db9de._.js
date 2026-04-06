module.exports = [
"[project]/src/services/mappers.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
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
    "mapPrescription",
    ()=>mapPrescription,
    "mapReview",
    ()=>mapReview
]);
const nowIso = ()=>new Date().toISOString();
const toStr = (v)=>v === null || v === undefined ? "" : String(v);
const toNum = (v)=>v === null || v === undefined || v === "" ? 0 : Number(v);
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
        avatar: data?.profile_photo ?? data?.profilePhoto ?? data?.avatar ?? "",
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
        clinicLng: data?.clinic_lng != null ? Number(data.clinic_lng) : undefined
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
    const patient = data?.patient_name ? buildPatient({
        id: patientId,
        name: data.patient_name
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
        bookedForName: data?.booked_for_name || undefined,
        bookedForAge: data?.booked_for_age ?? undefined,
        bookedForGender: data?.booked_for_gender || undefined,
        bookedForRelationship: data?.booked_for_relationship || undefined,
        familyMember: data?.family_member ?? undefined,
        // Review attached to this appointment (NowServing pattern)
        review: data?.review ? mapReview(data.review) : undefined,
        createdAt: data?.created_at ?? nowIso(),
        updatedAt: data?.updated_at ?? data?.created_at ?? nowIso()
    };
};
const mapMessage = (data, ctx)=>{
    const senderId = toStr(data?.sender ?? data?.sender_id);
    let senderRole = data?.sender_role;
    if (!senderRole && ctx?.patientId && ctx?.doctorId) {
        senderRole = senderId === ctx.patientId ? "patient" : "doctor";
    }
    const fileName = data?.file_name ?? data?.fileName;
    const contentFallback = !data?.content && fileName ? `📎 ${fileName}` : data?.content ?? "";
    return {
        id: toStr(data?.id),
        conversationId: toStr(data?.conversation ?? ctx?.conversationId),
        senderId,
        senderRole: senderRole || "patient",
        content: contentFallback,
        type: data?.type ?? "text",
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
            name: data.patient_name
        }) : undefined,
        doctor: data?.doctor_name ? buildDoctor({
            user_id: doctorId,
            full_name: data.doctor_name
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
        isDigital: Boolean(data?.is_digital ?? data?.isDigital)
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
        validUntil: data?.valid_until ?? data?.validUntil ?? ""
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
}),
"[project]/src/services/appointmentService.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "appointmentService",
    ()=>appointmentService
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/api.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$mappers$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/mappers.ts [app-ssr] (ecmascript)");
;
;
const unwrapList = (data)=>Array.isArray(data) ? data : data.results ?? [];
const appointmentService = {
    async getAppointments (filters, _page = 1, _limit = 10) {
        const params = new URLSearchParams();
        if (filters?.status) params.set("status", (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$mappers$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mapAppointmentStatusForRequest"])(filters.status) ?? filters.status);
        if (filters?.type) params.set("type", (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$mappers$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mapConsultationTypeForRequest"])(filters.type) ?? filters.type);
        if (filters?.date) params.set("date", filters.date);
        if (filters?.doctorId) params.set("doctor", String(filters.doctorId));
        const query = params.toString() ? `?${params}` : "";
        const raw = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["api"].get(`${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["API_ENDPOINTS"].APPOINTMENTS}${query}`);
        let list = unwrapList(raw).map(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$mappers$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mapAppointment"]);
        if (filters?.patientId) {
            list = list.filter((apt)=>apt.patientId === String(filters.patientId));
        }
        return {
            data: list,
            success: true,
            page: 1,
            limit: list.length,
            total: list.length,
            totalPages: 1
        };
    },
    async getAppointmentById (id) {
        const data = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["api"].get(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["API_ENDPOINTS"].APPOINTMENT_DETAIL(id));
        return {
            data: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$mappers$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mapAppointment"])(data),
            success: true
        };
    },
    async createAppointment (data) {
        const result = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["api"].post(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["API_ENDPOINTS"].APPOINTMENTS, {
            doctor_id: Number(data.doctorId),
            date: data.date,
            time: data.time,
            type: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$mappers$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mapConsultationTypeForRequest"])(data.type),
            symptoms: data.symptoms,
            ...data.paymongoPaymentId && {
                paymongo_payment_id: data.paymongoPaymentId
            },
            // booked-for-other fields — only sent when booking for someone else
            ...data.familyMemberId != null && {
                family_member_id: data.familyMemberId
            },
            ...data.bookedForName && {
                booked_for_name: data.bookedForName
            },
            ...data.bookedForAge != null && {
                booked_for_age: data.bookedForAge
            },
            ...data.bookedForGender && {
                booked_for_gender: data.bookedForGender
            },
            ...data.bookedForRelationship && {
                booked_for_relationship: data.bookedForRelationship
            }
        });
        return {
            data: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$mappers$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mapAppointment"])(result),
            success: true,
            message: "Appointment booked successfully"
        };
    },
    async updateAppointmentStatus (id, status, notes) {
        const payload = {};
        if (status) payload.status = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$mappers$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mapAppointmentStatusForRequest"])(status) ?? status;
        if (notes) payload.notes = notes;
        const result = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["api"].patch(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["API_ENDPOINTS"].APPOINTMENT_DETAIL(id), payload);
        return {
            data: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$mappers$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mapAppointment"])(result),
            success: true
        };
    },
    async cancelAppointment (id, reason) {
        const result = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["api"].post(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["API_ENDPOINTS"].APPOINTMENT_CANCEL(id), {
            reason: reason ?? ""
        });
        return {
            data: {
                ...(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$mappers$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mapAppointment"])(result),
                refund_issued: result.refund_issued,
                refund_note: result.refund_note,
                action_required: result.action_required
            },
            success: true
        };
    },
    async requestRefund (id, reason) {
        const result = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["api"].post(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["API_ENDPOINTS"].APPOINTMENT_REFUND(id), {
            reason: reason ?? ""
        });
        return {
            data: {
                ...(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$mappers$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mapAppointment"])(result),
                refund_issued: result.refund_issued,
                refund_note: result.refund_note
            },
            success: true
        };
    },
    async getAvailableSlots (doctorId, date) {
        const res = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["api"].get(`${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["API_ENDPOINTS"].APPOINTMENT_SLOTS(doctorId)}?date=${date}`);
        const slots = res.slots.map((s, i)=>({
                id: `slot-${date}-${s.time}`,
                date,
                startTime: s.time,
                endTime: s.time,
                isAvailable: s.is_available
            }));
        return {
            data: slots,
            success: true
        };
    },
    async getTodayQueue () {
        const data = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["api"].get(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["API_ENDPOINTS"].TODAY_QUEUE);
        return {
            data: data.map(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$mappers$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mapAppointment"]),
            success: true
        };
    },
    async acceptAppointment (id) {
        const result = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["api"].post(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["API_ENDPOINTS"].APPOINTMENT_ACCEPT(id), {});
        return {
            data: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$mappers$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mapAppointment"])(result),
            success: true
        };
    },
    async rejectAppointment (id, reason) {
        const result = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["api"].post(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["API_ENDPOINTS"].APPOINTMENT_REJECT(id), {
            rejection_reason: reason ?? ""
        });
        return {
            data: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$mappers$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mapAppointment"])(result),
            success: true
        };
    },
    async startConsult (id) {
        const result = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["api"].post(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["API_ENDPOINTS"].APPOINTMENT_START(id), {});
        return {
            data: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$mappers$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mapAppointment"])(result),
            success: true
        };
    },
    async callNext (id) {
        const result = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["api"].post(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["API_ENDPOINTS"].APPOINTMENT_CALL_NEXT(id), {});
        return {
            data: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$mappers$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mapAppointment"])(result),
            success: true
        };
    },
    async completeAppointment (id, transcriptOrMeta) {
        const payload = {};
        if (typeof transcriptOrMeta === "string") {
            if (transcriptOrMeta) payload.transcript = transcriptOrMeta;
        } else if (transcriptOrMeta) {
            if (transcriptOrMeta.transcript) payload.transcript = transcriptOrMeta.transcript;
            if (typeof transcriptOrMeta.durationSeconds === "number") {
                payload.duration_seconds = transcriptOrMeta.durationSeconds;
            }
            if (Array.isArray(transcriptOrMeta.participants)) {
                payload.participants = transcriptOrMeta.participants;
            }
            if (transcriptOrMeta.consultNotes) {
                payload.consult_notes = transcriptOrMeta.consultNotes;
            }
            if (transcriptOrMeta.consultSummary) {
                payload.consult_summary = transcriptOrMeta.consultSummary;
            }
        }
        const result = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["api"].post(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["API_ENDPOINTS"].APPOINTMENT_COMPLETE(id), payload);
        return {
            data: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$mappers$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mapAppointment"])(result),
            success: true
        };
    },
    async markNoShow (id) {
        const result = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["api"].post(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["API_ENDPOINTS"].APPOINTMENT_NO_SHOW(id), {});
        return {
            data: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$mappers$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mapAppointment"])(result),
            success: true
        };
    },
    /**
   * NowServing pattern: patient submits a star rating + optional comment
   * after a completed appointment. One review per appointment.
   * POST /appointments/<id>/review/
   */ async createReview (appointmentId, rating, comment) {
        const { mapReview } = await __turbopack_context__.A("[project]/src/services/mappers.ts [app-ssr] (ecmascript, async loader)");
        const result = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["api"].post(`/api/appointments/${appointmentId}/review/`, {
            rating,
            comment: comment ?? ""
        });
        return {
            data: mapReview(result),
            success: true,
            message: "Review submitted"
        };
    },
    /**
   * NowServing pattern: doctor publicly replies to a patient review.
   * PATCH /appointments/<id>/review/reply/
   */ async replyToReview (appointmentId, reply) {
        const { mapReview } = await __turbopack_context__.A("[project]/src/services/mappers.ts [app-ssr] (ecmascript, async loader)");
        const result = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["api"].patch(`/api/appointments/${appointmentId}/review/reply/`, {
            reply
        });
        return {
            data: mapReview(result),
            success: true
        };
    },
    async getUpcomingAppointments () {
        const data = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["api"].get(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["API_ENDPOINTS"].APPOINTMENT_UPCOMING);
        return {
            data: data.map(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$mappers$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mapAppointment"]),
            success: true
        };
    },
    async getOnDemandDoctors () {
        const data = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["api"].get(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["API_ENDPOINTS"].APPOINTMENT_ON_DEMAND);
        return {
            data: data.map(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$mappers$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mapDoctorFromList"]),
            success: true
        };
    },
    async startVideoConsult (id) {
        const res = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["api"].post(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["API_ENDPOINTS"].APPOINTMENT_START_VIDEO(id), {});
        return {
            data: {
                roomName: res.room_name,
                password: res.password,
                jitsiDomain: res.jitsi_domain,
                videoRoomUrl: res.video_room_url,
                appointment: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$mappers$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mapAppointment"])(res.appointment)
            },
            success: true
        };
    },
    /**
   * joinVideoRoom — patient calls this to get the Jitsi credentials for an
   * already-started consultation (status === in_progress).
   * Returns the same VideoConsultResult shape as startVideoConsult so the
   * patient page can use identical logic.
   *
   * NowServing pattern: patient does NOT start the room — they join an
   * existing room created by the doctor.
   */ async joinVideoRoom (id) {
        // Fetch the appointment — credentials are embedded in the detail response
        const res = await appointmentService.getAppointmentById(id);
        if (!res.success || !res.data) {
            throw new Error("Appointment not found.");
        }
        const apt = res.data;
        if (!apt.videoRoomUrl) {
            throw new Error("Video room not started yet.");
        }
        const domain = ("TURBOPACK compile-time value", "meet.jit.si") ?? "meet.jit.si";
        const roomName = apt.videoRoomUrl.split("#")[0].split("/").pop() ?? "";
        return {
            data: {
                roomName,
                password: apt.videoPassword ?? "",
                jitsiDomain: domain,
                videoRoomUrl: apt.videoRoomUrl,
                appointment: apt
            },
            success: true
        };
    },
    /**
   * endConsultation — doctor calls this to mark the appointment completed.
   * Alias for completeAppointment with a cleaner call signature.
   * Broadcasts consultation.ended via Channels so patient page closes Jitsi.
   */ async endConsultation (id, opts = {}) {
        return appointmentService.completeAppointment(id, {
            durationSeconds: opts.durationSeconds,
            participants: opts.participants,
            consultNotes: opts.consultNotes,
            consultSummary: opts.consultSummary,
            transcript: opts.transcript
        });
    },
    /**
   * NowServing alignment: called after PayMongo redirect succeeds.
   * Stores the paymongo_payment_id on the appointment, sets payment_status=paid,
   * and triggers the patient receipt email + doctor notification via Celery.
   */ async confirmPayment (id, paymongoPaymentId) {
        const result = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["api"].post(`/api/appointments/${id}/confirm_payment/`, {
            paymongo_payment_id: paymongoPaymentId
        });
        return {
            data: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$mappers$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mapAppointment"])(result),
            success: true,
            message: "Payment confirmed. Receipt sent to your email."
        };
    },
    async shareDocument (id, payload) {
        const res = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["api"].post(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["API_ENDPOINTS"].APPOINTMENT_SHARE_DOCUMENT(id), {
            doc_type: payload.docType,
            diagnosis: payload.diagnosis,
            medications: payload.medications,
            instructions: payload.instructions,
            valid_until: payload.validUntil,
            purpose: payload.purpose,
            rest_days: payload.restDays,
            valid_from: payload.validFrom,
            test_name: payload.testName,
            test_type: payload.testType,
            notes: payload.notes
        });
        return {
            data: {
                share: {
                    id: res.share.id,
                    docType: res.share.doc_type,
                    documentId: res.share.document_id,
                    title: res.share.title,
                    summary: res.share.summary,
                    createdAt: res.share.created_at
                },
                appointment: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$mappers$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mapAppointment"])(res.appointment)
            },
            success: true
        };
    }
};
}),
"[project]/src/services/chatService.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "OPTIMISTIC_PREFIX",
    ()=>OPTIMISTIC_PREFIX,
    "chatService",
    ()=>chatService,
    "createOptimisticMessage",
    ()=>createOptimisticMessage
]);
/**
 * chatService.ts
 *
 * REST client for NowServing-style 1:1 chat.
 * WebSocket real-time events are handled in ChatWindow.tsx.
 *
 * Architecture:
 *   TEXT messages  → WebSocket (instant, <100ms round-trip)
 *   FILE messages  → REST POST (multipart/form-data, then WS broadcast)
 *   READ receipts  → WebSocket primary, REST fallback
 *
 * Optimistic send flow (text messages):
 *   1. createOptimisticMessage() builds a local Message with a temp UUID id
 *   2. ChatWindow adds it to the store immediately (input clears at this point)
 *   3. WS send fires — backend persists and broadcasts to both sides
 *   4. Both sides receive chat.message with the real DB id + temp_id
 *   5. reconcileOptimistic() in the store swaps the temp bubble for the real one
 *   6. On WS error → rollback removes the temp bubble and shows a toast
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/api.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$mappers$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/mappers.ts [app-ssr] (ecmascript)");
;
;
const OPTIMISTIC_PREFIX = "optimistic_";
function createOptimisticMessage(conversationId, senderId, senderRole, content, type = "text") {
    const tempId = `${OPTIMISTIC_PREFIX}${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
    return {
        id: tempId,
        conversationId,
        senderId,
        senderRole,
        content,
        type,
        isRead: false,
        readAt: null,
        // Use current time so the bubble appears in the right position
        timestamp: new Date().toISOString()
    };
}
const chatService = {
    async getConversations (_userId) {
        try {
            const data = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["api"].get(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["API_ENDPOINTS"].CONVERSATIONS);
            const mapped = data.map(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$mappers$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mapConversation"]).sort((a, b)=>new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
            return {
                data: mapped,
                success: true
            };
        } catch  {
            return {
                data: [],
                success: false,
                message: 'Backend unavailable'
            };
        }
    },
    async getConversationById (conversationId) {
        const all = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["api"].get(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["API_ENDPOINTS"].CONVERSATIONS);
        const conv = all.map(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$mappers$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mapConversation"]).find((c)=>String(c.id) === String(conversationId));
        if (!conv) throw new Error("Conversation not found");
        return {
            data: conv,
            success: true
        };
    },
    /**
   * Fetch messages — limited to 50 most recent.
   * Pass beforeId to paginate older messages (infinite scroll upward).
   * GET /chat/<convId>/messages/?before=<beforeId>
   */ async getMessages (conversationId, beforeId) {
        try {
            const query = beforeId ? `?before=${beforeId}` : "";
            const data = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["api"].get(`${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["API_ENDPOINTS"].MESSAGES(conversationId)}${query}`);
            return {
                data: data.map((m)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$mappers$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mapMessage"])(m, {
                        conversationId
                    })),
                success: true
            };
        } catch  {
            return {
                data: [],
                success: false,
                message: 'Backend unavailable'
            };
        }
    },
    /**
   * Send a message via REST.
   *
   * TEXT messages should go over WebSocket for instant delivery.
   * This REST path is the fallback for:
   *   - File/image uploads (multipart)
   *   - WS not connected (background tab, reconnecting)
   *
   * The caller is responsible for clearing the input BEFORE calling this
   * (optimistic clear pattern) and rolling back on error.
   *
   * tempId (optional) is included for forward compatibility so the backend
   * can echo it back when it supports REST-based optimistic reconciliation.
   */ async sendMessage (conversationId, _senderId, _senderRole, content, type = "text", file, tempId) {
        let result;
        if (file) {
            const form = new FormData();
            form.append("content", content);
            form.append("type", type);
            if (tempId) form.append("temp_id", tempId);
            form.append("file", file);
            const res = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["api"].upload(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["API_ENDPOINTS"].MESSAGES(conversationId), form);
            result = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$mappers$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mapMessage"])(res, {
                conversationId
            });
        } else {
            const payload = {
                content,
                type
            };
            if (tempId) payload.temp_id = tempId;
            const res = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["api"].post(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["API_ENDPOINTS"].MESSAGES(conversationId), payload);
            result = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$mappers$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mapMessage"])(res, {
                conversationId
            });
        }
        return {
            data: result,
            success: true,
            message: "Message sent"
        };
    },
    /**
   * Start or retrieve a 1:1 conversation between a patient and a doctor.
   *
   * NowServing alignment: both roles can initiate.
   * - Patient calls this → sends { doctor_id } to the backend.
   * - Doctor calls this  → sends { patient_id } to the backend.
   *
   * The backend uses get_or_create so duplicate conversations are never created.
   * We also do a local GET-first check to avoid an unnecessary POST round-trip
   * when the conversation already exists in the user's list.
   *
   * @param patientId  ID of the patient participant
   * @param doctorId   ID of the doctor participant
   * @param callerRole Role of the user making this call ('patient' | 'doctor').
   *                   Defaults to 'patient' for backward compatibility.
   */ async createConversation (patientId, doctorId, callerRole = 'patient') {
        // 1. Check local conversation list first — avoids a redundant POST
        try {
            const all = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["api"].get(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["API_ENDPOINTS"].CONVERSATIONS);
            const existing = all.map(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$mappers$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mapConversation"]).find((c)=>String(c.patientId) === String(patientId) && String(c.doctorId) === String(doctorId));
            if (existing) return {
                data: existing,
                success: true
            };
        } catch  {
        // GET failed (network, auth) — fall through and let POST handle it
        }
        // 2. POST to create (or get_or_create on the backend)
        //    Backend expects the *other* party's ID, keyed by the caller's role.
        const body = callerRole === 'doctor' ? {
            patient_id: Number(patientId)
        } // doctor initiates → send patient_id
         : {
            doctor_id: Number(doctorId)
        }; // patient/admin initiates → send doctor_id
        const data = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["api"].post(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["API_ENDPOINTS"].CONVERSATIONS, body);
        return {
            data: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$mappers$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mapConversation"])(data),
            success: true
        };
    },
    /**
   * Mark a single message as read via REST.
   * Primary path is WS { type: "chat.read", message_id: X }.
   * This is the fallback when WS is not connected.
   */ async markMessageRead (messageId) {
        try {
            await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["api"].post(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["API_ENDPOINTS"].MESSAGE_READ(messageId), {});
        } catch (err) {
        // Non-critical — WS mark_read is the primary path
        }
        return {
            data: undefined,
            success: true
        };
    },
    /**
   * Mark all messages in a conversation as read (REST fallback).
   * Primary path is WS { type: "chat.read_all" }.
   */ async markAsRead (conversationId, _userId) {
        try {
            await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["api"].post(`/api/chat/${conversationId}/read_all/`, {});
        } catch (err) {
        // Ignore — best effort, WS chat.read_all is the primary path
        }
        return {
            data: undefined,
            success: true
        };
    },
    /** Total unread count across all conversations — used for the sidebar badge. */ async getTotalUnread (_userId) {
        const all = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["api"].get(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["API_ENDPOINTS"].CONVERSATIONS);
        const count = all.reduce((sum, c)=>sum + (c?.unread_count ?? 0), 0);
        return {
            data: count,
            success: true
        };
    },
    // Kept for backward compat
    async getUnreadCount (userId) {
        return this.getTotalUnread(userId);
    }
};
}),
"[project]/src/services/doctorService.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "doctorService",
    ()=>doctorService
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/api.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$mappers$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/mappers.ts [app-ssr] (ecmascript)");
;
;
const doctorService = {
    async getDoctors (filters, _page = 1, _limit = 10) {
        if (filters?.isAvailable) {
            const data = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["api"].get(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["API_ENDPOINTS"].DOCTOR_AVAILABLE);
            const mapped = data.map(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$mappers$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mapDoctorFromList"]);
            return {
                data: mapped,
                success: true,
                page: 1,
                limit: mapped.length,
                total: mapped.length,
                totalPages: 1
            };
        }
        const params = new URLSearchParams();
        if (filters?.specialty) params.set("specialty", filters.specialty);
        if (filters?.name) params.set("search", filters.name);
        if (filters?.clinic) params.set("hospital", filters.clinic);
        if (filters?.location) params.set("city", filters.location);
        if (filters?.maxFee) {
            params.set("fee_online_lte", String(filters.maxFee));
            params.set("fee_inperson_lte", String(filters.maxFee));
        }
        const query = params.toString() ? `?${params}` : "";
        try {
            const data = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["api"].get(`${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["API_ENDPOINTS"].DOCTORS}${query}`);
            const mapped = data.map(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$mappers$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mapDoctorFromList"]);
            return {
                data: mapped,
                success: true,
                page: 1,
                limit: mapped.length,
                total: mapped.length,
                totalPages: 1
            };
        } catch  {
            return {
                data: [],
                success: false,
                page: 1,
                limit: 0,
                total: 0,
                totalPages: 1
            };
        }
    },
    async getDoctorById (id) {
        try {
            const data = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["api"].get(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["API_ENDPOINTS"].DOCTOR_DETAIL(id));
            return {
                data: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$mappers$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mapDoctorFromDetail"])(data),
                success: true
            };
        } catch  {
            return {
                data: null,
                success: false
            };
        }
    },
    async getTopDoctors (limit = 5) {
        const res = await this.getDoctors(undefined, 1, limit);
        return {
            data: res.data.slice(0, limit),
            success: true
        };
    },
    async getDoctorsBySpecialty (specialty) {
        const res = await this.getDoctors({
            specialty
        });
        return {
            data: res.data,
            success: true
        };
    },
    /**
   * Fetch 30-min availability slots for a doctor on a specific date.
   * Calls GET /appointments/slots/<doctorId>?date=YYYY-MM-DD
   * Priority: explicit DoctorAvailableSlot rows > weekly_schedule auto-gen.
   * Booked slots have is_available=false and is_booked=true.
   */ async getDoctorSlots (doctorId, date) {
        try {
            const data = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["api"].get(`${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["API_ENDPOINTS"].APPOINTMENT_SLOTS(doctorId)}?date=${date}`);
            return {
                data,
                success: true
            };
        } catch  {
            return {
                data: null,
                success: false
            };
        }
    },
    async updateOnDemand (id, isOnDemand) {
        try {
            const data = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["api"].patch(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["API_ENDPOINTS"].DOCTOR_DETAIL(id), {
                is_on_demand: isOnDemand
            });
            return {
                data: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$mappers$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mapDoctorFromDetail"])(data),
                success: true
            };
        } catch (error) {
            // If caller passed a user id instead of profile id, resolve via list
            if (error instanceof __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ApiError"] && error.status === 404) {
                try {
                    const list = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["api"].get(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["API_ENDPOINTS"].DOCTORS);
                    const match = list.find((d)=>String(d.user_id) === String(id));
                    if (match) {
                        const data = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["api"].patch(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["API_ENDPOINTS"].DOCTOR_DETAIL(match.id), {
                            is_on_demand: isOnDemand
                        });
                        return {
                            data: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$mappers$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mapDoctorFromDetail"])(data),
                            success: true
                        };
                    }
                } catch  {
                // fall through
                }
            }
            return {
                data: null,
                success: false
            };
        }
    },
    async getEarnings () {
        try {
            const data = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["api"].get(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["API_ENDPOINTS"].DOCTOR_EARNINGS);
            return {
                data: {
                    consultsToday: data.consults_today,
                    consultsWeek: data.consults_week,
                    revenueToday: data.revenue_today,
                    revenueWeek: data.revenue_week,
                    pendingPayouts: data.pending_payouts,
                    pendingAmount: data.pending_amount
                },
                success: true
            };
        } catch  {
            return {
                data: null,
                success: false
            };
        }
    },
    /**
   * PATCH /api/doctors/me/complete/
   *
   * Doctor onboarding wizard — save partial data per step.
   * Supports multipart (profile_photo upload) via FormData.
   * Final step: send { is_profile_complete: true } to unlock dashboard.
   *
   * NowServing.ph / SeriousMD pattern: doctors must complete clinic info,
   * fees, and schedule before appearing in patient search results.
   */ async completeDoctorProfile (data) {
        try {
            let res;
            if (data.profile_photo instanceof File) {
                // Use multipart when a photo file is included
                const form = new FormData();
                Object.entries(data).forEach(([key, val])=>{
                    if (val === undefined || val === null) return;
                    if (val instanceof File) {
                        form.append(key, val);
                    } else if (Array.isArray(val) || typeof val === "object") {
                        form.append(key, JSON.stringify(val));
                    } else {
                        form.append(key, String(val));
                    }
                });
                // Use fetch directly for PATCH multipart (api.upload only does POST)
                const baseUrl = (await __turbopack_context__.A("[project]/src/services/api.ts [app-ssr] (ecmascript, async loader)")).getBaseUrl();
                const fetchRes = await fetch(`${baseUrl}${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["API_ENDPOINTS"].DOCTOR_PROFILE_COMPLETE}`, {
                    method: "PATCH",
                    credentials: "include",
                    body: form
                });
                if (!fetchRes.ok) {
                    const err = await fetchRes.json().catch(()=>({}));
                    throw new Error(err.detail ?? "Failed to save profile.");
                }
                res = await fetchRes.json();
            } else {
                res = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["api"].patch(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["API_ENDPOINTS"].DOCTOR_PROFILE_COMPLETE, data);
            }
            return {
                data: res,
                success: true
            };
        } catch (err) {
            return {
                data: null,
                success: false,
                error: err?.message ?? "Failed to save profile."
            };
        }
    }
};
}),
"[project]/src/services/queueService.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "subscribeToDoctorQueue",
    ()=>subscribeToDoctorQueue
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/api.ts [app-ssr] (ecmascript)");
;
function subscribeToDoctorQueue(doctorId, onMessage) {
    const base = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getBaseUrl"])();
    if (!base) return null;
    const url = new URL(base);
    url.protocol = url.protocol === "https:" ? "wss:" : "ws:";
    const ws = new WebSocket(`${url.toString().replace(/\/$/, "")}/ws/queue/doctor/${doctorId}/`);
    ws.onmessage = (e)=>{
        try {
            const payload = JSON.parse(e.data);
            if (payload.type === "queue.update") onMessage(payload);
        } catch  {
        // ignore malformed payloads
        }
    };
    return ws;
}
}),
"[project]/src/data/mockData.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "hmoProviders",
    ()=>hmoProviders,
    "locations",
    ()=>locations,
    "mockAdmins",
    ()=>mockAdmins,
    "mockAnalytics",
    ()=>mockAnalytics,
    "mockAppointments",
    ()=>mockAppointments,
    "mockCertificates",
    ()=>mockCertificates,
    "mockConversations",
    ()=>mockConversations,
    "mockDoctors",
    ()=>mockDoctors,
    "mockLabResults",
    ()=>mockLabResults,
    "mockMedicines",
    ()=>mockMedicines,
    "mockMessages",
    ()=>mockMessages,
    "mockNotifications",
    ()=>mockNotifications,
    "mockPatients",
    ()=>mockPatients,
    "mockPrescriptions",
    ()=>mockPrescriptions,
    "mockReviews",
    ()=>mockReviews,
    "phHospitals",
    ()=>phHospitals,
    "specialties",
    ()=>specialties
]);
const mockPatients = [
    {
        id: 'patient-1',
        email: 'maria.santos@email.com',
        name: 'Maria Santos',
        role: 'patient',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop',
        phone: '+63 917 123 4567',
        dateOfBirth: '1990-05-15',
        gender: 'female',
        address: '123 Makati Avenue, Makati City',
        bloodType: 'O+',
        allergies: [
            'Penicillin'
        ],
        emergencyContact: '+63 917 987 6543',
        hmoProvider: 'PhilHealth / Maxicare',
        hmoNumber: 'MXC-2024-001234',
        walletBalance: 1250,
        createdAt: '2024-01-15T08:00:00Z'
    },
    {
        id: 'patient-2',
        email: 'juan.delacruz@email.com',
        name: 'Juan Dela Cruz',
        role: 'patient',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop',
        phone: '+63 918 234 5678',
        dateOfBirth: '1985-08-22',
        gender: 'male',
        address: '456 BGC, Taguig City',
        bloodType: 'A+',
        allergies: [],
        createdAt: '2024-02-01T10:00:00Z'
    },
    {
        id: 'patient-3',
        email: 'anna.reyes@email.com',
        name: 'Anna Reyes',
        role: 'patient',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop',
        phone: '+63 919 345 6789',
        dateOfBirth: '1995-12-10',
        gender: 'female',
        address: '789 Ortigas Center, Pasig City',
        bloodType: 'B+',
        allergies: [
            'Sulfa',
            'Aspirin'
        ],
        createdAt: '2024-02-15T14:00:00Z'
    }
];
const mockDoctors = [
    {
        id: 'doctor-1',
        email: 'dr.garcia@stlukes.com',
        name: 'Dr. Elena Garcia',
        role: 'doctor',
        avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop',
        phone: '+63 920 111 2222',
        specialty: 'Internal Medicine',
        specialties: [
            'Internal Medicine',
            'Cardiology'
        ],
        hospital: "St. Luke's Medical Center",
        location: 'Quezon City',
        clinicAddress: '279 E. Rodriguez Sr. Blvd, Quezon City',
        experience: 15,
        consultationFee: 800,
        onlineConsultationFee: 600,
        rating: 4.9,
        reviewCount: 342,
        bio: 'Dr. Elena Garcia is a board-certified internist with over 15 years of experience at St. Luke\'s Medical Center. She specializes in preventive care, chronic disease management, and hypertension. She is known for her thorough consultations and compassionate patient care.',
        education: [
            "MD — University of the Philippines College of Medicine",
            "Fellowship in Cardiology — Philippine Heart Center",
            "Board Certified — Philippine Society of Internal Medicine"
        ],
        languages: [
            'English',
            'Filipino',
            'Spanish'
        ],
        isVerified: true,
        isAvailable: true,
        isOnDemand: true,
        availableSlots: [],
        hmoAccepted: [
            'PhilHealth',
            'Maxicare',
            'Intellicare',
            'Medicard'
        ],
        services: [
            'General Consultation',
            'Hypertension Management',
            'Diabetes Care',
            'Annual Physical Exam',
            'ECG Interpretation'
        ],
        createdAt: '2023-01-01T00:00:00Z'
    },
    {
        id: 'doctor-2',
        email: 'dr.mendoza@stlukes.com',
        name: 'Dr. Carlos Mendoza',
        role: 'doctor',
        avatar: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&h=150&fit=crop',
        phone: '+63 920 222 3333',
        specialty: 'Pediatrics',
        specialties: [
            'Pediatrics',
            'Neonatology'
        ],
        hospital: "St. Luke's Medical Center",
        location: 'Quezon City',
        clinicAddress: '279 E. Rodriguez Sr. Blvd, Quezon City — Peds Tower 3F',
        experience: 12,
        consultationFee: 1000,
        onlineConsultationFee: 750,
        rating: 4.8,
        reviewCount: 256,
        bio: 'Dr. Carlos Mendoza is a compassionate pediatrician dedicated to comprehensive care for children from newborn to adolescence. With 12 years at St. Luke\'s, he is highly regarded for his gentle approach and expertise in common childhood illnesses.',
        education: [
            "MD — Ateneo School of Medicine and Public Health",
            "Residency in Pediatrics — Philippine Children's Medical Center",
            "Sub-specialty in Neonatology — PCMC"
        ],
        languages: [
            'English',
            'Filipino'
        ],
        isVerified: true,
        isAvailable: true,
        isOnDemand: true,
        availableSlots: [],
        hmoAccepted: [
            'PhilHealth',
            'Maxicare',
            'Medicard',
            'HMO Philippines'
        ],
        services: [
            'Well-Baby Check-ups',
            'Vaccinations',
            'Newborn Care',
            'Asthma Management',
            'Developmental Assessment'
        ],
        createdAt: '2023-02-15T00:00:00Z'
    },
    {
        id: 'doctor-3',
        email: 'dr.tan@themedicalcity.com',
        name: 'Dr. Michelle Tan',
        role: 'doctor',
        avatar: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=150&h=150&fit=crop',
        phone: '+63 920 333 4444',
        specialty: 'Dermatology',
        specialties: [
            'Dermatology',
            'Cosmetic Dermatology'
        ],
        hospital: 'The Medical City',
        location: 'Pasig City',
        clinicAddress: 'Ortigas Avenue, Pasig City — TMC Annex 2F',
        experience: 8,
        consultationFee: 1200,
        onlineConsultationFee: 900,
        rating: 4.7,
        reviewCount: 189,
        bio: 'Dr. Michelle Tan is a skilled dermatologist at The Medical City specializing in both medical and cosmetic dermatology. She treats acne, eczema, psoriasis, and skin cancer, while also offering cosmetic procedures for skin rejuvenation.',
        education: [
            "MD — University of Santo Tomas Faculty of Medicine",
            "Dermatology Residency — PGH",
            "Cosmetic Dermatology Fellowship — PCDS"
        ],
        languages: [
            'English',
            'Filipino',
            'Mandarin'
        ],
        isVerified: true,
        isAvailable: true,
        isOnDemand: false,
        availableSlots: [],
        hmoAccepted: [
            'PhilHealth',
            'Intellicare',
            'Maxicare'
        ],
        services: [
            'Acne Treatment',
            'Eczema/Psoriasis',
            'Skin Cancer Screening',
            'Chemical Peels',
            'Laser Treatment',
            'Botox'
        ],
        createdAt: '2023-03-20T00:00:00Z'
    },
    {
        id: 'doctor-4',
        email: 'dr.santos@asianhospital.com',
        name: 'Dr. Roberto Santos',
        role: 'doctor',
        avatar: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=150&h=150&fit=crop',
        phone: '+63 920 444 5555',
        specialty: 'Orthopedics',
        specialties: [
            'Orthopedics',
            'Sports Medicine'
        ],
        hospital: 'Asian Hospital and Medical Center',
        location: 'Muntinlupa City',
        clinicAddress: '2205 Civic Drive, Filinvest City, Muntinlupa',
        experience: 20,
        consultationFee: 1500,
        onlineConsultationFee: 1000,
        rating: 4.9,
        reviewCount: 421,
        bio: 'Dr. Roberto Santos is a renowned orthopedic surgeon at Asian Hospital with two decades of experience treating musculoskeletal conditions, sports injuries, and performing joint replacement surgeries. He is the team physician for several national sports teams.',
        education: [
            "MD — UST Faculty of Medicine and Surgery",
            "Orthopedic Surgery Residency — UERMMC",
            "Sports Medicine Fellowship — Mayo Clinic, USA"
        ],
        languages: [
            'English',
            'Filipino'
        ],
        isVerified: true,
        isAvailable: false,
        isOnDemand: false,
        availableSlots: [],
        hmoAccepted: [
            'PhilHealth',
            'Maxicare',
            'Medicard',
            'Pacific Cross',
            'AXA'
        ],
        services: [
            'Joint Replacement',
            'Arthroscopy',
            'Sports Injury Rehab',
            'Fracture Management',
            'Spine Surgery'
        ],
        createdAt: '2022-05-10T00:00:00Z'
    },
    {
        id: 'doctor-5',
        email: 'dr.lim@makatimed.net.ph',
        name: 'Dr. Grace Lim',
        role: 'doctor',
        avatar: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=150&h=150&fit=crop',
        phone: '+63 920 555 6666',
        specialty: 'OB-Gynecology',
        specialties: [
            'OB-Gynecology',
            'Reproductive Medicine'
        ],
        hospital: 'Makati Medical Center',
        location: 'Makati City',
        clinicAddress: '2 Amorsolo Street, Legazpi Village, Makati City',
        experience: 18,
        consultationFee: 1300,
        onlineConsultationFee: 1000,
        rating: 4.8,
        reviewCount: 567,
        bio: 'Dr. Grace Lim is a highly experienced OB-GYN at Makati Medical Center dedicated to women\'s health across all life stages — from adolescence through menopause. She is an expert in high-risk pregnancy, infertility, and minimally invasive gynecologic surgery.',
        education: [
            "MD — UPCM (cum laude)",
            "OB-GYN Residency — PGH",
            "Reproductive Medicine Sub-specialty — PGH"
        ],
        languages: [
            'English',
            'Filipino',
            'Hokkien'
        ],
        isVerified: true,
        isAvailable: true,
        isOnDemand: true,
        availableSlots: [],
        hmoAccepted: [
            'PhilHealth',
            'Maxicare',
            'Intellicare',
            'Medicard',
            'HMO Philippines'
        ],
        services: [
            'Prenatal Care',
            'Family Planning',
            'Pap Smear',
            'Ultrasound',
            'Infertility Workup',
            'VBAC',
            'Laparoscopy'
        ],
        createdAt: '2022-01-05T00:00:00Z'
    },
    {
        id: 'doctor-6',
        email: 'dr.reyes@themedicalcity.com',
        name: 'Dr. Angelo Reyes',
        role: 'doctor',
        avatar: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=150&h=150&fit=crop',
        phone: '+63 920 666 7777',
        specialty: 'General Medicine',
        specialties: [
            'General Medicine',
            'Family Medicine'
        ],
        hospital: 'The Medical City',
        location: 'Pasig City',
        clinicAddress: 'Ortigas Avenue, Pasig City — TMC Main Building 1F',
        experience: 6,
        consultationFee: 600,
        onlineConsultationFee: 450,
        rating: 4.6,
        reviewCount: 128,
        bio: 'Dr. Angelo Reyes is a family medicine specialist providing comprehensive primary care for patients of all ages. He focuses on preventive health, wellness consultations, and managing common illnesses efficiently — ideal for on-demand video consults.',
        education: [
            "MD — Far Eastern University — NRMF Medical Center",
            "Family Medicine Residency — The Medical City"
        ],
        languages: [
            'English',
            'Filipino'
        ],
        isVerified: true,
        isAvailable: true,
        isOnDemand: true,
        availableSlots: [],
        hmoAccepted: [
            'PhilHealth',
            'Maxicare',
            'Medicard'
        ],
        services: [
            'General Consultation',
            'Medical Certificates',
            'COVID-19 Consult',
            'Sick Leave Evaluation',
            'Health Screening'
        ],
        createdAt: '2023-06-01T00:00:00Z'
    },
    {
        id: 'doctor-7',
        email: 'dr.cera@asianhospital.com',
        name: 'Dr. Ana Cera',
        role: 'doctor',
        avatar: 'https://images.unsplash.com/photo-1527613426441-4da17471b66d?w=150&h=150&fit=crop',
        phone: '+63 920 777 8888',
        specialty: 'Cardiology',
        specialties: [
            'Cardiology',
            'Electrophysiology'
        ],
        hospital: 'Asian Hospital and Medical Center',
        location: 'Muntinlupa City',
        clinicAddress: '2205 Civic Drive, Filinvest City, Muntinlupa — Heart Center',
        experience: 14,
        consultationFee: 1800,
        onlineConsultationFee: 1400,
        rating: 5.0,
        reviewCount: 203,
        bio: 'Dr. Ana Cera is a leading cardiologist at Asian Hospital specializing in interventional cardiology and electrophysiology. She has performed over 1,000 cardiac procedures and is passionate about patient education for heart disease prevention.',
        education: [
            "MD — De La Salle Health Sciences Institute",
            "Cardiology Fellowship — Philippine Heart Center",
            "Electrophysiology Fellowship — Manila Doctors Hospital"
        ],
        languages: [
            'English',
            'Filipino'
        ],
        isVerified: true,
        isAvailable: true,
        isOnDemand: false,
        availableSlots: [],
        hmoAccepted: [
            'PhilHealth',
            'Maxicare',
            'Pacific Cross',
            'AXA',
            'Cigna'
        ],
        services: [
            'ECG Interpretation',
            'Echocardiography',
            'Holter Monitoring',
            'Catheterization',
            'Hypertension Management',
            'Heart Failure Care'
        ],
        createdAt: '2022-08-01T00:00:00Z'
    },
    {
        id: 'doctor-8',
        email: 'dr.dela.pena@makatimed.net.ph',
        name: 'Dr. Francis Dela Peña',
        role: 'doctor',
        avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=150&h=150&fit=crop',
        phone: '+63 920 888 9999',
        specialty: 'Psychiatry',
        specialties: [
            'Psychiatry',
            'Child Psychiatry'
        ],
        hospital: 'Makati Medical Center',
        location: 'Makati City',
        clinicAddress: '2 Amorsolo Street, Makati City — MMC Tower B 6F',
        experience: 10,
        consultationFee: 1500,
        onlineConsultationFee: 1200,
        rating: 4.7,
        reviewCount: 89,
        bio: 'Dr. Francis Dela Peña is a board-certified psychiatrist at Makati Medical Center who provides compassionate mental health care for anxiety, depression, ADHD, and other conditions. He strongly advocates for telehealth as a means to improve mental health access in the Philippines.',
        education: [
            "MD — University of the Philippines",
            "Psychiatry Residency — NIMH",
            "Child Psychiatry Fellowship — PGH"
        ],
        languages: [
            'English',
            'Filipino'
        ],
        isVerified: true,
        isAvailable: true,
        isOnDemand: true,
        availableSlots: [],
        hmoAccepted: [
            'PhilHealth',
            'Intellicare',
            'Maxicare'
        ],
        services: [
            'Mental Health Assessment',
            'Anxiety & Depression',
            'ADHD Evaluation',
            'Psychotherapy',
            'Medication Management'
        ],
        createdAt: '2023-01-15T00:00:00Z'
    }
];
const mockAdmins = [
    {
        id: 'admin-1',
        email: 'admin@nowserving.com',
        name: 'System Administrator',
        role: 'admin',
        phone: '+63 920 999 0000',
        department: 'IT',
        permissions: [
            'all'
        ],
        createdAt: '2022-01-01T00:00:00Z'
    }
];
// Today's date string for realistic appointments
const today = new Date();
const fmtDate = (d)=>d.toISOString().split('T')[0];
const addDays = (d, n)=>{
    const r = new Date(d);
    r.setDate(r.getDate() + n);
    return r;
};
const mockAppointments = [
    {
        id: 'apt-1',
        patientId: 'patient-1',
        doctorId: 'doctor-1',
        date: fmtDate(addDays(today, 2)),
        time: '09:00',
        type: 'online',
        status: 'confirmed',
        paymentStatus: 'paid',
        symptoms: 'Persistent headache and fatigue for 1 week',
        fee: 600,
        createdAt: addDays(today, -3).toISOString(),
        updatedAt: addDays(today, -3).toISOString()
    },
    {
        id: 'apt-2',
        patientId: 'patient-1',
        doctorId: 'doctor-2',
        date: fmtDate(addDays(today, 5)),
        time: '14:00',
        type: 'in-clinic',
        status: 'pending',
        paymentStatus: 'pending',
        symptoms: 'Bringing my son for his 1-year check-up and vaccination',
        fee: 1000,
        createdAt: addDays(today, -1).toISOString(),
        updatedAt: addDays(today, -1).toISOString()
    },
    {
        id: 'apt-3',
        patientId: 'patient-1',
        doctorId: 'doctor-3',
        date: fmtDate(addDays(today, -7)),
        time: '14:00',
        type: 'online',
        status: 'completed',
        paymentStatus: 'paid',
        symptoms: 'Skin rash on arms',
        notes: 'Prescribed Cetirizine and Hydrocortisone cream. Follow-up in 2 weeks if no improvement.',
        fee: 900,
        createdAt: addDays(today, -10).toISOString(),
        updatedAt: addDays(today, -7).toISOString()
    },
    {
        id: 'apt-4',
        patientId: 'patient-1',
        doctorId: 'doctor-1',
        date: fmtDate(addDays(today, -30)),
        time: '10:00',
        type: 'in-clinic',
        status: 'completed',
        queueNumber: 5,
        paymentStatus: 'paid',
        symptoms: 'Annual physical exam and lab follow-up',
        notes: 'All vitals stable. Lipid profile elevated. Started Atorvastatin 20mg. Continue Metformin.',
        fee: 800,
        createdAt: addDays(today, -35).toISOString(),
        updatedAt: addDays(today, -30).toISOString()
    },
    {
        id: 'apt-5',
        patientId: 'patient-1',
        doctorId: 'doctor-5',
        date: fmtDate(addDays(today, -14)),
        time: '11:00',
        type: 'in-clinic',
        status: 'cancelled',
        paymentStatus: 'awaiting',
        symptoms: 'Annual OB checkup',
        fee: 1300,
        createdAt: addDays(today, -20).toISOString(),
        updatedAt: addDays(today, -15).toISOString()
    },
    {
        id: 'apt-6',
        patientId: 'patient-2',
        doctorId: 'doctor-2',
        date: fmtDate(addDays(today, -3)),
        time: '10:30',
        type: 'in-clinic',
        status: 'completed',
        queueNumber: 3,
        paymentStatus: 'paid',
        symptoms: 'Child has fever and cough for 3 days',
        notes: 'Prescribed antibiotics. Follow-up in 1 week.',
        fee: 1000,
        createdAt: addDays(today, -5).toISOString(),
        updatedAt: addDays(today, -3).toISOString()
    }
];
const mockPrescriptions = [
    {
        id: 'rx-1',
        appointmentId: 'apt-3',
        patientId: 'patient-1',
        doctorId: 'doctor-3',
        date: fmtDate(addDays(today, -7)),
        diagnosis: 'Allergic Dermatitis',
        medications: [
            {
                name: 'Cetirizine',
                dosage: '10mg',
                frequency: 'Once daily at bedtime',
                duration: '14 days',
                instructions: 'May cause drowsiness'
            },
            {
                name: 'Hydrocortisone Cream',
                dosage: '1%',
                frequency: 'Apply twice daily on affected areas',
                duration: '10 days',
                instructions: 'Avoid eyes and open wounds'
            }
        ],
        instructions: 'Avoid known allergens. Keep skin moisturized. Avoid hot showers.',
        validUntil: fmtDate(addDays(today, 23)),
        isDigital: true
    },
    {
        id: 'rx-2',
        appointmentId: 'apt-4',
        patientId: 'patient-1',
        doctorId: 'doctor-1',
        date: fmtDate(addDays(today, -30)),
        diagnosis: 'Dyslipidemia / Pre-Diabetes — Maintenance',
        medications: [
            {
                name: 'Metformin',
                dosage: '500mg',
                frequency: 'Twice daily with meals',
                duration: '90 days',
                instructions: 'Take with food to reduce GI side effects'
            },
            {
                name: 'Atorvastatin',
                dosage: '20mg',
                frequency: 'Once daily at bedtime',
                duration: '90 days',
                instructions: 'Avoid grapefruit juice'
            },
            {
                name: 'Vitamin B12',
                dosage: '500mcg',
                frequency: 'Once daily',
                duration: '90 days',
                instructions: 'Supplement due to Metformin use'
            }
        ],
        instructions: 'Monitor fasting blood sugar daily. Target FBS < 126 mg/dL. Lipid panel in 3 months.',
        validUntil: fmtDate(addDays(today, 60)),
        isDigital: true
    }
];
const mockLabResults = [
    {
        id: 'lab-1',
        patientId: 'patient-1',
        doctorId: 'doctor-1',
        appointmentId: 'apt-4',
        testName: 'Complete Blood Count (CBC)',
        testType: 'Blood Test',
        date: fmtDate(addDays(today, -30)),
        status: 'completed',
        laboratory: 'Hi-Precision Diagnostics',
        results: [
            {
                parameter: 'Hemoglobin',
                value: '14.2',
                unit: 'g/dL',
                referenceRange: '12.0–16.0',
                status: 'normal'
            },
            {
                parameter: 'WBC Count',
                value: '7.5',
                unit: 'x10⁹/L',
                referenceRange: '4.5–11.0',
                status: 'normal'
            },
            {
                parameter: 'Platelet Count',
                value: '250',
                unit: 'x10⁹/L',
                referenceRange: '150–400',
                status: 'normal'
            },
            {
                parameter: 'RBC Count',
                value: '4.8',
                unit: 'x10¹²/L',
                referenceRange: '4.0–5.5',
                status: 'normal'
            }
        ],
        notes: 'All values within normal range.'
    },
    {
        id: 'lab-2',
        patientId: 'patient-1',
        doctorId: 'doctor-1',
        appointmentId: 'apt-4',
        testName: 'Lipid Profile',
        testType: 'Blood Test',
        date: fmtDate(addDays(today, -30)),
        status: 'completed',
        laboratory: 'Hi-Precision Diagnostics',
        results: [
            {
                parameter: 'Total Cholesterol',
                value: '220',
                unit: 'mg/dL',
                referenceRange: '<200',
                status: 'high'
            },
            {
                parameter: 'LDL Cholesterol',
                value: '145',
                unit: 'mg/dL',
                referenceRange: '<100',
                status: 'high'
            },
            {
                parameter: 'HDL Cholesterol',
                value: '55',
                unit: 'mg/dL',
                referenceRange: '>40',
                status: 'normal'
            },
            {
                parameter: 'Triglycerides',
                value: '150',
                unit: 'mg/dL',
                referenceRange: '<150',
                status: 'normal'
            }
        ],
        notes: 'Elevated LDL. Started Atorvastatin. Dietary modification advised.'
    },
    {
        id: 'lab-3',
        patientId: 'patient-1',
        doctorId: 'doctor-1',
        appointmentId: 'apt-4',
        testName: 'Fasting Blood Sugar (FBS) & HbA1c',
        testType: 'Blood Test',
        date: fmtDate(addDays(today, -30)),
        status: 'completed',
        laboratory: 'Hi-Precision Diagnostics',
        results: [
            {
                parameter: 'Fasting Blood Glucose',
                value: '118',
                unit: 'mg/dL',
                referenceRange: '70–100',
                status: 'high'
            },
            {
                parameter: 'HbA1c',
                value: '6.2',
                unit: '%',
                referenceRange: '<5.7',
                status: 'high'
            }
        ],
        notes: 'Pre-diabetic range. Metformin started. Lifestyle modification recommended.'
    },
    {
        id: 'lab-4',
        patientId: 'patient-1',
        doctorId: 'doctor-1',
        testName: 'Urinalysis',
        testType: 'Urine Test',
        date: fmtDate(addDays(today, -2)),
        status: 'pending',
        laboratory: "St. Luke's Laboratory",
        notes: 'Sample received. Results expected within 24–48 hours.'
    }
];
const mockCertificates = [
    {
        id: 'cert-1',
        patientId: 'patient-1',
        doctorId: 'doctor-1',
        date: fmtDate(addDays(today, -30)),
        purpose: 'Sick Leave — Work Excuse',
        diagnosis: 'Hypertensive Urgency — Resolved',
        restDays: 3,
        validFrom: fmtDate(addDays(today, -30)),
        validUntil: fmtDate(addDays(today, -27))
    },
    {
        id: 'cert-2',
        patientId: 'patient-1',
        doctorId: 'doctor-3',
        date: fmtDate(addDays(today, -7)),
        purpose: 'Return-to-Work Medical Clearance',
        diagnosis: 'Allergic Dermatitis — Improving',
        restDays: 0,
        validFrom: fmtDate(addDays(today, -7)),
        validUntil: fmtDate(addDays(today, 83))
    }
];
const mockConversations = [
    {
        id: 'conv-1',
        participants: [
            'patient-1',
            'doctor-1'
        ],
        patientId: 'patient-1',
        doctorId: 'doctor-1',
        unreadCount: 2,
        createdAt: addDays(today, -5).toISOString(),
        updatedAt: addDays(today, -1).toISOString()
    },
    {
        id: 'conv-2',
        participants: [
            'patient-1',
            'doctor-3'
        ],
        patientId: 'patient-1',
        doctorId: 'doctor-3',
        unreadCount: 0,
        createdAt: addDays(today, -8).toISOString(),
        updatedAt: addDays(today, -7).toISOString()
    },
    {
        id: 'conv-3',
        participants: [
            'patient-1',
            'doctor-5'
        ],
        patientId: 'patient-1',
        doctorId: 'doctor-5',
        unreadCount: 1,
        createdAt: addDays(today, -15).toISOString(),
        updatedAt: addDays(today, -14).toISOString()
    }
];
const mockMessages = [
    {
        id: 'msg-1',
        conversationId: 'conv-1',
        senderId: 'patient-1',
        senderRole: 'patient',
        content: 'Good morning, Dr. Garcia! I wanted to confirm my upcoming video consultation on Thursday.',
        type: 'text',
        isRead: true,
        timestamp: addDays(today, -1).toISOString().replace('T', ' ').slice(0, 16)
    },
    {
        id: 'msg-2',
        conversationId: 'conv-1',
        senderId: 'doctor-1',
        senderRole: 'doctor',
        content: 'Good morning, Maria! Yes, your video consultation is confirmed for Thursday at 9:00 AM. Please have your latest BP readings ready.',
        type: 'text',
        isRead: true,
        timestamp: addDays(today, -1).toISOString().replace('T', ' ').slice(0, 16)
    },
    {
        id: 'msg-3',
        conversationId: 'conv-1',
        senderId: 'patient-1',
        senderRole: 'patient',
        content: 'Thank you! My BP has been around 130/85. Should I continue the Losartan?',
        type: 'text',
        isRead: true,
        timestamp: addDays(today, -1).toISOString().replace('T', ' ').slice(0, 16)
    },
    {
        id: 'msg-4',
        conversationId: 'conv-1',
        senderId: 'doctor-1',
        senderRole: 'doctor',
        content: 'Yes, please continue the Losartan. 130/85 is a bit elevated — let\'s discuss adjusting the dose during our session. See you Thursday! 🩺',
        type: 'text',
        isRead: false,
        timestamp: new Date().toISOString().replace('T', ' ').slice(0, 16)
    },
    {
        id: 'msg-sys-1',
        conversationId: 'conv-1',
        senderId: 'system',
        senderRole: 'doctor',
        content: '📋 Video consultation completed. E-Prescription has been sent to your My Files.',
        type: 'system',
        isRead: true,
        timestamp: addDays(today, -7).toISOString().replace('T', ' ').slice(0, 16)
    },
    // conv-2 messages
    {
        id: 'msg-5',
        conversationId: 'conv-2',
        senderId: 'doctor-3',
        senderRole: 'doctor',
        content: 'Hi Maria! I noticed you have a skin rash concern. Can you describe the rash and when it first appeared?',
        type: 'text',
        isRead: true,
        timestamp: addDays(today, -8).toISOString().replace('T', ' ').slice(0, 16)
    },
    {
        id: 'msg-6',
        conversationId: 'conv-2',
        senderId: 'patient-1',
        senderRole: 'patient',
        content: 'It appeared about 3 days ago, mostly on my forearms. It\'s itchy and slightly red.',
        type: 'text',
        isRead: true,
        timestamp: addDays(today, -8).toISOString().replace('T', ' ').slice(0, 16)
    },
    {
        id: 'msg-7',
        conversationId: 'conv-2',
        senderId: 'doctor-3',
        senderRole: 'doctor',
        content: 'Thank you for the details. Please avoid scratching. Your prescription has been sent to your My Files — you may order the medicines from our pharmacy.',
        type: 'text',
        isRead: true,
        timestamp: addDays(today, -7).toISOString().replace('T', ' ').slice(0, 16)
    },
    // conv-3 messages
    {
        id: 'msg-8',
        conversationId: 'conv-3',
        senderId: 'doctor-5',
        senderRole: 'doctor',
        content: 'Hi Maria! Your appointment on the 21st was cancelled. Please feel free to reschedule when you\'re ready. Take care! 💚',
        type: 'text',
        isRead: false,
        timestamp: addDays(today, -14).toISOString().replace('T', ' ').slice(0, 16)
    }
];
const mockReviews = [
    {
        id: 'rev-1',
        doctorId: 'doctor-1',
        patientId: 'patient-1',
        appointmentId: 'apt-4',
        rating: 5,
        comment: 'Dr. Garcia is very thorough and takes time to explain everything clearly. The video consultation was smooth and professional. Highly recommended!',
        createdAt: addDays(today, -29).toISOString()
    },
    {
        id: 'rev-2',
        doctorId: 'doctor-2',
        patientId: 'patient-2',
        appointmentId: 'apt-6',
        rating: 5,
        comment: 'Excellent pediatrician! Very patient with my child and made the clinic visit stress-free. Highly recommend Dr. Mendoza.',
        createdAt: addDays(today, -2).toISOString()
    },
    {
        id: 'rev-3',
        doctorId: 'doctor-1',
        patientId: 'patient-2',
        appointmentId: 'apt-4',
        rating: 5,
        comment: 'Very knowledgeable and approachable. She explains your condition in simple terms. The online consult was just as good as in-person.',
        createdAt: addDays(today, -10).toISOString()
    },
    {
        id: 'rev-4',
        doctorId: 'doctor-3',
        patientId: 'patient-1',
        appointmentId: 'apt-3',
        rating: 4,
        comment: 'Dr. Tan was very helpful with my skin concerns. She prescribed the right medicines and my rash has improved a lot.',
        createdAt: addDays(today, -6).toISOString()
    }
];
const mockMedicines = [
    {
        id: 'med-1',
        name: 'Biogesic (Paracetamol)',
        genericName: 'Paracetamol',
        category: 'Pain Relief',
        price: 5.50,
        description: 'For relief of mild to moderate pain and fever. Gentle on the stomach.',
        dosageForm: 'Tablet 500mg',
        manufacturer: 'Unilab',
        requiresPrescription: false,
        inStock: true,
        quantity: 500,
        pharmacyPartner: 'Mercury Drug'
    },
    {
        id: 'med-2',
        name: 'Amoxicillin',
        genericName: 'Amoxicillin',
        category: 'Antibiotics',
        price: 15.00,
        description: 'Antibiotic for bacterial infections — ear, throat, urinary tract.',
        dosageForm: 'Capsule 500mg',
        manufacturer: 'Pharex',
        requiresPrescription: true,
        inStock: true,
        quantity: 200,
        pharmacyPartner: 'Rose Pharmacy'
    },
    {
        id: 'med-3',
        name: 'Losartan (Ritemed)',
        genericName: 'Losartan Potassium',
        category: 'Cardiovascular',
        price: 25.00,
        description: 'For treatment of high blood pressure and kidney protection in diabetes.',
        dosageForm: 'Tablet 50mg',
        manufacturer: 'Ritemed',
        requiresPrescription: true,
        inStock: true,
        quantity: 150,
        pharmacyPartner: 'Mercury Drug'
    },
    {
        id: 'med-4',
        name: 'Neozep Forte',
        genericName: 'Phenylephrine + Chlorphenamine',
        category: 'First Aid',
        price: 8.75,
        description: 'Relieves nasal congestion, runny nose, and sneezing due to colds.',
        dosageForm: 'Tablet',
        manufacturer: 'United Home Products',
        requiresPrescription: false,
        inStock: true,
        quantity: 300,
        pharmacyPartner: 'Mercury Drug'
    },
    {
        id: 'med-5',
        name: 'Cetirizine (Zyrtec)',
        genericName: 'Cetirizine HCl',
        category: 'First Aid',
        price: 12.00,
        description: 'Antihistamine for allergies, hay fever, skin rash, and hives.',
        dosageForm: 'Tablet 10mg',
        manufacturer: 'UCB Pharma',
        requiresPrescription: false,
        inStock: true,
        quantity: 250,
        pharmacyPartner: 'Watsons'
    },
    {
        id: 'med-6',
        name: 'Metformin (Ritemed)',
        genericName: 'Metformin HCl',
        category: 'Maintenance',
        price: 7.50,
        description: 'First-line medication for management of type 2 diabetes mellitus.',
        dosageForm: 'Tablet 500mg',
        manufacturer: 'Ritemed',
        requiresPrescription: true,
        inStock: true,
        quantity: 400,
        pharmacyPartner: 'Mercury Drug'
    },
    {
        id: 'med-7',
        name: 'Vitamin C (Ascorbic Acid)',
        genericName: 'Ascorbic Acid',
        category: 'Vitamins',
        price: 3.50,
        description: 'Supports immune function, collagen synthesis, and antioxidant protection.',
        dosageForm: 'Tablet 500mg',
        manufacturer: 'Watsons',
        requiresPrescription: false,
        inStock: true,
        quantity: 1000,
        pharmacyPartner: 'Watsons'
    },
    {
        id: 'med-8',
        name: 'Ponstan (Mefenamic Acid)',
        genericName: 'Mefenamic Acid',
        category: 'Pain Relief',
        price: 9.00,
        description: 'NSAID for mild to moderate pain including dysmenorrhea and toothache.',
        dosageForm: 'Capsule 500mg',
        manufacturer: 'Pfizer',
        requiresPrescription: false,
        inStock: true,
        quantity: 350,
        pharmacyPartner: 'Rose Pharmacy'
    },
    {
        id: 'med-9',
        name: 'Augmentin (Co-Amoxiclav)',
        genericName: 'Amoxicillin + Clavulanic Acid',
        category: 'Antibiotics',
        price: 45.00,
        description: 'Broad-spectrum antibiotic for complicated bacterial infections.',
        dosageForm: 'Tablet 625mg',
        manufacturer: 'GSK',
        requiresPrescription: true,
        inStock: true,
        quantity: 120,
        pharmacyPartner: 'Mercury Drug'
    },
    {
        id: 'med-10',
        name: 'Lipitor (Atorvastatin)',
        genericName: 'Atorvastatin Calcium',
        category: 'Cardiovascular',
        price: 35.00,
        description: 'For reduction of LDL cholesterol and cardiovascular disease risk.',
        dosageForm: 'Tablet 20mg',
        manufacturer: 'Pfizer',
        requiresPrescription: true,
        inStock: true,
        quantity: 180,
        pharmacyPartner: 'Mercury Drug'
    },
    {
        id: 'med-11',
        name: 'Enervon Multivitamins',
        genericName: 'Multivitamins + Minerals',
        category: 'Vitamins',
        price: 15.00,
        description: 'Complete daily vitamins and minerals for energy and overall wellness.',
        dosageForm: 'Capsule',
        manufacturer: 'Unilab',
        requiresPrescription: false,
        inStock: true,
        quantity: 500,
        pharmacyPartner: 'Watsons'
    },
    {
        id: 'med-12',
        name: 'Omeprazole (Pharex)',
        genericName: 'Omeprazole',
        category: 'Maintenance',
        price: 18.50,
        description: 'Proton pump inhibitor for acid reflux (GERD) and peptic ulcer disease.',
        dosageForm: 'Capsule 20mg',
        manufacturer: 'Pharex',
        requiresPrescription: false,
        inStock: false,
        quantity: 0,
        pharmacyPartner: 'Rose Pharmacy'
    },
    {
        id: 'med-13',
        name: 'Salbutamol (Ventolin) Inhaler',
        genericName: 'Salbutamol',
        category: 'Respiratory',
        price: 320.00,
        description: 'Relieves bronchospasm in asthma and COPD. Fast-acting inhaler.',
        dosageForm: 'Inhaler 100mcg/dose',
        manufacturer: 'GSK',
        requiresPrescription: true,
        inStock: true,
        quantity: 50,
        pharmacyPartner: 'Mercury Drug'
    },
    {
        id: 'med-14',
        name: 'Lagundi (Ascof) Syrup',
        genericName: 'Vitex negundo (Lagundi)',
        category: 'First Aid',
        price: 89.00,
        description: 'Herbal medicine for cough and asthma. DOH-approved Philippine herbal.',
        dosageForm: 'Syrup 300mg/5mL',
        manufacturer: 'Pascual Laboratories',
        requiresPrescription: false,
        inStock: true,
        quantity: 80,
        pharmacyPartner: 'Rose Pharmacy'
    },
    {
        id: 'med-15',
        name: 'Vitamin B-Complex',
        genericName: 'Thiamine + Riboflavin + B6 + B12',
        category: 'Vitamins',
        price: 6.50,
        description: 'B-vitamin complex for nerve health, energy metabolism, and immune support.',
        dosageForm: 'Tablet',
        manufacturer: 'Pharex',
        requiresPrescription: false,
        inStock: true,
        quantity: 600,
        pharmacyPartner: 'Watsons'
    }
];
const mockNotifications = [
    {
        id: 'notif-1',
        userId: 'patient-1',
        type: 'appointment',
        title: 'Appointment Confirmed ✅',
        message: 'Your video consultation with Dr. Garcia on Thursday at 9:00 AM is confirmed!',
        isRead: false,
        data: {
            appointmentId: 'apt-1'
        },
        createdAt: addDays(today, -3).toISOString()
    },
    {
        id: 'notif-2',
        userId: 'patient-1',
        type: 'appointment',
        title: 'Consult in 30 Minutes! ⏰',
        message: 'Your video consult with Dr. Garcia starts in 30 minutes. Be ready!',
        isRead: false,
        data: {
            appointmentId: 'apt-1'
        },
        createdAt: new Date().toISOString()
    },
    {
        id: 'notif-3',
        userId: 'patient-1',
        type: 'message',
        title: 'New Message from Dr. Garcia',
        message: 'Dr. Garcia sent you a reply about your BP medication.',
        isRead: false,
        data: {
            conversationId: 'conv-1'
        },
        createdAt: new Date().toISOString()
    },
    {
        id: 'notif-4',
        userId: 'patient-1',
        type: 'prescription',
        title: 'E-Prescription Ready 💊',
        message: 'Dr. Tan issued your prescription for Allergic Dermatitis. View in My Files.',
        isRead: true,
        data: {
            prescriptionId: 'rx-1'
        },
        createdAt: addDays(today, -7).toISOString()
    },
    {
        id: 'notif-5',
        userId: 'patient-1',
        type: 'lab-result',
        title: 'Lab Results Available 🧪',
        message: 'Your CBC, Lipid Profile, and FBS results from Hi-Precision are now available.',
        isRead: true,
        data: {
            labId: 'lab-1'
        },
        createdAt: addDays(today, -29).toISOString()
    }
];
const mockAnalytics = {
    totalPatients: 1250,
    totalDoctors: 85,
    totalAppointments: 4532,
    totalRevenue: 2150000,
    appointmentsByStatus: {
        'pending': 45,
        'confirmed': 120,
        'in-progress': 15,
        'completed': 4200,
        'cancelled': 142,
        'no-show': 10
    },
    appointmentsByType: {
        'online': 1850,
        'in-clinic': 2682
    },
    revenueByMonth: [
        {
            month: 'Jan',
            revenue: 180000
        },
        {
            month: 'Feb',
            revenue: 195000
        },
        {
            month: 'Mar',
            revenue: 210000
        },
        {
            month: 'Apr',
            revenue: 175000
        },
        {
            month: 'May',
            revenue: 220000
        },
        {
            month: 'Jun',
            revenue: 245000
        },
        {
            month: 'Jul',
            revenue: 230000
        },
        {
            month: 'Aug',
            revenue: 200000
        },
        {
            month: 'Sep',
            revenue: 185000
        },
        {
            month: 'Oct',
            revenue: 195000
        },
        {
            month: 'Nov',
            revenue: 215000
        }
    ],
    topDoctors: [],
    patientGrowth: [
        {
            month: 'Jan',
            count: 85
        },
        {
            month: 'Feb',
            count: 92
        },
        {
            month: 'Mar',
            count: 110
        },
        {
            month: 'Apr',
            count: 98
        },
        {
            month: 'May',
            count: 125
        },
        {
            month: 'Jun',
            count: 140
        },
        {
            month: 'Jul',
            count: 130
        },
        {
            month: 'Aug',
            count: 115
        },
        {
            month: 'Sep',
            count: 105
        },
        {
            month: 'Oct',
            count: 120
        },
        {
            month: 'Nov',
            count: 130
        }
    ]
};
const specialties = [
    'General Medicine',
    'Family Medicine',
    'Internal Medicine',
    'Pediatrics',
    'Dermatology',
    'Orthopedics',
    'OB-Gynecology',
    'Cardiology',
    'Neurology',
    'Ophthalmology',
    'ENT',
    'Psychiatry',
    'General Surgery',
    'Pulmonology',
    'Endocrinology'
];
const locations = [
    'Makati City',
    'Quezon City',
    'Pasig City',
    'Taguig City',
    'Muntinlupa City',
    'Mandaluyong City',
    'Manila',
    'Pasay City',
    'Parañaque City',
    'Las Piñas City',
    'Caloocan City',
    'Marikina City',
    'Cebu City',
    'Davao City'
];
const phHospitals = [
    "St. Luke's Medical Center - Quezon City",
    "St. Luke's Medical Center - BGC",
    'Makati Medical Center',
    'The Medical City - Ortigas',
    'Asian Hospital and Medical Center',
    'Philippine General Hospital',
    'Philippine Heart Center',
    'Lung Center of the Philippines',
    'National Kidney and Transplant Institute',
    'Philippine Children\'s Medical Center',
    'Cardinal Santos Medical Center',
    'Manila Doctors Hospital',
    'Ospital ng Makati',
    'Pasig City General Hospital',
    'Cebu Velez General Hospital'
];
const hmoProviders = [
    'PhilHealth',
    'Maxicare',
    'Intellicare',
    'Medicard',
    'HMO Philippines',
    'Pacific Cross',
    'AXA Philippines',
    'Cigna Philippines',
    'Caritas Health Shield',
    'EastWest Healthcare'
];
}),
"[project]/src/components/ui/card.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Card",
    ()=>Card,
    "CardContent",
    ()=>CardContent,
    "CardDescription",
    ()=>CardDescription,
    "CardFooter",
    ()=>CardFooter,
    "CardHeader",
    ()=>CardHeader,
    "CardTitle",
    ()=>CardTitle
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-ssr] (ecmascript)");
;
;
;
const Card = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["forwardRef"](({ className, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("rounded-lg border bg-card text-card-foreground shadow-sm", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/card.tsx",
        lineNumber: 6,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0)));
Card.displayName = "Card";
const CardHeader = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["forwardRef"](({ className, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("flex flex-col space-y-1.5 p-6", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/card.tsx",
        lineNumber: 12,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0)));
CardHeader.displayName = "CardHeader";
const CardTitle = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["forwardRef"](({ className, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("text-2xl font-semibold leading-none tracking-tight", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/card.tsx",
        lineNumber: 19,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0)));
CardTitle.displayName = "CardTitle";
const CardDescription = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["forwardRef"](({ className, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("text-sm text-muted-foreground", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/card.tsx",
        lineNumber: 26,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0)));
CardDescription.displayName = "CardDescription";
const CardContent = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["forwardRef"](({ className, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("p-6 pt-0", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/card.tsx",
        lineNumber: 32,
        columnNumber: 37
    }, ("TURBOPACK compile-time value", void 0)));
CardContent.displayName = "CardContent";
const CardFooter = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["forwardRef"](({ className, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("flex items-center p-6 pt-0", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/card.tsx",
        lineNumber: 38,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0)));
CardFooter.displayName = "CardFooter";
;
}),
"[project]/src/components/ui/input.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Input",
    ()=>Input
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-ssr] (ecmascript)");
;
;
;
const Input = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["forwardRef"](({ className, type, ...props }, ref)=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
        type: type,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm", className),
        ref: ref,
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/input.tsx",
        lineNumber: 8,
        columnNumber: 7
    }, ("TURBOPACK compile-time value", void 0));
});
Input.displayName = "Input";
;
}),
"[project]/src/components/ui/skeleton.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Skeleton",
    ()=>Skeleton
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-ssr] (ecmascript)");
;
;
function Skeleton({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("animate-pulse rounded-md bg-muted", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/skeleton.tsx",
        lineNumber: 4,
        columnNumber: 10
    }, this);
}
;
}),
"[project]/src/components/ui/switch.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Switch",
    ()=>Switch
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$switch$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@radix-ui/react-switch/dist/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-ssr] (ecmascript)");
;
;
;
;
const Switch = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["forwardRef"](({ className, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$switch$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Root"], {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors data-[state=checked]:bg-primary data-[state=unchecked]:bg-input focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50", className),
        ...props,
        ref: ref,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$switch$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Thumb"], {
            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("pointer-events-none block h-5 w-5 rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0")
        }, void 0, false, {
            fileName: "[project]/src/components/ui/switch.tsx",
            lineNumber: 18,
            columnNumber: 5
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/src/components/ui/switch.tsx",
        lineNumber: 10,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0)));
Switch.displayName = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$switch$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Root"].displayName;
;
}),
"[project]/src/components/ui/dialog.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Dialog",
    ()=>Dialog,
    "DialogClose",
    ()=>DialogClose,
    "DialogContent",
    ()=>DialogContent,
    "DialogDescription",
    ()=>DialogDescription,
    "DialogFooter",
    ()=>DialogFooter,
    "DialogHeader",
    ()=>DialogHeader,
    "DialogOverlay",
    ()=>DialogOverlay,
    "DialogPortal",
    ()=>DialogPortal,
    "DialogTitle",
    ()=>DialogTitle,
    "DialogTrigger",
    ()=>DialogTrigger
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@radix-ui/react-dialog/dist/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-ssr] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-ssr] (ecmascript)");
;
;
;
;
;
const Dialog = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Root"];
const DialogTrigger = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Trigger"];
const DialogPortal = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Portal"];
const DialogClose = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Close"];
const DialogOverlay = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["forwardRef"](({ className, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Overlay"], {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/dialog.tsx",
        lineNumber: 19,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0)));
DialogOverlay.displayName = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Overlay"].displayName;
const DialogContent = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["forwardRef"](({ className, children, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(DialogPortal, {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(DialogOverlay, {}, void 0, false, {
                fileName: "[project]/src/components/ui/dialog.tsx",
                lineNumber: 35,
                columnNumber: 5
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Content"], {
                ref: ref,
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg", className),
                ...props,
                children: [
                    children,
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Close"], {
                        className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity data-[state=open]:bg-accent data-[state=open]:text-muted-foreground hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                className: "h-4 w-4"
                            }, void 0, false, {
                                fileName: "[project]/src/components/ui/dialog.tsx",
                                lineNumber: 46,
                                columnNumber: 9
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "sr-only",
                                children: "Close"
                            }, void 0, false, {
                                fileName: "[project]/src/components/ui/dialog.tsx",
                                lineNumber: 47,
                                columnNumber: 9
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/ui/dialog.tsx",
                        lineNumber: 45,
                        columnNumber: 7
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/ui/dialog.tsx",
                lineNumber: 36,
                columnNumber: 5
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/ui/dialog.tsx",
        lineNumber: 34,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0)));
DialogContent.displayName = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Content"].displayName;
const DialogHeader = ({ className, ...props })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("flex flex-col space-y-1.5 text-center sm:text-left", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/dialog.tsx",
        lineNumber: 55,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0));
DialogHeader.displayName = "DialogHeader";
const DialogFooter = ({ className, ...props })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/dialog.tsx",
        lineNumber: 60,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0));
DialogFooter.displayName = "DialogFooter";
const DialogTitle = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["forwardRef"](({ className, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Title"], {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("text-lg font-semibold leading-none tracking-tight", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/dialog.tsx",
        lineNumber: 68,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0)));
DialogTitle.displayName = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Title"].displayName;
const DialogDescription = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["forwardRef"](({ className, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Description"], {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("text-sm text-muted-foreground", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/dialog.tsx",
        lineNumber: 80,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0)));
DialogDescription.displayName = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Description"].displayName;
;
}),
"[project]/src/components/ui/scroll-area.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ScrollArea",
    ()=>ScrollArea,
    "ScrollBar",
    ()=>ScrollBar
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$scroll$2d$area$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@radix-ui/react-scroll-area/dist/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-ssr] (ecmascript)");
;
;
;
;
const ScrollArea = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["forwardRef"](({ className, children, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$scroll$2d$area$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Root"], {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("relative overflow-hidden", className),
        ...props,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$scroll$2d$area$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Viewport"], {
                className: "h-full w-full rounded-[inherit]",
                children: children
            }, void 0, false, {
                fileName: "[project]/src/components/ui/scroll-area.tsx",
                lineNumber: 11,
                columnNumber: 5
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(ScrollBar, {}, void 0, false, {
                fileName: "[project]/src/components/ui/scroll-area.tsx",
                lineNumber: 12,
                columnNumber: 5
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$scroll$2d$area$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Corner"], {}, void 0, false, {
                fileName: "[project]/src/components/ui/scroll-area.tsx",
                lineNumber: 13,
                columnNumber: 5
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/ui/scroll-area.tsx",
        lineNumber: 10,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0)));
ScrollArea.displayName = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$scroll$2d$area$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Root"].displayName;
const ScrollBar = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["forwardRef"](({ className, orientation = "vertical", ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$scroll$2d$area$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ScrollAreaScrollbar"], {
        ref: ref,
        orientation: orientation,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("flex touch-none select-none transition-colors", orientation === "vertical" && "h-full w-2.5 border-l border-l-transparent p-[1px]", orientation === "horizontal" && "h-2.5 flex-col border-t border-t-transparent p-[1px]", className),
        ...props,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$scroll$2d$area$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ScrollAreaThumb"], {
            className: "relative flex-1 rounded-full bg-border"
        }, void 0, false, {
            fileName: "[project]/src/components/ui/scroll-area.tsx",
            lineNumber: 33,
            columnNumber: 5
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/src/components/ui/scroll-area.tsx",
        lineNumber: 22,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0)));
ScrollBar.displayName = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$scroll$2d$area$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ScrollAreaScrollbar"].displayName;
;
}),
"[project]/src/components/ui/textarea.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Textarea",
    ()=>Textarea
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-ssr] (ecmascript)");
;
;
;
const Textarea = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["forwardRef"](({ className, ...props }, ref)=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50", className),
        ref: ref,
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/textarea.tsx",
        lineNumber: 9,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
});
Textarea.displayName = "Textarea";
;
}),
"[project]/src/components/doctor/DocumentComposer.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>DocumentComposer
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/file-text.js [app-ssr] (ecmascript) <export default as FileText>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clipboard$2d$list$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ClipboardList$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/clipboard-list.js [app-ssr] (ecmascript) <export default as ClipboardList>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$pen$2d$line$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__FileSignature$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/file-pen-line.js [app-ssr] (ecmascript) <export default as FileSignature>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/button.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/input.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$textarea$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/textarea.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/card.tsx [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
;
;
function DocumentComposer({ onSendPrescription, onSendLab, onSendCertificate }) {
    const [type, setType] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('prescription');
    const [diagnosis, setDiagnosis] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    const [medications, setMedications] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    const [instructions, setInstructions] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    const [testName, setTestName] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    const [labNotes, setLabNotes] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    const [purpose, setPurpose] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    const [restDays, setRestDays] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('3');
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Card"], {
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CardContent"], {
            className: "p-4 space-y-4",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex gap-2 flex-wrap",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                            size: "sm",
                            variant: type === 'prescription' ? 'default' : 'outline',
                            className: "gap-1.5",
                            onClick: ()=>setType('prescription'),
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__["FileText"], {
                                    className: "h-4 w-4"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/doctor/DocumentComposer.tsx",
                                    lineNumber: 42,
                                    columnNumber: 13
                                }, this),
                                "E-Prescription"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/doctor/DocumentComposer.tsx",
                            lineNumber: 36,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                            size: "sm",
                            variant: type === 'lab' ? 'default' : 'outline',
                            className: "gap-1.5",
                            onClick: ()=>setType('lab'),
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clipboard$2d$list$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ClipboardList$3e$__["ClipboardList"], {
                                    className: "h-4 w-4"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/doctor/DocumentComposer.tsx",
                                    lineNumber: 51,
                                    columnNumber: 13
                                }, this),
                                "Lab Request"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/doctor/DocumentComposer.tsx",
                            lineNumber: 45,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                            size: "sm",
                            variant: type === 'certificate' ? 'default' : 'outline',
                            className: "gap-1.5",
                            onClick: ()=>setType('certificate'),
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$pen$2d$line$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__FileSignature$3e$__["FileSignature"], {
                                    className: "h-4 w-4"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/doctor/DocumentComposer.tsx",
                                    lineNumber: 60,
                                    columnNumber: 13
                                }, this),
                                "Medical Certificate"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/doctor/DocumentComposer.tsx",
                            lineNumber: 54,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/doctor/DocumentComposer.tsx",
                    lineNumber: 35,
                    columnNumber: 9
                }, this),
                type === 'prescription' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "space-y-3",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Input"], {
                            placeholder: "Diagnosis",
                            value: diagnosis,
                            onChange: (e)=>setDiagnosis(e.target.value)
                        }, void 0, false, {
                            fileName: "[project]/src/components/doctor/DocumentComposer.tsx",
                            lineNumber: 67,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$textarea$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Textarea"], {
                            placeholder: "Medications (e.g., Amoxicillin 500mg - 3x daily for 7 days)",
                            value: medications,
                            onChange: (e)=>setMedications(e.target.value)
                        }, void 0, false, {
                            fileName: "[project]/src/components/doctor/DocumentComposer.tsx",
                            lineNumber: 68,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$textarea$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Textarea"], {
                            placeholder: "Additional instructions",
                            value: instructions,
                            onChange: (e)=>setInstructions(e.target.value)
                        }, void 0, false, {
                            fileName: "[project]/src/components/doctor/DocumentComposer.tsx",
                            lineNumber: 73,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                            onClick: ()=>onSendPrescription({
                                    diagnosis,
                                    medications,
                                    instructions
                                }),
                            children: "Send Prescription"
                        }, void 0, false, {
                            fileName: "[project]/src/components/doctor/DocumentComposer.tsx",
                            lineNumber: 78,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/doctor/DocumentComposer.tsx",
                    lineNumber: 66,
                    columnNumber: 11
                }, this),
                type === 'lab' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "space-y-3",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Input"], {
                            placeholder: "Test name (e.g., CBC, Lipid Profile)",
                            value: testName,
                            onChange: (e)=>setTestName(e.target.value)
                        }, void 0, false, {
                            fileName: "[project]/src/components/doctor/DocumentComposer.tsx",
                            lineNumber: 86,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$textarea$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Textarea"], {
                            placeholder: "Notes / instructions",
                            value: labNotes,
                            onChange: (e)=>setLabNotes(e.target.value)
                        }, void 0, false, {
                            fileName: "[project]/src/components/doctor/DocumentComposer.tsx",
                            lineNumber: 87,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                            onClick: ()=>onSendLab({
                                    testName,
                                    notes: labNotes
                                }),
                            children: "Send Lab Request"
                        }, void 0, false, {
                            fileName: "[project]/src/components/doctor/DocumentComposer.tsx",
                            lineNumber: 88,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/doctor/DocumentComposer.tsx",
                    lineNumber: 85,
                    columnNumber: 11
                }, this),
                type === 'certificate' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "space-y-3",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Input"], {
                            placeholder: "Purpose (e.g., Sick leave)",
                            value: purpose,
                            onChange: (e)=>setPurpose(e.target.value)
                        }, void 0, false, {
                            fileName: "[project]/src/components/doctor/DocumentComposer.tsx",
                            lineNumber: 94,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Input"], {
                            placeholder: "Diagnosis",
                            value: diagnosis,
                            onChange: (e)=>setDiagnosis(e.target.value)
                        }, void 0, false, {
                            fileName: "[project]/src/components/doctor/DocumentComposer.tsx",
                            lineNumber: 95,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Input"], {
                            type: "number",
                            placeholder: "Rest days",
                            value: restDays,
                            onChange: (e)=>setRestDays(e.target.value)
                        }, void 0, false, {
                            fileName: "[project]/src/components/doctor/DocumentComposer.tsx",
                            lineNumber: 96,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                            onClick: ()=>onSendCertificate({
                                    purpose,
                                    diagnosis,
                                    restDays: Number(restDays || 0)
                                }),
                            children: "Send Certificate"
                        }, void 0, false, {
                            fileName: "[project]/src/components/doctor/DocumentComposer.tsx",
                            lineNumber: 102,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/doctor/DocumentComposer.tsx",
                    lineNumber: 93,
                    columnNumber: 11
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/doctor/DocumentComposer.tsx",
            lineNumber: 34,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/doctor/DocumentComposer.tsx",
        lineNumber: 33,
        columnNumber: 5
    }, this);
}
}),
"[project]/src/components/doctor/VideoConsultModal.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>VideoConsultModal
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$mic$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Mic$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/mic.js [app-ssr] (ecmascript) <export default as Mic>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$mic$2d$off$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__MicOff$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/mic-off.js [app-ssr] (ecmascript) <export default as MicOff>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$video$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Video$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/video.js [app-ssr] (ecmascript) <export default as Video>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$video$2d$off$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__VideoOff$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/video-off.js [app-ssr] (ecmascript) <export default as VideoOff>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$phone$2d$off$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__PhoneOff$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/phone-off.js [app-ssr] (ecmascript) <export default as PhoneOff>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$message$2d$square$2d$text$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__MessageSquareText$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/message-square-text.js [app-ssr] (ecmascript) <export default as MessageSquareText>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/dialog.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/button.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/input.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$scroll$2d$area$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/scroll-area.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$avatar$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/avatar.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$doctor$2f$DocumentComposer$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/doctor/DocumentComposer.tsx [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
;
;
;
;
function VideoConsultModal({ open, appointment, onClose, onEnd, onSendPrescription, onSendLab, onSendCertificate, videoRoomUrl }) {
    const jitsiUrl = videoRoomUrl ?? appointment?.videoRoomUrl;
    const [muted, setMuted] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [cameraOff, setCameraOff] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [elapsed, setElapsed] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(0);
    const [note, setNote] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    const [message, setMessage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    const [chat, setChat] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [showEndDialog, setShowEndDialog] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [showComposer, setShowComposer] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const displayTime = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        const mins = Math.floor(elapsed / 60).toString().padStart(2, '0');
        const secs = (elapsed % 60).toString().padStart(2, '0');
        return `${mins}:${secs}`;
    }, [
        elapsed
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!open) {
            setElapsed(0);
            setChat([]);
            setMessage('');
            setNote('');
            setShowEndDialog(false);
            setShowComposer(false);
            return;
        }
        const timer = setInterval(()=>setElapsed((t)=>t + 1), 1000);
        return ()=>clearInterval(timer);
    }, [
        open
    ]);
    const sendMessage = ()=>{
        if (!message.trim()) return;
        const newMsg = {
            id: `call-msg-${Date.now()}`,
            sender: 'doctor',
            text: message.trim(),
            time: new Date().toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit'
            })
        };
        setChat((prev)=>[
                ...prev,
                newMsg
            ]);
        setMessage('');
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Dialog"], {
                open: open,
                onOpenChange: (value)=>!value && onClose(),
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DialogContent"], {
                    className: "max-w-5xl",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DialogHeader"], {
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DialogTitle"], {
                                className: "flex items-center justify-between",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: "Video Consultation"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/doctor/VideoConsultModal.tsx",
                                        lineNumber: 91,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-sm text-muted-foreground",
                                        children: [
                                            "Live • ",
                                            displayTime
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/doctor/VideoConsultModal.tsx",
                                        lineNumber: 92,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/doctor/VideoConsultModal.tsx",
                                lineNumber: 90,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/doctor/VideoConsultModal.tsx",
                            lineNumber: 89,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "grid lg:grid-cols-[2fr_1fr] gap-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "space-y-3",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "relative aspect-video rounded-2xl bg-muted overflow-hidden flex items-center justify-center",
                                            children: [
                                                jitsiUrl ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("iframe", {
                                                    src: jitsiUrl,
                                                    allow: "camera; microphone; fullscreen; display-capture",
                                                    className: "w-full h-full border-0",
                                                    title: "Video Consultation"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/doctor/VideoConsultModal.tsx",
                                                    lineNumber: 99,
                                                    columnNumber: 19
                                                }, this) : cameraOff ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "text-center text-muted-foreground",
                                                    children: "Camera is off"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/doctor/VideoConsultModal.tsx",
                                                    lineNumber: 106,
                                                    columnNumber: 19
                                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "text-center text-muted-foreground",
                                                    children: "Waiting for video room..."
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/doctor/VideoConsultModal.tsx",
                                                    lineNumber: 108,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "absolute bottom-4 left-4 flex items-center gap-2 bg-card/80 backdrop-blur px-3 py-1 rounded-full text-xs",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$avatar$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Avatar"], {
                                                            className: "h-6 w-6",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$avatar$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AvatarImage"], {
                                                                    src: appointment?.patient?.avatar
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/doctor/VideoConsultModal.tsx",
                                                                    lineNumber: 113,
                                                                    columnNumber: 21
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$avatar$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AvatarFallback"], {
                                                                    children: appointment?.patient?.name?.[0] ?? 'P'
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/doctor/VideoConsultModal.tsx",
                                                                    lineNumber: 114,
                                                                    columnNumber: 21
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/doctor/VideoConsultModal.tsx",
                                                            lineNumber: 112,
                                                            columnNumber: 19
                                                        }, this),
                                                        appointment?.patient?.name ?? 'Patient'
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/doctor/VideoConsultModal.tsx",
                                                    lineNumber: 111,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/doctor/VideoConsultModal.tsx",
                                            lineNumber: 97,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex flex-wrap justify-center gap-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                                                    variant: "outline",
                                                    size: "icon",
                                                    onClick: ()=>setMuted((v)=>!v),
                                                    children: muted ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$mic$2d$off$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__MicOff$3e$__["MicOff"], {
                                                        className: "h-4 w-4"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/doctor/VideoConsultModal.tsx",
                                                        lineNumber: 122,
                                                        columnNumber: 28
                                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$mic$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Mic$3e$__["Mic"], {
                                                        className: "h-4 w-4"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/doctor/VideoConsultModal.tsx",
                                                        lineNumber: 122,
                                                        columnNumber: 61
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/doctor/VideoConsultModal.tsx",
                                                    lineNumber: 121,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                                                    variant: "outline",
                                                    size: "icon",
                                                    onClick: ()=>setCameraOff((v)=>!v),
                                                    children: cameraOff ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$video$2d$off$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__VideoOff$3e$__["VideoOff"], {
                                                        className: "h-4 w-4"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/doctor/VideoConsultModal.tsx",
                                                        lineNumber: 125,
                                                        columnNumber: 32
                                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$video$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Video$3e$__["Video"], {
                                                        className: "h-4 w-4"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/doctor/VideoConsultModal.tsx",
                                                        lineNumber: 125,
                                                        columnNumber: 67
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/doctor/VideoConsultModal.tsx",
                                                    lineNumber: 124,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                                                    variant: "destructive",
                                                    onClick: ()=>setShowEndDialog(true),
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$phone$2d$off$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__PhoneOff$3e$__["PhoneOff"], {
                                                            className: "h-4 w-4 mr-2"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/doctor/VideoConsultModal.tsx",
                                                            lineNumber: 128,
                                                            columnNumber: 19
                                                        }, this),
                                                        "End Call"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/doctor/VideoConsultModal.tsx",
                                                    lineNumber: 127,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/doctor/VideoConsultModal.tsx",
                                            lineNumber: 120,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/doctor/VideoConsultModal.tsx",
                                    lineNumber: 96,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "space-y-3",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "rounded-xl border border-border p-3",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-sm font-medium",
                                                    children: "Consultation Notes"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/doctor/VideoConsultModal.tsx",
                                                    lineNumber: 136,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Input"], {
                                                    value: note,
                                                    onChange: (e)=>setNote(e.target.value),
                                                    placeholder: "Add quick notes before ending...",
                                                    className: "mt-2"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/doctor/VideoConsultModal.tsx",
                                                    lineNumber: 137,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/doctor/VideoConsultModal.tsx",
                                            lineNumber: 135,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "rounded-xl border border-border overflow-hidden flex flex-col h-[360px]",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "px-3 py-2 border-b text-sm font-medium flex items-center gap-2",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$message$2d$square$2d$text$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__MessageSquareText$3e$__["MessageSquareText"], {
                                                            className: "h-4 w-4"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/doctor/VideoConsultModal.tsx",
                                                            lineNumber: 147,
                                                            columnNumber: 19
                                                        }, this),
                                                        "In-call Chat"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/doctor/VideoConsultModal.tsx",
                                                    lineNumber: 146,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$scroll$2d$area$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ScrollArea"], {
                                                    className: "flex-1 p-3 space-y-2",
                                                    children: chat.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-xs text-muted-foreground",
                                                        children: "No chat messages yet."
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/doctor/VideoConsultModal.tsx",
                                                        lineNumber: 152,
                                                        columnNumber: 21
                                                    }, this) : chat.map((msg)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: `text-xs rounded-lg px-3 py-2 ${msg.sender === 'doctor' ? 'bg-primary text-primary-foreground ml-auto' : 'bg-muted'}`,
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    children: msg.text
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/doctor/VideoConsultModal.tsx",
                                                                    lineNumber: 159,
                                                                    columnNumber: 25
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "opacity-70",
                                                                    children: msg.time
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/doctor/VideoConsultModal.tsx",
                                                                    lineNumber: 160,
                                                                    columnNumber: 25
                                                                }, this)
                                                            ]
                                                        }, msg.id, true, {
                                                            fileName: "[project]/src/components/doctor/VideoConsultModal.tsx",
                                                            lineNumber: 155,
                                                            columnNumber: 23
                                                        }, this))
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/doctor/VideoConsultModal.tsx",
                                                    lineNumber: 150,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "p-2 border-t flex gap-2",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Input"], {
                                                            value: message,
                                                            onChange: (e)=>setMessage(e.target.value),
                                                            placeholder: "Type a message..."
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/doctor/VideoConsultModal.tsx",
                                                            lineNumber: 166,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                                                            onClick: sendMessage,
                                                            children: "Send"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/doctor/VideoConsultModal.tsx",
                                                            lineNumber: 171,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/doctor/VideoConsultModal.tsx",
                                                    lineNumber: 165,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/doctor/VideoConsultModal.tsx",
                                            lineNumber: 145,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/doctor/VideoConsultModal.tsx",
                                    lineNumber: 134,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/doctor/VideoConsultModal.tsx",
                            lineNumber: 95,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/doctor/VideoConsultModal.tsx",
                    lineNumber: 88,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/doctor/VideoConsultModal.tsx",
                lineNumber: 87,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Dialog"], {
                open: showEndDialog,
                onOpenChange: setShowEndDialog,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DialogContent"], {
                    className: "max-w-xl",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DialogHeader"], {
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DialogTitle"], {
                                children: "End Consultation"
                            }, void 0, false, {
                                fileName: "[project]/src/components/doctor/VideoConsultModal.tsx",
                                lineNumber: 182,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/doctor/VideoConsultModal.tsx",
                            lineNumber: 181,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "space-y-4",
                            children: !showComposer ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-sm text-muted-foreground",
                                        children: "Do you want to send a document (e‑Prescription, Lab Request, or Medical Certificate) before ending?"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/doctor/VideoConsultModal.tsx",
                                        lineNumber: 187,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex flex-col sm:flex-row gap-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                                                variant: "outline",
                                                onClick: ()=>setShowComposer(true),
                                                children: "Send Document"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/doctor/VideoConsultModal.tsx",
                                                lineNumber: 191,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                                                variant: "outline",
                                                onClick: ()=>setShowEndDialog(false),
                                                children: "Back to Call"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/doctor/VideoConsultModal.tsx",
                                                lineNumber: 194,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                                                variant: "destructive",
                                                onClick: ()=>{
                                                    setShowEndDialog(false);
                                                    onEnd(note);
                                                },
                                                children: "End Without Document"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/doctor/VideoConsultModal.tsx",
                                                lineNumber: 197,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/doctor/VideoConsultModal.tsx",
                                        lineNumber: 190,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$doctor$2f$DocumentComposer$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                onSendPrescription: (payload)=>{
                                    onSendPrescription?.(payload);
                                    setShowEndDialog(false);
                                    setShowComposer(false);
                                    onEnd(note);
                                },
                                onSendLab: (payload)=>{
                                    onSendLab?.(payload);
                                    setShowEndDialog(false);
                                    setShowComposer(false);
                                    onEnd(note);
                                },
                                onSendCertificate: (payload)=>{
                                    onSendCertificate?.(payload);
                                    setShowEndDialog(false);
                                    setShowComposer(false);
                                    onEnd(note);
                                }
                            }, void 0, false, {
                                fileName: "[project]/src/components/doctor/VideoConsultModal.tsx",
                                lineNumber: 209,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/doctor/VideoConsultModal.tsx",
                            lineNumber: 184,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/doctor/VideoConsultModal.tsx",
                    lineNumber: 180,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/doctor/VideoConsultModal.tsx",
                lineNumber: 179,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true);
}
}),
"[project]/src/store/recordsStore.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useRecordsStore",
    ()=>useRecordsStore
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$react$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/zustand/esm/react.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$middleware$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/zustand/esm/middleware.mjs [app-ssr] (ecmascript)");
;
;
const useRecordsStore = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$react$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["create"])()((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$middleware$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["persist"])((set)=>({
        prescriptions: [],
        labResults: [],
        certificates: [],
        recentlyAdded: [],
        setPrescriptions: (prescriptions)=>set({
                prescriptions
            }),
        setLabResults: (labResults)=>set({
                labResults
            }),
        setCertificates: (certificates)=>set({
                certificates
            }),
        addPrescriptionFromConsult: (rx)=>set((state)=>({
                    prescriptions: [
                        rx,
                        ...state.prescriptions
                    ],
                    recentlyAdded: [
                        rx.id,
                        ...state.recentlyAdded
                    ]
                })),
        addLabResultFromConsult: (lab)=>set((state)=>({
                    labResults: [
                        lab,
                        ...state.labResults
                    ],
                    recentlyAdded: [
                        lab.id,
                        ...state.recentlyAdded
                    ]
                })),
        addCertificateFromConsult: (cert)=>set((state)=>({
                    certificates: [
                        cert,
                        ...state.certificates
                    ],
                    recentlyAdded: [
                        cert.id,
                        ...state.recentlyAdded
                    ]
                })),
        clearRecentlyAdded: ()=>set({
                recentlyAdded: []
            })
    }), {
    name: 'records-storage'
}));
}),
"[project]/src/services/medicalRecordsService.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "medicalRecordsService",
    ()=>medicalRecordsService
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/api.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$mappers$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/mappers.ts [app-ssr] (ecmascript)");
;
;
const medicalRecordsService = {
    // Prescriptions
    async getPrescriptions (_patientId) {
        const data = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["api"].get(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["API_ENDPOINTS"].PRESCRIPTIONS);
        return {
            data: data.map(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$mappers$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mapPrescription"]),
            success: true
        };
    },
    async getPrescriptionById (id) {
        const data = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["api"].get(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["API_ENDPOINTS"].PRESCRIPTION_DETAIL(id));
        return {
            data: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$mappers$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mapPrescription"])(data),
            success: true
        };
    },
    async createPrescription (data) {
        const result = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["api"].post(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["API_ENDPOINTS"].PRESCRIPTIONS, data);
        return {
            data: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$mappers$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mapPrescription"])(result),
            success: true,
            message: "Prescription created"
        };
    },
    // Lab Results
    async getLabResults (_patientId) {
        const data = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["api"].get(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["API_ENDPOINTS"].LAB_RESULTS);
        return {
            data: data.map(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$mappers$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mapLabResult"]),
            success: true
        };
    },
    async getLabResultById (id) {
        const data = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["api"].get(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["API_ENDPOINTS"].LAB_DETAIL(id));
        return {
            data: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$mappers$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mapLabResult"])(data),
            success: true
        };
    },
    async createLabRequest (data) {
        const result = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["api"].post(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["API_ENDPOINTS"].LAB_RESULTS, data);
        return {
            data: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$mappers$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mapLabResult"])(result),
            success: true,
            message: "Lab request created"
        };
    },
    async uploadLabResults (labId, file, results, notes) {
        const form = new FormData();
        form.append("file", file);
        if (results) form.append("results", JSON.stringify(results));
        if (notes) form.append("notes", notes);
        form.append("status", "completed");
        const result = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["api"].upload(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["API_ENDPOINTS"].LAB_DETAIL(labId), form);
        return {
            data: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$mappers$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mapLabResult"])(result),
            success: true,
            message: "Lab results uploaded"
        };
    },
    // Medical Certificates
    async getCertificates (_patientId) {
        const data = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["api"].get(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["API_ENDPOINTS"].CERTIFICATES);
        return {
            data: data.map(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$mappers$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mapMedicalCertificate"]),
            success: true
        };
    },
    async createCertificate (data) {
        const result = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["api"].post(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["API_ENDPOINTS"].CERTIFICATES, data);
        return {
            data: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$mappers$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mapMedicalCertificate"])(result),
            success: true,
            message: "Medical certificate created"
        };
    }
};
}),
"[project]/features/doctor/consult/actions.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "endConsult",
    ()=>endConsult,
    "sendLabRequest",
    ()=>sendLabRequest,
    "sendMedicalCertificate",
    ()=>sendMedicalCertificate,
    "sendPrescription",
    ()=>sendPrescription
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$appointmentService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/appointmentService.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$medicalRecordsService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/medicalRecordsService.ts [app-ssr] (ecmascript)");
;
;
async function endConsult(appointmentId, transcript) {
    const res = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$appointmentService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["appointmentService"].completeAppointment(appointmentId, transcript);
    return res.data;
}
async function sendPrescription(input) {
    const meds = input.medications.split('\n').filter(Boolean).map((line)=>({
            name: line.split('-')[0]?.trim() || line.trim(),
            dosage: '500mg',
            frequency: 'Once daily',
            duration: '7 days'
        }));
    const result = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$medicalRecordsService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["medicalRecordsService"].createPrescription({
        appointment_id: input.appointmentId,
        patient_id: input.patientId,
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
        valid_days: 30
    });
    if (!result.success) {
        throw new Error(result.error || 'Failed to create prescription');
    }
    return result.data;
}
async function sendLabRequest(input) {
    const result = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$medicalRecordsService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["medicalRecordsService"].createLabRequest({
        patient_id: input.patientId,
        test_name: input.testName || 'Laboratory Test',
        test_type: 'Lab Request',
        notes: input.notes,
        laboratory: 'CareConnect Partner Lab'
    });
    if (!result.success) {
        throw new Error(result.error || 'Failed to create lab request');
    }
    return result.data;
}
async function sendMedicalCertificate(input) {
    const result = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$medicalRecordsService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["medicalRecordsService"].createCertificate({
        patient_id: input.patientId,
        purpose: input.purpose || 'Medical Certificate',
        diagnosis: input.diagnosis || 'General Consultation',
        rest_days: input.restDays || 1
    });
    if (!result.success) {
        throw new Error(result.error || 'Failed to create medical certificate');
    }
    return result.data;
}
}),
"[project]/features/doctor/queue/actions.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "markDone",
    ()=>markDone,
    "nextPatient",
    ()=>nextPatient,
    "startConsult",
    ()=>startConsult
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$appointmentService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/appointmentService.ts [app-ssr] (ecmascript)");
;
async function startConsult(appointmentId) {
    const res = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$appointmentService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["appointmentService"].startConsult(appointmentId);
    return res.data;
}
async function nextPatient(appointmentId) {
    const res = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$appointmentService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["appointmentService"].callNext(appointmentId);
    return res.data;
}
async function markDone(appointmentId, notes) {
    const res = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$appointmentService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["appointmentService"].completeAppointment(appointmentId, notes);
    return res.data;
}
}),
"[project]/app/(doctor)/doctor/queue/page.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>DoctorQueuePage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$format$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/date-fns/format.mjs [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$isToday$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/date-fns/isToday.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/components/AnimatePresence/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$bell$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Bell$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/bell.js [app-ssr] (ecmascript) <export default as Bell>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-check.js [app-ssr] (ecmascript) <export default as CheckCircle2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/clock.js [app-ssr] (ecmascript) <export default as Clock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/file-text.js [app-ssr] (ecmascript) <export default as FileText>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$message$2d$circle$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__MessageCircle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/message-circle.js [app-ssr] (ecmascript) <export default as MessageCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$refresh$2d$cw$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__RefreshCw$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/refresh-cw.js [app-ssr] (ecmascript) <export default as RefreshCw>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/search.js [app-ssr] (ecmascript) <export default as Search>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$video$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Video$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/video.js [app-ssr] (ecmascript) <export default as Video>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$zap$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Zap$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/zap.js [app-ssr] (ecmascript) <export default as Zap>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$appointmentService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/appointmentService.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$chatService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/chatService.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$doctorService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/doctorService.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$queueService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/queueService.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$mockData$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/data/mockData.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/store/index.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$use$2d$toast$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/hooks/use-toast.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/card.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/button.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/badge.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$avatar$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/avatar.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/input.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$skeleton$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/skeleton.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$switch$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/switch.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/dialog.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$doctor$2f$VideoConsultModal$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/doctor/VideoConsultModal.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$recordsStore$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/store/recordsStore.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$doctor$2f$consult$2f$actions$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/features/doctor/consult/actions.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$doctor$2f$queue$2f$actions$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/features/doctor/queue/actions.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
const waitMinutesPerPatient = 12;
const ENABLE_QUEUE_MOCKS = process.env.NEXT_PUBLIC_QUEUE_MOCKS === 'true';
const complaintPool = [
    'Fever and cough for 2 days',
    'Headache with dizziness',
    'Sore throat and body aches',
    'Stomach pain after meals',
    'Skin rashes on arms',
    'High blood pressure follow-up'
];
const getAgeLabel = (dateOfBirth)=>{
    if (!dateOfBirth) return '—';
    const dob = new Date(dateOfBirth);
    if (Number.isNaN(dob.getTime())) return '—';
    const diff = Date.now() - dob.getTime();
    return Math.max(0, Math.floor(diff / (365.25 * 24 * 60 * 60 * 1000))).toString();
};
const getGenderLabel = (gender)=>{
    if (!gender) return '—';
    return gender.charAt(0).toUpperCase() + gender.slice(1);
};
function DoctorQueuePage() {
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    const { toast } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$use$2d$toast$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useToast"])();
    const { user, setUser } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useAuthStore"])();
    const { addPrescriptionFromConsult, addLabResultFromConsult, addCertificateFromConsult } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$recordsStore$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRecordsStore"])();
    const doctor = user;
    const doctorId = doctor?.userId ?? doctor?.id;
    const onDemand = doctor?.isOnDemand ?? false;
    const [appointments, setAppointments] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(true);
    const [currentPatientId, setCurrentPatientId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [showVideo, setShowVideo] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [sortBy, setSortBy] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('arrival');
    const [searchQuery, setSearchQuery] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    const [notesAppointment, setNotesAppointment] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [lastUpdated, setLastUpdated] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [seeded, setSeeded] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [videoRoomUrl, setVideoRoomUrl] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])();
    const currentPatient = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>appointments.find((apt)=>apt.id === currentPatientId) ?? null, [
        appointments,
        currentPatientId
    ]);
    const queueWaiting = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>appointments.filter((apt)=>apt.status === 'confirmed' && apt.id !== currentPatientId).sort((a, b)=>{
            if (a.queueNumber && b.queueNumber) return a.queueNumber - b.queueNumber;
            return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        }), [
        appointments,
        currentPatientId
    ]);
    const waitingPatients = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        const list = searchQuery ? queueWaiting.filter((apt)=>apt.patient?.name?.toLowerCase().includes(searchQuery.toLowerCase())) : queueWaiting;
        if (sortBy === 'time') {
            return [
                ...list
            ].sort((a, b)=>a.time.localeCompare(b.time));
        }
        return list;
    }, [
        queueWaiting,
        searchQuery,
        sortBy
    ]);
    const completedCount = appointments.filter((apt)=>apt.status === 'completed').length;
    const hasQueue = Boolean(currentPatient) || queueWaiting.length > 0;
    const seedQueue = async ()=>{
        if (!doctorId || seeded || !ENABLE_QUEUE_MOCKS) {
            if (!seeded && !ENABLE_QUEUE_MOCKS) {
                setSeeded(true);
            }
            return;
        }
        const today = new Date().toISOString().split('T')[0];
        const slots = [
            '09:00',
            '09:20',
            '09:40'
        ];
        await Promise.all(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$mockData$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mockPatients"].slice(0, 3).map(async (patient, index)=>{
            const res = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$appointmentService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["appointmentService"].createAppointment({
                patientId: patient.id,
                doctorId,
                date: today,
                time: slots[index % slots.length],
                type: index % 2 === 0 ? 'online' : 'in-clinic',
                symptoms: complaintPool[index % complaintPool.length]
            });
            if (!res.success) return;
            await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$appointmentService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["appointmentService"].updateAppointmentStatus(res.data.id, 'confirmed');
        }));
        setSeeded(true);
    };
    const loadQueue = async (seedIfEmpty = false)=>{
        if (!doctorId) return;
        setLoading(true);
        const res = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$appointmentService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["appointmentService"].getAppointments({
            doctorId
        });
        if (res.success) {
            let todayApts = res.data.filter((apt)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$isToday$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isToday"])(new Date(apt.date)));
            if (todayApts.length === 0 && seedIfEmpty && ENABLE_QUEUE_MOCKS) {
                await seedQueue();
                const seededRes = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$appointmentService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["appointmentService"].getAppointments({
                    doctorId
                });
                if (seededRes.success) {
                    todayApts = seededRes.data.filter((apt)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$isToday$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isToday"])(new Date(apt.date)));
                }
            }
            setAppointments(todayApts);
            const inProgress = todayApts.find((apt)=>apt.status === 'in-progress');
            const firstWaiting = todayApts.find((apt)=>apt.status === 'confirmed');
            setCurrentPatientId(inProgress?.id ?? firstWaiting?.id ?? null);
            setLastUpdated(new Date());
        }
        setLoading(false);
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        loadQueue(true);
    }, [
        doctorId
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!doctorId || ENABLE_QUEUE_MOCKS) return;
        const ws = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$queueService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["subscribeToDoctorQueue"])(doctorId, ()=>{
            loadQueue(false);
            setLastUpdated(new Date());
        });
        return ()=>ws?.close();
    }, [
        doctorId
    ]); // eslint-disable-line react-hooks/exhaustive-deps
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!appointments.length) {
            setCurrentPatientId(null);
            return;
        }
        if (currentPatientId && appointments.some((apt)=>apt.id === currentPatientId)) return;
        const inProgress = appointments.find((apt)=>apt.status === 'in-progress');
        const firstWaiting = appointments.find((apt)=>apt.status === 'confirmed');
        setCurrentPatientId(inProgress?.id ?? firstWaiting?.id ?? null);
    }, [
        appointments,
        currentPatientId
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!doctorId || !onDemand || !ENABLE_QUEUE_MOCKS) return;
        const interval = setInterval(()=>{
            const today = new Date().toISOString().split('T')[0];
            const queuePatientIds = appointments.filter((apt)=>apt.date === today && [
                    'confirmed',
                    'in-progress'
                ].includes(apt.status)).map((apt)=>apt.patientId);
            const pool = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$mockData$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mockPatients"].filter((patient)=>!queuePatientIds.includes(patient.id));
            const patient = (pool.length ? pool : __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$mockData$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mockPatients"])[Math.floor(Math.random() * (pool.length || __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$mockData$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mockPatients"].length))];
            const symptoms = complaintPool[Math.floor(Math.random() * complaintPool.length)];
            const now = new Date();
            const time = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$format$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["format"])(now, 'HH:mm');
            const type = Math.random() > 0.35 ? 'online' : 'in-clinic';
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$appointmentService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["appointmentService"].createAppointment({
                patientId: patient.id,
                doctorId,
                date: today,
                time,
                type,
                symptoms
            }).then(async (res)=>{
                if (!res.success) return;
                await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$appointmentService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["appointmentService"].updateAppointmentStatus(res.data.id, 'confirmed');
                setAppointments((prev)=>[
                        {
                            ...res.data,
                            status: 'confirmed',
                            patient
                        },
                        ...prev
                    ]);
                setLastUpdated(new Date());
                toast({
                    title: 'New patient joined the queue',
                    description: `${patient.name} - ${symptoms}`
                });
            });
        }, 30000);
        return ()=>clearInterval(interval);
    }, [
        appointments,
        doctorId,
        onDemand,
        toast
    ]);
    const ensureConversationId = async (appointment)=>{
        if (!user) return null;
        const convRes = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$chatService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["chatService"].createConversation(appointment.patientId, user.id, 'doctor');
        return convRes.success ? convRes.data.id : null;
    };
    const handleOnDemand = async (value)=>{
        if (!doctor) return;
        const res = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$doctorService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["doctorService"].updateOnDemand(doctor.id, value);
        if (res.success) {
            setUser({
                ...doctor,
                isOnDemand: value
            });
            toast({
                title: value ? 'On-demand enabled' : 'On-demand paused',
                description: value ? 'Patients can consult you instantly.' : 'You are hidden from Consult Now.'
            });
        }
    };
    const updateAppointment = (id, data)=>{
        setAppointments((prev)=>prev.map((apt)=>apt.id === id ? {
                    ...apt,
                    ...data
                } : apt));
    };
    const handleStartConsultation = async (appointment)=>{
        const target = appointment ?? currentPatient;
        if (!target) return;
        try {
            let roomUrl = target.videoRoomUrl;
            if (target.status !== 'in-progress' && target.status !== 'in_progress') {
                const updatedApt = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$doctor$2f$queue$2f$actions$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["startConsult"])(target.id);
                roomUrl = updatedApt?.videoRoomUrl ?? roomUrl;
                updateAppointment(target.id, {
                    status: 'in-progress',
                    videoRoomUrl: roomUrl
                });
            }
            if (!roomUrl && target.type === 'online') {
                const res = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$appointmentService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["appointmentService"].startVideoConsult(target.id);
                if (res.success) {
                    roomUrl = res.data.videoRoomUrl;
                    updateAppointment(target.id, {
                        videoRoomUrl: roomUrl
                    });
                }
            }
            setVideoRoomUrl(roomUrl);
            setCurrentPatientId(target.id);
            setShowVideo(true);
            setLastUpdated(new Date());
        } catch (err) {
            toast({
                title: 'Failed to start consultation',
                description: err instanceof Error ? err.message : 'Please try again.',
                variant: 'destructive'
            });
        }
    };
    const handleCallNext = async (appointment)=>{
        if (currentPatient?.status === 'in-progress') {
            toast({
                title: 'Finish current consult first',
                description: 'Mark done before calling the next patient.'
            });
            return;
        }
        const next = appointment ?? queueWaiting[0];
        if (!next) return;
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$doctor$2f$queue$2f$actions$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["nextPatient"])(next.id);
        updateAppointment(next.id, {
            status: 'in-progress'
        });
        setCurrentPatientId(next.id);
        setLastUpdated(new Date());
        toast({
            title: `Calling ${next.patient?.name}`
        });
    };
    const handleCompleteConsultation = async (appointment, notes)=>{
        const target = appointment ?? currentPatient;
        if (!target) return;
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$doctor$2f$queue$2f$actions$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["markDone"])(target.id, notes);
        updateAppointment(target.id, {
            status: 'completed'
        });
        if (currentPatientId === target.id) {
            setCurrentPatientId(queueWaiting[0]?.id ?? null);
        }
        setLastUpdated(new Date());
        toast({
            title: 'Consultation completed',
            description: queueWaiting[0]?.patient?.name ? `Next patient: ${queueWaiting[0].patient?.name}` : 'Queue is empty'
        });
    };
    const handleMessagePatient = async (appointment)=>{
        const conversationId = await ensureConversationId(appointment);
        if (conversationId) {
            router.push(`/doctor/messages?conversation=${conversationId}`);
        }
    };
    const handleSendPrescription = async (payload)=>{
        if (!currentPatient || !user) return;
        try {
            const rx = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$doctor$2f$consult$2f$actions$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["sendPrescription"])({
                appointmentId: currentPatient.id,
                patientId: currentPatient.patientId,
                doctorId: user.id,
                diagnosis: payload.diagnosis,
                medications: payload.medications,
                instructions: payload.instructions
            });
            addPrescriptionFromConsult(rx);
            const conversationId = await ensureConversationId(currentPatient);
            if (conversationId) {
                await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$chatService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["chatService"].sendMessage(conversationId, user.id, 'doctor', 'E-prescription sent. Please check My Files.', 'prescription');
            }
            toast({
                title: 'Prescription sent',
                description: 'Patient received the e-prescription.'
            });
        } catch (error) {
            toast({
                title: 'Failed to send prescription',
                description: error instanceof Error ? error.message : 'Please try again.',
                variant: 'destructive'
            });
        }
    };
    const handleSendLab = async (payload)=>{
        if (!currentPatient || !user) return;
        try {
            const lab = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$doctor$2f$consult$2f$actions$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["sendLabRequest"])({
                appointmentId: currentPatient.id,
                patientId: currentPatient.patientId,
                doctorId: user.id,
                testName: payload.testName,
                notes: payload.notes
            });
            addLabResultFromConsult(lab);
            const conversationId = await ensureConversationId(currentPatient);
            if (conversationId) {
                await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$chatService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["chatService"].sendMessage(conversationId, user.id, 'doctor', 'Lab request sent. Please check My Files.', 'file');
            }
            toast({
                title: 'Lab request sent',
                description: 'Lab request added to patient files.'
            });
        } catch (error) {
            toast({
                title: 'Failed to send lab request',
                description: error instanceof Error ? error.message : 'Please try again.',
                variant: 'destructive'
            });
        }
    };
    const handleSendCertificate = async (payload)=>{
        if (!currentPatient || !user) return;
        try {
            const cert = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$doctor$2f$consult$2f$actions$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["sendMedicalCertificate"])({
                appointmentId: currentPatient.id,
                patientId: currentPatient.patientId,
                doctorId: user.id,
                purpose: payload.purpose,
                diagnosis: payload.diagnosis,
                restDays: payload.restDays
            });
            addCertificateFromConsult(cert);
            const conversationId = await ensureConversationId(currentPatient);
            if (conversationId) {
                await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$chatService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["chatService"].sendMessage(conversationId, user.id, 'doctor', 'Medical certificate issued. Please check My Files.', 'file');
            }
            toast({
                title: 'Medical certificate sent',
                description: 'Certificate added to patient files.'
            });
        } catch (error) {
            toast({
                title: 'Failed to send certificate',
                description: error instanceof Error ? error.message : 'Please try again.',
                variant: 'destructive'
            });
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-6",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                initial: {
                    opacity: 0,
                    y: -8
                },
                animate: {
                    opacity: 1,
                    y: 0
                },
                className: "flex flex-col xl:flex-row xl:items-center justify-between gap-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                className: "text-2xl font-bold text-foreground",
                                children: "Doctor Queue"
                            }, void 0, false, {
                                fileName: "[project]/app/(doctor)/doctor/queue/page.tsx",
                                lineNumber: 429,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sm text-muted-foreground",
                                children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$format$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["format"])(new Date(), 'EEEE, MMMM d, yyyy')
                            }, void 0, false, {
                                fileName: "[project]/app/(doctor)/doctor/queue/page.tsx",
                                lineNumber: 430,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-wrap items-center gap-2 mt-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Badge"], {
                                        className: "bg-primary/10 text-primary border-primary/20",
                                        children: [
                                            queueWaiting.length,
                                            " waiting"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/(doctor)/doctor/queue/page.tsx",
                                        lineNumber: 432,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Badge"], {
                                        variant: "secondary",
                                        children: [
                                            completedCount,
                                            " completed"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/(doctor)/doctor/queue/page.tsx",
                                        lineNumber: 435,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Badge"], {
                                        variant: "outline",
                                        className: "text-xs",
                                        children: [
                                            "Last updated ",
                                            lastUpdated ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$format$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["format"])(lastUpdated, 'p') : '--'
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/(doctor)/doctor/queue/page.tsx",
                                        lineNumber: 438,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/(doctor)/doctor/queue/page.tsx",
                                lineNumber: 431,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/(doctor)/doctor/queue/page.tsx",
                        lineNumber: 428,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-wrap items-center gap-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-2 rounded-full bg-secondary/60 px-3 py-1.5",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$switch$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Switch"], {
                                        checked: onDemand,
                                        onCheckedChange: handleOnDemand,
                                        id: "doctor-on-demand-queue"
                                    }, void 0, false, {
                                        fileName: "[project]/app/(doctor)/doctor/queue/page.tsx",
                                        lineNumber: 445,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        htmlFor: "doctor-on-demand-queue",
                                        className: "text-xs text-muted-foreground",
                                        children: [
                                            "On-Demand: ",
                                            onDemand ? 'Available' : 'Paused'
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/(doctor)/doctor/queue/page.tsx",
                                        lineNumber: 446,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/(doctor)/doctor/queue/page.tsx",
                                lineNumber: 444,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Badge"], {
                                className: onDemand ? 'bg-success/15 text-success border-success/30' : 'bg-muted text-muted-foreground border-border',
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: `mr-1 h-2 w-2 rounded-full ${onDemand ? 'bg-success animate-pulse' : 'bg-muted-foreground/50'}`
                                    }, void 0, false, {
                                        fileName: "[project]/app/(doctor)/doctor/queue/page.tsx",
                                        lineNumber: 451,
                                        columnNumber: 13
                                    }, this),
                                    onDemand ? 'Live' : 'Offline'
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/(doctor)/doctor/queue/page.tsx",
                                lineNumber: 450,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                                variant: "outline",
                                size: "sm",
                                className: "gap-1.5",
                                onClick: ()=>loadQueue(false),
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$refresh$2d$cw$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__RefreshCw$3e$__["RefreshCw"], {
                                        className: "h-4 w-4"
                                    }, void 0, false, {
                                        fileName: "[project]/app/(doctor)/doctor/queue/page.tsx",
                                        lineNumber: 455,
                                        columnNumber: 13
                                    }, this),
                                    "Refresh"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/(doctor)/doctor/queue/page.tsx",
                                lineNumber: 454,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/(doctor)/doctor/queue/page.tsx",
                        lineNumber: 443,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/(doctor)/doctor/queue/page.tsx",
                lineNumber: 423,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid lg:grid-cols-[2fr_1fr] gap-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                        initial: {
                            opacity: 0,
                            y: 8
                        },
                        animate: {
                            opacity: 1,
                            y: 0
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Card"], {
                            className: "border-primary/20 bg-primary/5",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CardHeader"], {
                                    className: "flex flex-row items-center justify-between",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CardTitle"], {
                                            className: "text-lg",
                                            children: "Now Serving"
                                        }, void 0, false, {
                                            fileName: "[project]/app/(doctor)/doctor/queue/page.tsx",
                                            lineNumber: 465,
                                            columnNumber: 15
                                        }, this),
                                        currentPatient ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Badge"], {
                                            className: "bg-success/15 text-success border-success/30",
                                            children: "Now Serving"
                                        }, void 0, false, {
                                            fileName: "[project]/app/(doctor)/doctor/queue/page.tsx",
                                            lineNumber: 467,
                                            columnNumber: 17
                                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Badge"], {
                                            variant: "secondary",
                                            children: "Idle"
                                        }, void 0, false, {
                                            fileName: "[project]/app/(doctor)/doctor/queue/page.tsx",
                                            lineNumber: 469,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/(doctor)/doctor/queue/page.tsx",
                                    lineNumber: 464,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CardContent"], {
                                    className: "space-y-4",
                                    children: loading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "space-y-4",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$skeleton$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Skeleton"], {
                                                className: "h-20 w-full rounded-xl"
                                            }, void 0, false, {
                                                fileName: "[project]/app/(doctor)/doctor/queue/page.tsx",
                                                lineNumber: 475,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$skeleton$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Skeleton"], {
                                                className: "h-10 w-3/4 rounded-xl"
                                            }, void 0, false, {
                                                fileName: "[project]/app/(doctor)/doctor/queue/page.tsx",
                                                lineNumber: 476,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/(doctor)/doctor/queue/page.tsx",
                                        lineNumber: 474,
                                        columnNumber: 17
                                    }, this) : currentPatient ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "space-y-4",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex flex-col sm:flex-row sm:items-center gap-4 p-4 rounded-xl bg-background border border-border",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$avatar$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Avatar"], {
                                                        className: "h-16 w-16",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$avatar$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AvatarImage"], {
                                                                src: currentPatient.patient?.avatar
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/(doctor)/doctor/queue/page.tsx",
                                                                lineNumber: 482,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$avatar$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AvatarFallback"], {
                                                                children: currentPatient.patient?.name?.[0]
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/(doctor)/doctor/queue/page.tsx",
                                                                lineNumber: 483,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/(doctor)/doctor/queue/page.tsx",
                                                        lineNumber: 481,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex-1 space-y-1",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex flex-wrap items-center gap-2",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                        className: "text-lg font-semibold text-foreground",
                                                                        children: currentPatient.patient?.name
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/(doctor)/doctor/queue/page.tsx",
                                                                        lineNumber: 487,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Badge"], {
                                                                        variant: "secondary",
                                                                        className: "text-xs",
                                                                        children: currentPatient.type === 'online' ? 'Video Consult' : 'In-Clinic'
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/(doctor)/doctor/queue/page.tsx",
                                                                        lineNumber: 488,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Badge"], {
                                                                        className: "bg-primary/10 text-primary border-primary/20 text-xs",
                                                                        children: [
                                                                            "Queue #",
                                                                            currentPatient.queueNumber ?? 1
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/app/(doctor)/doctor/queue/page.tsx",
                                                                        lineNumber: 491,
                                                                        columnNumber: 25
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/(doctor)/doctor/queue/page.tsx",
                                                                lineNumber: 486,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "text-xs text-muted-foreground",
                                                                children: [
                                                                    getAgeLabel(currentPatient.patient?.dateOfBirth),
                                                                    " yrs • ",
                                                                    getGenderLabel(currentPatient.patient?.gender)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/(doctor)/doctor/queue/page.tsx",
                                                                lineNumber: 495,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "text-xs text-muted-foreground",
                                                                children: [
                                                                    "Arrived ",
                                                                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$format$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["format"])(new Date(currentPatient.createdAt), 'p')
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/(doctor)/doctor/queue/page.tsx",
                                                                lineNumber: 498,
                                                                columnNumber: 23
                                                            }, this),
                                                            currentPatient.symptoms && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "text-sm text-muted-foreground mt-2",
                                                                children: [
                                                                    "Reason: ",
                                                                    currentPatient.symptoms
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/(doctor)/doctor/queue/page.tsx",
                                                                lineNumber: 502,
                                                                columnNumber: 25
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/(doctor)/doctor/queue/page.tsx",
                                                        lineNumber: 485,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/(doctor)/doctor/queue/page.tsx",
                                                lineNumber: 480,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex flex-wrap gap-2",
                                                children: [
                                                    currentPatient.status !== 'in-progress' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                                                        onClick: ()=>handleStartConsultation(currentPatient),
                                                        className: "gap-2",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$video$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Video$3e$__["Video"], {
                                                                className: "h-4 w-4"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/(doctor)/doctor/queue/page.tsx",
                                                                lineNumber: 512,
                                                                columnNumber: 25
                                                            }, this),
                                                            "Start Video Consult"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/(doctor)/doctor/queue/page.tsx",
                                                        lineNumber: 511,
                                                        columnNumber: 23
                                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                                                        onClick: ()=>{
                                                            setVideoRoomUrl(currentPatient.videoRoomUrl);
                                                            setShowVideo(true);
                                                        },
                                                        variant: "outline",
                                                        className: "gap-2",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$video$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Video$3e$__["Video"], {
                                                                className: "h-4 w-4"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/(doctor)/doctor/queue/page.tsx",
                                                                lineNumber: 517,
                                                                columnNumber: 25
                                                            }, this),
                                                            "Open Call"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/(doctor)/doctor/queue/page.tsx",
                                                        lineNumber: 516,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                                                        variant: "outline",
                                                        onClick: ()=>handleCallNext(),
                                                        className: "gap-2",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$bell$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Bell$3e$__["Bell"], {
                                                                className: "h-4 w-4"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/(doctor)/doctor/queue/page.tsx",
                                                                lineNumber: 522,
                                                                columnNumber: 23
                                                            }, this),
                                                            "Call Next"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/(doctor)/doctor/queue/page.tsx",
                                                        lineNumber: 521,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                                                        variant: "outline",
                                                        onClick: ()=>handleMessagePatient(currentPatient),
                                                        className: "gap-2",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$message$2d$circle$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__MessageCircle$3e$__["MessageCircle"], {
                                                                className: "h-4 w-4"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/(doctor)/doctor/queue/page.tsx",
                                                                lineNumber: 530,
                                                                columnNumber: 23
                                                            }, this),
                                                            "Message Patient"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/(doctor)/doctor/queue/page.tsx",
                                                        lineNumber: 525,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                                                        variant: "outline",
                                                        onClick: ()=>setNotesAppointment(currentPatient),
                                                        className: "gap-2",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__["FileText"], {
                                                                className: "h-4 w-4"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/(doctor)/doctor/queue/page.tsx",
                                                                lineNumber: 534,
                                                                columnNumber: 23
                                                            }, this),
                                                            "View Notes"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/(doctor)/doctor/queue/page.tsx",
                                                        lineNumber: 533,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                                                        onClick: ()=>handleCompleteConsultation(currentPatient),
                                                        className: "gap-2",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__["CheckCircle2"], {
                                                                className: "h-4 w-4"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/(doctor)/doctor/queue/page.tsx",
                                                                lineNumber: 538,
                                                                columnNumber: 23
                                                            }, this),
                                                            "Mark Done"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/(doctor)/doctor/queue/page.tsx",
                                                        lineNumber: 537,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/(doctor)/doctor/queue/page.tsx",
                                                lineNumber: 509,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/(doctor)/doctor/queue/page.tsx",
                                        lineNumber: 479,
                                        columnNumber: 17
                                    }, this) : hasQueue ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-center py-10 text-muted-foreground space-y-3",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__["Clock"], {
                                                className: "h-12 w-12 mx-auto opacity-40"
                                            }, void 0, false, {
                                                fileName: "[project]/app/(doctor)/doctor/queue/page.tsx",
                                                lineNumber: 545,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-sm",
                                                children: "No patient is active. Call the next patient to begin."
                                            }, void 0, false, {
                                                fileName: "[project]/app/(doctor)/doctor/queue/page.tsx",
                                                lineNumber: 546,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                                                size: "sm",
                                                className: "gap-2",
                                                onClick: ()=>handleCallNext(),
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$bell$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Bell$3e$__["Bell"], {
                                                        className: "h-4 w-4"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/(doctor)/doctor/queue/page.tsx",
                                                        lineNumber: 548,
                                                        columnNumber: 21
                                                    }, this),
                                                    "Call Next Patient"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/(doctor)/doctor/queue/page.tsx",
                                                lineNumber: 547,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/(doctor)/doctor/queue/page.tsx",
                                        lineNumber: 544,
                                        columnNumber: 17
                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-center py-10 text-muted-foreground space-y-3",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__["CheckCircle2"], {
                                                className: "h-12 w-12 mx-auto text-success"
                                            }, void 0, false, {
                                                fileName: "[project]/app/(doctor)/doctor/queue/page.tsx",
                                                lineNumber: 554,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-sm",
                                                children: "No patients in queue."
                                            }, void 0, false, {
                                                fileName: "[project]/app/(doctor)/doctor/queue/page.tsx",
                                                lineNumber: 555,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                                                size: "sm",
                                                className: "gap-2",
                                                onClick: ()=>handleOnDemand(true),
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$zap$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Zap$3e$__["Zap"], {
                                                        className: "h-4 w-4"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/(doctor)/doctor/queue/page.tsx",
                                                        lineNumber: 557,
                                                        columnNumber: 21
                                                    }, this),
                                                    "Go On-Demand"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/(doctor)/doctor/queue/page.tsx",
                                                lineNumber: 556,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/(doctor)/doctor/queue/page.tsx",
                                        lineNumber: 553,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/(doctor)/doctor/queue/page.tsx",
                                    lineNumber: 472,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/(doctor)/doctor/queue/page.tsx",
                            lineNumber: 463,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/(doctor)/doctor/queue/page.tsx",
                        lineNumber: 462,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                        initial: {
                            opacity: 0,
                            y: 8
                        },
                        animate: {
                            opacity: 1,
                            y: 0
                        },
                        transition: {
                            delay: 0.05
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Card"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CardHeader"], {
                                    className: "flex flex-row items-center justify-between",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CardTitle"], {
                                            className: "text-lg",
                                            children: "Waiting List"
                                        }, void 0, false, {
                                            fileName: "[project]/app/(doctor)/doctor/queue/page.tsx",
                                            lineNumber: 569,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Badge"], {
                                            variant: "secondary",
                                            children: waitingPatients.length
                                        }, void 0, false, {
                                            fileName: "[project]/app/(doctor)/doctor/queue/page.tsx",
                                            lineNumber: 570,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/(doctor)/doctor/queue/page.tsx",
                                    lineNumber: 568,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CardContent"], {
                                    className: "space-y-4",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "relative",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__["Search"], {
                                                    className: "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/(doctor)/doctor/queue/page.tsx",
                                                    lineNumber: 574,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Input"], {
                                                    placeholder: "Search patient in queue...",
                                                    value: searchQuery,
                                                    onChange: (e)=>setSearchQuery(e.target.value),
                                                    className: "pl-10"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/(doctor)/doctor/queue/page.tsx",
                                                    lineNumber: 575,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/(doctor)/doctor/queue/page.tsx",
                                            lineNumber: 573,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex flex-wrap gap-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                                                    size: "sm",
                                                    variant: sortBy === 'arrival' ? 'default' : 'outline',
                                                    onClick: ()=>setSortBy('arrival'),
                                                    children: "Arrival Order"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/(doctor)/doctor/queue/page.tsx",
                                                    lineNumber: 584,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                                                    size: "sm",
                                                    variant: sortBy === 'time' ? 'default' : 'outline',
                                                    onClick: ()=>setSortBy('time'),
                                                    children: "By Time"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/(doctor)/doctor/queue/page.tsx",
                                                    lineNumber: 591,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/(doctor)/doctor/queue/page.tsx",
                                            lineNumber: 583,
                                            columnNumber: 15
                                        }, this),
                                        loading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "space-y-3",
                                            children: [
                                                1,
                                                2,
                                                3
                                            ].map((i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$skeleton$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Skeleton"], {
                                                    className: "h-20 rounded-xl"
                                                }, i, false, {
                                                    fileName: "[project]/app/(doctor)/doctor/queue/page.tsx",
                                                    lineNumber: 603,
                                                    columnNumber: 21
                                                }, this))
                                        }, void 0, false, {
                                            fileName: "[project]/app/(doctor)/doctor/queue/page.tsx",
                                            lineNumber: 601,
                                            columnNumber: 17
                                        }, this) : waitingPatients.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "text-sm text-muted-foreground text-center py-6",
                                            children: "No patients waiting"
                                        }, void 0, false, {
                                            fileName: "[project]/app/(doctor)/doctor/queue/page.tsx",
                                            lineNumber: 607,
                                            columnNumber: 17
                                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "space-y-3",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                                                children: waitingPatients.map((apt, index)=>{
                                                    const waitMinutes = Math.max(waitMinutesPerPatient, (index + 1) * waitMinutesPerPatient);
                                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                                                        initial: {
                                                            opacity: 0,
                                                            y: 10
                                                        },
                                                        animate: {
                                                            opacity: 1,
                                                            y: 0
                                                        },
                                                        exit: {
                                                            opacity: 0,
                                                            y: -10
                                                        },
                                                        className: "group rounded-xl border border-border bg-background p-3 hover:border-primary/20 transition-colors",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex items-start gap-3",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "text-xs text-muted-foreground w-6",
                                                                        children: [
                                                                            "#",
                                                                            index + 1
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/app/(doctor)/doctor/queue/page.tsx",
                                                                        lineNumber: 624,
                                                                        columnNumber: 29
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$avatar$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Avatar"], {
                                                                        className: "h-10 w-10",
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$avatar$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AvatarImage"], {
                                                                                src: apt.patient?.avatar
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/app/(doctor)/doctor/queue/page.tsx",
                                                                                lineNumber: 626,
                                                                                columnNumber: 31
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$avatar$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AvatarFallback"], {
                                                                                children: apt.patient?.name?.[0]
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/app/(doctor)/doctor/queue/page.tsx",
                                                                                lineNumber: 627,
                                                                                columnNumber: 31
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/app/(doctor)/doctor/queue/page.tsx",
                                                                        lineNumber: 625,
                                                                        columnNumber: 29
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "flex-1 min-w-0",
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                className: "flex items-center gap-2",
                                                                                children: [
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                                        className: "text-sm font-semibold text-foreground truncate",
                                                                                        children: apt.patient?.name
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/app/(doctor)/doctor/queue/page.tsx",
                                                                                        lineNumber: 631,
                                                                                        columnNumber: 33
                                                                                    }, this),
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Badge"], {
                                                                                        variant: "secondary",
                                                                                        className: "text-[10px]",
                                                                                        children: apt.type === 'online' ? 'Video' : 'In-Clinic'
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/app/(doctor)/doctor/queue/page.tsx",
                                                                                        lineNumber: 634,
                                                                                        columnNumber: 33
                                                                                    }, this)
                                                                                ]
                                                                            }, void 0, true, {
                                                                                fileName: "[project]/app/(doctor)/doctor/queue/page.tsx",
                                                                                lineNumber: 630,
                                                                                columnNumber: 31
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                                className: "text-xs text-muted-foreground",
                                                                                children: [
                                                                                    getAgeLabel(apt.patient?.dateOfBirth),
                                                                                    " yrs • ",
                                                                                    getGenderLabel(apt.patient?.gender)
                                                                                ]
                                                                            }, void 0, true, {
                                                                                fileName: "[project]/app/(doctor)/doctor/queue/page.tsx",
                                                                                lineNumber: 638,
                                                                                columnNumber: 31
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                                className: "text-xs text-muted-foreground line-clamp-1",
                                                                                children: [
                                                                                    "Reason: ",
                                                                                    apt.symptoms || 'General consultation'
                                                                                ]
                                                                            }, void 0, true, {
                                                                                fileName: "[project]/app/(doctor)/doctor/queue/page.tsx",
                                                                                lineNumber: 641,
                                                                                columnNumber: 31
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                className: "flex flex-wrap items-center gap-3 mt-2 text-xs text-muted-foreground",
                                                                                children: [
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                        className: "flex items-center gap-1",
                                                                                        children: [
                                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__["Clock"], {
                                                                                                className: "h-3 w-3"
                                                                                            }, void 0, false, {
                                                                                                fileName: "[project]/app/(doctor)/doctor/queue/page.tsx",
                                                                                                lineNumber: 646,
                                                                                                columnNumber: 35
                                                                                            }, this),
                                                                                            "Arrived ",
                                                                                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$format$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["format"])(new Date(apt.createdAt), 'p')
                                                                                        ]
                                                                                    }, void 0, true, {
                                                                                        fileName: "[project]/app/(doctor)/doctor/queue/page.tsx",
                                                                                        lineNumber: 645,
                                                                                        columnNumber: 33
                                                                                    }, this),
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                        className: "flex items-center gap-1",
                                                                                        children: [
                                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$bell$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Bell$3e$__["Bell"], {
                                                                                                className: "h-3 w-3"
                                                                                            }, void 0, false, {
                                                                                                fileName: "[project]/app/(doctor)/doctor/queue/page.tsx",
                                                                                                lineNumber: 650,
                                                                                                columnNumber: 35
                                                                                            }, this),
                                                                                            "Est wait ",
                                                                                            waitMinutes,
                                                                                            " min"
                                                                                        ]
                                                                                    }, void 0, true, {
                                                                                        fileName: "[project]/app/(doctor)/doctor/queue/page.tsx",
                                                                                        lineNumber: 649,
                                                                                        columnNumber: 33
                                                                                    }, this)
                                                                                ]
                                                                            }, void 0, true, {
                                                                                fileName: "[project]/app/(doctor)/doctor/queue/page.tsx",
                                                                                lineNumber: 644,
                                                                                columnNumber: 31
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/app/(doctor)/doctor/queue/page.tsx",
                                                                        lineNumber: 629,
                                                                        columnNumber: 29
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/(doctor)/doctor/queue/page.tsx",
                                                                lineNumber: 623,
                                                                columnNumber: 27
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "mt-3 flex flex-wrap gap-2 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                                                                        size: "sm",
                                                                        className: "gap-1.5",
                                                                        onClick: ()=>handleStartConsultation(apt),
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$video$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Video$3e$__["Video"], {
                                                                                className: "h-3.5 w-3.5"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/app/(doctor)/doctor/queue/page.tsx",
                                                                                lineNumber: 658,
                                                                                columnNumber: 31
                                                                            }, this),
                                                                            "Start Video"
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/app/(doctor)/doctor/queue/page.tsx",
                                                                        lineNumber: 657,
                                                                        columnNumber: 29
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                                                                        size: "sm",
                                                                        variant: "outline",
                                                                        className: "gap-1.5",
                                                                        onClick: ()=>handleCallNext(apt),
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$bell$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Bell$3e$__["Bell"], {
                                                                                className: "h-3.5 w-3.5"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/app/(doctor)/doctor/queue/page.tsx",
                                                                                lineNumber: 662,
                                                                                columnNumber: 31
                                                                            }, this),
                                                                            "Call Next"
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/app/(doctor)/doctor/queue/page.tsx",
                                                                        lineNumber: 661,
                                                                        columnNumber: 29
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                                                                        size: "sm",
                                                                        variant: "outline",
                                                                        className: "gap-1.5",
                                                                        onClick: ()=>handleMessagePatient(apt),
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$message$2d$circle$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__MessageCircle$3e$__["MessageCircle"], {
                                                                                className: "h-3.5 w-3.5"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/app/(doctor)/doctor/queue/page.tsx",
                                                                                lineNumber: 666,
                                                                                columnNumber: 31
                                                                            }, this),
                                                                            "Message"
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/app/(doctor)/doctor/queue/page.tsx",
                                                                        lineNumber: 665,
                                                                        columnNumber: 29
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                                                                        size: "sm",
                                                                        variant: "outline",
                                                                        className: "gap-1.5",
                                                                        onClick: ()=>setNotesAppointment(apt),
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__["FileText"], {
                                                                                className: "h-3.5 w-3.5"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/app/(doctor)/doctor/queue/page.tsx",
                                                                                lineNumber: 670,
                                                                                columnNumber: 31
                                                                            }, this),
                                                                            "View Notes"
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/app/(doctor)/doctor/queue/page.tsx",
                                                                        lineNumber: 669,
                                                                        columnNumber: 29
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                                                                        size: "sm",
                                                                        variant: "ghost",
                                                                        className: "gap-1.5 text-success",
                                                                        onClick: ()=>handleCompleteConsultation(apt),
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__["CheckCircle2"], {
                                                                                className: "h-3.5 w-3.5"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/app/(doctor)/doctor/queue/page.tsx",
                                                                                lineNumber: 674,
                                                                                columnNumber: 31
                                                                            }, this),
                                                                            "Mark Done"
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/app/(doctor)/doctor/queue/page.tsx",
                                                                        lineNumber: 673,
                                                                        columnNumber: 29
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/(doctor)/doctor/queue/page.tsx",
                                                                lineNumber: 656,
                                                                columnNumber: 27
                                                            }, this)
                                                        ]
                                                    }, apt.id, true, {
                                                        fileName: "[project]/app/(doctor)/doctor/queue/page.tsx",
                                                        lineNumber: 616,
                                                        columnNumber: 25
                                                    }, this);
                                                })
                                            }, void 0, false, {
                                                fileName: "[project]/app/(doctor)/doctor/queue/page.tsx",
                                                lineNumber: 612,
                                                columnNumber: 19
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/app/(doctor)/doctor/queue/page.tsx",
                                            lineNumber: 611,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/(doctor)/doctor/queue/page.tsx",
                                    lineNumber: 572,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/(doctor)/doctor/queue/page.tsx",
                            lineNumber: 567,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/(doctor)/doctor/queue/page.tsx",
                        lineNumber: 566,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/(doctor)/doctor/queue/page.tsx",
                lineNumber: 461,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$doctor$2f$VideoConsultModal$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                open: showVideo,
                appointment: currentPatient,
                videoRoomUrl: videoRoomUrl,
                onClose: ()=>{
                    setShowVideo(false);
                    setVideoRoomUrl(undefined);
                },
                onEnd: (notes)=>{
                    setShowVideo(false);
                    setVideoRoomUrl(undefined);
                    handleCompleteConsultation(currentPatient ?? undefined, notes);
                },
                onSendPrescription: handleSendPrescription,
                onSendLab: handleSendLab,
                onSendCertificate: handleSendCertificate
            }, void 0, false, {
                fileName: "[project]/app/(doctor)/doctor/queue/page.tsx",
                lineNumber: 689,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Dialog"], {
                open: Boolean(notesAppointment),
                onOpenChange: (open)=>!open && setNotesAppointment(null),
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DialogContent"], {
                    className: "max-w-lg",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DialogHeader"], {
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DialogTitle"], {
                                children: "Patient Notes"
                            }, void 0, false, {
                                fileName: "[project]/app/(doctor)/doctor/queue/page.tsx",
                                lineNumber: 707,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/app/(doctor)/doctor/queue/page.tsx",
                            lineNumber: 706,
                            columnNumber: 11
                        }, this),
                        notesAppointment ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "space-y-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-3",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$avatar$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Avatar"], {
                                            className: "h-10 w-10",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$avatar$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AvatarImage"], {
                                                    src: notesAppointment.patient?.avatar
                                                }, void 0, false, {
                                                    fileName: "[project]/app/(doctor)/doctor/queue/page.tsx",
                                                    lineNumber: 713,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$avatar$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AvatarFallback"], {
                                                    children: notesAppointment.patient?.name?.[0]
                                                }, void 0, false, {
                                                    fileName: "[project]/app/(doctor)/doctor/queue/page.tsx",
                                                    lineNumber: 714,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/(doctor)/doctor/queue/page.tsx",
                                            lineNumber: 712,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "font-medium text-foreground",
                                                    children: notesAppointment.patient?.name
                                                }, void 0, false, {
                                                    fileName: "[project]/app/(doctor)/doctor/queue/page.tsx",
                                                    lineNumber: 717,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-xs text-muted-foreground",
                                                    children: [
                                                        notesAppointment.time,
                                                        " • ",
                                                        notesAppointment.type === 'online' ? 'Video' : 'In-Clinic'
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/(doctor)/doctor/queue/page.tsx",
                                                    lineNumber: 718,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/(doctor)/doctor/queue/page.tsx",
                                            lineNumber: 716,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/(doctor)/doctor/queue/page.tsx",
                                    lineNumber: 711,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "rounded-lg border border-border p-3",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-xs text-muted-foreground mb-1",
                                            children: "Chief complaint"
                                        }, void 0, false, {
                                            fileName: "[project]/app/(doctor)/doctor/queue/page.tsx",
                                            lineNumber: 724,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-sm text-foreground",
                                            children: notesAppointment.symptoms || 'No symptoms recorded yet.'
                                        }, void 0, false, {
                                            fileName: "[project]/app/(doctor)/doctor/queue/page.tsx",
                                            lineNumber: 725,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/(doctor)/doctor/queue/page.tsx",
                                    lineNumber: 723,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "rounded-lg border border-border p-3",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-xs text-muted-foreground mb-1",
                                            children: "Doctor notes"
                                        }, void 0, false, {
                                            fileName: "[project]/app/(doctor)/doctor/queue/page.tsx",
                                            lineNumber: 730,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-sm text-foreground",
                                            children: notesAppointment.notes || 'No notes added yet.'
                                        }, void 0, false, {
                                            fileName: "[project]/app/(doctor)/doctor/queue/page.tsx",
                                            lineNumber: 731,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/(doctor)/doctor/queue/page.tsx",
                                    lineNumber: 729,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex gap-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                                            variant: "outline",
                                            onClick: ()=>handleMessagePatient(notesAppointment),
                                            children: "Message Patient"
                                        }, void 0, false, {
                                            fileName: "[project]/app/(doctor)/doctor/queue/page.tsx",
                                            lineNumber: 736,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                                            onClick: ()=>handleStartConsultation(notesAppointment),
                                            children: "Start Consult"
                                        }, void 0, false, {
                                            fileName: "[project]/app/(doctor)/doctor/queue/page.tsx",
                                            lineNumber: 739,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/(doctor)/doctor/queue/page.tsx",
                                    lineNumber: 735,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/(doctor)/doctor/queue/page.tsx",
                            lineNumber: 710,
                            columnNumber: 13
                        }, this) : null
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/(doctor)/doctor/queue/page.tsx",
                    lineNumber: 705,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/(doctor)/doctor/queue/page.tsx",
                lineNumber: 704,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/(doctor)/doctor/queue/page.tsx",
        lineNumber: 422,
        columnNumber: 5
    }, this);
}
}),
];

//# sourceMappingURL=_323db9de._.js.map