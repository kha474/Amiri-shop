<template>
  <div style="padding: 20px;">
    <h1>My POS System Checkout</h1>
    <p>Click the button below to test the Paystack integration.</p>
    
    <!-- This is the button the customer clicks -->
    <button @click="payWithPaystack" style="padding: 12px 20px; background: #09A5DB; color: white; border: none; border-radius: 5px; font-size: 16px; cursor: pointer;">
      Pay KSh 1,250 with Paystack
    </button>
  </div>
</template>

<script setup>
const config = useRuntimeConfig()

const payWithPaystack = async () => {
  try {
    // 1. Ask your secure backend to initialize the payment
    const response = await $fetch('/api/initialize-payment', {
      method: 'POST',
      body: {
        email: 'customer@example.com', // You should replace this with a real input later
        amount: 1250 // The amount in KSh
      }
    })

    // 2. Open the Paystack Popup using the secure access code
    // @ts-ignore (This ignores the TypeScript error since Paystack is loaded globally)
    const paystack = new PaystackPop()
    
    paystack.resumeTransaction(response.data.access_code, {
      onSuccess: (transaction) => {
        alert('Payment successful! Reference: ' + transaction.reference)
      },
      onCancel: () => {
        console.log('Customer closed the payment window')
      }
    })

  } catch (error) {
    console.error('Error initializing payment:', error)
    alert('Failed to start payment. Please try again.')
  }
}
</script>