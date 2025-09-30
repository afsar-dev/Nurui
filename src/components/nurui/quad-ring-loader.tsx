"use client";
import React from 'react';
import styled from 'styled-components';

const QuadRingLoader = () => {
  return (
    <StyledWrapper>
      <svg className="pl" width={240} height={240} viewBox="0 0 240 240">
        <circle className="pl__ring pl__ring--a" cx={120} cy={120} r={105} fill="none" strokeWidth={20} strokeDasharray="0 660" strokeDashoffset={-330} strokeLinecap="round" />
        <circle className="pl__ring pl__ring--b" cx={120} cy={120} r={35} fill="none" strokeWidth={20} strokeDasharray="0 220" strokeDashoffset={-110} strokeLinecap="round" />
        <circle className="pl__ring pl__ring--c" cx={85} cy={120} r={70} fill="none" strokeWidth={20} strokeDasharray="0 440" strokeLinecap="round" />
        <circle className="pl__ring pl__ring--d" cx={155} cy={120} r={70} fill="none" strokeWidth={20} strokeDasharray="0 440" strokeLinecap="round" />
      </svg>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .pl {
    width: 6em;
    height: 6em;
  }

  .pl__ring {
    animation: ringA 2s linear infinite;
  }

  /* Neon Pop Colors */
  .pl__ring--a {
    stroke: #ff0080; /* Neon Pink */
  }

  .pl__ring--b {
    animation-name: ringB;
    stroke: #7928ca; /* Neon Purple */
  }

  .pl__ring--c {
    animation-name: ringC;
    stroke: #00f5ff; /* Neon Cyan */
  }

  .pl__ring--d {
    animation-name: ringD;
    stroke: #00ff85; /* Neon Green */
  }

  /* Animations */
  @keyframes ringA {
    from, 4% {
      stroke-dasharray: 0 660;
      stroke-width: 20;
      stroke-dashoffset: -330;
    }

    12% {
      stroke-dasharray: 60 600;
      stroke-width: 30;
      stroke-dashoffset: -335;
    }

    32% {
      stroke-dasharray: 60 600;
      stroke-width: 30;
      stroke-dashoffset: -595;
    }

    40%, 54% {
      stroke-dasharray: 0 660;
      stroke-width: 20;
      stroke-dashoffset: -660;
    }

    62% {
      stroke-dasharray: 60 600;
      stroke-width: 30;
      stroke-dashoffset: -665;
    }

    82% {
      stroke-dasharray: 60 600;
      stroke-width: 30;
      stroke-dashoffset: -925;
    }

    90%, to {
      stroke-dasharray: 0 660;
      stroke-width: 20;
      stroke-dashoffset: -990;
    }
  }

  @keyframes ringB {
    from, 12% {
      stroke-dasharray: 0 220;
      stroke-width: 20;
      stroke-dashoffset: -110;
    }

    20% {
      stroke-dasharray: 20 200;
      stroke-width: 30;
      stroke-dashoffset: -115;
    }

    40% {
      stroke-dasharray: 20 200;
      stroke-width: 30;
      stroke-dashoffset: -195;
    }

    48%, 62% {
      stroke-dasharray: 0 220;
      stroke-width: 20;
      stroke-dashoffset: -220;
    }

    70% {
      stroke-dasharray: 20 200;
      stroke-width: 30;
      stroke-dashoffset: -225;
    }

    90% {
      stroke-dasharray: 20 200;
      stroke-width: 30;
      stroke-dashoffset: -305;
    }

    98%, to {
      stroke-dasharray: 0 220;
      stroke-width: 20;
      stroke-dashoffset: -330;
    }
  }

  @keyframes ringC {
    from {
      stroke-dasharray: 0 440;
      stroke-width: 20;
      stroke-dashoffset: 0;
    }

    8% {
      stroke-dasharray: 40 400;
      stroke-width: 30;
      stroke-dashoffset: -5;
    }

    28% {
      stroke-dasharray: 40 400;
      stroke-width: 30;
      stroke-dashoffset: -175;
    }

    36%, 58% {
      stroke-dasharray: 0 440;
      stroke-width: 20;
      stroke-dashoffset: -220;
    }

    66% {
      stroke-dasharray: 40 400;
      stroke-width: 30;
      stroke-dashoffset: -225;
    }

    86% {
      stroke-dasharray: 40 400;
      stroke-width: 30;
      stroke-dashoffset: -395;
    }

    94%, to {
      stroke-dasharray: 0 440;
      stroke-width: 20;
      stroke-dashoffset: -440;
    }
  }

  @keyframes ringD {
    from, 8% {
      stroke-dasharray: 0 440;
      stroke-width: 20;
      stroke-dashoffset: 0;
    }

    16% {
      stroke-dasharray: 40 400;
      stroke-width: 30;
      stroke-dashoffset: -5;
    }

    36% {
      stroke-dasharray: 40 400;
      stroke-width: 30;
      stroke-dashoffset: -175;
    }

    44%, 50% {
      stroke-dasharray: 0 440;
      stroke-width: 20;
      stroke-dashoffset: -220;
    }

    58% {
      stroke-dasharray: 40 400;
      stroke-width: 30;
      stroke-dashoffset: -225;
    }

    78% {
      stroke-dasharray: 40 400;
      stroke-width: 30;
      stroke-dashoffset: -395;
    }

    86%, to {
      stroke-dasharray: 0 440;
      stroke-width: 20;
      stroke-dashoffset: -440;
    }
  }
`;

export default QuadRingLoader;
