<template>
  <div style="padding: 20px; font-family: sans-serif;">
    <h1>AmiriShop Checkout</h1>
    
    <!-- Simple Cart Display -->
    <div style="border: 1px solid #ccc; padding: 20px; border-radius: 8px; max-width: 400px;">
      <h2>Shopping Cart</h2>
      <p>Claw Hammer (KSh 850) x 1</p>
      <p>Paint Brush Set (KSh 350) x 1</p>
      <hr />
      <h3>Total: KSh 1,200</h3>

      <!-- Customer Details -->
      <input v-model="email" type="email" placeholder="Email (required for Paystack)" style="display: block; width: 100%; padding: 8px; margin-bottom: 10px;" />
      
      <button @click="payWithPaystack" style="background-color: #f59e0b; color: white; padding: 12px; border: none; border-radius: 4px; width: 100%; cursor: pointer; font-weight: bold;">
        Pay with Paystack
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

declare const PaystackPop: any; // Tells TypeScript to ignore the global script

const email = ref('')

const payWithPaystack = async () => {
  if (!email.value) {
    alert('Please enter an email address for the receipt.')
    return
  }

  try {
    // 1. Initialize payment with backend
    const response = await $fetch('/api/initialize-payment', {
      method: 'POST',
      body: {
        email: email.value,
        amount: 1200 // Your total amount
      }
    })

    // 2. Open the Paystack Popup
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
    console.error('Payment initialization failed:', error)
    alert('Failed to start payment. Check your console.')
  }
}
</script>