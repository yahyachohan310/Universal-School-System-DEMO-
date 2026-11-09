import React, { useState } from 'react';
import { Sidebar, ActiveTab } from './components/common/Sidebar';
import { TopBar } from './components/common/TopBar';
import { LoginPage } from './components/auth/LoginPage';
import { ExecutiveDashboard } from './components/executive/ExecutiveDashboard';
import { ReceptionistPortal } from './components/reception/ReceptionistPortal';
import { TeacherPortal } from './components/teacher/TeacherPortal';
import { GateScannerPortal } from './components/gate/GateScannerPortal';
import { IdCardStudio } from './components/idcard/IdCardStudio';
import { FeeLedgerPortal } from './components/finance/FeeLedgerPortal';
import { ExamResultPortal } from './components/academics/ExamResultPortal';
import { NotificationLog } from './components/notifications/NotificationLog';
import { DeskReportModal } from './components/reports/DeskReportModal';
import { WhatsAppGatewayModal } from './components/common/WhatsAppGatewayModal';
import { whatsappService } from './services/whatsappService';
import { 
  INITIAL_BRANCHES, 
  INITIAL_STUDENTS, 
  INITIAL_TEACHERS, 
  INITIAL_INGRESS_LOGS, 
  INITIAL_NOTIFICATIONS 
} from './data/mockData';
import { BranchId, AttendanceStatus, IngressLog, WhatsAppNotification, Student } from './types';
import { UserSession } from './types/auth';

export function App() {
  // Session State
  const [currentUser, setCurrentUser] = useState<UserSession | null>(null);
  const [activeTab, setActiveTab] = useState<ActiveTab>('executive');  const [selectedBranch, setSelectedBranch] = useState<BranchId | 'all'>('all');
  const [isDeskReportOpen, setIsDeskReportOpen] = useState(false);
  const [isWhatsAppModalOpen, setIsWhatsAppModalOpen] = useState(false);

  // Core Entity State
  const [branches, setBranches] = useState(INITIAL_BRANCHES);
  const [students, setStudents] = useState<Student[]>(INITIAL_STUDENTS);
  const [teachers, setTeachers] = useState(INITIAL_TEACHERS);
  const [ingressLogs, setIngressLogs] = useState(INITIAL_INGRESS_LOGS);
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS);

  // Login Handler (4 Small-School Personas)
  const handleLogin = (session: UserSession) => {
    setCurrentUser(session);
    if (session.role === 'receptionist') {
      setActiveTab('reception');
    } else if (session.role === 'teacher') {
      setActiveTab('teacher');
    } else if (session.role === 'security') {
      setActiveTab('scanner');
    } else {
      setActiveTab('executive');
    }
  };

  // Add New Student from Receptionist Portal
  const handleAddNewStudent = (newStudent: Student) => {
    setStudents((prev) => [newStudent, ...prev]);

    setBranches((prev) =>
      prev.map((b) =>
        b.id === 'campus-main'
          ? {
              ...b,
              totalStudents: b.totalStudents + 1,
              presentStudents: b.presentStudents + 1,
            }
          : b
      )
    );

    const welcomeMsg = `Welcome to Universal Grammar School! Your child ${newStudent.fullName} is successfully enrolled in ${newStudent.grade}. Assigned Roll No: ${newStudent.rollNo}. Smart ID Card issued.`;

    // 1. Dispatch Real WhatsApp via Backend Gateway (Port 3005)
    whatsappService.sendSingleMessage(newStudent.guardianPhone, newStudent.fullName, welcomeMsg);

    // 2. Append to Local Audit Log
    const welcomeNotif: WhatsAppNotification = {
      id: `wa-enroll-${Date.now()}`,
      timestamp: new Date().toLocaleTimeString(),
      recipientName: newStudent.guardianName,
      recipientPhone: newStudent.guardianPhone,
      studentName: `${newStudent.fullName} (${newStudent.grade})`,
      type: 'gate_checkin',
      message: welcomeMsg,
      status: 'delivered',
    };
    setNotifications((prev) => [welcomeNotif, ...prev]);
  };

  const handleOpenCardStudio = (_studentId: string) => {
    setActiveTab('idcards');
  };

  const handleUpdateAttendance = (studentId: string, status: AttendanceStatus) => {
    setStudents((prev) =>
      prev.map((s) => (s.id === studentId ? { ...s, attendanceStatus: status } : s))
    );
  };

  const handleBatchUpdate = (status: AttendanceStatus) => {
    setStudents((prev) =>
      prev.map((s) =>
        s.grade === 'Grade 9' && s.section === 'Section A (Pre-Engineering)'
          ? { ...s, attendanceStatus: status }
          : s
      )
    );
  };

  // Gate Scanner Ingress Handler
  const handleScanRegistered = (personId: string, type: 'student' | 'teacher') => {
    const now = new Date().toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
    });

    if (type === 'student') {
      const student = students.find((s) => s.id === personId);
      if (!student) return;

      setStudents((prev) =>
        prev.map((s) =>
          s.id === personId
            ? {
                ...s,
                attendanceStatus: 'present',
                checkInTime: now,
                gateScanned: 'Gate 01 (Main Gate Turnstile)',
                lastWhatsAppStatus: 'read',
              }
            : s
        )
      );

      const newLog: IngressLog = {
        id: `log-${Date.now()}`,
        timestamp: now,
        personName: student.fullName,
        personType: 'student',
        rollOrCode: student.rollNo,
        gradeOrDept: `${student.grade} - ${student.section}`,
        branchName: 'Main Executive Campus',
        gate: 'Gate 01 (Turnstile Kiosk)',
        method: 'RFID Tap',
        status: 'present',
        notificationDispatched: true,
        phoneNotified: student.guardianPhone,
      };
      setIngressLogs((prev) => [newLog, ...prev]);

      const waMsg = `Smart Gate Alert: ${student.fullName} (Roll: ${student.rollNo}) safely entered Universal Grammar School Main Gate at ${now}. Have a great academic day!`;

      // Dispatch Real WhatsApp via Backend Gateway (Port 3005)
      whatsappService.sendSingleMessage(student.guardianPhone, student.fullName, waMsg);

      const newNotif: WhatsAppNotification = {
        id: `wa-${Date.now()}`,
        timestamp: now,
        recipientName: student.guardianName,
        recipientPhone: student.guardianPhone,
        studentName: `${student.fullName} (${student.grade})`,
        type: 'gate_checkin',
        message: waMsg,
        status: 'delivered',
      };
      setNotifications((prev) => [newNotif, ...prev]);
    }
  };

  // Trigger bulk WhatsApp to absent students
  const handleTriggerAbsenteeAlerts = () => {
    const now = new Date().toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
    });

    const absentList = students.filter((s) => s.attendanceStatus === 'absent');
    const recipients = absentList.map((s) => ({
      phone: s.guardianPhone,
      name: s.fullName,
    }));

    const broadcastMsg = `Official School Notice: Your child has been marked ABSENT today (${now}). Please contact school administration if unauthorized.`;

    // Dispatch Real WhatsApp Broadcast via Backend Gateway (Port 3005)
    whatsappService.sendBulkMessages(recipients, broadcastMsg);

    const newNotifs: WhatsAppNotification[] = absentList.map((s) => ({
      id: `wa-bulk-${s.id}-${Date.now()}`,
      timestamp: now,
      recipientName: s.guardianName,
      recipientPhone: s.guardianPhone,
      studentName: `${s.fullName} (${s.grade})`,
      type: 'absentee_alert',
      message: `Official Notice: Your ward ${s.fullName} has been marked ABSENT today. Please contact campus administration immediately.`,
      status: 'delivered',
    }));

    setNotifications((prev) => [...newNotifs, ...prev]);
  };

  const handleResendNotification = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, status: 'delivered' } : n))
    );
  };

  // If user is not logged in, show institutional Login Portal
  if (!currentUser) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-slate-100 flex font-sans text-slate-900 selection:bg-blue-100 selection:text-blue-900">
      {/* Enterprise Left Sidebar */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        selectedBranch={selectedBranch}
        setSelectedBranch={setSelectedBranch}
        onOpenDeskReport={() => setIsDeskReportOpen(true)}
        currentUser={currentUser}
        onLogout={() => setCurrentUser(null)}
      />

      {/* Main Content Viewport */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen">
        <TopBar
          activeTab={activeTab}
          currentUser={currentUser}
          onOpenDeskReport={() => setIsDeskReportOpen(true)}
          onOpenWhatsAppGateway={() => setIsWhatsAppModalOpen(true)}
        />

        <main className="flex-1 max-w-7xl w-full mx-auto px-6 py-6 overflow-y-auto">
          <div key={activeTab} className="animate-slide-up">
          {activeTab === 'executive' && (
            <ExecutiveDashboard
              branches={branches}
              students={students}
              teachers={teachers}
              ingressLogs={ingressLogs}
              selectedBranch={selectedBranch}
              onTriggerAbsenteeAlerts={handleTriggerAbsenteeAlerts}
              onOpenDeskReport={() => setIsDeskReportOpen(true)}
            />
          )}

          {activeTab === 'reception' && (
            <ReceptionistPortal
              students={students}
              onAddNewStudent={handleAddNewStudent}
              onOpenCardStudio={handleOpenCardStudio}
            />
          )}

          {activeTab === 'teacher' && (
            <TeacherPortal
              students={students}
              onUpdateAttendance={handleUpdateAttendance}
              onBatchUpdate={handleBatchUpdate}
            />
          )}

          {activeTab === 'academics' && (
            <ExamResultPortal students={students} />
          )}

          {activeTab === 'scanner' && (
            <GateScannerPortal
              students={students}
              teachers={teachers}
              ingressLogs={ingressLogs}
              onScanRegistered={handleScanRegistered}
            />
          )}

          {activeTab === 'idcards' && (
            <IdCardStudio students={students} teachers={teachers} />
          )}

          {activeTab === 'finance' && (
            <FeeLedgerPortal />
          )}

          {activeTab === 'notifications' && (
            <NotificationLog
              notifications={notifications}
              onResendNotification={handleResendNotification}
            />
          )}
          </div>
        </main>
      </div>

      {/* Desk Report Modal (Print-friendly) */}
      <DeskReportModal
        isOpen={isDeskReportOpen}
        onClose={() => setIsDeskReportOpen(false)}
        branches={branches}
        students={students}
        teachers={teachers}
      />

      {/* WhatsApp Device Gateway & QR Modal */}
      <WhatsAppGatewayModal
        isOpen={isWhatsAppModalOpen}
        onClose={() => setIsWhatsAppModalOpen(false)}
      />
    </div>
  );
}

export default App;
