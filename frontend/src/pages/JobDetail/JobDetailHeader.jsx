import React, { useState } from 'react';
import { Box, Typography, Button, Chip } from '@mui/material';
import MonetizationOnOutlinedIcon from '@mui/icons-material/MonetizationOnOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import SendIcon from '@mui/icons-material/Send';
import VerifiedIcon from '@mui/icons-material/Verified';

const JobDetailHeader = () => {
  const [isSaved, setIsSaved] = useState(false);

  return (
    <div className="job-detail-header-card">
      {/* Title & Company Name */}
      <Box sx={{ mb: 2.5 }}>
        <Typography
          variant="h4"
          sx={{
            fontWeight: 800,
            fontSize: { xs: '20px', md: '24px' },
            color: '#212f3f',
            mb: 1,
            lineHeight: 1.3,
          }}
        >
          NHÂN VIÊN KINH DOANH - THU NHẬP 15 - 30 TRIỆU
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
          <Typography
            sx={{
              fontWeight: 700,
              fontSize: '15px',
              color: '#00b14f',
              cursor: 'pointer',
              '&:hover': { textDecoration: 'underline' },
            }}
          >
            CÔNG TY TNHH PHÁT TRIỂN THƯƠNG MẠI Á CHÂU
          </Typography>
          <VerifiedIcon sx={{ color: '#00b14f', fontSize: '18px' }} />
          <Chip
            label="TOP DOANH NGHIỆP"
            size="small"
            sx={{
              backgroundColor: '#e6f7ef',
              color: '#00b14f',
              fontWeight: 700,
              fontSize: '11px',
              height: '22px',
            }}
          />
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
              justify: 'center',
              color: '#00b14f',
            }}
          >
            <MonetizationOnOutlinedIcon />
          </Box>
          <Box>
            <Typography sx={{ fontSize: '12.5px', color: '#666666' }}>Mức lương</Typography>
            <Typography sx={{ fontSize: '15px', fontWeight: 800, color: '#00b14f' }}>
              15 - 30 triệu
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
              justify: 'center',
              color: '#00b14f',
            }}
          >
            <LocationOnOutlinedIcon />
          </Box>
          <Box>
            <Typography sx={{ fontSize: '12.5px', color: '#666666' }}>Địa điểm</Typography>
            <Typography sx={{ fontSize: '15px', fontWeight: 700, color: '#212f3f' }}>
              Hà Nội
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
              justify: 'center',
              color: '#00b14f',
            }}
          >
            <AccessTimeOutlinedIcon />
          </Box>
          <Box>
            <Typography sx={{ fontSize: '12.5px', color: '#666666' }}>Kinh nghiệm</Typography>
            <Typography sx={{ fontSize: '15px', fontWeight: 700, color: '#212f3f' }}>
              1 năm
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Deadline & Actions */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justify: 'space-between',
          flexWrap: 'wrap',
          gap: 2,
        }}
      >
        <Typography sx={{ fontSize: '13.5px', color: '#666666', fontWeight: 500 }}>
          Hạn nộp hồ sơ:{' '}
          <span style={{ color: '#212f3f', fontWeight: 700 }}>30/09/2026</span>
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
            onClick={() => alert('Ứng tuyển thành công! Nhà tuyển dụng sẽ sớm liên hệ với bạn.')}
          >
            Ứng tuyển ngay
          </Button>

          <Button
            variant="outlined"
            startIcon={isSaved ? <FavoriteIcon sx={{ color: '#00b14f' }} /> : <FavoriteBorderIcon />}
            onClick={() => setIsSaved(!isSaved)}
            sx={{
              borderColor: '#00b14f',
              color: '#00b14f',
              borderRadius: '24px',
              px: 2.5,
              py: 1,
              fontWeight: 700,
              fontSize: '14px',
              textTransform: 'none',
              '&:hover': {
                backgroundColor: '#e6f7ef',
                borderColor: '#00b14f',
              },
            }}
          >
            {isSaved ? 'Đã lưu tin' : 'Lưu tin'}
          </Button>
        </Box>
      </Box>
    </div>
  );
};

export default JobDetailHeader;
