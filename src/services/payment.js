export const payment = {
  async generatePaymentLink(amount, orderId, email = "customer@greencafe.com") {
    const PUBLIC_KEY = import.meta.env.VITE_PAYSTACK_PUBLIC_KEY;
    
    return new Promise((resolve) => {
      if (!PUBLIC_KEY) {
        console.warn("No Paystack Public Key found. Simulating payment success.");
        resolve({ success: true, isMock: true, message: "Paystack simulated." });
        return;
      }

      // Load Paystack inline script if not loaded
      if (!window.PaystackPop) {
        const script = document.createElement('script');
        script.src = 'https://js.paystack.co/v1/inline.js';
        script.onload = () => initPaystack(resolve);
        script.onerror = () => resolve({ success: false, error: "Could not load Paystack script." });
        document.body.appendChild(script);
      } else {
        initPaystack(resolve);
      }

      function initPaystack(resolve) {
        try {
          const handler = window.PaystackPop.setup({
            key: PUBLIC_KEY,
            email: email,
            amount: Math.round(amount * 100), // Ensures it's an integer for Paystack
            currency: 'GHS',
            ref: orderId,
            callback: function(response) {
              resolve({ success: true, reference: response.reference });
            },
            onClose: function() {
              resolve({ success: false, error: "Payment window closed by user" });
            }
          });
          handler.openIframe();
        } catch (error) {
          console.error("Paystack initialization error:", error);
          resolve({ success: false, error: "Failed to initialize payment gateway." });
        }
      }
    });
  }
};
