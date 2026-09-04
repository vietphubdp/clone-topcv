import React, { useState } from 'react';
import { Box, Typography, IconButton, Tooltip } from '@mui/material';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

const allCategories = [
  // Page 1
  { id: 1, name: 'Kinh doanh/Bán hàng' },
  { id: 2, name: 'Marketing/PR/Quảng cáo' },
  { id: 3, name: 'Chăm sóc khách hàng (Customer Service)' },
  { id: 4, name: 'Nhân sự/Hành chính/Pháp chế' },
  { id: 5, name: 'Công nghệ Thông tin' },
  { id: 6, name: 'Lao động phổ thông' },

  // Page 2
  { id: 7, name: 'Tài chính/Ngân hàng/Bảo hiểm' },
  { id: 8, name: 'Kế toán/Kiểm toán/Thuế' },
  { id: 9, name: 'Thiết kế/Sáng tạo/Mỹ thuật' },
  { id: 10, name: 'Xây dựng/Kiến trúc' },
  { id: 11, name: 'Biên phiên dịch/Ngoại ngữ' },
  { id: 12, name: 'Nhà hàng/Khách sạn/Du lịch' },

  // Page 3
  { id: 13, name: 'Y tế/Dược/Chăm sóc sức khỏe' },
  { id: 14, name: 'Giáo dục/Đào tạo' },
  { id: 15, name: 'Xuất nhập khẩu/Logistics' },
  { id: 16, name: 'Cơ khí/Tự động hóa' },
  { id: 17, name: 'Nông - Lâm - Ngư nghiệp' },
  { id: 18, name: 'Quản lý/Điều hành' },

  // Page 4
  { id: 19, name: 'Bất động sản' },
  { id: 20, name: 'Truyền thông/Báo chí' },
  { id: 21, name: 'Thời trang/Mỹ phẩm' },
  { id: 22, name: 'Bảo vệ/Vệ sĩ' },
  { id: 23, name: 'Luật/Pháp lý' },
  { id: 24, name: 'Tư vấn kinh doanh' },

  // Page 5
  { id: 25, name: 'Nghệ thuật/Điện ảnh' },
  { id: 26, name: 'Kỹ thuật ô tô' },
  { id: 27, name: 'Môi trường/Xử lý chất thải' },
  { id: 28, name: 'Hóa học/Sinh học' },
  { id: 29, name: 'Hàng không/Hàng hải' },
  { id: 30, name: 'Việc làm tự do (Freelance)' },
];

const ITEMS_PER_PAGE = 6;

const CategoryList = ({ activeCategory, onHoverCategory }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(allCategories.length / ITEMS_PER_PAGE);

  const currentCategories = allCategories.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handlePrev = () => {
    setCurrentPage((prev) => Math.max(1, prev - 1));
  };

  const handleNext = () => {
    setCurrentPage((prev) => Math.min(totalPages, prev + 1));
  };

  return (
    <Box
      sx={{
        display: { xs: 'none', md: 'flex' },
        backgroundColor: '#ffffff',
        borderRadius: '16px',
        p: '16px 20px 14px 20px',
        width: '320px',
        flexShrink: 0,
        boxShadow: '0 4px 16px rgba(0, 0, 0, 0.08)',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '350px',
        boxSizing: 'border-box',
      }}
    >
      {/* Category Items List (6 per page) */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justify: 'space-between',
          flex: 1,
          mb: 1.5,
        }}
      >
        {currentCategories.map((cat) => {
          const isActive = activeCategory && activeCategory.id === cat.id;

          return (
            <Tooltip key={cat.id} title={cat.name} placement="right" arrow>
              <Box
                onMouseEnter={() => onHoverCategory && onHoverCategory(cat)}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justify: 'space-between',
                  py: '9px',
                  px: '10px',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  backgroundColor: isActive ? '#f4fbf7' : 'transparent',
                  '& .cat-text': {
                    color: isActive ? '#00b14f' : '#333333',
                    fontWeight: isActive ? 700 : 600,
                  },
                  '& .cat-icon': {
                    color: isActive ? '#00b14f' : '#999999',
                    transform: isActive ? 'translateX(2px)' : 'none',
                  },
                  '&:hover': {
                    backgroundColor: '#f4fbf7',
                    '& .cat-text': {
                      color: '#00b14f',
                      fontWeight: 700,
                    },
                    '& .cat-icon': {
                      color: '#00b14f',
                      transform: 'translateX(2px)',
                    },
                  },
                }}
              >
                <Typography
                  className="cat-text"
                  sx={{
                    fontSize: '14px',
                    fontWeight: 600,
                    color: '#333333',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  {cat.name}
                </Typography>
                <ChevronRightIcon
                  className="cat-icon"
                  sx={{
                    fontSize: '18px',
                    color: '#999999',
                    transition: 'all 0.2s ease',
                  }}
                />
              </Box>
            </Tooltip>
          );
        })}
      </Box>

      {/* Pagination Footer */}
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justify: 'space-between',
          pt: 1.2,
          mt: 'auto',
          borderTop: '1px solid #f0f0f0',
          boxSizing: 'border-box',
        }}
      >
        <Typography sx={{ fontSize: '13.5px', color: '#777777', fontWeight: 600 }}>
          {currentPage}/{totalPages}
        </Typography>

        <Box sx={{ display: 'flex', gap: 1, ml: 'auto' }}>
          <IconButton
            size="small"
            onClick={handlePrev}
            disabled={currentPage === 1}
            sx={{
              width: 28,
              height: 28,
              border: '1px solid',
              borderColor: currentPage === 1 ? '#e0e0e0' : '#00b14f',
              color: currentPage === 1 ? '#cccccc' : '#00b14f',
              '&:hover': {
                backgroundColor: currentPage === 1 ? 'transparent' : '#e6f7ef',
                borderColor: currentPage === 1 ? '#e0e0e0' : '#00b14f',
              },
            }}
          >
            <ChevronLeftIcon fontSize="small" />
          </IconButton>

          <IconButton
            size="small"
            onClick={handleNext}
            disabled={currentPage === totalPages}
            sx={{
              width: 28,
              height: 28,
              border: '1px solid',
              borderColor: currentPage === totalPages ? '#e0e0e0' : '#00b14f',
              color: currentPage === totalPages ? '#cccccc' : '#00b14f',
              '&:hover': {
                backgroundColor: currentPage === totalPages ? 'transparent' : '#e6f7ef',
                borderColor: currentPage === totalPages ? '#e0e0e0' : '#00b14f',
              },
            }}
          >
            <ChevronRightIcon fontSize="small" />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
};

export default CategoryList;
