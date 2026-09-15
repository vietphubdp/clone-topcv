import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import theme from './theme/theme';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import RegisterCandidate from './pages/RegisterCandidate/RegisterCandidate';
import JobDetail from './pages/JobDetail/JobDetail';
import PostJob from './pages/PostJob/PostJob';
import Jobs from './pages/Jobs/Jobs';
import AdminCompanies from './pages/Admin/AdminCompanies';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/register-candidate" element={<RegisterCandidate />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/job-detail" element={<JobDetail />} />
          <Route path="/job/:id" element={<JobDetail />} />
          <Route path="/post-job" element={<PostJob />} />
          <Route path="/admin" element={<AdminCompanies />} />
          <Route path="/admin/companies" element={<AdminCompanies />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}


export default App;
