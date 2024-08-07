import { useState } from 'react';
import { api } from '../service/api';

export default function NewsLetter() {
  const [formData, setFormData] = useState({ name: '', email: '' });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);
    setMessage('');

    try {
      await api.post('/newsletter_subscribe', {
        email: formData.email,
        nome: formData.name 
      });

      setTimeout(() => {
        setLoading(false);
        setSubmitted(true);
        setFormData({ name: '', email: '' });
      }, 2000);
    } catch (error) {
      setLoading(false);
      setMessage('Ocorreu um erro ao se inscrever. Tente novamente.');
    }
  };

  const handleReset = () => {
    setSubmitted(false);
    setMessage('');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-blue-500 text-lg font-semibold">Carregando...</div>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="max-w-md w-full p-6 bg-green-100 border border-green-300 rounded shadow-md">
          <h2 className="text-2xl font-bold mb-4 text-green-700">Obrigado por se inscrever!</h2>
          <p className="mb-4 text-green-600">Você foi adicionado à nossa lista de newsletter com sucesso.</p>
          <button
            onClick={handleReset}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors duration-300"
          >
            Cadastrar novamente
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center bg-cover bg-center bg-no-repeat bg-opacity-35 ">
        {message && <p className="mb-4 text-red-500">{message}</p>}
        <form onSubmit={handleSubmit} className="flex w-3/5 ">
          <input
            placeholder='Insira seu melhor email...'
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className=" flex-grow px-3 py-2 border text-black border-gray-300 rounded-s-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 sm:text-sm"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-e-lg hover:bg-blue-600 transition-colors duration-300"
            style={{ fontFamily: "Snell Roundhand, cursive" }}
          >
            Inscrever-se
          </button>
        </form>
    
      </div>
  );
}
