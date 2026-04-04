export const newsLetter = {
  title: "Subscribe to our newsletter",
  description:
    "Join our newsletter for regular updates from nurui UI. No spam ever.",
  subscribe_button: {
    label: "Subscribe",
    action: "subscribe",
  },
  input_field: {
    placeholder: "subscribe to our newsletter",
    onFocus: {
      action: "setPlaceholder",
      value: "We won't spam you!",
    },
    onBlur: {
      action: "setPlaceholder",
      value: "subscribe to our newsletter",
    },
  },
};
