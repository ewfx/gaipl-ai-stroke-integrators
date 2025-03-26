'use client';

import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { LightBulbIcon, ExclamationTriangleIcon, ChartBarIcon } from '@heroicons/react/24/outline';

interface Recommendation {
  id: string;
  title: string;
  description: string;
  confidence_score: number;
  source: string;
  related_metrics: string[];
  action_items: string[];
}

interface ComponentHealth {
  component_id: string;
  name: string;
  health_status: string;
  metrics: {
    [key: string]: number;
  };
}

export default function Recommendations() {
  const { data: recommendations, isLoading: recommendationsLoading } = useQuery({
    queryKey: ['recommendations'],
    queryFn: async () => {
      const response = await axios.get('http://localhost:8000/api/v1/recommendations/generate');
      return response.data;
    },
  });

  const { data: componentHealth, isLoading: healthLoading } = useQuery({
    queryKey: ['componentHealth'],
    queryFn: async () => {
      const response = await axios.get('http://localhost:8000/api/v1/recommendations/component-health');
      return response.data;
    },
  });

  return (
    <div className="space-y-6">
      <div className="bg-white shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-base font-semibold leading-6 text-gray-900">Proactive Recommendations</h3>
          <div className="mt-5">
            {recommendationsLoading ? (
              <div className="text-center">Loading recommendations...</div>
            ) : (
              <div className="space-y-4">
                {recommendations?.map((rec: Recommendation) => (
                  <div key={rec.id} className="rounded-lg border border-gray-200 p-4">
                    <div className="flex items-start">
                      <div className="flex-shrink-0">
                        <LightBulbIcon className="h-6 w-6 text-primary-500" />
                      </div>
                      <div className="ml-3">
                        <h4 className="text-sm font-medium text-gray-900">{rec.title}</h4>
                        <p className="mt-1 text-sm text-gray-500">{rec.description}</p>
                        <div className="mt-2">
                          <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                            Confidence: {Math.round(rec.confidence_score * 100)}%
                          </span>
                        </div>
                        <ul className="mt-2 list-disc pl-5 text-sm text-gray-500">
                          {rec.action_items.map((item, index) => (
                            <li key={index}>{item}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="bg-white shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-base font-semibold leading-6 text-gray-900">Component Health Status</h3>
          <div className="mt-5">
            {healthLoading ? (
              <div className="text-center">Loading health status...</div>
            ) : (
              <div className="space-y-4">
                {componentHealth?.map((component: ComponentHealth) => (
                  <div key={component.component_id} className="rounded-lg border border-gray-200 p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <ChartBarIcon className="h-6 w-6 text-primary-500" />
                        <div className="ml-3">
                          <h4 className="text-sm font-medium text-gray-900">{component.name}</h4>
                          <p className="text-sm text-gray-500">ID: {component.component_id}</p>
                        </div>
                      </div>
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          component.health_status === 'healthy'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {component.health_status}
                      </span>
                    </div>
                    <div className="mt-4 grid grid-cols-2 gap-4">
                      {Object.entries(component.metrics).map(([key, value]) => (
                        <div key={key} className="rounded bg-gray-50 p-2">
                          <p className="text-xs font-medium text-gray-500">{key}</p>
                          <p className="text-sm font-semibold text-gray-900">{value}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 