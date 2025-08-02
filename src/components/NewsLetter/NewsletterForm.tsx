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
      className="w-full max-w-xl p-6 mx-auto bg-white dark:bg-gray-900 rounded-2xl shadow-lg"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <h2 className="text-2xl sm:text-3xl font-bold mb-2 text-center text-cyan-500">
        📬 Subscribe to AlgoFlow
      </h2>
      <p className="text-sm text-center text-gray-500 dark:text-gray-400 mb-4">
        Weekly DSA tips & challenges, direct to your inbox.
      </p>

      {/* Honeypot */}
      <input
        type="text"
        ref={honeypotRef}
        name="confirm_email"
        className="hidden"
        autoComplete="off"
        tabIndex={-1}
      />

      <div className="flex flex-col sm:flex-row gap-2 items-center">
        <Input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={loading}
          className="flex-1 w-full"
        />
        <Button onClick={subscribe} disabled={loading || !token}>
          {loading ? 'Subscribing...' : 'Subscribe'}
        </Button>
      </div>

      <div className="mt-4 flex justify-center">
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
