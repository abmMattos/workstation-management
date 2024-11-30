import React, { useState, useEffect  } from 'react';
import { FAQContainer, Question, Answer } from './FAQStyle';

const FAQsUser = [
    {
      question: 'Como fazer agendamento?',
      answer: 'Acesse no menu a esquerda a opção "reservar" e selecione a data na parte superior. Todas os itens disponíveis estarão visíveis na tela. Selecione a sua de preferência e clique em "Reservar", complete o formulário e pronto, sua reserva estará feita!',
    },
    {
      question: 'Como cancelar meu agendamento?',
      answer: 'Acesse no menu a esquerda a opção "minhas reservas", em seguida estará disponível na tela todas as suas reservas ativas. Clique em "Cancelar" para excluir seu agendamento.',
    },
    {
      question: 'Como solicitar troca?',
      answer: 'Para solicitar a troca, basta acessar no menu a esquerda a opção "reservar" e clicar no botão "Solicitar Troca" na estação desejada, posteriormente verifique seu e-mail (olhe a caixa de spam), para mais instruções de contato com o colaborador que fez o agendamento original.',
    },
  ];

  const FAQsAdmin = [
    {
      question: 'Como cadastrar usuário?',
      answer: 'Na aba de menu no lado esquerdo, selecione a opção "USUÁRIOS", em seguida clique no botão "Cadastrar Usuário", preencha todos os campos do formulário que aparecerá na tela e clique em "CADASTRAR".',
    },
    {
      question: 'Como cadastrar uma nova estação ou sala?',
      answer: 'Na aba de menu no lado esquerdo, selecione a opção "SALAS / ESTAÇÃO", em seguida clique no botão "Cadastrar", preencha todos os campos do formulário que aparecerá na tela e clique em "CADASTRAR".',
    },
    {
      question: 'Como cadastrar um equipamento?',
      answer: 'Na aba de menu no lado esquerdo, selecione a opção "EQUIPAMENTOS", em seguida clique no botão "Cadastrar", preencha todos os campos do formulário que aparecerá na tela e clique em "CADASTRAR".',
    },
    {
      question: 'Cadastro fácil de equipamento?',
      answer: 'Durante o cadastro de novas salas ou estações, há um campo no formulário para informar os equipamentos que aquele item terá. Para adicionar novos items de forma mais prática, basta escrever o nome do novo equipamento e clicar em "Criar novo equipamento" e pronto, um novo equipamento será criado.',
    },
    {
      question: 'Não encontrou sua dúvida?',
      answer: 'Se você não encontrou a resposta para sua pergunta na seção de FAQ, não se preocupe! Para um suporte ainda mais detalhado, acesse este link: <br> <a href="https://docs.google.com/document/d/1MXwom-qAltCtx27LebNycLYkPhmovS8c9ao9YTmzcIM/edit?usp=sharing">https://docs.google.com/document/d/1MXwom-qAltCtx27LebNycLYkPhmovS8c9ao9YTmzcIM/edit?usp=sharing</a> <br> No qual, você encontrará informações completas sobre cada funcionalidade do sistema. Estamos aqui para garantir que você tenha todas as informações necessárias para aproveitar ao máximo nossos serviços.',
    },
  ];
  
  export function FAQ({ userType }) {
    const [openIndex, setOpenIndex] = useState(null);

    useEffect(() => {
      setOpenIndex(null);
    }, [userType]);
  
    const toggleAnswer = (index) => {
      setOpenIndex(openIndex === index ? null : index);
    };
  
    const faqs = userType === "USER" ? FAQsUser : FAQsAdmin;

    return (
      <FAQContainer>
        {faqs.map((faq, index) => (
          <div key={index}>
            <Question onClick={() => toggleAnswer(index)}>
              {faq.question}
            </Question>
            <Answer isOpen={openIndex === index} dangerouslySetInnerHTML={{__html: faq.answer}}>
            </Answer>
          </div>
        ))}
      </FAQContainer>
    );
  };