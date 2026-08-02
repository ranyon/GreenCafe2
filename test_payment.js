import fetch from 'node-fetch';

async function testPaymentLink() {
  const API_USER = 'ranyon';
  const PUB_KEY = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyaWQiOjEwOTU2NCwiZXhwIjoxOTU2NTQ1OTk5fQ.PVmmM8ngXYCKhaFeU07O5S4899J-fpVmLvBA43TcaOU';
  const ACCOUNT = '10956406073729';

  console.log("Testing Moolre Sandbox Payment Link Generation...");
  console.log("User:", API_USER);
  console.log("Account Number:", ACCOUNT);
  
  const payload = {
    type: 1,
    amount: "70.00",
    email: "customer@greencafe.com",
    externalref: "TEST_ORDER_" + Date.now(),
    callback: "http://localhost:5174/api/webhook/moolre",
    reusable: "0",
    currency: "GHS",
    accountnumber: ACCOUNT
  };

  try {
    const response = await fetch(`https://sandbox.moolre.com/embed/link`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-USER': API_USER,
        'X-API-PUBKEY': PUB_KEY
      },
      body: JSON.stringify(payload)
    });

    const text = await response.text();
    console.log("\nRaw Response:");
    console.log(text);
    
    try {
        const data = JSON.parse(text);
        console.log("\nParsed Response:");
        console.dir(data, {depth: null});
    } catch(e) {
        console.log("Failed to parse JSON");
    }
  } catch(err) {
    console.error("Network Error:", err);
  }
}

testPaymentLink();
