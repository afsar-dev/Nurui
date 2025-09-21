import AnimateInput from "@/components/nurui/animate-Input";

const NewsLetter = () => {
  return (
    <section className="sm:container">
      <div className="shadow-xl dark:shadow-none bg-gradient-to-r from-[var(--white-color)] dark:from-[var(--glass-color)] via-[var(--white-color)] dark:via-[var(--glass-color)] to-[var(--primary-color)] dark:to-[var(--primary-color-2)] py-6 md:py-10 lg:py-20 px-2.5 md:px-20 sm:rounded-xl flex flex-col items-center xl:items-start justify-center text-left gap-3.5">
        <h6 className="text-2xl md:text-4xl font-bold text-center xl:text-start">
          {newsLetter?.title}
        </h6>
        <p className="max-w-2xl text-center xl:text-start text-balance sm:text-pretty">
          {newsLetter?.description}
        </p>
        <AnimateInput
          className="w-full max-w-2xl mt-2"
          onBlurTitle="subscribe to our newsletter"
          onFocusTitle="We won't spam you!"
          buttonTitle={newsLetter?.subscribe_button.label}
        />
      </div>
    </section>
  );
};

export default NewsLetter;

const newsLetter = {
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
