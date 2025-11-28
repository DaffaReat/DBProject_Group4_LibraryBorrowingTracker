import React, { useState } from 'react';
import { ArrowLeft, CreditCard, CheckCircle, DollarSign, Lock } from 'lucide-react';

interface FinePaymentProps {
  fine: any;
  onNavigate: (view: string) => void;
}

export default function FinePayment({ fine, onNavigate }: FinePaymentProps) {
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [agreed, setAgreed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Payment processed successfully!');
    onNavigate('fines');
  };

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <button
        onClick={() => onNavigate('fines')}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
      >
        <ArrowLeft className="w-5 h-5" />
        Back to Fines
      </button>

      {/* Header */}
      <div>
        <h1 className="text-gray-900">Pay Fine</h1>
        <p className="text-gray-600">Complete your payment securely</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Fine Details */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-gray-900 mb-4">Fine Details</h2>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-sm text-gray-600">Fine ID</div>
                <div className="text-gray-900">{fine.FineID}</div>
              </div>
              <div>
                <div className="text-sm text-gray-600">Borrow ID</div>
                <div className="text-gray-900">{fine.BorrowID}</div>
              </div>
              <div className="col-span-2">
                <div className="text-sm text-gray-600">Book</div>
                <div className="text-gray-900">{fine.BookTitle}</div>
              </div>
              <div className="col-span-2">
                <div className="text-sm text-gray-600">Reason</div>
                <div className="text-gray-900">{fine.Reason}</div>
              </div>
              <div>
                <div className="text-sm text-gray-600">Date Issued</div>
                <div className="text-gray-900">{fine.DateIssued}</div>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-4">
              <div className="flex items-center justify-between">
                <div className="text-gray-600">Amount Due</div>
                <div className="text-3xl text-gray-900">${fine.Amount.toFixed(2)}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Method */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-gray-900 mb-4">Payment Method</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <button
              type="button"
              onClick={() => setPaymentMethod('card')}
              className={`p-4 border-2 rounded-lg transition-all ${
                paymentMethod === 'card'
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <CreditCard className="w-6 h-6 mx-auto mb-2 text-blue-600" />
              <div className="text-sm text-gray-900">Credit/Debit Card</div>
            </button>
            <button
              type="button"
              onClick={() => setPaymentMethod('bank')}
              className={`p-4 border-2 rounded-lg transition-all ${
                paymentMethod === 'bank'
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <DollarSign className="w-6 h-6 mx-auto mb-2 text-blue-600" />
              <div className="text-sm text-gray-900">Bank Transfer</div>
            </button>
            <button
              type="button"
              onClick={() => setPaymentMethod('wallet')}
              className={`p-4 border-2 rounded-lg transition-all ${
                paymentMethod === 'wallet'
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <DollarSign className="w-6 h-6 mx-auto mb-2 text-blue-600" />
              <div className="text-sm text-gray-900">Digital Wallet</div>
            </button>
          </div>

          {paymentMethod === 'card' && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-700 mb-2">
                  Card Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  placeholder="1234 5678 9012 3456"
                  required
                  maxLength={19}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-700 mb-2">
                  Cardholder Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={cardName}
                  onChange={(e) => setCardName(e.target.value)}
                  placeholder="John Smith"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-700 mb-2">
                    Expiry Date <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={expiryDate}
                    onChange={(e) => setExpiryDate(e.target.value)}
                    placeholder="MM/YY"
                    required
                    maxLength={5}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-700 mb-2">
                    CVV <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={cvv}
                    onChange={(e) => setCvv(e.target.value)}
                    placeholder="123"
                    required
                    maxLength={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>
          )}

          {paymentMethod === 'bank' && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="text-sm text-blue-900 mb-2">Bank Transfer Instructions</h4>
              <div className="text-sm text-blue-800 space-y-1">
                <p>Account Name: Library Services</p>
                <p>Account Number: 1234567890</p>
                <p>Bank: National Bank</p>
                <p>Reference: {fine.FineID}</p>
              </div>
            </div>
          )}

          {paymentMethod === 'wallet' && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="text-sm text-blue-900 mb-2">Digital Wallet Payment</h4>
              <p className="text-sm text-blue-800">
                You will be redirected to complete the payment with your preferred digital wallet service.
              </p>
            </div>
          )}
        </div>

        {/* Payment Summary */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-gray-900 mb-4">Payment Summary</h2>
          <div className="space-y-3">
            <div className="flex justify-between text-gray-600">
              <span>Fine Amount</span>
              <span>${fine.Amount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Processing Fee</span>
              <span>$0.00</span>
            </div>
            <div className="border-t border-gray-200 pt-3 flex justify-between">
              <span className="text-gray-900">Total Amount</span>
              <span className="text-2xl text-gray-900">${fine.Amount.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Security Notice */}
        <div className="bg-green-50 border border-green-200 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <Lock className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="text-sm text-green-900 mb-1">Secure Payment</h4>
              <p className="text-sm text-green-800">
                Your payment information is encrypted and secure. We never store your card details.
              </p>
            </div>
          </div>
        </div>

        {/* Terms */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              required
              className="w-5 h-5 mt-0.5 text-blue-600 rounded"
            />
            <span className="text-sm text-gray-700">
              I authorize the library to process this payment and understand that this transaction is final and non-refundable.
            </span>
          </label>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            type="submit"
            disabled={!agreed}
            className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-lg transition-all ${
              agreed
                ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 shadow-lg hover:shadow-xl'
                : 'bg-gray-200 text-gray-500 cursor-not-allowed'
            }`}
          >
            <CheckCircle className="w-5 h-5" />
            Pay ${fine.Amount.toFixed(2)}
          </button>
          <button
            type="button"
            onClick={() => onNavigate('fines')}
            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
