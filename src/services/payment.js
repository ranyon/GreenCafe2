export const payment = {
  async generatePaymentLink(amount, orderId) {
    const API_USER = import.meta.env.VITE_MOOLRE_API_USER;
    const PUB_KEY = import.meta.env.VITE_MOOLRE_PUBLIC_KEY;
    const BASE_URL = '/api/moolre';

    const payload = {
      type: 1, // 1 for one-time payment
      amount: amount.toFixed(2),
      email: "customer@greencafe.com", // dummy email for sandbox
      externalref: orderId,
      callback: "http://localhost:5174/api/webhook/moolre",
      reusable: "0",
      currency: "GHS",
      accountnumber: import.meta.env.VITE_MOOLRE_ACCOUNT_NUMBER || "109564"
    };

    try {
      const response = await fetch(`${BASE_URL}/embed/link`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-API-USER': API_USER,
          'X-API-PUBKEY': PUB_KEY
        },
        body: JSON.stringify(payload)
      });

      const text = await response.text();
      let data;
      try {
        data = JSON.parse(text);
      } catch (parseError) {
        // Moolre sandbox sometimes returns PHP warnings before the JSON
        console.warn("Failed to parse Moolre response, falling back to mock link", text);
        return { success: true, isMock: true, message: "Could not connect to Moolre Sandbox. Order simulated locally." };
      }
      
      if (data.status == 1 || data.status === "1") {
        const link = data.data?.authorization_url || data.data?.link;
        if (link) {
          return { success: true, link: link };
        }
      }
      
      console.warn("Moolre link generation failed, falling back to mock link:", data);
      return { success: true, isMock: true, message: `Moolre Sandbox Error: ${data.msg || data.message || 'Invalid wallet/account configuration'}` };
    } catch (error) {
      console.warn("Network error during Moolre generation, falling back to mock link:", error);
      return { success: true, isMock: true, message: "Network error during Moolre integration. Order simulated locally." };
    }
  }
};
