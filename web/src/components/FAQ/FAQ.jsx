import React, { useState } from 'react';
import { FAQContainer, Question, Answer } from './FAQStyle';

const FAQs = [
    {
      question: 'Como fazer agendamento?',
      answer: 'Acesse no menu a esquerda a opção "reservar" e selecione a data na parte superior. Todas os itens disponíveis estarão visíveis na tela. Selecione a sua de preferência e clique em "Reservar", complete o formulário e pronto, sua reserva estará feita!',
    },
    {
      question: 'Como cancelar meu agendamento?',
      answer: 'Acesse no menu a esquerda a opção "minhas reservas", em seguida estará disponível na tela todos os itens que foram reservados pelo seu usuário. Clique em "Cancelar" para excluir seu agendamento.',
    },
    {
      question: 'Como solicitar troca?',
      answer: '.',
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