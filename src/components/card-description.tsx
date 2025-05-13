'use client';

import React from 'react';

type Props = {
  description: string;
  value: number;
};

const keywords = ['Piece Value', 'Square Value', 'Score'];

export const CardDescription = ({ description, value }: Props) => {
  let text = description;

  // Step 1: Tokenize +5 / -5 patterns (before replacing ${value})
  text = text.replace(/\+(\d+)/g, '__TOKEN_PLUS____TOKEN_NUM__$1__');
  text = text.replace(/-(\d+)/g, '__TOKEN_MINUS____TOKEN_NUM__$1__');

  // Step 2: Replace ${value} *after* the sign tokenizing
  text = text.replace('${value}', `__TOKEN_NUM__${value}__`);

  // Step 3: Tokenize keywords
  keywords.forEach((keyword) => {
    const token = `__TOKEN_${keyword.replace(/ /g, '_').toUpperCase()}__`;
    text = text.replaceAll(keyword, token);
  });

  // Step 4: Split into tokens and render
  const parts = text.split(/(__TOKEN_[A-Z0-9_]+__)/);

  return (
    <>
      {parts.map((part, idx) => {
        if (part === '__TOKEN_PLUS__') {
          return (
            <span key={idx} className="value-sign-style">
              +
            </span>
          );
        }

        if (part === '__TOKEN_MINUS__') {
          return (
            <span key={idx} className="value-sign-style">
              -
            </span>
          );
        }

        if (part.startsWith('__TOKEN_NUM__')) {
          const num = part.replace('__TOKEN_NUM__', '').replace(/__$/, '');
          return (
            <span key={idx} className="value-style">
              {num}
            </span>
          );
        }

        if (part.startsWith('__TOKEN_')) {
          const keyword = part
            .replace('__TOKEN_', '')
            .replaceAll('_', ' ')
            .replace(/__$/, '')
            .toLowerCase()
            .replace(/\b\w/g, (l) => l.toUpperCase());

          return (
            <span key={idx} className="keyword-style">
              {keyword}
            </span>
          );
        }

        return <React.Fragment key={idx}>{part}</React.Fragment>;
      })}
    </>
  );
};
