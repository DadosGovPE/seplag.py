import React, { useState } from 'react';

const AdminAgendamento = () => {
  const [title, setTitle] = useState('');
  const [textContent, setTextContent] = useState('');

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleTextChange = (event) => {
    setTextContent(event.target.value);
  };



  // Template padrão para HTML
  const defaultHtmlTemplate = `
    <!DOCTYPE html>
    <html lang="pt-BR">
    <head>
        <meta charset="UTF-8">
        <title>${title}</title>
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
            <img src=":header_img" alt="Banner Image" width="600" height="300">
        </div>

        <div class="container">
            <p>Toda terça, 8h30 da manhã</p>
            <h1>🐍 Encontro 6 - (${title})</h1>
            <div class="msg">
            ${textContent}
            </div>
            <div class="footer">
                © 2024 - IG/Seplag.py
            </div>
        </div>
    </div>
    </body>
    </html>
  `;

  return (
    <div className="flex flex-wrap space-x-4 p-4">
      <div className="w-full mb-4">
        <h2 className="text-xl font-semibold mb-2">Título</h2>
        <input
          type="text"
          value={title}
          onChange={handleTitleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          placeholder="Digite o título"
        />
      </div>

      <div className="w-full md:w-1/3 px-2 mb-4">
        <h2 className="text-xl font-semibold mb-2">Texto Normal</h2>
        <textarea
          value={textContent}
          onChange={handleTextChange}
          rows={10}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>



      <div className="w-full md:w-3/3 px-2 mb-4">
        <h2 className="text-xl font-semibold mb-2">Visualização</h2>
        <div className="border border-gray-300 rounded-md p-2 h-full overflow-auto">
          <iframe
            title="Visualização"
            srcDoc={defaultHtmlTemplate.replace('${title || "Título Padrão"}', title).replace('${textContent || ...}', textContent)}
            className="w-full h-full border-0"
          />
          <pre className="whitespace-pre-wrap mt-4">{textContent}</pre>
        </div>
      </div>
    </div>
  );
};

export default AdminAgendamento;
