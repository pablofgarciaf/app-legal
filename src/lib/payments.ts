export type EcuadorPaymentProvider = "paypal" | "deuna" | "kushki";

export type PaymentAvailability = {
  provider: EcuadorPaymentProvider;
  configured: boolean;
  mode: "sandbox" | "disabled";
  message: string;
};

/**
 * Provider registry. Credentials are intentionally server-only and are not
 * read from client components. Until the user supplies keys and webhook URLs,
 * checkout remains disabled instead of pretending to process a payment.
 */
export const ecuadorPaymentProviders: PaymentAvailability[] = [
  {
    provider: "paypal",
    configured: Boolean(process.env.PAYPAL_CLIENT_ID && process.env.PAYPAL_CLIENT_SECRET),
    mode: process.env.PAYPAL_CLIENT_ID && process.env.PAYPAL_CLIENT_SECRET ? "sandbox" : "disabled",
    message: "PayPal se habilita al configurar credenciales y webhook verificado.",
  },
  {
    provider: "deuna",
    configured: Boolean(process.env.DEUNA_API_KEY && process.env.DEUNA_MERCHANT_ID),
    mode: process.env.DEUNA_API_KEY && process.env.DEUNA_MERCHANT_ID ? "sandbox" : "disabled",
    message: "Deuna se habilita al configurar credenciales y callback verificado.",
  },
  {
    provider: "kushki",
    configured: Boolean(process.env.KUSHKI_PRIVATE_KEY && process.env.KUSHKI_MERCHANT_ID),
    mode: process.env.KUSHKI_PRIVATE_KEY && process.env.KUSHKI_MERCHANT_ID ? "sandbox" : "disabled",
    message: "Kushki se habilita al configurar credenciales y webhook verificado.",
  },
];

export function getAvailableEcuadorPaymentProviders() {
  return ecuadorPaymentProviders.filter((provider) => provider.configured);
}
