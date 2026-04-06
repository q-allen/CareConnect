import { api, API_ENDPOINTS, ApiError } from "./api";
import { Doctor, Patient, ApiResponse, PaginatedResponse } from "@/types";
import { mapDoctorFromDetail, mapDoctorFromList } from "./mappers";

export interface DoctorProfileCompletionData {
  profile_photo?: File;
  bio?: string;
  languages_spoken?: string[];
  clinic_name?: string;
  clinic_address?: string;
  city?: string;
  consultation_fee_online?: number;
  consultation_fee_in_person?: number;
  weekly_schedule?: Record<string, { start: string; end: string; consultation_types?: string }>;
  is_on_demand?: boolean;
  specialty?: string;
  sub_specialties?: string[];
  years_of_experience?: number;
  is_profile_complete?: boolean;
  services?: string[];
  hmos?: string[];
}

export interface DoctorProfileCompletionResponse {
  is_profile_complete: boolean;
  specialty: string;
  clinic_name: string;
  city: string;
  consultation_fee_online: string;
  consultation_fee_in_person: string;
  is_on_demand: boolean;
}

export interface DoctorSlot {
  time: string;       // "HH:MM" slot start
  end_time: string;   // "HH:MM" slot end
  is_available: boolean;
  is_booked: boolean;
  slot_id: number | null;
}

export interface DoctorSlotsResponse {
  doctor_id: number;
  doctor_name: string;
  is_on_demand: boolean;
  is_available_now: boolean;
  date: string;
  slots: DoctorSlot[];
}

export interface DoctorSearchFilters {
  specialty?: string;
  name?: string;
  clinic?: string;
  location?: string;
  maxFee?: number;
  isAvailable?: boolean;
}

export interface DoctorEarnings {
  consultsToday: number;
  consultsWeek: number;
  revenueToday: number;
  revenueWeek: number;
  pendingPayouts: number;
  pendingAmount: number;
}

export const doctorService = {
  async getDoctors(
    filters?: DoctorSearchFilters,
    _page = 1,
    _limit = 10
  ): Promise<PaginatedResponse<Doctor>> {
    if (filters?.isAvailable) {
      const data = await api.get<Record<string, unknown>[]>(API_ENDPOINTS.DOCTOR_AVAILABLE);
      const mapped = data.map(mapDoctorFromList);
      return { data: mapped, success: true, page: 1, limit: mapped.length, total: mapped.length, totalPages: 1 };
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
      const data = await api.get<Record<string, unknown>[]>(`${API_ENDPOINTS.DOCTORS}${query}`);
      const mapped = data.map(mapDoctorFromList);
      return { data: mapped, success: true, page: 1, limit: mapped.length, total: mapped.length, totalPages: 1 };
    } catch {
      return { data: [], success: false, page: 1, limit: 0, total: 0, totalPages: 1 };
    }
  },

  async getDoctorById(id: string): Promise<ApiResponse<Doctor>> {
    try {
      const data = await api.get<Record<string, unknown>>(API_ENDPOINTS.DOCTOR_DETAIL(id));
      return { data: mapDoctorFromDetail(data), success: true };
    } catch {
      return { data: null as unknown as Doctor, success: false };
    }
  },

  async getTopDoctors(limit = 5): Promise<ApiResponse<Doctor[]>> {
    const res = await this.getDoctors(undefined, 1, limit);
    return { data: res.data.slice(0, limit), success: true };
  },

  async getDoctorsBySpecialty(specialty: string): Promise<ApiResponse<Doctor[]>> {
    const res = await this.getDoctors({ specialty });
    return { data: res.data, success: true };
  },

  /**
   * Fetch 30-min availability slots for a doctor on a specific date.
   * Calls GET /appointments/slots/<doctorId>?date=YYYY-MM-DD
   * Priority: explicit DoctorAvailableSlot rows > weekly_schedule auto-gen.
   * Booked slots have is_available=false and is_booked=true.
   */
  async getDoctorSlots(doctorId: string, date: string): Promise<ApiResponse<DoctorSlotsResponse>> {
    try {
      const data = await api.get<DoctorSlotsResponse>(
        `${API_ENDPOINTS.APPOINTMENT_SLOTS(doctorId)}?date=${date}`
      );
      return { data, success: true };
    } catch {
      return { data: null as unknown as DoctorSlotsResponse, success: false };
    }
  },

  async updateOnDemand(id: string, isOnDemand: boolean): Promise<ApiResponse<Doctor>> {
    try {
      const data = await api.patch<Record<string, unknown>>(API_ENDPOINTS.DOCTOR_DETAIL(id), { is_on_demand: isOnDemand });
      return { data: mapDoctorFromDetail(data), success: true };
    } catch (error) {
      // If caller passed a user id instead of profile id, resolve via list
      if (error instanceof ApiError && error.status === 404) {
        try {
          const list = await api.get<Record<string, unknown>[]>(API_ENDPOINTS.DOCTORS);
          const match = list.find((d) => String(d.user_id) === String(id));
          if (match) {
            const matchId = String(match.id);
            const data = await api.patch<Record<string, unknown>>(API_ENDPOINTS.DOCTOR_DETAIL(matchId), { is_on_demand: isOnDemand });
            return { data: mapDoctorFromDetail(data), success: true };
          }
        } catch {
          // fall through
        }
      }
      return { data: null as unknown as Doctor, success: false };
    }
  },

  async getMyPatients(): Promise<ApiResponse<Patient[]>> {
    try {
      const data = await api.get<Record<string, unknown>[]>(API_ENDPOINTS.DOCTOR_MY_PATIENTS);
      const { mapPatientFromDetail } = await import("./mappers");
      return { data: data.map(mapPatientFromDetail), success: true };
    } catch {
      return { data: [], success: false };
    }
  },

  async getEarnings(): Promise<ApiResponse<DoctorEarnings>> {
    try {
      const data = await api.get<{
        consults_today: number;
        consults_week: number;
        revenue_today: number;
        revenue_week: number;
        pending_payouts: number;
        pending_amount: number;
      }>(API_ENDPOINTS.DOCTOR_EARNINGS);
      return {
        data: {
          consultsToday: data.consults_today,
          consultsWeek: data.consults_week,
          revenueToday: data.revenue_today,
          revenueWeek: data.revenue_week,
          pendingPayouts: data.pending_payouts,
          pendingAmount: data.pending_amount,
        },
        success: true,
      };
    } catch {
      return { data: null as unknown as DoctorEarnings, success: false };
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
   */
  async completeDoctorProfile(
    data: DoctorProfileCompletionData
  ): Promise<ApiResponse<DoctorProfileCompletionResponse>> {
    try {
      let res: DoctorProfileCompletionResponse;
      if (data.profile_photo instanceof File) {
        // Use multipart when a photo file is included
        const form = new FormData();
        Object.entries(data).forEach(([key, val]) => {
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
        const baseUrl = (await import("./api")).getBaseUrl();
        const fetchRes = await fetch(`${baseUrl}${API_ENDPOINTS.DOCTOR_PROFILE_COMPLETE}`, {
          method: "PATCH",
          credentials: "include",
          body: form,
        });
        if (!fetchRes.ok) {
          const err = await fetchRes.json().catch(() => ({}));
          throw new Error(err.detail ?? "Failed to save profile.");
        }
        res = await fetchRes.json();
      } else {
        res = await api.patch<DoctorProfileCompletionResponse>(
          API_ENDPOINTS.DOCTOR_PROFILE_COMPLETE,
          data
        );
      }
      return { data: res, success: true };
    } catch (err: unknown) {
      return { data: null as unknown as DoctorProfileCompletionResponse, success: false, error: (err as Error)?.message ?? "Failed to save profile." };
    }
  },
};
