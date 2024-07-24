import { useState, ChangeEvent, FormEvent } from 'react';

interface FormValues {
  titulo: string;
  descricao: string;
  link: string;
  data: string;
}

export default function Admin_Aulas() {
  const [formValues, setFormValues] = useState<FormValues>({
    titulo: '',
    descricao: '',
    link: '',
    data: '',
  });

  const handleChange = (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  
    console.log('Dados do formulário:', formValues);
    // Limpar os campos após o envio (opcional)
    setFormValues({
      titulo: '',
      descricao: '',
      link: '',
      data: '',
    });
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-md shadow-md">
      <h1 className="text-xl font-bold mb-4">Cadastrar Aula</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="titulo" className="block text-sm font-medium text-gray-700">Título</label>
          <input
            type="text"
            id="titulo"
            name="titulo"
            value={formValues.titulo}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="descricao" className="block text-sm font-medium text-gray-700">Descrição</label>
          <textarea
            id="descricao"
            name="descricao"
            value={formValues.descricao}
            onChange={handleChange}
            rows={4}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="link" className="block text-sm font-medium text-gray-700">Link</label>
          <input
            type="url"
            id="link"
            name="link"
            value={formValues.link}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="data" className="block text-sm font-medium text-gray-700">Data</label>
          <input
            type="date"
            id="data"
            name="data"
            value={formValues.data}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-600 transition-colors duration-300"
        >
          Cadastrar
        </button>
      </form>
    </div>
  );
}
