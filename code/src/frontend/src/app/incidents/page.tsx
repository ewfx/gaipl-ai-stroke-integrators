'use client';

import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { ExclamationTriangleIcon, CheckCircleIcon, ArrowPathIcon } from '@heroicons/react/24/outline';

interface Incident {
  id: string;
  title: string;
  description: string;
  status: string;
  priority: string;
  created_at: string;
  updated_at: string;
  telemetry_data: any;
}

export default function Incidents() {
  const [selectedIncident, setSelectedIncident] = useState<string | null>(null);
  const queryClient = useQueryClient();

  const { data: incidents, isLoading } = useQuery({
    queryKey: ['incidents'],
    queryFn: async () => {
      const response = await axios.get('http://localhost:8000/api/v1/incidents');
      return response.data;
    },
  });

  const { data: incidentDetails } = useQuery({
    queryKey: ['incidentDetails', selectedIncident],
    queryFn: async () => {
      if (!selectedIncident) return null;
      const response = await axios.get(`http://localhost:8000/api/v1/incidents/${selectedIncident}`);
      return response.data;
    },
    enabled: !!selectedIncident,
  });

  const triggerAutomationMutation = useMutation({
    mutationFn: async ({ incidentId, actionId }: { incidentId: string; actionId: string }) => {
      const response = await axios.post(
        `http://localhost:8000/api/v1/incidents/${incidentId}/automation/${actionId}`
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['incidentDetails', selectedIncident] });
    },
  });

  const runHealthCheckMutation = useMutation({
    mutationFn: async (incidentId: string) => {
      const response = await axios.get(`http://localhost:8000/api/v1/incidents/${incidentId}/health-check`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['incidentDetails', selectedIncident] });
    },
  });

  return (
    <div className="flex h-[calc(100vh-4rem)]">
      <div className="w-1/2 overflow-y-auto border-r bg-white">
        <div className="p-4">
          <h2 className="text-lg font-semibold text-gray-900">Incidents</h2>
          {isLoading ? (
            <div className="mt-4 text-center">Loading incidents...</div>
          ) : (
            <div className="mt-4 space-y-4">
              {incidents?.map((incident: Incident) => (
                <div
                  key={incident.id}
                  className={`cursor-pointer rounded-lg border p-4 ${
                    selectedIncident === incident.id
                      ? 'border-primary-500 bg-primary-50'
                      : 'border-gray-200 hover:border-primary-300'
                  }`}
                  onClick={() => setSelectedIncident(incident.id)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <ExclamationTriangleIcon className="h-5 w-5 text-primary-500" />
                      <h3 className="ml-2 text-sm font-medium text-gray-900">{incident.title}</h3>
                    </div>
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        incident.status === 'open'
                          ? 'bg-red-100 text-red-800'
                          : 'bg-green-100 text-green-800'
                      }`}
                    >
                      {incident.status}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-gray-500">{incident.description}</p>
                  <div className="mt-2 flex items-center text-xs text-gray-500">
                    <span>Created: {new Date(incident.created_at).toLocaleString()}</span>
                    <span className="mx-2">•</span>
                    <span>Priority: {incident.priority}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="w-1/2 overflow-y-auto bg-white">
        {selectedIncident ? (
          <div className="p-4">
            {incidentDetails ? (
              <div>
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-gray-900">Incident Details</h2>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => runHealthCheckMutation.mutate(selectedIncident)}
                      className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                    >
                      <ArrowPathIcon className="h-5 w-5 mr-1" />
                      Health Check
                    </button>
                  </div>
                </div>

                <div className="mt-4 space-y-4">
                  <div className="rounded-lg border border-gray-200 p-4">
                    <h3 className="text-sm font-medium text-gray-900">Automation Actions</h3>
                    <div className="mt-2 space-y-2">
                      {incidentDetails.automation_actions.map((action: string) => (
                        <button
                          key={action}
                          onClick={() =>
                            triggerAutomationMutation.mutate({
                              incidentId: selectedIncident,
                              actionId: action,
                            })
                          }
                          className="inline-flex items-center rounded-md bg-primary-50 px-3 py-2 text-sm font-semibold text-primary-700 shadow-sm hover:bg-primary-100"
                        >
                          <CheckCircleIcon className="h-5 w-5 mr-1" />
                          {action}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-lg border border-gray-200 p-4">
                    <h3 className="text-sm font-medium text-gray-900">Recommendations</h3>
                    <ul className="mt-2 list-disc pl-5 text-sm text-gray-500">
                      {incidentDetails.recommendations.map((rec: string, index: number) => (
                        <li key={index}>{rec}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="rounded-lg border border-gray-200 p-4">
                    <h3 className="text-sm font-medium text-gray-900">Related Incidents</h3>
                    <div className="mt-2 space-y-2">
                      {incidentDetails.related_incidents.map((incident: Incident) => (
                        <div
                          key={incident.id}
                          className="rounded-md bg-gray-50 p-2 text-sm text-gray-900"
                        >
                          {incident.title}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center">Loading incident details...</div>
            )}
          </div>
        ) : (
          <div className="flex h-full items-center justify-center text-gray-500">
            Select an incident to view details
          </div>
        )}
      </div>
    </div>
  );
} 