import React, { useState, useEffect } from 'react';
import {
  Settings,
  Server,
  Key,
  Database,
  CheckCircle2,
  AlertCircle,
  Copy,
  Check,
  RefreshCw,
  ExternalLink,
  Code2,
} from 'lucide-react';
import { agentApi } from '../services/api';

interface SystemSettingsProps {
  onResetData: () => void;
}

export const SystemSettings: React.FC<SystemSettingsProps> = ({ onResetData }) => {
  const [backendStatus, setBackendStatus] = useState<{
    serverTime: string;
    geminiKeyConfigured: boolean;
    uptimeSeconds: number;
  } | null>(null);

  const [copiedEndpoint, setCopiedEndpoint] = useState<string | null>(null);

  useEffect(() => {
    agentApi.getStatus().then((status) => {
      setBackendStatus(status);
    });
  }, []);

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedEndpoint(label);
    setTimeout(() => setCopiedEndpoint(null), 2000);
  };

  const sampleJson = `{
  "posts": [
    {
      "id": "p1",
      "createdAt": "2026-08-08T10:30:00Z",
      "text": "Stateful agent execution requires more than transient context windows...",
      "rationale": "Selected because agent memory is rapidly becoming important...",
      "sources": ["https://arxiv.org/abs/2608.04112"]
    }
  ]
}`;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="p-6 rounded-3xl bg-zinc-950/80 border border-purple-900/30 backdrop-blur-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-purple-500/10 border border-purple-500/30 text-purple-400">
              <Settings className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white tracking-tight">API & System Settings</h2>
              <p className="text-xs text-zinc-400">
                Backend API endpoints structure, Express connection status, and runtime secrets
              </p>
            </div>
          </div>
        </div>

        <button
          onClick={onResetData}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-amber-300 text-xs font-semibold transition"
        >
          <RefreshCw className="w-4 h-4 text-amber-400" />
          <span>Reset System Memory State</span>
        </button>
      </div>

      {/* Backend Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Express Server */}
        <div className="p-5 rounded-3xl bg-zinc-950/80 border border-purple-900/30 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <Server className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Express Backend</h4>
              <p className="text-xs text-zinc-400">Port 3000 / Cloud Run Container</p>
            </div>
          </div>

          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>CONNECTED</span>
          </span>
        </div>

        {/* Gemini AI Key Status */}
        <div className="p-5 rounded-3xl bg-zinc-950/80 border border-purple-900/30 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
              <Key className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Gemini API Key</h4>
              <p className="text-xs text-zinc-400">
                {backendStatus?.geminiKeyConfigured
                  ? 'Active (Server-Side @google/genai)'
                  : 'Injectable via Secrets Panel'}
              </p>
            </div>
          </div>

          <span
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold border ${
              backendStatus?.geminiKeyConfigured
                ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                : 'bg-purple-500/10 text-purple-300 border-purple-500/30'
            }`}
          >
            <CheckCircle2 className="w-3.5 h-3.5 text-purple-400" />
            <span>{backendStatus?.geminiKeyConfigured ? 'KEY ACTIVE' : 'KEY READY'}</span>
          </span>
        </div>
      </div>

      {/* Required Hackathon API Endpoints Overview */}
      <div className="p-6 rounded-3xl bg-zinc-950/80 border border-purple-900/30 space-y-4">
        <div className="flex items-center gap-2 text-purple-300">
          <Code2 className="w-5 h-5 text-purple-400" />
          <h3 className="text-base font-bold text-white">Backend API Integration Contracts</h3>
        </div>

        <p className="text-xs text-zinc-400 leading-relaxed">
          NEXORA AI frontend is pre-configured to consume standard autonomous agent endpoints.
        </p>

        <div className="space-y-3 font-mono text-xs">
          {/* Endpoint 1 */}
          <div className="p-3.5 rounded-2xl bg-zinc-900/80 border border-zinc-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="px-2.5 py-1 rounded-lg bg-emerald-950 text-emerald-400 border border-emerald-800 font-bold">
                POST
              </span>
              <span className="text-zinc-200 font-bold">/api/agent/init</span>
            </div>
            <button
              onClick={() => handleCopy('/api/agent/init', 'init')}
              className="p-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 transition"
            >
              {copiedEndpoint === 'init' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          </div>

          {/* Endpoint 2 */}
          <div className="p-3.5 rounded-2xl bg-zinc-900/80 border border-zinc-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="px-2.5 py-1 rounded-lg bg-blue-950 text-blue-400 border border-blue-800 font-bold">
                GET
              </span>
              <span className="text-zinc-200 font-bold">/api/agent/feed?agentId=abc-123</span>
            </div>
            <button
              onClick={() => handleCopy('/api/agent/feed?agentId=abc-123', 'feed')}
              className="p-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 transition"
            >
              {copiedEndpoint === 'feed' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          </div>

          {/* Endpoint 3 */}
          <div className="p-3.5 rounded-2xl bg-zinc-900/80 border border-zinc-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="px-2.5 py-1 rounded-lg bg-emerald-950 text-emerald-400 border border-emerald-800 font-bold">
                POST
              </span>
              <span className="text-zinc-200 font-bold">/api/agent/run-cycle</span>
            </div>
            <button
              onClick={() => handleCopy('/api/agent/run-cycle', 'cycle')}
              className="p-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 transition"
            >
              {copiedEndpoint === 'cycle' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>

        {/* Expected JSON schema view */}
        <div className="mt-4 pt-4 border-t border-zinc-900">
          <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider block mb-2">
            Expected Feed Response Schema (GET /api/agent/feed)
          </span>
          <pre className="p-4 rounded-2xl bg-black/90 border border-zinc-800 text-[11px] text-purple-300 overflow-x-auto">
            {sampleJson}
          </pre>
        </div>
      </div>
    </div>
  );
};
