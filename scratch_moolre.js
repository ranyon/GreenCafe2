import fetch from 'node-fetch';

async function testMoolre() {
  const API_USER = 'ranyon';
  const BASE_URL = 'https://sandbox.moolre.com';

  console.log("Creating a sandbox wallet for:", API_USER);
  
  const payload = {
    type: 1,
    accountname: "GreenCafe Sandbox",
    currency: "GHS",
    api: true,
    callback: "http://localhost:5174/api/webhook/moolre"
  };

  try {
    const response = await fetch(`${BASE_URL}/open/account/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-USER': API_USER
      },
      body: JSON.stringify(payload)
    });

    const text = await response.text();
    console.log("Create Account Response:", text);
    
    // If we successfully get a wallet, let's try getting its status
    const data = JSON.parse(text);
    if (data.status == 1 && data.data?.accountnumber) {
        console.log("Successfully grabbed account number:", data.data.accountnumber);
    }
  } catch(err) {
    console.error("Error:", err);
  }
}

testMoolre();
