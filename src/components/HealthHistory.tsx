import React, { useState, useEffect } from 'react';
import { Calendar, Clock, TrendingUp, AlertCircle, ChevronRight } from 'lucide-react';
import { getHealthChecks } from '../services/storageService';
import { HealthCheck } from '../types';

const HealthHistory: React.FC = () => {
  const [healthChecks, setHealthChecks] = useState<HealthCheck[]>([]);
  const [selectedCheck, setSelectedCheck] = useState<HealthCheck | null>(null);

  useEffect(() => {
    const checks = getHealthChecks();
    setHealthChecks(checks);
  }, []);

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'low': return 'text-green-600 bg-green-50 border-green-200';
      case 'medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'high': return 'text-red-600 bg-red-50 border-red-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  if (healthChecks.length === 0) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="text-center py-12">
          <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No Health Checks Yet</h3>
          <p className="text-gray-600 mb-6">Start using the symptom checker to build your health history.</p>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
          >
            Check Symptoms Now
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Health History</h2>
        <p className="text-gray-600">Track your symptom checks and health insights over time.</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* History List */}
        <div className="lg:col-span-1 space-y-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Checks</h3>
          <div className="space-y-3">
            {healthChecks.map((check) => (
              <div
                key={check.id}
                onClick={() => setSelectedCheck(check)}
                className={`p-4 border rounded-lg cursor-pointer transition-all hover:shadow-md ${
                  selectedCheck?.id === check.id
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 bg-white hover:border-gray-300'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center text-sm text-gray-500">
                    <Clock className="w-4 h-4 mr-1" />
                    {formatDate(check.timestamp)}
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </div>
                <div className="mb-2">
                  <div className="text-sm text-gray-600 mb-1">Symptoms:</div>
                  <div className="flex flex-wrap gap-1">
                    {check.symptoms.slice(0, 3).map((symptom, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 bg-gray-100 text-xs rounded-full text-gray-700"
                      >
                        {symptom}
                      </span>
                    ))}
                    {check.symptoms.length > 3 && (
                      <span className="px-2 py-1 bg-gray-100 text-xs rounded-full text-gray-700">
                        +{check.symptoms.length - 3} more
                      </span>
                    )}
                  </div>
                </div>
                <div className="text-sm font-medium text-gray-900">
                  Top prediction: {check.predictions[0]?.disease || 'No prediction'}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Detailed View */}
        <div className="lg:col-span-2">
          {selectedCheck ? (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold text-gray-900">Health Check Details</h3>
                  <div className="flex items-center text-sm text-gray-500">
                    <Calendar className="w-4 h-4 mr-1" />
                    {formatDate(selectedCheck.timestamp)}
                  </div>
                </div>
                
                <div className="mb-4">
                  <h4 className="font-medium text-gray-900 mb-2">Reported Symptoms</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedCheck.symptoms.map((symptom, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
                      >
                        {symptom}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-6">
                <h4 className="font-medium text-gray-900 mb-4">AI Predictions</h4>
                <div className="space-y-4">
                  {selectedCheck.predictions.map((prediction, idx) => (
                    <div key={idx} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h5 className="font-semibold text-gray-900">{prediction.disease}</h5>
                          <p className="text-sm text-gray-600 mt-1">{prediction.description}</p>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold text-blue-600">{prediction.confidence}%</div>
                          <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium border ${getSeverityColor(prediction.severity)}`}>
                            {prediction.severity} risk
                          </span>
                        </div>
                      </div>
                      
                      <div className="bg-green-50 rounded-lg p-3">
                        <h6 className="text-sm font-medium text-green-900 mb-2">Prevention Tips</h6>
                        <ul className="text-sm text-green-800 space-y-1">
                          {prediction.prevention.map((tip, tipIdx) => (
                            <li key={tipIdx} className="flex items-start">
                              <span className="mr-2">•</span>
                              {tip}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-gray-50 rounded-xl border-2 border-dashed border-gray-300 p-12 text-center">
              <TrendingUp className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Select a Health Check</h3>
              <p className="text-gray-600">Choose a check from the list to view detailed information and insights.</p>
            </div>
          )}
        </div>
      </div>

      {/* Quick Stats */}
      <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="text-2xl font-bold text-blue-600">{healthChecks.length}</div>
          <div className="text-sm text-gray-600">Total Checks</div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="text-2xl font-bold text-green-600">
            {healthChecks.filter(check => 
              check.predictions.some(p => p.severity === 'low')
            ).length}
          </div>
          <div className="text-sm text-gray-600">Low Risk</div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="text-2xl font-bold text-yellow-600">
            {healthChecks.filter(check => 
              check.predictions.some(p => p.severity === 'medium')
            ).length}
          </div>
          <div className="text-sm text-gray-600">Medium Risk</div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="text-2xl font-bold text-red-600">
            {healthChecks.filter(check => 
              check.predictions.some(p => p.severity === 'high')
            ).length}
          </div>
          <div className="text-sm text-gray-600">High Risk</div>
        </div>
      </div>
    </div>
  );
};

export default HealthHistory;