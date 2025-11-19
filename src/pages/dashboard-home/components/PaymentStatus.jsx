import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PaymentStatus = () => {
  const paymentData = {
    outstandingBalance: 0,
    recentPayments: [
      {
        id: 1,
        amount: "KES 25,000",
        description: "3-bedroom house move - Westlands to Karen",
        date: "2025-11-14",
        method: "Mpesa",
        status: "completed",
        transactionId: "QK7X8M9N2P"
      },
      {
        id: 2,
        amount: "KES 18,500",
        description: "Office relocation - CBD to Kilimani",
        date: "2025-11-10",
        method: "Bank Transfer",
        status: "completed",
        transactionId: "BT5Y6Z7A8B"
      },
      {
        id: 3,
        amount: "KES 12,000",
        description: "Bedsitter move - Kasarani to Embakasi",
        date: "2025-11-05",
        method: "Cash",
        status: "completed",
        transactionId: "CSH3C4D5E6"
      }
    ],
    upcomingPayments: [
      {
        id: 1,
        amount: "KES 35,000",
        description: "Upcoming 3-bedroom move",
        dueDate: "2025-11-20",
        status: "pending"
      }
    ]
  };

  const getPaymentMethodIcon = (method) => {
    const icons = {
      "Mpesa": "Smartphone",
      "Bank Transfer": "CreditCard",
      "Cash": "Banknote",
      "Card": "CreditCard"
    };
    return icons?.[method] || "CreditCard";
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

  return (
    <div className="bg-card border border-border rounded-2xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-foreground">Payment Status</h2>
        <Button variant="outline" size="sm" iconName="Receipt" iconPosition="left">
          View All
        </Button>
      </div>
      {/* Outstanding Balance */}
      <div className={`rounded-xl p-4 mb-6 ${
        paymentData?.outstandingBalance > 0 
          ? 'bg-warning/10 border border-warning/20' :'bg-success/10 border border-success/20'
      }`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className={`p-2 rounded-lg ${
              paymentData?.outstandingBalance > 0 ? 'bg-warning text-white' : 'bg-success text-white'
            }`}>
              <Icon name={paymentData?.outstandingBalance > 0 ? "AlertTriangle" : "CheckCircle"} size={20} />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-foreground">Outstanding Balance</h3>
              <p className="text-2xl font-bold text-foreground">
                KES {paymentData?.outstandingBalance?.toLocaleString()}
              </p>
            </div>
          </div>
          {paymentData?.outstandingBalance > 0 && (
            <Button variant="default" size="sm" iconName="CreditCard" iconPosition="left">
              Pay Now
            </Button>
          )}
        </div>
      </div>
      {/* Upcoming Payments */}
      {paymentData?.upcomingPayments?.length > 0 && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-foreground mb-3">Upcoming Payments</h3>
          <div className="space-y-3">
            {paymentData?.upcomingPayments?.map((payment) => (
              <div key={payment?.id} className="flex items-center justify-between p-4 bg-muted/50 rounded-xl">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-warning/20 rounded-lg">
                    <Icon name="Clock" size={16} className="text-warning" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">{payment?.description}</p>
                    <p className="text-xs text-muted-foreground">Due: {payment?.dueDate}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-foreground">{payment?.amount}</p>
                  {getStatusBadge(payment?.status)}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {/* Recent Payments */}
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-3">Recent Payments</h3>
        <div className="space-y-3">
          {paymentData?.recentPayments?.map((payment) => (
            <div key={payment?.id} className="flex items-center justify-between p-4 hover:bg-muted/30 rounded-xl transition-colors duration-200">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-success/20 rounded-lg">
                  <Icon name={getPaymentMethodIcon(payment?.method)} size={16} className="text-success" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">{payment?.description}</p>
                  <div className="flex items-center space-x-4 text-xs text-muted-foreground mt-1">
                    <span>{payment?.date}</span>
                    <span>•</span>
                    <span>{payment?.method}</span>
                    <span>•</span>
                    <span>ID: {payment?.transactionId}</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold text-foreground">{payment?.amount}</p>
                {getStatusBadge(payment?.status)}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-6 pt-6 border-t border-border">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-1">Payment Methods</h3>
            <p className="text-xs text-muted-foreground">Mpesa, Bank Transfer, Cash accepted</p>
          </div>
          <Button variant="ghost" size="sm" iconName="Settings" iconPosition="left">
            Manage
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PaymentStatus;