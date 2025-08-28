import { Symptom, Disease, Doctor } from '../types';

export const symptoms: Symptom[] = [
  { id: '1', name: 'Headache', category: 'neurological', severity: 'mild' },
  { id: '2', name: 'Fever', category: 'general', severity: 'moderate' },
  { id: '3', name: 'Cough', category: 'respiratory', severity: 'mild' },
  { id: '4', name: 'Shortness of breath', category: 'respiratory', severity: 'severe' },
  { id: '5', name: 'Chest pain', category: 'cardiovascular', severity: 'severe' },
  { id: '6', name: 'Nausea', category: 'gastrointestinal', severity: 'mild' },
  { id: '7', name: 'Vomiting', category: 'gastrointestinal', severity: 'moderate' },
  { id: '8', name: 'Diarrhea', category: 'gastrointestinal', severity: 'moderate' },
  { id: '9', name: 'Fatigue', category: 'general', severity: 'mild' },
  { id: '10', name: 'Muscle aches', category: 'musculoskeletal', severity: 'mild' },
  { id: '11', name: 'Sore throat', category: 'respiratory', severity: 'mild' },
  { id: '12', name: 'Runny nose', category: 'respiratory', severity: 'mild' },
  { id: '13', name: 'Sneezing', category: 'respiratory', severity: 'mild' },
  { id: '14', name: 'Joint pain', category: 'musculoskeletal', severity: 'moderate' },
  { id: '15', name: 'Skin rash', category: 'dermatological', severity: 'mild' },
  { id: '16', name: 'Dizziness', category: 'neurological', severity: 'moderate' },
  { id: '17', name: 'Loss of appetite', category: 'general', severity: 'mild' },
  { id: '18', name: 'Abdominal pain', category: 'gastrointestinal', severity: 'moderate' },
  { id: '19', name: 'Back pain', category: 'musculoskeletal', severity: 'moderate' },
  { id: '20', name: 'Insomnia', category: 'neurological', severity: 'mild' }
];

export const diseases: Disease[] = [
  {
    id: '1',
    name: 'Common Cold',
    description: 'A viral infection of the upper respiratory tract',
    symptoms: ['Cough', 'Runny nose', 'Sneezing', 'Sore throat', 'Mild headache'],
    prevention: [
      'Wash hands frequently',
      'Avoid close contact with sick people',
      'Get adequate rest',
      'Stay hydrated'
    ],
    severity: 'low',
    specialization: 'General Practice'
  },
  {
    id: '2',
    name: 'Influenza',
    description: 'A contagious respiratory illness caused by influenza viruses',
    symptoms: ['Fever', 'Cough', 'Muscle aches', 'Fatigue', 'Headache'],
    prevention: [
      'Get annual flu vaccination',
      'Practice good hygiene',
      'Avoid crowded places during flu season',
      'Maintain healthy lifestyle'
    ],
    severity: 'medium',
    specialization: 'Internal Medicine'
  },
  {
    id: '3',
    name: 'Gastroenteritis',
    description: 'Inflammation of the stomach and intestines',
    symptoms: ['Nausea', 'Vomiting', 'Diarrhea', 'Abdominal pain', 'Fever'],
    prevention: [
      'Practice food safety',
      'Wash hands before eating',
      'Drink clean water',
      'Avoid contaminated food'
    ],
    severity: 'medium',
    specialization: 'Gastroenterology'
  },
  {
    id: '4',
    name: 'Migraine',
    description: 'A neurological condition characterized by severe headaches',
    symptoms: ['Severe headache', 'Nausea', 'Sensitivity to light', 'Dizziness'],
    prevention: [
      'Identify and avoid triggers',
      'Maintain regular sleep schedule',
      'Manage stress',
      'Stay hydrated'
    ],
    severity: 'medium',
    specialization: 'Neurology'
  },
  {
    id: '5',
    name: 'Hypertension',
    description: 'High blood pressure condition',
    symptoms: ['Headache', 'Dizziness', 'Chest pain', 'Shortness of breath'],
    prevention: [
      'Maintain healthy diet',
      'Regular exercise',
      'Limit sodium intake',
      'Manage stress'
    ],
    severity: 'high',
    specialization: 'Cardiology'
  }
];

export const doctors: Doctor[] = [
  {
    id: '1',
    name: 'Dr. Sarah Johnson',
    specialization: 'General Practice',
    city: 'New York',
    experience: 12,
    rating: 4.8,
    hospital: 'NYC General Hospital',
    phone: '+1-555-0123',
    email: 'sarah.johnson@hospital.com'
  },
  {
    id: '2',
    name: 'Dr. Michael Chen',
    specialization: 'Internal Medicine',
    city: 'New York',
    experience: 15,
    rating: 4.9,
    hospital: 'Manhattan Medical Center',
    phone: '+1-555-0124',
    email: 'michael.chen@medcenter.com'
  },
  {
    id: '3',
    name: 'Dr. Emily Davis',
    specialization: 'Cardiology',
    city: 'Los Angeles',
    experience: 18,
    rating: 4.7,
    hospital: 'LA Heart Institute',
    phone: '+1-555-0125',
    email: 'emily.davis@heartinst.com'
  },
  {
    id: '4',
    name: 'Dr. Robert Wilson',
    specialization: 'Neurology',
    city: 'Chicago',
    experience: 20,
    rating: 4.9,
    hospital: 'Chicago Neurological Center',
    phone: '+1-555-0126',
    email: 'robert.wilson@neuroc.com'
  },
  {
    id: '5',
    name: 'Dr. Lisa Rodriguez',
    specialization: 'Gastroenterology',
    city: 'Miami',
    experience: 14,
    rating: 4.6,
    hospital: 'Miami Digestive Health',
    phone: '+1-555-0127',
    email: 'lisa.rodriguez@digestive.com'
  },
  {
    id: '6',
    name: 'Dr. James Thompson',
    specialization: 'General Practice',
    city: 'Houston',
    experience: 10,
    rating: 4.5,
    hospital: 'Houston Community Hospital',
    phone: '+1-555-0128',
    email: 'james.thompson@community.com'
  }
];

export const cities = [
  'New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix', 'Philadelphia',
  'San Antonio', 'San Diego', 'Dallas', 'San Jose', 'Austin', 'Jacksonville',
  'Fort Worth', 'Columbus', 'Charlotte', 'San Francisco', 'Indianapolis',
  'Seattle', 'Denver', 'Washington DC', 'Boston', 'Miami'
];