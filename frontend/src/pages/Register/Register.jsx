import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  TextField,
  InputAdornment,
  IconButton,
  Alert,
  CircularProgress,
  Tabs,
  Tab,
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import BusinessIcon from '@mui/icons-material/Business';
import { useNavigate } from 'react-router-dom';
import { registerCompany } from '../../services/api';
import './Register.css';

const Register = () => {
  const navigate = useNavigate();

  // Employer Registration Form State according to CompanyRegisterRequest schema
  const [formData, setFormData] = useState({
    tax_code: '',
    company_name: '',
    international_name: '',
    short_name: '',
    director: '',
    headquarters_address: '',
    email: '',
    phone_number: '',
    website: '',
    password: '',
    confirmPassword: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handleChange = (field) => (e) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (formData.password !== formData.confirmPassword) {
      setErrorMsg('Mật khẩu nhập lại không khớp!');
      return;
    }

    if (formData.password.length < 8) {
      setErrorMsg('Mật khẩu phải chứa tối thiểu 8 ký tự!');
      return;
    }

    setLoading(true);

    const payload = {
      tax_code: formData.tax_code.trim(),
      company_name: formData.company_name.trim(),
      international_name: formData.international_name.trim() || null,
      short_name: formData.short_name.trim() || null,
      director: formData.director.trim() || null,
      headquarters_address: formData.headquarters_address.trim() || null,
      email: formData.email.trim(),
      phone_number: formData.phone_number.trim(),
      website: formData.website.trim() || null,
      password: formData.password,
    };

    try {
      const res = await registerCompany(payload);
      setSuccessMsg(res.message || 'Đăng ký tài khoản doanh nghiệp thành công!');
      setTimeout(() => {
        navigate('/login');
      }, 1800);
    } catch (err) {
      console.error('Registration error:', err);
      const apiMessage = err.response?.data?.message || 'Đăng ký thất bại. Vui lòng kiểm tra lại thông tin!';
      setErrorMsg(apiMessage);
    } finally {
      setLoading(false);
    }
  };

  const commonTextFieldStyle = {
    '& .MuiOutlinedInput-root': {
      borderRadius: '8px',
      fontSize: '14px',
      '& fieldset': { borderColor: '#e0e0e0' },
      '&:hover fieldset': { borderColor: '#00b14f' },
      '&.Mui-focused fieldset': { borderColor: '#00b14f' },
    },
  };

  return (
    <div className="register-page">
      {/* Left Geometric Decorative Green Pattern */}
      <svg className="register-left-pattern" viewBox="0 0 100 800" preserveAspectRatio="none">
        <path
          d="M -20 0 L 60 200 L -20 400 L 60 600 L -20 800"
          fill="none"
          stroke="#00b14f"
          strokeWidth="3"
          strokeDasharray="4 4"
          opacity="0.5"
        />
        <path
          d="M -40 0 L 40 200 L -40 400 L 40 600 L -40 800"
          fill="none"
          stroke="#00b14f"
          strokeWidth="2"
          opacity="0.3"
        />
      </svg>

      {/* Main Centered Register Card */}
      <div className="register-container">
        <div className="register-card">
          {/* Header Logo & Title */}
          <Box sx={{ textAlign: 'center', mb: 2.5 }}>
            <Box
              onClick={() => navigate('/')}
              sx={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                cursor: 'pointer',
                mb: 0.5,
              }}
            >
              <Typography
                sx={{
                  fontSize: '28px',
                  fontWeight: 900,
                  color: '#212f3f',
                  letterSpacing: '-0.5px',
                }}
              >
                top<span style={{ color: '#00b14f' }}>cv</span>
              </Typography>
              <Box
                sx={{
                  width: '20px',
                  height: '20px',
                  background: 'linear-gradient(135deg, #00b14f 0%, #008037 100%)',
                  borderRadius: '50% 50% 50% 0',
                  transform: 'rotate(-10deg)',
                }}
              />
            </Box>

            <Typography sx={{ fontSize: '18px', fontWeight: 800, color: '#333333' }}>
              Đăng ký tài khoản Nhà tuyển dụng
            </Typography>
            <Typography sx={{ fontSize: '13px', color: '#666666', mt: 0.5 }}>
              Cùng kết nối và tìm kiếm nhân tài hàng đầu cho doanh nghiệp của bạn
            </Typography>
          </Box>

          {/* Role Switching Tabs */}
          <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
            <Tabs
              value={1}
              variant="fullWidth"
              sx={{
                '& .MuiTabs-indicator': { backgroundColor: '#00b14f', height: 3 },
                '& .MuiTab-root': {
                  textTransform: 'none',
                  fontWeight: 700,
                  fontSize: '13.5px',
                  color: '#666666',
                  '&.Mui-selected': { color: '#00b14f' },
                },
              }}
            >
              <Tab label="Người ứng tuyển" onClick={() => navigate('/register-candidate')} />
              <Tab label="Nhà tuyển dụng" />
            </Tabs>
          </Box>

          {errorMsg && (
            <Alert severity="error" sx={{ mb: 2.5, borderRadius: '8px', fontSize: '13.5px' }}>
              {errorMsg}
            </Alert>
          )}

          {successMsg && (
            <Alert severity="success" sx={{ mb: 2.5, borderRadius: '8px', fontSize: '13.5px' }}>
              {successMsg}
            </Alert>
          )}

          {/* Employer Registration Form */}
          <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2.2 }}>
            
            {/* Section 1: Business Details Header */}
            <Typography
              sx={{
                fontSize: '14px',
                fontWeight: 700,
                color: '#00b14f',
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                borderBottom: '1px solid #eef2f5',
                pb: 0.8,
              }}
            >
              <BusinessIcon fontSize="small" /> Thông tin Doanh nghiệp
            </Typography>

            {/* Row 1: Tax Code & Company Name */}
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2 }}>
              <Box>
                <Typography sx={{ fontSize: '13px', fontWeight: 700, color: '#333333', mb: 0.6 }}>
                  Mã số thuế <span style={{ color: '#e53935' }}>*</span>
                </Typography>
                <TextField
                  fullWidth
                  placeholder="Ví dụ: 0101234567"
                  value={formData.tax_code}
                  onChange={handleChange('tax_code')}
                  variant="outlined"
                  size="small"
                  required
                  sx={commonTextFieldStyle}
                />
              </Box>

              <Box>
                <Typography sx={{ fontSize: '13px', fontWeight: 700, color: '#333333', mb: 0.6 }}>
                  Tên công ty <span style={{ color: '#e53935' }}>*</span>
                </Typography>
                <TextField
                  fullWidth
                  placeholder="Nhập tên công ty"
                  value={formData.company_name}
                  onChange={handleChange('company_name')}
                  variant="outlined"
                  size="small"
                  required
                  sx={commonTextFieldStyle}
                />
              </Box>
            </Box>

            {/* Row 2: International Name & Short Name */}
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2 }}>
              <Box>
                <Typography sx={{ fontSize: '13px', fontWeight: 700, color: '#333333', mb: 0.6 }}>
                  Tên tiếng Anh / Quốc tế
                </Typography>
                <TextField
                  fullWidth
                  placeholder="Tên bằng tiếng Anh (nếu có)"
                  value={formData.international_name}
                  onChange={handleChange('international_name')}
                  variant="outlined"
                  size="small"
                  sx={commonTextFieldStyle}
                />
              </Box>

              <Box>
                <Typography sx={{ fontSize: '13px', fontWeight: 700, color: '#333333', mb: 0.6 }}>
                  Tên viết tắt
                </Typography>
                <TextField
                  fullWidth
                  placeholder="Tên viết tắt công ty"
                  value={formData.short_name}
                  onChange={handleChange('short_name')}
                  variant="outlined"
                  size="small"
                  sx={commonTextFieldStyle}
                />
              </Box>
            </Box>

            {/* Row 3: Director & Phone Number */}
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2 }}>
              <Box>
                <Typography sx={{ fontSize: '13px', fontWeight: 700, color: '#333333', mb: 0.6 }}>
                  Người đại diện / Giám đốc
                </Typography>
                <TextField
                  fullWidth
                  placeholder="Họ và tên người đại diện"
                  value={formData.director}
                  onChange={handleChange('director')}
                  variant="outlined"
                  size="small"
                  sx={commonTextFieldStyle}
                />
              </Box>

              <Box>
                <Typography sx={{ fontSize: '13px', fontWeight: 700, color: '#333333', mb: 0.6 }}>
                  Số điện thoại liên hệ <span style={{ color: '#e53935' }}>*</span>
                </Typography>
                <TextField
                  fullWidth
                  placeholder="Nhập số điện thoại"
                  value={formData.phone_number}
                  onChange={handleChange('phone_number')}
                  variant="outlined"
                  size="small"
                  required
                  sx={commonTextFieldStyle}
                />
              </Box>
            </Box>

            {/* Row 4: Headquarters Address & Website */}
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2 }}>
              <Box>
                <Typography sx={{ fontSize: '13px', fontWeight: 700, color: '#333333', mb: 0.6 }}>
                  Địa chỉ trụ sở chính
                </Typography>
                <TextField
                  fullWidth
                  placeholder="Số nhà, tên đường, quận/huyện..."
                  value={formData.headquarters_address}
                  onChange={handleChange('headquarters_address')}
                  variant="outlined"
                  size="small"
                  sx={commonTextFieldStyle}
                />
              </Box>

              <Box>
                <Typography sx={{ fontSize: '13px', fontWeight: 700, color: '#333333', mb: 0.6 }}>
                  Website công ty
                </Typography>
                <TextField
                  fullWidth
                  placeholder="https://example.com"
                  value={formData.website}
                  onChange={handleChange('website')}
                  variant="outlined"
                  size="small"
                  sx={commonTextFieldStyle}
                />
              </Box>
            </Box>

            {/* Section 2: Account Login Details */}
            <Typography
              sx={{
                fontSize: '14px',
                fontWeight: 700,
                color: '#00b14f',
                mt: 1,
                borderBottom: '1px solid #eef2f5',
                pb: 0.8,
              }}
            >
              Thông tin Tài khoản Đăng nhập
            </Typography>

            {/* Email Field */}
            <Box>
              <Typography sx={{ fontSize: '13px', fontWeight: 700, color: '#333333', mb: 0.6 }}>
                Email đăng nhập <span style={{ color: '#e53935' }}>*</span>
              </Typography>
              <TextField
                fullWidth
                type="email"
                placeholder="email@company.com"
                value={formData.email}
                onChange={handleChange('email')}
                variant="outlined"
                size="small"
                required
                sx={commonTextFieldStyle}
              />
            </Box>

            {/* Passwords Row */}
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2 }}>
              {/* Password */}
              <Box>
                <Typography sx={{ fontSize: '13px', fontWeight: 700, color: '#333333', mb: 0.6 }}>
                  Mật khẩu <span style={{ color: '#e53935' }}>*</span>
                </Typography>
                <TextField
                  fullWidth
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Mật khẩu (tối thiểu 8 ký tự)"
                  value={formData.password}
                  onChange={handleChange('password')}
                  variant="outlined"
                  size="small"
                  required
                  inputProps={{ minLength: 8 }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          size="small"
                          onClick={() => setShowPassword(!showPassword)}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  sx={commonTextFieldStyle}
                />
              </Box>

              {/* Confirm Password */}
              <Box>
                <Typography sx={{ fontSize: '13px', fontWeight: 700, color: '#333333', mb: 0.6 }}>
                  Nhập lại mật khẩu <span style={{ color: '#e53935' }}>*</span>
                </Typography>
                <TextField
                  fullWidth
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="Xác nhận mật khẩu"
                  value={formData.confirmPassword}
                  onChange={handleChange('confirmPassword')}
                  variant="outlined"
                  size="small"
                  required
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          size="small"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          edge="end"
                        >
                          {showConfirmPassword ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  sx={commonTextFieldStyle}
                />
              </Box>
            </Box>

            {/* Terms Disclaimer */}
            <Typography sx={{ fontSize: '11.5px', color: '#666666', mt: 0.5, lineHeight: 1.4 }}>
              Bằng việc đăng ký, bạn đã đồng ý với{' '}
              <span style={{ color: '#00b14f', cursor: 'pointer', fontWeight: 600 }}>
                Điều khoản dịch vụ
              </span>{' '}
              và{' '}
              <span style={{ color: '#00b14f', cursor: 'pointer', fontWeight: 600 }}>
                Chính sách bảo mật
              </span>{' '}
              của TopCV dành cho Nhà tuyển dụng.
            </Typography>

            {/* Submit Button */}
            <Button
              type="submit"
              variant="contained"
              disabled={loading}
              endIcon={loading ? <CircularProgress size={20} color="inherit" /> : <ArrowForwardIcon />}
              sx={{
                backgroundColor: '#00b14f',
                color: '#ffffff',
                borderRadius: '24px',
                py: 1.2,
                fontSize: '15px',
                fontWeight: 700,
                textTransform: 'none',
                mt: 1,
                boxShadow: '0 4px 12px rgba(0, 177, 79, 0.3)',
                '&:hover': {
                  backgroundColor: '#009643',
                },
                '&.Mui-disabled': {
                  backgroundColor: '#80e0a7',
                  color: '#ffffff',
                },
              }}
            >
              {loading ? 'Đang đăng ký...' : 'Đăng ký Nhà tuyển dụng'}
            </Button>
          </Box>

          {/* Login Navigation Link */}
          <Typography
            sx={{
              textAlign: 'center',
              fontSize: '13px',
              color: '#555555',
              mt: 2.5,
            }}
          >
            Bạn đã có tài khoản Nhà tuyển dụng?{' '}
            <span
              style={{ color: '#00b14f', fontWeight: 700, cursor: 'pointer' }}
              onClick={() => navigate('/login')}
            >
              Đăng nhập ngay
            </span>
          </Typography>

          {/* Hotline Support Note Box */}
          <Box
            sx={{
              mt: 3,
              pt: 2,
              borderTop: '1px solid #f0f0f0',
              textAlign: 'center',
            }}
          >
            <Typography sx={{ fontSize: '11.5px', color: '#777777', lineHeight: 1.5 }}>
              Bạn gặp khó khăn khi tạo tài khoản? Vui lòng gọi tới số{' '}
              <span style={{ color: '#00b14f', fontWeight: 700 }}>1900 068 889</span> |{' '}
              <span style={{ color: '#00b14f', fontWeight: 700 }}>Nhánh 2</span> (giờ hành chính).
            </Typography>
          </Box>
        </div>
      </div>

      {/* Footer Copyright */}
      <div className="register-footer-copyright">
        © 2016. All Rights Reserved. TopCV Vietnam JSC.
      </div>
    </div>
  );
};

export default Register;
