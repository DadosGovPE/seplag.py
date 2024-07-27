import { useState, FormEvent, useEffect } from 'react';
import { api } from '../../../service/api';
import SearchBar from '../../../components/Searchbar';
import AulaFormModal from '../../../components/AulaFormModal';
import AulaList from '../../../components/AulaList';

export interface Card {
  id: number;
  title: string;
  description: string;
  link: string;
  date: string;
}

export interface FormValues {
  title: string;
  description: string;
  link: string;
  date: string;
}

const AdminAulas: React.FC = () => {
  const [cards, setCards] = useState<Card[]>([]);
  const [filteredCards, setFilteredCards] = useState<Card[]>([]);
  const [formValues, setFormValues] = useState<FormValues>({
    title: '',
    description: '',
    link: '',
    date: '',
  });
  const [editingCard, setEditingCard] = useState<Card | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');

  const itemsPerPage = 3;

  const fetchData = async () => {
    try {
      const response = await api.get('/aulas');
      const data = response.data;
      
      const validatedCards: Card[] = data.filter((card: Card) =>
        card.id !== undefined &&
        card.title !== undefined &&
        card.description !== undefined &&
        card.link !== undefined &&
        card.date !== undefined
      );

      setCards(validatedCards);
      setFilteredCards(validatedCards);
      setTotalPages(Math.ceil(validatedCards.length / itemsPerPage));
      setCurrentPage(1); // Reseta a página atual após a atualização dos dados
    } catch (error) {
      console.error('Erro ao buscar aulas:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const results = cards.filter(card =>
      card.title && card.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCards(results);
    setTotalPages(Math.ceil(results.length / itemsPerPage));
    setCurrentPage(1); 
  }, [searchTerm, cards]);

  const handleEdit = (card: Card) => {
    setEditingCard(card);
    setFormValues({
      title: card.title,
      description: card.description,
      link: card.link,
      date: card.date,
    });
    setModalOpen(true);
  };

  const handleDelete = async (id: number) => {
    try {
      await api.delete(`/aulas/${id}`);
      fetchData();
      setSuccess('Aula deletada com sucesso!');
    } catch (error) {
      console.error('Erro ao deletar aula:', error);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormValues(prevValues => ({
      ...prevValues,
      [name]: value
    }));
  };
  

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      if (editingCard) {
        await api.put(`/aulas/${editingCard.id}`, formValues);
        fetchData();
        setSuccess('Aula atualizada com sucesso!');
      } else {
        await api.post('/aulas', formValues);
        fetchData();
        setSuccess('Aula criada com sucesso!');
      }

      setFormValues({ title: '', description: '', link: '', date: '' });
      setModalOpen(false);
    } catch (error) {
      setError('Ocorreu um erro ao salvar a aula.');
      console.error('Erro ao salvar aula:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditingCard(null);
    setFormValues({ title: '', description: '', link: '', date: '' });
  };

  const currentCards = filteredCards.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className='bg-white p-5 shadow-md min-h-screen'>
      <h1 className="text-2xl font-bold mb-4">Gerenciamento de Aulas</h1>
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <button
        onClick={() => setModalOpen(true)}
        className="mb-6 bg-blue-600 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-700 transition-colors duration-300"
      >
        Adicionar Aula
      </button>
      {filteredCards.length > 0 ? (
        <AulaList
          currentCards={currentCards}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
          currentPage={currentPage}
          totalPages={totalPages}
          handlePageChange={handlePageChange}
        />
      ) : (
        <p>Carregando...</p>
      )}
      {modalOpen && (
        <AulaFormModal
          formValues={formValues}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          closeModal={closeModal}
          loading={loading}
          error={error}
          success={success}
          editingCard={editingCard}
        />
      )}
    </div>
  );
};

export default AdminAulas;
