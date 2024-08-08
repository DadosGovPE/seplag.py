import React from 'react';
import { Card } from '../pages/admin/admin-aulas/admin-aulas'; // Ajuste o caminho conforme necessário

interface AulaListProps {
  currentCards: Card[];
  handleEdit: (card: Card) => void;
  handleDelete: (id: number) => void;
  currentPage: number;
  totalPages: number;
  handlePageChange: (page: number) => void;
}

const AulaList: React.FC<AulaListProps> = ({
  currentCards,
  handleEdit,
  handleDelete,
  currentPage,
  totalPages,
  handlePageChange,
}) => {

  const sortedCards = [...currentCards].sort((a, b) => {
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();
    return dateB - dateA; 
  });

  return (
    <div className='flex flex-col h-2/3 justify-between'>
      <div>
      <ul className="space-y-4">
        {sortedCards.map(card => (
          <li
            key={card.id}
            className="flex flex-col md:flex-row justify-between items-center p-4 border border-gray-300 rounded-lg bg-white shadow-md"
          >
            <div className="flex-1 mb-4 md:mb-0">
              <h3 className="text-lg font-semibold">{card.title || 'Sem Título'}</h3>
              <p className="text-gray-600">
                {card.description ? card.description : 'Sem Descrição'}
              </p>
              <p className="text-gray-600">
                {card.date ? new Date(card.date).toLocaleDateString() : 'Sem Data'}
              </p>
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
      </div>

      <div className="flex justify-between">
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
};


export default AulaList;
