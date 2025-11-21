import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { useAuth } from '../../../contexts/AuthContext';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PAYMENT_METHODS = [
  { id: 'mpesa', name: 'M-Pesa', icon: 'Smartphone', color: 'from-green-500/20 to-green-600/20', borderColor: 'border-green-500/30', bgColor: 'bg-green-500' },
  { id: 'bank', name: 'Bank Transfer', icon: 'Building2', color: 'from-blue-500/20 to-blue-600/20', borderColor: 'border-blue-500/30', bgColor: 'bg-blue-500' },
  { id: 'cash', name: 'Cash', icon: 'Wallet', color: 'from-orange-500/20 to-orange-600/20', borderColor: 'border-orange-500/30', bgColor: 'bg-orange-500' }
];

const PaymentsPage = () => {
  const { session } = useAuth();
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [outstandingBalance, setOutstandingBalance] = useState(0);
  const [showPaymentMethodsModal, setShowPaymentMethodsModal] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);

  useEffect(() => {
    const fetchPayments = async () => {
      if (!session) return;
      setLoading(true);
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/payments`, {
          headers: {
            'Authorization': `Bearer ${session.access_token}`
          }
        });
        const result = await response.json();
        
        if (result.success && result.data) {
          setPayments(result.data || []);
          
          // Calculate outstanding balance (pending payments)
          const pending = result.data.filter(p => p.status === 'pending');
          const balance = pending.reduce((sum, p) => sum + (p.amount || 0), 0);
          setOutstandingBalance(balance);
        }
      } catch (error) {
        console.warn('Failed to load payments', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPayments();
  }, [session]);

  return (
    <div>
      <Helmet>
        <title>Payment Status</title>
      </Helmet>

      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground">Payment Status</h1>
          <p className="text-muted-foreground mt-2">Track and manage your payments</p>
        </motion.div>

        {loading ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12 text-muted-foreground"
          >
            <div className="inline-block">
              <Icon name="Loader2" size={32} className="text-primary animate-spin mb-4" />
              <p>Loading payment data...</p>
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-8"
          >
            {/* Outstanding Balance */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className={`rounded-2xl p-6 border ${
              outstandingBalance > 0 
                ? 'bg-warning/10 border-warning/20' 
                : 'bg-success/10 border-success/20'
            }`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className={`p-3 rounded-lg ${
                    outstandingBalance > 0 ? 'bg-warning text-white' : 'bg-success text-white'
                  }`}>
                    <Icon name={outstandingBalance > 0 ? "AlertTriangle" : "CheckCircle"} size={24} />
                  </div>
                  <div>
                    <h2 className="text-sm font-semibold text-foreground">Outstanding Balance</h2>
                    <p className="text-3xl font-bold text-foreground">
                      KES {outstandingBalance?.toLocaleString()}
                    </p>
                  </div>
                </div>
                {outstandingBalance > 0 && (
                  <Button variant="default" size="lg" iconName="CreditCard" iconPosition="left">
                    Pay Now
                  </Button>
                )}
              </div>
            </motion.div>

            {/* Payments List */}
            {payments && payments.length > 0 ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-card border border-border rounded-2xl p-6"
              >
                <h2 className="text-2xl font-bold text-foreground mb-6">Payment History</h2>
                <div className="space-y-4">
                  {payments.map((payment, index) => (
                    <motion.div
                      key={payment?.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="flex flex-col md:flex-row md:items-center md:justify-between p-4 hover:bg-muted/30 rounded-xl transition-colors gap-4 border border-border/50"
                    >
                      <div className="flex items-center space-x-4 flex-1">
                        <div className="p-3 bg-primary/20 rounded-lg flex-shrink-0">
                          <Icon name="CreditCard" size={20} className="text-primary" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-foreground truncate">
                            {payment?.payment_method || 'Payment'}
                          </p>
                          <div className="flex items-center space-x-2 text-xs text-muted-foreground mt-1 flex-wrap">
                            <span>{new Date(payment?.created_at).toLocaleDateString()}</span>
                            {payment?.transaction_ref && (
                              <>
                                <span>•</span>
                                <span>Ref: {payment?.transaction_ref}</span>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between md:justify-end gap-4">
                        <p className="font-bold text-foreground">KES {(payment?.amount || 0).toLocaleString()}</p>
                        {getStatusBadge(payment?.status)}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-card border border-border rounded-2xl p-8 text-center"
              >
                <Icon name="CreditCard" size={48} className="text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">No payments yet. Create a booking to make a payment.</p>
              </motion.div>
            )}

            {/* Payment Methods Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-card border border-border rounded-2xl p-6"
            >
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-foreground mb-2">Payment Methods</h3>
                <p className="text-sm text-muted-foreground">We accept multiple secure payment options</p>
              </div>
              
              {/* Payment Method Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                {PAYMENT_METHODS.map((method, index) => (
                  <motion.button
                    key={method.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => setSelectedPaymentMethod(method.id)}
                    className={`relative p-4 rounded-xl border-2 transition-all duration-300 group cursor-pointer ${
                      selectedPaymentMethod === method.id
                        ? `${method.borderColor} border-2 bg-opacity-100`
                        : `${method.borderColor} border-border/50 hover:border-border`
                    }`}
                  >
                    {/* Background Gradient */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${method.color} rounded-xl opacity-50 group-hover:opacity-75 transition-opacity`}></div>
                    
                    {/* Content */}
                    <div className="relative flex flex-col items-center text-center space-y-2">
                      <div className={`p-3 rounded-full ${method.bgColor} text-white shadow-lg`}>
                        <Icon name={method.icon} size={20} />
                      </div>
                      <p className="font-semibold text-foreground text-sm">{method.name}</p>
                      {selectedPaymentMethod === method.id && (
                        <div className="flex justify-center">
                          <Icon name="Check" size={16} className="text-success" />
                        </div>
                      )}
                    </div>
                  </motion.button>
                ))}
              </div>

              {/* Manage Button - Dynamic */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="flex flex-col sm:flex-row gap-3 sm:justify-between sm:items-center"
              >
                <div className="text-sm text-muted-foreground">
                  {selectedPaymentMethod ? (
                    <p>Selected: <span className="font-semibold text-foreground">{PAYMENT_METHODS.find(m => m.id === selectedPaymentMethod)?.name}</span></p>
                  ) : (
                    <p>Select a payment method to proceed</p>
                  )}
                </div>
                <Button 
                  variant="default" 
                  size="lg" 
                  iconName="Settings" 
                  iconPosition="left"
                  onClick={() => setShowPaymentMethodsModal(!showPaymentMethodsModal)}
                  disabled={!selectedPaymentMethod}
                >
                  Manage
                </Button>
              </motion.div>

              {/* Payment Method Details Modal */}
              {showPaymentMethodsModal && selectedPaymentMethod && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 p-4 bg-muted/50 rounded-xl border border-border"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-semibold text-foreground">
                      {PAYMENT_METHODS.find(m => m.id === selectedPaymentMethod)?.name} Details
                    </h4>
                    <button onClick={() => setShowPaymentMethodsModal(false)} className="text-muted-foreground hover:text-foreground">
                      <Icon name="X" size={18} />
                    </button>
                  </div>
                  
                  {selectedPaymentMethod === 'mpesa' && (
                    <div className="space-y-3 text-sm">
                      <p className="text-muted-foreground">Quick and easy mobile payment</p>
                      <div className="bg-card p-3 rounded-lg space-y-2">
                        <p>• Dial *156# on your M-Pesa phone</p>
                        <p>• Or use the M-Pesa app</p>
                        <p>• Enter our business number: 600000</p>
                        <p>• Enter amount and your PIN</p>
                      </div>
                    </div>
                  )}
                  
                  {selectedPaymentMethod === 'bank' && (
                    <div className="space-y-3 text-sm">
                      <p className="text-muted-foreground">Direct bank transfer</p>
                      <div className="bg-card p-3 rounded-lg space-y-2">
                        <p><strong>Bank:</strong> Kenya Commercial Bank</p>
                        <p><strong>Account Name:</strong> Ready One Movers Ltd</p>
                        <p><strong>Account Number:</strong> 1234567890</p>
                        <p><strong>Branch Code:</strong> 002</p>
                      </div>
                    </div>
                  )}
                  
                  {selectedPaymentMethod === 'cash' && (
                    <div className="space-y-3 text-sm">
                      <p className="text-muted-foreground">Pay with cash on the move day</p>
                      <div className="bg-card p-3 rounded-lg space-y-2">
                        <p>• Pay to the team leader</p>
                        <p>• Get a receipt for your records</p>
                        <p>• Can pay partially on day and remainder later</p>
                      </div>
                    </div>
                  )}
                </motion.div>
              )}
            </motion.div>

            {/* Invoices Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-card border border-border rounded-2xl p-6"
            >
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-foreground mb-2">Invoices & Receipts</h3>
                <p className="text-sm text-muted-foreground">Download, view, and share your invoices</p>
              </div>

              {/* Mock Invoices Data */}
              {payments && payments.length > 0 ? (
                <div className="space-y-3">
                  {payments.map((payment, index) => (
                    <motion.div
                      key={payment?.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-4 bg-muted/50 hover:bg-muted/80 rounded-xl transition-colors border border-border/50"
                    >
                      <div className="flex items-center gap-4 mb-4 sm:mb-0">
                        <div className="p-3 bg-primary/10 rounded-lg flex-shrink-0">
                          <Icon name="FileText" size={20} className="text-primary" />
                        </div>
                        <div className="min-w-0">
                          <p className="font-medium text-foreground truncate">
                            Invoice #{String(payment?.id).padStart(6, '0')}
                          </p>
                          <div className="flex items-center space-x-2 text-xs text-muted-foreground mt-1 flex-wrap">
                            <span>{new Date(payment?.created_at).toLocaleDateString()}</span>
                            <span>•</span>
                            <span>KES {(payment?.amount || 0).toLocaleString()}</span>
                          </div>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex items-center gap-2 flex-wrap">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => {
                            // Trigger download
                            const invoiceData = `Invoice #${String(payment?.id).padStart(6, '0')}\n\nDate: ${new Date(payment?.created_at).toLocaleDateString()}\nAmount: KES ${(payment?.amount || 0).toLocaleString()}\nStatus: ${payment?.status}\nPayment Method: ${payment?.payment_method}`;
                            const element = document.createElement('a');
                            element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(invoiceData));
                            element.setAttribute('download', `invoice_${String(payment?.id).padStart(6, '0')}.txt`);
                            element.style.display = 'none';
                            document.body.appendChild(element);
                            element.click();
                            document.body.removeChild(element);
                          }}
                          className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium bg-primary/10 text-primary hover:bg-primary/20 rounded-lg transition-colors"
                          title="Download invoice"
                        >
                          <Icon name="Download" size={14} />
                          <span>Download</span>
                        </motion.button>

                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => {
                            // Share via email or link
                            const invoiceText = `Invoice #${String(payment?.id).padStart(6, '0')}\n\nDate: ${new Date(payment?.created_at).toLocaleDateString()}\nAmount: KES ${(payment?.amount || 0).toLocaleString()}\nStatus: ${payment?.status}`;
                            const mailtoLink = `mailto:?subject=Invoice ${String(payment?.id).padStart(6, '0')}&body=${encodeURIComponent(invoiceText)}`;
                            window.location.href = mailtoLink;
                          }}
                          className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium bg-secondary/10 text-secondary hover:bg-secondary/20 rounded-lg transition-colors"
                          title="Share invoice"
                        >
                          <Icon name="Share2" size={14} />
                          <span>Share</span>
                        </motion.button>

                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => {
                            // View invoice details
                            alert(`Invoice #${String(payment?.id).padStart(6, '0')}\n\nDate: ${new Date(payment?.created_at).toLocaleDateString()}\nAmount: KES ${(payment?.amount || 0).toLocaleString()}\nStatus: ${payment?.status}\nPayment Method: ${payment?.payment_method}\nTransaction Ref: ${payment?.transaction_ref || 'N/A'}`);
                          }}
                          className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium bg-muted text-foreground hover:bg-muted/80 rounded-lg transition-colors"
                          title="View invoice"
                        >
                          <Icon name="Eye" size={14} />
                          <span>View</span>
                        </motion.button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-8"
                >
                  <Icon name="FileText" size={48} className="text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">No invoices available yet. Make a payment to receive an invoice.</p>
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

const getStatusBadge = (status) => {
  const statusConfig = {
    completed: {
      class: "bg-success/10 text-success border-success/20",
      text: "Completed",
      icon: "CheckCircle"
    },
    pending: {
      class: "bg-warning/10 text-warning border-warning/20",
      text: "Pending",
      icon: "Clock"
    },
    failed: {
      class: "bg-error/10 text-error border-error/20",
      text: "Failed",
      icon: "XCircle"
    },
    refunded: {
      class: "bg-secondary/10 text-secondary border-secondary/20",
      text: "Refunded",
      icon: "RefreshCw"
    }
  };

  const config = statusConfig?.[status] || statusConfig?.pending;
  return (
    <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium border ${config?.class}`}>
      <Icon name={config?.icon} size={12} />
      <span>{config?.text}</span>
    </div>
  );
};


export default PaymentsPage;
