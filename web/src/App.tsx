import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NewsLetter from './pages/newsLetter/newsLetter';
import Layout from './Layout/Layout';
import Aulas_anteriores from './pages/aulas_anteriores/aulas_anteriores';
import Admin_login from './pages/admin/admin-login/admin-login';
import Admin_aulas from './pages/admin/admin-aulas/admin-aulas';
import Admin_agendamento from './pages/admin/admin-agendamento/admin-agendamento';


const App = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/newsletter" element={<NewsLetter />} />
          <Route path="/aulas-anteriores" element={<Aulas_anteriores />} />
          <Route path="/admin-login" element={<Admin_login />} />
          <Route path="/admin-aulas" element={<Admin_aulas />} />
          <Route path="/admin-agendamento" element={<Admin_agendamento />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
