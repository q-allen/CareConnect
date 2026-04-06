"use client";

import { motion } from 'framer-motion';
import Link from 'next/link';
import { 
  Calendar, 
  FileText, 
  Clock, 
  Shield, 
  Smartphone,
  CheckCircle2,
  ArrowRight,
  Activity,
  Building2,
  CreditCard,
  Video,
  UserCheck,
  ClipboardList,
  KeyRound,
  Wallet,
  Bell,
  Users,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { topSpecialties, hospitals as partnerHospitals } from '@/data/specialtiesData';

const features = [
  {
    icon: Calendar,
    title: 'Easy Appointment Booking',
    description: 'Book appointments with top doctors in just a few taps. Choose between online or in-clinic consultations.',
  },
  {
    icon: Clock,
    title: 'Real-Time Queue Tracking',
    description: 'Know your queue position in real-time. No more waiting in crowded clinics.',
  },
  {
    icon: Video,
    title: 'Teleconsultation',
    description: 'Consult with doctors from anywhere via secure video calls. Invite family members to join.',
  },
  {
    icon: FileText,
    title: 'Digital Prescriptions',
    description: 'Receive and access your prescriptions digitally. Never lose a prescription again.',
  },
  {
    icon: Shield,
    title: 'Secure Health Records',
    description: 'Your medical records are encrypted and securely stored. Access them anytime, anywhere.',
  },
  {
    icon: Smartphone,
    title: 'Medicine Delivery',
    description: 'Order medicines directly from your prescriptions and get them delivered to your doorstep.',
  },
];

const stats = [
  { value: 'Book', label: 'Appointments Online' },
  { value: 'Track', label: 'Your Queue Live' },
  { value: 'Consult', label: 'via Video Call' },
  { value: 'Order', label: 'Medicine Delivery' },
];

const whyCareConnect = [
  {
    icon: Calendar,
    title: 'Book Anytime',
    content: 'Schedule appointments 24/7 without calling the clinic. Choose in-clinic or teleconsultation.',
  },
  {
    icon: Clock,
    title: 'No More Long Waits',
    content: 'Track your real-time queue position and arrive at the clinic just in time for your turn.',
  },
  {
    icon: Video,
    title: 'Consult from Home',
    content: 'Connect with your doctor via secure video call. Invite family members to join the consultation.',
  },
];

const paymentMethods = [
  { name: 'Cash on Clinic', icon: Wallet },
  { name: 'GCash', icon: Smartphone },
  { name: 'Credit / Debit Card', icon: CreditCard },
];

const bookingSteps = [
  {
    step: 1,
    icon: UserCheck,
    title: 'Select a Doctor',
    description: 'Choose from your list of doctors or find a new doctor.',
  },
  {
    step: 2,
    icon: ClipboardList,
    title: 'Fill up Form',
    description: 'Select whether you are new or existing patient, choose schedule, and fill out all the details.',
  },
  {
    step: 3,
    icon: KeyRound,
    title: 'Enter OTP',
    description: 'A one-time-pin will be sent to your mobile number to verify your account.',
  },
  {
    step: 4,
    icon: Wallet,
    title: 'Booking Fees',
    description: "Payment can be done through different payment channels or during consult, depending on the doctor's preference.",
  },
  {
    step: 5,
    icon: Bell,
    title: 'Wait for Confirmation',
    description: "Consultation Status will be updated once your request has been confirmed. You'll also be notified through SMS or Email.",
  },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-border/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg gradient-primary">
                <Activity className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold text-foreground">CareConnect</span>
            </Link>

            <div className="hidden md:flex items-center gap-6">
              <a href="#specialties" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                Specialties
              </a>
              <a href="#hospitals" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                Hospitals
              </a>
              <a href="#features" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                Features
              </a>
              <a href="#testimonials" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                Testimonials
              </a>
            </div>

            <div className="flex items-center gap-3">
              <Link href="/login">
                <Button variant="ghost" size="sm">
                  Sign In
                </Button>
              </Link>
              <Link href="/login">
                <Button size="sm" className="gradient-primary border-0">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-24 pb-16 overflow-hidden">
        <div className="absolute inset-0 gradient-hero opacity-5" />
        <div className="absolute top-1/4 -right-1/4 w-1/2 h-1/2 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -left-1/4 w-1/2 h-1/2 bg-accent/10 rounded-full blur-3xl" />
        
        <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[calc(100vh-6rem)]">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center lg:text-left"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
                <CheckCircle2 className="h-4 w-4" />
                <span>Your all-in-one healthcare platform</span>
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6">
                Healthcare at Your{' '}
                <span className="text-gradient">Fingertips</span>
              </h1>
              
              <p className="text-lg sm:text-xl text-muted-foreground max-w-xl mx-auto lg:mx-0 mb-8">
                Book appointments, consult with doctors, manage prescriptions, and access your health records — all in one app.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link href="/signin">
                  <Button size="lg" className="gradient-primary border-0 text-lg px-8 h-12 shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-shadow w-full sm:w-auto">
                    Book Appointment
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/signin">
                  <Button size="lg" variant="outline" className="text-lg px-8 h-12 w-full sm:w-auto">
                    Find a Doctor
                  </Button>
                </Link>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mt-12 pt-8 border-t border-border">
                {stats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                    className="text-center"
                  >
                    <div className="text-2xl sm:text-3xl font-bold text-primary">{stat.value}</div>
                    <div className="text-xs text-muted-foreground">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative hidden lg:block"
            >
              <div className="relative">
                <div className="absolute inset-0 gradient-primary rounded-3xl transform rotate-3 opacity-20" />
                <img
                  src="/doctor.svg"
                  alt="Doctor with patient"
                  className="relative rounded-3xl shadow-2xl object-cover w-full h-[600px]"
                />
                
                {/* Floating Cards */}
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -left-8 top-1/4 bg-card rounded-xl shadow-xl p-4 border border-border"
                >
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full gradient-primary flex items-center justify-center">
                      <Calendar className="h-5 w-5 text-primary-foreground" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold">Appointment Booked!</div>
                      <div className="text-xs text-muted-foreground">Confirmed • Today</div>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                  className="absolute -right-8 bottom-1/4 bg-card rounded-xl shadow-xl p-4 border border-border"
                >
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-success/20 flex items-center justify-center">
                      <CheckCircle2 className="h-5 w-5 text-success" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold">Queue Position: #2</div>
                      <div className="text-xs text-muted-foreground">Almost your turn!</div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Specialties Section */}
      <section id="specialties" className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Top Specialties
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Find doctors across all major medical specialties
            </p>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-4">
            {topSpecialties.slice(0, 7).map((specialty, index) => (
              <motion.div
                key={specialty.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <Link href="/signin">
                  <Card className="hover:shadow-lg transition-all hover:-translate-y-1 cursor-pointer">
                    <CardContent className="p-4 text-center">
                      <div className="h-12 w-12 rounded-xl gradient-primary flex items-center justify-center mx-auto mb-3">
                        <Activity className="h-6 w-6 text-primary-foreground" />
                      </div>
                      <h3 className="text-sm font-semibold text-foreground mb-1">{specialty.name}</h3>
                      <p className="text-xs text-muted-foreground">{specialty.count} doctors</p>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link href="/signin">
              <Button variant="outline" size="lg">
                View All Specialties
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Hospitals Section */}
      <section id="hospitals" className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Partner Hospitals
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Access doctors from top hospitals and clinics nationwide
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {partnerHospitals.map((hospital, index) => (
              <motion.div
                key={hospital.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <Card className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="h-12 w-12 rounded-xl bg-secondary flex items-center justify-center shrink-0">
                        <Building2 className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground">{hospital.name}</h3>
                        <p className="text-sm text-muted-foreground">{hospital.location}</p>
                        <Badge variant="secondary" className="mt-2">
                          {hospital.doctorCount} doctors
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Booking Instructions Section */}
      <section id="how-it-works" className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Booking Instructions
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Book your appointment in just a few simple steps
            </p>
          </motion.div>

          <div className="relative">
            {/* Connection Line */}
            <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-border -translate-y-1/2" />
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-4">
              {bookingSteps.map((step, index) => (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="relative"
                >
                  <div className="bg-card rounded-2xl p-6 shadow-md border border-border h-full flex flex-col items-center text-center relative z-10">
                    {/* Step Number Badge */}
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-sm font-bold w-7 h-7 rounded-full flex items-center justify-center shadow-md">
                      {step.step}
                    </div>
                    
                    {/* Icon */}
                    <div className="h-16 w-16 rounded-2xl gradient-primary flex items-center justify-center mb-4 mt-2">
                      <step.icon className="h-8 w-8 text-primary-foreground" />
                    </div>
                    
                    {/* Title */}
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      {step.title}
                    </h3>
                    
                    {/* Description */}
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="text-center mt-12">
            <Link href="/signin">
              <Button size="lg" className="gradient-primary border-0 shadow-lg shadow-primary/25">
                Book Your Appointment
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Everything You Need for Your Health
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              A comprehensive healthcare platform designed to make your medical journey seamless and stress-free.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-card rounded-2xl p-6 shadow-md hover:shadow-lg transition-shadow border border-border"
              >
                <div className="h-12 w-12 rounded-xl gradient-primary flex items-center justify-center mb-4">
                  <feature.icon className="h-6 w-6 text-primary-foreground" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Payment Methods Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h3 className="text-lg font-semibold text-foreground mb-2">Accepted Payment Methods</h3>
            <p className="text-muted-foreground">Pay conveniently with your preferred payment method</p>
          </div>
          <div className="flex flex-wrap justify-center gap-6">
            {paymentMethods.map((method) => (
              <div key={method.name} className="flex items-center gap-2 px-6 py-3 bg-secondary/50 rounded-lg">
                <method.icon className="h-5 w-5 text-primary" />
                <span className="font-medium">{method.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why CareConnect Section */}
      <section id="testimonials" className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Why Choose CareConnect?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Everything you need for a seamless healthcare experience, built for patients and doctors alike.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {whyCareConnect.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-card rounded-2xl p-6 shadow-md border border-border"
              >
                <div className="h-12 w-12 rounded-xl gradient-primary flex items-center justify-center mb-4">
                  <item.icon className="h-6 w-6 text-primary-foreground" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{item.title}</h3>
                <p className="text-muted-foreground">{item.content}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative rounded-3xl gradient-hero p-12 sm:p-16 text-center overflow-hidden"
          >
            <div className="absolute inset-0 bg-grid-white/10" />
            <div className="relative">
              <h2 className="text-3xl sm:text-4xl font-bold text-primary-foreground mb-4">
                Ready to Transform Your Healthcare Experience?
              </h2>
              <p className="text-lg text-primary-foreground/80 max-w-2xl mx-auto mb-8">
                Join CareConnect today — book appointments, consult doctors, and manage your health all in one place.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/signup">
                  <Button size="lg" variant="secondary" className="text-lg px-8 h-12 w-full sm:w-auto">
                    Get Started Free
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/signin">
                  <Button size="lg" variant="outline" className="text-lg px-8 h-12 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 w-full sm:w-auto">
                    <Users className="mr-2 h-5 w-5" />
                    Sign In
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-secondary/50 border-t border-border py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg gradient-primary">
              <Activity className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">CareConnect</span>
          </Link>
          <p className="text-sm text-muted-foreground">&copy; {new Date().getFullYear()} CareConnect. All rights reserved.</p>
          <a href="mailto:careconnect126@gmail.com" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors" title="careconnect126@gmail.com">
            <img src="/gmail.svg" alt="Gmail" className="h-5 w-5" />
            careconnect126@gmail.com
          </a>
        </div>
      </footer>
    </div>
  );
}
