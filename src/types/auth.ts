export type UserRole = 'principal' | 'receptionist' | 'teacher' | 'security';

export interface UserSession {
  id: string;
  name: string;
  role: UserRole;
  designation: string;
  department: string;
  clearanceLevel: string;
  email: string;
  avatarUrl: string;
  branchName: string;
  allowedTabs: string[];
  responsibilities: string[];
}

export const PRESET_USERS: Record<UserRole, UserSession> = {
  principal: {
    id: 'usr-01',
    name: 'Sir Tariq Mehmood Chishti',
    role: 'principal',
    designation: 'School Owner & Head Principal',
    department: 'Principal Executive Office',
    clearanceLevel: 'School Owner (Executive Oversight & Reports Only)',
    email: 'owner@universalschool.edu.pk',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=240',
    branchName: 'Universal Grammar School (Main Campus)',
    allowedTabs: ['executive', 'finance', 'notifications'],
    responsibilities: [
      'Morning Executive Attendance Dashboard & Telemetry',
      'Daily Desk Report (A4 Printable Briefing with Sign-off)',
      'Fee Collection Status & Defaulters Recovery Radar',
      'Automated Parent WhatsApp Broadcast Tracking',
    ],
  },
  receptionist: {
    id: 'usr-02',
    name: 'Ms. Sana Fatima',
    role: 'receptionist',
    designation: 'Admin Clerk & Front Desk Receptionist',
    department: 'Front Office & Admissions Counter',
    clearanceLevel: 'Admin Counter (Admissions, Fees, ID Cards Only)',
    email: 'admin@universalschool.edu.pk',
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=240',
    branchName: 'Universal Grammar School (Main Campus)',
    allowedTabs: ['reception', 'idcards'],
    responsibilities: [
      'New candidate admission form entry & roll number generation',
      'Counter fee cash collection & parent receipt printing',
      'Smart plastic ID card printing (CR-80 PVC standard)',
      'Visitor gate slips for visiting parents & vendors',
    ],
  },
  teacher: {
    id: 'usr-03',
    name: 'Sir Khurram Shehzad',
    role: 'teacher',
    designation: 'Class Teacher (Grade 9-A)',
    department: 'Classroom & Academic Roster',
    clearanceLevel: 'Teacher (My Class Attendance & Marks Only)',
    email: 'teacher@universalschool.edu.pk',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=240',
    branchName: 'Universal Grammar School (Main Campus)',
    allowedTabs: ['teacher', 'academics'],
    responsibilities: [
      '30-second mobile roll-call from smartphone in classroom',
      'Absent / Late student tagging (auto-syncs to Principal desk)',
      'Subject examination test marks & student progress entry',
    ],
  },
  security: {
    id: 'usr-04',
    name: 'Chacha Bashir Ahmad',
    role: 'security',
    designation: 'Gate Security Guard & Scanner Operator',
    department: 'School Main Gate Post',
    clearanceLevel: 'Gate Scanner Terminal Only',
    email: 'guard@universalschool.edu.pk',
    avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=240',
    branchName: 'Universal Grammar School (Main Campus)',
    allowedTabs: ['scanner'],
    responsibilities: [
      'Physical ID card scanning at gate turnstile with audio beep',
      'Student photo & emergency details verification on screen',
      'Automated parent WhatsApp check-in notification trigger',
    ],
  },
};

export interface AdmissionFormData {
  fullName: string;
  dob: string;
  gender: 'Male' | 'Female';
  bloodGroup: string;
  bFormNo: string;
  previousSchool: string;
  targetGrade: string;
  targetSection: string;

  guardianName: string;
  guardianRelation: 'Father' | 'Mother' | 'Guardian';
  guardianCnic: string;
  guardianPhone: string;
  guardianEmail: string;
  residentialAddress: string;
  emergencyContact: string;

  admissionFee: number;
  monthlyTuition: number;
  paymentMode: 'Cash at Counter' | 'Bank Challan (HBL / Meezan)';
  medicalNotes?: string;
}
