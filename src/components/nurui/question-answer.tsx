import { FC } from "react";
import { SlArrowDown, SlArrowUp } from "react-icons/sl";

interface PropsType {
  question: string;
  answer: string;
  questionNumber: number;
  setOpenKey: () => void;
  openKey: number;
}

const QuestionAnswer: FC<PropsType> = ({
  question,
  answer,
  questionNumber,
  openKey,
  setOpenKey,
}) => {
  return (
    <div className="bg-[var(--primary-color-2)] dark:bg-[var(--primary-color-4)] rounded-xl ">
      <div
        className="flex items-center justify-between gap-1 pl-2 lg:pl-6 pr-4 py-6 border border-[var(--primary-color)] rounded-xl cursor-pointer"
        onClick={() => setOpenKey()}
      >
        <h6 className="lg:text-lg font-semibold">
          <span>{questionNumber}</span>. <span>{question}</span>
        </h6>
        <button>
          {openKey === questionNumber ? (
            <SlArrowDown className="cursor-pointer text-[var(--primary-color)]" />
          ) : (
            <SlArrowUp className="cursor-pointer text-[var(--primary-color)]" />
          )}
        </button>
      </div>
      {openKey === questionNumber && (
        <p className="p-2 lg:p-5 text-[17px] leading-relaxed text-[var(--opacity-text-color)] text-balance lg:text-pretty">
          {answer}
        </p>
      )}
    </div>
  );
};

export default QuestionAnswer;
