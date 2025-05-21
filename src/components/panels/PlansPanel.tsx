
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { CheckCircle, XCircle } from "lucide-react";

const PlansPanel = () => {
  return (
    <div className="p-6">
      <h3 className="text-xl font-semibold mb-6">Planos e assinaturas</h3>
      
      <p className="text-gray-600 mb-6">
        Escolha o plano ideal para suas necessidades e desbloqueie recursos premium.
      </p>
      
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="border-2 border-gray-200">
          <CardHeader>
            <CardTitle>Plano Gratuito</CardTitle>
            <CardDescription>Para iniciantes</CardDescription>
            <div className="mt-4">
              <span className="text-3xl font-bold">R$0</span>
              <span className="text-gray-500">/mês</span>
            </div>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              <li className="flex items-center">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                <span>Até 5 links</span>
              </li>
              <li className="flex items-center">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                <span>Layout padrão</span>
              </li>
              <li className="flex items-center">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                <span>Estatísticas básicas</span>
              </li>
              <li className="flex items-center">
                <XCircle className="h-5 w-5 text-gray-300 mr-2" />
                <span className="text-gray-500">Customização avançada</span>
              </li>
              <li className="flex items-center">
                <XCircle className="h-5 w-5 text-gray-300 mr-2" />
                <span className="text-gray-500">Integrações</span>
              </li>
              <li className="flex items-center">
                <XCircle className="h-5 w-5 text-gray-300 mr-2" />
                <span className="text-gray-500">Suporte prioritário</span>
              </li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">Plano atual</Button>
          </CardFooter>
        </Card>
        
        <Card className="border-2 border-purple-500 shadow-lg relative">
          <div className="absolute top-0 right-0 bg-purple-500 text-white text-xs px-3 py-1 rounded-bl-lg rounded-tr-md">
            RECOMENDADO
          </div>
          <CardHeader>
            <CardTitle>Plano Premium</CardTitle>
            <CardDescription>Para uso profissional</CardDescription>
            <div className="mt-4">
              <span className="text-3xl font-bold">R$29,90</span>
              <span className="text-gray-500">/mês</span>
            </div>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              <li className="flex items-center">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                <span>Links ilimitados</span>
              </li>
              <li className="flex items-center">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                <span>Customização completa</span>
              </li>
              <li className="flex items-center">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                <span>Estatísticas avançadas</span>
              </li>
              <li className="flex items-center">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                <span>Integrações (Instagram, Spotify, etc)</span>
              </li>
              <li className="flex items-center">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                <span>Efeitos e animações exclusivas</span>
              </li>
              <li className="flex items-center">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                <span>Suporte prioritário 24/7</span>
              </li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button className="w-full bg-[#6A0DAD] hover:bg-[#C9A0FF] hover:bg-gradient-to-r from-[#C9A0FF] to-[#6A0DAD]">
              Fazer upgrade
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default PlansPanel;
