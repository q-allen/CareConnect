(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/data/mockData.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
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
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/store/recordsStore.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useRecordsStore",
    ()=>useRecordsStore
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$react$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/zustand/esm/react.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$middleware$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/zustand/esm/middleware.mjs [app-client] (ecmascript)");
;
;
const useRecordsStore = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$react$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["create"])()((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$middleware$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["persist"])((set)=>({
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
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
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
        profile_photo: data?.doctor_photo
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
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/services/chatService.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
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
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/api.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$mappers$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/mappers.ts [app-client] (ecmascript)");
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
            const data = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"].get(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["API_ENDPOINTS"].CONVERSATIONS);
            const mapped = data.map(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$mappers$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mapConversation"]).sort((a, b)=>new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
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
        const all = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"].get(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["API_ENDPOINTS"].CONVERSATIONS);
        const conv = all.map(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$mappers$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mapConversation"]).find((c)=>String(c.id) === String(conversationId));
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
            const data = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"].get(`${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["API_ENDPOINTS"].MESSAGES(conversationId)}${query}`);
            return {
                data: data.map((m)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$mappers$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mapMessage"])(m, {
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
            const res = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"].upload(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["API_ENDPOINTS"].MESSAGES(conversationId), form);
            result = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$mappers$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mapMessage"])(res, {
                conversationId
            });
        } else {
            const payload = {
                content,
                type
            };
            if (tempId) payload.temp_id = tempId;
            const res = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"].post(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["API_ENDPOINTS"].MESSAGES(conversationId), payload);
            result = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$mappers$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mapMessage"])(res, {
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
            const all = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"].get(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["API_ENDPOINTS"].CONVERSATIONS);
            const existing = all.map(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$mappers$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mapConversation"]).find((c)=>String(c.patientId) === String(patientId) && String(c.doctorId) === String(doctorId));
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
        const data = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"].post(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["API_ENDPOINTS"].CONVERSATIONS, body);
        return {
            data: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$mappers$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mapConversation"])(data),
            success: true
        };
    },
    /**
   * Mark a single message as read via REST.
   * Primary path is WS { type: "chat.read", message_id: X }.
   * This is the fallback when WS is not connected.
   */ async markMessageRead (messageId) {
        try {
            await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"].post(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["API_ENDPOINTS"].MESSAGE_READ(messageId), {});
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
            await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"].get(`${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["API_ENDPOINTS"].MESSAGES(conversationId)}`);
        } catch (err) {
        // Ignore — best effort
        }
        return {
            data: undefined,
            success: true
        };
    },
    /** Total unread count across all conversations — used for the sidebar badge. */ async getTotalUnread (_userId) {
        const all = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"].get(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["API_ENDPOINTS"].CONVERSATIONS);
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
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/ui/card.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
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
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-client] (ecmascript)");
;
;
;
const Card = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"](_c = ({ className, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("rounded-lg border bg-card text-card-foreground shadow-sm", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/card.tsx",
        lineNumber: 6,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0)));
_c1 = Card;
Card.displayName = "Card";
const CardHeader = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"](_c2 = ({ className, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("flex flex-col space-y-1.5 p-6", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/card.tsx",
        lineNumber: 12,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0)));
_c3 = CardHeader;
CardHeader.displayName = "CardHeader";
const CardTitle = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"](_c4 = ({ className, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("text-2xl font-semibold leading-none tracking-tight", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/card.tsx",
        lineNumber: 19,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0)));
_c5 = CardTitle;
CardTitle.displayName = "CardTitle";
const CardDescription = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"](_c6 = ({ className, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("text-sm text-muted-foreground", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/card.tsx",
        lineNumber: 26,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0)));
_c7 = CardDescription;
CardDescription.displayName = "CardDescription";
const CardContent = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"](_c8 = ({ className, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("p-6 pt-0", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/card.tsx",
        lineNumber: 32,
        columnNumber: 37
    }, ("TURBOPACK compile-time value", void 0)));
_c9 = CardContent;
CardContent.displayName = "CardContent";
const CardFooter = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"](_c10 = ({ className, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("flex items-center p-6 pt-0", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/card.tsx",
        lineNumber: 38,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0)));
_c11 = CardFooter;
CardFooter.displayName = "CardFooter";
;
var _c, _c1, _c2, _c3, _c4, _c5, _c6, _c7, _c8, _c9, _c10, _c11;
__turbopack_context__.k.register(_c, "Card$React.forwardRef");
__turbopack_context__.k.register(_c1, "Card");
__turbopack_context__.k.register(_c2, "CardHeader$React.forwardRef");
__turbopack_context__.k.register(_c3, "CardHeader");
__turbopack_context__.k.register(_c4, "CardTitle$React.forwardRef");
__turbopack_context__.k.register(_c5, "CardTitle");
__turbopack_context__.k.register(_c6, "CardDescription$React.forwardRef");
__turbopack_context__.k.register(_c7, "CardDescription");
__turbopack_context__.k.register(_c8, "CardContent$React.forwardRef");
__turbopack_context__.k.register(_c9, "CardContent");
__turbopack_context__.k.register(_c10, "CardFooter$React.forwardRef");
__turbopack_context__.k.register(_c11, "CardFooter");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/ui/input.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Input",
    ()=>Input
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-client] (ecmascript)");
;
;
;
const Input = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"](_c = ({ className, type, ...props }, ref)=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
        type: type,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm", className),
        ref: ref,
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/input.tsx",
        lineNumber: 8,
        columnNumber: 7
    }, ("TURBOPACK compile-time value", void 0));
});
_c1 = Input;
Input.displayName = "Input";
;
var _c, _c1;
__turbopack_context__.k.register(_c, "Input$React.forwardRef");
__turbopack_context__.k.register(_c1, "Input");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/ui/skeleton.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Skeleton",
    ()=>Skeleton
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-client] (ecmascript)");
;
;
function Skeleton({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("animate-pulse rounded-md bg-muted", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/skeleton.tsx",
        lineNumber: 4,
        columnNumber: 10
    }, this);
}
_c = Skeleton;
;
var _c;
__turbopack_context__.k.register(_c, "Skeleton");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/ui/dialog.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
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
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@radix-ui/react-dialog/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-client] (ecmascript)");
;
;
;
;
;
const Dialog = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Root"];
const DialogTrigger = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Trigger"];
const DialogPortal = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Portal"];
const DialogClose = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Close"];
const DialogOverlay = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"](({ className, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Overlay"], {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/dialog.tsx",
        lineNumber: 19,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0)));
_c = DialogOverlay;
DialogOverlay.displayName = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Overlay"].displayName;
const DialogContent = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"](_c1 = ({ className, children, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(DialogPortal, {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(DialogOverlay, {}, void 0, false, {
                fileName: "[project]/src/components/ui/dialog.tsx",
                lineNumber: 35,
                columnNumber: 5
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Content"], {
                ref: ref,
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg", className),
                ...props,
                children: [
                    children,
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Close"], {
                        className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity data-[state=open]:bg-accent data-[state=open]:text-muted-foreground hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                className: "h-4 w-4"
                            }, void 0, false, {
                                fileName: "[project]/src/components/ui/dialog.tsx",
                                lineNumber: 46,
                                columnNumber: 9
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
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
_c2 = DialogContent;
DialogContent.displayName = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Content"].displayName;
const DialogHeader = ({ className, ...props })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("flex flex-col space-y-1.5 text-center sm:text-left", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/dialog.tsx",
        lineNumber: 55,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0));
_c3 = DialogHeader;
DialogHeader.displayName = "DialogHeader";
const DialogFooter = ({ className, ...props })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/dialog.tsx",
        lineNumber: 60,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0));
_c4 = DialogFooter;
DialogFooter.displayName = "DialogFooter";
const DialogTitle = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"](_c5 = ({ className, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Title"], {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("text-lg font-semibold leading-none tracking-tight", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/dialog.tsx",
        lineNumber: 68,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0)));
_c6 = DialogTitle;
DialogTitle.displayName = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Title"].displayName;
const DialogDescription = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"](_c7 = ({ className, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Description"], {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("text-sm text-muted-foreground", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/dialog.tsx",
        lineNumber: 80,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0)));
_c8 = DialogDescription;
DialogDescription.displayName = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Description"].displayName;
;
var _c, _c1, _c2, _c3, _c4, _c5, _c6, _c7, _c8;
__turbopack_context__.k.register(_c, "DialogOverlay");
__turbopack_context__.k.register(_c1, "DialogContent$React.forwardRef");
__turbopack_context__.k.register(_c2, "DialogContent");
__turbopack_context__.k.register(_c3, "DialogHeader");
__turbopack_context__.k.register(_c4, "DialogFooter");
__turbopack_context__.k.register(_c5, "DialogTitle$React.forwardRef");
__turbopack_context__.k.register(_c6, "DialogTitle");
__turbopack_context__.k.register(_c7, "DialogDescription$React.forwardRef");
__turbopack_context__.k.register(_c8, "DialogDescription");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/ui/textarea.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Textarea",
    ()=>Textarea
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-client] (ecmascript)");
;
;
;
const Textarea = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"](_c = ({ className, ...props }, ref)=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50", className),
        ref: ref,
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/textarea.tsx",
        lineNumber: 9,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
});
_c1 = Textarea;
Textarea.displayName = "Textarea";
;
var _c, _c1;
__turbopack_context__.k.register(_c, "Textarea$React.forwardRef");
__turbopack_context__.k.register(_c1, "Textarea");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/ui/select.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Select",
    ()=>Select,
    "SelectContent",
    ()=>SelectContent,
    "SelectGroup",
    ()=>SelectGroup,
    "SelectItem",
    ()=>SelectItem,
    "SelectLabel",
    ()=>SelectLabel,
    "SelectScrollDownButton",
    ()=>SelectScrollDownButton,
    "SelectScrollUpButton",
    ()=>SelectScrollUpButton,
    "SelectSeparator",
    ()=>SelectSeparator,
    "SelectTrigger",
    ()=>SelectTrigger,
    "SelectValue",
    ()=>SelectValue
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@radix-ui/react-select/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/check.js [app-client] (ecmascript) <export default as Check>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-down.js [app-client] (ecmascript) <export default as ChevronDown>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronUp$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-up.js [app-client] (ecmascript) <export default as ChevronUp>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-client] (ecmascript)");
;
;
;
;
;
const Select = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Root"];
const SelectGroup = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Group"];
const SelectValue = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Value"];
const SelectTrigger = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"](_c = ({ className, children, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Trigger"], {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1", className),
        ...props,
        children: [
            children,
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Icon"], {
                asChild: true,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__["ChevronDown"], {
                    className: "h-4 w-4 opacity-50"
                }, void 0, false, {
                    fileName: "[project]/src/components/ui/select.tsx",
                    lineNumber: 27,
                    columnNumber: 7
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/src/components/ui/select.tsx",
                lineNumber: 26,
                columnNumber: 5
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/ui/select.tsx",
        lineNumber: 17,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0)));
_c1 = SelectTrigger;
SelectTrigger.displayName = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Trigger"].displayName;
const SelectScrollUpButton = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"](({ className, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ScrollUpButton"], {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("flex cursor-default items-center justify-center py-1", className),
        ...props,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronUp$3e$__["ChevronUp"], {
            className: "h-4 w-4"
        }, void 0, false, {
            fileName: "[project]/src/components/ui/select.tsx",
            lineNumber: 42,
            columnNumber: 5
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/src/components/ui/select.tsx",
        lineNumber: 37,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0)));
_c2 = SelectScrollUpButton;
SelectScrollUpButton.displayName = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ScrollUpButton"].displayName;
const SelectScrollDownButton = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"](({ className, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ScrollDownButton"], {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("flex cursor-default items-center justify-center py-1", className),
        ...props,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__["ChevronDown"], {
            className: "h-4 w-4"
        }, void 0, false, {
            fileName: "[project]/src/components/ui/select.tsx",
            lineNumber: 56,
            columnNumber: 5
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/src/components/ui/select.tsx",
        lineNumber: 51,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0)));
_c3 = SelectScrollDownButton;
SelectScrollDownButton.displayName = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ScrollDownButton"].displayName;
const SelectContent = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"](_c4 = ({ className, children, position = "popper", ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Portal"], {
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Content"], {
            ref: ref,
            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2", position === "popper" && "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1", className),
            position: position,
            ...props,
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SelectScrollUpButton, {}, void 0, false, {
                    fileName: "[project]/src/components/ui/select.tsx",
                    lineNumber: 77,
                    columnNumber: 7
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Viewport"], {
                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("p-1", position === "popper" && "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"),
                    children: children
                }, void 0, false, {
                    fileName: "[project]/src/components/ui/select.tsx",
                    lineNumber: 78,
                    columnNumber: 7
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SelectScrollDownButton, {}, void 0, false, {
                    fileName: "[project]/src/components/ui/select.tsx",
                    lineNumber: 87,
                    columnNumber: 7
                }, ("TURBOPACK compile-time value", void 0))
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/ui/select.tsx",
            lineNumber: 66,
            columnNumber: 5
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/src/components/ui/select.tsx",
        lineNumber: 65,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0)));
_c5 = SelectContent;
SelectContent.displayName = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Content"].displayName;
const SelectLabel = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"](_c6 = ({ className, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("py-1.5 pl-8 pr-2 text-sm font-semibold", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/select.tsx",
        lineNumber: 97,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0)));
_c7 = SelectLabel;
SelectLabel.displayName = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"].displayName;
const SelectItem = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"](_c8 = ({ className, children, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Item"], {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 focus:bg-accent focus:text-accent-foreground", className),
        ...props,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ItemIndicator"], {
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__["Check"], {
                        className: "h-4 w-4"
                    }, void 0, false, {
                        fileName: "[project]/src/components/ui/select.tsx",
                        lineNumber: 115,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                }, void 0, false, {
                    fileName: "[project]/src/components/ui/select.tsx",
                    lineNumber: 114,
                    columnNumber: 7
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/src/components/ui/select.tsx",
                lineNumber: 113,
                columnNumber: 5
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ItemText"], {
                children: children
            }, void 0, false, {
                fileName: "[project]/src/components/ui/select.tsx",
                lineNumber: 119,
                columnNumber: 5
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/ui/select.tsx",
        lineNumber: 105,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0)));
_c9 = SelectItem;
SelectItem.displayName = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Item"].displayName;
const SelectSeparator = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"](_c10 = ({ className, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Separator"], {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("-mx-1 my-1 h-px bg-muted", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/select.tsx",
        lineNumber: 128,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0)));
_c11 = SelectSeparator;
SelectSeparator.displayName = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Separator"].displayName;
;
var _c, _c1, _c2, _c3, _c4, _c5, _c6, _c7, _c8, _c9, _c10, _c11;
__turbopack_context__.k.register(_c, "SelectTrigger$React.forwardRef");
__turbopack_context__.k.register(_c1, "SelectTrigger");
__turbopack_context__.k.register(_c2, "SelectScrollUpButton");
__turbopack_context__.k.register(_c3, "SelectScrollDownButton");
__turbopack_context__.k.register(_c4, "SelectContent$React.forwardRef");
__turbopack_context__.k.register(_c5, "SelectContent");
__turbopack_context__.k.register(_c6, "SelectLabel$React.forwardRef");
__turbopack_context__.k.register(_c7, "SelectLabel");
__turbopack_context__.k.register(_c8, "SelectItem$React.forwardRef");
__turbopack_context__.k.register(_c9, "SelectItem");
__turbopack_context__.k.register(_c10, "SelectSeparator$React.forwardRef");
__turbopack_context__.k.register(_c11, "SelectSeparator");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/features/doctor/prescriptions/data:2d1ff4 [app-client] (ecmascript) <text/javascript>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "issuePrescription",
    ()=>$$RSC_SERVER_ACTION_0
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-client-wrapper.js [app-client] (ecmascript)");
/* __next_internal_action_entry_do_not_use__ [{"40826c30ba294216730ad084ad9aac0bb6df40a70f":"issuePrescription"},"features/doctor/prescriptions/actions.ts",""] */ "use turbopack no side effects";
;
const $$RSC_SERVER_ACTION_0 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createServerReference"])("40826c30ba294216730ad084ad9aac0bb6df40a70f", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["callServer"], void 0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["findSourceMapURL"], "issuePrescription");
;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
 //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4vYWN0aW9ucy50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzZXJ2ZXJcIjtcblxuaW50ZXJmYWNlIElzc3VlUHJlc2NyaXB0aW9uSW5wdXQge1xuICBhcHBvaW50bWVudElkPzogc3RyaW5nO1xuICBwYXRpZW50SWQ6IHN0cmluZztcbiAgZG9jdG9ySWQ6IHN0cmluZztcbiAgZGlhZ25vc2lzOiBzdHJpbmc7XG4gIG1lZGljYXRpb25zOiBzdHJpbmc7XG4gIGluc3RydWN0aW9uczogc3RyaW5nO1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gaXNzdWVQcmVzY3JpcHRpb24oaW5wdXQ6IElzc3VlUHJlc2NyaXB0aW9uSW5wdXQpIHtcbiAgcmV0dXJuIHtcbiAgICBpZDogYHJ4LSR7RGF0ZS5ub3coKX1gLFxuICAgIGFwcG9pbnRtZW50SWQ6IGlucHV0LmFwcG9pbnRtZW50SWQgPz8gJycsXG4gICAgcGF0aWVudElkOiBpbnB1dC5wYXRpZW50SWQsXG4gICAgZG9jdG9ySWQ6IGlucHV0LmRvY3RvcklkLFxuICAgIGRhdGU6IG5ldyBEYXRlKCkudG9JU09TdHJpbmcoKS5zcGxpdCgnVCcpWzBdLFxuICAgIGRpYWdub3NpczogaW5wdXQuZGlhZ25vc2lzIHx8ICdHZW5lcmFsIENvbnN1bHRhdGlvbicsXG4gICAgbWVkaWNhdGlvbnM6IGlucHV0Lm1lZGljYXRpb25zXG4gICAgICAuc3BsaXQoJ1xcbicpXG4gICAgICAuZmlsdGVyKEJvb2xlYW4pXG4gICAgICAubWFwKChsaW5lKSA9PiAoe1xuICAgICAgICBuYW1lOiBsaW5lLnNwbGl0KCctJylbMF0/LnRyaW0oKSB8fCBsaW5lLnRyaW0oKSxcbiAgICAgICAgZG9zYWdlOiBsaW5lLnNwbGl0KCctJylbMV0/LnRyaW0oKSB8fCAnNTAwbWcnLFxuICAgICAgICBmcmVxdWVuY3k6ICdPbmNlIGRhaWx5JyxcbiAgICAgICAgZHVyYXRpb246ICc3IGRheXMnLFxuICAgICAgfSkpLFxuICAgIGluc3RydWN0aW9uczogaW5wdXQuaW5zdHJ1Y3Rpb25zIHx8ICdUYWtlIHdpdGggZm9vZC4gU3RheSBoeWRyYXRlZC4nLFxuICAgIHZhbGlkVW50aWw6IG5ldyBEYXRlKERhdGUubm93KCkgKyAzMCAqIDI0ICogNjAgKiA2MCAqIDEwMDApLnRvSVNPU3RyaW5nKCkuc3BsaXQoJ1QnKVswXSxcbiAgICBpc0RpZ2l0YWw6IHRydWUsXG4gIH07XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXREb2N0b3JQcmVzY3JpcHRpb25zKGRvY3RvcklkOiBzdHJpbmcpIHtcbiAgcmV0dXJuIHtcbiAgICBkb2N0b3JJZCxcbiAgICBmZXRjaGVkQXQ6IG5ldyBEYXRlKCkudG9JU09TdHJpbmcoKSxcbiAgfTtcbn1cbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOFNBV3NCLDhMQUFBIn0=
}),
"[project]/features/doctor/prescriptions/data:20d0a7 [app-client] (ecmascript) <text/javascript>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getDoctorPrescriptions",
    ()=>$$RSC_SERVER_ACTION_1
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-client-wrapper.js [app-client] (ecmascript)");
/* __next_internal_action_entry_do_not_use__ [{"40601638647a5a450f59562f3449afa5b836e4fb4a":"getDoctorPrescriptions"},"features/doctor/prescriptions/actions.ts",""] */ "use turbopack no side effects";
;
const $$RSC_SERVER_ACTION_1 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createServerReference"])("40601638647a5a450f59562f3449afa5b836e4fb4a", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["callServer"], void 0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["findSourceMapURL"], "getDoctorPrescriptions");
;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
 //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4vYWN0aW9ucy50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzZXJ2ZXJcIjtcblxuaW50ZXJmYWNlIElzc3VlUHJlc2NyaXB0aW9uSW5wdXQge1xuICBhcHBvaW50bWVudElkPzogc3RyaW5nO1xuICBwYXRpZW50SWQ6IHN0cmluZztcbiAgZG9jdG9ySWQ6IHN0cmluZztcbiAgZGlhZ25vc2lzOiBzdHJpbmc7XG4gIG1lZGljYXRpb25zOiBzdHJpbmc7XG4gIGluc3RydWN0aW9uczogc3RyaW5nO1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gaXNzdWVQcmVzY3JpcHRpb24oaW5wdXQ6IElzc3VlUHJlc2NyaXB0aW9uSW5wdXQpIHtcbiAgcmV0dXJuIHtcbiAgICBpZDogYHJ4LSR7RGF0ZS5ub3coKX1gLFxuICAgIGFwcG9pbnRtZW50SWQ6IGlucHV0LmFwcG9pbnRtZW50SWQgPz8gJycsXG4gICAgcGF0aWVudElkOiBpbnB1dC5wYXRpZW50SWQsXG4gICAgZG9jdG9ySWQ6IGlucHV0LmRvY3RvcklkLFxuICAgIGRhdGU6IG5ldyBEYXRlKCkudG9JU09TdHJpbmcoKS5zcGxpdCgnVCcpWzBdLFxuICAgIGRpYWdub3NpczogaW5wdXQuZGlhZ25vc2lzIHx8ICdHZW5lcmFsIENvbnN1bHRhdGlvbicsXG4gICAgbWVkaWNhdGlvbnM6IGlucHV0Lm1lZGljYXRpb25zXG4gICAgICAuc3BsaXQoJ1xcbicpXG4gICAgICAuZmlsdGVyKEJvb2xlYW4pXG4gICAgICAubWFwKChsaW5lKSA9PiAoe1xuICAgICAgICBuYW1lOiBsaW5lLnNwbGl0KCctJylbMF0/LnRyaW0oKSB8fCBsaW5lLnRyaW0oKSxcbiAgICAgICAgZG9zYWdlOiBsaW5lLnNwbGl0KCctJylbMV0/LnRyaW0oKSB8fCAnNTAwbWcnLFxuICAgICAgICBmcmVxdWVuY3k6ICdPbmNlIGRhaWx5JyxcbiAgICAgICAgZHVyYXRpb246ICc3IGRheXMnLFxuICAgICAgfSkpLFxuICAgIGluc3RydWN0aW9uczogaW5wdXQuaW5zdHJ1Y3Rpb25zIHx8ICdUYWtlIHdpdGggZm9vZC4gU3RheSBoeWRyYXRlZC4nLFxuICAgIHZhbGlkVW50aWw6IG5ldyBEYXRlKERhdGUubm93KCkgKyAzMCAqIDI0ICogNjAgKiA2MCAqIDEwMDApLnRvSVNPU3RyaW5nKCkuc3BsaXQoJ1QnKVswXSxcbiAgICBpc0RpZ2l0YWw6IHRydWUsXG4gIH07XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXREb2N0b3JQcmVzY3JpcHRpb25zKGRvY3RvcklkOiBzdHJpbmcpIHtcbiAgcmV0dXJuIHtcbiAgICBkb2N0b3JJZCxcbiAgICBmZXRjaGVkQXQ6IG5ldyBEYXRlKCkudG9JU09TdHJpbmcoKSxcbiAgfTtcbn1cbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoibVRBa0NzQixtTUFBQSJ9
}),
"[project]/app/(doctor)/doctor/prescriptions/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>DoctorPrescriptionsPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$format$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/date-fns/format.mjs [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$isAfter$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/date-fns/isAfter.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$subDays$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/date-fns/subDays.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Calendar$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/calendar.js [app-client] (ecmascript) <export default as Calendar>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/file-text.js [app-client] (ecmascript) <export default as FileText>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$message$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MessageCircle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/message-circle.js [app-client] (ecmascript) <export default as MessageCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/plus.js [app-client] (ecmascript) <export default as Plus>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$printer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Printer$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/printer.js [app-client] (ecmascript) <export default as Printer>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/search.js [app-client] (ecmascript) <export default as Search>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__User$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/user.js [app-client] (ecmascript) <export default as User>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$zap$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Zap$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/zap.js [app-client] (ecmascript) <export default as Zap>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$mockData$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/data/mockData.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/store/index.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$use$2d$toast$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/hooks/use-toast.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$recordsStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/store/recordsStore.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$chatService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/chatService.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/card.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/badge.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$avatar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/avatar.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/input.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$skeleton$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/skeleton.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/dialog.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/dropdown-menu.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$textarea$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/textarea.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/select.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$doctor$2f$prescriptions$2f$data$3a$2d1ff4__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__ = __turbopack_context__.i("[project]/features/doctor/prescriptions/data:2d1ff4 [app-client] (ecmascript) <text/javascript>");
var __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$doctor$2f$prescriptions$2f$data$3a$20d0a7__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__ = __turbopack_context__.i("[project]/features/doctor/prescriptions/data:20d0a7 [app-client] (ecmascript) <text/javascript>");
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
const statusLabel = (rx)=>{
    const today = new Date();
    const validUntil = new Date(rx.validUntil);
    return validUntil >= today ? 'Active' : 'Expired';
};
const buildMedSummary = (meds)=>meds.slice(0, 2).map((m)=>`${m.name} ${m.dosage}`).join(' + ') + (meds.length > 2 ? ` +${meds.length - 2}` : '');
function DoctorPrescriptionsPage() {
    _s();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const { user } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuthStore"])();
    const { toast } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$use$2d$toast$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useToast"])();
    const { prescriptions, setPrescriptions, addPrescriptionFromConsult } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$recordsStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRecordsStore"])();
    const doctor = user;
    const doctorId = doctor?.id ?? '';
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [searchQuery, setSearchQuery] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [filterMode, setFilterMode] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('recent');
    const [selected, setSelected] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [detailOpen, setDetailOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [issueOpen, setIssueOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [printOpen, setPrintOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [patientId, setPatientId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [diagnosis, setDiagnosis] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [instructions, setInstructions] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [meds, setMeds] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([
        {
            name: 'Paracetamol',
            dosage: '500mg',
            frequency: 'Every 6 hours',
            duration: '3 days'
        }
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "DoctorPrescriptionsPage.useEffect": ()=>{
            const load = {
                "DoctorPrescriptionsPage.useEffect.load": async ()=>{
                    if (!doctorId) return;
                    setLoading(true);
                    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$doctor$2f$prescriptions$2f$data$3a$20d0a7__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__["getDoctorPrescriptions"])(doctorId);
                    if (prescriptions.length === 0) {
                        setPrescriptions(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$mockData$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mockPrescriptions"]);
                    }
                    setLoading(false);
                }
            }["DoctorPrescriptionsPage.useEffect.load"];
            load();
        }
    }["DoctorPrescriptionsPage.useEffect"], [
        doctorId,
        prescriptions.length,
        setPrescriptions
    ]);
    const enriched = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "DoctorPrescriptionsPage.useMemo[enriched]": ()=>{
            return prescriptions.map({
                "DoctorPrescriptionsPage.useMemo[enriched]": (rx)=>({
                        ...rx,
                        patient: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$mockData$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mockPatients"].find({
                            "DoctorPrescriptionsPage.useMemo[enriched]": (p)=>p.id === rx.patientId
                        }["DoctorPrescriptionsPage.useMemo[enriched]"])
                    })
            }["DoctorPrescriptionsPage.useMemo[enriched]"]);
        }
    }["DoctorPrescriptionsPage.useMemo[enriched]"], [
        prescriptions
    ]);
    const filtered = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "DoctorPrescriptionsPage.useMemo[filtered]": ()=>{
            const query = searchQuery.toLowerCase();
            const weekLimit = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$subDays$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["subDays"])(new Date(), 7);
            return enriched.filter({
                "DoctorPrescriptionsPage.useMemo[filtered]": (rx)=>{
                    const matches = rx.patient?.name?.toLowerCase().includes(query) || rx.medications.some({
                        "DoctorPrescriptionsPage.useMemo[filtered]": (m)=>m.name.toLowerCase().includes(query)
                    }["DoctorPrescriptionsPage.useMemo[filtered]"]) || rx.diagnosis.toLowerCase().includes(query);
                    if (!matches) return false;
                    if (filterMode === 'week') return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$isAfter$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isAfter"])(new Date(rx.date), weekLimit);
                    if (filterMode === 'recent') return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$isAfter$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isAfter"])(new Date(rx.date), (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$subDays$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["subDays"])(new Date(), 30));
                    return true;
                }
            }["DoctorPrescriptionsPage.useMemo[filtered]"]);
        }
    }["DoctorPrescriptionsPage.useMemo[filtered]"], [
        enriched,
        filterMode,
        searchQuery
    ]);
    const handleIssue = async ()=>{
        if (!user) return;
        if (!patientId || meds.length === 0) {
            toast({
                title: 'Add patient and medicines first'
            });
            return;
        }
        const medLines = meds.map((m)=>`${m.name} - ${m.dosage} - ${m.frequency} - ${m.duration}`).join('\n');
        const issued = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$doctor$2f$prescriptions$2f$data$3a$2d1ff4__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__["issuePrescription"])({
            appointmentId: '',
            patientId,
            doctorId: user.id,
            diagnosis,
            medications: medLines,
            instructions
        });
        const newRx = {
            ...issued,
            medications: meds,
            diagnosis: diagnosis || issued.diagnosis,
            instructions: instructions || issued.instructions,
            isDigital: true
        };
        addPrescriptionFromConsult(newRx);
        setIssueOpen(false);
        setPatientId('');
        setDiagnosis('');
        setInstructions('');
        setMeds([
            {
                name: 'Paracetamol',
                dosage: '500mg',
                frequency: 'Every 6 hours',
                duration: '3 days'
            }
        ]);
        const conversationId = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$chatService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["chatService"].createConversation(patientId, user.id);
        if (conversationId.success) {
            await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$chatService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["chatService"].sendMessage(conversationId.data.id, user.id, 'doctor', 'E-prescription sent. Please check My Files.', 'prescription');
        }
        toast({
            title: 'Prescription issued',
            description: 'Sent to patient files.'
        });
    };
    const handleMessagePatient = async (patient)=>{
        if (!user || !patient) return;
        const convRes = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$chatService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["chatService"].createConversation(patient.id, user.id);
        if (convRes.success) {
            router.push(`/doctor/messages?conversation=${convRes.data.id}`);
        }
    };
    const handleIssueForPatient = (rx)=>{
        setPatientId(rx.patientId);
        setDiagnosis(rx.diagnosis);
        setInstructions(rx.instructions);
        setMeds(rx.medications);
        setIssueOpen(true);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-6",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-col xl:flex-row justify-between items-start xl:items-center gap-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                className: "text-2xl font-bold text-foreground",
                                children: "Prescriptions"
                            }, void 0, false, {
                                fileName: "[project]/app/(doctor)/doctor/prescriptions/page.tsx",
                                lineNumber: 183,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-muted-foreground",
                                children: "Issue, review, and reprint digital prescriptions."
                            }, void 0, false, {
                                fileName: "[project]/app/(doctor)/doctor/prescriptions/page.tsx",
                                lineNumber: 184,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-wrap items-center gap-2 mt-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
                                        className: "bg-primary/10 text-primary border-primary/20",
                                        children: [
                                            prescriptions.length,
                                            " issued"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/(doctor)/doctor/prescriptions/page.tsx",
                                        lineNumber: 186,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
                                        variant: "secondary",
                                        children: [
                                            filtered.length,
                                            " shown"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/(doctor)/doctor/prescriptions/page.tsx",
                                        lineNumber: 187,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/(doctor)/doctor/prescriptions/page.tsx",
                                lineNumber: 185,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/(doctor)/doctor/prescriptions/page.tsx",
                        lineNumber: 182,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                        className: "gap-2",
                        onClick: ()=>setIssueOpen(true),
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__["Plus"], {
                                className: "h-4 w-4"
                            }, void 0, false, {
                                fileName: "[project]/app/(doctor)/doctor/prescriptions/page.tsx",
                                lineNumber: 191,
                                columnNumber: 11
                            }, this),
                            "Issue New Prescription"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/(doctor)/doctor/prescriptions/page.tsx",
                        lineNumber: 190,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/(doctor)/doctor/prescriptions/page.tsx",
                lineNumber: 181,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-col lg:flex-row lg:items-center gap-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "relative max-w-md w-full",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__["Search"], {
                                className: "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground"
                            }, void 0, false, {
                                fileName: "[project]/app/(doctor)/doctor/prescriptions/page.tsx",
                                lineNumber: 198,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                placeholder: "Search patient, medicine, or diagnosis...",
                                value: searchQuery,
                                onChange: (e)=>setSearchQuery(e.target.value),
                                className: "pl-10"
                            }, void 0, false, {
                                fileName: "[project]/app/(doctor)/doctor/prescriptions/page.tsx",
                                lineNumber: 199,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/(doctor)/doctor/prescriptions/page.tsx",
                        lineNumber: 197,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-wrap gap-2",
                        children: [
                            'recent',
                            'week',
                            'all'
                        ].map((mode)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                size: "sm",
                                variant: filterMode === mode ? 'default' : 'outline',
                                onClick: ()=>setFilterMode(mode),
                                children: mode === 'recent' ? 'Recent' : mode === 'week' ? 'This Week' : 'All'
                            }, mode, false, {
                                fileName: "[project]/app/(doctor)/doctor/prescriptions/page.tsx",
                                lineNumber: 208,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/app/(doctor)/doctor/prescriptions/page.tsx",
                        lineNumber: 206,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/(doctor)/doctor/prescriptions/page.tsx",
                lineNumber: 196,
                columnNumber: 7
            }, this),
            loading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid md:grid-cols-2 xl:grid-cols-3 gap-4",
                children: [
                    1,
                    2,
                    3
                ].map((i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$skeleton$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Skeleton"], {
                        className: "h-44 rounded-xl"
                    }, i, false, {
                        fileName: "[project]/app/(doctor)/doctor/prescriptions/page.tsx",
                        lineNumber: 223,
                        columnNumber: 13
                    }, this))
            }, void 0, false, {
                fileName: "[project]/app/(doctor)/doctor/prescriptions/page.tsx",
                lineNumber: 221,
                columnNumber: 9
            }, this) : filtered.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(EmptyState, {
                icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__["FileText"], {
                    className: "h-12 w-12 text-muted-foreground/40"
                }, void 0, false, {
                    fileName: "[project]/app/(doctor)/doctor/prescriptions/page.tsx",
                    lineNumber: 228,
                    columnNumber: 17
                }, void 0),
                title: "No prescriptions issued yet",
                description: "Start a consult or issue a prescription to see it here.",
                action: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex flex-wrap gap-2 justify-center",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                            size: "sm",
                            variant: "outline",
                            onClick: ()=>router.push('/doctor/patients'),
                            children: "View Patients"
                        }, void 0, false, {
                            fileName: "[project]/app/(doctor)/doctor/prescriptions/page.tsx",
                            lineNumber: 233,
                            columnNumber: 15
                        }, void 0),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                            size: "sm",
                            className: "gap-2",
                            onClick: ()=>router.push('/doctor/queue'),
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Calendar$3e$__["Calendar"], {
                                    className: "h-4 w-4"
                                }, void 0, false, {
                                    fileName: "[project]/app/(doctor)/doctor/prescriptions/page.tsx",
                                    lineNumber: 237,
                                    columnNumber: 17
                                }, void 0),
                                "View Queue"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/(doctor)/doctor/prescriptions/page.tsx",
                            lineNumber: 236,
                            columnNumber: 15
                        }, void 0)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/(doctor)/doctor/prescriptions/page.tsx",
                    lineNumber: 232,
                    columnNumber: 13
                }, void 0)
            }, void 0, false, {
                fileName: "[project]/app/(doctor)/doctor/prescriptions/page.tsx",
                lineNumber: 227,
                columnNumber: 9
            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid md:grid-cols-2 xl:grid-cols-3 gap-4",
                children: filtered.map((rx, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                        initial: {
                            opacity: 0,
                            y: 16
                        },
                        animate: {
                            opacity: 1,
                            y: 0
                        },
                        transition: {
                            delay: index * 0.04
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
                            className: `h-full ${statusLabel(rx) === 'Active' ? 'border-primary/20 bg-primary/5' : ''}`,
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardContent"], {
                                className: "p-4 flex flex-col gap-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-start gap-3",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$avatar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Avatar"], {
                                                className: "h-12 w-12",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$avatar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AvatarImage"], {
                                                        src: rx.patient?.avatar
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/(doctor)/doctor/prescriptions/page.tsx",
                                                        lineNumber: 256,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$avatar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AvatarFallback"], {
                                                        children: rx.patient?.name?.[0]
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/(doctor)/doctor/prescriptions/page.tsx",
                                                        lineNumber: 257,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/(doctor)/doctor/prescriptions/page.tsx",
                                                lineNumber: 255,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex-1 min-w-0",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "font-semibold truncate",
                                                        children: rx.patient?.name ?? 'Unknown patient'
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/(doctor)/doctor/prescriptions/page.tsx",
                                                        lineNumber: 260,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-xs text-muted-foreground truncate",
                                                        children: [
                                                            "Issued ",
                                                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$format$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["format"])(new Date(rx.date), 'MMM d, yyyy')
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/(doctor)/doctor/prescriptions/page.tsx",
                                                        lineNumber: 261,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-xs text-muted-foreground truncate",
                                                        children: buildMedSummary(rx.medications)
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/(doctor)/doctor/prescriptions/page.tsx",
                                                        lineNumber: 264,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/(doctor)/doctor/prescriptions/page.tsx",
                                                lineNumber: 259,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DropdownMenu"], {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DropdownMenuTrigger"], {
                                                        asChild: true,
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                                            variant: "ghost",
                                                            size: "icon",
                                                            className: "h-8 w-8",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__["FileText"], {
                                                                className: "h-4 w-4"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/(doctor)/doctor/prescriptions/page.tsx",
                                                                lineNumber: 271,
                                                                columnNumber: 27
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/(doctor)/doctor/prescriptions/page.tsx",
                                                            lineNumber: 270,
                                                            columnNumber: 25
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/(doctor)/doctor/prescriptions/page.tsx",
                                                        lineNumber: 269,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DropdownMenuContent"], {
                                                        align: "end",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DropdownMenuItem"], {
                                                                onClick: ()=>{
                                                                    setSelected(rx);
                                                                    setDetailOpen(true);
                                                                },
                                                                children: "View Details"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/(doctor)/doctor/prescriptions/page.tsx",
                                                                lineNumber: 275,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DropdownMenuItem"], {
                                                                onClick: ()=>{
                                                                    setSelected(rx);
                                                                    setPrintOpen(true);
                                                                },
                                                                children: "Reprint"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/(doctor)/doctor/prescriptions/page.tsx",
                                                                lineNumber: 283,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DropdownMenuSeparator"], {}, void 0, false, {
                                                                fileName: "[project]/app/(doctor)/doctor/prescriptions/page.tsx",
                                                                lineNumber: 291,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DropdownMenuItem"], {
                                                                onClick: ()=>handleMessagePatient(rx.patient),
                                                                children: "Message Patient"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/(doctor)/doctor/prescriptions/page.tsx",
                                                                lineNumber: 292,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DropdownMenuItem"], {
                                                                onClick: ()=>handleIssueForPatient(rx),
                                                                children: "Issue New"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/(doctor)/doctor/prescriptions/page.tsx",
                                                                lineNumber: 295,
                                                                columnNumber: 25
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/(doctor)/doctor/prescriptions/page.tsx",
                                                        lineNumber: 274,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/(doctor)/doctor/prescriptions/page.tsx",
                                                lineNumber: 268,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/(doctor)/doctor/prescriptions/page.tsx",
                                        lineNumber: 254,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex flex-wrap items-center gap-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
                                                className: statusLabel(rx) === 'Active' ? 'bg-success/15 text-success border-success/30' : 'bg-muted text-muted-foreground border-border',
                                                children: statusLabel(rx)
                                            }, void 0, false, {
                                                fileName: "[project]/app/(doctor)/doctor/prescriptions/page.tsx",
                                                lineNumber: 303,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
                                                variant: "secondary",
                                                children: [
                                                    rx.medications.length,
                                                    " meds"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/(doctor)/doctor/prescriptions/page.tsx",
                                                lineNumber: 306,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/(doctor)/doctor/prescriptions/page.tsx",
                                        lineNumber: 302,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex flex-wrap gap-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                                size: "sm",
                                                className: "gap-1.5",
                                                onClick: ()=>{
                                                    setSelected(rx);
                                                    setDetailOpen(true);
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__User$3e$__["User"], {
                                                        className: "h-3.5 w-3.5"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/(doctor)/doctor/prescriptions/page.tsx",
                                                        lineNumber: 318,
                                                        columnNumber: 23
                                                    }, this),
                                                    "View"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/(doctor)/doctor/prescriptions/page.tsx",
                                                lineNumber: 310,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                                size: "sm",
                                                variant: "outline",
                                                className: "gap-1.5",
                                                onClick: ()=>{
                                                    setSelected(rx);
                                                    setPrintOpen(true);
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$printer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Printer$3e$__["Printer"], {
                                                        className: "h-3.5 w-3.5"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/(doctor)/doctor/prescriptions/page.tsx",
                                                        lineNumber: 330,
                                                        columnNumber: 23
                                                    }, this),
                                                    "Reprint"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/(doctor)/doctor/prescriptions/page.tsx",
                                                lineNumber: 321,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                                size: "sm",
                                                variant: "outline",
                                                className: "gap-1.5",
                                                onClick: ()=>handleMessagePatient(rx.patient),
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$message$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MessageCircle$3e$__["MessageCircle"], {
                                                        className: "h-3.5 w-3.5"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/(doctor)/doctor/prescriptions/page.tsx",
                                                        lineNumber: 334,
                                                        columnNumber: 23
                                                    }, this),
                                                    "Message"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/(doctor)/doctor/prescriptions/page.tsx",
                                                lineNumber: 333,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/(doctor)/doctor/prescriptions/page.tsx",
                                        lineNumber: 309,
                                        columnNumber: 19
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/(doctor)/doctor/prescriptions/page.tsx",
                                lineNumber: 253,
                                columnNumber: 17
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/app/(doctor)/doctor/prescriptions/page.tsx",
                            lineNumber: 252,
                            columnNumber: 15
                        }, this)
                    }, rx.id, false, {
                        fileName: "[project]/app/(doctor)/doctor/prescriptions/page.tsx",
                        lineNumber: 246,
                        columnNumber: 13
                    }, this))
            }, void 0, false, {
                fileName: "[project]/app/(doctor)/doctor/prescriptions/page.tsx",
                lineNumber: 244,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Dialog"], {
                open: detailOpen,
                onOpenChange: setDetailOpen,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogContent"], {
                    className: "max-w-2xl",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogHeader"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogTitle"], {
                                    children: "Prescription Details"
                                }, void 0, false, {
                                    fileName: "[project]/app/(doctor)/doctor/prescriptions/page.tsx",
                                    lineNumber: 348,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogDescription"], {
                                    children: "Review issued medicines and instructions."
                                }, void 0, false, {
                                    fileName: "[project]/app/(doctor)/doctor/prescriptions/page.tsx",
                                    lineNumber: 349,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/(doctor)/doctor/prescriptions/page.tsx",
                            lineNumber: 347,
                            columnNumber: 11
                        }, this),
                        selected && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "space-y-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-3",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$avatar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Avatar"], {
                                            className: "h-12 w-12",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$avatar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AvatarImage"], {
                                                    src: selected.patient?.avatar
                                                }, void 0, false, {
                                                    fileName: "[project]/app/(doctor)/doctor/prescriptions/page.tsx",
                                                    lineNumber: 355,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$avatar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AvatarFallback"], {
                                                    children: selected.patient?.name?.[0]
                                                }, void 0, false, {
                                                    fileName: "[project]/app/(doctor)/doctor/prescriptions/page.tsx",
                                                    lineNumber: 356,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/(doctor)/doctor/prescriptions/page.tsx",
                                            lineNumber: 354,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "font-semibold",
                                                    children: selected.patient?.name
                                                }, void 0, false, {
                                                    fileName: "[project]/app/(doctor)/doctor/prescriptions/page.tsx",
                                                    lineNumber: 359,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-xs text-muted-foreground",
                                                    children: [
                                                        "Issued ",
                                                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$format$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["format"])(new Date(selected.date), 'MMM d, yyyy')
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/(doctor)/doctor/prescriptions/page.tsx",
                                                    lineNumber: 360,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/(doctor)/doctor/prescriptions/page.tsx",
                                            lineNumber: 358,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/(doctor)/doctor/prescriptions/page.tsx",
                                    lineNumber: 353,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "rounded-lg border border-border p-3 space-y-2",
                                    children: selected.medications.map((med, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex flex-col sm:flex-row sm:items-center justify-between gap-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "font-medium text-sm",
                                                            children: med.name
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/(doctor)/doctor/prescriptions/page.tsx",
                                                            lineNumber: 367,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-xs text-muted-foreground",
                                                            children: [
                                                                med.dosage,
                                                                " • ",
                                                                med.frequency,
                                                                " • ",
                                                                med.duration
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/(doctor)/doctor/prescriptions/page.tsx",
                                                            lineNumber: 368,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/(doctor)/doctor/prescriptions/page.tsx",
                                                    lineNumber: 366,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
                                                    variant: "outline",
                                                    children: "Active"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/(doctor)/doctor/prescriptions/page.tsx",
                                                    lineNumber: 370,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, `${med.name}-${index}`, true, {
                                            fileName: "[project]/app/(doctor)/doctor/prescriptions/page.tsx",
                                            lineNumber: 365,
                                            columnNumber: 19
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/app/(doctor)/doctor/prescriptions/page.tsx",
                                    lineNumber: 363,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "rounded-lg border border-border p-3 text-sm",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-muted-foreground text-xs mb-1",
                                            children: "Instructions"
                                        }, void 0, false, {
                                            fileName: "[project]/app/(doctor)/doctor/prescriptions/page.tsx",
                                            lineNumber: 375,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            children: selected.instructions
                                        }, void 0, false, {
                                            fileName: "[project]/app/(doctor)/doctor/prescriptions/page.tsx",
                                            lineNumber: 376,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/(doctor)/doctor/prescriptions/page.tsx",
                                    lineNumber: 374,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex flex-wrap gap-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                            size: "sm",
                                            className: "gap-2",
                                            onClick: ()=>setPrintOpen(true),
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$printer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Printer$3e$__["Printer"], {
                                                    className: "h-4 w-4"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/(doctor)/doctor/prescriptions/page.tsx",
                                                    lineNumber: 380,
                                                    columnNumber: 19
                                                }, this),
                                                "Reprint"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/(doctor)/doctor/prescriptions/page.tsx",
                                            lineNumber: 379,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                            size: "sm",
                                            variant: "outline",
                                            onClick: ()=>handleMessagePatient(selected.patient),
                                            children: "Message Patient"
                                        }, void 0, false, {
                                            fileName: "[project]/app/(doctor)/doctor/prescriptions/page.tsx",
                                            lineNumber: 383,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/(doctor)/doctor/prescriptions/page.tsx",
                                    lineNumber: 378,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/(doctor)/doctor/prescriptions/page.tsx",
                            lineNumber: 352,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/(doctor)/doctor/prescriptions/page.tsx",
                    lineNumber: 346,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/(doctor)/doctor/prescriptions/page.tsx",
                lineNumber: 345,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Dialog"], {
                open: printOpen,
                onOpenChange: setPrintOpen,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogContent"], {
                    className: "max-w-lg",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogHeader"], {
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogTitle"], {
                                children: "Prescription Preview"
                            }, void 0, false, {
                                fileName: "[project]/app/(doctor)/doctor/prescriptions/page.tsx",
                                lineNumber: 395,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/app/(doctor)/doctor/prescriptions/page.tsx",
                            lineNumber: 394,
                            columnNumber: 11
                        }, this),
                        selected ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "space-y-3 text-sm",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "rounded-lg border border-border p-3",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "font-semibold",
                                            children: selected.patient?.name
                                        }, void 0, false, {
                                            fileName: "[project]/app/(doctor)/doctor/prescriptions/page.tsx",
                                            lineNumber: 400,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-xs text-muted-foreground",
                                            children: [
                                                "Issued ",
                                                selected.date
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/(doctor)/doctor/prescriptions/page.tsx",
                                            lineNumber: 401,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/(doctor)/doctor/prescriptions/page.tsx",
                                    lineNumber: 399,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "rounded-lg border border-border p-3 space-y-2",
                                    children: selected.medications.map((med, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex justify-between",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    children: med.name
                                                }, void 0, false, {
                                                    fileName: "[project]/app/(doctor)/doctor/prescriptions/page.tsx",
                                                    lineNumber: 406,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-muted-foreground",
                                                    children: med.dosage
                                                }, void 0, false, {
                                                    fileName: "[project]/app/(doctor)/doctor/prescriptions/page.tsx",
                                                    lineNumber: 407,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, `${med.name}-${index}`, true, {
                                            fileName: "[project]/app/(doctor)/doctor/prescriptions/page.tsx",
                                            lineNumber: 405,
                                            columnNumber: 19
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/app/(doctor)/doctor/prescriptions/page.tsx",
                                    lineNumber: 403,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                    className: "gap-2",
                                    onClick: ()=>toast({
                                            title: 'Reprint queued'
                                        }),
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$printer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Printer$3e$__["Printer"], {
                                            className: "h-4 w-4"
                                        }, void 0, false, {
                                            fileName: "[project]/app/(doctor)/doctor/prescriptions/page.tsx",
                                            lineNumber: 412,
                                            columnNumber: 17
                                        }, this),
                                        "Print PDF"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/(doctor)/doctor/prescriptions/page.tsx",
                                    lineNumber: 411,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/(doctor)/doctor/prescriptions/page.tsx",
                            lineNumber: 398,
                            columnNumber: 13
                        }, this) : null
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/(doctor)/doctor/prescriptions/page.tsx",
                    lineNumber: 393,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/(doctor)/doctor/prescriptions/page.tsx",
                lineNumber: 392,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Dialog"], {
                open: issueOpen,
                onOpenChange: setIssueOpen,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogContent"], {
                    className: "max-w-2xl",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogHeader"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogTitle"], {
                                    children: "Issue New Prescription"
                                }, void 0, false, {
                                    fileName: "[project]/app/(doctor)/doctor/prescriptions/page.tsx",
                                    lineNumber: 423,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogDescription"], {
                                    children: "Fill in medicines, dosage, and instructions."
                                }, void 0, false, {
                                    fileName: "[project]/app/(doctor)/doctor/prescriptions/page.tsx",
                                    lineNumber: 424,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/(doctor)/doctor/prescriptions/page.tsx",
                            lineNumber: 422,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "space-y-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "grid sm:grid-cols-2 gap-3",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                    className: "text-xs text-muted-foreground",
                                                    children: "Patient"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/(doctor)/doctor/prescriptions/page.tsx",
                                                    lineNumber: 429,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Select"], {
                                                    value: patientId,
                                                    onValueChange: setPatientId,
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectTrigger"], {
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectValue"], {
                                                                placeholder: "Select patient"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/(doctor)/doctor/prescriptions/page.tsx",
                                                                lineNumber: 432,
                                                                columnNumber: 21
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/(doctor)/doctor/prescriptions/page.tsx",
                                                            lineNumber: 431,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectContent"], {
                                                            children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$mockData$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mockPatients"].map((p)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectItem"], {
                                                                    value: p.id,
                                                                    children: p.name
                                                                }, p.id, false, {
                                                                    fileName: "[project]/app/(doctor)/doctor/prescriptions/page.tsx",
                                                                    lineNumber: 436,
                                                                    columnNumber: 23
                                                                }, this))
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/(doctor)/doctor/prescriptions/page.tsx",
                                                            lineNumber: 434,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/(doctor)/doctor/prescriptions/page.tsx",
                                                    lineNumber: 430,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/(doctor)/doctor/prescriptions/page.tsx",
                                            lineNumber: 428,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                    className: "text-xs text-muted-foreground",
                                                    children: "Diagnosis"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/(doctor)/doctor/prescriptions/page.tsx",
                                                    lineNumber: 444,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                                    value: diagnosis,
                                                    onChange: (e)=>setDiagnosis(e.target.value),
                                                    placeholder: "e.g. Hypertension"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/(doctor)/doctor/prescriptions/page.tsx",
                                                    lineNumber: 445,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/(doctor)/doctor/prescriptions/page.tsx",
                                            lineNumber: 443,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/(doctor)/doctor/prescriptions/page.tsx",
                                    lineNumber: 427,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "space-y-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center justify-between",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-sm font-medium",
                                                    children: "Medicines"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/(doctor)/doctor/prescriptions/page.tsx",
                                                    lineNumber: 451,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                                    size: "sm",
                                                    variant: "outline",
                                                    onClick: ()=>setMeds((prev)=>[
                                                                ...prev,
                                                                {
                                                                    name: '',
                                                                    dosage: '',
                                                                    frequency: '',
                                                                    duration: ''
                                                                }
                                                            ]),
                                                    children: "Add Row"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/(doctor)/doctor/prescriptions/page.tsx",
                                                    lineNumber: 452,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/(doctor)/doctor/prescriptions/page.tsx",
                                            lineNumber: 450,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "space-y-2",
                                            children: meds.map((med, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "grid sm:grid-cols-4 gap-2",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                                            placeholder: "Medicine",
                                                            value: med.name,
                                                            onChange: (e)=>{
                                                                const next = [
                                                                    ...meds
                                                                ];
                                                                next[index] = {
                                                                    ...med,
                                                                    name: e.target.value
                                                                };
                                                                setMeds(next);
                                                            }
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/(doctor)/doctor/prescriptions/page.tsx",
                                                            lineNumber: 463,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                                            placeholder: "Dosage",
                                                            value: med.dosage,
                                                            onChange: (e)=>{
                                                                const next = [
                                                                    ...meds
                                                                ];
                                                                next[index] = {
                                                                    ...med,
                                                                    dosage: e.target.value
                                                                };
                                                                setMeds(next);
                                                            }
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/(doctor)/doctor/prescriptions/page.tsx",
                                                            lineNumber: 472,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                                            placeholder: "Frequency",
                                                            value: med.frequency,
                                                            onChange: (e)=>{
                                                                const next = [
                                                                    ...meds
                                                                ];
                                                                next[index] = {
                                                                    ...med,
                                                                    frequency: e.target.value
                                                                };
                                                                setMeds(next);
                                                            }
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/(doctor)/doctor/prescriptions/page.tsx",
                                                            lineNumber: 481,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                                            placeholder: "Duration",
                                                            value: med.duration,
                                                            onChange: (e)=>{
                                                                const next = [
                                                                    ...meds
                                                                ];
                                                                next[index] = {
                                                                    ...med,
                                                                    duration: e.target.value
                                                                };
                                                                setMeds(next);
                                                            }
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/(doctor)/doctor/prescriptions/page.tsx",
                                                            lineNumber: 490,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, `med-${index}`, true, {
                                                    fileName: "[project]/app/(doctor)/doctor/prescriptions/page.tsx",
                                                    lineNumber: 462,
                                                    columnNumber: 19
                                                }, this))
                                        }, void 0, false, {
                                            fileName: "[project]/app/(doctor)/doctor/prescriptions/page.tsx",
                                            lineNumber: 460,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/(doctor)/doctor/prescriptions/page.tsx",
                                    lineNumber: 449,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: "text-xs text-muted-foreground",
                                            children: "Instructions"
                                        }, void 0, false, {
                                            fileName: "[project]/app/(doctor)/doctor/prescriptions/page.tsx",
                                            lineNumber: 505,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$textarea$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Textarea"], {
                                            value: instructions,
                                            onChange: (e)=>setInstructions(e.target.value),
                                            placeholder: "Take with food, avoid alcohol, follow-up in 1 week..."
                                        }, void 0, false, {
                                            fileName: "[project]/app/(doctor)/doctor/prescriptions/page.tsx",
                                            lineNumber: 506,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/(doctor)/doctor/prescriptions/page.tsx",
                                    lineNumber: 504,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/(doctor)/doctor/prescriptions/page.tsx",
                            lineNumber: 426,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogFooter"], {
                            className: "gap-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                    variant: "outline",
                                    onClick: ()=>setIssueOpen(false),
                                    children: "Cancel"
                                }, void 0, false, {
                                    fileName: "[project]/app/(doctor)/doctor/prescriptions/page.tsx",
                                    lineNumber: 514,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                    onClick: handleIssue,
                                    className: "gap-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$zap$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Zap$3e$__["Zap"], {
                                            className: "h-4 w-4"
                                        }, void 0, false, {
                                            fileName: "[project]/app/(doctor)/doctor/prescriptions/page.tsx",
                                            lineNumber: 516,
                                            columnNumber: 15
                                        }, this),
                                        "Send to Patient"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/(doctor)/doctor/prescriptions/page.tsx",
                                    lineNumber: 515,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/(doctor)/doctor/prescriptions/page.tsx",
                            lineNumber: 513,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/(doctor)/doctor/prescriptions/page.tsx",
                    lineNumber: 421,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/(doctor)/doctor/prescriptions/page.tsx",
                lineNumber: 420,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/(doctor)/doctor/prescriptions/page.tsx",
        lineNumber: 180,
        columnNumber: 5
    }, this);
}
_s(DoctorPrescriptionsPage, "kv8pPR1eGJm4E+2pTUEl4RFm488=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuthStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$use$2d$toast$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useToast"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$recordsStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRecordsStore"]
    ];
});
_c = DoctorPrescriptionsPage;
function EmptyState({ icon, title, description, action }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardContent"], {
            className: "py-16 text-center space-y-3",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex justify-center",
                    children: icon
                }, void 0, false, {
                    fileName: "[project]/app/(doctor)/doctor/prescriptions/page.tsx",
                    lineNumber: 540,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "font-semibold text-foreground",
                    children: title
                }, void 0, false, {
                    fileName: "[project]/app/(doctor)/doctor/prescriptions/page.tsx",
                    lineNumber: 541,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-sm text-muted-foreground max-w-sm mx-auto",
                    children: description
                }, void 0, false, {
                    fileName: "[project]/app/(doctor)/doctor/prescriptions/page.tsx",
                    lineNumber: 542,
                    columnNumber: 9
                }, this),
                action && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "pt-2",
                    children: action
                }, void 0, false, {
                    fileName: "[project]/app/(doctor)/doctor/prescriptions/page.tsx",
                    lineNumber: 543,
                    columnNumber: 20
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/app/(doctor)/doctor/prescriptions/page.tsx",
            lineNumber: 539,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/(doctor)/doctor/prescriptions/page.tsx",
        lineNumber: 538,
        columnNumber: 5
    }, this);
}
_c1 = EmptyState;
var _c, _c1;
__turbopack_context__.k.register(_c, "DoctorPrescriptionsPage");
__turbopack_context__.k.register(_c1, "EmptyState");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=_c9e40363._.js.map