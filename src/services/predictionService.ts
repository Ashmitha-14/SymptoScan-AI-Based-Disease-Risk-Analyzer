import { symptoms, diseases } from '../data/mockData';
import { PredictionResult } from '../types';

export const predictDiseases = (selectedSymptoms: string[]): PredictionResult[] => {
  const predictions: PredictionResult[] = [];
  
  // Simple matching algorithm - in real app this would call ML API
  diseases.forEach(disease => {
    const matchingSymptoms = disease.symptoms.filter(symptom => 
      selectedSymptoms.some(selected => 
        selected.toLowerCase().includes(symptom.toLowerCase()) ||
        symptom.toLowerCase().includes(selected.toLowerCase())
      )
    );
    
    if (matchingSymptoms.length > 0) {
      const confidence = Math.min(95, (matchingSymptoms.length / disease.symptoms.length) * 100 + Math.random() * 20);
      
      predictions.push({
        disease: disease.name,
        confidence: Math.round(confidence),
        description: disease.description,
        prevention: disease.prevention,
        severity: disease.severity,
        specialization: disease.specialization
      });
    }
  });
  
  // Add some randomness for demonstration
  if (predictions.length === 0) {
    predictions.push({
      disease: 'General Consultation Recommended',
      confidence: 65,
      description: 'Your symptoms require professional medical evaluation',
      prevention: ['Consult with a healthcare provider', 'Monitor symptoms', 'Rest and hydration'],
      severity: 'medium',
      specialization: 'General Practice'
    });
  }
  
  return predictions.sort((a, b) => b.confidence - a.confidence).slice(0, 3);
};

export const getSymptomSuggestions = (query: string): string[] => {
  if (!query || query.length < 2) return [];
  
  return symptoms
    .filter(symptom => 
      symptom.name.toLowerCase().includes(query.toLowerCase())
    )
    .map(symptom => symptom.name)
    .slice(0, 10);
};