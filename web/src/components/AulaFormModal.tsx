import React from 'react';
import { FormValues, Card } from '../pages/admin/admin-aulas/admin-aulas';

interface AulaFormModalProps {
  formValues: FormValues;
  handleChange: (event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => void;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  closeModal: () => void;
  loading: boolean;
  error: string | null;
  success: string | null;
  editingCard: Card | null;
}

const AulaFormModal: React.FC<AulaFormModalProps> = ({
  formValues,
  handleChange,
  handleSubmit,
  closeModal,
  loading,
  error,
  success,
  editingCard,
}) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 transition-opacity">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-lg p-6 transform transition-transform duration-300 ease-in-out scale-95">
        <h2 className="text-2xl font-semibold mb-4 text-center">
          {editingCard ? 'Editar Aula' : 'Cadastrar Aula'}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-4">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">Título</label>
              <input
                type="text"
                id="title"
                name="title"
                value={formValues.title}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
              />
            </div>
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">Descrição</label>
              <textarea
                id="description"
                name="description"
                value={formValues.description}
                onChange={handleChange}
                rows={4}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
              />
            </div>
            <div>
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
            <div>
              <label htmlFor="date" className="block text-sm font-medium text-gray-700">Data</label>
              <input
                type="date"
                id="date"
                name="date"
                value={formValues.date.slice(0, 10)} // Formato YYYY-MM-DD
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
  );
};

export default AulaFormModal;
