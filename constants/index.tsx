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
  active: boolean;
};

export const sideBarItems: SideBarItem[] = [
  {
    label: "My Home",
    icon: <HomeIcon className="w-6 h-6" />,
    href: "#",
    active: false,
  },
  {
    label: "My Social",
    icon: <Users className="w-6 h-6" />,
    href: "#",
    active: false,
  },
  {
    label: "My Work",
    icon: <Briefcase className="w-6 h-6" />,
    href: "#",
    active: false,
  },
  {
    label: "My Zone",
    icon: <Globe className="w-6 h-6" />,
    href: "#",
    active: false,
  },
  {
    label: "My Growth",
    icon: <TrendingUp className="w-6 h-6" />,
    href: "#",
    active: false,
  },
  {
    label: "My Profile",
    icon: <User className="w-6 h-6" />,
    href: "#",
    active: true,
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

export interface Qualification {
  id: string;
  degree: string;
  institution: string;
  year: string;
  grade: string;
  isHighest: boolean;
  type: string;
  location: string;
}

export interface Skill {
  id: string;
  name: string;
  level: string;
  year: string;
  category: string;
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
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface Employee {
  id: string;
  personalDetails: PersonalDetails;
  contactDetails: ContactDetails;
  employmentDetails: EmploymentDetails;
  qualifications: Qualification[];
  skills: Skill[];
  trainingCertifications: TrainingCertification[];
  languages: Language[];
  familyMembers: FamilyMember[];
  bankDetails: BankDetails;
  performanceRatings: PerformanceRating[];
  employmentHistory: EmploymentHistory[];
  domain: string;
  role: string;
}

// Dummy Employee Data
export const dummyEmployees: Employee[] = [
  {
    id: "EMP001",
    domain: "Technology",
    role: "Senior Software Engineer",
    personalDetails: {
      firstName: "Rajesh",
      lastName: "Kumar",
      middleName: "Singh",
      dateOfBirth: "1985-03-15",
      gender: "Male",
      maritalStatus: "Married",
      bloodGroup: "B+",
      nationality: "Indian",
      religion: "Hindu",
      fatherName: "Suresh Kumar",
      motherName: "Sunita Devi",
      profilePicture: "/api/placeholder/150/150",
    },
    contactDetails: {
      email: "rajesh.kumar@techcorp.com",
      phone: "9876543210",
      alternatePhone: "9876543211",
      address: {
        street: "123 Tech Park, Sector 5",
        city: "Bangalore",
        state: "Karnataka",
        country: "India",
        pincode: "560001",
      },
      emergencyContact: {
        name: "Priya Kumar",
        relationship: "Spouse",
        phone: "9876543212",
      },
    },
    employmentDetails: {
      employeeId: "TECH001",
      company: "TechCorp Solutions",
      department: "Software Development",
      designation: "Senior Software Engineer",
      reportingManager: "Dr. Sarah Johnson",
      managerId: "MGR001",
      joiningDate: "2020-06-15",
      employmentType: "Full Time",
      workLocation: "Bangalore",
      totalExperience: "8 years 6 months",
      tenureWithCompany: "4 years 6 months",
      teamSize: 12,
      directReportees: 3,
    },
    qualifications: [
      {
        id: "Q001",
        degree: "Master of Technology in Computer Science",
        institution: "Indian Institute of Technology, Delhi",
        year: "2010-2012",
        grade: "8.5/10",
        isHighest: true,
        type: "Full Time",
        location: "Delhi, India",
      },
      {
        id: "Q002",
        degree: "Bachelor of Technology in Computer Science",
        institution: "National Institute of Technology, Trichy",
        year: "2006-2010",
        grade: "8.2/10",
        isHighest: false,
        type: "Full Time",
        location: "Trichy, India",
      },
    ],
    skills: [
      {
        id: "S001",
        name: "Java Development",
        level: "Expert",
        year: "2015-2024",
        category: "Programming",
      },
      {
        id: "S002",
        name: "Spring Framework",
        level: "Expert",
        year: "2016-2024",
        category: "Framework",
      },
      {
        id: "S003",
        name: "Microservices Architecture",
        level: "Advanced",
        year: "2018-2024",
        category: "Architecture",
      },
      {
        id: "S004",
        name: "AWS Cloud Services",
        level: "Intermediate",
        year: "2020-2024",
        category: "Cloud",
      },
    ],
    trainingCertifications: [
      {
        id: "T001",
        name: "AWS Solutions Architect",
        provider: "Amazon Web Services",
        completionDate: "2023-03-15",
        expiryDate: "2026-03-15",
        status: "Completed",
        progress: 100,
        modules: 5,
      },
      {
        id: "T002",
        name: "Agile Project Management",
        provider: "Scrum Alliance",
        completionDate: "2022-08-20",
        status: "Completed",
        progress: 100,
        modules: 4,
      },
    ],
    languages: [
      {
        id: "L001",
        name: "English",
        proficiency: "Fluent",
        isNative: false,
      },
      {
        id: "L002",
        name: "Hindi",
        proficiency: "Native",
        isNative: true,
      },
      {
        id: "L003",
        name: "Tamil",
        proficiency: "Conversational",
        isNative: false,
      },
    ],
    familyMembers: [
      {
        id: "F001",
        name: "Priya Kumar",
        relationship: "Spouse",
        dateOfBirth: "1987-07-22",
        occupation: "Software Engineer",
        phone: "9876543212",
      },
      {
        id: "F002",
        name: "Arjun Kumar",
        relationship: "Son",
        dateOfBirth: "2015-11-10",
        occupation: "Student",
      },
    ],
    bankDetails: {
      accountNumber: "1234567890123456",
      bankName: "HDFC Bank",
      ifscCode: "HDFC0001234",
      branch: "Koramangala Branch",
      accountType: "Savings",
    },
    performanceRatings: [
      {
        year: "2024",
        rating: 4.2,
        goals: [
          {
            name: "Complete Microservices Migration",
            weightage: 30,
            target: "100",
            unit: "Percentage",
            progress: 85,
            status: "On Track",
          },
          {
            name: "Team Productivity Improvement",
            weightage: 25,
            target: "20",
            unit: "Percentage",
            progress: 90,
            status: "On Track",
          },
        ],
      },
    ],
    employmentHistory: [
      {
        id: "EH001",
        company: "Infosys Limited",
        position: "Software Engineer",
        startDate: "2012-07-01",
        endDate: "2016-12-31",
        description:
          "Worked on Java-based web applications and database management systems",
      },
      {
        id: "EH002",
        company: "Wipro Technologies",
        position: "Senior Software Engineer",
        startDate: "2017-01-15",
        endDate: "2020-05-31",
        description:
          "Led development of enterprise applications using Spring framework",
      },
    ],
  },
  {
    id: "EMP002",
    domain: "Healthcare",
    role: "Senior Medical Officer",
    personalDetails: {
      firstName: "Dr. Priya",
      lastName: "Sharma",
      middleName: "Devi",
      dateOfBirth: "1982-09-08",
      gender: "Female",
      maritalStatus: "Married",
      bloodGroup: "O+",
      nationality: "Indian",
      religion: "Hindu",
      fatherName: "Dr. Ramesh Sharma",
      motherName: "Dr. Meera Sharma",
      profilePicture: "/api/placeholder/150/150",
    },
    contactDetails: {
      email: "priya.sharma@healthcare.com",
      phone: "9876543213",
      address: {
        street: "456 Medical Complex, MG Road",
        city: "Mumbai",
        state: "Maharashtra",
        country: "India",
        pincode: "400001",
      },
      emergencyContact: {
        name: "Dr. Amit Sharma",
        relationship: "Spouse",
        phone: "9876543214",
      },
    },
    employmentDetails: {
      employeeId: "MED001",
      company: "Apollo Healthcare Group",
      department: "Cardiology",
      designation: "Senior Medical Officer",
      reportingManager: "Dr. Rajesh Patel",
      managerId: "MGR002",
      joiningDate: "2018-03-01",
      employmentType: "Full Time",
      workLocation: "Mumbai",
      totalExperience: "12 years 3 months",
      tenureWithCompany: "6 years 9 months",
      teamSize: 8,
      directReportees: 4,
    },
    qualifications: [
      {
        id: "Q003",
        degree: "Doctor of Medicine (MD) in Cardiology",
        institution: "All India Institute of Medical Sciences, Delhi",
        year: "2010-2013",
        grade: "Distinction",
        isHighest: true,
        type: "Full Time",
        location: "Delhi, India",
      },
      {
        id: "Q004",
        degree: "Bachelor of Medicine and Bachelor of Surgery (MBBS)",
        institution: "Grant Medical College, Mumbai",
        year: "2005-2010",
        grade: "First Class",
        isHighest: false,
        type: "Full Time",
        location: "Mumbai, India",
      },
    ],
    skills: [
      {
        id: "S005",
        name: "Cardiac Surgery",
        level: "Expert",
        year: "2013-2024",
        category: "Medical",
      },
      {
        id: "S006",
        name: "Echocardiography",
        level: "Expert",
        year: "2014-2024",
        category: "Diagnostic",
      },
      {
        id: "S007",
        name: "Patient Management",
        level: "Expert",
        year: "2010-2024",
        category: "Clinical",
      },
    ],
    trainingCertifications: [
      {
        id: "T003",
        name: "Advanced Cardiac Life Support (ACLS)",
        provider: "American Heart Association",
        completionDate: "2023-06-15",
        expiryDate: "2025-06-15",
        status: "Completed",
        progress: 100,
        modules: 3,
      },
      {
        id: "T004",
        name: "Interventional Cardiology Fellowship",
        provider: "Apollo Healthcare Group",
        completionDate: "2022-12-20",
        status: "Completed",
        progress: 100,
        modules: 6,
      },
    ],
    languages: [
      {
        id: "L004",
        name: "English",
        proficiency: "Fluent",
        isNative: false,
      },
      {
        id: "L005",
        name: "Hindi",
        proficiency: "Native",
        isNative: true,
      },
      {
        id: "L006",
        name: "Marathi",
        proficiency: "Fluent",
        isNative: true,
      },
    ],
    familyMembers: [
      {
        id: "F003",
        name: "Dr. Amit Sharma",
        relationship: "Spouse",
        dateOfBirth: "1980-12-15",
        occupation: "Orthopedic Surgeon",
        phone: "9876543214",
      },
      {
        id: "F004",
        name: "Kavya Sharma",
        relationship: "Daughter",
        dateOfBirth: "2012-04-18",
        occupation: "Student",
      },
    ],
    bankDetails: {
      accountNumber: "2345678901234567",
      bankName: "ICICI Bank",
      ifscCode: "ICIC0002345",
      branch: "Andheri West Branch",
      accountType: "Savings",
    },
    performanceRatings: [
      {
        year: "2024",
        rating: 4.5,
        goals: [
          {
            name: "Patient Satisfaction Score",
            weightage: 40,
            target: "95",
            unit: "Percentage",
            progress: 92,
            status: "On Track",
          },
          {
            name: "Successful Surgeries",
            weightage: 35,
            target: "200",
            unit: "Number",
            progress: 180,
            status: "On Track",
          },
        ],
      },
    ],
    employmentHistory: [
      {
        id: "EH003",
        company: "Fortis Healthcare",
        position: "Medical Officer",
        startDate: "2013-07-01",
        endDate: "2016-02-28",
        description: "Worked in emergency department and general medicine",
      },
      {
        id: "EH004",
        company: "Max Healthcare",
        position: "Senior Medical Officer",
        startDate: "2016-03-15",
        endDate: "2018-02-28",
        description:
          "Specialized in cardiology department with focus on interventional procedures",
      },
    ],
  },
  {
    id: "EMP003",
    domain: "Finance",
    role: "Senior Financial Analyst",
    personalDetails: {
      firstName: "Michael",
      lastName: "Chen",
      middleName: "Wei",
      dateOfBirth: "1988-11-25",
      gender: "Male",
      maritalStatus: "Single",
      bloodGroup: "A+",
      nationality: "American",
      religion: "Christian",
      fatherName: "David Chen",
      motherName: "Linda Chen",
      profilePicture: "/api/placeholder/150/150",
    },
    contactDetails: {
      email: "michael.chen@financecorp.com",
      phone: "+1-555-0123",
      address: {
        street: "789 Wall Street, Suite 456",
        city: "New York",
        state: "New York",
        country: "United States",
        pincode: "10005",
      },
      emergencyContact: {
        name: "Sarah Chen",
        relationship: "Sister",
        phone: "+1-555-0124",
      },
    },
    employmentDetails: {
      employeeId: "FIN001",
      company: "Global Finance Corp",
      department: "Investment Banking",
      designation: "Senior Financial Analyst",
      reportingManager: "Jennifer Martinez",
      managerId: "MGR003",
      joiningDate: "2021-01-15",
      employmentType: "Full Time",
      workLocation: "New York",
      totalExperience: "6 years 2 months",
      tenureWithCompany: "3 years 10 months",
      teamSize: 15,
      directReportees: 2,
    },
    qualifications: [
      {
        id: "Q005",
        degree: "Master of Business Administration (MBA) in Finance",
        institution: "Wharton School, University of Pennsylvania",
        year: "2018-2020",
        grade: "3.8/4.0",
        isHighest: true,
        type: "Full Time",
        location: "Philadelphia, USA",
      },
      {
        id: "Q006",
        degree: "Bachelor of Science in Economics",
        institution: "Stanford University",
        year: "2010-2014",
        grade: "3.6/4.0",
        isHighest: false,
        type: "Full Time",
        location: "Stanford, USA",
      },
    ],
    skills: [
      {
        id: "S008",
        name: "Financial Modeling",
        level: "Expert",
        year: "2018-2024",
        category: "Analytics",
      },
      {
        id: "S009",
        name: "Excel Advanced",
        level: "Expert",
        year: "2016-2024",
        category: "Technical",
      },
      {
        id: "S010",
        name: "Python for Finance",
        level: "Advanced",
        year: "2020-2024",
        category: "Programming",
      },
      {
        id: "S011",
        name: "Risk Assessment",
        level: "Expert",
        year: "2018-2024",
        category: "Risk Management",
      },
    ],
    trainingCertifications: [
      {
        id: "T005",
        name: "Chartered Financial Analyst (CFA)",
        provider: "CFA Institute",
        completionDate: "2022-08-15",
        status: "Completed",
        progress: 100,
        modules: 3,
      },
      {
        id: "T006",
        name: "Financial Risk Manager (FRM)",
        provider: "Global Association of Risk Professionals",
        completionDate: "2023-05-20",
        status: "Completed",
        progress: 100,
        modules: 2,
      },
    ],
    languages: [
      {
        id: "L007",
        name: "English",
        proficiency: "Native",
        isNative: true,
      },
      {
        id: "L008",
        name: "Mandarin",
        proficiency: "Fluent",
        isNative: true,
      },
      {
        id: "L009",
        name: "Spanish",
        proficiency: "Conversational",
        isNative: false,
      },
    ],
    familyMembers: [
      {
        id: "F005",
        name: "Sarah Chen",
        relationship: "Sister",
        dateOfBirth: "1990-03-12",
        occupation: "Marketing Manager",
        phone: "+1-555-0124",
      },
      {
        id: "F006",
        name: "David Chen",
        relationship: "Father",
        dateOfBirth: "1955-08-20",
        occupation: "Retired Engineer",
      },
    ],
    bankDetails: {
      accountNumber: "3456789012345678",
      bankName: "JPMorgan Chase",
      ifscCode: "CHASUS33",
      branch: "Wall Street Branch",
      accountType: "Checking",
    },
    performanceRatings: [
      {
        year: "2024",
        rating: 4.3,
        goals: [
          {
            name: "Deal Closure Rate",
            weightage: 35,
            target: "85",
            unit: "Percentage",
            progress: 88,
            status: "On Track",
          },
          {
            name: "Revenue Generation",
            weightage: 30,
            target: "5000000",
            unit: "USD",
            progress: 4200000,
            status: "On Track",
          },
        ],
      },
    ],
    employmentHistory: [
      {
        id: "EH005",
        company: "Goldman Sachs",
        position: "Financial Analyst",
        startDate: "2014-07-01",
        endDate: "2017-12-31",
        description: "Worked on equity research and investment analysis",
      },
      {
        id: "EH006",
        company: "Morgan Stanley",
        position: "Associate",
        startDate: "2018-01-15",
        endDate: "2020-12-31",
        description: "Focused on mergers and acquisitions advisory",
      },
    ],
  },
  {
    id: "EMP004",
    domain: "Marketing",
    role: "Marketing Manager",
    personalDetails: {
      firstName: "Sarah",
      lastName: "Johnson",
      middleName: "Elizabeth",
      dateOfBirth: "1990-05-12",
      gender: "Female",
      maritalStatus: "Married",
      bloodGroup: "AB+",
      nationality: "British",
      religion: "Christian",
      fatherName: "Robert Johnson",
      motherName: "Margaret Johnson",
      profilePicture: "/api/placeholder/150/150",
    },
    contactDetails: {
      email: "sarah.johnson@marketingpro.com",
      phone: "+44-20-7946-0958",
      address: {
        street: "123 Oxford Street, Flat 45",
        city: "London",
        state: "England",
        country: "United Kingdom",
        pincode: "W1D 1BS",
      },
      emergencyContact: {
        name: "James Johnson",
        relationship: "Spouse",
        phone: "+44-20-7946-0959",
      },
    },
    employmentDetails: {
      employeeId: "MKT001",
      company: "Creative Marketing Solutions",
      department: "Digital Marketing",
      designation: "Marketing Manager",
      reportingManager: "David Thompson",
      managerId: "MGR004",
      joiningDate: "2019-09-01",
      employmentType: "Full Time",
      workLocation: "London",
      totalExperience: "7 years 4 months",
      tenureWithCompany: "5 years 3 months",
      teamSize: 10,
      directReportees: 5,
    },
    qualifications: [
      {
        id: "Q007",
        degree: "Master of Science in Marketing",
        institution: "London Business School",
        year: "2016-2017",
        grade: "Distinction",
        isHighest: true,
        type: "Full Time",
        location: "London, UK",
      },
      {
        id: "Q008",
        degree: "Bachelor of Arts in Communications",
        institution: "University of Cambridge",
        year: "2012-2015",
        grade: "First Class Honours",
        isHighest: false,
        type: "Full Time",
        location: "Cambridge, UK",
      },
    ],
    skills: [
      {
        id: "S012",
        name: "Digital Marketing Strategy",
        level: "Expert",
        year: "2017-2024",
        category: "Strategy",
      },
      {
        id: "S013",
        name: "Social Media Management",
        level: "Expert",
        year: "2016-2024",
        category: "Digital",
      },
      {
        id: "S014",
        name: "Google Analytics",
        level: "Advanced",
        year: "2018-2024",
        category: "Analytics",
      },
      {
        id: "S015",
        name: "Content Creation",
        level: "Expert",
        year: "2015-2024",
        category: "Creative",
      },
    ],
    trainingCertifications: [
      {
        id: "T007",
        name: "Google Ads Certification",
        provider: "Google",
        completionDate: "2023-09-10",
        expiryDate: "2024-09-10",
        status: "Completed",
        progress: 100,
        modules: 4,
      },
      {
        id: "T008",
        name: "HubSpot Content Marketing",
        provider: "HubSpot Academy",
        completionDate: "2023-11-15",
        status: "Completed",
        progress: 100,
        modules: 5,
      },
    ],
    languages: [
      {
        id: "L010",
        name: "English",
        proficiency: "Native",
        isNative: true,
      },
      {
        id: "L011",
        name: "French",
        proficiency: "Fluent",
        isNative: false,
      },
      {
        id: "L012",
        name: "Spanish",
        proficiency: "Conversational",
        isNative: false,
      },
    ],
    familyMembers: [
      {
        id: "F007",
        name: "James Johnson",
        relationship: "Spouse",
        dateOfBirth: "1988-11-30",
        occupation: "Software Developer",
        phone: "+44-20-7946-0959",
      },
      {
        id: "F008",
        name: "Emma Johnson",
        relationship: "Daughter",
        dateOfBirth: "2020-08-15",
        occupation: "Toddler",
      },
    ],
    bankDetails: {
      accountNumber: "4567890123456789",
      bankName: "Barclays Bank",
      ifscCode: "BARCGB22",
      branch: "Oxford Street Branch",
      accountType: "Current",
    },
    performanceRatings: [
      {
        year: "2024",
        rating: 4.1,
        goals: [
          {
            name: "Brand Awareness Increase",
            weightage: 30,
            target: "25",
            unit: "Percentage",
            progress: 22,
            status: "On Track",
          },
          {
            name: "Lead Generation",
            weightage: 25,
            target: "1000",
            unit: "Number",
            progress: 850,
            status: "On Track",
          },
        ],
      },
    ],
    employmentHistory: [
      {
        id: "EH007",
        company: "Brand Agency Ltd",
        position: "Marketing Executive",
        startDate: "2015-06-01",
        endDate: "2017-08-31",
        description: "Worked on brand campaigns and social media management",
      },
      {
        id: "EH008",
        company: "Digital First Marketing",
        position: "Senior Marketing Executive",
        startDate: "2017-09-15",
        endDate: "2019-08-31",
        description: "Led digital marketing campaigns and team coordination",
      },
    ],
  },
  {
    id: "EMP005",
    domain: "Operations",
    role: "Operations Manager",
    personalDetails: {
      firstName: "Ahmed",
      lastName: "Hassan",
      middleName: "Ali",
      dateOfBirth: "1987-12-03",
      gender: "Male",
      maritalStatus: "Married",
      bloodGroup: "O-",
      nationality: "Egyptian",
      religion: "Muslim",
      fatherName: "Ali Hassan",
      motherName: "Fatima Hassan",
      profilePicture: "/api/placeholder/150/150",
    },
    contactDetails: {
      email: "ahmed.hassan@operations.com",
      phone: "+971-50-123-4567",
      address: {
        street: "456 Sheikh Zayed Road, Tower 2",
        city: "Dubai",
        state: "Dubai",
        country: "UAE",
        pincode: "00000",
      },
      emergencyContact: {
        name: "Aisha Hassan",
        relationship: "Spouse",
        phone: "+971-50-123-4568",
      },
    },
    employmentDetails: {
      employeeId: "OPS001",
      company: "Global Logistics Solutions",
      department: "Supply Chain Operations",
      designation: "Operations Manager",
      reportingManager: "Mohammed Al-Rashid",
      managerId: "MGR005",
      joiningDate: "2020-02-01",
      employmentType: "Full Time",
      workLocation: "Dubai",
      totalExperience: "9 years 1 month",
      tenureWithCompany: "4 years 10 months",
      teamSize: 20,
      directReportees: 8,
    },
    qualifications: [
      {
        id: "Q009",
        degree:
          "Master of Business Administration (MBA) in Operations Management",
        institution: "American University in Dubai",
        year: "2015-2017",
        grade: "3.7/4.0",
        isHighest: true,
        type: "Full Time",
        location: "Dubai, UAE",
      },
      {
        id: "Q010",
        degree: "Bachelor of Engineering in Industrial Engineering",
        institution: "Cairo University",
        year: "2005-2009",
        grade: "Very Good",
        isHighest: false,
        type: "Full Time",
        location: "Cairo, Egypt",
      },
    ],
    skills: [
      {
        id: "S016",
        name: "Supply Chain Management",
        level: "Expert",
        year: "2015-2024",
        category: "Operations",
      },
      {
        id: "S017",
        name: "Process Optimization",
        level: "Expert",
        year: "2017-2024",
        category: "Efficiency",
      },
      {
        id: "S018",
        name: "SAP ERP",
        level: "Advanced",
        year: "2018-2024",
        category: "Technology",
      },
      {
        id: "S019",
        name: "Lean Six Sigma",
        level: "Expert",
        year: "2016-2024",
        category: "Quality",
      },
    ],
    trainingCertifications: [
      {
        id: "T009",
        name: "Certified Supply Chain Professional (CSCP)",
        provider: "APICS",
        completionDate: "2022-04-20",
        expiryDate: "2025-04-20",
        status: "Completed",
        progress: 100,
        modules: 4,
      },
      {
        id: "T010",
        name: "Six Sigma Black Belt",
        provider: "American Society for Quality",
        completionDate: "2021-10-15",
        status: "Completed",
        progress: 100,
        modules: 6,
      },
    ],
    languages: [
      {
        id: "L013",
        name: "Arabic",
        proficiency: "Native",
        isNative: true,
      },
      {
        id: "L014",
        name: "English",
        proficiency: "Fluent",
        isNative: false,
      },
      {
        id: "L015",
        name: "French",
        proficiency: "Conversational",
        isNative: false,
      },
    ],
    familyMembers: [
      {
        id: "F009",
        name: "Aisha Hassan",
        relationship: "Spouse",
        dateOfBirth: "1989-06-20",
        occupation: "Teacher",
        phone: "+971-50-123-4568",
      },
      {
        id: "F010",
        name: "Omar Hassan",
        relationship: "Son",
        dateOfBirth: "2018-03-10",
        occupation: "Student",
      },
      {
        id: "F011",
        name: "Layla Hassan",
        relationship: "Daughter",
        dateOfBirth: "2021-09-25",
        occupation: "Toddler",
      },
    ],
    bankDetails: {
      accountNumber: "5678901234567890",
      bankName: "Emirates NBD",
      ifscCode: "EBILAEAD",
      branch: "Sheikh Zayed Road Branch",
      accountType: "Savings",
    },
    performanceRatings: [
      {
        year: "2024",
        rating: 4.4,
        goals: [
          {
            name: "Cost Reduction",
            weightage: 35,
            target: "15",
            unit: "Percentage",
            progress: 12,
            status: "On Track",
          },
          {
            name: "Process Efficiency",
            weightage: 30,
            target: "20",
            unit: "Percentage",
            progress: 18,
            status: "On Track",
          },
        ],
      },
    ],
    employmentHistory: [
      {
        id: "EH009",
        company: "DHL Express",
        position: "Operations Supervisor",
        startDate: "2009-07-01",
        endDate: "2014-12-31",
        description: "Managed warehouse operations and logistics coordination",
      },
      {
        id: "EH010",
        company: "FedEx Middle East",
        position: "Senior Operations Coordinator",
        startDate: "2015-01-15",
        endDate: "2019-12-31",
        description:
          "Oversaw regional operations and process improvement initiatives",
      },
    ],
  },
];
