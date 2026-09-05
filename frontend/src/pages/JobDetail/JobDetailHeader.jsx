import React from 'react';
import { Box, Typography, Button, Chip } from '@mui/material';
import MonetizationOnOutlinedIcon from '@mui/icons-material/MonetizationOnOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import SendIcon from '@mui/icons-material/Send';
import VerifiedIcon from '@mui/icons-material/Verified';
import FlashOnIcon from '@mui/icons-material/FlashOn';

const formatSalary = (salary) => {
  if (!salary) return 'Thỏa thuận';
  const { type, min, max, is_negotiable } = salary;
  if (is_negotiable || type === 'AGREEMENT') return 'Thỏa thuận';
  if (type === 'RANGE' && min && max) {
    return `${(min / 1000000).toLocaleString('vi-VN')} - ${(max / 1000000).toLocaleString('vi-VN')} triệu`;
  }
  if ((type === 'UP_TO' || !min) && max) {
    return `Tới ${(max / 1000000).toLocaleString('vi-VN')} triệu`;
  }
  if ((type === 'MINIMUM' || !max) && min) {
    return `Từ ${(min / 1000000).toLocaleString('vi-VN')} triệu`;
  }
  return 'Thỏa thuận';
};

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

const JobDetailHeader = ({ job }) => {
  if (!job) return null;

  const company = job.company || {};
  const companyName = company.company_name || company.short_name || 'Công ty';
  const salaryText = formatSalary(job.salary);

  const locationText =
    Array.isArray(job.work_location) && job.work_location.length > 0
      ? job.work_location
          .map((loc) => loc.city_name || loc.address_detail)
          .filter(Boolean)
          .join(', ') || 'Toàn quốc'
      : 'Toàn quốc';

  const deadlineText = formatDate(job.deadline);

  return (
    <div className="job-detail-header-card">
      {/* Title & Company Name */}
      <Box sx={{ mb: 2.5 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1, flexWrap: 'wrap' }}>
          {job.is_hot && (
            <Chip
              icon={<FlashOnIcon sx={{ fontSize: '14px !important', color: '#ffffff !important' }} />}
              label="TUYỂN GẤP"
              size="small"
              sx={{
                backgroundColor: '#ef4444',
                color: '#ffffff',
                fontWeight: 800,
                fontSize: '11px',
                height: '22px',
              }}
            />
          )}
          <Typography
            variant="h4"
            sx={{
              fontWeight: 800,
              fontSize: { xs: '20px', md: '24px' },
              color: '#212f3f',
              lineHeight: 1.3,
            }}
          >
            {job.title}
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
          <Typography
            sx={{
              fontWeight: 700,
              fontSize: '15px',
              color: '#00b14f',
            }}
          >
            {companyName}
          </Typography>

          {company.verification_tier === 'VERIFIED' && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.3, color: '#00b14f' }}>
              <VerifiedIcon sx={{ fontSize: '18px' }} />
              <Typography sx={{ fontSize: '12px', fontWeight: 700 }}>Đã xác thực</Typography>
            </Box>
          )}

          {company.category && (
            <Chip
              label={company.category}
              size="small"
              sx={{
                backgroundColor: '#e6f7ef',
                color: '#00b14f',
                fontWeight: 600,
                fontSize: '11px',
                height: '22px',
              }}
            />
          )}
        </Box>
      </Box>

      {/* 3 Key Highlights Grid */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: 'repeat(3, 1fr)' },
          gap: 2,
          p: 2,
          backgroundColor: '#f8fafc',
          borderRadius: '12px',
          mb: 2.5,
          border: '1px solid #eef2f5',
        }}
      >
        {/* Salary */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Box
            sx={{
              width: 44,
              height: 44,
              borderRadius: '50%',
              backgroundColor: '#e6f7ef',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#00b14f',
            }}
          >
            <MonetizationOnOutlinedIcon />
          </Box>
          <Box>
            <Typography sx={{ fontSize: '12.5px', color: '#666666' }}>Mức lương</Typography>
            <Typography sx={{ fontSize: '15px', fontWeight: 800, color: '#00b14f' }}>
              {salaryText}
            </Typography>
          </Box>
        </Box>

        {/* Location */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Box
            sx={{
              width: 44,
              height: 44,
              borderRadius: '50%',
              backgroundColor: '#e6f7ef',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#00b14f',
            }}
          >
            <LocationOnOutlinedIcon />
          </Box>
          <Box>
            <Typography sx={{ fontSize: '12.5px', color: '#666666' }}>Địa điểm</Typography>
            <Typography sx={{ fontSize: '15px', fontWeight: 700, color: '#212f3f' }}>
              {locationText}
            </Typography>
          </Box>
        </Box>

        {/* Experience */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Box
            sx={{
              width: 44,
              height: 44,
              borderRadius: '50%',
              backgroundColor: '#e6f7ef',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#00b14f',
            }}
          >
            <AccessTimeOutlinedIcon />
          </Box>
          <Box>
            <Typography sx={{ fontSize: '12.5px', color: '#666666' }}>Kinh nghiệm</Typography>
            <Typography sx={{ fontSize: '15px', fontWeight: 700, color: '#212f3f' }}>
              {job.experience_level || 'Không yêu cầu'}
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Deadline & Actions */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 2,
        }}
      >
        <Typography sx={{ fontSize: '13.5px', color: '#666666', fontWeight: 500 }}>
          Hạn nộp hồ sơ:{' '}
          <span style={{ color: '#212f3f', fontWeight: 700 }}>{deadlineText}</span>
        </Typography>

        <Box sx={{ display: 'flex', gap: 1.5 }}>
          <Button
            variant="contained"
            startIcon={<SendIcon />}
            sx={{
              backgroundColor: '#00b14f',
              color: '#ffffff',
              borderRadius: '24px',
              px: 3.5,
              py: 1,
              fontWeight: 700,
              fontSize: '14.5px',
              textTransform: 'none',
              boxShadow: '0 4px 14px rgba(0, 177, 79, 0.3)',
              '&:hover': {
                backgroundColor: '#009643',
              },
            }}
            onClick={() => alert('Ứng tuyển thành công! Nhà tuyển dụng sẽ xem xét hồ sơ của bạn.')}
          >
            Ứng tuyển ngay
          </Button>
        </Box>
      </Box>
    </div>
  );
};

export default JobDetailHeader;
