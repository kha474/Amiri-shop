export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const config = useRuntimeConfig()

  // Paystack expects amount in the smallest unit (Cents for KSh). So we multiply by 100.
  const amountInCents = body.amount * 100

  try {
    const response = await $fetch('https://api.paystack.co/transaction/initialize', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${config.paystackSecret}`,
        'Content-Type': 'application/json',
      },
      body: {
        email: body.email,
        amount: amountInCents,
        currency: 'KES',
      },
    })

    return response
  } catch (error: any) {
    throw createError({
      statusCode: 500,
      statusMessage: error.message,
    })
  }
})