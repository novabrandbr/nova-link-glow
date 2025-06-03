
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { BarChart3, Users, Zap, Star, Shield, Globe } from 'lucide-react';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-white">
      {/* Header */}
      <header className="container mx-auto px-6 py-4">
        <nav className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-[#6A0DAD] rounded-lg"></div>
            <span className="text-2xl font-bold text-[#6A0DAD]">Nova Brand</span>
          </div>
          <div className="flex items-center space-x-4">
            <Link to="/login">
              <Button variant="ghost" className="text-gray-600 hover:text-[#6A0DAD]">
                Entrar
              </Button>
            </Link>
            <Link to="/login">
              <Button className="bg-[#6A0DAD] hover:bg-[#5A0A9D] text-white">
                Começar Grátis
              </Button>
            </Link>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-20 text-center">
        <h1 className="text-5xl font-bold text-gray-900 mb-6">
          Crie seu link na bio
          <span className="text-[#6A0DAD]"> em segundos</span>
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Transforme sua bio em uma poderosa ferramenta de conversão. 
          Conecte todas suas redes sociais e links importantes em um só lugar.
        </p>
        <Link to="/login">
          <Button size="lg" className="bg-[#6A0DAD] hover:bg-[#5A0A9D] text-white px-8 py-4 text-lg">
            Criar Minha Página Grátis
          </Button>
        </Link>
      </section>

      {/* Features */}
      <section className="container mx-auto px-6 py-20">
        <h2 className="text-3xl font-bold text-center mb-12">Por que escolher Nova Brand?</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center p-6">
            <div className="w-16 h-16 bg-[#6A0DAD] rounded-full flex items-center justify-center mx-auto mb-4">
              <Zap className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Setup Rápido</h3>
            <p className="text-gray-600">Configure sua página em menos de 5 minutos</p>
          </div>
          <div className="text-center p-6">
            <div className="w-16 h-16 bg-[#6A0DAD] rounded-full flex items-center justify-center mx-auto mb-4">
              <BarChart3 className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Analytics Detalhados</h3>
            <p className="text-gray-600">Acompanhe cliques, visitantes e conversões</p>
          </div>
          <div className="text-center p-6">
            <div className="w-16 h-16 bg-[#6A0DAD] rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Multi-idiomas</h3>
            <p className="text-gray-600">Interface disponível em vários idiomas</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-[#6A0DAD] text-white py-20">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">Pronto para começar?</h2>
          <p className="text-xl mb-8 opacity-90">
            Junte-se a milhares de criadores que já usam Nova Brand
          </p>
          <Link to="/login">
            <Button size="lg" variant="secondary" className="px-8 py-4 text-lg">
              Criar Conta Grátis
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-50 py-12">
        <div className="container mx-auto px-6 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-6 h-6 bg-[#6A0DAD] rounded"></div>
            <span className="text-xl font-bold text-[#6A0DAD]">Nova Brand</span>
          </div>
          <p className="text-gray-600">© 2024 Nova Brand. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
