export type BranchId = 'campus-main' | 'campus-gulberg' | 'campus-north';

export interface Branch {
  id: BranchId;
  name: string;
  code: string;
  city: string;
  principal: string;
  totalStudents: number;
  totalFaculty: number;
  presentStudents: number;
  presentFaculty: number;
  lateArrivals: number;
  unexcusedAbsences: number;
}

export type AttendanceStatus = 'present' | 'absent' | 'late' | 'excused';

export interface Student {
  id: string;
  rollNo: string;
  rfidUid: string;
  fullName: string;
  guardianName: string;
  guardianPhone: string;
  grade: string;
  section: string;
  branchId: BranchId;
  photoUrl: string;
  bloodGroup: string;
  emergencyContact: string;
  attendanceStatus: AttendanceStatus;
  checkInTime?: string;
  gateScanned?: string;
  lastWhatsAppStatus?: 'delivered' | 'read' | 'pending' | 'failed';
}

export interface Teacher {
  id: string;
  employeeCode: string;
  fullName: string;
  designation: string;
  department: string;
  phone: string;
  branchId: BranchId;
  assignedClasses: string[];
  attendanceStatus: AttendanceStatus;
  checkInTime?: string;
  roomNo: string;
}

export interface IngressLog {
  id: string;
  timestamp: string;
  personName: string;
  personType: 'student' | 'teacher';
  rollOrCode: string;
  gradeOrDept: string;
  branchName: string;
  gate: string;
  method: 'RFID Tap' | 'QR Code' | 'Manual Roll-call';
  status: AttendanceStatus;
  notificationDispatched: boolean;
  phoneNotified: string;
}

export interface WhatsAppNotification {
  id: string;
  timestamp: string;
  recipientName: string;
  recipientPhone: string;
  studentName: string;
  type: 'gate_checkin' | 'absentee_alert' | 'late_warning';
  message: string;
  status: 'delivered' | 'read' | 'queued';
}

