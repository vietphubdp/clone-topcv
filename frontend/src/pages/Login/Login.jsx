import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  TextField,
  InputAdornment,
  IconButton,
  Divider,
  Alert,
  CircularProgress,
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../../services/api';
import './Login.css';

// SVG Icons for Google, Facebook, and LinkedIn
const GoogleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24">
    <path
      fill="#4285F4"
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
    />
    <path
      fill="#34A853"
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
    />
    <path
      fill="#FBBC05"
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
    />
    <path
      fill="#EA4335"
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
    />
  </svg>
);

const FacebookIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="#1877F2">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

const LinkedInIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="#0A66C2">
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.25V10.9H6.46M7.86 6.78a1.62 1.62 0 1 0 0 3.24 1.62 1.62 0 0 0 0-3.24z" />
  </svg>
);

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');
    setLoading(true);

    try {
      const res = await loginUser({
        email: email.trim(),
        password: password,
      });

      setSuccessMsg('Đăng nhập thành công!');
      if (res.access_token) {
        localStorage.setItem('access_token', res.access_token);
      }
      if (res.user) {
        localStorage.setItem('user', JSON.stringify(res.user));
      }

      setTimeout(() => {
        navigate('/');
      }, 1200);
    } catch (err) {
      console.error('Login error:', err);
      const apiMessage = err.response?.data?.message || 'Sai thông tin đăng nhập hoặc tài khoản không tồn tại!';
      setErrorMsg(apiMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      {/* Left Geometric Decorative Green Pattern */}
      <svg className="login-left-pattern" viewBox="0 0 100 800" preserveAspectRatio="none">
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

      {/* Main Centered Login Card */}
      <div className="login-container">
        <div className="login-card">
          {/* Header Logo & Title */}
          <Box sx={{ textAlign: 'center', mb: 3 }}>
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

            <Typography sx={{ fontSize: '15px', fontWeight: 700, color: '#333333' }}>
              Chào mừng quay trở lại
            </Typography>
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

          {/* Email / Password Form */}
          <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {/* Email Field */}
            <Box>
              <Typography sx={{ fontSize: '13px', fontWeight: 700, color: '#333333', mb: 0.6 }}>
                Email
              </Typography>
              <TextField
                fullWidth
                type="email"
                placeholder="Nhập email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                variant="outlined"
                size="small"
                required
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '8px',
                    fontSize: '14px',
                    '& fieldset': { borderColor: '#e0e0e0' },
                    '&:hover fieldset': { borderColor: '#00b14f' },
                    '&.Mui-focused fieldset': { borderColor: '#00b14f' },
                  },
                }}
              />
            </Box>

            {/* Password Field */}
            <Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0.6 }}>
                <Typography sx={{ fontSize: '13px', fontWeight: 700, color: '#333333' }}>
                  Password
                </Typography>
                <Typography
                  sx={{
                    fontSize: '13px',
                    fontWeight: 600,
                    color: '#00b14f',
                    cursor: 'pointer',
                    '&:hover': { textDecoration: 'underline' },
                  }}
                >
                  Quên mật khẩu
                </Typography>
              </Box>
              <TextField
                fullWidth
                type={showPassword ? 'text' : 'password'}
                placeholder="Nhập mật khẩu"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                variant="outlined"
                size="small"
                required
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
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '8px',
                    fontSize: '14px',
                    '& fieldset': { borderColor: '#e0e0e0' },
                    '&:hover fieldset': { borderColor: '#00b14f' },
                    '&.Mui-focused fieldset': { borderColor: '#00b14f' },
                  },
                }}
              />
            </Box>

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
              {loading ? 'Đang đăng nhập...' : 'Đăng nhập'}
            </Button>
          </Box>

          {/* Register Link */}
          <Typography
            sx={{
              textAlign: 'center',
              fontSize: '13px',
              color: '#555555',
              mt: 2.5,
            }}
          >
            Bạn chưa có tài khoản?{' '}
            <span
              style={{ color: '#00b14f', fontWeight: 700, cursor: 'pointer' }}
              onClick={() => navigate('/register-candidate')}
            >
              Đăng ký ngay
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
      <div className="login-footer-copyright">
        © 2016. All Rights Reserved. TopCV Vietnam JSC.
      </div>
    </div>
  );
};

export default Login;
