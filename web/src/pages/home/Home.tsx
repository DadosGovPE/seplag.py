import NewsLetter from '../../components/newsLetter';
import { Link } from 'react-router-dom';

export default function Home() {

  return (
    <div className="min-h-screen">
      <div className="flex justify-center text-center bg-cover bg-center bg-[url('assets/bg.gif')] pt-40 pb-28">
        <div className="md:w-1/2 mb-6 md:mb-0 text-white">
          <h2 className="text-5xl font-bold mb-4">Bem-vindo ao Seplag.py</h2>
          <p className="text-lg mb-20">
            O Seplag.py é um encontro <s>quase</s> semanal que tem como objetivo
            difundir o conhecimento dessa linguagem entre os seplaguianos.
          </p>
          <NewsLetter />
        </div>
      </div>

      <main className="flex-grow flex items-center justify-center p-10">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden md:flex">
          <img
            src="bg_home.png"
            alt="Home background"
            className="md:w-1/2 h-auto object-cover"
          />
          <div className="p-8 md:w-1/2">
            <h3 className="text-2xl font-bold mb-4">Conheça mais sobre o Seplag.py</h3>
            <p className="text-gray-700 mb-4">
              O Seplag.py promove a troca de conhecimentos e o desenvolvimento contínuo
              dos seplaguianos através de workshops e encontros semanais.
            </p>
            <Link
              to="/aulas-anteriores"
              className="mt-4 inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Saiba Mais
            </Link>
          </div>
        </div>
      </main>

      
    </div>
  );
}
