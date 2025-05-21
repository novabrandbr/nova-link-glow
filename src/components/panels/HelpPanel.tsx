
import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const HelpPanel = () => {
  const faqs = [
    {
      question: "Como adiciono links ao meu mini-site?",
      answer: "Vá até a seção 'Meu Mini-site' e selecione a aba 'Meus Links'. Clique no botão '+ Adicionar novo link', insira o título e a URL desejada."
    },
    {
      question: "Como personalizo a aparência do meu mini-site?",
      answer: "Na seção 'Meu Mini-site', você encontrará as abas 'Profile' e 'Page Styles', onde poderá personalizar fontes, cores, fundos e escolher entre diferentes layouts visuais."
    },
    {
      question: "Posso usar meu próprio domínio?",
      answer: "Sim, usuários do plano pago podem conectar seus próprios domínios. Acesse 'Configurações Avançadas' para configurar."
    },
    {
      question: "Como adiciono música ao meu mini-site?",
      answer: "Na seção 'Meu Mini-site', selecione a aba 'Áudio'. Lá você poderá fazer upload de arquivo MP3, escolher de nossa galeria ou inserir um link externo."
    },
    {
      question: "Qual é o limite de links para contas gratuitas?",
      answer: "Contas gratuitas podem adicionar até 5 links. Para adicionar mais links e obter acesso a recursos premium, faça upgrade para um plano pago."
    },
    {
      question: "Como vejo as estatísticas de acesso do meu mini-site?",
      answer: "Acesse a seção 'Estatísticas' no menu lateral para visualizar informações sobre visitantes, cliques em links e origem dos acessos."
    },
    {
      question: "Posso alterar meu nome de usuário?",
      answer: "Sim, você pode alterar seu nome de usuário na seção 'Conta/Perfil'. Lembre-se que isso também alterará a URL do seu mini-site."
    }
  ];

  return (
    <div className="p-6 max-w-4xl">
      <h1 className="text-2xl font-bold mb-6">FAQ / Central de Ajuda</h1>
      
      <div className="space-y-6">
        <p className="text-gray-600">
          Encontre respostas para perguntas frequentes e aprenda a usar todos os recursos da plataforma NOVABRAND.
        </p>
        
        <Accordion type="single" collapsible className="space-y-2">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`} className="border rounded-lg">
              <AccordionTrigger className="px-4 py-3 hover:no-underline font-medium">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="px-4 pb-3 pt-1 text-gray-600">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
        
        <div className="bg-purple-50 border border-purple-100 rounded-lg p-4">
          <h3 className="font-semibold text-purple-800 mb-2">Precisa de mais ajuda?</h3>
          <p className="text-purple-700 text-sm mb-3">
            Se você não encontrou a resposta que procura, entre em contato com nosso suporte:
          </p>
          <a 
            href="mailto:support@novabrand.com" 
            className="text-purple-700 hover:text-purple-900 underline text-sm"
          >
            support@novabrand.com
          </a>
        </div>
      </div>
    </div>
  );
};

export default HelpPanel;
