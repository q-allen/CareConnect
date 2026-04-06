"use client";

import { useEffect, useRef, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { format } from "date-fns";
import {
  Video, PhoneOff, ArrowLeft, Loader2, AlertCircle, XCircle, RefreshCw,
  Radio, FileText, BadgeCheck, CreditCard, User, Mail, Phone, Calendar,
  Clock, MessageCircle, Stethoscope, FileDown, CheckCircle2, FlaskConical,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { useAuthStore } from "@/store";
import { appointmentService } from "@/services/appointmentService";
import { Appointment } from "@/types";
import { getBaseUrl } from "@/services/api";
import LabRequestForm from "@/components/records/LabRequestForm";

/**
 * Enhanced Doctor Appointment Detail Page
 * 
 * UX Improvements:
 * - Prominent patient information card at the top (avatar, name, age, sex, contact)\n * - Clear reason for consultation display\n * - Visual status timeline\n * - Payment status with clear badges\n * - Video consultation controls with live indicators\n * - Document sharing section\n * - Consultation notes editor\n * - Quick action buttons (Message, Mark No-Show, Refund)\n */
function getJitsiUrl(videoRoomUrl: string, displayName: string): string {
  const domain = process.env.NEXT_PUBLIC_JITSI_DOMAIN ?? "meet.jit.si";
  const roomName = videoRoomUrl.split("#")[0].split("/").pop() ?? videoRoomUrl;
  const encodedName = encodeURIComponent(displayName);
  return (
    `https://${domain}/${roomName}` +
    `#userInfo.displayName="${encodedName}"` +
    `&config.prejoinPageEnabled=false` +
    `&config.startWithAudioMuted=false` +
    `&config.startWithVideoMuted=false` +
    `&config.disableDeepLinking=true`
  );
}

export default function DoctorAppointmentDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const { toast } = useToast();
  const { user } = useAuthStore();

  const [appointment, setAppointment] = useState<Appointment | null>(null);
  const [loading, setLoading] = useState(true);
  const [starting, setStarting] = useState(false);
  const [ending, setEnding] = useState(false);
  const [roomLive, setRoomLive] = useState(false);
  const [videoRoomUrl, setVideoRoomUrl] = useState<string | null>(null);
  const startedAt = useRef<Date | null>(null);
  const [refundOpen, setRefundOpen] = useState(false);
  const [refundReason, setRefundReason] = useState("");
  const [isRefunding, setIsRefunding] = useState(false);
  const [consultNotes, setConsultNotes] = useState("");
  const [consultSummary, setConsultSummary] = useState("");

  useEffect(() => {
    if (!id) return;
    appointmentService.getAppointmentById(id).then((res) => {
      if (res.success) {
        setAppointment(res.data);
        setConsultNotes(res.data.consultNotes ?? "");
        setConsultSummary(res.data.consultSummary ?? "");
        if (res.data.status === "in_progress" && res.data.videoRoomUrl) {
          setRoomLive(true);
          setVideoRoomUrl(res.data.videoRoomUrl);
          if (!startedAt.current) startedAt.current = new Date();
        }
      }
      setLoading(false);
    });
  }, [id]);

  // WebSocket for real-time updates
  useEffect(() => {
    if (!id) return;
    const base = getBaseUrl();
    if (!base) return;
    const url = new URL(base);
    url.protocol = url.protocol === "https:" ? "wss:" : "ws:";
    const ws = new WebSocket(`${url.toString().replace(/\/$/, "")}/ws/appointments/${id}/`);
    ws.onmessage = (e) => {
      try {
        const payload = JSON.parse(e.data);
        if (payload.type === "status.changed") {
          setAppointment((prev) => prev ? { ...prev, status: payload.status } : prev);
        }
      } catch { /* ignore */ }
    };
    return () => ws.close();
  }, [id]);

  const handleRefundAndCancel = async () => {
    if (!appointment) return;
    setIsRefunding(true);
    try {
      const res = await appointmentService.requestRefund(appointment.id, refundReason);
      if (res.success) {
        const refundData = res.data as Appointment & { refund_issued?: boolean; refund_note?: string };
        const refundIssued = refundData.refund_issued ?? false;
        const refundNote = refundData.refund_note ?? "Appointment cancelled";
        setAppointment(res.data);
        setRefundOpen(false);
        toast({
          title: refundIssued ? "Refund processed & appointment cancelled" : "Appointment cancelled",
          description: refundNote,
        });
      }
    } catch (err) {
      toast({ title: "Error", description: err instanceof Error ? err.message : "Unknown error", variant: "destructive" });
    } finally {
      setIsRefunding(false);
      setRefundReason("");
    }
  };

  const handleStartVideo = async () => {
    if (!appointment) return;
    const alreadyInProgress = appointment.status === "in_progress" || appointment.status === "in-progress";
    if (alreadyInProgress && appointment.videoRoomUrl) {
      setVideoRoomUrl(appointment.videoRoomUrl);
      setRoomLive(true);
      if (!startedAt.current) startedAt.current = new Date();
      return;
    }

    setStarting(true);
    try {
      const res = await appointmentService.startVideoConsult(appointment.id);
      if (res.success) {
        setAppointment(res.data.appointment);
        setVideoRoomUrl(res.data.videoRoomUrl);
        setRoomLive(true);
        startedAt.current = new Date();
        toast({
          title: "Room created ✅",
          description: "Patient has been notified and can now join the call.",
        });
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Unknown error";
      const isNotToday = msg.toLowerCase().includes("scheduled date");
      toast({
        title: isNotToday ? "Too early to start" : "Failed to start video",
        description: isNotToday
          ? `This appointment is scheduled for ${appointment.date}. You can only start the video on that day.`
          : msg,
        variant: "destructive",
      });
    } finally {
      setStarting(false);
    }
  };

  const handleEndConsultation = async () => {
    if (!appointment) return;
    setEnding(true);
    try {
      const durationSec = startedAt.current
        ? Math.round((Date.now() - startedAt.current.getTime()) / 1000)
        : undefined;
      const participants = [
        user?.name ?? "Doctor",
        appointment.patient?.name ?? "Patient",
      ].filter(Boolean) as string[];
      const res = await appointmentService.endConsultation(appointment.id, {
        durationSeconds: durationSec,
        participants,
        consultNotes,
        consultSummary,
      });
      if (res.success) {
        setAppointment(res.data);
        setRoomLive(false);
        setVideoRoomUrl(null);
        toast({ title: "Consultation completed", description: "Records have been saved." });
      }
    } catch (err) {
      toast({ title: "Error", description: err instanceof Error ? err.message : "Unknown error", variant: "destructive" });
    } finally {
      setEnding(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto space-y-4 p-6">
        <Skeleton className="h-10 w-48" />
        <Skeleton className="h-64 rounded-2xl" />
      </div>
    );
  }

  if (!appointment) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-3 text-muted-foreground">
        <AlertCircle className="h-10 w-10" />
        <p>Appointment not found.</p>
        <Button variant="outline" onClick={() => router.back()}>Go Back</Button>
      </div>
    );
  }

  const isOnline = appointment.type === "online" || appointment.type === "on_demand";
  const isInProgress = appointment.status === "in_progress" || appointment.status === "in-progress";
  const isCompleted = appointment.status === "completed";
  const isCancelled = appointment.status === "cancelled";
  const today = new Date().toISOString().split("T")[0];
  const isToday = appointment.date === today;
  const canStart = isOnline && ["confirmed", "pending"].includes(appointment.status) && !roomLive && isToday;
  const isScheduledFuture = isOnline && ["confirmed", "pending"].includes(appointment.status) && !isToday;
  const canRefundCancel = appointment.status === "confirmed" && appointment.date >= today;

  // Patient info - handle booked-for-other scenario
  const patientName = appointment.bookedForRelationship !== "self" && appointment.bookedForName
    ? appointment.bookedForName
    : appointment.patient?.name ?? "Patient";
  const patientAge = appointment.bookedForRelationship !== "self" && appointment.bookedForAge
    ? appointment.bookedForAge
    : appointment.patient?.dateOfBirth
    ? Math.floor((Date.now() - new Date(appointment.patient.dateOfBirth).getTime()) / (365.25 * 24 * 60 * 60 * 1000))
    : null;
  const patientGender = appointment.bookedForRelationship !== "self" && appointment.bookedForGender
    ? appointment.bookedForGender
    : appointment.patient?.gender ?? "";

  return (
    <div className="max-w-4xl mx-auto space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold">Appointment Details</h1>
          <p className="text-sm text-muted-foreground">
            {format(new Date(appointment.date), "EEEE, MMMM d, yyyy")} at {appointment.time}
          </p>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════════
          PATIENT INFORMATION CARD - MOST PROMINENT
          ═══════════════════════════════════════════════════════════════════ */}
      <Card className="border-primary/30 bg-gradient-to-br from-primary/5 to-transparent">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <User className="h-5 w-5 text-primary" />
            Patient Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Avatar + Name + Demographics */}
          <div className="flex items-start gap-4">
            <Avatar className="h-20 w-20 border-2 border-primary/20">
              <AvatarImage src={appointment.patient?.avatar} />
              <AvatarFallback className="text-2xl bg-primary/10 text-primary">
                {patientName[0]}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 space-y-2">
              <div>
                <h2 className="text-2xl font-bold text-foreground">{patientName}</h2>
                <div className="flex flex-wrap items-center gap-3 mt-1 text-sm text-muted-foreground">
                  {patientAge && <span>{patientAge} years old</span>}
                  {patientGender && (
                    <>
                      <span>•</span>
                      <span className="capitalize">{patientGender}</span>
                    </>
                  )}
                  {appointment.bookedForRelationship !== "self" && appointment.bookedForName && (
                    <>
                      <span>•</span>
                      <span>Booked by {appointment.patient?.name}</span>
                      <Badge variant="outline" className="text-xs">
                        {appointment.bookedForRelationship}
                      </Badge>
                    </>
                  )}
                </div>
              </div>

              {/* Contact Information */}
              <div className="grid sm:grid-cols-2 gap-3 pt-2">
                {appointment.patient?.email && (
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span className="text-foreground">{appointment.patient.email}</span>
                  </div>
                )}
                {appointment.patient?.phone && (
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span className="text-foreground">{appointment.patient.phone}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          <Separator />

          {/* Reason for Consultation - PROMINENT */}
          {appointment.symptoms && (
            <div className="rounded-lg bg-background border border-border p-4">
              <div className="flex items-start gap-3">
                <Stethoscope className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                <div className="flex-1">
                  <p className="text-sm font-semibold text-foreground mb-1">Reason for Consultation</p>
                  <p className="text-base text-foreground leading-relaxed">{appointment.symptoms}</p>
                </div>
              </div>
            </div>
          )}

          {/* Quick Actions */}
          <div className="flex flex-wrap gap-2 pt-2">
            <Button variant="outline" size="sm" className="gap-2">
              <MessageCircle className="h-4 w-4" />
              Message Patient
            </Button>
            <Button variant="outline" size="sm" className="gap-2">
              <FileDown className="h-4 w-4" />
              View Medical History
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Status Timeline */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Appointment Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            {["pending", "confirmed", "in_progress", "completed"].map((status, idx) => {
              const isCurrent = appointment.status === status || 
                (status === "in_progress" && appointment.status === "in-progress");
              const isPast = ["pending", "confirmed", "in_progress", "in-progress"].indexOf(appointment.status) > idx;
              return (
                <div key={status} className="flex items-center">
                  <div className={`flex flex-col items-center gap-2 ${idx > 0 ? "ml-4" : ""}`}>
                    <div className={`h-10 w-10 rounded-full flex items-center justify-center border-2 transition-colors ${
                      isCurrent ? "border-primary bg-primary text-primary-foreground" :
                      isPast ? "border-success bg-success text-success-foreground" :
                      "border-border bg-muted text-muted-foreground"
                    }`}>
                      {isPast || isCurrent ? <CheckCircle2 className="h-5 w-5" /> : <Clock className="h-5 w-5" />}
                    </div>
                    <span className={`text-xs font-medium ${isCurrent ? "text-primary" : "text-muted-foreground"}`}>
                      {status === "in_progress" ? "In Progress" : status.charAt(0).toUpperCase() + status.slice(1)}
                    </span>
                  </div>
                  {idx < 3 && (
                    <div className={`h-0.5 w-12 mx-2 ${isPast ? "bg-success" : "bg-border"}`} />
                  )}
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Payment Status */}
      {(appointment.type === "online" || appointment.type === "on_demand") && (() => {
        const paymentDisplayNote = (appointment as Appointment & { paymentDisplayNote?: { doctor: string; badge: string; color: string } }).paymentDisplayNote;
        const note = paymentDisplayNote as { doctor: string; badge: string; color: string } | null | undefined;
        const badge = note?.badge ?? appointment.paymentStatus ?? "pending";
        const statusColors: Record<string, string> = {
          paid: "border-green-200 bg-green-50 dark:bg-green-900/20 dark:border-green-800",
          refunded: "border-yellow-200 bg-yellow-50 dark:bg-yellow-900/20 dark:border-yellow-800",
          awaiting: "border-yellow-200 bg-yellow-50 dark:bg-yellow-900/20 dark:border-yellow-800",
          pending: "border-border bg-muted/30",
        };
        const iconColors: Record<string, string> = {
          paid: "text-green-600",
          refunded: "text-yellow-600",
          awaiting: "text-yellow-600",
          pending: "text-muted-foreground",
        };
        const Icon = badge === "paid" ? BadgeCheck : badge === "refunded" ? RefreshCw : CreditCard;
        return (
          <Card className={`border ${statusColors[badge] ?? statusColors.pending}`}>
            <CardContent className="flex items-start gap-3 p-4">
              <Icon className={`h-5 w-5 shrink-0 mt-0.5 ${iconColors[badge] ?? iconColors.pending}`} />
              <div className="space-y-0.5">
                <p className="text-sm font-semibold text-foreground">
                  {badge === "paid" ? "Payment Received" :
                   badge === "refunded" ? "Payment Refunded" :
                   badge === "awaiting" ? "Awaiting Payment" : "Payment Status"}
                </p>
                <p className="text-xs text-muted-foreground">
                  {note?.doctor ?? `Payment status: ${appointment.paymentStatus}`}
                </p>
                {badge === "paid" && (
                  <p className="text-xs text-muted-foreground">
                    Reference: <span className="font-mono font-semibold text-primary">
                      APT-{appointment.id.slice(-8).toUpperCase()}
                    </span>
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        );
      })()}

      {/* Video Consultation Controls */}
      {isOnline && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Video className="h-5 w-5 text-primary" />
              Video Consultation
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {roomLive && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
              >
                <div className="flex items-center gap-3 rounded-xl bg-green-500/10 border border-green-500/30 px-4 py-3">
                  <Radio className="h-5 w-5 text-green-500 animate-pulse" />
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-green-600 dark:text-green-400">
                      Room is live — patient can join now
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Patient notified. Join the room below to start the call.
                    </p>
                  </div>
                </div>

                {videoRoomUrl && (
                  <a href={getJitsiUrl(videoRoomUrl, user?.name ?? "Doctor")} target="_blank" rel="noopener noreferrer" className="block">
                    <Button className="w-full gap-2 bg-primary hover:bg-primary/90 h-11">
                      <Video className="h-4 w-4" />
                      Join Video Room (opens in new tab)
                    </Button>
                  </a>
                )}

                <Button
                  variant="destructive"
                  className="w-full gap-2 h-11"
                  onClick={handleEndConsultation}
                  disabled={ending}
                >
                  {ending ? <Loader2 className="h-4 w-4 animate-spin" /> : <PhoneOff className="h-4 w-4" />}
                  End Consultation & Mark Complete
                </Button>
              </motion.div>
            )}

            {canStart && (
              <Button
                className="w-full gap-2 bg-primary hover:bg-primary/90 h-12 text-base"
                onClick={handleStartVideo}
                disabled={starting}
              >
                {starting ? <Loader2 className="h-5 w-5 animate-spin" /> : <Video className="h-5 w-5" />}
                {starting ? "Creating room…" : "Start Video Consultation"}
              </Button>
            )}

            {isScheduledFuture && (
              <div className="flex items-start gap-3 rounded-xl border border-amber-300/50 bg-amber-50/60 dark:bg-amber-900/20 dark:border-amber-700/40 px-4 py-3">
                <Clock className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-amber-700 dark:text-amber-400">
                    Scheduled for {format(new Date(appointment.date), "EEEE, MMMM d")}
                  </p>
                  <p className="text-xs text-amber-600/80 dark:text-amber-500/80 mt-0.5">
                    You can only start the video room on the day of the appointment.
                  </p>
                </div>
              </div>
            )}

            {isCompleted && (
              <div className="flex items-center gap-2 text-green-600 dark:text-green-400 text-sm">
                <CheckCircle2 className="h-5 w-5" />
                Consultation completed
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Consultation Notes */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <FileText className="h-5 w-5 text-primary" />
            Consultation Notes & Summary
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-xs font-medium text-muted-foreground">Doctor Notes</label>
            <Textarea
              value={consultNotes}
              onChange={(e) => setConsultNotes(e.target.value)}
              placeholder="Write your consult notes here..."
              disabled={appointment.status === "completed"}
              className="min-h-[120px]"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-medium text-muted-foreground">Summary (optional)</label>
            <Textarea
              value={consultSummary}
              onChange={(e) => setConsultSummary(e.target.value)}
              placeholder="Optional short summary for the patient..."
              disabled={appointment.status === "completed"}
              className="min-h-[80px]"
            />
          </div>
          {appointment.sharedDocuments && appointment.sharedDocuments.length > 0 && (
            <div className="rounded-lg border border-border p-3 text-sm">
              <p className="text-xs text-muted-foreground mb-2">Shared Documents</p>
              <div className="space-y-2">
                {appointment.sharedDocuments.map((doc) => (
                  <div key={`${doc.docType}-${doc.documentId}`} className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-foreground">{doc.title || doc.docType}</p>
                      {doc.summary && <p className="text-xs text-muted-foreground">{doc.summary}</p>}
                    </div>
                    <Badge variant="secondary" className="text-[10px]">
                      {doc.docType}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Lab Request */}
      {!isCancelled && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <FlaskConical className="h-5 w-5 text-success" />
              Send Lab Request
            </CardTitle>
          </CardHeader>
          <CardContent>
            <LabRequestForm
              patientId={appointment.patientId}
              appointmentId={appointment.id}
            />
          </CardContent>
        </Card>
      )}

      {/* Refund & Cancel */}
      {canRefundCancel && (
        <Card className="border-destructive/30">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2 text-destructive">
              <XCircle className="h-5 w-5" />
              Cancel & Refund
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-sm text-muted-foreground">
              If the patient requested cancellation, you can approve it here.
              {appointment.paymentStatus === "paid" && " A full refund will be issued to their original payment method."}
            </p>
            <Button
              variant="destructive"
              className="gap-2"
              onClick={() => setRefundOpen(true)}
            >
              <RefreshCw className="h-4 w-4" />
              Refund & Cancel Appointment
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Refund Dialog */}
      <Dialog open={refundOpen} onOpenChange={setRefundOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Refund & Cancel Appointment</DialogTitle>
            <DialogDescription>
              This will cancel the appointment and issue a full refund to the patient's original payment method.
              This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-2">
            <label className="text-sm font-medium">Reason (optional)</label>
            <Textarea
              placeholder="Reason for cancellation..."
              value={refundReason}
              onChange={(e) => setRefundReason(e.target.value)}
              className="h-20 resize-none"
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setRefundOpen(false)}>Go Back</Button>
            <Button variant="destructive" onClick={handleRefundAndCancel} disabled={isRefunding}>
              {isRefunding && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
              Confirm Refund & Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
