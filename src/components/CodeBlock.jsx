import React, { useState } from 'react';
import { Check, Copy } from 'lucide-react';

export default function CodeBlock({ code, language }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-gray-950 rounded-md my-2 overflow-hidden border border-gray-800 text-sm">
      <div className="flex justify-between items-center bg-gray-900 px-4 py-1.5 text-gray-400 text-xs border-b border-gray-800">
        <span>{language || 'code'}</span>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1 hover:text-white transition-colors"
        >
          {copied ? <Check size={14} className="text-green-400" /> : <Copy size={14} />}
          {copied ? 'Copied!' : 'Copy code'}
        </button>
      </div>
      <pre className="p-4 overflow-x-auto text-gray-200 font-mono">
        <code>{code}</code>
      </pre>
    </div>
  );
}