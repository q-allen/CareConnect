"use client";

/**
 * app/(doctor)/doctor/profile/complete/page.tsx
 *
 * Doctor onboarding wizard — 4 steps:
 *   Step 1 — Basic Info      (photo, bio, languages)
 *   Step 2 — Clinic & Fees   (clinic name/address/city, fees, services, HMOs)
 *   Step 3 — Schedule        (weekly hours + on-demand toggle)
 *   Step 4 — Specialty       (specialty, sub-specialties, years of experience)
 *
 * On mount: fetches GET /api/doctors/me/complete/ to pre-populate all inputs.
 * Each step PATCHes /api/doctors/me/complete/ to save progress.
 * Final step sets is_profile_complete=true → redirects to /doctor/dashboard.
 */

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  User, MapPin, DollarSign, Calendar, Stethoscope,
  ChevronRight, ChevronLeft, Check, Loader2, Plus, X,
  Camera, Clock, Zap,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuthStore } from "@/store";
import { useToast } from "@/hooks/use-toast";
import { doctorService, DoctorProfileCompletionData } from "@/services/doctorService";
import axiosClient from "@/services/axiosClient";
import { API_ENDPOINTS } from "@/services/api";
import { mapDoctorFromDetail } from "@/services/mappers";

const SPECIALTIES = [
  "General Medicine", "Internal Medicine", "Pediatrics", "OB-GYN",
  "Dermatology", "Cardiology", "Neurology", "Orthopedics",
  "ENT", "Ophthalmology", "Psychiatry", "Pulmonology",
  "Gastroenterology", "Endocrinology", "Urology", "Nephrology",
  "Oncology", "Rheumatology", "Surgery", "Dentistry", "Other",
];

const CITIES = [
  "Metro Manila", "Quezon City", "Makati", "Taguig", "Pasig",
  "Mandaluyong", "Cebu City", "Davao City", "Iloilo City",
  "Bacolod", "Cagayan de Oro", "Zamboanga City", "Baguio", "Other",
];

const LANGUAGES = ["Filipino", "English", "Cebuano", "Ilocano", "Hiligaynon", "Waray", "Other"];

const SERVICE_CHOICES = [
  "Medical Certificate", "Follow-up Consult", "Prescription Renewal",
  "Lab Result Interpretation", "Sick Leave Certificate", "Referral Letter",
  "Annual Physical Exam", "Teleconsult", "Home Visit", "Other",
];

const HMO_CHOICES = [
  "Maxicare", "Medicard", "PhilCare", "Intellicare",
  "Caritas Health Shield", "Pacific Cross", "Insular Health Care",
  "Avega", "EastWest Healthcare", "Other",
];

const WEEKDAYS = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];

const TOTAL_STEPS = 4;
const STEPS = [
  { label: "Basic Info",    icon: User },
  { label: "Clinic & Fees", icon: MapPin },
  { label: "Schedule",      icon: Calendar },
  { label: "Specialty",     icon: Stethoscope },
];

type DaySchedule = { start: string; end: string; enabled: boolean };

const defaultSchedule = (): Record<string, DaySchedule> =>
  Object.fromEntries(
    WEEKDAYS.map((d) => [d, { start: "09:00", end: "17:00", enabled: ["monday","tuesday","wednesday","thursday","friday"].includes(d) }])
  );

export default function DoctorProfileCompletePage() {
  const router = useRouter();
  const { user, setDoctorProfileComplete } = useAuthStore();
  const { toast } = useToast();

  const [step, setStep]   = useState(1);
  const [saving, setSaving] = useState(false);
  const [loadingProfile, setLoadingProfile] = useState(true);

  // Step 1 — Basic Info
  const [photoFile,    setPhotoFile]    = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string>("");
  const [bio,          setBio]          = useState("");
  const [languages,    setLanguages]    = useState<string[]>(["Filipino", "English"]);

  // Step 2 — Clinic & Fees + Services + HMOs
  const [clinicName,    setClinicName]    = useState("");
  const [clinicAddress, setClinicAddress] = useState("");
  const [city,          setCity]          = useState("");
  const [feeOnline,     setFeeOnline]     = useState("");
  const [feeInPerson,   setFeeInPerson]   = useState("");
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [selectedHmos,     setSelectedHmos]     = useState<string[]>([]);

  // Step 3 — Schedule
  const [schedule,   setSchedule]   = useState<Record<string, DaySchedule>>(defaultSchedule());
  const [isOnDemand, setIsOnDemand] = useState(false);

  // Step 4 — Specialty
  const [specialty,      setSpecialty]      = useState("");
  const [subInput,       setSubInput]       = useState("");
  const [subSpecialties, setSubSpecialties] = useState<string[]>([]);
  const [yearsExp,       setYearsExp]       = useState("");

  // ── Pre-populate from existing profile ──────────────────────────────────
  useEffect(() => {
    const load = async () => {
      try {
        const res = await axiosClient.get(API_ENDPOINTS.DOCTOR_PROFILE_COMPLETE);
        const d = mapDoctorFromDetail(res.data);

        if (d.avatar) setPhotoPreview(d.avatar);
        if (d.bio) setBio(d.bio);
        if (d.languages?.length) setLanguages(d.languages);

        if (d.hospital) setClinicName(d.hospital);
        if (d.clinicAddress) setClinicAddress(d.clinicAddress);
        if (d.location) setCity(d.location);
        if (d.onlineConsultationFee) setFeeOnline(String(d.onlineConsultationFee));
        if (d.consultationFee) setFeeInPerson(String(d.consultationFee));
        if (d.services?.length) setSelectedServices(d.services);
        if (d.hmoAccepted?.length) setSelectedHmos(d.hmoAccepted);

        if (d.weeklySchedule && Object.keys(d.weeklySchedule).length > 0) {
          setSchedule((prev) => {
            const next = { ...prev };
            WEEKDAYS.forEach((day) => {
              const entry = d.weeklySchedule![day];
              if (entry) {
                next[day] = { start: entry.start, end: entry.end, enabled: true };
              } else {
                next[day] = { ...prev[day], enabled: false };
              }
            });
            return next;
          });
        }
        if (d.isOnDemand !== undefined) setIsOnDemand(Boolean(d.isOnDemand));

        if (d.specialty) setSpecialty(d.specialty);
        if (d.specialties?.length) setSubSpecialties(d.specialties);
        if (d.experience) setYearsExp(String(d.experience));
      } catch {
        // Non-fatal — wizard still works with empty defaults
      } finally {
        setLoadingProfile(false);
      }
    };
    load();
  }, []);

  const progress = ((step - 1) / TOTAL_STEPS) * 100;

  // ── Validation ────────────────────────────────────────────────────────────
  const step2Valid = clinicName.trim() && (feeOnline || feeInPerson);
  const step4Valid = specialty;

  // ── Photo handler ─────────────────────────────────────────────────────────
  const handlePhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setPhotoFile(file);
    setPhotoPreview(URL.createObjectURL(file));
  };

  // ── Build weekly_schedule payload (only enabled days) ────────────────────
  const buildWeeklySchedule = () =>
    Object.fromEntries(
      Object.entries(schedule)
        .filter(([, v]) => v.enabled)
        .map(([day, v]) => [day, { start: v.start, end: v.end }])
    );

  // ── Save helpers ──────────────────────────────────────────────────────────
  const saveStep = async (data: DoctorProfileCompletionData) => {
    setSaving(true);
    const res = await doctorService.completeDoctorProfile(data);
    setSaving(false);
    if (!res.success) {
      toast({ title: "Error", description: res.error, variant: "destructive" });
      return false;
    }
    return true;
  };

  const handleNext = async () => {
    let ok = false;
    if (step === 1) {
      ok = await saveStep({
        bio,
        languages_spoken: languages,
        ...(photoFile ? { profile_photo: photoFile } : {}),
      });
    } else if (step === 2) {
      ok = await saveStep({
        clinic_name:                clinicName.trim(),
        clinic_address:             clinicAddress.trim(),
        city,
        consultation_fee_online:    feeOnline   ? Number(feeOnline)   : undefined,
        consultation_fee_in_person: feeInPerson ? Number(feeInPerson) : undefined,
        services: selectedServices,
        hmos:     selectedHmos,
      });
    } else if (step === 3) {
      ok = await saveStep({
        weekly_schedule: buildWeeklySchedule(),
        is_on_demand:    isOnDemand,
      });
    } else {
      // Final step — mark complete
      ok = await saveStep({
        specialty,
        sub_specialties:     subSpecialties,
        years_of_experience: yearsExp ? Number(yearsExp) : undefined,
        is_profile_complete: true,
      });
      if (ok) {
        setDoctorProfileComplete(true);
        toast({ title: "Profile complete! 🎉", description: "Your profile is now live." });
        router.replace("/doctor/dashboard");
        return;
      }
    }
    if (ok) setStep((s) => s + 1);
  };

  const toggleLanguage = (lang: string) =>
    setLanguages((prev) =>
      prev.includes(lang) ? prev.filter((l) => l !== lang) : [...prev, lang]
    );

  const toggleDay = (day: string) =>
    setSchedule((prev) => ({
      ...prev,
      [day]: { ...prev[day], enabled: !prev[day].enabled },
    }));

  const updateDayTime = (day: string, field: "start" | "end", val: string) =>
    setSchedule((prev) => ({ ...prev, [day]: { ...prev[day], [field]: val } }));

  const addSubSpecialty = () => {
    const val = subInput.trim();
    if (val && !subSpecialties.includes(val)) setSubSpecialties([...subSpecialties, val]);
    setSubInput("");
  };

  const initials = `${user?.firstName?.[0] ?? ""}${user?.lastName?.[0] ?? ""}`.toUpperCase() || "DR";

  if (loadingProfile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/10 flex items-center justify-center p-4">
      <div className="w-full max-w-xl space-y-6">

        {/* Header */}
        <div className="text-center space-y-1">
          <h1 className="text-2xl font-bold text-foreground">Complete Your Doctor Profile</h1>
          <p className="text-sm text-muted-foreground">
            Complete your profile to start consulting patients on CareConnect
          </p>
        </div>

        {/* Step indicators */}
        <div className="flex items-center justify-between px-2">
          {STEPS.map((s, i) => {
            const n = i + 1;
            const done    = step > n;
            const current = step === n;
            return (
              <div key={s.label} className="flex flex-col items-center gap-1 flex-1">
                <div className={`h-9 w-9 rounded-full flex items-center justify-center text-sm font-semibold border-2 transition-colors ${
                  done    ? "bg-primary border-primary text-primary-foreground" :
                  current ? "border-primary text-primary bg-primary/10" :
                            "border-muted text-muted-foreground"
                }`}>
                  {done ? <Check className="h-4 w-4" /> : n}
                </div>
                <span className={`text-[11px] text-center ${current ? "text-primary font-medium" : "text-muted-foreground"}`}>
                  {s.label}
                </span>
              </div>
            );
          })}
        </div>

        <Progress value={progress} className="h-1.5" />

        {/* Step cards */}
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.2 }}
          >
            {/* ── Step 1: Basic Info ── */}
            {step === 1 && (
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center gap-2">
                    <User className="h-4 w-4 text-primary" /> Basic Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Photo */}
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <Avatar className="h-20 w-20">
                        <AvatarImage src={photoPreview} />
                        <AvatarFallback className="text-xl">{initials}</AvatarFallback>
                      </Avatar>
                      <label className="absolute bottom-0 right-0 h-7 w-7 bg-primary text-primary-foreground rounded-full flex items-center justify-center cursor-pointer shadow">
                        <Camera className="h-3.5 w-3.5" />
                        <input type="file" accept="image/*" className="hidden" onChange={handlePhoto} aria-label="Upload profile photo" />
                      </label>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Profile Photo</p>
                      <p className="text-xs text-muted-foreground">Builds patient trust</p>
                    </div>
                  </div>

                  {/* Bio */}
                  <div className="space-y-1.5">
                    <Label>Professional Bio</Label>
                    <Textarea
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                      placeholder="Brief professional summary shown to patients..."
                      rows={3}
                    />
                  </div>

                  {/* Languages */}
                  <div className="space-y-1.5">
                    <Label>Languages Spoken</Label>
                    <div className="flex flex-wrap gap-2">
                      {LANGUAGES.map((lang) => (
                        <button
                          key={lang}
                          type="button"
                          onClick={() => toggleLanguage(lang)}
                          className={`px-3 py-1 rounded-full text-xs border transition-colors ${
                            languages.includes(lang)
                              ? "bg-primary text-primary-foreground border-primary"
                              : "border-input text-muted-foreground hover:border-primary"
                          }`}
                        >
                          {lang}
                        </button>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* ── Step 2: Clinic & Fees + Services + HMOs ── */}
            {step === 2 && (
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-primary" /> Clinic, Fees & Services
                  </CardTitle>
                  <p className="text-xs text-muted-foreground">Required — at least one fee must be set</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-1.5">
                    <Label>Clinic / Hospital Name *</Label>
                    <Input value={clinicName} onChange={(e) => setClinicName(e.target.value)} placeholder="e.g. Makati Medical Center" />
                  </div>
                  <div className="space-y-1.5">
                    <Label>Clinic Address</Label>
                    <Input value={clinicAddress} onChange={(e) => setClinicAddress(e.target.value)} placeholder="Full street address" />
                  </div>
                  <div className="space-y-1.5">
                    <Label>City</Label>
                    <select
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                      aria-label="City"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                    >
                      <option value="">Select city...</option>
                      {CITIES.map((c) => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1.5">
                      <Label>Online Fee (PHP)</Label>
                      <div className="relative">
                        <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input className="pl-9" type="number" min="0" value={feeOnline} onChange={(e) => setFeeOnline(e.target.value)} placeholder="500" />
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <Label>In-Person Fee (PHP)</Label>
                      <div className="relative">
                        <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input className="pl-9" type="number" min="0" value={feeInPerson} onChange={(e) => setFeeInPerson(e.target.value)} placeholder="400" />
                      </div>
                    </div>
                  </div>

                  {/* Services */}
                  <div className="space-y-1.5">
                    <Label className="flex items-center gap-1.5">
                      <Plus className="h-3.5 w-3.5 text-primary" /> Services Offered
                    </Label>
                    <div className="flex flex-wrap gap-2">
                      {SERVICE_CHOICES.map((s) => {
                        const active = selectedServices.includes(s);
                        return (
                          <button
                            key={s}
                            type="button"
                            onClick={() =>
                              setSelectedServices((prev) =>
                                active ? prev.filter((x) => x !== s) : [...prev, s]
                              )
                            }
                            className={`px-3 py-1 rounded-full text-xs font-medium border transition-colors ${
                              active
                                ? "bg-primary text-primary-foreground border-primary"
                                : "bg-background text-muted-foreground border-border hover:border-primary/50"
                            }`}
                          >
                            {active && <span className="mr-1">✓</span>}{s}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* HMOs */}
                  <div className="space-y-1.5">
                    <Label className="flex items-center gap-1.5">
                      <Plus className="h-3.5 w-3.5 text-primary" /> HMO Accepted
                    </Label>
                    <div className="flex flex-wrap gap-2">
                      {HMO_CHOICES.map((h) => {
                        const active = selectedHmos.includes(h);
                        return (
                          <button
                            key={h}
                            type="button"
                            onClick={() =>
                              setSelectedHmos((prev) =>
                                active ? prev.filter((x) => x !== h) : [...prev, h]
                              )
                            }
                            className={`px-3 py-1 rounded-full text-xs font-medium border transition-colors ${
                              active
                                ? "bg-primary/10 text-primary border-primary/40"
                                : "bg-background text-muted-foreground border-border hover:border-primary/50"
                            }`}
                          >
                            {active && <span className="mr-1">✓</span>}{h}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* ── Step 3: Schedule ── */}
            {step === 3 && (
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-primary" /> Weekly Schedule
                  </CardTitle>
                  <p className="text-xs text-muted-foreground">Set your recurring availability hours</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* On-demand toggle */}
                  <div className="flex items-center justify-between p-3 bg-primary/5 rounded-xl border border-primary/20">
                    <div className="flex items-center gap-2">
                      <Zap className="h-4 w-4 text-primary" />
                      <div>
                        <p className="text-sm font-medium">On-Demand Mode</p>
                        <p className="text-xs text-muted-foreground">Show "Available Now" badge to patients</p>
                      </div>
                    </div>
                    <Switch checked={isOnDemand} onCheckedChange={setIsOnDemand} />
                  </div>

                  {/* Day schedule */}
                  <div className="space-y-2">
                    {WEEKDAYS.map((day) => (
                      <div key={day} className={`flex items-center gap-3 p-2 rounded-lg border transition-colors ${
                        schedule[day].enabled ? "border-primary/30 bg-primary/5" : "border-input opacity-60"
                      }`}>
                        <Switch
                          checked={schedule[day].enabled}
                          onCheckedChange={() => toggleDay(day)}
                        />
                        <span className="text-sm font-medium w-24 capitalize">{day}</span>
                        {schedule[day].enabled && (
                          <div className="flex items-center gap-2 flex-1">
                            <Clock className="h-3.5 w-3.5 text-muted-foreground" />
                            <Input
                              type="time" className="h-8 text-xs w-28"
                              value={schedule[day].start}
                              onChange={(e) => updateDayTime(day, "start", e.target.value)}
                            />
                            <span className="text-xs text-muted-foreground">to</span>
                            <Input
                              type="time" className="h-8 text-xs w-28"
                              value={schedule[day].end}
                              onChange={(e) => updateDayTime(day, "end", e.target.value)}
                            />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* ── Step 4: Specialty ── */}
            {step === 4 && (
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center gap-2">
                    <Stethoscope className="h-4 w-4 text-primary" /> Specialty & Experience
                  </CardTitle>
                  <p className="text-xs text-muted-foreground">Required to appear in patient search</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-1.5">
                    <Label>Primary Specialty *</Label>
                    <select
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                      aria-label="Primary Specialty"
                      value={specialty}
                      onChange={(e) => setSpecialty(e.target.value)}
                    >
                      <option value="">Select specialty...</option>
                      {SPECIALTIES.map((s) => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <Label>Sub-Specialties</Label>
                    <div className="flex gap-2">
                      <Input
                        value={subInput}
                        onChange={(e) => setSubInput(e.target.value)}
                        placeholder="e.g. Neonatology"
                        onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addSubSpecialty(); } }}
                      />
                      <Button type="button" variant="outline" size="icon" onClick={addSubSpecialty}>
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    {subSpecialties.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mt-1">
                        {subSpecialties.map((s) => (
                          <Badge key={s} variant="secondary" className="gap-1">
                            {s}
                            <button aria-label={`Remove ${s}`} onClick={() => setSubSpecialties(subSpecialties.filter((x) => x !== s))}>
                              <X className="h-3 w-3" />
                            </button>
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="space-y-1.5">
                    <Label>Years of Experience</Label>
                    <Input
                      type="number" min="0" max="60"
                      value={yearsExp}
                      onChange={(e) => setYearsExp(e.target.value)}
                      placeholder="e.g. 10"
                    />
                  </div>

                  <div className="p-3 bg-muted/50 rounded-xl text-xs text-muted-foreground space-y-1">
                    <p className="font-medium text-foreground">PRC License Reminder</p>
                    <p>Your PRC license number was submitted during registration. An admin will verify it before your profile goes live in patient search.</p>
                  </div>
                </CardContent>
              </Card>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            onClick={() => setStep((s) => s - 1)}
            disabled={step === 1 || saving}
            className="gap-2"
          >
            <ChevronLeft className="h-4 w-4" /> Back
          </Button>

          <div className="flex items-center gap-3">
            {step < TOTAL_STEPS && (
              <Button
                variant="ghost"
                onClick={() => setStep((s) => s + 1)}
                disabled={saving}
                className="text-muted-foreground"
              >
                Skip
              </Button>
            )}
            <Button
              onClick={handleNext}
              disabled={(step === 2 && !step2Valid) || (step === 4 && !step4Valid) || saving}
              className="gap-2 min-w-[120px]"
            >
              {saving ? (
                <><Loader2 className="h-4 w-4 animate-spin" /> Saving...</>
              ) : step === TOTAL_STEPS ? (
                <><Check className="h-4 w-4" /> Finish</>
              ) : (
                <>Next <ChevronRight className="h-4 w-4" /></>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
