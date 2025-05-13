import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

import { useScoreStore } from '@/stores/useScoreStore';


export const TutorialOverlay = () => {
  const { isActive, currentStep, steps, next, back, exit } = useScoreStore();
  const [position, setPosition] = useState<{ top: number; left: number }>({
    top: 0,
    left: 0,
  });
  const tooltipRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isActive) return;

    const step = steps[currentStep];
    const element = document.querySelector(step.selector);

    if (!element) return;

    const rect = element.getBoundingClientRect();
    const padding = 10;

    const pos = {
      top: rect.top + window.scrollY + rect.height + padding,
      left: rect.left + window.scrollX,
    };

    setPosition(pos);
  }, [isActive, currentStep, steps]);

  if (!isActive) return null;

  return createPortal(
    <>
      {/* Optional overlay */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={exit}
      />

      <div
        ref={tooltipRef}
        className="absolute z-50 bg-white text-black p-4 rounded shadow-lg max-w-sm"
        style={{
          top: position.top,
          left: position.left,
        }}
      >
        <p className="mb-4">{steps[currentStep].content}</p>
        <div className="flex justify-between">
          <button onClick={back} className="px-2 py-1 bg-gray-300 rounded">
            Back
          </button>
          {currentStep === steps.length - 1 ? (
            <button onClick={exit} className="px-2 py-1 bg-purple-600 text-white rounded">
              Finish
            </button>
          ) : (
            <button onClick={next} className="px-2 py-1 bg-purple-600 text-white rounded">
              Next
            </button>
          )}
        </div>
      </div>
    </>,
    document.body
  );
};
