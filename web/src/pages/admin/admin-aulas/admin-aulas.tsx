import { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { api } from '../../../service/api'; // Certifique-se de que `api` esteja configurado corretamente

interface Card {
  id: number;
  titulo: string;
  descricao: string;
  link: string;
  data: string;
}

interface FormValues {
  titulo: string;
  descricao: string;
  link: string;
  data: string;
}

export default function AdminAulas() {
  const [cards, setCards] = useState<Card[]>([]);
  const [filteredCards, setFilteredCards] = useState<Card[]>([]);
  const [formValues, setFormValues] = useState<FormValues>({
    titulo: '',
    descricao: '',
    link: '',
    data: '',
  });
  const [editingCard, setEditingCard] = useState<Card | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 3;

  // Fetch initial data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get('/buscar-aulas');
        setCards(response.data);
        setFilteredCards(response.data);
      } catch (err) {
        setError('Erro ao buscar dados.');
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const filtered = cards.filter(card =>
      card.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      card.descricao.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCards(filtered);
  }, [searchTerm, cards]);

  const handleChange = (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormValues(prevValues => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      if (editingCard) {
        // Update existing card
        const response = await api.put(`/atualizar-aula/${editingCard.id}`, formValues);
        if (response.status !== 200) {
          throw new Error(response.data.message || 'Erro ao atualizar dados.');
        }
        setSuccess(response.data.message);
      } else {
        // Create new card
        const response = await api.post('/cadastrar-aulas', formValues);
        if (response.status !== 201) {
          throw new Error(response.data.message || 'Erro ao enviar dados.');
        }
        setSuccess(response.data.message);
      }

      // Refresh card list and clear form
      const updatedResponse = await api.get('/buscar-aulas');
      setCards(updatedResponse.data);
      setFilteredCards(updatedResponse.data);
      setFormValues({
        titulo: '',
        descricao: '',
        link: '',
        data: '',
      });
      setEditingCard(null);
      setModalOpen(false);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Erro desconhecido.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (card: Card) => {
    setEditingCard(card);
    setFormValues({
      titulo: card.titulo,
      descricao: card.descricao,
      link: card.link,
      data: card.data,
    });
    setModalOpen(true);
  };

  const handleDelete = async (id: number) => {
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await api.delete(`/deletar-aula/${id}`);
      if (response.status !== 200) {
        throw new Error(response.data.message || 'Erro ao deletar dados.');
      }
      setSuccess(response.data.message);

      const updatedResponse = await api.get('/buscar-aulas');
      setCards(updatedResponse.data);
      setFilteredCards(updatedResponse.data);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Erro desconhecido.');
      }
    } finally {
      setLoading(false);
    }
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditingCard(null);
    setFormValues({
      titulo: '',
      descricao: '',
      link: '',
      data: '',
    });
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = filteredCards.slice(indexOfFirstCard, indexOfLastCard);

  const totalPages = Math.ceil(filteredCards.length / cardsPerPage);

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white rounded-lg shadow-lg w-full">
      <div className="mb-6">
        <h2>Pesquisar Título</h2>
        <input
          type="text"
          placeholder="Buscar por título ou descrição..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>

      <button
        onClick={() => setModalOpen(true)}
        className="w-full bg-blue-600 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-700 transition-colors duration-300 mb-6"
      >
        {editingCard ? 'Editar Aula' : 'Cadastrar Aula'}
      </button>

      {modalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6">
            <h2 className="text-xl font-bold mb-4">{editingCard ? 'Editar Aula' : 'Cadastrar Aula'}</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="col-span-1">
                  <label htmlFor="titulo" className="block text-sm font-medium text-gray-700">Título</label>
                  <input
                    type="text"
                    id="titulo"
                    name="titulo"
                    value={formValues.titulo}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    required
                  />
                </div>
                <div className="col-span-1">
                  <label htmlFor="descricao" className="block text-sm font-medium text-gray-700">Descrição</label>
                  <textarea
                    id="descricao"
                    name="descricao"
                    value={formValues.descricao}
                    onChange={handleChange}
                    rows={4}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    required
                  />
                </div>
                <div className="col-span-1">
                  <label htmlFor="link" className="block text-sm font-medium text-gray-700">Link</label>
                  <input
                    type="url"
                    id="link"
                    name="link"
                    value={formValues.link}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    required
                  />
                </div>
                <div className="col-span-1">
                  <label htmlFor="data" className="block text-sm font-medium text-gray-700">Data</label>
                  <input
                    type="date"
                    id="data"
                    name="data"
                    value={formValues.data}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    required
                  />
                </div>
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-700 transition-colors duration-300"
                disabled={loading}
              >
                {loading ? (editingCard ? 'Atualizando...' : 'Enviando...') : (editingCard ? 'Atualizar' : 'Cadastrar')}
              </button>
              {error && <p className="text-red-600 mt-2">{error}</p>}
              {success && <p className="text-green-600 mt-2">{success}</p>}
            </form>
            <button
              onClick={closeModal}
              className="mt-4 w-full bg-gray-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-gray-600 transition-colors duration-300"
            >
              Fechar
            </button>
          </div>
        </div>
      )}

      <h2 className="text-lg font-semibold mt-8 mb-4">Aulas Cadastradas</h2>
      <ul className="space-y-4">
        {currentCards.map(card => (
          <li key={card.id} className="flex flex-col md:flex-row justify-between items-center p-4 border border-gray-300 rounded-lg bg-white shadow-md">
            <div className="flex-1 mb-4 md:mb-0">
              <h3 className="text-lg font-semibold">{card.titulo}</h3>
              <p className="text-gray-600">{new Date(card.data).toLocaleDateString()}</p>
            </div>
            <div className="flex space-x-2">
              <button
                className="bg-yellow-500 text-white px-3 py-1 rounded-md hover:bg-yellow-600 transition-colors duration-300"
                onClick={() => handleEdit(card)}
              >
                Editar
              </button>
              <button
                className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition-colors duration-300"
                onClick={() => handleDelete(card.id)}
              >
                Deletar
              </button>
            </div>
          </li>
        ))}
      </ul>

      <div className="flex justify-between items-center mt-6">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="bg-gray-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-gray-600 transition-colors duration-300"
        >
          Anterior
        </button>
        <span className="text-gray-700">Página {currentPage} de {totalPages}</span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="bg-gray-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-gray-600 transition-colors duration-300"
        >
          Próxima
        </button>
      </div>
    </div>
  );
}
