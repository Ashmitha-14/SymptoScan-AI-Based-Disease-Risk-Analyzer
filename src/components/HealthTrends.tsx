import React, { useState, useEffect } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  BarElement,
  ArcElement,
} from 'chart.js';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import { TrendingUp, Calendar, Activity, AlertTriangle } from 'lucide-react';
import { getHealthChecks } from '../services/storageService';
import { HealthCheck } from '../types';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const HealthTrends: React.FC = () => {
  const [healthChecks, setHealthChecks] = useState<HealthCheck[]>([]);
  const [timeRange, setTimeRange] = useState<'week' | 'month' | 'year'>('month');

  useEffect(() => {
    const checks = getHealthChecks();
    setHealthChecks(checks);
  }, []);

  // Prepare data for charts
  const getTimeRangeData = () => {
    const now = new Date();
    const rangeStart = new Date();
    
    switch (timeRange) {
      case 'week':
        rangeStart.setDate(now.getDate() - 7);
        break;
      case 'month':
        rangeStart.setMonth(now.getMonth() - 1);
        break;
      case 'year':
        rangeStart.setFullYear(now.getFullYear() - 1);
        break;
    }

    return healthChecks.filter(check => 
      new Date(check.timestamp) >= rangeStart
    );
  };

  const filteredChecks = getTimeRangeData();

  // Checks over time data
  const getChecksOverTimeData = () => {
    const data: { [key: string]: number } = {};
    
    filteredChecks.forEach(check => {
      const date = new Date(check.timestamp);
      const key = timeRange === 'week' 
        ? date.toLocaleDateString('en-US', { weekday: 'short' })
        : timeRange === 'month'
        ? date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
        : date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
      
      data[key] = (data[key] || 0) + 1;
    });

    const labels = Object.keys(data).sort();
    const values = labels.map(label => data[label]);

    return {
      labels,
      datasets: [
        {
          label: 'Health Checks',
          data: values,
          borderColor: 'rgb(59, 130, 246)',
          backgroundColor: 'rgba(59, 130, 246, 0.1)',
          fill: true,
          tension: 0.4,
        },
      ],
    };
  };

  // Most common symptoms data
  const getCommonSymptomsData = () => {
    const symptomCounts: { [key: string]: number } = {};
    
    filteredChecks.forEach(check => {
      check.symptoms.forEach(symptom => {
        symptomCounts[symptom] = (symptomCounts[symptom] || 0) + 1;
      });
    });

    const sortedSymptoms = Object.entries(symptomCounts)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 8);

    return {
      labels: sortedSymptoms.map(([symptom]) => symptom),
      datasets: [
        {
          label: 'Frequency',
          data: sortedSymptoms.map(([, count]) => count),
          backgroundColor: [
            'rgba(59, 130, 246, 0.8)',
            'rgba(16, 185, 129, 0.8)',
            'rgba(245, 158, 11, 0.8)',
            'rgba(239, 68, 68, 0.8)',
            'rgba(139, 92, 246, 0.8)',
            'rgba(236, 72, 153, 0.8)',
            'rgba(6, 182, 212, 0.8)',
            'rgba(34, 197, 94, 0.8)',
          ],
        },
      ],
    };
  };

  // Risk level distribution
  const getRiskDistributionData = () => {
    const riskCounts = { low: 0, medium: 0, high: 0 };
    
    filteredChecks.forEach(check => {
      check.predictions.forEach(prediction => {
        riskCounts[prediction.severity as keyof typeof riskCounts]++;
      });
    });

    return {
      labels: ['Low Risk', 'Medium Risk', 'High Risk'],
      datasets: [
        {
          data: [riskCounts.low, riskCounts.medium, riskCounts.high],
          backgroundColor: [
            'rgba(16, 185, 129, 0.8)',
            'rgba(245, 158, 11, 0.8)',
            'rgba(239, 68, 68, 0.8)',
          ],
          borderWidth: 2,
          borderColor: '#fff',
        },
      ],
    };
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
      },
    },
  };

  if (healthChecks.length === 0) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="text-center py-12">
          <TrendingUp className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No Health Data Yet</h3>
          <p className="text-gray-600 mb-6">Start using the symptom checker to see your health trends and analytics.</p>
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
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Health Trends & Analytics</h2>
          <p className="text-gray-600">Visualize your health patterns and track improvements over time.</p>
        </div>
        
        <div className="mt-4 sm:mt-0">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value as 'week' | 'month' | 'year')}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="week">Last 7 days</option>
            <option value="month">Last 30 days</option>
            <option value="year">Last year</option>
          </select>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Checks</p>
              <p className="text-2xl font-bold text-gray-900">{filteredChecks.length}</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <Activity className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Avg. Symptoms</p>
              <p className="text-2xl font-bold text-gray-900">
                {filteredChecks.length > 0 
                  ? Math.round(filteredChecks.reduce((sum, check) => sum + check.symptoms.length, 0) / filteredChecks.length)
                  : 0
                }
              </p>
            </div>
            <div className="p-3 bg-green-100 rounded-lg">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">High Risk</p>
              <p className="text-2xl font-bold text-gray-900">
                {filteredChecks.filter(check => 
                  check.predictions.some(p => p.severity === 'high')
                ).length}
              </p>
            </div>
            <div className="p-3 bg-red-100 rounded-lg">
              <AlertTriangle className="w-6 h-6 text-red-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Last Check</p>
              <p className="text-2xl font-bold text-gray-900">
                {filteredChecks.length > 0
                  ? Math.round((Date.now() - new Date(filteredChecks[0].timestamp).getTime()) / (1000 * 60 * 60 * 24))
                  : 0
                }d
              </p>
            </div>
            <div className="p-3 bg-yellow-100 rounded-lg">
              <Calendar className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Health Checks Over Time */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Health Checks Over Time</h3>
          <div className="h-64">
            <Line data={getChecksOverTimeData()} options={chartOptions} />
          </div>
        </div>

        {/* Risk Distribution */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Risk Level Distribution</h3>
          <div className="h-64">
            <Doughnut data={getRiskDistributionData()} options={doughnutOptions} />
          </div>
        </div>

        {/* Most Common Symptoms */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 lg:col-span-2">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Most Common Symptoms</h3>
          <div className="h-64">
            <Bar data={getCommonSymptomsData()} options={chartOptions} />
          </div>
        </div>
      </div>

      {/* Insights */}
      <div className="bg-blue-50 rounded-xl border border-blue-200 p-6">
        <h3 className="text-lg font-semibold text-blue-900 mb-4">Health Insights</h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-white rounded-lg p-4">
            <h4 className="font-medium text-gray-900 mb-2">Check Frequency</h4>
            <p className="text-sm text-gray-600">
              You've performed {filteredChecks.length} health checks in the selected period.
              {filteredChecks.length > 0 && (
                <span className="text-blue-600 font-medium">
                  {filteredChecks.length > 5 ? ' Great health monitoring!' : ' Consider regular check-ins.'}
                </span>
              )}
            </p>
          </div>
          
          <div className="bg-white rounded-lg p-4">
            <h4 className="font-medium text-gray-900 mb-2">Risk Trends</h4>
            <p className="text-sm text-gray-600">
              {(() => {
                const highRisk = filteredChecks.filter(check => 
                  check.predictions.some(p => p.severity === 'high')
                ).length;
                const total = filteredChecks.length;
                const percentage = total > 0 ? Math.round((highRisk / total) * 100) : 0;
                
                return percentage < 20 
                  ? `${percentage}% high-risk predictions. Excellent health awareness!`
                  : percentage < 50
                  ? `${percentage}% high-risk predictions. Monitor symptoms closely.`
                  : `${percentage}% high-risk predictions. Consider consulting healthcare providers.`;
              })()}
            </p>
          </div>
          
          <div className="bg-white rounded-lg p-4">
            <h4 className="font-medium text-gray-900 mb-2">Pattern Recognition</h4>
            <p className="text-sm text-gray-600">
              {(() => {
                const symptoms = filteredChecks.flatMap(check => check.symptoms);
                const uniqueSymptoms = new Set(symptoms);
                
                return symptoms.length > uniqueSymptoms.size 
                  ? 'Some symptoms are recurring. Track patterns for better insights.'
                  : 'Diverse symptom reporting. Good comprehensive health monitoring.';
              })()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HealthTrends;