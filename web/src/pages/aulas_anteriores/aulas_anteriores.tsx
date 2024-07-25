import React, { useState, useEffect } from 'react';
import { api } from '../../service/api';
import { Card } from '../admin/admin-aulas/admin-aulas';
import Modal from '../../components/ModalAulaView';

export default function Aulas_anteriores() {
  const [cards, setCards] = useState<Card[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCard, setSelectedCard] = useState<Card | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get('/aulas');
        setCards(response.data);
      } catch (err) {
        setError('Erro ao buscar aulas.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []); 

  const handleCardClick = (card: Card) => {
    setSelectedCard(card);
  };

  const handleCloseModal = () => {
    setSelectedCard(null);
  };

  const handleLinkClick = (event: React.MouseEvent<HTMLAnchorElement>, link: string) => {
    event.stopPropagation();
    window.open(link, '_blank', 'noopener,noreferrer');
  };

  if (loading) return <p>Carregando...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="grid gap-6 p-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {cards.map((card) => (
        <div
          key={card.id}
          className="flex flex-col bg-white border border-gray-300 rounded-lg shadow-lg overflow-hidden cursor-pointer"
          onClick={() => handleCardClick(card)}
        >
          <div className="p-4 flex flex-col h-full">
            <h2 className="text-xl font-bold mb-2">{card.title}</h2>
            <p className="text-gray-600 mb-4">{new Date(card.date).toLocaleDateString()}</p>
            <p className="text-gray-800 flex-grow mb-4 truncate">{card.description}</p>
          </div>
          <a
            href={card.link}
            className="bg-blue-500 text-white py-2 px-4 rounded-b-lg text-center hover:bg-blue-600 transition-colors duration-300"
            onClick={(event) => handleLinkClick(event, card.link)} // Handle link click separately
            target="_blank"
            rel="noopener noreferrer"
          >
            Acessar Material
          </a>
        </div>
      ))}

      {selectedCard && (
        <Modal
          isOpen={!!selectedCard}
          onClose={handleCloseModal}
          title={selectedCard.title}
          description={selectedCard.description}
          link={selectedCard.link}
          date={selectedCard.date}
        />
      )}
    </div>
  );
}
