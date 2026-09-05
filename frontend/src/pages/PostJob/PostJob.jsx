import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Box,
  Typography,
  TextField,
  MenuItem,
  Select,
  Button,
  Grid,
  RadioGroup,
  FormControlLabel,
  Radio,
  InputAdornment,
  Alert,
  CircularProgress,
  Snackbar,
  Checkbox,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Chip,
  Paper,
  Divider,
} from '@mui/material';
import WorkOutlinedIcon from '@mui/icons-material/WorkOutlined';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import EditNoteIcon from '@mui/icons-material/EditNote';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import SendIcon from '@mui/icons-material/Send';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Navbar from '../../components/Navbar/Navbar';
import CKEditorField from '../../components/CKEditor/CKEditorField';
import Footer from '../../components/Footer/Footer';
import { getCategories, createJob } from '../../services/api';
import './PostJob.css';

const CITY_OPTIONS = [
  { id: 1, name: 'Hà Nội' },
  { id: 2, name: 'TP. Hồ Chí Minh' },
  { id: 3, name: 'Đà Nẵng' },
  { id: 4, name: 'Hải Phòng' },
  { id: 5, name: 'Cần Thơ' },
  { id: 6, name: 'Bình Dương' },
  { id: 7, name: 'Đồng Nai' },
  { id: 8, name: 'Bắc Ninh' },
  { id: 9, name: 'Toàn quốc' },
];

const EXPERIENCE_OPTIONS = [
  'Chưa có kinh nghiệm',
  'Dưới 1 năm',
  '1 năm',
  '2 năm',
  '3 năm',
  '4 năm',
  '5 năm',
  'Trên 5 năm',
];

const PostJob = () => {
  const navigate = useNavigate();

  // Auth & Role check
  const [currentUser, setCurrentUser] = useState(null);
  const [authChecked, setAuthChecked] = useState(false);

  // Categories API Data
  const [categoryGroups, setCategoryGroups] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    specialty: '',
    job_type: 'FULL_TIME',
    experience_level: '1 năm',
    gender: 'NOT_REQUIRED',
    quantity: 1,
    is_hot: false,

    // Salary
    salary_type: 'RANGE',
    salary_min: '15000000',
    salary_max: '25000000',
    salary_currency: 'VND',
    salary_is_negotiable: false,

    // Location
    city_name: 'Hà Nội',
    address_detail: '',

    // Rich Text
    description_html: '<p><b>Mô tả chi tiết công việc:</b></p><ul><li>Tìm kiếm, tiếp cận và phát triển mạng lưới khách hàng tiềm năng cho công ty.</li><li>Tư vấn, giới thiệu các sản phẩm, giải pháp kinh doanh cho khách hàng doanh nghiệp và cá nhân.</li><li>Đàm phán, thương lượng hợp đồng và hỗ trợ khách hàng hoàn tất quy trình mua hàng.</li><li>Thực hiện báo cáo công việc định kỳ cho cấp quản lý.</li></ul>',
    requirements_html: '<p><b>Yêu cầu ứng viên:</b></p><ul><li>Tốt nghiệp Cao đẳng/Đại học trở lên các chuyên ngành liên quan.</li><li>Có ít nhất 1 năm kinh nghiệm tại vị trí tương đương.</li><li>Kỹ năng giao tiếp, thương lượng và thuyết phục tốt.</li><li>Chủ động, có tinh thần trách nhiệm cao trong công việc.</li></ul>',
    benefits_html: '<p><b>Quyền lợi được hưởng:</b></p><ul><li>Thu nhập hấp dẫn theo năng lực (Lương cứng + Thưởng hiệu quả).</li><li>Đóng BHXH, BHYT đầy đủ theo quy định của Luật Lao động.</li><li>Chế độ du lịch nghỉ mát, team building hàng năm cùng công ty.</li><li>Môi trường làm việc năng động, nhiều cơ hội thăng tiến.</li></ul>',

    // Deadline & Contact
    deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
  });

  // UI States
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [previewOpen, setPreviewOpen] = useState(false);

  // 1. Check User Authentication & Role
  useEffect(() => {
    try {
      const token = localStorage.getItem('access_token');
      const savedUser = localStorage.getItem('user');
      if (token && savedUser) {
        const parsed = JSON.parse(savedUser);
        setCurrentUser(parsed);
      } else {
        setCurrentUser(null);
      }
    } catch (e) {
      console.error('Error parsing user data:', e);
      setCurrentUser(null);
    } finally {
      setAuthChecked(true);
    }
  }, []);

  // 2. Fetch Category Groups from API
  useEffect(() => {
    const fetchCats = async () => {
      setLoadingCategories(true);
      try {
        const data = await getCategories();
        if (Array.isArray(data) && data.length > 0) {
          setCategoryGroups(data);
          // Set default category to first group
          setFormData((prev) => ({
            ...prev,
            category: prev.category || data[0].group_name,
            specialty: prev.specialty || (data[0].categories?.[0]?.name || ''),
          }));
        }
      } catch (err) {
        console.error('Error fetching categories for PostJob:', err);
      } finally {
        setLoadingCategories(false);
      }
    };

    fetchCats();
  }, []);

  // Get Subcategories list for currently selected category group
  const selectedGroup = categoryGroups.find((g) => g.group_name === formData.category);
  const subCategoriesList = selectedGroup?.categories || [];

  const handleCategoryChange = (e) => {
    const newCatName = e.target.value;
    const newGroup = categoryGroups.find((g) => g.group_name === newCatName);
    setFormData((prev) => ({
      ...prev,
      category: newCatName,
      specialty: newGroup?.categories?.[0]?.name || '',
    }));
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Submit Job
  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    // Form Validations
    if (!formData.title.trim()) {
      setErrorMsg('Vui lòng nhập tiêu đề tin tuyển dụng.');
      return;
    }
    if (!formData.category) {
      setErrorMsg('Vui lòng chọn ngành nghề chính.');
      return;
    }
    if (!formData.deadline) {
      setErrorMsg('Vui lòng chọn hạn nộp hồ sơ.');
      return;
    }
    if (!formData.description_html || formData.description_html.trim() === '<p><br></p>') {
      setErrorMsg('Vui lòng nhập mô tả công việc.');
      return;
    }

    setSubmitting(true);

    try {
      // Build salary object
      const salaryPayload = {
        type: formData.salary_type,
        currency: formData.salary_currency || 'VND',
        is_negotiable: Boolean(formData.salary_is_negotiable),
      };

      if (formData.salary_type === 'RANGE' || formData.salary_type === 'MINIMUM') {
        const minVal = parseInt(formData.salary_min, 10);
        if (!isNaN(minVal)) salaryPayload.min = minVal;
      }
      if (formData.salary_type === 'RANGE' || formData.salary_type === 'UP_TO') {
        const maxVal = parseInt(formData.salary_max, 10);
        if (!isNaN(maxVal)) salaryPayload.max = maxVal;
      }

      // Build work location list
      const matchedCity = CITY_OPTIONS.find((c) => c.name === formData.city_name);
      const workLocationPayload = [
        {
          city_id: matchedCity ? matchedCity.id : null,
          city_name: formData.city_name || null,
          address_detail: formData.address_detail.trim() || null,
        },
      ];

      // Format ISO deadline
      let deadlineIso;
      try {
        deadlineIso = new Date(`${formData.deadline}T23:59:59`).toISOString();
      } catch {
        deadlineIso = new Date().toISOString();
      }

      const targetCategory = formData.specialty ? formData.specialty.trim() : formData.category;

      const payload = {
        title: formData.title.trim(),
        category: targetCategory,
        specialty: formData.specialty ? formData.specialty.trim() : null,
        job_type: formData.job_type,
        experience_level: formData.experience_level || null,
        gender: formData.gender || 'NOT_REQUIRED',
        quantity: formData.quantity ? parseInt(formData.quantity, 10) : null,
        salary: salaryPayload,
        work_location: workLocationPayload,
        deadline: deadlineIso,
        is_hot: Boolean(formData.is_hot),
        description_html: formData.description_html,
        requirements_html: formData.requirements_html || null,
        benefits_html: formData.benefits_html || null,
      };

      const res = await createJob(payload);
      setSuccessMsg('Đăng tin tuyển dụng thành công! Đang chuyển hướng...');

      setTimeout(() => {
        if (res && res.slug) {
          navigate(`/job/${res.slug}`);
        } else if (res && res.id) {
          navigate(`/job/${res.id}`);
        } else {
          navigate('/');
        }
      }, 1500);
    } catch (err) {
      console.error('Error creating job:', err);
      const message =
        err.response?.data?.message ||
        err.response?.data?.detail ||
        'Có lỗi xảy ra khi tạo tin tuyển dụng. Vui lòng kiểm tra lại quyền Nhà tuyển dụng hoặc thử lại!';
      setErrorMsg(typeof message === 'string' ? message : JSON.stringify(message));
    } finally {
      setSubmitting(false);
    }
  };

  // 3. Render Access Control Gate if not Employer
  if (!authChecked) {
    return (
      <div className="postjob-page">
        <Navbar />
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
          <CircularProgress sx={{ color: '#00b14f' }} />
        </Box>
        <Footer />
      </div>
    );
  }

  // Not logged in or Role !== EMPLOYER
  if (!currentUser || currentUser.role !== 'EMPLOYER') {
    return (
      <div className="postjob-page">
        <Navbar />
        <div className="topcv-container" style={{ padding: '60px 16px', minHeight: '60vh' }}>
          <Paper
            elevation={0}
            sx={{
              maxWidth: '600px',
              mx: 'auto',
              p: 4,
              borderRadius: '16px',
              border: '1px solid #e0e0e0',
              textAlign: 'center',
              backgroundColor: '#ffffff',
              boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
            }}
          >
            <Box
              sx={{
                width: 70,
                height: 70,
                borderRadius: '50%',
                backgroundColor: '#fee2e2',
                color: '#ef4444',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mx: 'auto',
                mb: 2.5,
              }}
            >
              <LockOutlinedIcon sx={{ fontSize: 36 }} />
            </Box>

            <Typography variant="h5" sx={{ fontWeight: 700, color: '#1f2937', mb: 1.5 }}>
              Chỉ dành cho Nhà tuyển dụng
            </Typography>

            <Typography sx={{ color: '#4b5563', fontSize: '15px', mb: 3, lineHeight: 1.6 }}>
              {!currentUser
                ? 'Bạn chưa đăng nhập. Vui lòng đăng nhập với tài khoản Nhà tuyển dụng để tiếp tục tạo và quản lý các tin đăng.'
                : `Tài khoản của bạn hiện đang ở vai trò "${currentUser.role === 'CANDIDATE' ? 'Ứng viên' : currentUser.role}". Chỉ tài khoản Nhà tuyển dụng (EMPLOYER) mới có quyền đăng tin.`}
            </Typography>

            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, flexWrap: 'wrap' }}>
              {!currentUser ? (
                <>
                  <Button
                    variant="contained"
                    component={Link}
                    to="/login"
                    sx={{
                      backgroundColor: '#00b14f',
                      borderRadius: '8px',
                      px: 3,
                      py: 1,
                      fontWeight: 700,
                      textTransform: 'none',
                      '&:hover': { backgroundColor: '#009643' },
                    }}
                  >
                    Đăng nhập Nhà tuyển dụng
                  </Button>
                  <Button
                    variant="outlined"
                    component={Link}
                    to="/register"
                    sx={{
                      borderColor: '#00b14f',
                      color: '#00b14f',
                      borderRadius: '8px',
                      px: 3,
                      py: 1,
                      fontWeight: 700,
                      textTransform: 'none',
                      '&:hover': { backgroundColor: '#e6f7ef' },
                    }}
                  >
                    Đăng ký Nhà tuyển dụng
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    variant="contained"
                    component={Link}
                    to="/register"
                    sx={{
                      backgroundColor: '#00b14f',
                      borderRadius: '8px',
                      px: 3,
                      py: 1,
                      fontWeight: 700,
                      textTransform: 'none',
                      '&:hover': { backgroundColor: '#009643' },
                    }}
                  >
                    Đăng ký tài khoản Nhà tuyển dụng
                  </Button>
                  <Button
                    variant="outlined"
                    component={Link}
                    to="/"
                    sx={{
                      borderColor: '#d0d7de',
                      color: '#555',
                      borderRadius: '8px',
                      px: 3,
                      py: 1,
                      fontWeight: 600,
                      textTransform: 'none',
                    }}
                  >
                    Quay về Trang chủ
                  </Button>
                </>
              )}
            </Box>
          </Paper>
        </div>
        <Footer />
      </div>
    );
  }

  // 4. Main Employer Post Job Form
  return (
    <div className="postjob-page">
      <Navbar />

      {/* Header Title Banner */}
      <div className="postjob-header-banner">
        <div className="topcv-container">
          <Typography
            variant="h4"
            sx={{
              fontWeight: 800,
              fontSize: { xs: '22px', md: '28px' },
              mb: 0.8,
            }}
          >
            Tạo Tin Tuyển Dụng Mới
          </Typography>
          <Typography sx={{ fontSize: '14.5px', opacity: 0.9 }}>
            Đăng tin tuyển dụng và kết nối với hơn 5.000.000+ ứng viên tiềm năng trên TopCV
          </Typography>
        </div>
      </div>

      {/* Main Content Form */}
      <main className="topcv-container" style={{ marginBottom: '50px' }}>
        {errorMsg && (
          <Alert severity="error" sx={{ mb: 3, borderRadius: '8px' }} onClose={() => setErrorMsg('')}>
            {errorMsg}
          </Alert>
        )}

        {successMsg && (
          <Alert severity="success" sx={{ mb: 3, borderRadius: '8px' }}>
            {successMsg}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit}>
          {/* SECTION 1: Thông tin chung công việc */}
          <div className="postjob-section-card">
            <Typography className="postjob-card-title">
              <WorkOutlinedIcon sx={{ color: '#00b14f' }} />
              1. Thông tin chung về vị trí tuyển dụng
            </Typography>

            <Grid container spacing={2.5}>
              {/* Tiêu đề tin tuyển dụng */}
              <Grid item xs={12}>
                <label className="postjob-field-label">
                  Tiêu đề tin tuyển dụng<span className="postjob-required">*</span>
                </label>
                <TextField
                  fullWidth
                  placeholder="Ví dụ: [Hà Nội] Nhân Viên Kinh Doanh B2B - Thu Nhập 15 - 30 Triệu"
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  size="small"
                  variant="outlined"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '8px',
                      '&:hover fieldset': { borderColor: '#00b14f' },
                      '&.Mui-focused fieldset': { borderColor: '#00b14f' },
                    },
                  }}
                />
              </Grid>

              {/* Ngành nghề tuyển dụng (Từ API getCategories) */}
              <Grid item xs={12} md={6}>
                <label className="postjob-field-label">
                  Nhóm ngành nghề chính<span className="postjob-required">*</span>
                </label>
                <Select
                  fullWidth
                  value={formData.category}
                  onChange={handleCategoryChange}
                  size="small"
                  disabled={loadingCategories}
                  sx={{ borderRadius: '8px' }}
                >
                  {categoryGroups.map((group) => (
                    <MenuItem key={group.id} value={group.group_name}>
                      {group.group_name}
                    </MenuItem>
                  ))}
                </Select>
              </Grid>

              {/* Chuyên môn / Ngành nghề chi tiết */}
              <Grid item xs={12} md={6}>
                <label className="postjob-field-label">Chuyên môn / Vị trí chi tiết</label>
                {subCategoriesList.length > 0 ? (
                  <Select
                    fullWidth
                    value={formData.specialty}
                    onChange={(e) => handleInputChange('specialty', e.target.value)}
                    size="small"
                    sx={{ borderRadius: '8px' }}
                  >
                    {subCategoriesList.map((sub) => (
                      <MenuItem key={sub.id} value={sub.name}>
                        {sub.name}
                      </MenuItem>
                    ))}
                  </Select>
                ) : (
                  <TextField
                    fullWidth
                    placeholder="Ví dụ: Quản lý kinh doanh, Lập trình Frontend..."
                    value={formData.specialty}
                    onChange={(e) => handleInputChange('specialty', e.target.value)}
                    size="small"
                    variant="outlined"
                    sx={{ borderRadius: '8px' }}
                  />
                )}
              </Grid>

              {/* Hình thức làm việc */}
              <Grid item xs={12} md={6}>
                <label className="postjob-field-label">
                  Hình thức làm việc<span className="postjob-required">*</span>
                </label>
                <Select
                  fullWidth
                  value={formData.job_type}
                  onChange={(e) => handleInputChange('job_type', e.target.value)}
                  size="small"
                  sx={{ borderRadius: '8px' }}
                >
                  <MenuItem value="FULL_TIME">Toàn thời gian (Full-time)</MenuItem>
                  <MenuItem value="PART_TIME">Bán thời gian (Part-time)</MenuItem>
                  <MenuItem value="FREELANCE">Freelance / Dự án tự do</MenuItem>
                  <MenuItem value="INTERNSHIP">Thực tập sinh (Internship)</MenuItem>
                </Select>
              </Grid>

              {/* Số lượng cần tuyển */}
              <Grid item xs={12} md={6}>
                <label className="postjob-field-label">Số lượng cần tuyển</label>
                <TextField
                  fullWidth
                  type="number"
                  value={formData.quantity}
                  onChange={(e) => handleInputChange('quantity', e.target.value)}
                  size="small"
                  variant="outlined"
                  inputProps={{ min: 1 }}
                  InputProps={{ endAdornment: <InputAdornment position="end">người</InputAdornment> }}
                  sx={{ borderRadius: '8px' }}
                />
              </Grid>

              {/* Kinh nghiệm */}
              <Grid item xs={12} md={6}>
                <label className="postjob-field-label">Kinh nghiệm yêu cầu</label>
                <Select
                  fullWidth
                  value={formData.experience_level}
                  onChange={(e) => handleInputChange('experience_level', e.target.value)}
                  size="small"
                  sx={{ borderRadius: '8px' }}
                >
                  {EXPERIENCE_OPTIONS.map((exp) => (
                    <MenuItem key={exp} value={exp}>
                      {exp}
                    </MenuItem>
                  ))}
                </Select>
              </Grid>

              {/* Giới tính */}
              <Grid item xs={12} md={6}>
                <label className="postjob-field-label">Yêu cầu giới tính</label>
                <RadioGroup
                  row
                  value={formData.gender}
                  onChange={(e) => handleInputChange('gender', e.target.value)}
                >
                  <FormControlLabel value="NOT_REQUIRED" control={<Radio size="small" sx={{ color: '#00b14f' }} />} label="Không yêu cầu" />
                  <FormControlLabel value="MALE" control={<Radio size="small" sx={{ color: '#00b14f' }} />} label="Nam" />
                  <FormControlLabel value="FEMALE" control={<Radio size="small" sx={{ color: '#00b14f' }} />} label="Nữ" />
                </RadioGroup>
              </Grid>

              {/* Tin HOT */}
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={formData.is_hot}
                      onChange={(e) => handleInputChange('is_hot', e.target.checked)}
                      sx={{ color: '#00b14f', '&.Mui-checked': { color: '#00b14f' } }}
                    />
                  }
                  label={
                    <Typography sx={{ fontSize: '14px', fontWeight: 600, color: '#e11d48' }}>
                      🔥 Đánh dấu là Tin tuyển dụng Gấp / HOT (Ưu tiên tiếp cận ứng viên)
                    </Typography>
                  }
                />
              </Grid>
            </Grid>
          </div>

          {/* SECTION 2: Mức lương & Địa điểm */}
          <div className="postjob-section-card">
            <Typography className="postjob-card-title">
              <AttachMoneyIcon sx={{ color: '#00b14f' }} />
              2. Mức lương & Địa điểm làm việc
            </Typography>

            <Grid container spacing={2.5}>
              {/* Kiểu mức lương */}
              <Grid item xs={12} md={4}>
                <label className="postjob-field-label">Kiểu mức lương</label>
                <Select
                  fullWidth
                  value={formData.salary_type}
                  onChange={(e) => handleInputChange('salary_type', e.target.value)}
                  size="small"
                  sx={{ borderRadius: '8px' }}
                >
                  <MenuItem value="RANGE">Trong khoảng (Min - Max)</MenuItem>
                  <MenuItem value="AGREEMENT">Thỏa thuận</MenuItem>
                  <MenuItem value="UP_TO">Lên đến (Tối đa)</MenuItem>
                  <MenuItem value="MINIMUM">Từ (Tối thiểu)</MenuItem>
                </Select>
              </Grid>

              {/* Lương tối thiểu */}
              <Grid item xs={12} sm={6} md={4}>
                <label className="postjob-field-label">Lương tối thiểu (VND)</label>
                <TextField
                  fullWidth
                  type="number"
                  value={formData.salary_min}
                  onChange={(e) => handleInputChange('salary_min', e.target.value)}
                  disabled={formData.salary_type === 'AGREEMENT' || formData.salary_type === 'UP_TO'}
                  placeholder="15000000"
                  size="small"
                  variant="outlined"
                  sx={{ borderRadius: '8px' }}
                />
              </Grid>

              {/* Lương tối đa */}
              <Grid item xs={12} sm={6} md={4}>
                <label className="postjob-field-label">Lương tối đa (VND)</label>
                <TextField
                  fullWidth
                  type="number"
                  value={formData.salary_max}
                  onChange={(e) => handleInputChange('salary_max', e.target.value)}
                  disabled={formData.salary_type === 'AGREEMENT' || formData.salary_type === 'MINIMUM'}
                  placeholder="30000000"
                  size="small"
                  variant="outlined"
                  sx={{ borderRadius: '8px' }}
                />
              </Grid>

              {/* Có thể thỏa thuận thêm */}
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={formData.salary_is_negotiable}
                      onChange={(e) => handleInputChange('salary_is_negotiable', e.target.checked)}
                      sx={{ color: '#00b14f', '&.Mui-checked': { color: '#00b14f' } }}
                    />
                  }
                  label={<Typography sx={{ fontSize: '13.5px', color: '#555' }}>Mức lương có thể thương lượng thêm trong buổi phỏng vấn</Typography>}
                />
              </Grid>

              {/* Tỉnh / Thành phố */}
              <Grid item xs={12} md={4}>
                <label className="postjob-field-label">
                  Tỉnh / Thành phố<span className="postjob-required">*</span>
                </label>
                <Select
                  fullWidth
                  value={formData.city_name}
                  onChange={(e) => handleInputChange('city_name', e.target.value)}
                  size="small"
                  sx={{ borderRadius: '8px' }}
                >
                  {CITY_OPTIONS.map((c) => (
                    <MenuItem key={c.id} value={c.name}>
                      {c.name}
                    </MenuItem>
                  ))}
                </Select>
              </Grid>

              {/* Địa chỉ làm việc chi tiết */}
              <Grid item xs={12} md={8}>
                <label className="postjob-field-label">Địa chỉ làm việc chi tiết</label>
                <TextField
                  fullWidth
                  placeholder="Ví dụ: Tầng 3, Tòa nhà FS - GoldSeason, 47 Nguyễn Tuân, Thanh Xuân"
                  value={formData.address_detail}
                  onChange={(e) => handleInputChange('address_detail', e.target.value)}
                  size="small"
                  variant="outlined"
                  sx={{ borderRadius: '8px' }}
                />
              </Grid>
            </Grid>
          </div>

          {/* SECTION 3: Mô tả chi tiết công việc (CKEditor 5) */}
          <div className="postjob-section-card">
            <Typography className="postjob-card-title">
              <EditNoteIcon sx={{ color: '#00b14f' }} />
              3. Mô tả chi tiết tin đăng (Trình soạn thảo văn bản CKEditor 5)
            </Typography>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              {/* 3.1 Mô tả công việc */}
              <Box>
                <label className="postjob-field-label">
                  Mô tả công việc<span className="postjob-required">*</span>
                </label>
                <CKEditorField
                  placeholder="Nhập chi tiết nhiệm vụ và trách nhiệm công việc..."
                  value={formData.description_html}
                  onChange={(html) => handleInputChange('description_html', html)}
                />
              </Box>

              {/* 3.2 Yêu cầu ứng viên */}
              <Box>
                <label className="postjob-field-label">Yêu cầu ứng viên</label>
                <CKEditorField
                  placeholder="Nhập các yêu cầu về kỹ năng, kinh nghiệm..."
                  value={formData.requirements_html}
                  onChange={(html) => handleInputChange('requirements_html', html)}
                />
              </Box>

              {/* 3.3 Quyền lợi được hưởng */}
              <Box>
                <label className="postjob-field-label">Quyền lợi được hưởng</label>
                <CKEditorField
                  placeholder="Nhập đãi ngộ, lương thưởng, du lịch, bảo hiểm..."
                  value={formData.benefits_html}
                  onChange={(html) => handleInputChange('benefits_html', html)}
                />
              </Box>
            </Box>
          </div>

          {/* SECTION 4: Hạn nộp & Thông tin tiếp nhận */}
          <div className="postjob-section-card">
            <Typography className="postjob-card-title">
              <PersonOutlinedIcon sx={{ color: '#00b14f' }} />
              4. Hạn nộp hồ sơ tuyển dụng
            </Typography>

            <Grid container spacing={2.5}>
              <Grid item xs={12} md={6}>
                <label className="postjob-field-label">
                  Hạn nộp hồ sơ<span className="postjob-required">*</span>
                </label>
                <TextField
                  fullWidth
                  type="date"
                  value={formData.deadline}
                  onChange={(e) => handleInputChange('deadline', e.target.value)}
                  size="small"
                  variant="outlined"
                  sx={{ borderRadius: '8px' }}
                />
              </Grid>
            </Grid>
          </div>
        </Box>
      </main>

      {/* Sticky Bottom Action Bar */}
      <div className="postjob-bottom-actions">
        <div className="topcv-container" style={{ display: 'flex', justifyContent: 'flex-end', gap: '16px' }}>
          <Button
            variant="outlined"
            startIcon={<SaveOutlinedIcon />}
            sx={{
              borderColor: '#d0d7de',
              color: '#555555',
              borderRadius: '24px',
              px: 3,
              py: 1,
              fontWeight: 700,
              fontSize: '14px',
              textTransform: 'none',
              '&:hover': { backgroundColor: '#f8fafc' },
            }}
            onClick={() => alert('Đã lưu nháp tin tuyển dụng!')}
          >
            Lưu nháp
          </Button>

          <Button
            variant="outlined"
            startIcon={<VisibilityOutlinedIcon />}
            sx={{
              borderColor: '#00b14f',
              color: '#00b14f',
              borderRadius: '24px',
              px: 3,
              py: 1,
              fontWeight: 700,
              fontSize: '14px',
              textTransform: 'none',
              '&:hover': { backgroundColor: '#e6f7ef' },
            }}
            onClick={() => setPreviewOpen(true)}
          >
            Xem trước tin đăng
          </Button>

          <Button
            variant="contained"
            startIcon={submitting ? <CircularProgress size={18} color="inherit" /> : <SendIcon />}
            disabled={submitting}
            sx={{
              backgroundColor: '#00b14f',
              color: '#ffffff',
              borderRadius: '24px',
              px: 4,
              py: 1,
              fontWeight: 700,
              fontSize: '14.5px',
              textTransform: 'none',
              boxShadow: '0 4px 14px rgba(0, 177, 79, 0.3)',
              '&:hover': { backgroundColor: '#009643' },
            }}
            onClick={handleSubmit}
          >
            {submitting ? 'Đang tạo tin...' : 'Đăng tin ngay'}
          </Button>
        </div>
      </div>

      {/* Job Preview Dialog */}
      <Dialog
        open={previewOpen}
        onClose={() => setPreviewOpen(false)}
        maxWidth="md"
        fullWidth
        PaperProps={{ sx: { borderRadius: '16px', p: 1 } }}
      >
        <DialogTitle sx={{ fontWeight: 800, color: '#1f2937', pb: 1 }}>
          Xem trước tin tuyển dụng
        </DialogTitle>
        <DialogContent dividers>
          <Box sx={{ mb: 2 }}>
            <Typography variant="h5" sx={{ fontWeight: 800, color: '#00b14f', mb: 1 }}>
              {formData.title || '(Chưa nhập tiêu đề)'}
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
              <Chip label={`Ngành nghề: ${formData.category}`} size="small" color="primary" variant="outlined" />
              {formData.specialty && <Chip label={`Chuyên môn: ${formData.specialty}`} size="small" variant="outlined" />}
              <Chip label={`Hình thức: ${formData.job_type}`} size="small" variant="outlined" />
              <Chip label={`Kinh nghiệm: ${formData.experience_level}`} size="small" variant="outlined" />
              <Chip label={`Khu vực: ${formData.city_name}`} size="small" variant="outlined" />
            </Box>
          </Box>

          <Divider sx={{ my: 2 }} />

          <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1 }}>
            Mô tả công việc:
          </Typography>
          <div dangerouslySetInnerHTML={{ __html: formData.description_html || '<i>Chưa có nội dung</i>' }} />

          {formData.requirements_html && (
            <>
              <Divider sx={{ my: 2 }} />
              <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1 }}>
                Yêu cầu ứng viên:
              </Typography>
              <div dangerouslySetInnerHTML={{ __html: formData.requirements_html }} />
            </>
          )}

          {formData.benefits_html && (
            <>
              <Divider sx={{ my: 2 }} />
              <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1 }}>
                Quyền lợi được hưởng:
              </Typography>
              <div dangerouslySetInnerHTML={{ __html: formData.benefits_html }} />
            </>
          )}
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={() => setPreviewOpen(false)} sx={{ textTransform: 'none', fontWeight: 600 }}>
            Đóng
          </Button>
        </DialogActions>
      </Dialog>

      <Footer />
    </div>
  );
};

export default PostJob;
