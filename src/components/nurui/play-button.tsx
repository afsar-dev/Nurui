import React from 'react';
import { FaPlay } from 'react-icons/fa';

const PlayButton = ({ text }: { text: string }) => {
  return (
    <button className="relative group text-white transition-all flex items-center justify-center whitespace-nowrap rounded-lg hover:rotate-[3deg] will-change-transform duration-300 shadow-lg hover:shadow-xl h-14 text-lg pl-[5rem] pr-6 bg-fuchsia-950 shadow-fuchsia-950/30 hover:shadow-fuchsia-950/30">
      <div className="absolute left-0 top-0 mt-1 ml-1 bg-white text-fuchsia-950 p-[0.35rem] bottom-1 group-hover:w-[calc(100%-0.5rem)] transition-all rounded-md duration-300 h-12 w-12 flex items-center justify-center">
        <FaPlay className="h-6 w-6" />
      </div>
      <div>{text}</div>
    </button>
  );
};

export default PlayButton;
