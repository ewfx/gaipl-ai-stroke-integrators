'use client';

import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { PaperAirplaneIcon } from '@heroicons/react/24/outline';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

export default function Chat() {
  const [message, setMessage] = useState('');
  const queryClient = useQueryClient();

  const { data: chatHistory, isLoading } = useQuery({
    queryKey: ['chatHistory'],
    queryFn: async () => {
      const response = await axios.get('http://localhost:8000/api/v1/chat/history');
      return response.data;
    },
  });

  const sendMessageMutation = useMutation({
    mutationFn: async (newMessage: string) => {
      const response = await axios.post('http://localhost:8000/api/v1/chat/chat', {
        message: newMessage,
      });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['chatHistory'] });
      setMessage('');
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      sendMessageMutation.mutate(message);
    }
  };

  return (
    <div className="flex h-[calc(100vh-4rem)] flex-col">
      <div className="flex-1 overflow-y-auto bg-white p-4">
        {isLoading ? (
          <div className="text-center">Loading chat history...</div>
        ) : (
          <div className="space-y-4">
            {chatHistory?.map((msg: Message) => (
              <div
                key={msg.timestamp}
                className={`flex ${
                  msg.role === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                <div
                  className={`max-w-[70%] rounded-lg px-4 py-2 ${
                    msg.role === 'user'
                      ? 'bg-primary-500 text-white'
                      : 'bg-gray-100 text-gray-900'
                  }`}
                >
                  <p className="text-sm">{msg.content}</p>
                  <p className="mt-1 text-xs opacity-70">
                    {new Date(msg.timestamp).toLocaleTimeString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="border-t bg-white p-4">
        <div className="flex space-x-4">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 rounded-lg border border-gray-300 px-4 py-2 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
            disabled={sendMessageMutation.isPending}
          />
          <button
            type="submit"
            disabled={sendMessageMutation.isPending || !message.trim()}
            className="inline-flex items-center rounded-lg bg-primary-500 px-4 py-2 text-white hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50"
          >
            <PaperAirplaneIcon className="h-5 w-5" />
          </button>
        </div>
      </form>
    </div>
  );
} 