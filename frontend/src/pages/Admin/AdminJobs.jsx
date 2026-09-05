import React, { useState, useEffect, useMemo } from 'react';
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  IconButton,
  Button,
  TextField,
  InputAdornment,
  MenuItem,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress,
  Snackbar,
  Alert,
  Tooltip,
  Card,
  CardContent,
  Divider,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import RefreshIcon from '@mui/icons-material/Refresh';
import WorkOutlinedIcon from '@mui/icons-material/WorkOutlined';
import BusinessIcon from '@mui/icons-material/Business';
import FlashOnIcon from '@mui/icons-material/FlashOn';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import MonetizationOnOutlinedIcon from '@mui/icons-material/MonetizationOnOutlined';
import CloseIcon from '@mui/icons-material/Close';
import AdminLayout from './AdminLayout';
import { getJobs, getCategories } from '../../services/api';

const formatSalary = (salary) => {
  if (!salary) return 'Thỏa thuận';
  const { type, min, max, is_negotiable } = salary;
  if (is_negotiable || type === 'AGREEMENT') return 'Thỏa thuận';
  if (type === 'RANGE' && min && max) {
    return `${(min / 1000000).toLocaleString('vi-VN')} - ${(max / 1000000).toLocaleString('vi-VN')} tr`;
  }
  if ((type === 'UP_TO' || !min) && max) {
    return `Tới ${(max / 1000000).toLocaleString('vi-VN')} tr`;
  }
  if ((type === 'MINIMUM' || !max) && min) {
    return `Từ ${(min / 1000000).toLocaleString('vi-VN')} tr`;
  }
  return 'Thỏa thuận';
};

const formatDate = (dateString) => {
  if (!dateString) return '-';
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

const AdminJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  // Search & Filters
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('ALL');
  const [jobTypeFilter, setJobTypeFilter] = useState('ALL');

  // Pagination
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // View Detail Modal state
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);

  // Toast / Notification
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const fetchJobList = async () => {
    setLoading(true);
    try {
      const [jobsRes, catRes] = await Promise.all([
        getJobs({ page: 1 }),
        getCategories().catch(() => []),
      ]);

      const rawJobs = jobsRes?.data || [];
      setJobs(rawJobs);

      if (Array.isArray(catRes)) {
        setCategories(catRes);
      }
    } catch (err) {
      console.error('Error fetching jobs for admin:', err);
      setSnackbar({
        open: true,
        message: 'Không thể tải danh sách việc làm. Vui lòng thử lại.',
        severity: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobList();
  }, []);

  // Filtered jobs list
  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const matchesSearch =
        !searchTerm.trim() ||
        job.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.company?.company_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.company?.short_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.category?.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory =
        categoryFilter === 'ALL' ||
        job.category === categoryFilter ||
        job.category_slug === categoryFilter;

      const matchesJobType =
        jobTypeFilter === 'ALL' || job.job_type === jobTypeFilter;

      return matchesSearch && matchesCategory && matchesJobType;
    });
  }, [jobs, searchTerm, categoryFilter, jobTypeFilter]);

  // Handle View Detail
  const handleOpenView = (job) => {
    setSelectedJob(job);
    setViewDialogOpen(true);
  };

  const handleCloseView = () => {
    setViewDialogOpen(false);
    setSelectedJob(null);
  };

  // Metrics
  const totalJobsCount = jobs.length;
  const hotJobsCount = jobs.filter((j) => j.is_hot).length;
  const uniqueCompaniesCount = new Set(
    jobs.map((j) => j.company?.company_name || j.company_id).filter(Boolean)
  ).size;

  return (
    <AdminLayout title="Quản lý việc làm">
      {/* 1. Metric Summary Cards */}
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(3, 1fr)' }, gap: 2.5, mb: 3.5 }}>
        <Card elevation={0} sx={{ borderRadius: 3, border: '1px solid #e2e8f0', bgcolor: '#ffffff' }}>
          <CardContent sx={{ p: 2.5, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Box>
              <Typography sx={{ fontSize: '13px', fontWeight: 600, color: '#64748b', mb: 0.5 }}>
                Tổng số việc làm
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: 800, color: '#0f172a' }}>
                {totalJobsCount}
              </Typography>
              <Typography sx={{ fontSize: '11.5px', color: '#00b14f', fontWeight: 600, mt: 0.5 }}>
                ● Đang công khai
              </Typography>
            </Box>
            <Box
              sx={{
                width: 48,
                height: 48,
                borderRadius: '12px',
                bgcolor: '#e6f7ef',
                color: '#00b14f',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <WorkOutlinedIcon sx={{ fontSize: 26 }} />
            </Box>
          </CardContent>
        </Card>

        <Card elevation={0} sx={{ borderRadius: 3, border: '1px solid #e2e8f0', bgcolor: '#ffffff' }}>
          <CardContent sx={{ p: 2.5, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Box>
              <Typography sx={{ fontSize: '13px', fontWeight: 600, color: '#64748b', mb: 0.5 }}>
                Tuyển gấp (Hot Jobs)
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: 800, color: '#ef4444' }}>
                {hotJobsCount}
              </Typography>
              <Typography sx={{ fontSize: '11.5px', color: '#ef4444', fontWeight: 600, mt: 0.5 }}>
                Ưu tiên hiển thị
              </Typography>
            </Box>
            <Box
              sx={{
                width: 48,
                height: 48,
                borderRadius: '12px',
                bgcolor: '#fee2e2',
                color: '#ef4444',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <FlashOnIcon sx={{ fontSize: 26 }} />
            </Box>
          </CardContent>
        </Card>

        <Card elevation={0} sx={{ borderRadius: 3, border: '1px solid #e2e8f0', bgcolor: '#ffffff' }}>
          <CardContent sx={{ p: 2.5, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Box>
              <Typography sx={{ fontSize: '13px', fontWeight: 600, color: '#64748b', mb: 0.5 }}>
                Doanh nghiệp tuyển dụng
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: 800, color: '#0284c7' }}>
                {uniqueCompaniesCount}
              </Typography>
              <Typography sx={{ fontSize: '11.5px', color: '#0284c7', fontWeight: 600, mt: 0.5 }}>
                Doanh nghiệp liên kết
              </Typography>
            </Box>
            <Box
              sx={{
                width: 48,
                height: 48,
                borderRadius: '12px',
                bgcolor: '#e0f2fe',
                color: '#0284c7',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <BusinessIcon sx={{ fontSize: 26 }} />
            </Box>
          </CardContent>
        </Card>
      </Box>

      {/* 2. Search, Filter & Action Bar */}
      <Paper
        elevation={0}
        sx={{
          p: 2.5,
          mb: 3,
          borderRadius: 3,
          border: '1px solid #e2e8f0',
          bgcolor: '#ffffff',
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          gap: 2,
          alignItems: { xs: 'stretch', md: 'center' },
          justifyContent: 'space-between',
        }}
      >
        <Box sx={{ display: 'flex', flex: 1, gap: 1.5, flexWrap: 'wrap' }}>
          {/* Search Bar */}
          <TextField
            size="small"
            placeholder="Tìm theo chức danh, công ty..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setPage(0);
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: '#94a3b8', fontSize: 20 }} />
                </InputAdornment>
              ),
            }}
            sx={{ minWidth: { xs: '100%', sm: 260 }, flex: { sm: 1 } }}
          />

          {/* Category Filter */}
          <TextField
            select
            size="small"
            label="Ngành nghề"
            value={categoryFilter}
            onChange={(e) => {
              setCategoryFilter(e.target.value);
              setPage(0);
            }}
            sx={{ minWidth: 170 }}
          >
            <MenuItem value="ALL">Tất cả ngành nghề</MenuItem>
            {categories.map((cat, idx) => (
              <MenuItem key={idx} value={cat.group_name || cat.name || cat}>
                {cat.group_name || cat.name || cat}
              </MenuItem>
            ))}
          </TextField>

          {/* Job Type Filter */}
          <TextField
            select
            size="small"
            label="Hình thức"
            value={jobTypeFilter}
            onChange={(e) => {
              setJobTypeFilter(e.target.value);
              setPage(0);
            }}
            sx={{ minWidth: 150 }}
          >
            <MenuItem value="ALL">Tất cả hình thức</MenuItem>
            <MenuItem value="FULL_TIME">Toàn thời gian</MenuItem>
            <MenuItem value="PART_TIME">Bán thời gian</MenuItem>
            <MenuItem value="FREELANCE">Freelance</MenuItem>
            <MenuItem value="INTERNSHIP">Thực tập sinh</MenuItem>
          </TextField>
        </Box>

        {/* Refresh & Reset Buttons */}
        <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
          {(searchTerm || categoryFilter !== 'ALL' || jobTypeFilter !== 'ALL') && (
            <Button
              variant="text"
              size="small"
              onClick={() => {
                setSearchTerm('');
                setCategoryFilter('ALL');
                setJobTypeFilter('ALL');
                setPage(0);
              }}
              sx={{ textTransform: 'none', color: '#64748b', fontWeight: 600 }}
            >
              Đặt lại lọc
            </Button>
          )}

          <Button
            variant="outlined"
            size="small"
            startIcon={<RefreshIcon />}
            onClick={fetchJobList}
            disabled={loading}
            sx={{
              borderColor: '#e2e8f0',
              color: '#0f172a',
              textTransform: 'none',
              fontWeight: 600,
              borderRadius: '8px',
              '&:hover': { borderColor: '#00b14f', color: '#00b14f', bgcolor: '#f0fdf4' },
            }}
          >
            Làm mới
          </Button>
        </Box>
      </Paper>

      {/* 3. Main Data Table */}
      <Paper elevation={0} sx={{ borderRadius: 3, border: '1px solid #e2e8f0', overflow: 'hidden', bgcolor: '#ffffff' }}>
        <TableContainer sx={{ minHeight: 400 }}>
          <Table sx={{ minWidth: 800 }} aria-label="admin jobs table">
            <TableHead sx={{ bgcolor: '#f8fafc' }}>
              <TableRow>
                <TableCell sx={{ fontWeight: 700, color: '#475569', fontSize: '13px', width: 60 }}>STT</TableCell>
                <TableCell sx={{ fontWeight: 700, color: '#475569', fontSize: '13px' }}>Vị trí tuyển dụng</TableCell>
                <TableCell sx={{ fontWeight: 700, color: '#475569', fontSize: '13px' }}>Công ty</TableCell>
                <TableCell sx={{ fontWeight: 700, color: '#475569', fontSize: '13px' }}>Địa điểm</TableCell>
                <TableCell sx={{ fontWeight: 700, color: '#475569', fontSize: '13px' }}>Mức lương</TableCell>
                <TableCell sx={{ fontWeight: 700, color: '#475569', fontSize: '13px' }}>Hạn nộp</TableCell>
                <TableCell sx={{ fontWeight: 700, color: '#475569', fontSize: '13px' }}>Trạng thái</TableCell>
                <TableCell align="center" sx={{ fontWeight: 700, color: '#475569', fontSize: '13px', width: 90 }}>Chi tiết</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={8} align="center" sx={{ py: 8 }}>
                    <CircularProgress size={36} sx={{ color: '#00b14f', mb: 1.5 }} />
                    <Typography sx={{ color: '#64748b', fontSize: '14px' }}>Đang tải danh sách việc làm...</Typography>
                  </TableCell>
                </TableRow>
              ) : filteredJobs.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} align="center" sx={{ py: 8 }}>
                    <WorkOutlinedIcon sx={{ fontSize: 48, color: '#cbd5e1', mb: 1.5 }} />
                    <Typography variant="h6" sx={{ fontWeight: 700, color: '#475569', mb: 0.5 }}>
                      Không tìm thấy việc làm nào
                    </Typography>
                    <Typography sx={{ color: '#94a3b8', fontSize: '13.5px' }}>
                      Thử thay đổi từ khóa tìm kiếm hoặc bỏ chọn các bộ lọc phía trên.
                    </Typography>
                  </TableCell>
                </TableRow>
              ) : (
                filteredJobs
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((job, index) => {
                    const company = job.company || {};
                    const companyName = company.company_name || company.short_name || 'Chưa cập nhật';
                    const locations = Array.isArray(job.work_location) && job.work_location.length > 0
                      ? job.work_location.map((l) => l.city_name || l.address_detail).filter(Boolean).join(', ')
                      : 'Toàn quốc';

                    return (
                      <TableRow
                        key={job.id || index}
                        hover
                        sx={{
                          '&:hover': { bgcolor: '#f8fafc' },
                          transition: 'background-color 0.15s ease',
                        }}
                      >
                        {/* STT */}
                        <TableCell sx={{ color: '#64748b', fontSize: '13px', fontWeight: 600 }}>
                          {page * rowsPerPage + index + 1}
                        </TableCell>

                        {/* Title & Category */}
                        <TableCell sx={{ maxWidth: 280 }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8, mb: 0.5, flexWrap: 'wrap' }}>
                            {job.is_hot && (
                              <Chip
                                icon={<FlashOnIcon sx={{ fontSize: '12px !important', color: '#ffffff !important' }} />}
                                label="HOT"
                                size="small"
                                sx={{
                                  bgcolor: '#ef4444',
                                  color: '#ffffff',
                                  fontWeight: 800,
                                  fontSize: '10px',
                                  height: '18px',
                                }}
                              />
                            )}
                            <Typography
                              sx={{
                                fontWeight: 700,
                                fontSize: '14px',
                                color: '#0f172a',
                                lineHeight: 1.3,
                                cursor: 'pointer',
                                '&:hover': { color: '#00b14f' },
                              }}
                              onClick={() => handleOpenView(job)}
                            >
                              {job.title}
                            </Typography>
                          </Box>
                          <Typography sx={{ fontSize: '12px', color: '#64748b' }}>
                            {job.category || 'Chung'} • {job.job_type || 'FULL_TIME'}
                          </Typography>
                        </TableCell>

                        {/* Company */}
                        <TableCell sx={{ maxWidth: 220 }}>
                          <Typography sx={{ fontSize: '13.5px', fontWeight: 600, color: '#334155' }}>
                            {companyName}
                          </Typography>
                          {company.tax_code && (
                            <Typography sx={{ fontSize: '11px', color: '#94a3b8' }}>
                              MST: {company.tax_code}
                            </Typography>
                          )}
                        </TableCell>

                        {/* Location */}
                        <TableCell sx={{ maxWidth: 180 }}>
                          <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 0.5 }}>
                            <LocationOnOutlinedIcon sx={{ fontSize: 16, color: '#64748b', mt: 0.2 }} />
                            <Typography sx={{ fontSize: '13px', color: '#475569' }}>
                              {locations}
                            </Typography>
                          </Box>
                        </TableCell>

                        {/* Salary */}
                        <TableCell sx={{ minWidth: 140 }}>
                          <Chip
                            icon={<MonetizationOnOutlinedIcon sx={{ fontSize: '14px !important', color: '#00b14f !important' }} />}
                            label={formatSalary(job.salary)}
                            size="small"
                            sx={{
                              bgcolor: '#e6f7ef',
                              color: '#00b14f',
                              fontWeight: 700,
                              fontSize: '12px',
                            }}
                          />
                        </TableCell>

                        {/* Deadline */}
                        <TableCell sx={{ minWidth: 110 }}>
                          <Typography sx={{ fontSize: '13px', color: '#475569', fontWeight: 500 }}>
                            {formatDate(job.deadline)}
                          </Typography>
                        </TableCell>

                        {/* Status */}
                        <TableCell sx={{ minWidth: 110 }}>
                          <Chip
                            label="Đang mở"
                            size="small"
                            sx={{
                              bgcolor: '#dcfce7',
                              color: '#15803d',
                              fontWeight: 700,
                              fontSize: '11.5px',
                              height: '22px',
                            }}
                          />
                        </TableCell>

                        {/* Actions */}
                        <TableCell align="center">
                          <Tooltip title="Xem chi tiết">
                            <IconButton
                              size="small"
                              onClick={() => handleOpenView(job)}
                              sx={{ color: '#0284c7', '&:hover': { bgcolor: '#e0f2fe' } }}
                            >
                              <VisibilityOutlinedIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>
                        </TableCell>
                      </TableRow>
                    );
                  })
              )}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Table Pagination */}
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredJobs.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={(_, newPage) => setPage(newPage)}
          onRowsPerPageChange={(e) => {
            setRowsPerPage(parseInt(e.target.value, 10));
            setPage(0);
          }}
          labelRowsPerPage="Số dòng mỗi trang:"
          labelDisplayedRows={({ from, to, count }) => `${from}–${to} trên ${count}`}
          sx={{ borderTop: '1px solid #e2e8f0' }}
        />
      </Paper>

      {/* View Job Detail Dialog */}
      <Dialog
        open={viewDialogOpen}
        onClose={handleCloseView}
        maxWidth="md"
        fullWidth
        PaperProps={{ sx: { borderRadius: 3, p: { xs: 1, sm: 2 } } }}
      >
        <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', pb: 1 }}>
          <Box sx={{ pr: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5, flexWrap: 'wrap' }}>
              {selectedJob?.is_hot && (
                <Chip label="TUYỂN GẤP" size="small" sx={{ bgcolor: '#ef4444', color: '#fff', fontWeight: 800, fontSize: '10px' }} />
              )}
              <Typography variant="h6" sx={{ fontWeight: 800, color: '#0f172a', fontSize: '18px' }}>
                {selectedJob?.title}
              </Typography>
            </Box>
            <Typography sx={{ color: '#00b14f', fontWeight: 700, fontSize: '14px' }}>
              {selectedJob?.company?.company_name || selectedJob?.company?.short_name || 'Công ty tuyển dụng'}
            </Typography>
          </Box>
          <IconButton onClick={handleCloseView} size="small">
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <Divider />

        <DialogContent sx={{ py: 2.5 }}>
          {selectedJob && (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
              {/* Overview grid */}
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: { xs: '1fr', sm: 'repeat(3, 1fr)' },
                  gap: 2,
                  p: 2,
                  bgcolor: '#f8fafc',
                  borderRadius: 2,
                  border: '1px solid #e2e8f0',
                }}
              >
                <Box>
                  <Typography sx={{ fontSize: '12px', color: '#64748b' }}>Mức lương</Typography>
                  <Typography sx={{ fontSize: '14.5px', fontWeight: 700, color: '#00b14f' }}>
                    {formatSalary(selectedJob.salary)}
                  </Typography>
                </Box>
                <Box>
                  <Typography sx={{ fontSize: '12px', color: '#64748b' }}>Kinh nghiệm</Typography>
                  <Typography sx={{ fontSize: '14.5px', fontWeight: 700, color: '#0f172a' }}>
                    {selectedJob.experience_level || 'Không yêu cầu'}
                  </Typography>
                </Box>
                <Box>
                  <Typography sx={{ fontSize: '12px', color: '#64748b' }}>Hạn nộp hồ sơ</Typography>
                  <Typography sx={{ fontSize: '14.5px', fontWeight: 700, color: '#0f172a' }}>
                    {formatDate(selectedJob.deadline)}
                  </Typography>
                </Box>
              </Box>

              {/* Description HTML */}
              {selectedJob.description_html && (
                <Box>
                  <Typography sx={{ fontWeight: 800, fontSize: '15px', color: '#0f172a', mb: 1 }}>
                    1. Mô tả công việc
                  </Typography>
                  <Box
                    sx={{
                      p: 2,
                      bgcolor: '#f8fafc',
                      borderRadius: 2,
                      fontSize: '14px',
                      lineHeight: 1.6,
                      color: '#334155',
                      '& p': { m: 0, mb: 1 },
                      '& ul': { pl: 2.5, m: 0 },
                    }}
                    dangerouslySetInnerHTML={{ __html: selectedJob.description_html }}
                  />
                </Box>
              )}

              {/* Requirements HTML */}
              {selectedJob.requirements_html && (
                <Box>
                  <Typography sx={{ fontWeight: 800, fontSize: '15px', color: '#0f172a', mb: 1 }}>
                    2. Yêu cầu ứng viên
                  </Typography>
                  <Box
                    sx={{
                      p: 2,
                      bgcolor: '#f8fafc',
                      borderRadius: 2,
                      fontSize: '14px',
                      lineHeight: 1.6,
                      color: '#334155',
                      '& p': { m: 0, mb: 1 },
                      '& ul': { pl: 2.5, m: 0 },
                    }}
                    dangerouslySetInnerHTML={{ __html: selectedJob.requirements_html }}
                  />
                </Box>
              )}

              {/* Benefits HTML */}
              {selectedJob.benefits_html && (
                <Box>
                  <Typography sx={{ fontWeight: 800, fontSize: '15px', color: '#0f172a', mb: 1 }}>
                    3. Quyền lợi được hưởng
                  </Typography>
                  <Box
                    sx={{
                      p: 2,
                      bgcolor: '#f8fafc',
                      borderRadius: 2,
                      fontSize: '14px',
                      lineHeight: 1.6,
                      color: '#334155',
                      '& p': { m: 0, mb: 1 },
                      '& ul': { pl: 2.5, m: 0 },
                    }}
                    dangerouslySetInnerHTML={{ __html: selectedJob.benefits_html }}
                  />
                </Box>
              )}
            </Box>
          )}
        </DialogContent>

        <DialogActions sx={{ px: 3, pb: 2, pt: 1 }}>
          <Button
            onClick={handleCloseView}
            variant="contained"
            sx={{
              bgcolor: '#00b14f',
              borderRadius: '8px',
              px: 3,
              fontWeight: 700,
              textTransform: 'none',
              '&:hover': { bgcolor: '#009643' },
            }}
          >
            Đóng
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar Notification */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert
          onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
          severity={snackbar.severity}
          variant="filled"
          sx={{ borderRadius: 2, fontWeight: 600 }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </AdminLayout>
  );
};

export default AdminJobs;
