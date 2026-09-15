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
  Button,
  TextField,
  InputAdornment,
  MenuItem,
  Chip,
  CircularProgress,
  Snackbar,
  Alert,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import RefreshIcon from '@mui/icons-material/Refresh';
import BusinessIcon from '@mui/icons-material/Business';
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import AdminLayout from './AdminLayout';
import { getCompanies } from '../../services/api';

const AdminCompanies = () => {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);

  // Search & Filters
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');

  // Notification Toast
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const fetchCompanyList = async () => {
    setLoading(true);
    try {
      const res = await getCompanies({ page: 1 });
      const data = res?.data || (Array.isArray(res) ? res : []);
      setCompanies(data);
    } catch (err) {
      console.error('Error fetching companies:', err);
      setSnackbar({
        open: true,
        message: 'Không thể tải danh sách công ty. Vui lòng thử lại!',
        severity: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCompanyList();
  }, []);

  // Filtered companies based on search and status filter
  const filteredCompanies = useMemo(() => {
    return companies.filter((c) => {
      const s = searchTerm.trim().toLowerCase();
      const matchesSearch =
        !s ||
        (c.company_name && c.company_name.toLowerCase().includes(s)) ||
        (c.tax_code && c.tax_code.toLowerCase().includes(s)) ||
        (c.email && c.email.toLowerCase().includes(s)) ||
        (c.director && c.director.toLowerCase().includes(s)) ||
        (c.phone_number && c.phone_number.toLowerCase().includes(s));

      const matchesStatus =
        statusFilter === 'ALL' || c.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [companies, searchTerm, statusFilter]);

  // Status Chip Rendering
  const renderStatusChip = (status) => {
    if (status === 'ACTIVE') {
      return (
        <Chip
          label="Đang hoạt động"
          size="small"
          sx={{
            bgcolor: '#ecfdf5',
            color: '#059669',
            fontWeight: 700,
            fontSize: '11px',
            border: '1px solid #a7f3d0',
          }}
        />
      );
    }
    if (status === 'PENDING') {
      return (
        <Chip
          label="Chờ xét duyệt"
          size="small"
          sx={{
            bgcolor: '#fffbeb',
            color: '#d97706',
            fontWeight: 700,
            fontSize: '11px',
            border: '1px solid #fde68a',
          }}
        />
      );
    }
    if (status === 'REJECTED') {
      return (
        <Chip
          label="Từ chối"
          size="small"
          sx={{
            bgcolor: '#fef2f2',
            color: '#dc2626',
            fontWeight: 700,
            fontSize: '11px',
            border: '1px solid #fecaca',
          }}
        />
      );
    }
    return (
      <Chip
        label={status || 'Mới'}
        size="small"
        sx={{
          bgcolor: '#f1f5f9',
          color: '#475569',
          fontWeight: 700,
          fontSize: '11px',
        }}
      />
    );
  };

  return (
    <AdminLayout title="Danh sách công ty">
      <Box sx={{ mb: 3 }}>
        {/* Filter & Action Toolbar */}
        <Paper
          elevation={0}
          sx={{
            p: 2,
            mb: 2.5,
            borderRadius: '12px',
            border: '1px solid #e2e8f0',
            display: 'flex',
            flexWrap: 'wrap',
            gap: 1.5,
            alignItems: 'center',
            justifyContent: 'space-between',
            bgcolor: '#ffffff',
          }}
        >
          {/* Search Box */}
          <TextField
            size="small"
            placeholder="Tìm theo tên công ty, MST, email, đại diện..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: '#94a3b8', fontSize: 20 }} />
                </InputAdornment>
              ),
            }}
            sx={{
              width: { xs: '100%', sm: 380 },
              '& .MuiOutlinedInput-root': {
                borderRadius: '8px',
                fontSize: '13.5px',
                backgroundColor: '#f8fafc',
              },
            }}
          />

          {/* Right Filters */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, flexWrap: 'wrap', width: { xs: '100%', sm: 'auto' } }}>
            <TextField
              select
              size="small"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              sx={{
                minWidth: 160,
                '& .MuiOutlinedInput-root': {
                  borderRadius: '8px',
                  fontSize: '13px',
                  backgroundColor: '#f8fafc',
                },
              }}
            >
              <MenuItem value="ALL" sx={{ fontSize: '13px' }}>Tất cả trạng thái</MenuItem>
              <MenuItem value="ACTIVE" sx={{ fontSize: '13px' }}>Đang hoạt động</MenuItem>
              <MenuItem value="PENDING" sx={{ fontSize: '13px' }}>Chờ xét duyệt</MenuItem>
              <MenuItem value="REJECTED" sx={{ fontSize: '13px' }}>Từ chối</MenuItem>
            </TextField>

            <Button
              variant="outlined"
              size="small"
              startIcon={<RefreshIcon />}
              onClick={fetchCompanyList}
              disabled={loading}
              sx={{
                borderColor: '#e2e8f0',
                color: '#475569',
                borderRadius: '8px',
                textTransform: 'none',
                fontWeight: 600,
                fontSize: '13px',
                height: 40,
                px: 2,
                '&:hover': {
                  borderColor: '#00b14f',
                  color: '#00b14f',
                  bgcolor: '#f0fdf4',
                },
              }}
            >
              Làm mới
            </Button>
          </Box>
        </Paper>

        {/* Company Table */}
        <Paper
          elevation={0}
          sx={{
            borderRadius: '12px',
            border: '1px solid #e2e8f0',
            overflow: 'hidden',
            bgcolor: '#ffffff',
          }}
        >
          <TableContainer>
            <Table sx={{ minWidth: 750 }}>
              <TableHead sx={{ bgcolor: '#f8fafc' }}>
                <TableRow>
                  <TableCell sx={{ fontWeight: 700, fontSize: '12.5px', color: '#475569', py: 1.8, width: '60px' }}>STT</TableCell>
                  <TableCell sx={{ fontWeight: 700, fontSize: '12.5px', color: '#475569' }}>Doanh nghiệp</TableCell>
                  <TableCell sx={{ fontWeight: 700, fontSize: '12.5px', color: '#475569' }}>Mã số thuế</TableCell>
                  <TableCell sx={{ fontWeight: 700, fontSize: '12.5px', color: '#475569' }}>Người đại diện</TableCell>
                  <TableCell sx={{ fontWeight: 700, fontSize: '12.5px', color: '#475569' }}>Liên hệ</TableCell>
                  <TableCell sx={{ fontWeight: 700, fontSize: '12.5px', color: '#475569' }}>Địa chỉ</TableCell>
                  <TableCell sx={{ fontWeight: 700, fontSize: '12.5px', color: '#475569' }}>Trạng thái</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={7} align="center" sx={{ py: 6 }}>
                      <CircularProgress size={32} sx={{ color: '#00b14f', mb: 1.5 }} />
                      <Typography sx={{ fontSize: '13.5px', color: '#64748b' }}>
                        Đang tải danh sách công ty...
                      </Typography>
                    </TableCell>
                  </TableRow>
                ) : filteredCompanies.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} align="center" sx={{ py: 8 }}>
                      <BusinessIcon sx={{ fontSize: 48, color: '#cbd5e1', mb: 1 }} />
                      <Typography sx={{ fontWeight: 700, fontSize: '15px', color: '#334155' }}>
                        Không tìm thấy công ty nào
                      </Typography>
                      <Typography sx={{ fontSize: '13px', color: '#94a3b8', mt: 0.5 }}>
                        Thử thay đổi từ khóa tìm kiếm hoặc bộ lọc trạng thái phía trên.
                      </Typography>
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredCompanies.map((company, index) => {
                    return (
                      <TableRow
                        key={company.id}
                        hover
                        sx={{
                          '&:last-child td, &:last-child th': { border: 0 },
                          transition: 'background-color 0.15s ease',
                        }}
                      >
                        {/* STT */}
                        <TableCell sx={{ fontSize: '13px', color: '#64748b', fontWeight: 600 }}>
                          {index + 1}
                        </TableCell>

                        {/* Doanh nghiệp: chỉ hiển thị tên công ty */}
                        <TableCell sx={{ fontWeight: 700, fontSize: '13.5px', color: '#0f172a' }}>
                          {company.company_name || '-'}
                        </TableCell>

                        {/* Tax Code */}
                        <TableCell sx={{ fontSize: '13px', fontWeight: 600, color: '#334155' }}>
                          <Box
                            sx={{
                              bgcolor: '#f1f5f9',
                              px: 1,
                              py: 0.4,
                              borderRadius: '6px',
                              display: 'inline-block',
                              fontFamily: 'monospace',
                              fontSize: '12px',
                            }}
                          >
                            {company.tax_code || '-'}
                          </Box>
                        </TableCell>

                        {/* Director */}
                        <TableCell sx={{ fontSize: '13px', color: '#334155', fontWeight: 500 }}>
                          {company.director || '-'}
                        </TableCell>

                        {/* Contact info */}
                        <TableCell sx={{ fontSize: '12.5px', color: '#475569' }}>
                          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.3 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.6 }}>
                              <EmailOutlinedIcon sx={{ fontSize: 14, color: '#94a3b8' }} />
                              <span>{company.email || '-'}</span>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.6 }}>
                              <PhoneOutlinedIcon sx={{ fontSize: 14, color: '#94a3b8' }} />
                              <span>{company.phone_number || '-'}</span>
                            </Box>
                          </Box>
                        </TableCell>

                        {/* Address */}
                        <TableCell sx={{ maxWidth: 260 }}>
                          <Typography
                            sx={{
                              fontSize: '12.5px',
                              color: '#475569',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              whiteSpace: 'nowrap',
                            }}
                          >
                            {company.headquarters_address || '-'}
                          </Typography>
                        </TableCell>

                        {/* Status */}
                        <TableCell>
                          {renderStatusChip(company.status)}
                        </TableCell>
                      </TableRow>
                    );
                  })
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Box>

      {/* Snackbar Toast */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          sx={{ borderRadius: '10px', fontWeight: 600 }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </AdminLayout>
  );
};

export default AdminCompanies;
