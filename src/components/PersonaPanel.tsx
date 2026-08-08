import React, { useState } from 'react';
import {
  UserCheck,
  Bot,
  Sliders,
  Sparkles,
  Terminal,
  ShieldCheck,
  Save,
  Check,
} from 'lucide-react';
import { PersonaConfig } from '../types';

interface PersonaPanelProps {
  persona: PersonaConfig;
  onUpdatePersona?: (newPersona: PersonaConfig) => void;
}

export const PersonaPanel: React.FC<PersonaPanelProps> = ({
  persona: initialPersona,
  onUpdatePersona,
}) => {
  const [persona, setPersona] = useState<PersonaConfig>(initialPersona);
  const [saved, setSaved] = useState(false);

  const handleSliderChange = (key: keyof PersonaConfig['traits'], val: number) => {
    setPersona((prev) => ({
      ...prev,
      traits: {
        ...prev.traits,
        [key]: val,
      },
    }));
  };

  const handleSave = () => {
    onUpdatePersona?.(persona);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="p-6 rounded-3xl bg-zinc-950/80 border border-purple-900/30 backdrop-blur-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-purple-500/10 border border-purple-500/30 text-purple-400">
              <UserCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white tracking-tight">Persona Profile & System Prompt</h2>
              <p className="text-xs text-zinc-400">
                NEXORA’s core editorial identity, tone weights, and operational system directives
              </p>
            </div>
          </div>
        </div>

        <button
          onClick={handleSave}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-bold shadow-lg shadow-purple-600/30 transition"
        >
          {saved ? (
            <>
              <Check className="w-4 h-4 text-emerald-300" />
              <span>Persona Saved</span>
            </>
          ) : (
            <>
              <Save className="w-4 h-4 text-purple-200" />
              <span>Update Persona Rules</span>
            </>
          )}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Persona Identity Overview & Focus Areas */}
        <div className="lg:col-span-5 p-6 rounded-3xl bg-zinc-950/80 border border-purple-900/30 space-y-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-purple-600 via-indigo-600 to-cyan-400 p-[2px] shadow-xl shadow-purple-500/30">
              <div className="w-full h-full bg-zinc-950 rounded-[14px] flex items-center justify-center">
                <Bot className="w-8 h-8 text-purple-300" />
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-white">{persona.name}</h3>
              <p className="text-xs text-purple-300 font-semibold">{persona.role}</p>
              <span className="inline-flex items-center gap-1 mt-1 text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                ● Autonomous Persona Lock Active
              </span>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-300 mb-3">
              Core Technical Focus Domains
            </h4>
            <div className="flex flex-wrap gap-2">
              {persona.focusAreas.map((area) => (
                <span
                  key={area}
                  className="px-3 py-1.5 rounded-xl text-xs font-medium bg-zinc-900 border border-purple-900/40 text-purple-200"
                >
                  {area}
                </span>
              ))}
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-zinc-900/80 border border-zinc-800 space-y-2">
            <h4 className="text-xs font-bold text-zinc-200">Editorial Philosophy</h4>
            <p className="text-xs text-zinc-400 leading-relaxed italic">
              "{persona.editorialPhilosophy}"
            </p>
          </div>
        </div>

        {/* Right: Sliders & System Prompt Inspector */}
        <div className="lg:col-span-7 space-y-6">
          {/* Tone & Style Sliders */}
          <div className="p-6 rounded-3xl bg-zinc-950/80 border border-purple-900/30 space-y-5">
            <h3 className="text-sm font-bold uppercase tracking-wider text-purple-300 flex items-center gap-2">
              <Sliders className="w-4 h-4 text-purple-400" />
              <span>Editorial Persona Weights</span>
            </h3>

            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span className="text-zinc-300">Technical Depth</span>
                  <span className="font-mono text-purple-300">{persona.traits.technicalDepth}%</span>
                </div>
                <input
                  type="range"
                  min="50"
                  max="100"
                  value={persona.traits.technicalDepth}
                  onChange={(e) => handleSliderChange('technicalDepth', Number(e.target.value))}
                  className="w-full accent-purple-500 bg-zinc-800 rounded-lg cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span className="text-zinc-300">Analytical & Architectural Level</span>
                  <span className="font-mono text-indigo-300">{persona.traits.analyticalLevel}%</span>
                </div>
                <input
                  type="range"
                  min="50"
                  max="100"
                  value={persona.traits.analyticalLevel}
                  onChange={(e) => handleSliderChange('analyticalLevel', Number(e.target.value))}
                  className="w-full accent-indigo-500 bg-zinc-800 rounded-lg cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span className="text-zinc-300">Evidence & Source Citation Rigor</span>
                  <span className="font-mono text-cyan-300">{persona.traits.evidenceDriven}%</span>
                </div>
                <input
                  type="range"
                  min="50"
                  max="100"
                  value={persona.traits.evidenceDriven}
                  onChange={(e) => handleSliderChange('evidenceDriven', Number(e.target.value))}
                  className="w-full accent-cyan-500 bg-zinc-800 rounded-lg cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span className="text-zinc-300">Conciseness & Code Density</span>
                  <span className="font-mono text-emerald-300">{persona.traits.conciseness}%</span>
                </div>
                <input
                  type="range"
                  min="50"
                  max="100"
                  value={persona.traits.conciseness}
                  onChange={(e) => handleSliderChange('conciseness', Number(e.target.value))}
                  className="w-full accent-emerald-500 bg-zinc-800 rounded-lg cursor-pointer"
                />
              </div>
            </div>
          </div>

          {/* System Prompt Inspector */}
          <div className="p-6 rounded-3xl bg-zinc-950/80 border border-purple-900/30 space-y-3 font-mono text-xs">
            <div className="flex items-center gap-2 text-zinc-300">
              <Terminal className="w-4 h-4 text-purple-400" />
              <h4 className="font-bold text-xs">System Directive Prompt (Injected to Gemini)</h4>
            </div>

            <textarea
              rows={5}
              value={persona.systemPrompt}
              onChange={(e) => setPersona({ ...persona, systemPrompt: e.target.value })}
              className="w-full p-3.5 rounded-2xl bg-black/80 border border-zinc-800 text-xs text-purple-200 focus:outline-none focus:border-purple-500/50 leading-relaxed font-mono"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
