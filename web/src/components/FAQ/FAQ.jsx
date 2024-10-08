import React, { useState } from 'react';
import { FAQContainer, Question, Answer } from './FAQStyle';

const FAQs = [
    {
      question: 'O que é React?',
      answer: 'React é uma biblioteca JavaScript para construir interfaces de usuário.',
    },
    {
      question: 'O que são Styled Components?',
      answer: 'Styled Components é uma biblioteca para estilização de componentes em React usando CSS-in-JS.',
    },
    {
      question: 'Como instalar o Styled Components?',
      answer: 'Você pode instalar o Styled Components usando npm ou yarn: npm install styled-components.',
    },
  ];
  
  export function FAQ() {
    const [openIndex, setOpenIndex] = useState(null);
  
    const toggleAnswer = (index) => {
      setOpenIndex(openIndex === index ? null : index);
    };
  
    return (
      <FAQContainer>
        {FAQs.map((faq, index) => (
          <div key={index}>
            <Question onClick={() => toggleAnswer(index)}>
              {faq.question}
            </Question>
            <Answer isOpen={openIndex === index}>
              {faq.answer}
            </Answer>
          </div>
        ))}
      </FAQContainer>
    );
  };