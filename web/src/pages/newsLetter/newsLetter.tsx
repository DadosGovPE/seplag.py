import { useState } from 'react';
import axios from 'axios';

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
      await axios.post('http://localhost:3000/newsletter_subscribe', {
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
      <div className="flex items-center justify-center min-h-screen ">
        <div className="text-blue-500 text-lg font-semibold">Carregando...</div>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen  ">
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
    <div className="shadow-xl rounded flex items-center justify-center h-full overflow-hidden bg-[url('bg.gif')] bg-cover bg-center bg-no-repeat bg-opacity-35">
      <div className="max-w-md w-full p-6 bg-white shadow-md rounded">
        <h2 className="text-2xl font-bold mb-4">Inscreva-se na nossa Newsletter</h2>
        {message && <p className="mb-4 text-red-500">{message}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nome</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">E-mail</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 sm:text-sm"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors duration-300"
          >
            Inscrever-se
          </button>
        </form>
      </div>
    </div>
  );
}
