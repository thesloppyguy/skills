import {
  Briefcase,
  GraduationCap,
  IdCard,
  MapPin,
  TrendingUp,
  User,
  Users2,
} from "lucide-react";
import { ClipboardList, Globe, Home as HomeIcon, Users } from "lucide-react";
import { FileText } from "lucide-react";
import { File } from "lucide-react";

export type SectionType = {
  name: string;
  icon: React.ReactNode;
  iconColor: string;
  children?: SubSectionType[];
  path?: string;
};

export type SubSectionType = {
  name: string;
  path: string;
};

export const sections: {
  name: string;
  icon: React.ReactNode;
  iconColor: string;
  children?: SubSectionType[];
  path?: string;
}[] = [
  {
    name: "About Me",
    icon: <User className="w-5 h-5 text-white" />,
    iconColor: "bg-blue-900",
    children: [
      {
        name: "Personal Details",
        path: "/employee/personal-details",
      },
      {
        name: "Profile Picture",
        path: "/employee/profile-picture",
      },
      {
        name: "Contact Details",
        path: "/employee/contact-details",
      },
      {
        name: "Employment Details",
        path: "/employee/employment-details",
      },
      {
        name: "Bank Details",
        path: "/employee/bank-details",
      },
      {
        name: "Statutory Details",
        path: "/employee/statutory-details",
      },
      {
        name: "Attribute Level Details",
        path: "/employee/attribute-level-details",
      },
    ],
  },
  {
    name: "Address/Coordinates",
    icon: <MapPin className="w-5 h-5 text-white" />,
    iconColor: "bg-green-900",
    children: [
      {
        name: "Primary Location",
        path: "/employee/primary-location",
      },
      {
        name: "Emergency Contact",
        path: "/employee/emergency-contact",
      },
    ],
  },
  {
    name: "Identity Proofs",
    icon: <IdCard className="w-5 h-5 text-white" />,
    iconColor: "bg-purple-900",
    children: [
      {
        name: "Identity Proof Details",
        path: "/employee/identity-proofs",
      },
      {
        name: "Visa Details",
        path: "/employee/visa-details",
      },
    ],
  },
  {
    name: "Skills & Qualification",
    icon: <GraduationCap className="w-5 h-5 text-white" />,
    iconColor: "bg-yellow-900",
    children: [
      {
        name: "Qualifications",
        path: "/employee/qualifications",
      },
      {
        name: "Skills",
        path: "/employee/skills",
      },
      {
        name: "Roadmap",
        path: "/employee/roadmap",
      },
      {
        name: "Skill Map",
        path: "/employee/skill-map",
      },
      {
        name: "Training & Certifications",
        path: "/employee/training-certifications",
      },
      {
        name: "Languages",
        path: "/employee/languages",
      },
    ],
  },
  {
    name: "Family",
    icon: <Users2 className="w-5 h-5 text-white" />,
    iconColor: "bg-red-900",
    children: [
      {
        name: "Family Details",
        path: "/employee/family-details",
      },

      {
        name: "Nominee Details",
        path: "/employee/nominee-details",
      },

      {
        name: "Medical Insurance",
        path: "/employee/medical-insurance",
      },
    ],
  },
  {
    name: "Employment History",
    icon: <ClipboardList className="w-5 h-5 text-white" />,
    iconColor: "bg-orange-900",
    children: [
      {
        name: "Employment Details",
        path: "/employee/employment-details",
      },
      {
        name: "Performance Ratings",
        path: "/employee/performance-ratings",
      },
    ],
  },
  {
    name: "Undertakings",
    icon: <FileText className="w-5 h-5 text-white" />,
    iconColor: "bg-pink-900",
    path: "/employee/undertakings",
  },
  {
    name: "Documents",
    icon: <File className="w-5 h-5 text-white" />,
    iconColor: "bg-gray-900",
    path: "/employee/documents",
  },
];

export type SideBarItem = {
  label: string;
  icon: React.ReactNode;
  href: string;
};

export const sideBarItems: SideBarItem[] = [
  {
    label: "My Home",
    icon: <HomeIcon className="w-6 h-6" />,
    href: "/",
  },
  {
    label: "My Org",
    icon: <Users className="w-6 h-6" />,
    href: "/organization",
  },
  {
    label: "My Profile",
    icon: <User className="w-6 h-6" />,
    href: "/employee",
  },
];

// Employee Data Types
export interface PersonalDetails {
  firstName: string;
  lastName: string;
  middleName?: string;
  dateOfBirth: string;
  gender: string;
  maritalStatus: string;
  bloodGroup: string;
  nationality: string;
  religion: string;
  fatherName: string;
  motherName: string;
  profilePicture?: string;
}

export interface ContactDetails {
  email: string;
  phone: string;
  alternatePhone?: string;
  address: {
    street: string;
    city: string;
    state: string;
    country: string;
    pincode: string;
  };
  emergencyContact: {
    name: string;
    relationship: string;
    phone: string;
  };
}

export interface EmploymentDetails {
  employeeId: string;
  company: string;
  department: string;
  designation: string;
  reportingManager: string;
  managerId: string;
  joiningDate: string;
  employmentType: string;
  workLocation: string;
  totalExperience: string;
  tenureWithCompany: string;
  teamSize?: number;
  directReportees?: number;
}

export interface UserInformation {
  name: string;
  firstName: string;
  middleName: string;
  lastName: string;
  rating: number;
  doj: string;
  employee_type: string;
  total_exp: number;
  tenure: number;
  age: number;
  manager: string;
}

export interface Qualification {
  id: string;
  from_year: string | number;
  to_year: string | number;
  full_time_half_time: string;
  university: string;
  location: string;
  course: string;
  grade: string;
  type: string;
}

export interface Skill {
  id: string;
  name: string;
  level: string;
  from_year: number;
  to_year: number;
  category: string;
  year: string;
}

export interface TrainingCertification {
  id: string;
  name: string;
  provider: string;
  completionDate: string;
  expiryDate?: string;
  status: string;
  progress: number;
  modules: number;
}

export interface Language {
  id: string;
  name: string;
  proficiency: string;
  isNative: boolean;
}

export interface FamilyMember {
  id: string;
  name: string;
  relationship: string;
  dateOfBirth: string;
  occupation: string;
  phone?: string;
}

export interface BankDetails {
  accountNumber: string;
  bankName: string;
  ifscCode: string;
  branch: string;
  accountType: string;
}

export interface PerformanceRating {
  year: string;
  rating: number;
  goals: {
    name: string;
    weightage: number;
    target: string;
    unit: string;
    progress: number;
    status: string;
  }[];
}

export interface EmploymentHistory {
  employeeId: string;
  company: string;
  designation: string;
  from_date: string;
  to_date: string;
  id: string;
  position: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface MonthlySalaryData {
  month: string;
  salary: number;
}

export interface CareerProgression {
  company_name: string;
  monthly_salary_data: MonthlySalaryData[];
}

export interface GoalsKRA {
  name: string;
  progress: number;
  weight: number;
}

export interface LearningProgress {
  course_name: string;
  start_date: string;
  progress: number;
}

export interface Employee {
  id: string;
  domain: string;
  personalDetails: PersonalDetails;
  qualifications: Qualification[];
  skills: Skill[];
  employmentHistory: EmploymentHistory[];
  employmentDetails: EmploymentDetails;
  contactDetails: ContactDetails;
  career_progression: CareerProgression[];
  performanceRatings: PerformanceRating[];
  goals_kra: GoalsKRA[];
  learning_progress: LearningProgress[];
  bankDetails: BankDetails;
  familyMembers: FamilyMember[];
  trainingCertifications: TrainingCertification[];
  languages: Language[];
}

// Dummy Employee Data
export const dummyEmployees: Employee[] = [
  {
    id: "emp-001",
    domain: "Manufacturing",
    personalDetails: {
      firstName: "Emily",
      middleName: "Grace",
      lastName: "Johnson",
      dateOfBirth: "1992-09-10",
      gender: "Female",
      maritalStatus: "Single",
      bloodGroup: "A+",
      nationality: "American",
      religion: "Christian",
      fatherName: "David Johnson",
      motherName: "Laura Johnson",
      profilePicture: undefined,
    },
    employmentDetails: {
      employeeId: "EMP1002",
      company: "SolarTech Manufacturing Inc.",
      department: "Quality Assurance",
      designation: "Quality Assurance Specialist",
      reportingManager: "QA Manager / Plant Head",
      managerId: "MGR010",
      joiningDate: "2023-04-01",
      employmentType: "Full Time",
      workLocation: "Solar Panel Manufacturing Plant - California",
      totalExperience: "5 years",
      tenureWithCompany: "2 years",
      teamSize: 6,
      directReportees: 0,
    },
    contactDetails: {
      email: "emily.johnson@solartech.com",
      phone: "+1-555-1122",
      alternatePhone: "+1-555-1123",
      address: {
        street: "456 Industrial Road",
        city: "Los Angeles",
        state: "CA",
        country: "USA",
        pincode: "90001",
      },
      emergencyContact: {
        name: "David Johnson",
        relationship: "Father",
        phone: "+1-555-1124",
      },
    },
    performanceRatings: [
      {
        year: "2024",
        rating: 4.2,
        goals: [
          {
            name: "Defect Rate Reduction",
            weightage: 40,
            target: "< 1%",
            unit: "percentage",
            progress: 95,
            status: "On Track",
          },
          {
            name: "ISO 9001:2015 Compliance",
            weightage: 30,
            target: "100% compliance",
            unit: "percentage",
            progress: 100,
            status: "Completed",
          },
          {
            name: "Supplier Quality Audits",
            weightage: 30,
            target: "12 audits/year",
            unit: "count",
            progress: 10,
            status: "On Track",
          },
        ],
      },
    ],
    qualifications: [
      {
        id: "qual-010",
        from_year: "2010",
        to_year: 2014,
        full_time_half_time: "Full Time",
        university: "California State University",
        location: "California, USA",
        course: "BSc in Mechanical Engineering",
        grade: "A",
        type: "Bachelors",
      },
      {
        id: "qual-011",
        from_year: 2018,
        to_year: 2019,
        full_time_half_time: "Part Time",
        university: "Quality Institute of America",
        location: "California, USA",
        course: "Certification in Quality Assurance & Six Sigma Green Belt",
        grade: "A",
        type: "Certification",
      },
    ],
    skills: [
      {
        id: "skill-101",
        name: "Quality Control (QC) & Quality Assurance (QA)",
        level: "expert",
        from_year: 2019,
        to_year: 2025,
        category: "Quality Management",
        year: "2019-2025",
      },
      {
        id: "skill-102",
        name: "ISO 9001 & ISO 14001 Standards",
        level: "expert",
        from_year: 2020,
        to_year: 2025,
        category: "Compliance",
        year: "2020-2025",
      },
      {
        id: "skill-103",
        name: "Statistical Process Control (SPC)",
        level: "intermediate",
        from_year: 2021,
        to_year: 2025,
        category: "Manufacturing",
        year: "2021-2025",
      },
      {
        id: "skill-104",
        name: "Root Cause Analysis (RCA) & CAPA",
        level: "expert",
        from_year: 2020,
        to_year: 2025,
        category: "Problem Solving",
        year: "2020-2025",
      },
      {
        id: "skill-105",
        name: "Solar Panel Manufacturing Processes",
        level: "intermediate",
        from_year: 2022,
        to_year: 2025,
        category: "Industry Knowledge",
        year: "2022-2025",
      },
    ],
    employmentHistory: [
      {
        employeeId: "EMP1002",
        company: "SolarTech Manufacturing Inc.",
        designation: "Quality Assurance Specialist",
        from_date: "2023-04-01",
        to_date: "Present",
        id: "emp-hist-010",
        position: "QA Specialist",
        startDate: "2023-04-01",
        endDate: "Present",
        description:
          "Ensuring product quality of solar panels, managing QA audits, and overseeing defect analysis.",
      },
      {
        employeeId: "EMP1001",
        company: "Green Energy Components Ltd.",
        designation: "Quality Control Engineer",
        from_date: "2019-01-15",
        to_date: "2023-03-15",
        id: "emp-hist-011",
        position: "QC Engineer",
        startDate: "2019-01-15",
        endDate: "2023-03-15",
        description:
          "Handled quality inspections, supplier evaluations, and implemented SPC methodologies.",
      },
    ],
    career_progression: [
      {
        company_name: "SolarTech Manufacturing Inc.",
        monthly_salary_data: [
          { month: "2024-01", salary: 6000 },
          { month: "2024-02", salary: 6000 },
          { month: "2024-03", salary: 6000 },
          { month: "2024-04", salary: 6200 },
          { month: "2024-05", salary: 6200 },
          { month: "2024-06", salary: 6200 },
        ],
      },
      {
        company_name: "Green Energy Components Ltd.",
        monthly_salary_data: [
          { month: "2022-01", salary: 5000 },
          { month: "2022-02", salary: 5000 },
          { month: "2022-03", salary: 5000 },
        ],
      },
    ],
    goals_kra: [
      {
        name: "Reduce Defect Rate in Solar Panel Production",
        progress: 0.7,
        weight: 30,
      },
      {
        name: "Enhance Process Audits & Compliance",
        progress: 0.6,
        weight: 25,
      },
      {
        name: "Supplier Quality Improvement",
        progress: 0.5,
        weight: 20,
      },
      {
        name: "Team Collaboration & Training",
        progress: 0.8,
        weight: 15,
      },
      {
        name: "Sustainability & Safety Initiatives",
        progress: 0.65,
        weight: 10,
      },
    ],
    learning_progress: [
      {
        course_name: "Six Sigma Green Belt Advanced",
        start_date: "2025-01-15",
        progress: 0.5,
      },
      {
        course_name: "Solar Panel Manufacturing Process Optimization",
        start_date: "2025-02-10",
        progress: 0.25,
      },
      {
        course_name: "Auditing Skills for Quality Professionals",
        start_date: "2025-03-05",
        progress: 0.4,
      },
    ],
    bankDetails: {
      accountNumber: "7894561230987654",
      bankName: "Bank of America",
      ifscCode: "BOFAUS3NXXX",
      branch: "LA Downtown Branch",
      accountType: "Savings",
    },
    familyMembers: [
      {
        id: "fam-010",
        name: "David Johnson",
        relationship: "Father",
        dateOfBirth: "1960-05-15",
        occupation: "Retired",
        phone: "+1-555-1124",
      },
      {
        id: "fam-011",
        name: "Laura Johnson",
        relationship: "Mother",
        dateOfBirth: "1962-07-22",
        occupation: "Homemaker",
      },
    ],
    trainingCertifications: [
      {
        id: "cert-010",
        name: "Six Sigma Green Belt",
        provider: "ASQ",
        completionDate: "2019-06-15",
        expiryDate: "2025-06-15",
        status: "Completed",
        progress: 100,
        modules: 10,
      },
      {
        id: "cert-011",
        name: "ISO 9001:2015 Internal Auditor",
        provider: "TÜV SÜD",
        completionDate: "2021-09-20",
        status: "Completed",
        progress: 100,
        modules: 8,
      },
      {
        id: "cert-012",
        name: "Solar Energy Manufacturing & Materials",
        provider: "NREL Academy",
        completionDate: "2023-05-30",
        status: "In Progress",
        progress: 70,
        modules: 6,
      },
    ],
    languages: [
      {
        id: "lang-010",
        name: "English",
        proficiency: "Native",
        isNative: true,
      },
      {
        id: "lang-011",
        name: "Spanish",
        proficiency: "Conversational",
        isNative: false,
      },
    ],
  },

  {
    id: "emp-002",
    domain: "Sales & Marketing",
    personalDetails: {
      firstName: "Sarah",
      middleName: "Elizabeth",
      lastName: "Johnson",
      dateOfBirth: "1995-08-22",
      gender: "Female",
      maritalStatus: "Single",
      bloodGroup: "A+",
      nationality: "Indian",
      religion: "Hindu",
      fatherName: "Robert Johnson",
      motherName: "Mary Johnson",
      profilePicture: undefined,
    },
    employmentDetails: {
      employeeId: "EMP002",
      company: "Solar Bright Energy Pvt Ltd",
      department: "Sales & Marketing",
      designation: "Marketing Coordinator",
      reportingManager: "Marketing Manager",
      managerId: "MGR010",
      joiningDate: "2024-03-15",
      employmentType: "Full Time",
      workLocation: "Corporate Office – Mumbai",
      totalExperience: "3 years",
      tenureWithCompany: "1 year",
      teamSize: 6,
      directReportees: 0,
    },
    contactDetails: {
      email: "sarah.johnson@solarbright.com",
      phone: "+91-9876543210",
      alternatePhone: "+91-9876543211",
      address: {
        street: "456 Green Energy Lane",
        city: "Mumbai",
        state: "Maharashtra",
        country: "India",
        pincode: "400001",
      },
      emergencyContact: {
        name: "Robert Johnson",
        relationship: "Father",
        phone: "+91-9876543212",
      },
    },
    performanceRatings: [
      {
        year: "2024",
        rating: 4.3,
        goals: [
          {
            name: "Marketing Campaign Execution (Solar Awareness)",
            weightage: 35,
            target: "10 campaigns",
            unit: "count",
            progress: 80,
            status: "On Track",
          },
          {
            name: "Lead Generation Support for Sales",
            weightage: 30,
            target: "500 qualified leads",
            unit: "count",
            progress: 65,
            status: "In Progress",
          },
        ],
      },
    ],
    qualifications: [
      {
        id: "qual-003",
        from_year: "2018",
        to_year: 2021,
        full_time_half_time: "Full Time",
        university: "Mumbai University",
        location: "Mumbai, India",
        course: "Bachelor of Commerce (B.Com)",
        grade: "A",
        type: "Bachelors",
      },
      {
        id: "qual-004",
        from_year: 2021,
        to_year: 2022,
        full_time_half_time: "Full Time",
        university: "Digital Marketing Institute",
        location: "Delhi, India",
        course: "Professional Digital Marketing Certification",
        grade: "A",
        type: "Certification",
      },
    ],
    skills: [
      {
        id: "skill-011",
        name: "Digital Marketing (SEO, SEM, Social Media)",
        level: "intermediate",
        from_year: 2021,
        to_year: 2025,
        category: "Marketing Technology",
        year: "2021-2025",
      },
      {
        id: "skill-012",
        name: "Content Marketing & Campaigns",
        level: "intermediate",
        from_year: 2022,
        to_year: 2025,
        category: "Marketing",
        year: "2022-2025",
      },
      {
        id: "skill-013",
        name: "Lead Generation & CRM (HubSpot/Salesforce)",
        level: "intermediate",
        from_year: 2021,
        to_year: 2025,
        category: "Sales Enablement",
        year: "2021-2025",
      },
      {
        id: "skill-014",
        name: "Market Research – Renewable Energy",
        level: "intermediate",
        from_year: 2022,
        to_year: 2025,
        category: "Market Analysis",
        year: "2022-2025",
      },
      {
        id: "skill-015",
        name: "Event & Trade Show Coordination",
        level: "beginner",
        from_year: 2023,
        to_year: 2025,
        category: "Event Marketing",
        year: "2023-2025",
      },
      {
        id: "skill-016",
        name: "Communication & Branding",
        level: "intermediate",
        from_year: 2021,
        to_year: 2025,
        category: "Communication",
        year: "2021-2025",
      },
    ],
    employmentHistory: [
      {
        employeeId: "EMP002",
        company: "Solar Bright Energy Pvt Ltd",
        designation: "Marketing Coordinator",
        from_date: "2024-03-15",
        to_date: "Present",
        id: "emp-hist-004",
        position: "Marketing Coordinator",
        startDate: "2024-03-15",
        endDate: "Present",
        description:
          "Coordinating digital and offline marketing campaigns to promote solar energy adoption and supporting the sales team with lead generation.",
      },
      {
        employeeId: "EMP003",
        company: "Retail Plus Inc",
        designation: "Junior Sales Executive",
        from_date: "2021-06-01",
        to_date: "2024-03-14",
        id: "emp-hist-005",
        position: "Junior Sales Executive",
        startDate: "2021-06-01",
        endDate: "2024-03-14",
        description:
          "Handled retail sales operations, customer service, and supported senior sales team.",
      },
    ],
    career_progression: [
      {
        company_name: "Solar Bright Energy Pvt Ltd",
        monthly_salary_data: [
          { month: "2024-03", salary: 5000 },
          { month: "2024-04", salary: 5000 },
          { month: "2024-05", salary: 5000 },
          { month: "2024-06", salary: 5000 },
          { month: "2024-07", salary: 5000 },
          { month: "2024-08", salary: 5000 },
          { month: "2024-09", salary: 5000 },
          { month: "2024-10", salary: 5000 },
          { month: "2024-11", salary: 5000 },
          { month: "2024-12", salary: 5000 },
          { month: "2025-01", salary: 5000 },
          { month: "2025-02", salary: 5000 },
        ],
      },
      {
        company_name: "Retail Plus Inc",
        monthly_salary_data: [
          { month: "2023-01", salary: 3200 },
          { month: "2023-02", salary: 3200 },
          { month: "2023-03", salary: 3200 },
          { month: "2023-04", salary: 3200 },
          { month: "2023-05", salary: 3200 },
          { month: "2023-06", salary: 3200 },
          { month: "2023-07", salary: 3200 },
          { month: "2023-08", salary: 3200 },
          { month: "2023-09", salary: 3200 },
          { month: "2023-10", salary: 3200 },
          { month: "2023-11", salary: 3200 },
          { month: "2023-12", salary: 3200 },
        ],
      },
    ],
    goals_kra: [
      {
        name: "Digital Campaign Performance (Leads, Engagement)",
        progress: 0.7,
        weight: 35,
      },
      {
        name: "Marketing-Sales Alignment (MQL to SQL Conversion)",
        progress: 0.6,
        weight: 25,
      },
      {
        name: "Brand Visibility & Awareness (Events, PR)",
        progress: 0.8,
        weight: 20,
      },
      {
        name: "Product Knowledge & Sustainability Messaging",
        progress: 0.9,
        weight: 20,
      },
    ],
    learning_progress: [
      {
        course_name: "Digital Marketing for Renewable Energy",
        start_date: "2024-05-01",
        progress: 0.6,
      },
      {
        course_name: "HubSpot Marketing Hub Mastery",
        start_date: "2024-04-01",
        progress: 0.7,
      },
      {
        course_name: "Solar Industry Market Trends & Customer Insights",
        start_date: "2024-07-15",
        progress: 0.4,
      },
    ],
    bankDetails: {
      accountNumber: "2345678901234567",
      bankName: "HDFC Bank",
      ifscCode: "HDFC0001234",
      branch: "Mumbai Central",
      accountType: "Current",
    },
    familyMembers: [
      {
        id: "fam-004",
        name: "Robert Johnson",
        relationship: "Father",
        dateOfBirth: "1960-05-10",
        occupation: "Retired Engineer",
        phone: "+91-9876543212",
      },
      {
        id: "fam-005",
        name: "Mary Johnson",
        relationship: "Mother",
        dateOfBirth: "1965-08-20",
        occupation: "Teacher",
      },
    ],
    trainingCertifications: [
      {
        id: "cert-004",
        name: "Google Digital Marketing Certification",
        provider: "Google",
        completionDate: "2024-02-15",
        expiryDate: "2026-02-15",
        status: "Completed",
        progress: 100,
        modules: 8,
      },
      {
        id: "cert-005",
        name: "Renewable Energy Marketing Strategies",
        provider: "Coursera / University of Colorado",
        completionDate: "2024-08-10",
        status: "Completed",
        progress: 100,
        modules: 6,
      },
    ],
    languages: [
      {
        id: "lang-004",
        name: "English",
        proficiency: "Fluent",
        isNative: false,
      },
      {
        id: "lang-005",
        name: "Hindi",
        proficiency: "Native",
        isNative: true,
      },
      {
        id: "lang-006",
        name: "Marathi",
        proficiency: "Native",
        isNative: true,
      },
    ],
  },
  // Operations Coordinator
  {
    id: "emp-003",
    domain: "Project Management & Installation",
    personalDetails: {
      firstName: "Michael",
      middleName: "David",
      lastName: "Brown",
      dateOfBirth: "1992-12-10",
      gender: "Male",
      maritalStatus: "Single",
      bloodGroup: "B+",
      nationality: "Indian",
      religion: "Christian",
      fatherName: "David Brown Sr.",
      motherName: "Lisa Brown",
      profilePicture: undefined,
    },
    employmentDetails: {
      employeeId: "EMP003",
      company: "SolarTech Energy Pvt Ltd",
      department: "Project Management & Installation",
      designation: "Installation Technician",
      reportingManager: "Project Manager",
      managerId: "MGR103",
      joiningDate: "2023-08-01",
      employmentType: "Full Time",
      workLocation: "Field Sites & HQ",
      totalExperience: "4 years",
      tenureWithCompany: "1 year",
      teamSize: 12,
      directReportees: 0,
    },
    contactDetails: {
      email: "michael.brown@solartechenergy.com",
      phone: "+91-9876543210",
      alternatePhone: "+91-9876543211",
      address: {
        street: "789 Green Energy Road",
        city: "Bangalore",
        state: "Karnataka",
        country: "India",
        pincode: "560001",
      },
      emergencyContact: {
        name: "Lisa Brown",
        relationship: "Sister",
        phone: "+91-9876543212",
      },
    },
    performanceRatings: [
      {
        year: "2024",
        rating: 4.1,
        goals: [
          {
            name: "Timely Installation Completion",
            weightage: 35,
            target: "95%",
            unit: "percentage",
            progress: 80,
            status: "On Track",
          },
          {
            name: "Installation Quality & Safety Compliance",
            weightage: 30,
            target: "100%",
            unit: "percentage",
            progress: 90,
            status: "On Track",
          },
        ],
      },
    ],
    qualifications: [
      {
        id: "qual-005",
        from_year: "2012",
        to_year: 2015,
        full_time_half_time: "Full Time",
        university: "Technical Institute of Bangalore",
        location: "Bangalore, India",
        course: "Diploma in Electrical Engineering",
        grade: "A",
        type: "Diploma",
      },
      {
        id: "qual-006",
        from_year: 2020,
        to_year: 2021,
        full_time_half_time: "Full Time",
        university: "Solar Training Academy",
        location: "Pune, India",
        course: "Solar PV Installation Certification",
        grade: "A",
        type: "Certification",
      },
    ],
    skills: [
      {
        id: "skill-027",
        name: "Solar PV Installation",
        level: "intermediate",
        from_year: 2020,
        to_year: 2025,
        category: "Solar Technology",
        year: "2020-2025",
      },
      {
        id: "skill-028",
        name: "Project Site Coordination",
        level: "intermediate",
        from_year: 2021,
        to_year: 2025,
        category: "Project Management",
        year: "2021-2025",
      },
      {
        id: "skill-029",
        name: "Electrical Wiring & Safety",
        level: "intermediate",
        from_year: 2019,
        to_year: 2025,
        category: "Electrical",
        year: "2019-2025",
      },
      {
        id: "skill-030",
        name: "Inverter Installation & Maintenance",
        level: "intermediate",
        from_year: 2020,
        to_year: 2025,
        category: "Solar Technology",
        year: "2020-2025",
      },
      {
        id: "skill-031",
        name: "Troubleshooting & Repairs",
        level: "beginner",
        from_year: 2022,
        to_year: 2025,
        category: "Maintenance",
        year: "2022-2025",
      },
      {
        id: "skill-032",
        name: "Team Coordination on Site",
        level: "intermediate",
        from_year: 2021,
        to_year: 2025,
        category: "Team Management",
        year: "2021-2025",
      },
    ],
    employmentHistory: [
      {
        employeeId: "EMP003",
        company: "SolarTech Energy Pvt Ltd",
        designation: "Installation Technician",
        from_date: "2023-08-01",
        to_date: "Present",
        id: "emp-hist-006",
        position: "Installation Technician",
        startDate: "2023-08-01",
        endDate: "Present",
        description:
          "Performing solar PV installations, coordinating with project managers, and ensuring site safety and quality compliance.",
      },
      {
        employeeId: "EMP005",
        company: "Bright Energy Services",
        designation: "Assistant Installation Technician",
        from_date: "2020-06-01",
        to_date: "2023-07-31",
        id: "emp-hist-007",
        position: "Assistant Installation Technician",
        startDate: "2020-06-01",
        endDate: "2023-07-31",
        description:
          "Assisted in solar panel installations, wiring, and system testing for residential and commercial clients.",
      },
    ],
    career_progression: [
      {
        company_name: "SolarTech Energy Pvt Ltd",
        monthly_salary_data: [
          { month: "2023-08", salary: 4800 },
          { month: "2023-09", salary: 4800 },
          { month: "2023-10", salary: 4800 },
          { month: "2023-11", salary: 5000 },
          { month: "2023-12", salary: 5000 },
          { month: "2024-01", salary: 5000 },
          { month: "2024-02", salary: 5200 },
          { month: "2024-03", salary: 5200 },
          { month: "2024-04", salary: 5200 },
          { month: "2024-05", salary: 5200 },
        ],
      },
      {
        company_name: "Bright Energy Services",
        monthly_salary_data: [
          { month: "2020-06", salary: 3000 },
          { month: "2020-07", salary: 3000 },
          { month: "2020-08", salary: 3000 },
          { month: "2021-01", salary: 3200 },
          { month: "2021-02", salary: 3200 },
          { month: "2021-03", salary: 3200 },
          { month: "2022-01", salary: 3500 },
          { month: "2022-02", salary: 3500 },
          { month: "2022-03", salary: 3500 },
        ],
      },
    ],
    goals_kra: [
      {
        name: "On-time Project Installations",
        progress: 0.8,
        weight: 35,
      },
      {
        name: "Installation Quality & Safety",
        progress: 0.9,
        weight: 30,
      },
      {
        name: "Customer Satisfaction",
        progress: 0.75,
        weight: 20,
      },
      {
        name: "Technical Skill Development",
        progress: 0.6,
        weight: 15,
      },
    ],
    learning_progress: [
      {
        course_name: "Advanced Solar PV Installation",
        start_date: "2024-02-01",
        progress: 0.5,
      },
      {
        course_name: "Electrical Safety Standards",
        start_date: "2024-01-15",
        progress: 0.7,
      },
      {
        course_name: "Inverter Troubleshooting",
        start_date: "2024-03-01",
        progress: 0.3,
      },
    ],
    bankDetails: {
      accountNumber: "3456789012345678",
      bankName: "ICICI Bank",
      ifscCode: "ICIC0001234",
      branch: "Bangalore Central",
      accountType: "Savings",
    },
    familyMembers: [
      {
        id: "fam-006",
        name: "Lisa Brown",
        relationship: "Sister",
        dateOfBirth: "1988-12-05",
        occupation: "Software Engineer",
        phone: "+91-9876543212",
      },
      {
        id: "fam-007",
        name: "David Brown Sr.",
        relationship: "Father",
        dateOfBirth: "1955-09-18",
        occupation: "Retired Manager",
      },
    ],
    trainingCertifications: [
      {
        id: "cert-006",
        name: "Solar PV Technician Certification",
        provider: "MNRE (Govt of India)",
        completionDate: "2023-06-15",
        status: "Completed",
        progress: 100,
        modules: 8,
      },
      {
        id: "cert-007",
        name: "Electrical Safety & Compliance",
        provider: "National Institute of Solar Energy",
        completionDate: "2024-01-15",
        status: "In Progress",
        progress: 70,
        modules: 6,
      },
    ],
    languages: [
      {
        id: "lang-007",
        name: "English",
        proficiency: "Fluent",
        isNative: false,
      },
      {
        id: "lang-008",
        name: "Kannada",
        proficiency: "Native",
        isNative: true,
      },
      {
        id: "lang-009",
        name: "Hindi",
        proficiency: "Conversational",
        isNative: false,
      },
    ],
  },
];
