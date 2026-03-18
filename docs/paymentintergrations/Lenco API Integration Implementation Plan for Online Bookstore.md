# Lenco API Integration Implementation Plan for Online Bookstore

## 1. Introduction

This document outlines the implementation plan for integrating the Lenco API into an online bookstore application built with React.js. The goal is to enable customers to purchase books and tickets using various payment methods, including card, mobile money, and potentially ATM transfers, leveraging Lenco's payment gateway services.

## 2. Lenco API Integration Overview

The Lenco API provides functionalities for managing accounts, transactions, and collections. For this online bookstore, the primary focus will be on the collection endpoints to process customer payments.

Key Lenco API endpoints relevant to this project include:

*   `/collections/mobile-money` (v2.0): Used to initiate payment requests from customers via their mobile money accounts.
*   `/collections/card` (v2.0): Used to process payments made with debit/credit cards.
*   `/transactions` (v1.0): Primarily for bank transfers, which might be adapted for ATM-initiated payments.
*   `/collections/status/:reference` (v2.0): For verifying the status of a collection using a unique reference.
*   LencoPay Popup Widget: A frontend JavaScript widget for a streamlined payment experience, supporting card and mobile money channels.

## 3. Frontend (React.js) Implementation

The React.js frontend will be responsible for displaying products, managing the shopping cart, and initiating the payment process through the LencoPay widget.

### 3.1. User Interface

*   **Product Listing:** Display available books and tickets with details (title, price, description).
*   **Shopping Cart:** Allow users to add/remove items and view their total.
*   **Checkout Page:** A dedicated page where users can review their order and select a payment method.

### 3.2. LencoPay Widget Integration

*   The LencoPay JavaScript widget will be embedded on the checkout page to handle card and mobile money payments. This widget simplifies the payment flow by providing a secure and pre-built interface.
*   The widget will be initialized with parameters such as `key` (Lenco public key), `email`, `amount`, `reference`, `currency`, and `channels` (e.g., `["card", "mobile-money"]`).
*   **Callback Functions:** Implement `onSuccess`, `onClose`, and `onConfirmationPending` callback functions to handle different payment outcomes. The `onSuccess` callback will trigger a backend call to verify the payment.

### 3.3. Handling Payment Callbacks and Redirects

*   Upon successful payment via the LencoPay widget, the `onSuccess` callback will send the payment `reference` to the backend for verification. This ensures that the payment status is confirmed server-side and prevents client-side tampering.
*   For 3D Secure card payments, Lenco may redirect the user to an authorization page. After authorization, the user will be redirected back to a specified `redirectUrl` in the application, which should also trigger a backend verification.

## 4. Backend Implementation

The backend (e.g., Node.js, Python, etc.) will serve as a secure intermediary between the React.js frontend and the Lenco API. It will handle sensitive operations such as API key management, payment initiation, and webhook processing.

### 4.1. API Endpoints

*   **`/api/create-payment-intent`:** An endpoint to receive payment details from the frontend (e.g., amount, currency, customer info) and initiate a payment request with Lenco. This endpoint will return necessary information (e.g., Lenco public key, reference) to the frontend for widget initialization.
*   **`/api/verify-payment`:** An endpoint to receive the payment `reference` from the frontend (after `onSuccess` callback or redirect) and call the Lenco `/collections/status/:reference` endpoint to confirm the payment status. This endpoint will update the order status in the database.

### 4.2. Secure Lenco API Calls

*   All direct calls to the Lenco API (e.g., using the secret key) MUST be made from the backend to prevent exposure of sensitive credentials.
*   **Card Payment Encryption:** For `/collections/card` endpoint, the request payload containing card and customer details MUST be encrypted using Lenco's encryption guide before being sent to the API. The backend will handle this encryption.

### 4.3. Webhook Handling

*   **`/api/lenco-webhook`:** A dedicated webhook endpoint to receive real-time payment status updates from Lenco (e.g., `collection.successful`). This endpoint will be crucial for updating order statuses asynchronously and reliably.
*   Implement signature verification for incoming webhooks to ensure their authenticity and prevent spoofing.

## 5. Payment Method Specifics

### 5.1. Card Payments

*   **PCI DSS Compliance:** Integrating card payments directly requires adherence to PCI DSS standards. Using Lenco's hosted widget can help offload some of this burden, but the application still needs to ensure secure handling of any cardholder data it touches.
*   **Encryption:** The `/collections/card` endpoint requires the `encryptedPayload` parameter. The backend will be responsible for encrypting the card and customer details as per Lenco's encryption guide.
*   **3D Secure:** Implement logic to handle 3D Secure authentication flows, which may involve redirecting the user to their bank's authentication page and then back to the application.

### 5.2. Mobile Money Payments

*   The `/collections/mobile-money` endpoint will be used. The frontend will collect the customer's phone number, amount, and operator. The backend will then initiate the collection.
*   The customer will receive a prompt on their mobile device to authorize the payment. The application should provide clear instructions to the user during this process.
*   Rely on webhooks (`collection.successful`) or periodic polling of `/collections/status/:reference` to confirm the final payment status.

### 5.3. ATM Payments

*   The Lenco API documentation does not explicitly detail a direct API for initiating ATM payments as a 
collection method. However, traditional ATM payments often involve bank transfers. The `/transactions` endpoint (v1.0) could potentially be used for this by generating a unique account number for each transaction and instructing the user to transfer funds to it. This would require manual reconciliation or a more sophisticated webhook setup to detect incoming transfers.
*   **Alternative:** If direct ATM collection is not feasible or too complex, consider guiding users to use card or mobile money options, or explore if Lenco offers a hosted solution that supports ATM payments indirectly.

## 6. Security Considerations

*   **API Keys:** Lenco public keys can be used on the frontend for widget initialization, but secret keys MUST ONLY be used on the backend.
*   **Data Encryption:** Sensitive customer and card data sent to Lenco API must be encrypted as per their guidelines.
*   **Webhook Security:** Implement webhook signature verification to ensure that incoming webhook notifications are legitimate and from Lenco.
*   **Input Validation:** All user inputs on the frontend and backend should be thoroughly validated to prevent common web vulnerabilities (e.g., XSS, SQL injection).

## 7. Development Workflow

1.  **Setup Lenco Account:** Obtain API keys (public and secret) from the Lenco dashboard.
2.  **Backend Development:** Implement API endpoints for payment initiation and verification, and webhook handling.
3.  **Frontend Development:** Integrate the LencoPay widget, implement callback functions, and handle redirects.
4.  **Testing:** Thoroughly test all payment flows in the sandbox environment using provided test cards and accounts.
5.  **Deployment:** Deploy the application to a secure hosting environment.

## 8. Future Enhancements

*   **Refunds:** Explore Lenco API for refund functionalities to handle returns.
*   **Recurring Payments:** If subscriptions or recurring purchases are needed, investigate Lenco's support for recurring payments.
*   **Reporting and Analytics:** Integrate Lenco's reporting features or build custom dashboards to monitor transactions.

## 9. References

*   [Lenco API Documentation](https://lenco-api.readme.io/)
*   [LencoPay Widget Integration](https://lenco-api.readme.io/v2.0/reference/accept-payments)
*   [Mobile Money Collections](https://lenco-api.readme.io/v2.0/reference/initiate-collection-from-mobile-money)
*   [Card Collections](https://lenco-api.readme.io/v2.0/reference/initiate-collection-from-card)


## 10. React.js Payment Component Example

For a practical example of integrating the LencoPay widget into a React.js application for single-item payments (books or event tickets), please refer to the [LencoPay React Component Integration Guide](/home/ubuntu/lenco_react_payment_guide.md).
