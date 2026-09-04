import React from 'react';
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
} from '@mui/material';
import WorkOutlinedIcon from '@mui/icons-material/WorkOutlined';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import EditNoteIcon from '@mui/icons-material/EditNote';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import SendIcon from '@mui/icons-material/Send';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import Navbar from '../../components/Navbar/Navbar';
import CKEditorField from '../../components/CKEditor/CKEditorField';
import Footer from '../../components/Footer/Footer';
import './PostJob.css';

const PostJob = () => {
  return (
    <div className="postjob-page">
      {/* Shared Common Navbar */}
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
      <main className="topcv-container" style={{ marginBottom: '40px' }}>
        <Box component="form" onSubmit={(e) => e.preventDefault()}>
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
                  placeholder="Ví dụ: [Hà Nội] Nhân Viên Kinh Doanh - Thu Nhập 15 - 30 Triệu"
                  defaultValue="[Hà Nội] Nhân Viên Kinh Doanh - Thu Nhập 15 - 30 Triệu"
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

              {/* Ngành nghề tuyển dụng */}
              <Grid item xs={12} md={6}>
                <label className="postjob-field-label">
                  Ngành nghề chính<span className="postjob-required">*</span>
                </label>
                <Select
                  fullWidth
                  defaultValue="1"
                  size="small"
                  sx={{ borderRadius: '8px' }}
                >
                  <MenuItem value="1">Kinh doanh / Bán hàng</MenuItem>
                  <MenuItem value="2">Marketing / PR / Quảng cáo</MenuItem>
                  <MenuItem value="3">Công nghệ Thông tin (IT)</MenuItem>
                  <MenuItem value="4">Chăm sóc khách hàng (Customer Service)</MenuItem>
                  <MenuItem value="5">Nhân sự / Hành chính / Pháp chế</MenuItem>
                </Select>
              </Grid>

              {/* Số lượng cần tuyển */}
              <Grid item xs={12} md={6}>
                <label className="postjob-field-label">
                  Số lượng cần tuyển<span className="postjob-required">*</span>
                </label>
                <TextField
                  fullWidth
                  type="number"
                  defaultValue="5"
                  size="small"
                  variant="outlined"
                  InputProps={{ endAdornment: <InputAdornment position="end">người</InputAdornment> }}
                  sx={{ borderRadius: '8px' }}
                />
              </Grid>

              {/* Cấp bậc */}
              <Grid item xs={12} md={6}>
                <label className="postjob-field-label">
                  Cấp bậc<span className="postjob-required">*</span>
                </label>
                <Select
                  fullWidth
                  defaultValue="nhan-vien"
                  size="small"
                  sx={{ borderRadius: '8px' }}
                >
                  <MenuItem value="nhan-vien">Nhân viên</MenuItem>
                  <MenuItem value="truong-nhom">Trưởng nhóm / Giám sát</MenuItem>
                  <MenuItem value="truong-phong">Trưởng phòng</MenuItem>
                  <MenuItem value="giam-doc">Giám đốc & Cấp cao hơn</MenuItem>
                </Select>
              </Grid>

              {/* Hình thức làm việc */}
              <Grid item xs={12} md={6}>
                <label className="postjob-field-label">
                  Hình thức làm việc<span className="postjob-required">*</span>
                </label>
                <Select
                  fullWidth
                  defaultValue="toan-thoi-gian"
                  size="small"
                  sx={{ borderRadius: '8px' }}
                >
                  <MenuItem value="toan-thoi-gian">Toàn thời gian</MenuItem>
                  <MenuItem value="ban-thoi-gian">Bán thời gian</MenuItem>
                  <MenuItem value="thuc-tap">Thực tập sinh</MenuItem>
                  <MenuItem value="remote">Remote / Làm việc từ xa</MenuItem>
                </Select>
              </Grid>

              {/* Kinh nghiệm */}
              <Grid item xs={12} md={6}>
                <label className="postjob-field-label">
                  Kinh nghiệm yêu cầu<span className="postjob-required">*</span>
                </label>
                <Select
                  fullWidth
                  defaultValue="1-nam"
                  size="small"
                  sx={{ borderRadius: '8px' }}
                >
                  <MenuItem value="khong-yeu-cau">Chưa có kinh nghiệm</MenuItem>
                  <MenuItem value="duoi-1-nam">Dưới 1 năm</MenuItem>
                  <MenuItem value="1-nam">1 năm</MenuItem>
                  <MenuItem value="2-nam">2 năm</MenuItem>
                  <MenuItem value="3-5-nam">3 - 5 năm</MenuItem>
                  <MenuItem value="tren-5-nam">Trên 5 năm</MenuItem>
                </Select>
              </Grid>

              {/* Giới tính */}
              <Grid item xs={12} md={6}>
                <label className="postjob-field-label">Yêu cầu giới tính</label>
                <RadioGroup row defaultValue="all">
                  <FormControlLabel value="all" control={<Radio size="small" sx={{ color: '#00b14f' }} />} label="Không yêu cầu" />
                  <FormControlLabel value="male" control={<Radio size="small" sx={{ color: '#00b14f' }} />} label="Nam" />
                  <FormControlLabel value="female" control={<Radio size="small" sx={{ color: '#00b14f' }} />} label="Nữ" />
                </RadioGroup>
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
              {/* Loại lương */}
              <Grid item xs={12} md={4}>
                <label className="postjob-field-label">Kiểu mức lương</label>
                <Select fullWidth defaultValue="range" size="small" sx={{ borderRadius: '8px' }}>
                  <MenuItem value="range">Trong khoảng</MenuItem>
                  <MenuItem value="negotiable">Thỏa thuận</MenuItem>
                  <MenuItem value="fixed">Cố định</MenuItem>
                </Select>
              </Grid>

              {/* Lương từ */}
              <Grid item xs={12} sm={6} md={4}>
                <label className="postjob-field-label">Lương tối thiểu (VND)</label>
                <TextField
                  fullWidth
                  defaultValue="15,000,000"
                  size="small"
                  variant="outlined"
                  sx={{ borderRadius: '8px' }}
                />
              </Grid>

              {/* Lương đến */}
              <Grid item xs={12} sm={6} md={4}>
                <label className="postjob-field-label">Lương tối đa (VND)</label>
                <TextField
                  fullWidth
                  defaultValue="30,000,000"
                  size="small"
                  variant="outlined"
                  sx={{ borderRadius: '8px' }}
                />
              </Grid>

              {/* Tỉnh / Thành phố */}
              <Grid item xs={12} md={6}>
                <label className="postjob-field-label">Tỉnh / Thành phố<span className="postjob-required">*</span></label>
                <Select fullWidth defaultValue="hanoi" size="small" sx={{ borderRadius: '8px' }}>
                  <MenuItem value="hanoi">Hà Nội</MenuItem>
                  <MenuItem value="hcm">TP. Hồ Chí Minh</MenuItem>
                  <MenuItem value="danang">Đà Nẵng</MenuItem>
                </Select>
              </Grid>

              {/* Địa chỉ chi tiết */}
              <Grid item xs={12} md={6}>
                <label className="postjob-field-label">Địa chỉ làm việc chi tiết<span className="postjob-required">*</span></label>
                <TextField
                  fullWidth
                  defaultValue="Tòa nhà Goldseason, 47 Nguyễn Tuân, Thanh Xuân, Hà Nội"
                  size="small"
                  variant="outlined"
                  sx={{ borderRadius: '8px' }}
                />
              </Grid>
            </Grid>
          </div>

          {/* SECTION 3: Nội dung chi tiết công việc (Dùng CKEditor 5) */}
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
                  initialContent="<p><b>Mô tả chi tiết công việc:</b></p><ul><li>Tìm kiếm, tiếp cận và phát triển mạng lưới khách hàng tiềm năng cho công ty.</li><li>Tư vấn, giới thiệu các sản phẩm, giải pháp kinh doanh cho khách hàng doanh nghiệp và cá nhân.</li><li>Đàm phán, thương lượng hợp đồng và hỗ trợ khách hàng hoàn tất quy trình mua hàng.</li><li>Thực hiện báo cáo công việc định kỳ cho Trưởng phòng Kinh doanh.</li></ul>"
                />
              </Box>

              {/* 3.2 Yêu cầu ứng viên */}
              <Box>
                <label className="postjob-field-label">
                  Yêu cầu ứng viên<span className="postjob-required">*</span>
                </label>
                <CKEditorField
                  placeholder="Nhập các yêu cầu về kỹ năng, kinh nghiệm..."
                  initialContent="<p><b>Yêu cầu trình độ & kinh nghiệm:</b></p><ul><li>Nam/Nữ độ tuổi từ 22 - 32 tuổi. Tốt nghiệp Cao đẳng/Đại học trở lên.</li><li>Có ít nhất 1 năm kinh nghiệm tại vị trí Nhân viên kinh doanh hoặc bán hàng.</li><li>Giao tiếp tốt, nhanh nhẹn, tư duy linh hoạt và có khả năng đàm phán tốt.</li></ul>"
                />
              </Box>

              {/* 3.3 Quyền lợi được hưởng */}
              <Box>
                <label className="postjob-field-label">
                  Quyền lợi được hưởng<span className="postjob-required">*</span>
                </label>
                <CKEditorField
                  placeholder="Nhập đãi ngộ, lương thưởng, du lịch, bảo hiểm..."
                  initialContent="<p><b>Quyền lợi đãi ngộ:</b></p><ul><li>Thu nhập hấp dẫn từ <b>15 - 30 triệu/tháng</b> (Lương cứng + % Hoa hồng + Thưởng).</li><li>Đóng BHXH, BHYT đầy đủ theo Luật Lao động. Lương tháng 13.</li><li>Chế độ du lịch nghỉ mát hàng năm cùng công ty, teambuilding hàng quý.</li></ul>"
                />
              </Box>
            </Box>
          </div>

          {/* SECTION 4: Thông tin nhận hồ sơ */}
          <div className="postjob-section-card">
            <Typography className="postjob-card-title">
              <PersonOutlinedIcon sx={{ color: '#00b14f' }} />
              4. Thông tin nhận hồ sơ & Liên hệ
            </Typography>

            <Grid container spacing={2.5}>
              <Grid item xs={12} md={6}>
                <label className="postjob-field-label">Hạn nộp hồ sơ<span className="postjob-required">*</span></label>
                <TextField
                  fullWidth
                  type="date"
                  defaultValue="2026-09-30"
                  size="small"
                  variant="outlined"
                  sx={{ borderRadius: '8px' }}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <label className="postjob-field-label">Họ và tên người nhận hồ sơ<span className="postjob-required">*</span></label>
                <TextField
                  fullWidth
                  defaultValue="Nguyễn Văn Quản Lý"
                  size="small"
                  variant="outlined"
                  sx={{ borderRadius: '8px' }}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <label className="postjob-field-label">Số điện thoại người liên hệ<span className="postjob-required">*</span></label>
                <TextField
                  fullWidth
                  defaultValue="0988 123 456"
                  size="small"
                  variant="outlined"
                  sx={{ borderRadius: '8px' }}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <label className="postjob-field-label">Email nhận hồ sơ ứng tuyển<span className="postjob-required">*</span></label>
                <TextField
                  fullWidth
                  defaultValue="tuyendung@achau.vn"
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
            onClick={() => alert('Đang mở bản xem trước tin đăng!')}
          >
            Xem trước tin đăng
          </Button>

          <Button
            variant="contained"
            startIcon={<SendIcon />}
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
            onClick={() => alert('Đăng tin tuyển dụng thành công!')}
          >
            Đăng tin ngay
          </Button>
        </div>
      </div>

      {/* Shared Common Footer */}
      <Footer />
    </div>
  );
};

export default PostJob;
