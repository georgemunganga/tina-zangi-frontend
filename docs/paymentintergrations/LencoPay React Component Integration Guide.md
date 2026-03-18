# LencoPay React Component Integration Guide

This guide provides a practical example of integrating the LencoPay widget into a React.js application for processing single payments for items like books or event tickets. It includes a reusable React component and instructions on how to use it.

## 1. Prerequisites

Before you begin, ensure you have:

*   A React.js project set up.
*   A Lenco merchant account with public and secret API keys. (The public key is used on the frontend, while the secret key is for backend verification).
*   The LencoPay widget script included in your `public/index.html` file (or equivalent for your build setup):

    ```html
    <script src="https://pay.sandbox.lenco.co/js/v1/inline.js"></script>
    ```
    *Note: Use `https://pay.lenco.co/js/v1/inline.js` for production environments.* [1]

## 2. `LencoPayButton` React Component

Below is a React component, `LencoPayButton.jsx`, that encapsulates the logic for initiating a LencoPay transaction.

```jsx
import React from 'react';

const LencoPayButton = ({ amount, email, reference, onSuccess, onClose, onConfirmationPending }) => {
  const handlePayment = () => {
    if (typeof window.LencoPay === 'undefined') {
      alert('LencoPay script not loaded. Please ensure the script is included in your HTML.');
      return;
    }

    window.LencoPay.getPaid({
      key: 'YOUR_PUBLIC_KEY', // Replace with your actual Lenco public key
      reference: reference || `ref-${Date.now()}`, // Unique reference for the transaction
      email: email, // Customer's email address
      amount: amount, // Amount to be paid
      currency: 'ZMW', // Example currency, adjust as needed
      channels: ['card', 'mobile-money'], // Available payment channels
      onSuccess: (response) => {
        console.log('Payment successful:', response);
        if (onSuccess) onSuccess(response);
        // IMPORTANT: Verify payment on your backend using response.reference
        // Example: fetch(`/api/verify-payment?reference=${response.reference}`);
      },
      onClose: () => {
        console.log('Payment window closed.');
        if (onClose) onClose();
      },
      onConfirmationPending: () => {
        console.log('Payment confirmation pending.');
        if (onConfirmationPending) onConfirmationPending();
      },
    });
  };

  return (
    <button onClick={handlePayment} style={{
      padding: '10px 20px',
      fontSize: '16px',
      backgroundColor: '#007bff',
      color: 'white',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
    }}>
      Pay with Lenco
    </button>
  );
};

export default LencoPayButton;
```

## 3. Usage in Your React Application

To use the `LencoPayButton` component, import it into your desired component (e.g., a product detail page or a checkout page) and pass the necessary props.

### Example: Book Detail Page

Consider a `BookDetail` component where a user can purchase a single book.

```jsx
import React from 'react';
import LencoPayButton from './LencoPayButton'; // Adjust path as needed

const BookDetail = ({ book }) => {
  const handleSuccess = (response) => {
    alert(`Payment for ${book.title} successful! Reference: ${response.reference}`);
    // Navigate to order confirmation page or update UI
  };

  const handleClose = () => {
    alert('Payment process cancelled.');
  };

  const handleConfirmationPending = () => {
    alert('Your payment is being processed. You will be notified shortly.');
  };

  return (
    <div>
      <h1>{book.title}</h1>
      <p>{book.description}</p>
      <p>Price: ${book.price}</p>
      <LencoPayButton
        amount={book.price} // Ensure this is a number
        email="customer@example.com" // Replace with actual customer email
        reference={`book-${book.id}-${Date.now()}`} // Unique reference for this purchase
        onSuccess={handleSuccess}
        onClose={handleClose}
        onConfirmationPending={handleConfirmationPending}
      />
    </div>
  );
};

export default BookDetail;
```

### Example: Event Ticket Purchase

Similarly, for an event ticket:

```jsx
import React from 'react';
import LencoPayButton from './LencoPayButton'; // Adjust path as needed

const EventTicket = ({ event }) => {
  const handleSuccess = (response) => {
    alert(`Payment for ${event.name} ticket successful! Reference: ${response.reference}`);
    // Update ticket status, send confirmation email, etc.
  };

  const handleClose = () => {
    alert('Ticket purchase cancelled.');
  };

  return (
    <div>
      <h1>{event.name}</h1>
      <p>{event.date}</p>
      <p>Price: ${event.price}</p>
      <LencoPayButton
        amount={event.price}
        email="attendee@example.com"
        reference={`event-${event.id}-${Date.now()}`}
        onSuccess={handleSuccess}
        onClose={handleClose}
      />
    </div>
  );
};

export default EventTicket;
```

## 4. Backend Verification (Crucial Step)

As highlighted in the main implementation plan, it is **critical** to verify all payments on your backend using Lenco's `/collections/status/:reference` endpoint. Never rely solely on client-side callbacks for confirming payment success, as this can be compromised.

Your backend `verify-payment` endpoint should:

1.  Receive the `reference` from the frontend `onSuccess` callback.
2.  Make a secure server-to-server call to `https://api.lenco.co/access/v2/collections/status/:reference` using your **secret API key**.
3.  Check the `status` field in Lenco's response to confirm if the payment was `successful`.
4.  Update your database (e.g., mark the order as paid, issue the book/ticket).
5.  Respond to the frontend with the verification result.

## 5. References

*   [1] [LencoPay Widget Integration](https://lenco-api.readme.io/v2.0/reference/accept-payments)
