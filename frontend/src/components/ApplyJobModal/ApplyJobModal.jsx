import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Typography,
  Box,
  Alert,
  CircularProgress,
  IconButton,
  Divider,
  Paper,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import SendIcon from '@mui/icons-material/Send';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import BusinessIcon from '@mui/icons-material/Business';
import { createCV, applyJob } from '../../services/api';

const ApplyJobModal = ({ open, onClose, job }) => {
  const navigate = useNavigate();

  const [currentUser, setCurrentUser] = useState(null);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [summary, setSummary] = useState('');
  const [coverLetter, setCoverLetter] = useState('');

  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (open) {
      setSuccess(false);
      setErrorMsg('');
      try {
        const saved = localStorage.getItem('user');
        const user = saved ? JSON.parse(saved) : null;
        setCurrentUser(user);
        if (user) {
          setFullName(user.full_name || '');
          setEmail(user.email || '');
          setPhone(user.phone || '');
        }
      } catch {
        setCurrentUser(null);
      }
    }
  }, [open]);

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    if (!job?.id) {
      setErrorMsg('Không tìm thấy thông tin công việc để ứng tuyển.');
      return;
    }

    if (!fullName.trim() || !email.trim()) {
      setErrorMsg('Vui lòng nhập đầy đủ họ tên và email liên hệ.');
      return;
    }

    setSubmitting(true);
    setErrorMsg('');

    try {
      // 1. Create a CV record for candidate
      const cvPayload = {
        full_name: fullName.trim(),
        email: email.trim(),
        phone: phone.trim() || null,
        summary: summary.trim() || `Ứng tuyển vị trí ${job?.title || 'Công việc'}`,
        education: [],
        experience: [],
        skills: summary ? summary.split(',').map((s) => s.trim()).filter(Boolean) : [],
      };

      const cvRes = await createCV(cvPayload);
      const cvId = cvRes?.cv_id;

      if (!cvId) {
        throw new Error('Không thể khởi tạo hồ sơ ứng tuyển.');
      }

      // 2. Call Apply Job API
      await applyJob(job.id, {
        cv_id: cvId,
        cover_letter: coverLetter.trim() || `Tôi xin ứng tuyển vào vị trí ${job.title}. Rất mong có cơ hội phỏng vấn và trao đổi thêm.`,
      });

      setSuccess(true);
    } catch (err) {
      console.error('Error applying for job:', err);
      const msg =
        err?.response?.data?.message ||
        err?.response?.data?.detail ||
        err?.message ||
        'Có lỗi xảy ra khi nộp đơn ứng tuyển. Vui lòng thử lại.';
      setErrorMsg(msg);
    } finally {
      setSubmitting(false);
    }
  };

  const companyName =
    job?.company?.company_name || job?.company?.short_name || 'Nhà tuyển dụng';

  return (
    <Dialog
      open={open}
      onClose={submitting ? undefined : onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 3,
          p: { xs: 1, sm: 2 },
          boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
        },
      }}
    >
      <DialogTitle
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          pb: 1,
        }}
      >
        <Box>
          <Typography variant="h6" sx={{ fontWeight: 800, color: '#212f3f', fontSize: '18px' }}>
            Ứng tuyển việc làm
          </Typography>
          <Typography variant="body2" sx={{ color: '#00b14f', fontWeight: 600 }}>
            {job?.title}
          </Typography>
        </Box>
        <IconButton onClick={onClose} disabled={submitting} size="small">
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <Divider />

      <DialogContent sx={{ pt: 2.5 }}>
        {/* State: Not logged in */}
        {!currentUser && (
          <Box sx={{ textAlign: 'center', py: 3, px: 2 }}>
            <Box
              sx={{
                width: 64,
                height: 64,
                borderRadius: '50%',
                bgcolor: '#e6f7ef',
                color: '#00b14f',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mx: 'auto',
                mb: 2,
              }}
            >
              <LockOutlinedIcon sx={{ fontSize: 32 }} />
            </Box>
            <Typography variant="h6" sx={{ fontWeight: 700, color: '#212f3f', mb: 1 }}>
              Yêu cầu đăng nhập ứng viên
            </Typography>
            <Typography variant="body2" sx={{ color: '#666', mb: 3 }}>
              Bạn cần đăng nhập tài khoản Ứng viên (Candidate) để nộp hồ sơ trực tiếp vào vị trí này.
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, flexWrap: 'wrap' }}>
              <Button
                variant="contained"
                onClick={() => {
                  onClose();
                  navigate('/login');
                }}
                sx={{
                  bgcolor: '#00b14f',
                  borderRadius: '20px',
                  px: 3,
                  fontWeight: 700,
                  textTransform: 'none',
                  '&:hover': { bgcolor: '#009643' },
                }}
              >
                Đăng nhập ngay
              </Button>
              <Button
                variant="outlined"
                onClick={() => {
                  onClose();
                  navigate('/register-candidate');
                }}
                sx={{
                  color: '#00b14f',
                  borderColor: '#00b14f',
                  borderRadius: '20px',
                  px: 3,
                  fontWeight: 700,
                  textTransform: 'none',
                  '&:hover': { bgcolor: '#e6f7ef' },
                }}
              >
                Đăng ký tài khoản
              </Button>
            </Box>
          </Box>
        )}

        {/* State: Logged in as Employer */}
        {currentUser && currentUser.role === 'EMPLOYER' && (
          <Box sx={{ py: 2 }}>
            <Alert severity="warning" sx={{ borderRadius: 2 }}>
              Bạn đang đăng nhập bằng tài khoản <strong>Nhà tuyển dụng (Employer)</strong>. Vui lòng đăng nhập bằng tài khoản <strong>Ứng viên (Candidate)</strong> để có thể nộp đơn ứng tuyển.
            </Alert>
          </Box>
        )}

        {/* State: Success */}
        {currentUser && currentUser.role !== 'EMPLOYER' && success && (
          <Box sx={{ textAlign: 'center', py: 4, px: 2 }}>
            <CheckCircleOutlinedIcon sx={{ fontSize: 68, color: '#00b14f', mb: 1.5 }} />
            <Typography variant="h5" sx={{ fontWeight: 800, color: '#212f3f', mb: 1 }}>
              Ứng tuyển thành công!
            </Typography>

            <Typography variant="body2" sx={{ color: '#666', mb: 3 }}>
              Hồ sơ ứng tuyển của bạn đã được chuyển tới nhà tuyển dụng <strong>{companyName}</strong>. Nhà tuyển dụng sẽ xem xét và phản hồi sớm nhất có thể.
            </Typography>
            <Button
              variant="contained"
              onClick={onClose}
              sx={{
                bgcolor: '#00b14f',
                borderRadius: '20px',
                px: 4,
                py: 1,
                fontWeight: 700,
                textTransform: 'none',
                '&:hover': { bgcolor: '#009643' },
              }}
            >
              Đóng
            </Button>
          </Box>
        )}

        {/* State: Candidate Apply Form */}
        {currentUser && currentUser.role !== 'EMPLOYER' && !success && (
          <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {/* Job Summary Bar */}
            <Paper
              variant="outlined"
              sx={{
                p: 1.5,
                borderRadius: 2,
                bgcolor: '#f8fafc',
                display: 'flex',
                alignItems: 'center',
                gap: 1.5,
              }}
            >
              <BusinessIcon sx={{ color: '#00b14f' }} />
              <Box>
                <Typography sx={{ fontSize: '13px', color: '#666' }}>Ứng tuyển tới công ty:</Typography>
                <Typography sx={{ fontSize: '14.5px', fontWeight: 700, color: '#212f3f' }}>
                  {companyName}
                </Typography>
              </Box>
            </Paper>

            {errorMsg && (
              <Alert severity="error" sx={{ borderRadius: 2 }}>
                {errorMsg}
              </Alert>
            )}

            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2 }}>
              <TextField
                label="Họ và tên *"
                fullWidth
                size="small"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
                disabled={submitting}
              />
              <TextField
                label="Số điện thoại"
                fullWidth
                size="small"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                disabled={submitting}
              />
            </Box>

            <TextField
              label="Email liên hệ *"
              fullWidth
              size="small"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={submitting}
            />

            <TextField
              label="Tóm tắt kỹ năng & chuyên môn (CV tóm lược)"
              fullWidth
              multiline
              rows={2}
              placeholder="VD: 3 năm kinh nghiệm ReactJS, Next.js, REST API, Git..."
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              disabled={submitting}
            />

            <TextField
              label="Thư giới thiệu (Cover Letter)"
              fullWidth
              multiline
              rows={3}
              placeholder="Chia sẻ lý do bạn phù hợp với công việc này..."
              value={coverLetter}
              onChange={(e) => setCoverLetter(e.target.value)}
              disabled={submitting}
            />
          </Box>
        )}
      </DialogContent>

      {currentUser && currentUser.role !== 'EMPLOYER' && !success && (
        <DialogActions sx={{ px: 3, pb: 2, pt: 1, gap: 1 }}>
          <Button
            onClick={onClose}
            disabled={submitting}
            sx={{
              color: '#666',
              fontWeight: 600,
              textTransform: 'none',
              borderRadius: '20px',
              px: 2.5,
            }}
          >
            Hủy
          </Button>
          <Button
            variant="contained"
            onClick={handleSubmit}
            disabled={submitting}
            startIcon={submitting ? <CircularProgress size={18} color="inherit" /> : <SendIcon />}
            sx={{
              bgcolor: '#00b14f',
              color: '#ffffff',
              borderRadius: '20px',
              px: 3.5,
              fontWeight: 700,
              textTransform: 'none',
              '&:hover': { bgcolor: '#009643' },
            }}
          >
            {submitting ? 'Đang gửi hồ sơ...' : 'Nộp hồ sơ ứng tuyển'}
          </Button>
        </DialogActions>
      )}
    </Dialog>
  );
};

export default ApplyJobModal;
