import { useState } from 'react';
import { api } from '../service/api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaWhatsapp, FaTwitter, FaLinkedin, FaCopy } from 'react-icons/fa';

export default function NewsLetter() {
  const [formData, setFormData] = useState({ name: '', email: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true); // Inicia o estado de carregamento

    try {
      await api.post('/newsletter_subscribe', {
        email: formData.email,
        nome: formData.name 
      });

      // Mostra o toast de sucesso
      toast.success('Cadastro realizado com sucesso!', {
        position: "top-center",
        autoClose: 3000,
      });

      setFormData({ name: '', email: '' });
    } catch (error) {
      // Mostra o toast de erro
      toast.error('Ocorreu um erro ao se inscrever. Tente novamente.', {
        position: "top-center",
        autoClose: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  const shareText = encodeURIComponent('Confira essa newsletter incrível!');
  const shareUrl = encodeURIComponent('http://191.252.60.33:8000/');

  const handleCopyLink = () => {
    navigator.clipboard.writeText(`Confira essa newsletter incrível! ${shareUrl}`)
      .then(() => {
        toast.success('Link copiado para a área de transferência!', {
          position: "top-center",
          autoClose: 3000,
        });
      })
      .catch(() => {
        toast.error('Falha ao copiar o link.', {
          position: "top-center",
          autoClose: 3000,
        });
      });
  };

  return (
    <div className="flex items-center justify-center flex-col min-h-[20vh] bg-cover bg-center bg-no-repeat bg-opacity-35 relative">
      <form onSubmit={handleSubmit} className="flex w-3/5 mb-4">
        <input
          placeholder='Insira seu melhor email...'
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          disabled={loading} 
          className={`flex-grow px-5 py-4 border text-gray-600 border-gray-300 rounded-l-lg shadow-sm focus:outline-none text-xl ${loading ? 'bg-gray-200' : ''}`}
          style={{ fontFamily: "Snell Roundhand, cursive" }}
        />
        <button
          type="submit"
          disabled={loading} 
          className={`px-4 py-2 text-white rounded-r-lg transition-colors duration-300 text-lg ${loading ? 'bg-gray-500 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'}`}
          style={{ fontFamily: "Snell Roundhand, cursive" }}
        >
          {loading ? 'Enviando...' : 'Inscrever-se'}
        </button>
      </form>

      <div className="flex space-x-4 mb-4">
        <a
          href={`https://api.whatsapp.com/send?text=${shareText}%20${shareUrl}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-green-500 hover:text-green-700 transition-colors duration-300"
        >
          <FaWhatsapp size={32} />
        </a>
        <a
          href={`https://twitter.com/intent/tweet?text=${shareText}&url=${shareUrl}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-400 hover:text-blue-600 transition-colors duration-300"
        >
          <FaTwitter size={32} />
        </a>
        <a
          href={`https://www.linkedin.com/shareArticle?mini=true&url=${shareUrl}&title=${shareText}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-700 hover:text-blue-900 transition-colors duration-300"
        >
          <FaLinkedin size={32} />
        </a>
        <button
          onClick={handleCopyLink}
          className="text-gray-500 hover:text-gray-700 transition-colors duration-300"
        >
          <FaCopy size={32} />
        </button>
      </div>

      {/* Componente ToastContainer para exibir os toasts */}
      <ToastContainer />
    </div>
  );
}
