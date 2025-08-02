'use client';

import { useState, useRef } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import Turnstile from 'react-turnstile';

export function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState('');
  const honeypotRef = useRef<HTMLInputElement>(null);

  const subscribe = async () => {
    if (honeypotRef.current?.value || !token) {
      return;
    }

    if (!email || !email.includes('@')) {
      toast.error('Please enter a valid email address.');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, token }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || 'Something went wrong');

      toast.success('🎉 Subscribed successfully!');
      setEmail('');
      setToken('');
    } catch (err) {
  if (err instanceof Error) {
    toast.error(err.message);
  } else {
    toast.error('Unexpected error.');
  }
} finally {
  setLoading(false);
}
  };

  return (
<motion.div
  className="w-full max-w-xl p-8 mx-auto bg-zinc-900 rounded-3xl shadow-2xl border border-gray-200 dark:border-zinc-800"
  initial={{ opacity: 0, y: 30 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.6, ease: 'easeOut' }}
>
  <div className="space-y-4">
    <h2 className="text-3xl sm:text-4xl font-extrabold text-center text-white ">
      Subscribe to  <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-sky-500 to-emerald-400">Algo</span><span className="text-foreground">Flux</span><span className="text-sky-500">.</span>
    </h2>
    <p className="text-center text-gray-600 dark:text-gray-400 text-sm sm:text-base">
      Get weekly DSA tips, challenges, and insights straight to your inbox.
    </p>
  </div>

  {/* Honeypot for bots */}
  <input
    type="text"
    ref={honeypotRef}
    name="confirm_email"
    className="hidden"
    autoComplete="off"
    tabIndex={-1}
  />

  <div className="mt-6 flex flex-col sm:flex-row gap-3">
    <Input
      type="email"
      placeholder="Enter your email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      disabled={loading}
      className="flex-1 w-full border border-zinc-700 focus:ring-2 focus:ring-cyan-500 focus:outline-none"
    />
    <Button
      onClick={subscribe}
      disabled={loading || !token}
      className="bg-cyan-500 hover:bg-cyan-600 text-white"
    >
      {loading ? 'Subscribing...' : 'Subscribe'}
    </Button>
  </div>

  <div className="mt-5 flex justify-center">
    <Turnstile
      sitekey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!}
      onSuccess={(token) => setToken(token)}
      onError={() => setToken('')}
      className="rounded-md"
    />
  </div>
</motion.div>

  );
}
