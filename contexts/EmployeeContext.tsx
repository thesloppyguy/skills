"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { dummyEmployees, Employee } from "@/constants";

interface EmployeeContextType {
  selectedEmployee: Employee;
  setSelectedEmployee: (employee: Employee) => void;
  employees: Employee[];
}

const EmployeeContext = createContext<EmployeeContextType | undefined>(
  undefined
);

export const useEmployee = () => {
  const context = useContext(EmployeeContext);
  if (context === undefined) {
    throw new Error("useEmployee must be used within an EmployeeProvider");
  }
  return context;
};

interface EmployeeProviderProps {
  children: ReactNode;
}

export const EmployeeProvider: React.FC<EmployeeProviderProps> = ({
  children,
}) => {
  const [selectedEmployee, setSelectedEmployee] = useState<Employee>(
    dummyEmployees[0]
  );

  const value = {
    selectedEmployee,
    setSelectedEmployee,
    employees: dummyEmployees,
  };

  return (
    <EmployeeContext.Provider value={value}>
      {children}
    </EmployeeContext.Provider>
  );
};
