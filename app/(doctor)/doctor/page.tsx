"use client";

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  Calendar, CalendarDays, MessageCircle, FileText, Clock, Star,
  ArrowRight, Users, Video, Zap,
  Shield, Stethoscope, Activity, CheckCircle2,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Switch } from '@/components/ui/switch';
import { useAuthStore } from '@/store';
import { doctorService } from '@/services/doctorService';
import { appointmentService } from '@/services/appointmentService';
import { Appointment, Doctor } from '@/types';
import { useToast } from '@/hooks/use-toast';
import { formatTime12Hour } from '@/lib/utils';

const quickActions = [
  { label: 'View Queue',    icon: Clock,        href: '/doctor/queue',         color: 'bg-primary',       desc: 'Now serving + waiting list' },
  { label: 'Appointments', icon: Calendar,      href: '/doctor/appointments',  color: 'bg-accent',        desc: 'Upcoming & past slots' },
  { label: 'Messages',     icon: MessageCircle, href: '/doctor/messages',      color: 'bg-success',       desc: 'Chat with patients' },
  { label: 'Patients',     icon: Users,         href: '/doctor/patients',      color: 'bg-primary/70',    desc: 'History & follow-ups' },
  { label: 'Prescriptions',icon: FileText,      href: '/doctor/prescriptions', color: 'bg-destructive/80',desc: 'E-prescriptions' },
  { label: 'My Schedule',  icon: CalendarDays,  href: '/doctor/schedule',      color: 'bg-warning',       desc: 'Set availability & slots' },
];

const focusChips = [
  { label: 'General Medicine', icon: Stethoscope, color: 'bg-primary/10 text-primary hover:bg-primary/20' },
  { label: 'Cardiology', icon: Activity, color: 'bg-success/10 text-success hover:bg-success/20' },
  { label: 'Dermatology', icon: Star, color: 'bg-warning/10 text-warning hover:bg-warning/20' },
];

const getAgeLabel = (dateOfBirth?: string) => {
  if (!dateOfBirth) return '—';
  const dob = new Date(dateOfBirth);
  if (Number.isNaN(dob.getTime())) return '—';
  const diff = Date.now() - dob.getTime();
  return Math.max(0, Math.floor(diff / (365.25 * 24 * 60 * 60 * 1000))).toString();
};

export default function DoctorDashboardPage() {
  const router = useRouter();
  const { toast } = useToast();
  const { user, setUser } = useAuthStore();

  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [earnings, setEarnings] = useState<{
    consultsToday: number;
    consultsWeek: number;
    revenueToday: number;
    revenueWeek: number;
    pendingPayouts: number;
    pendingAmount: number;
  } | null>(null);

  const doctor = user as Doctor | undefined;
  const doctorId = doctor?.id;

  useEffect(() => {
    const fetchData = async () => {
      if (!doctorId) return;
      const res = await appointmentService.getAppointments({ doctorId });
      if (res.success) setAppointments(res.data);
      const earningsRes = await doctorService.getEarnings();
      if (earningsRes.success) setEarnings(earningsRes.data);
      setIsLoading(false);
    };
    fetchData();
  }, [doctorId]);

  const onDemand = doctor?.isOnDemand ?? false;

  const todayAppointments = useMemo(
    () => appointments.filter((apt) => {
      const date = new Date(apt.date);
      const now = new Date();
      return date.toDateString() === now.toDateString();
    }),
    [appointments]
  );

  const queueWaiting = todayAppointments
    .filter((apt) => apt.status === 'confirmed')
    .sort((a, b) => a.time.localeCompare(b.time));
  const queueInProgress = todayAppointments.find((apt) => apt.status === 'in-progress');
  const nowServing = queueInProgress || queueWaiting[0] || null;

  const upcomingAppointments = useMemo(
    () =>
      appointments
        .filter((apt) => new Date(apt.date) >= new Date() && !todayAppointments.includes(apt))
        .slice(0, 3),
    [appointments, todayAppointments]
  );

  const consultsToday = todayAppointments.length;
  const patientsSeen = todayAppointments.filter((a) => a.status === 'completed').length;
  const waitingCount = queueWaiting.length;
  const formatPHP = (value?: number) =>
    typeof value === 'number'
      ? `₱${value.toLocaleString('en-PH', { maximumFractionDigits: 0 })}`
      : '—';

  const handleOnDemand = async (value: boolean) => {
    if (!doctor) return;
    const res = await doctorService.updateOnDemand(doctor.id, value);
    if (res.success) {
      setUser({ ...doctor, isOnDemand: value } as Doctor);
      toast({
        title: value ? 'On-demand enabled' : 'On-demand paused',
        description: value ? 'Patients can consult you instantly.' : 'You are hidden from Consult Now.',
      });
    }
  };

  const handleMarkDone = async () => {
    if (!nowServing) return;
    await appointmentService.completeAppointment(nowServing.id);
    setAppointments((prev) =>
      prev.map((apt) => (apt.id === nowServing.id ? { ...apt, status: 'completed' } : apt))
    );
    toast({ title: 'Consultation completed' });
  };

  const handleNextPatient = () => {
    if (queueWaiting.length > 0) {
      toast({ title: `Calling ${queueWaiting[0].patient?.name}` });
      router.push('/doctor/queue');
    }
  };

  const firstName = doctor?.name?.split(' ')[1] ?? doctor?.name ?? 'Doctor';

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-2xl gradient-primary p-6 text-primary-foreground"
      >
        <div className="absolute inset-0 opacity-10 hero-radial" />
        <div className="relative flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold">
              Welcome back, Dr. {firstName}! 👋
            </h1>
            <p className="text-primary-foreground/80 mt-1 text-sm">
              Your queue is ready. Stay on-demand to capture more consults.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-white/10 rounded-full px-3 py-1.5">
              <Switch checked={onDemand} onCheckedChange={handleOnDemand} id="doctor-on-demand" />
              <label htmlFor="doctor-on-demand" className="text-xs text-primary-foreground">
                On-Demand: {onDemand ? 'Available' : 'Paused'}
              </label>
            </div>
            <Badge className={onDemand ? 'bg-success/20 text-success border-success/30' : 'bg-white/10 text-primary-foreground border-white/20'}>
              <span className={`mr-1 h-2 w-2 rounded-full ${onDemand ? 'bg-success animate-pulse' : 'bg-white/40'}`} />
              {onDemand ? 'Live' : 'Offline'}
            </Badge>
          </div>
        </div>
      </motion.div>

      <div>
        <h2 className="text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wide">Quick Actions</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {quickActions.map((action, index) => (
            <motion.div
              key={action.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Link href={action.href}>
                <Card className="hover:shadow-md transition-all duration-200 hover:border-primary/30 cursor-pointer h-full group">
                  <CardContent className="flex flex-col items-center justify-center p-4 text-center gap-2">
                    <div className={`h-11 w-11 rounded-xl ${action.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                      <action.icon className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-foreground leading-tight">{action.label}</p>
                      <p className="text-[10px] text-muted-foreground mt-0.5 hidden sm:block">{action.desc}</p>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
        <Card className="border-warning/30 bg-warning/5 overflow-hidden">
          <CardContent className="p-5 flex flex-col sm:flex-row items-center gap-4">
            <div className="h-14 w-14 rounded-2xl bg-warning/20 flex items-center justify-center shrink-0">
              <Zap className="h-7 w-7 text-warning" />
            </div>
            <div className="flex-1 text-center sm:text-left">
              <p className="font-semibold text-foreground">Stay visible for on-demand consults</p>
              <p className="text-sm text-muted-foreground">Toggle on-demand to appear in "Consult Now" for patients in Quezon City clinics.</p>
            </div>
            <Button
              className="bg-warning text-warning-foreground hover:bg-warning/90 gap-2 shrink-0"
              onClick={() => handleOnDemand(!onDemand)}
            >
              <Zap className="h-4 w-4" />
              {onDemand ? 'Pause' : 'Go Live'}
            </Button>
          </CardContent>
        </Card>
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 border-primary/20 bg-primary/5">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg">Today's Queue</CardTitle>
            <Link href="/doctor/queue">
              <Button variant="ghost" size="sm" className="text-xs gap-1">
                Manage Queue <ArrowRight className="h-3 w-3" />
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="space-y-3">
                <Skeleton className="h-24 rounded-xl" />
                <Skeleton className="h-14 rounded-xl" />
              </div>
            ) : !nowServing ? (
              <div className="text-center py-8 text-muted-foreground">
                <CheckCircle2 className="h-12 w-12 mx-auto mb-2 text-success" />
                No queue right now. Turn on on‑demand to accept instant consults.
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 rounded-xl bg-background border border-border">
                  <Avatar className="h-14 w-14">
                    <AvatarImage src={nowServing.patient?.avatar} />
                    <AvatarFallback>{nowServing.patient?.name?.[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="font-semibold text-foreground">{nowServing.patient?.name}</p>
                    <p className="text-xs text-muted-foreground">{formatTime12Hour(nowServing.time)} • {nowServing.type === 'online' ? 'Video' : 'In-Clinic'}</p>
                    <Badge className="mt-2 bg-success/15 text-success border-success/30">
                      {nowServing.status === 'in-progress' ? 'In Progress' : 'Waiting'}
                    </Badge>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Button size="sm" className="gap-2" onClick={() => router.push('/doctor/queue')}>
                      <Video className="h-4 w-4" />
                      Start Video
                    </Button>
                    <Button size="sm" variant="outline" onClick={handleNextPatient} className="gap-2">
                      <Clock className="h-4 w-4" />
                      Next
                    </Button>
                    <Button size="sm" variant="outline" onClick={handleMarkDone} className="gap-2">
                      <CheckCircle2 className="h-4 w-4" />
                      Mark Done
                    </Button>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-2">
                  {queueWaiting.slice(0, 4).map((apt, i) => (
                    <div key={apt.id} className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50 border border-border">
                      <span className="text-xs text-muted-foreground w-6">#{i + 1}</span>
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={apt.patient?.avatar} />
                        <AvatarFallback>{apt.patient?.name?.[0]}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <p className="text-sm font-medium">{apt.patient?.name}</p>
                        <p className="text-xs text-muted-foreground">{formatTime12Hour(apt.time)}</p>
                      </div>
                      {apt.type === 'online' && <Video className="h-4 w-4 text-muted-foreground" />}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="space-y-4">
          <Card>
            <CardContent className="pt-6 flex items-center gap-4">
              <div className="p-3 rounded-xl bg-primary/10 text-primary">
                <Activity className="h-6 w-6" />
              </div>
              <div>
                <p className="text-2xl font-bold">{isLoading ? '-' : consultsToday}</p>
                <p className="text-sm text-muted-foreground">Consults Today</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 flex items-center gap-4">
              <div className="p-3 rounded-xl bg-success/10 text-success">
                <Users className="h-6 w-6" />
              </div>
              <div>
                <p className="text-2xl font-bold">{isLoading ? '-' : patientsSeen}</p>
                <p className="text-sm text-muted-foreground">Patients Seen</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 flex items-center gap-4">
              <div className="p-3 rounded-xl bg-warning/10 text-warning">
                <Clock className="h-6 w-6" />
              </div>
              <div>
                <p className="text-2xl font-bold">{isLoading ? '-' : waitingCount}</p>
                <p className="text-sm text-muted-foreground">Waiting Count</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 flex items-center gap-4">
              <div className="p-3 rounded-xl bg-primary/10 text-primary">
                <FileText className="h-6 w-6" />
              </div>
              <div>
                <p className="text-2xl font-bold">
                  {isLoading ? '-' : formatPHP(earnings?.revenueWeek)}
                </p>
                <p className="text-sm text-muted-foreground">Estimated Revenue (Week)</p>
                {earnings && (
                  <p className="text-xs text-muted-foreground">
                    Pending payout: {formatPHP(earnings.pendingAmount)}
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-3">
          <CardTitle className="flex items-center gap-2 text-base">
            <Clock className="h-5 w-5 text-primary" />
            Upcoming Appointments
          </CardTitle>
          <Link href="/doctor/appointments">
            <Button variant="ghost" size="sm" className="text-xs gap-1">
              View All <ArrowRight className="h-3 w-3" />
            </Button>
          </Link>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="space-y-3">
              {[1, 2].map(i => (
                <div key={i} className="flex items-center gap-4 p-3 rounded-lg bg-secondary/50">
                  <Skeleton className="h-12 w-12 rounded-full" />
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-4 w-36" />
                    <Skeleton className="h-3 w-24" />
                  </div>
                </div>
              ))}
            </div>
          ) : upcomingAppointments.length === 0 ? (
            <div className="text-center py-10 text-muted-foreground">
              <Calendar className="h-12 w-12 mx-auto mb-3 opacity-30" />
              <p className="font-medium">No upcoming appointments</p>
              <p className="text-sm mt-1">Stay on-demand to receive new consults.</p>
              <Button className="mt-4 gap-2" size="sm" onClick={() => handleOnDemand(true)}>
                <Zap className="h-4 w-4" />Go On-Demand
              </Button>
            </div>
          ) : (
            <div className="space-y-3">
              {upcomingAppointments.map((apt) => (
                <motion.div
                  key={apt.id}
                  whileHover={{ scale: 1.01 }}
                  className="flex flex-col sm:flex-row items-start sm:items-center gap-3 p-4 rounded-xl bg-secondary/50 border border-border hover:border-primary/20 transition-colors"
                >
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={apt.patient?.avatar} />
                    <AvatarFallback>{apt.patient?.name?.[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-foreground">{apt.patient?.name}</p>
                    <p className="text-xs text-muted-foreground">Quezon City • {getAgeLabel(apt.patient?.dateOfBirth)} yrs</p>
                  </div>
                  <div className="flex flex-row sm:flex-col items-center sm:items-end gap-2 sm:gap-1">
                    <Badge variant={apt.type === 'online' ? 'default' : 'secondary'} className="text-xs gap-1">
                      {apt.type === 'online' ? <Video className="h-3 w-3" /> : null}
                      {apt.type === 'online' ? 'Video' : 'In-Clinic'}
                    </Badge>
                    <div className="text-right">
                      <p className="text-xs font-medium text-foreground">{apt.date}</p>
                      <p className="text-xs text-muted-foreground">{formatTime12Hour(apt.time)}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    {apt.type === 'online' && (
                      <Button size="sm" className="gap-1.5 shrink-0" onClick={() => router.push('/doctor/appointments')}>
                        <Video className="h-3.5 w-3.5" />Start
                      </Button>
                    )}
                    <Button size="sm" variant="outline" className="gap-1.5 shrink-0" onClick={() => router.push('/doctor/messages')}>
                      <MessageCircle className="h-3.5 w-3.5" />Message
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <div>
        <h2 className="text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wide">Focus Areas</h2>
        <div className="flex flex-wrap gap-2">
          {focusChips.map((s) => (
            <motion.div
              key={s.label}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium border border-transparent cursor-pointer transition-colors ${s.color}`}
            >
              <s.icon className="h-4 w-4" />
              {s.label}
            </motion.div>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-3 p-4 rounded-xl bg-muted/50 border border-border text-sm text-muted-foreground">
        <Shield className="h-5 w-5 text-primary shrink-0" />
        <p>Your consultations, notes, and documents are <span className="font-medium text-foreground">encrypted and private</span>. Only you and your patients can access them.</p>
      </div>
    </div>
  );
}
