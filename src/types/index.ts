export interface Symptom {
  id: string;
  name: string;
  category: string;
  severity: 'mild' | 'moderate' | 'severe';
}

export interface Disease {
  id: string;
  name: string;
  description: string;
  symptoms: string[];
  prevention: string[];
  severity: 'low' | 'medium' | 'high';
  specialization: string;
}

export interface Doctor {
  id: string;
  name: string;
  specialization: string;
  city: string;
  experience: number;
  rating: number;
  hospital: string;
  phone: string;
  email: string;
}

export interface HealthCheck {
  id: string;
  symptoms: string[];
  predictions: PredictionResult[];
  timestamp: Date;
  notes?: string;
}

export interface PredictionResult {
  disease: string;
  confidence: number;
  description: string;
  prevention: string[];
  severity: 'low' | 'medium' | 'high';
  specialization: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  city: string;
  age: number;
  gender: 'male' | 'female' | 'other';
}