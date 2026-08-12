import React from 'react';
import { CheckCircleIcon, XCircleIcon, ClockIcon } from 'lucide-react';

interface CustomRequest {
  id: string;
  buyer: string;
  request: string;
  status: 'Pending' | 'Quoted' | 'Completed' | 'Rejected';
  quote?: number;
  createdAt: string;
}

const sampleRequests: CustomRequest[] = [
  {
    id: 'req-1',
    buyer: 'John Doe',
    request: 'Custom AI agent for stock prediction in Next.js.',
    status: 'Quoted',
    quote: 1200,
    createdAt: '2023-01-15',
  },
  {
    id: 'req-2',
    buyer: 'Jane Smith',
    request: 'Notion template for enterprise project management.',
    status: 'Pending',
    createdAt: '2023-02-01',
  },
  {
    id: 'req-3',
    buyer: 'Alex Johnson',
    request: 'Canva design kit for crypto startup branding.',
    status: 'Completed',
    quote: 450,
    createdAt: '2023-01-20',
  },
];

const CustomRequestsTable: React.FC = () => {
  return (
    <div className="overflow-x-auto glass-card p-4 rounded-lg">
      <table className="min-w-full text-sm text-left text-gray-300">
        <thead className="text-xs text-gray-400 uppercase bg-cyber-card">
          <tr>
            <th scope="col" className="px-4 py-3">Buyer</th>
            <th scope="col" className="px-4 py-3">Request</th>
            <th scope="col" className="px-4 py-3">Status</th>
            <th scope="col" className="px-4 py-3">Quote (USD)</th>
            <th scope="col" className="px-4 py-3">Date</th>
            <th scope="col" className="px-4 py-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {sampleRequests.map((request) => (
            <tr key={request.id} className="border-b border-cyber-border hover:bg-cyber-card/50 transition-colors duration-200">
              <td className="px-4 py-4 font-medium text-white">{request.buyer}</td>
              <td className="px-4 py-4">{request.request}</td>
              <td className="px-4 py-4">
                <span className={`flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium w-fit
                  ${request.status === 'Completed' ? 'bg-green-900/30 text-green-300'
                  : request.status === 'Quoted' ? 'bg-blue-900/30 text-blue-300'
                  : request.status === 'Pending' ? 'bg-yellow-900/30 text-yellow-300'
                  : 'bg-red-900/30 text-red-300'}`}>
                  {request.status === 'Completed' && <CheckCircleIcon className="w-3 h-3 mr-1" />}
                  {request.status === 'Quoted' && <DollarSignIcon className="w-3 h-3 mr-1" />}
                  {request.status === 'Pending' && <ClockIcon className="w-3 h-3 mr-1" />}
                  {request.status === 'Rejected' && <XCircleIcon className="w-3 h-3 mr-1" />}
                  {request.status}
                </span>
              </td>
              <td className="px-4 py-4">{request.quote ? `$${request.quote.toLocaleString()}` : 'N/A'}</td>
              <td className="px-4 py-4 text-gray-400">{request.createdAt}</td>
              <td className="px-4 py-4">
                <button className="text-cyber-accent hover:text-cyber-cyan transition-colors duration-200">Manage</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CustomRequestsTable;
