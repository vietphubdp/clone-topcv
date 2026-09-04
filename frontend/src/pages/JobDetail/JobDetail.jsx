import React, { useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import JobDetailHeader from './JobDetailHeader';
import JobDetailMain from './JobDetailMain';
import CompanySidebar from './CompanySidebar';
import { Link } from 'react-router-dom';
import './JobDetail.css';

const JobDetail = () => {
  // Scroll to top when page opens
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="job-detail-page">
      {/* Top Navigation */}
      <Navbar />

      <main className="topcv-container">
        {/* Breadcrumb Navigation */}
        <div className="job-detail-breadcrumb">
          <Link to="/">Trang chủ</Link> / <Link to="/">Việc làm</Link> /{' '}
          <span style={{ color: '#212f3f', fontWeight: 600 }}>
            Nhân Viên Kinh Doanh - Thu Nhập 15 - 30 Triệu
          </span>
        </div>

        {/* Top Header Card */}
        <JobDetailHeader />

        {/* Main Content 2-Column Layout */}
        <div className="job-detail-layout">
          <div className="job-detail-left-col">
            <JobDetailMain />
          </div>

          <div className="job-detail-right-col">
            <CompanySidebar />
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default JobDetail;
