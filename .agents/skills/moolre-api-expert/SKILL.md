---
name: moolre-api-expert
description: Use this skill when you need to integrate or troubleshoot the Moolre API. It contains architectural patterns for Moolre WhatsApp webhooks, payment links, SMS, and authentication using X-API-KEY/VASKEY headers.
---

# Moolre API Integration Guide

This skill provides the necessary context and best practices for integrating the Moolre API (a Ghanaian Payment Service Provider) into applications. Moolre provides tools for Payments, Bulk Disbursements, SMS, and official WhatsApp Business API integration.

## 1. Authentication
Moolre uses custom HTTP headers for authentication. Depending on the endpoint, you will need:
- `X-API-USER`: The merchant's Account ID or Email.
- `X-API-PUBKEY`: Used for embedding payment links on the frontend or generating them on the backend.
- `X-API-VASKEY`: (Private Key) Used for high-security operations like server-to-server SMS, WhatsApp messaging, and initiating fund transfers.

## 2. API Environments
- **Sandbox (Testing):** `https://sandbox.moolre.com`
- **Live (Production):** `https://api.moolre.com`

## 3. Core Architectures & Workflows

### WhatsApp API & Webhooks
Moolre provides an official connection to the Meta WhatsApp Cloud API. 
- **Inbound Messages (Webhooks):** Moolre sends a `POST` request to the merchant's configured webhook URL whenever a customer sends a WhatsApp message.
- **Outbound Messages:** To reply, send a `POST` to `/open/whatsapp/send` containing the recipient's phone number and the message text (requires `X-API-VASKEY`).
- **Constraint:** Once a number is verified on Moolre's API, it can no longer be used on the standard WhatsApp mobile app. Dashboards must implement a "Manual Reply" inbox if the merchant wishes to text customers directly.

### Generating Payment Links
To create a payment link for a customer checkout:
- **Endpoint:** `POST /embed/link`
- **Headers:** `X-API-USER` and `X-API-PUBKEY`
- **Payload:** Requires `amount` (formatted to 2 decimal places), `externalref` (unique transaction ID like a UUID), and `callback` (the webhook URL to notify on success).

### Listening for Payments (Callback/Webhook)
When a customer pays successfully, Moolre fires a webhook `POST` to the URL provided in the `callback` parameter. 
- The payload includes `status: 1` (success) and the `externalref` you originally provided.
- **Best Practice:** Update your database order status to `PAID` upon receiving this webhook and trigger a confirmation WhatsApp message to the customer.

## 4. Best Practices for AI/Moolre Integration
When building AI bots using Moolre:
1. **Function Calling:** Equip the LLM with a `trigger_checkout` tool. When the customer confirms their order, the LLM calls the tool, the backend calls Moolre's `/embed/link`, and the AI replies with the generated URL.
2. **State Management:** While waiting for a payment, the AI should remain conversational but gently redirect the user back to the payment link to complete checkout.
3. **SaaS Monetization:** If you are building a multi-tenant platform on top of Moolre, add your percentage markup to the total *before* passing it to `/embed/link`.
