import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';
import { useAuth } from '../../../contexts/AuthContext';
import { api } from '../../../utils/apiClient';

const SupportPage = () => {
  const { user, session } = useAuth();
  const [form, setForm] = useState({ subject: '', description: '', category: 'General' });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);
    if (!user || !session) {
      setError('You must be logged in to submit a ticket.');
      return;
    }
    setLoading(true);
    try {
      const result = await api.post('/api/support', {
        subject: form.subject,
        description: form.description,
        priority: 'medium'
      }, {
        headers: {
          'Authorization': `Bearer ${session.access_token}`
        }
      });
      
      if (!result.success) throw new Error(result.error);
      setSuccess(true);
      setForm({ subject: '', description: '', category: 'General' });
      setTimeout(() => setSuccess(false), 4000);
    } catch (err) {
      console.error('Support ticket error:', err);
      setError(err.message || 'Failed to submit ticket. Please ensure the server is running.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Helmet><title>Support & Help</title></Helmet>

      {/* Success Toast Popup */}
      {success && (
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.95 }}
          className="fixed top-6 right-6 z-50 max-w-md"
        >
          <div className="bg-success text-white rounded-xl shadow-2xl p-4 flex items-start gap-4 border border-success/30">
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 0.6, repeat: Infinity, repeatDelay: 2 }}
            >
              <Icon name="CheckCircle2" size={24} className="flex-shrink-0" />
            </motion.div>
            <div className="flex-1">
              <h3 className="font-bold mb-1">Ticket Submitted!</h3>
              <p className="text-sm opacity-90">We've received your support request and will respond within 24 hours.</p>
              <motion.div
                initial={{ width: '100%' }}
                animate={{ width: 0 }}
                transition={{ duration: 4, ease: 'easeInOut' }}
                className="h-1 bg-white/30 rounded-full mt-3 origin-left"
              />
            </div>
          </div>
        </motion.div>
      )}

      <div className="max-w-3xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-foreground mb-3">Support & Help Center</h1>
          <p className="text-muted-foreground">Submit a support ticket and our team will respond within 24 hours</p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          onSubmit={handleSubmit}
          className="bg-card p-8 rounded-2xl border border-border space-y-6"
        >
          {error && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-4 bg-error/10 text-error rounded-lg flex items-start gap-3 border border-error/20"
            >
              <Icon name="AlertTriangle" size={18} className="flex-shrink-0 mt-0.5" />
              <span>{error}</span>
            </motion.div>
          )}

          <div className="space-y-6">
            <Input
              label="Subject"
              name="subject"
              value={form.subject}
              onChange={handleChange}
              placeholder="Brief description of your issue"
              required
            />

            <div>
              <label className="block text-sm font-semibold text-foreground mb-3">
                Category
              </label>
              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border border-border bg-muted text-foreground focus:outline-none focus:border-primary"
              >
                <option>General Inquiry</option>
                <option>Booking Issue</option>
                <option>Payment Issue</option>
                <option>Service Complaint</option>
                <option>Feature Request</option>
                <option>Other</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-foreground mb-3">
                Description
              </label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                rows={6}
                placeholder="Please provide detailed information about your issue..."
                className="w-full px-4 py-2 rounded-lg border border-border bg-muted text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary resize-none"
                required
              />
            </div>
          </div>

          <div className="flex gap-4 pt-6 border-t border-border">
            <Button
              type="button"
              variant="outline"
              className="flex-1"
              onClick={() => setForm({ subject: '', description: '', category: 'General' })}
            >
              Clear
            </Button>
            <Button
              type="submit"
              variant="default"
              className="flex-1"
              loading={loading}
              disabled={!form.subject || !form.description}
            >
              <Icon name="Send" size={16} />
              {loading ? 'Submitting...' : 'Submit Ticket'}
            </Button>
          </div>
        </motion.form>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mt-12 space-y-4"
        >
          <h2 className="text-2xl font-bold text-foreground mb-6">Frequently Asked Questions</h2>
          <div className="space-y-3">
            {[
              { q: 'How quickly will I receive a response?', a: 'Our support team responds within 24 hours of submission.' },
              { q: 'Can I reschedule my booking?', a: 'Yes, you can reschedule bookings at least 48 hours before the scheduled date.' },
              { q: 'What if I need to cancel?', a: 'Cancellations made 48+ hours before the booking date receive a full refund.' },
              { q: 'Do you operate on weekends?', a: 'Yes, we provide services and support on weekends as well.' }
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + idx * 0.05 }}
                className="bg-muted/50 rounded-lg p-4 border border-border"
              >
                <h3 className="font-semibold text-foreground mb-2">{item.q}</h3>
                <p className="text-sm text-muted-foreground">{item.a}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SupportPage;
