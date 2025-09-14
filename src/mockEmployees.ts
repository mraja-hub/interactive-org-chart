// src/mockEmployees.ts
import type { Employee } from './components/Sidebar';

const employees: Employee[] = [
  // CEO
  { id: '1', name: 'Jordan Smith', designation: 'CEO', team: 'Management', manager: null },

  // CTO
  { id: '2', name: 'Alex Johnson', designation: 'CTO', team: 'Management', manager: '1' },

  // VP Engineering (reports to CTO)
  { id: '3', name: 'Morgan Lee', designation: 'VP Engineering', team: 'Engineering', manager: '2' },

  // Directors (report to VP Engineering)
  {
    id: '4',
    name: 'Taylor Brown',
    designation: 'Director of Backend',
    team: 'Engineering',
    manager: '3',
  },
  {
    id: '5',
    name: 'Chris Davis',
    designation: 'Director of Frontend',
    team: 'Engineering',
    manager: '3',
  },

  // Engineering Managers (report to Directors)
  {
    id: '6',
    name: 'Jamie Miller',
    designation: 'Engineering Manager',
    team: 'Engineering',
    manager: '4',
  },
  {
    id: '7',
    name: 'Pat Wilson',
    designation: 'Engineering Manager',
    team: 'Engineering',
    manager: '4',
  },
  {
    id: '8',
    name: 'Dana Martinez',
    designation: 'Engineering Manager',
    team: 'Engineering',
    manager: '5',
  },
  {
    id: '9',
    name: 'Riley Hernandez',
    designation: 'Engineering Manager',
    team: 'Engineering',
    manager: '5',
  },

  // Engineers (report to engineering managers)
  {
    id: '10',
    name: 'Cameron Lopez',
    designation: 'Senior Engineer',
    team: 'Engineering',
    manager: '6',
  },
  { id: '11', name: 'Avery Gonzalez', designation: 'Engineer', team: 'Engineering', manager: '6' },
  { id: '12', name: 'Quinn Wilson', designation: 'Engineer', team: 'Engineering', manager: '6' },
  {
    id: '13',
    name: 'Jesse Anderson',
    designation: 'Junior Engineer',
    team: 'Engineering',
    manager: '6',
  },
  {
    id: '14',
    name: 'Skyler Thomas',
    designation: 'Senior Engineer',
    team: 'Engineering',
    manager: '7',
  },
  { id: '15', name: 'Devon Moore', designation: 'Engineer', team: 'Engineering', manager: '7' },
  { id: '16', name: 'Robin Martin', designation: 'Engineer', team: 'Engineering', manager: '7' },
  {
    id: '17',
    name: 'Lee Jackson',
    designation: 'Junior Engineer',
    team: 'Engineering',
    manager: '7',
  },
  {
    id: '18',
    name: 'Sam Thompson',
    designation: 'Senior Engineer',
    team: 'Engineering',
    manager: '8',
  },
  { id: '19', name: 'Casey White', designation: 'Engineer', team: 'Engineering', manager: '8' },
  { id: '20', name: 'Morgan Garcia', designation: 'Engineer', team: 'Engineering', manager: '8' },
  {
    id: '21',
    name: 'Chris Miller',
    designation: 'Junior Engineer',
    team: 'Engineering',
    manager: '8',
  },
  {
    id: '22',
    name: 'Jamie Davis',
    designation: 'Senior Engineer',
    team: 'Engineering',
    manager: '9',
  },
  { id: '23', name: 'Pat Martinez', designation: 'Engineer', team: 'Engineering', manager: '9' },
  { id: '24', name: 'Dana Hernandez', designation: 'Engineer', team: 'Engineering', manager: '9' },
  {
    id: '25',
    name: 'Riley Lopez',
    designation: 'Junior Engineer',
    team: 'Engineering',
    manager: '9',
  },

  // Finance Team
  { id: '26', name: 'Taylor Brown', designation: 'VP Finance', team: 'Finance', manager: '1' },
  { id: '27', name: 'Devon Moore', designation: 'Finance Manager', team: 'Finance', manager: '26' },
  { id: '28', name: 'Robin Martin', designation: 'Accountant', team: 'Finance', manager: '27' },
  {
    id: '29',
    name: 'Lee Jackson',
    designation: 'Financial Analyst',
    team: 'Finance',
    manager: '27',
  },

  // GTM Team (Sales, Marketing, Support)
  { id: '30', name: 'Chris Davis', designation: 'VP GTM', team: 'GTM', manager: '1' },
  { id: '31', name: 'Sam Thompson', designation: 'Sales Manager', team: 'GTM', manager: '30' },
  { id: '32', name: 'Casey White', designation: 'Marketing Manager', team: 'GTM', manager: '30' },
  { id: '33', name: 'Morgan Garcia', designation: 'Support Manager', team: 'GTM', manager: '30' },
  { id: '34', name: 'Chris Miller', designation: 'Sales Rep', team: 'GTM', manager: '31' },
  { id: '35', name: 'Jamie Davis', designation: 'Sales Rep', team: 'GTM', manager: '31' },
  { id: '36', name: 'Pat Martinez', designation: 'Sales Rep', team: 'GTM', manager: '31' },
  {
    id: '37',
    name: 'Dana Hernandez',
    designation: 'Marketing Specialist',
    team: 'GTM',
    manager: '32',
  },
  { id: '38', name: 'Riley Lopez', designation: 'Content Marketer', team: 'GTM', manager: '32' },
  {
    id: '39',
    name: 'Cameron Gonzalez',
    designation: 'Support Specialist',
    team: 'GTM',
    manager: '33',
  },
  { id: '40', name: 'Avery Wilson', designation: 'Support Specialist', team: 'GTM', manager: '33' },

  // HR Team
  { id: '41', name: 'Quinn Anderson', designation: 'Head of HR', team: 'HR', manager: '1' },
  { id: '42', name: 'Jesse Thomas', designation: 'HR Manager', team: 'HR', manager: '41' },
  { id: '43', name: 'Skyler Moore', designation: 'Recruiter', team: 'HR', manager: '42' },
  { id: '44', name: 'Devon Martin', designation: 'HR Coordinator', team: 'HR', manager: '42' },
];

export default employees;
