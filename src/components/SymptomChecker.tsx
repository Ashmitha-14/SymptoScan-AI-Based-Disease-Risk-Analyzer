import React, { useState, useRef, useEffect } from 'react';
import { Search, X, AlertTriangle, CheckCircle, Info, Users } from 'lucide-react';
import { getSymptomSuggestions, predictDiseases } from '../services/predictionService';
import { saveHealthCheck } from '../services/storageService';
import { doctors } from '../data/mockData';
import { PredictionResult, HealthCheck } from '../types';

interface SymptomCheckerProps {
  user: any;
}

const SymptomChecker: React.FC<SymptomCheckerProps> = ({ user }) => {
  const [symptomInput, setSymptomInput] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [predictions, setPredictions] = useState<PredictionResult[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (symptomInput.length >= 2) {
      const newSuggestions = getSymptomSuggestions(symptomInput);
      setSuggestions(newSuggestions);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [symptomInput]);

  const addSymptom = (symptom: string) => {
    if (!selectedSymptoms.includes(symptom)) {
      setSelectedSymptoms([...selectedSymptoms, symptom]);
    }
    setSymptomInput('');
    setSuggestions([]);
    setShowSuggestions(false);
    inputRef.current?.focus();
  };

  const removeSymptom = (symptom: string) => {
    setSelectedSymptoms(selectedSymptoms.filter(s => s !== symptom));
  };

  const analyzeSymptoms = async () => {
    if (selectedSymptoms.length === 0) return;

    setIsAnalyzing(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const results = predictDiseases(selectedSymptoms);
    setPredictions(results);
    
    // Save to history
    const healthCheck: HealthCheck = {
      id: Date.now().toString(),
      symptoms: [...selectedSymptoms],
      predictions: results,
      timestamp: new Date()
    };
    
    saveHealthCheck(healthCheck);
    setIsAnalyzing(false);
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'low': return 'text-green-600 bg-green-50';
      case 'medium': return 'text-yellow-600 bg-yellow-50';
      case 'high': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'low': return <CheckCircle className="w-4 h-4" />;
      case 'medium': return <Info className="w-4 h-4" />;
      case 'high': return <AlertTriangle className="w-4 h-4" />;
      default: return <Info className="w-4 h-4" />;
    }
  };

  const getRelevantDoctors = (specialization: string) => {
    return doctors.filter(doc => 
      doc.specialization === specialization || 
      specialization === 'General Practice'
    ).slice(0, 2);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">AI-Powered Symptom Checker</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Describe your symptoms and get personalized health insights powered by advanced AI. 
          This tool provides preliminary information and should not replace professional medical advice.
        </p>
      </div>

      {/* Symptom Input */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Tell us about your symptoms</h3>
        
        <div className="relative">
          <div className="relative">
            <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <input
              ref={inputRef}
              type="text"
              value={symptomInput}
              onChange={(e) => setSymptomInput(e.target.value)}
              placeholder="Type a symptom (e.g., headache, fever, cough)..."
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              onKeyPress={(e) => {
                if (e.key === 'Enter' && suggestions.length > 0) {
                  addSymptom(suggestions[0]);
                }
              }}
            />
          </div>
          
          {/* Suggestions Dropdown */}
          {showSuggestions && suggestions.length > 0 && (
            <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
              {suggestions.map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => addSymptom(suggestion)}
                  className="w-full px-4 py-2 text-left hover:bg-gray-50 focus:bg-gray-50 focus:outline-none"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Selected Symptoms */}
        {selectedSymptoms.length > 0 && (
          <div className="mt-4">
            <h4 className="text-sm font-medium text-gray-700 mb-2">Selected symptoms:</h4>
            <div className="flex flex-wrap gap-2">
              {selectedSymptoms.map((symptom) => (
                <span
                  key={symptom}
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800"
                >
                  {symptom}
                  <button
                    onClick={() => removeSymptom(symptom)}
                    className="ml-2 hover:text-blue-600"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Analyze Button */}
        <div className="mt-6">
          <button
            onClick={analyzeSymptoms}
            disabled={selectedSymptoms.length === 0 || isAnalyzing}
            className="w-full sm:w-auto px-8 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
          >
            {isAnalyzing ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Analyzing symptoms...
              </div>
            ) : (
              'Analyze Symptoms'
            )}
          </button>
        </div>
      </div>

      {/* Results */}
      {predictions.length > 0 && (
        <div className="space-y-6">
          <h3 className="text-2xl font-bold text-gray-900">Prediction Results</h3>
          
          {predictions.map((prediction, index) => (
            <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h4 className="text-xl font-semibold text-gray-900">{prediction.disease}</h4>
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(prediction.severity)}`}>
                        {getSeverityIcon(prediction.severity)}
                        <span className="ml-1">{prediction.severity} risk</span>
                      </span>
                    </div>
                    <p className="text-gray-600 mb-3">{prediction.description}</p>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span>Confidence: {prediction.confidence}%</span>
                      <span>•</span>
                      <span>Specialization: {prediction.specialization}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-blue-600">{prediction.confidence}%</div>
                    <div className="text-sm text-gray-500">Match</div>
                  </div>
                </div>

                {/* Prevention Tips */}
                <div className="bg-green-50 rounded-lg p-4 mb-4">
                  <h5 className="font-medium text-green-900 mb-2">Prevention & Care Tips</h5>
                  <ul className="space-y-1">
                    {prediction.prevention.map((tip, tipIndex) => (
                      <li key={tipIndex} className="text-green-800 text-sm flex items-start">
                        <CheckCircle className="w-3 h-3 text-green-600 mt-0.5 mr-2 flex-shrink-0" />
                        {tip}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Recommended Doctors */}
                <div className="border-t border-gray-200 pt-4">
                  <h5 className="font-medium text-gray-900 mb-3 flex items-center">
                    <Users className="w-4 h-4 mr-2" />
                    Recommended Specialists
                  </h5>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {getRelevantDoctors(prediction.specialization).map((doctor) => (
                      <div key={doctor.id} className="border border-gray-200 rounded-lg p-3">
                        <div className="font-medium text-gray-900">{doctor.name}</div>
                        <div className="text-sm text-gray-600">{doctor.specialization}</div>
                        <div className="text-sm text-gray-500">{doctor.hospital}</div>
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-xs text-yellow-600">★ {doctor.rating}</span>
                          <span className="text-xs text-gray-500">{doctor.experience} years</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Disclaimer */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="flex items-start">
              <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5 mr-3 flex-shrink-0" />
              <div className="text-sm text-yellow-800">
                <strong>Important:</strong> This is an AI-powered preliminary assessment and should not replace professional medical diagnosis. 
                Please consult with a healthcare provider for proper medical evaluation and treatment.
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SymptomChecker;