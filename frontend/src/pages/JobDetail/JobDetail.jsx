import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams, Link, useNavigate } from 'react-router-dom';
import { Box, Typography, CircularProgress, Button, Breadcrumbs } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import JobDetailHeader from './JobDetailHeader';
import JobDetailMain from './JobDetailMain';
import CompanySidebar from './CompanySidebar';
import { getJobDetail, getJobs } from '../../services/api';
import './JobDetail.css';

const JobDetail = () => {
  const { id, slug } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const targetIdentifier = slug || id || searchParams.get('slug') || searchParams.get('id');

  useEffect(() => {
    window.scrollTo(0, 0);

    const fetchJob = async () => {
      setLoading(true);
      setError('');
      try {
        if (!targetIdentifier) {
          setError('Không tìm thấy mã hoặc đường dẫn việc làm.');
          setLoading(false);
          return;
        }

        // 1. Try fetching directly with slug/id
        try {
          const data = await getJobDetail(targetIdentifier);
          if (data) {
            setJob(data);
            setLoading(false);
            return;
          }
        } catch (directErr) {
          // 2. Fallback: If targetIdentifier might be a UUID id, search in jobs list to find matching slug
          const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(targetIdentifier);
          if (isUuid) {
            const jobsRes = await getJobs({ page: 1 });
            const matched = (jobsRes.data || []).find((j) => j.id === targetIdentifier);
            if (matched && matched.slug) {
              const matchedData = await getJobDetail(matched.slug);
              if (matchedData) {
                setJob(matchedData);
                setLoading(false);
                return;
              }
            }
          }
          throw directErr;
        }
      } catch (err) {
        console.error('Error fetching job detail:', err);
        setError('Không tìm thấy việc làm hoặc tin tuyển dụng đã hết hạn.');
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [targetIdentifier]);

  if (loading) {
    return (
      <div className="job-detail-page">
        <Navbar />
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '65vh' }}>
          <CircularProgress sx={{ color: '#00b14f' }} />
        </Box>
        <Footer />
      </div>
    );
  }

  if (error || !job) {
    return (
      <div className="job-detail-page">
        <Navbar />
        <div className="topcv-container" style={{ padding: '80px 16px', textAlign: 'center', minHeight: '60vh' }}>
          <Typography variant="h5" sx={{ fontWeight: 700, color: '#e11d48', mb: 2 }}>
            {error || 'Không tìm thấy việc làm này'}
          </Typography>
          <Typography sx={{ color: '#666', mb: 3 }}>
            Tin tuyển dụng này có thể đã bị đóng, gỡ bỏ hoặc đường dẫn không chính xác.
          </Typography>
          <Button
            variant="contained"
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate('/')}
            sx={{
              backgroundColor: '#00b14f',
              borderRadius: '24px',
              px: 3,
              py: 1,
              fontWeight: 700,
              textTransform: 'none',
              '&:hover': { backgroundColor: '#009643' },
            }}
          >
            Quay về Trang chủ tìm việc
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="job-detail-page">
      <Navbar />

      <main className="topcv-container">
        {/* Breadcrumb Navigation */}
        <div className="job-detail-breadcrumb">
          <Breadcrumbs separator="/" aria-label="breadcrumb">
            <Link to="/" style={{ color: '#00b14f', textDecoration: 'none' }}>
              Trang chủ
            </Link>
            <Link to="/" style={{ color: '#00b14f', textDecoration: 'none' }}>
              {job.category || 'Việc làm'}
            </Link>
            <Typography sx={{ color: '#212f3f', fontWeight: 600, fontSize: '13.5px' }}>
              {job.title}
            </Typography>
          </Breadcrumbs>
        </div>

        {/* Top Header Card */}
        <JobDetailHeader job={job} />

        {/* Main Content 2-Column Layout */}
        <div className="job-detail-layout">
          <div className="job-detail-left-col">
            <JobDetailMain job={job} />
          </div>

          <div className="job-detail-right-col">
            <CompanySidebar company={job.company} job={job} />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default JobDetail;
