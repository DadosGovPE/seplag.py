export default function Aulas_anteriores() {
  const cards = [
    {
      date: '23/07/2024',
      title: 'Aula 1',
      link: 'http://colab.com' // Inclua o protocolo para o link funcionar
    },
    {
      date: '23/07/2024',
      title: 'Aula 2',
      link: 'http://colab.com' // Inclua o protocolo para o link funcionar
    }
  ];

  return (
    <div className='flex flex-row gap-4'>
      {cards.map((card, index) => (
        <div key={index} className="p-4 border border-gray-300 rounded shadow-md bg-white flex flex-col  justify-between gap-4 text-center">
            <div>
                <h2 className="text-xl font-bold">{card.title}</h2>
                <p className="text-gray-600">{card.date}</p>
            </div>
          <a href={card.link} className="text-white p-2 bg-blue-500 flex justify-center items-center rounded hover:underline">
            Acessar Material
          </a>
        </div>
      ))}
    </div>
  );
}
