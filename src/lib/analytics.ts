type EventName = "backlink_purchase" | "backlink_check" | "credit_purchase";

export const trackEvent = (
  event: EventName,
  properties?: Record<string, any>,
) => {
  // Analytics implementation
  console.log(`[Analytics] ${event}`, properties);
};

export const trackError = (error: Error, context?: Record<string, any>) => {
  // Error tracking implementation
  console.error(`[Error] ${error.message}`, context);
};
