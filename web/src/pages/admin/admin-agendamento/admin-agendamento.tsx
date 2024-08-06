import { useState, useRef, ChangeEvent } from 'react';
import { api } from '../../../service/api';

interface Appointment {
  id: string;
  content: string;
  date: string;
  meetingTitle: string;
  scheduleText: string;
  send: boolean;
}

interface FormData {
  content: string;
  date: string;
}

const AdminAgendamento = () => {
  const defaultHtmlTemplate = `
    <!DOCTYPE html>
    <html lang="pt-BR">
    <head>
        <meta charset="UTF-8">
        <title>Visualização</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                margin: 0;
                padding: 0;            
            }
            .body__ {
                background-color: #f5f5f5; /* Light grey */
            }
            .banner {
                width: 100%;
                text-align: center;
                padding: 20px 0;
            }
            .banner img {
                max-width: 100%;
                height: auto;
            }
            .container {
                max-width: 600px;
                margin: 20px auto;
                padding: 20px;
                background-color: white;
            }
            h1, h2 {
                color: #333;
            }
            ul {
                list-style-type: disc;
                padding-left: 20px;
            }
            .msg {
                font-size:1.25rem;
            }
            .footer {
                background-color: #0094FF;
                color: white;
                text-align: center;
                padding: 0.3rem;
            }
        </style>
    </head>
    <body>
    <div class="body__">
        <div class="banner">
            <img src="logo.png" alt="Banner Image" width="600" height="300">
        </div>
        <div class="container">
            <p>{{scheduleText}}</p>
            <h1>🐍 Encontro - {{meetingTitle}}</h1>
            <div class="msg">
                {{content}}
            </div>
            <div class="footer">
                © 2024 - IG/Seplag.py
            </div>
        </div>
    </div>
    </body>
    </html>
  `;

  const [scheduleSelected, setScheduleSelected] = useState<string>();
  const [htmlContent, setHtmlContent] = useState<string>('<p>Edite este conteúdo</p>');
  const [scheduleText, setScheduleText] = useState<string>('Toda terça, 8h30 da manhã');
  const [meetingTitle, setMeetingTitle] = useState<string>('');
  const [imageUrl, setImageUrl] = useState<string>('');
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [activeSection, setActiveSection] = useState<'schedule' | 'appointments'>('schedule');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [editingAppointment, setEditingAppointment] = useState<Appointment | null>(null);
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const insertImageToContent = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      const start = textarea.selectionStart ?? 0;
      const end = textarea.selectionEnd ?? 0;
      const text = textarea.value;
      const before = text.substring(0, start);
      const after = text.substring(end, text.length);
      const newText = `${before}<img src="${imageUrl}" alt="Imagem carregada" width="600" height="300" />${after}`;

      setHtmlContent(newText);
      setImageUrl('');
    }
  };

  const handleDateChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(e.target.value);
  };
  
  const handleDeleteAppointment = async (id: string) => {
    try {
      await api.delete(`/agendamentos/${id}`);
      setAppointments(appointments.filter(appointment => appointment.id !== id));
      if (id === scheduleSelected) {
        setScheduleSelected(undefined);
      }
      setFeedbackMessage('Agendamento deletado com sucesso.');
    } catch (error) {
      console.error('Erro ao deletar agendamento:', error);
      setFeedbackMessage('Erro ao deletar agendamento.');
    }
  };

  const viewScheduledAppointments = async () => {
    try {
      const response = await api.get<Appointment[]>('/agendamentos');
      console.log(response.data)
      const filteredAppointments = response.data.filter(appointment => appointment.send === false);
      setAppointments(filteredAppointments);
    } catch (error) {
      console.error('Erro ao buscar agendamentos:', error);
    }
  };
  

  const handleSubmit = async () => {
    if (!selectedDate) {
      setFeedbackMessage('Por favor, selecione uma data.');
      return;
    }

    try {
      const combinedHtml = defaultHtmlTemplate
        .replace('{{content}}', htmlContent)
        .replace('{{scheduleText}}', scheduleText)
        .replace('{{meetingTitle}}', meetingTitle);
        await api.post('/agendamentos', {
        content: combinedHtml,
        date: selectedDate
      } as FormData);

      setMeetingTitle('');
      setScheduleText('Toda terça, 8h30 da manhã');
      setHtmlContent('<p>Edite este conteúdo</p>');
      setSelectedDate('');
      setFeedbackMessage(null); 
    } catch (error) {
      console.error('Erro ao enviar agendamento:', error);
    }
  };

  const handleEditAppointment = (appointment: Appointment) => {
    setEditingAppointment(appointment);
    setIsModalOpen(true);
  };

  const handleSaveAppointment = async () => {
    if (editingAppointment) {
      try {
        const response = await api.put(`/agendamentos/${editingAppointment.id}`, {
          content: editingAppointment.content,
          date: editingAppointment.date,
          meetingTitle: editingAppointment.meetingTitle,
          scheduleText: editingAppointment.scheduleText
        });

        if(response.status == 200){
          setIsModalOpen(false);
          viewScheduledAppointments();
        }
      } catch (error) {
        console.error('Erro ao atualizar agendamento:', error);
      }
    }
  };

  const combinedHtml = defaultHtmlTemplate
    .replace('{{content}}', htmlContent)
    .replace('{{scheduleText}}', scheduleText)
    .replace('{{meetingTitle}}', meetingTitle);

  return (
    <div className='p-10 box-border h-full'>
      <div className="bg-gray-800 text-white flex justify-around rounded p-4">
        <button
          className={`p-2 rounded ${activeSection === 'schedule' ? 'bg-blue-500' : ''}`}
          onClick={() => setActiveSection('schedule')}
        >
          Agendar
        </button>
        <button
          className={`p-2 rounded ${activeSection === 'appointments' ? 'bg-blue-500' : ''}`}
          onClick={() => {
            setActiveSection('appointments');
            viewScheduledAppointments();
          }}
        >
          Agendamentos
        </button>
      </div>
      <div className="flex p-4 justify-center gap-10 bg-white"  style={{height: "87vh"}}> 
        {/* o height é referente ao tamanho da tela que esta pegando o padding do pai e dele mesmo */}
        {activeSection === 'schedule' && (
          <div className="w-1/2 p-5 my-2 border border-gray-300 rounded-md flex flex-col justify-around">         
            <h1 className='text-3xl text-center font-bold'>Agendamento das Aulas</h1>  
          <div>

            <label htmlFor="date_agendamento" className="block text-sm font-medium text-gray-700 mb-2">
              Data de Envio
            </label>
            <input
              id='date_agendamento'
              type="date"
              className="w-full border border-gray-300 rounded-md p-2 mb-4"
              value={selectedDate}
              onChange={handleDateChange}
            />
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
              Título
            </label> 
            <input
              id='title'
              type="text"
              className="w-full border border-gray-300 rounded-md p-2 mb-4"
              placeholder="Título do encontro"
              value={meetingTitle}
              onChange={(e) => setMeetingTitle(e.target.value)}
            />
            <label htmlFor="detailsDay" className="block text-sm font-medium text-gray-700 mb-2">
              Detalhes do dia ( Pode HTML )  
            </label> 
            <input
              id='detailsDay'
              type="text"
              className="w-full border border-gray-300 rounded-md p-2 mb-4"
              placeholder="Texto do agendamento"
              value={scheduleText}
              onChange={(e) => setScheduleText(e.target.value)}
            />
            <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">
              Conteudo ( Pode HTML )  
            </label> 
            <textarea
              id='content'
              ref={textareaRef}
              className="w-full h-48 border border-gray-300 rounded-md p-2 mb-4"
              value={htmlContent}
              onChange={(e) => setHtmlContent(e.target.value)}
            />
            <label htmlFor="imageOrGif" className="block text-sm font-medium text-gray-700 mb-2">
              Inserir Link de imagem ou GIF
            </label> 
            <input
              id='imageOrGif'
              type="text"
              className="w-full border border-gray-300 rounded-md p-2 mb-4"
              placeholder="URL da Imagem"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
            />
          </div>
          <div>

            <button
              className="w-full bg-blue-500 text-white p-2 rounded-md"
              onClick={insertImageToContent}
              disabled={!imageUrl}
            >
              Inserir Imagem
            </button>
            <button
              className="w-full bg-green-500 text-white p-2 rounded-md mt-4"
              onClick={handleSubmit}
            >
              Agendar
            </button>
            </div>
            {feedbackMessage && (
              <div className="mt-4 text-red-500">
                {feedbackMessage}
              </div>
            )}
          </div>
        )}

{activeSection === 'appointments' && (
  <div className="flex-1 flex h-full gap-10">
      <ul className="w-1/2 p-5 my-2 border border-gray-300 rounded-md">
        {appointments.length > 0 ? (
          appointments.map((appointment) => (
            <li key={appointment.id} className="border-b py-2 flex justify-between items-center">
              <div>
                <p><strong>Data:</strong> {appointment.date}</p>
              </div>
              <div className="space-x-2">
                <button
                  className="bg-blue-500 text-white p-2 rounded-md"
                  onClick={() => handleEditAppointment(appointment)}
                >
                  Editar
                </button>
                <button
                  className="bg-red-500 text-white p-2 rounded-md"
                  onClick={() => handleDeleteAppointment(appointment.id)}
                >
                  Deletar
                </button>
                <button
                  className="bg-green-500 text-white p-2 rounded-md"
                  onClick={() => setScheduleSelected(appointment.id)}
                >
                  Visualizar
                </button>
              </div>
            </li>
          ))
        ) : (
          <li>Não há agendamentos.</li>
        )}
      </ul>
    <div className="w-1/2 p-5 my-2 border border-gray-300 rounded-md">
      {scheduleSelected ? (
        <iframe
          title="Visualização do Agendamento"
          srcDoc={appointments.find((appt) => appt.id === scheduleSelected)?.content || ''}
          className="w-full h-full"
        />
      ) : (
        <div>

        <p>Selecione um agendamento para visualizar.</p>
        </div>
      )}
    </div>
  </div>
)}

        {activeSection === 'schedule' && (
          <div className="w-1/2 p-5 my-2 border border-gray-300 rounded-md">
              <iframe
                title="Visualização"
                srcDoc={combinedHtml}
                className="w-full h-full"
              />
          </div>
        )}
      </div>

      {isModalOpen && editingAppointment && (
  <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
    <div className="bg-white p-4 rounded-md shadow-lg w-full max-w-5xl flex overflow-hidden">
      <div className="w-1/2 p-5 my-10">
        <h2 className="text-lg font-semibold mb-4">Editar Agendamento</h2>
        <textarea
          className="w-full h-48 border border-gray-300 rounded-md p-2 mb-4"
          value={editingAppointment.content || ''}
          onChange={(e) => setEditingAppointment({ ...editingAppointment, content: e.target.value })}
        />
        <input
          type="date"
          className="w-full border border-gray-300 rounded-md p-2 mb-4"
          value={editingAppointment.date ? new Date(editingAppointment.date).toISOString().split('T')[0] : ''}
          onChange={(e) => setEditingAppointment({ ...editingAppointment, date: e.target.value })}
        />
        <button
          className="bg-blue-500 text-white p-2 rounded-md mr-2"
          onClick={handleSaveAppointment}
        >
          Salvar
        </button>
        <button
          className="bg-gray-500 text-white p-2 rounded-md"
          onClick={() => setIsModalOpen(false)}
        >
          Fechar
        </button>
      </div>
      <div className="w-1/2 p-5 my-10">
        <h2 className="text-lg font-semibold mb-4">Pré-visualização</h2>
        <div className="border border-gray-300 rounded-md h-full">
          <iframe
            title="Visualização"
            srcDoc={editingAppointment.content}
            className="w-full h-full border-0"
          />
        </div>
      </div>
    </div>
  </div>
)}

   
    </div>

  );
};

export default AdminAgendamento;
