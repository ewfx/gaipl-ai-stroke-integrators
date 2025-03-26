'use client';

import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { ExclamationTriangleIcon, ChatBubbleLeftIcon, LightBulbIcon, DocumentTextIcon } from '@heroicons/react/24/outline';

const stats = [
  { name: 'Active Incidents', value: '12', icon: ExclamationTriangleIcon },
  { name: 'AI Chat Sessions', value: '45', icon: ChatBubbleLeftIcon },
  { name: 'Recommendations', value: '8', icon: LightBulbIcon },
  { name: 'Knowledge Base Articles', value: '156', icon: DocumentTextIcon },
];

interface Incident {
  id: string;
  title: string;
  description: string;
  status: string;
  priority: string;
  created_at: string;
  updated_at: string;
  telemetry_data: Record<string, any>;
}

export default function Dashboard() {
  const { data: recentIncidents, isLoading: incidentsLoading } = useQuery({
    queryKey: ['recentIncidents'],
    queryFn: async () => {
      const response = await axios.get('http://localhost:8000/api/v1/incidents/recent');
      return response.data as Incident[];
    },
  });

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.name}
            className="relative overflow-hidden rounded-lg bg-white px-4 pb-12 pt-5 shadow sm:px-6 sm:pt-6"
          >
            <dt>
              <div className="absolute rounded-md bg-primary-500 p-3">
                <stat.icon className="h-6 w-6 text-white" aria-hidden="true" />
              </div>
              <p className="ml-16 truncate text-sm font-medium text-gray-500">{stat.name}</p>
            </dt>
            <dd className="ml-16 flex items-baseline pb-6 sm:pb-7">
              <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
            </dd>
          </div>
        ))}
      </div>

      <div className="bg-white shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-base font-semibold leading-6 text-gray-900">Recent Incidents</h3>
          <div className="mt-5">
            {incidentsLoading ? (
              <div className="text-center">Loading...</div>
            ) : (
              <div className="flow-root">
                <ul role="list" className="-my-5 divide-y divide-gray-200">
                  {recentIncidents?.map((incident: Incident) => (
                    <li key={incident.id} className="py-4">
                      <div className="flex items-center space-x-4">
                        <div className="flex-shrink-0">
                          <ExclamationTriangleIcon className="h-6 w-6 text-primary-500" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-medium text-gray-900">{incident.title}</p>
                          <p className="truncate text-sm text-gray-500">{incident.description}</p>
                        </div>
                        <div>
                          <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                            incident.status === 'open' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
                          }`}>
                            {incident.status}
                          </span>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 