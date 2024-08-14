import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NewsLetter from './components/newsLetter';
import Aulas_anteriores from './pages/aulas_anteriores/aulas_anteriores';
import Admin_login from './pages/admin/admin-login/admin-login';
import Admin_aulas from './pages/admin/admin-aulas/admin-aulas';
import Admin_agendamento from './pages/admin/admin-agendamento/admin-agendamento';
import Gerencia from './pages/gerencia/gerencia';
import { AuthProvider } from './hooks/AuthContext';
import PrivateRoute from './hooks/PrivateRoute';
import Home from './pages/home/Home';
import Layout from './Layout/Layout';

const App = () => {
  return (
    <Router>
      <AuthProvider>
      <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/newsletter" element={<NewsLetter />} />
            <Route path="/aulas-anteriores" element={<Aulas_anteriores />} />
            <Route path="/admin" element={<Admin_login />} />
            <Route path="/admin-aulas" element={<PrivateRoute element={<Admin_aulas />} />} />
            <Route path="/admin-agendamento" element={<PrivateRoute element={<Admin_agendamento />} />} />
            <Route path="/admin-gerencia" element={<PrivateRoute element={<Gerencia />} />} />
          </Routes>
      </Layout>
      </AuthProvider>
    </Router>
  );
};

export default App;
