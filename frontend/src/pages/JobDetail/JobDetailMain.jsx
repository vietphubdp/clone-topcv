import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, Divider, CircularProgress } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import JobCard from '../../components/HotJobs/JobCard';
import ApplyJobModal from '../../components/ApplyJobModal/ApplyJobModal';
import { getJobs } from '../../services/api';


const formatDate = (dateString) => {
  if (!dateString) return 'Chưa cập nhật';
  try {
    const d = new Date(dateString);
    return d.toLocaleDateString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  } catch {
    return dateString;
  }
};

const JobDetailMain = ({ job }) => {
  const [relatedJobs, setRelatedJobs] = useState([]);
  const [loadingRelated, setLoadingRelated] = useState(false);
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);


  useEffect(() => {
    const fetchRelated = async () => {
      setLoadingRelated(true);
      try {
        const params = { page: 1 };
        if (job?.category_slug) {
          params.category_slug = job.category_slug;
        }
        const res = await getJobs(params);
        const list = res.data || [];
        setRelatedJobs(list.filter((j) => j.id !== job?.id).slice(0, 4));
      } catch (err) {
        console.error('Error fetching related jobs:', err);
      } finally {
        setLoadingRelated(false);
      }
    };

    if (job?.id) {
      fetchRelated();
    }
  }, [job?.id, job?.category_slug]);

  if (!job) return null;

  return (
    <Box>
      {/* Detailed Description Card */}
      <div className="job-content-card">
        {/* Section Title */}
        <Typography variant="h6" className="job-section-title">
          Chi tiết tin tuyển dụng
        </Typography>

        {/* 1. Mô tả công việc */}
        {job.description_html && (
          <Box sx={{ mt: 2.5, mb: 3 }}>
            <Typography sx={{ fontWeight: 800, fontSize: '16px', color: '#212f3f', mb: 1.5 }}>
              1. Mô tả công việc
            </Typography>
            <div
              className="job-detail-html-content"
              dangerouslySetInnerHTML={{ __html: job.description_html }}
            />
          </Box>
        )}

        {/* 2. Yêu cầu ứng viên (Chỉ hiện khi có dữ liệu) */}
        {job.requirements_html && (
          <Box sx={{ mb: 3 }}>
            <Typography sx={{ fontWeight: 800, fontSize: '16px', color: '#212f3f', mb: 1.5 }}>
              2. Yêu cầu ứng viên
            </Typography>
            <div
              className="job-detail-html-content"
              dangerouslySetInnerHTML={{ __html: job.requirements_html }}
            />
          </Box>
        )}

        {/* 3. Quyền lợi được hưởng (Chỉ hiện khi có dữ liệu) */}
        {job.benefits_html && (
          <Box sx={{ mb: 3 }}>
            <Typography sx={{ fontWeight: 800, fontSize: '16px', color: '#212f3f', mb: 1.5 }}>
              3. Quyền lợi được hưởng
            </Typography>
            <div
              className="job-detail-html-content"
              dangerouslySetInnerHTML={{ __html: job.benefits_html }}
            />
          </Box>
        )}

        {/* 4. Địa điểm làm việc */}
        {Array.isArray(job.work_location) && job.work_location.length > 0 && (
          <Box sx={{ mb: 3 }}>
            <Typography sx={{ fontWeight: 800, fontSize: '16px', color: '#212f3f', mb: 1.5 }}>
              4. Địa điểm làm việc
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              {job.work_location.map((loc, idx) => (
                <Box key={idx} sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}>
                  <LocationOnOutlinedIcon sx={{ color: '#00b14f', fontSize: '20px', mt: 0.2 }} />
                  <Typography sx={{ fontSize: '14.5px', color: '#333333' }}>
                    {loc.city_name && <strong>{loc.city_name}: </strong>}
                    {loc.address_detail || 'Theo thỏa thuận'}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Box>
        )}

        <Divider sx={{ my: 3 }} />

        {/* Application Bottom Action */}
        <Box sx={{ backgroundColor: '#f8fafc', p: 3, borderRadius: '12px', textAlign: 'center' }}>
          <Typography sx={{ fontSize: '14px', color: '#666', mb: 2 }}>
            Hạn nộp hồ sơ:{' '}
            <span style={{ color: '#00b14f', fontWeight: 800 }}>{formatDate(job.deadline)}</span>
            . Hãy ứng tuyển ngay hôm nay để không bỏ lỡ cơ hội hấp dẫn này!
          </Typography>

          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, flexWrap: 'wrap' }}>
            <Button
              variant="contained"
              startIcon={<SendIcon />}
              onClick={() => setIsApplyModalOpen(true)}
              sx={{
                backgroundColor: '#00b14f',
                color: '#ffffff',
                borderRadius: '24px',
                px: 4,
                py: 1.2,
                fontSize: '15px',
                fontWeight: 700,
                textTransform: 'none',
                boxShadow: '0 4px 14px rgba(0, 177, 79, 0.3)',
                '&:hover': { backgroundColor: '#009643' },
              }}
            >
              Ứng tuyển ngay
            </Button>
          </Box>
        </Box>
      </div>

      {/* Apply Job Modal */}
      <ApplyJobModal
        open={isApplyModalOpen}
        onClose={() => setIsApplyModalOpen(false)}
        job={job}
      />


      {/* Related Jobs Section */}
      {relatedJobs.length > 0 && (
        <Box sx={{ mt: 4 }}>
          <Typography variant="h6" className="job-section-title">
            Việc làm liên quan
          </Typography>

          {loadingRelated ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
              <CircularProgress size={30} sx={{ color: '#00b14f' }} />
            </Box>
          ) : (
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' },
                gap: 2,
                mt: 2,
              }}
            >
              {relatedJobs.map((item) => (
                <JobCard key={item.id} job={item} />
              ))}
            </Box>
          )}
        </Box>
      )}
    </Box>
  );
};

export default JobDetailMain;
