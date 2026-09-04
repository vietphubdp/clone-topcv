import React from 'react';
import { Box, Typography, Button, Divider, Avatar } from '@mui/material';
import BusinessOutlinedIcon from '@mui/icons-material/BusinessOutlined';
import PeopleOutlinedIcon from '@mui/icons-material/PeopleOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import WcOutlinedIcon from '@mui/icons-material/WcOutlined';
import WorkOutlineOutlinedIcon from '@mui/icons-material/WorkOutlineOutlined';
import BadgeOutlinedIcon from '@mui/icons-material/BadgeOutlined';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import VerifiedIcon from '@mui/icons-material/Verified';

const CompanySidebar = () => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
      {/* Box 1: Company Profile */}
      <div className="sidebar-card">
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start', mb: 2 }}>
          <Avatar
            variant="rounded"
            sx={{
              width: 60,
              height: 60,
              backgroundColor: '#e8f5e9',
              color: '#00b14f',
              fontWeight: 800,
              fontSize: '20px',
              border: '1px solid #c8e6c9',
            }}
          >
            AC
          </Avatar>
          <Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <Typography
                sx={{
                  fontWeight: 700,
                  fontSize: '14.5px',
                  color: '#212f3f',
                  lineHeight: 1.3,
                }}
              >
                CÔNG TY TNHH PHÁT TRIỂN THƯƠNG MẠI Á CHÂU
              </Typography>
            </Box>
            <Typography sx={{ fontSize: '12px', color: '#00b14f', fontWeight: 600, mt: 0.5 }}>
              <VerifiedIcon sx={{ fontSize: '14px', mr: 0.3, verticalAlign: 'middle' }} />
              Đã xác thực
            </Typography>
          </Box>
        </Box>

        <Divider sx={{ mb: 2 }} />

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, mb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <PeopleOutlinedIcon sx={{ color: '#666', fontSize: '20px' }} />
            <Box>
              <Typography sx={{ fontSize: '12px', color: '#888' }}>Quy mô</Typography>
              <Typography sx={{ fontSize: '13.5px', fontWeight: 600, color: '#333' }}>
                100 - 499 nhân viên
              </Typography>
            </Box>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <BusinessOutlinedIcon sx={{ color: '#666', fontSize: '20px' }} />
            <Box>
              <Typography sx={{ fontSize: '12px', color: '#888' }}>Lĩnh vực</Typography>
              <Typography sx={{ fontSize: '13.5px', fontWeight: 600, color: '#333' }}>
                Bán lẻ / Thương mại điện tử
              </Typography>
            </Box>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <LocationOnOutlinedIcon sx={{ color: '#666', fontSize: '20px' }} />
            <Box>
              <Typography sx={{ fontSize: '12px', color: '#888' }}>Địa điểm</Typography>
              <Typography sx={{ fontSize: '13.5px', fontWeight: 600, color: '#333' }}>
                Đống Đa, Hà Nội
              </Typography>
            </Box>
          </Box>
        </Box>

        <Button
          fullWidth
          variant="outlined"
          endIcon={<ArrowForwardIcon />}
          sx={{
            borderColor: '#00b14f',
            color: '#00b14f',
            borderRadius: '20px',
            fontWeight: 700,
            fontSize: '13px',
            textTransform: 'none',
            '&:hover': {
              backgroundColor: '#e6f7ef',
              borderColor: '#00b14f',
            },
          }}
        >
          Xem trang công ty
        </Button>
      </div>

      {/* Box 2: General Info Overview */}
      <div className="sidebar-card">
        <Typography sx={{ fontWeight: 800, fontSize: '16px', color: '#212f3f', mb: 2 }}>
          Thông tin chung
        </Typography>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <BadgeOutlinedIcon sx={{ color: '#00b14f', fontSize: '22px' }} />
            <Box>
              <Typography sx={{ fontSize: '12px', color: '#888' }}>Cấp bậc</Typography>
              <Typography sx={{ fontSize: '14px', fontWeight: 700, color: '#212f3f' }}>
                Nhân viên
              </Typography>
            </Box>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <SchoolOutlinedIcon sx={{ color: '#00b14f', fontSize: '22px' }} />
            <Box>
              <Typography sx={{ fontSize: '12px', color: '#888' }}>Yêu cầu bằng cấp</Typography>
              <Typography sx={{ fontSize: '14px', fontWeight: 700, color: '#212f3f' }}>
                Cao đẳng trở lên
              </Typography>
            </Box>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <WcOutlinedIcon sx={{ color: '#00b14f', fontSize: '22px' }} />
            <Box>
              <Typography sx={{ fontSize: '12px', color: '#888' }}>Giới tính</Typography>
              <Typography sx={{ fontSize: '14px', fontWeight: 700, color: '#212f3f' }}>
                Không yêu cầu
              </Typography>
            </Box>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <PeopleOutlinedIcon sx={{ color: '#00b14f', fontSize: '22px' }} />
            <Box>
              <Typography sx={{ fontSize: '12px', color: '#888' }}>Số lượng tuyển</Typography>
              <Typography sx={{ fontSize: '14px', fontWeight: 700, color: '#212f3f' }}>
                5 người
              </Typography>
            </Box>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <WorkOutlineOutlinedIcon sx={{ color: '#00b14f', fontSize: '22px' }} />
            <Box>
              <Typography sx={{ fontSize: '12px', color: '#888' }}>Hình thức làm việc</Typography>
              <Typography sx={{ fontSize: '14px', fontWeight: 700, color: '#212f3f' }}>
                Toàn thời gian
              </Typography>
            </Box>
          </Box>
        </Box>
      </div>

      {/* Box 3: Career Tips Banner */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #00b14f 0%, #008037 100%)',
          borderRadius: '16px',
          p: 2.5,
          color: '#ffffff',
          boxShadow: '0 4px 16px rgba(0, 177, 79, 0.2)',
        }}
      >
        <Typography sx={{ fontWeight: 800, fontSize: '16px', mb: 1 }}>
          💡 Bí quyết tạo CV chuẩn TopCV
        </Typography>
        <Typography sx={{ fontSize: '13px', opacity: 0.9, lineHeight: 1.5, mb: 2 }}>
          Hơn 80% nhà tuyển dụng ưu tiên duyệt hồ sơ có CV được thiết kế theo chuẩn mẫu TopCV.
        </Typography>
        <Button
          variant="contained"
          size="small"
          sx={{
            backgroundColor: '#ffffff',
            color: '#00b14f',
            fontWeight: 800,
            borderRadius: '20px',
            textTransform: 'none',
            fontSize: '12.5px',
            px: 2,
            '&:hover': {
              backgroundColor: '#f0f0f0',
            },
          }}
        >
          Tạo CV ngay
        </Button>
      </Box>
    </Box>
  );
};

export default CompanySidebar;
