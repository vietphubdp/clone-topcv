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
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import { useNavigate } from 'react-router-dom';
import { registerCandidate } from '../../services/api';
import './RegisterCandidate.css';

const RegisterCandidate = () => {
  const navigate = useNavigate();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (password !== confirmPassword) {
      setErrorMsg('Mật khẩu nhập lại không khớp!');
      return;
    }

    if (password.length < 8) {
      setErrorMsg('Mật khẩu phải chứa tối thiểu 8 ký tự!');
      return;
    }

    setLoading(true);

    const payload = {
      email: email.trim(),
      password: password,
      full_name: fullName.trim(),
    };

    try {
      const res = await registerCandidate(payload);
      setSuccessMsg('Đăng ký tài khoản Ứng viên thành công!');
      if (res.access_token) {
        localStorage.setItem('access_token', res.access_token);
      }
      setTimeout(() => {
        navigate('/login');
      }, 1800);
    } catch (err) {
      console.error('Candidate Registration error:', err);
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
    <div className="register-candidate-page">
      {/* Left Geometric Decorative Green Pattern */}
      <svg className="register-candidate-left-pattern" viewBox="0 0 100 800" preserveAspectRatio="none">
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
      <div className="register-candidate-container">
        <div className="register-candidate-card">
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
              Đăng ký tài khoản Người ứng tuyển
            </Typography>
            <Typography sx={{ fontSize: '13px', color: '#666666', mt: 0.5 }}>
              Tạo hồ sơ chuyên nghiệp và tìm kiếm công việc mơ ước cùng TopCV
            </Typography>
          </Box>

          {/* Role Switching Tabs */}
          <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
            <Tabs
              value={0}
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
              <Tab label="Người ứng tuyển" />
              <Tab label="Nhà tuyển dụng" onClick={() => navigate('/register')} />
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

          {/* Candidate Registration Form */}
          <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {/* Full Name Field */}
            <Box>
              <Typography sx={{ fontSize: '13px', fontWeight: 700, color: '#333333', mb: 0.6 }}>
                Họ và tên <span style={{ color: '#e53935' }}>*</span>
              </Typography>
              <TextField
                fullWidth
                placeholder="Nhập họ và tên của bạn"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                variant="outlined"
                size="small"
                required
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonOutlinedIcon fontSize="small" sx={{ color: '#888888' }} />
                    </InputAdornment>
                  ),
                }}
                sx={commonTextFieldStyle}
              />
            </Box>

            {/* Email Field */}
            <Box>
              <Typography sx={{ fontSize: '13px', fontWeight: 700, color: '#333333', mb: 0.6 }}>
                Email đăng nhập <span style={{ color: '#e53935' }}>*</span>
              </Typography>
              <TextField
                fullWidth
                type="email"
                placeholder="Nhập email của bạn"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                variant="outlined"
                size="small"
                required
                sx={commonTextFieldStyle}
              />
            </Box>

            {/* Password Field */}
            <Box>
              <Typography sx={{ fontSize: '13px', fontWeight: 700, color: '#333333', mb: 0.6 }}>
                Mật khẩu <span style={{ color: '#e53935' }}>*</span>
              </Typography>
              <TextField
                fullWidth
                type={showPassword ? 'text' : 'password'}
                placeholder="Nhập mật khẩu (tối thiểu 8 ký tự)"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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

            {/* Confirm Password Field */}
            <Box>
              <Typography sx={{ fontSize: '13px', fontWeight: 700, color: '#333333', mb: 0.6 }}>
                Nhập lại mật khẩu <span style={{ color: '#e53935' }}>*</span>
              </Typography>
              <TextField
                fullWidth
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder="Xác nhận lại mật khẩu"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
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
              của TopCV.
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
                py: 1.1,
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
              {loading ? 'Đang đăng ký...' : 'Đăng ký Người ứng tuyển'}
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
            Bạn đã có tài khoản?{' '}
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
              <span style={{ color: '#00b14f', fontWeight: 700 }}>Nhánh 1</span> (giờ hành chính).
            </Typography>
          </Box>
        </div>
      </div>

      {/* Footer Copyright */}
      <div className="register-candidate-footer-copyright">
        © 2016. All Rights Reserved. TopCV Vietnam JSC.
      </div>
    </div>
  );
};

export default RegisterCandidate;
