import React from 'react';
import { Box, Typography, Button, Divider, Avatar } from '@mui/material';
import BusinessOutlinedIcon from '@mui/icons-material/BusinessOutlined';
import PeopleOutlinedIcon from '@mui/icons-material/PeopleOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import LanguageOutlinedIcon from '@mui/icons-material/LanguageOutlined';
import ReceiptLongOutlinedIcon from '@mui/icons-material/ReceiptLongOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import WcOutlinedIcon from '@mui/icons-material/WcOutlined';
import WorkOutlineOutlinedIcon from '@mui/icons-material/WorkOutlineOutlined';
import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import VerifiedIcon from '@mui/icons-material/Verified';

const mapJobType = (type) => {
  switch (type) {
    case 'FULL_TIME':
      return 'Toàn thời gian';
    case 'PART_TIME':
      return 'Bán thời gian';
    case 'FREELANCE':
      return 'Freelance / Tự do';
    case 'INTERNSHIP':
      return 'Thực tập sinh';
    default:
      return type || 'Toàn thời gian';
  }
};

const mapGender = (gender) => {
  switch (gender) {
    case 'MALE':
      return 'Nam';
    case 'FEMALE':
      return 'Nữ';
    case 'NOT_REQUIRED':
      return 'Không yêu cầu';
    default:
      return gender || 'Không yêu cầu';
  }
};

const CompanySidebar = ({ company = {}, job = {} }) => {
  const companyName = company.company_name || company.short_name || 'Nhà tuyển dụng';
  const logoInitials = companyName.substring(0, 2).toUpperCase();

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
      {/* Box 1: Company Profile (Lấy từ thông tin tài khoản NTD) */}
      <div className="sidebar-card">
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start', mb: 2 }}>
          {company.logo_url ? (
            <Avatar
              variant="rounded"
              src={company.logo_url}
              alt={companyName}
              sx={{
                width: 60,
                height: 60,
                border: '1px solid #eef2f5',
                backgroundColor: '#ffffff',
              }}
            />
          ) : (
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
              {logoInitials}
            </Avatar>
          )}

          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Typography
              sx={{
                fontWeight: 700,
                fontSize: '14.5px',
                color: '#212f3f',
                lineHeight: 1.35,
              }}
            >
              {companyName}
            </Typography>

            {company.verification_tier === 'VERIFIED' && (
              <Typography sx={{ fontSize: '12px', color: '#00b14f', fontWeight: 600, mt: 0.5 }}>
                <VerifiedIcon sx={{ fontSize: '14px', mr: 0.3, verticalAlign: 'middle' }} />
                Đã xác thực
              </Typography>
            )}
          </Box>
        </Box>

        <Divider sx={{ mb: 2 }} />

        {/* Company Attributes from API */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
          {company.company_size && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <PeopleOutlinedIcon sx={{ color: '#00b14f', fontSize: '20px' }} />
              <Box>
                <Typography sx={{ fontSize: '12px', color: '#888' }}>Quy mô công ty</Typography>
                <Typography sx={{ fontSize: '13.5px', fontWeight: 600, color: '#333' }}>
                  {company.company_size}
                </Typography>
              </Box>
            </Box>
          )}

          {company.category && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <BusinessOutlinedIcon sx={{ color: '#00b14f', fontSize: '20px' }} />
              <Box>
                <Typography sx={{ fontSize: '12px', color: '#888' }}>Lĩnh vực hoạt động</Typography>
                <Typography sx={{ fontSize: '13.5px', fontWeight: 600, color: '#333' }}>
                  {company.category}
                </Typography>
              </Box>
            </Box>
          )}

          {company.headquarters_address && (
            <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5 }}>
              <LocationOnOutlinedIcon sx={{ color: '#00b14f', fontSize: '20px', mt: 0.2 }} />
              <Box>
                <Typography sx={{ fontSize: '12px', color: '#888' }}>Địa chỉ trụ sở</Typography>
                <Typography sx={{ fontSize: '13px', fontWeight: 500, color: '#333', lineHeight: 1.4 }}>
                  {company.headquarters_address}
                </Typography>
              </Box>
            </Box>
          )}

          {company.website && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <LanguageOutlinedIcon sx={{ color: '#00b14f', fontSize: '20px' }} />
              <Box sx={{ minWidth: 0, overflow: 'hidden' }}>
                <Typography sx={{ fontSize: '12px', color: '#888' }}>Website</Typography>
                <Typography
                  component="a"
                  href={company.website.startsWith('http') ? company.website : `https://${company.website}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    fontSize: '13.5px',
                    fontWeight: 600,
                    color: '#00b14f',
                    textDecoration: 'none',
                    display: 'block',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    '&:hover': { textDecoration: 'underline' },
                  }}
                >
                  {company.website}
                </Typography>
              </Box>
            </Box>
          )}

          {company.tax_code && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <ReceiptLongOutlinedIcon sx={{ color: '#00b14f', fontSize: '20px' }} />
              <Box>
                <Typography sx={{ fontSize: '12px', color: '#888' }}>Mã số thuế</Typography>
                <Typography sx={{ fontSize: '13.5px', fontWeight: 600, color: '#333' }}>
                  {company.tax_code}
                </Typography>
              </Box>
            </Box>
          )}

          {company.director && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <PersonOutlineOutlinedIcon sx={{ color: '#00b14f', fontSize: '20px' }} />
              <Box>
                <Typography sx={{ fontSize: '12px', color: '#888' }}>Đại diện pháp luật</Typography>
                <Typography sx={{ fontSize: '13.5px', fontWeight: 600, color: '#333' }}>
                  {company.director}
                </Typography>
              </Box>
            </Box>
          )}
        </Box>
      </div>

      {/* Box 2: Job Overview (Thông tin chung về Job lấy chuẩn từ API) */}
      <div className="sidebar-card">
        <Typography sx={{ fontWeight: 800, fontSize: '16px', color: '#212f3f', mb: 2 }}>
          Thông tin chung
        </Typography>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {/* Ngành nghề */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <CategoryOutlinedIcon sx={{ color: '#00b14f', fontSize: '22px' }} />
            <Box>
              <Typography sx={{ fontSize: '12px', color: '#888' }}>Ngành nghề / Chuyên môn</Typography>
              <Typography sx={{ fontSize: '14px', fontWeight: 700, color: '#212f3f' }}>
                {job.category}
                {job.specialty ? ` - ${job.specialty}` : ''}
              </Typography>
            </Box>
          </Box>

          {/* Hình thức làm việc */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <WorkOutlineOutlinedIcon sx={{ color: '#00b14f', fontSize: '22px' }} />
            <Box>
              <Typography sx={{ fontSize: '12px', color: '#888' }}>Hình thức làm việc</Typography>
              <Typography sx={{ fontSize: '14px', fontWeight: 700, color: '#212f3f' }}>
                {mapJobType(job.job_type)}
              </Typography>
            </Box>
          </Box>

          {/* Kinh nghiệm */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <AccessTimeOutlinedIcon sx={{ color: '#00b14f', fontSize: '22px' }} />
            <Box>
              <Typography sx={{ fontSize: '12px', color: '#888' }}>Kinh nghiệm yêu cầu</Typography>
              <Typography sx={{ fontSize: '14px', fontWeight: 700, color: '#212f3f' }}>
                {job.experience_level || 'Không yêu cầu'}
              </Typography>
            </Box>
          </Box>

          {/* Giới tính */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <WcOutlinedIcon sx={{ color: '#00b14f', fontSize: '22px' }} />
            <Box>
              <Typography sx={{ fontSize: '12px', color: '#888' }}>Giới tính</Typography>
              <Typography sx={{ fontSize: '14px', fontWeight: 700, color: '#212f3f' }}>
                {mapGender(job.gender)}
              </Typography>
            </Box>
          </Box>

          {/* Số lượng tuyển */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <PeopleOutlinedIcon sx={{ color: '#00b14f', fontSize: '22px' }} />
            <Box>
              <Typography sx={{ fontSize: '12px', color: '#888' }}>Số lượng tuyển</Typography>
              <Typography sx={{ fontSize: '14px', fontWeight: 700, color: '#212f3f' }}>
                {job.quantity ? `${job.quantity} người` : 'Không giới hạn'}
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
          Hơn 80% nhà tuyển dụng ưu tiên duyệt hồ sơ có CV được thiết kế chuẩn chuyên nghiệp.
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
