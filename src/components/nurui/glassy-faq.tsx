"use client";
import QuestionAnswer from "@/components/nurui/question-answer";
import { useState } from "react";

const GlassyFaq = () => {
  const [openKey, setOpenKey] = useState<number>(1);
  const [activeCategoryKey, setActiveCategoryKey] = useState<number>(1);

  const roundedButton = (id: number, category: string) => (
    <button
      key={id}
      className={`${
        activeCategoryKey === id
          ? "bg-[var(--glass-color-3)] text-[var(--white-color)] border border-[var(--glass-color-3)]"
          : "border border-[var(--border-color)]"
      } font-semibold cursor-pointer rounded-full px-3.5 py-2.5 capitalize text-xl`}
      onClick={() => setActiveCategoryKey(id)}
    >
      {category}
    </button>
  );

  return (
    <section className="container flex flex-col xl:flex-row gap-10 xl:gap-20">
      {/* title and action's button */}
      <div className="xl:w-1/3 space-y-5 text-center xl:text-start">
        <h3 className="text-4xl xl:text-5xl font-bold">FAQs</h3>
        <p className="text-xl">
          Everything you need to know about features, membership, and
          troubleshooting.
        </p>
        <div className="flex flex-wrap justify-center xl:justify-start gap-x-4 gap-y-5 pt-1">
          {faqsData.map((data) => roundedButton(data?.id, data?.category))}
        </div>
      </div>
      {/* question and answer */}
      <div className="xl:w-2/3 space-y-5">
        {faqsData?.[activeCategoryKey - 1]?.questions?.map((faqData, i) => (
          <QuestionAnswer
            key={i}
            questionNumber={faqData?.number}
            question={faqData?.question}
            answer={faqData?.answer}
            openKey={openKey}
            setOpenKey={() =>
              setOpenKey(faqData?.number === openKey ? 0 : faqData?.number)
            }
          />
        ))}
      </div>
    </section>
  );
};

export default GlassyFaq;

const faqsData = [
  {
    category: "Getting Started",
    id: 1,
    questions: [
      {
        number: 1,
        question: "What is NurUI?",
        answer:
          "NurUI is a modern, developer-focused UI component library for React and Next.js. It provides reusable, customizable components designed to speed up your development workflow.",
      },
      {
        number: 2,
        question: "How do I install NurUI?",
        answer:
          "You can install components directly using our CLI with `npx nurui add <component-name>`. This will generate the component in your project folder.",
      },
      {
        number: 3,
        question: "Do I need to configure anything after installation?",
        answer:
          "Minimal setup may be required, such as Tailwind configuration or importing global styles. Check the documentation for exact steps.",
      },
      {
        number: 4,
        question: "Is NurUI free to use?",
        answer:
          "Yes, all core components of NurUI are completely free and open-source. A Pro version with additional templates and tools is planned.",
      },
      {
        number: 5,
        question: "Which frameworks are supported?",
        answer:
          "NurUI is optimized for React and Next.js. Support for additional frameworks is under consideration.",
      },
    ],
  },
  {
    category: "Integration",
    id: 2,
    questions: [
      {
        number: 1,
        question: "Can I use NurUI with Tailwind CSS?",
        answer:
          "Yes. NurUI is built to work perfectly with Tailwind CSS. All components use utility-first classes for easy customization.",
      },
      {
        number: 2,
        question: "Is NurUI compatible with design tools like Figma?",
        answer:
          "Figma kits are in development to help bridge the gap between design and code. Stay tuned for updates.",
      },
      {
        number: 3,
        question: "Does NurUI support TypeScript?",
        answer:
          "Yes. NurUI components are fully typed and provide excellent support for TypeScript with type safety and autocomplete.",
      },
      {
        number: 4,
        question: "How customizable are the components?",
        answer:
          "NurUI components are fully customizable. You can use props, Tailwind utility classes, or directly modify the generated component code.",
      },
      {
        number: 5,
        question: "Can I use NurUI with server-side rendering?",
        answer:
          "Absolutely. NurUI is SSR-friendly and integrates smoothly with frameworks like Next.js.",
      },
    ],
  },
  {
    category: "Components",
    id: 3,
    questions: [
      {
        number: 1,
        question: "What components are available in NurUI?",
        answer:
          "NurUI includes a wide range of components such as buttons, modals, cards, inputs, tabs, accordions, and animation elements — with more added regularly.",
      },
      {
        number: 2,
        question: "Are components mobile-friendly?",
        answer:
          "Yes, every component in NurUI is responsive by default and follows a mobile-first approach.",
      },
      {
        number: 3,
        question: "Can I animate components?",
        answer:
          "Yes. Many components include animations out of the box, and NurUI supports integration with libraries like Framer Motion for advanced animation needs.",
      },
      {
        number: 4,
        question: "Can I create or extend custom components?",
        answer:
          "Definitely. NurUI encourages you to extend and create your own components using our base structure and design tokens.",
      },
      {
        number: 5,
        question: "Is accessibility supported?",
        answer:
          "Yes. NurUI follows accessibility best practices, including ARIA roles and keyboard navigation where appropriate.",
      },
    ],
  },
  {
    category: "Documentation",
    id: 4,
    questions: [
      {
        number: 1,
        question: "Where can I find NurUI documentation?",
        answer:
          "The full documentation, including setup guides and examples, is available on the NurUI website.",
      },
      {
        number: 2,
        question: "Is there support available?",
        answer:
          "Yes. You can get community support on GitHub and Discord. Premium support will be available with NurUI Pro.",
      },
      {
        number: 3,
        question: "Do you maintain a changelog?",
        answer:
          "Yes. Every update is tracked in a public changelog available on GitHub.",
      },
      {
        number: 4,
        question: "Can I contribute to NurUI?",
        answer:
          "Yes, contributions are welcome! Fork the repo, make your changes, and open a pull request.",
      },
      {
        number: 5,
        question: "Are there starter templates or previews?",
        answer:
          "Yes. NurUI includes starter templates and v0 live previews to help you quickly build and test UI ideas.",
      },
    ],
  },
  {
    category: "CLI & Licensing",
    id: 5,
    questions: [
      {
        number: 1,
        question: "Does NurUI have a CLI?",
        answer:
          "Yes! NurUI comes with a powerful CLI. You can scaffold components into your project with commands like `npx nurui add button`.",
      },
      {
        number: 2,
        question: "Does the CLI support TS to JS conversion?",
        answer:
          "Yes. The CLI detects your project type and generates components in either TypeScript or JavaScript based on your setup.",
      },
      {
        number: 3,
        question: "Is NurUI open-source?",
        answer:
          "Yes. NurUI is open-source and MIT-licensed, which means you can use it freely in personal and commercial projects.",
      },
      {
        number: 4,
        question: "Will there be a Pro version?",
        answer:
          "Yes. A Pro version with premium templates, animations, and design resources is planned for the near future.",
      },
      {
        number: 5,
        question: "Can I use NurUI in client and commercial projects?",
        answer:
          "Yes, you can use both the free and Pro versions of NurUI in client, SaaS, and commercial applications.",
      },
    ],
  },
];
