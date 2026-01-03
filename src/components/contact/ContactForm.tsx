import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'next-i18next';

type FormData = {
  name: string;
  email: string;
  message: string;
};

const ContactForm = () => {
  const { t } = useTranslation('common');
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>();
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const onSubmit = async (data: FormData) => {
    setStatus('loading');
    try {
      const res = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        setStatus('success');
        reset();
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 w-full">
      <div>
        <label className="block text-sm font-medium mb-2 text-gray-300">{t('name')}</label>
        <input
          {...register('name', { required: true })}
          className="w-full bg-white/10 border border-white/20 rounded p-3 text-white focus:outline-none focus:border-white transition-colors"
        />
        {errors.name && <span className="text-red-400 text-xs">Required</span>}
      </div>
      
      <div>
        <label className="block text-sm font-medium mb-2 text-gray-300">{t('email')}</label>
        <input
          {...register('email', { required: true, pattern: /^\S+@\S+$/i })}
          className="w-full bg-white/10 border border-white/20 rounded p-3 text-white focus:outline-none focus:border-white transition-colors"
        />
        {errors.email && <span className="text-red-400 text-xs">Valid email required</span>}
      </div>

      <div>
        <label className="block text-sm font-medium mb-2 text-gray-300">{t('message')}</label>
        <textarea
          {...register('message', { required: true })}
          rows={4}
          className="w-full bg-white/10 border border-white/20 rounded p-3 text-white focus:outline-none focus:border-white transition-colors"
        />
        {errors.message && <span className="text-red-400 text-xs">Required</span>}
      </div>

      <button
        type="submit"
        disabled={status === 'loading'}
        className="w-full bg-white text-black font-bold py-3 px-6 rounded hover:bg-gray-200 transition-colors uppercase tracking-widest disabled:opacity-50"
      >
        {status === 'loading' ? 'Sending...' : t('send')}
      </button>

      {status === 'success' && (
        <p className="text-green-400 text-center mt-4">Message sent successfully!</p>
      )}
      {status === 'error' && (
        <p className="text-red-400 text-center mt-4">Failed to send message.</p>
      )}
    </form>
  );
};

export default ContactForm;