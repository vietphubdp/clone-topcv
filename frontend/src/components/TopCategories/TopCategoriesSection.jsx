import React from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import CategoryCard from './CategoryCard';
import { mockCategories } from '../../data/mockCategories';
import './TopCategories.css';

const TopCategoriesSection = () => {
  return (
    <section className="top-categories-section">
      <div className="topcv-container">
        {/* Header Row */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justify: 'space-between',
            flexWrap: 'wrap',
            gap: 2,
          }}
        >
          {/* Title & Subtitle */}
          <Box>
            <Typography
              variant="h5"
              sx={{
                fontWeight: 800,
                color: '#00b14f',
                fontSize: { xs: '20px', md: '24px' },
                letterSpacing: '-0.3px',
                mb: 0.5,
              }}
            >
              Top ngành nghề nổi bật
            </Typography>
            <Typography sx={{ fontSize: '14px', color: '#666666' }}>
              Bạn muốn tìm việc mới? Xem danh sách việc làm{' '}
              <span
                style={{
                  color: '#00b14f',
                  fontWeight: 600,
                  textDecoration: 'underline',
                  cursor: 'pointer',
                }}
              >
                tại đây
              </span>
            </Typography>
          </Box>

          {/* Slider Arrow Buttons */}
          <Box sx={{ display: 'flex', gap: 1 }}>
            <IconButton
              size="small"
              sx={{
                width: 32,
                height: 32,
                border: '1px solid #00b14f',
                color: '#00b14f',
                '&:hover': { backgroundColor: '#e6f7ef' },
              }}
            >
              <ChevronLeftIcon fontSize="small" />
            </IconButton>
            <IconButton
              size="small"
              sx={{
                width: 32,
                height: 32,
                border: '1px solid #00b14f',
                color: '#00b14f',
                '&:hover': { backgroundColor: '#e6f7ef' },
              }}
            >
              <ChevronRightIcon fontSize="small" />
            </IconButton>
          </Box>
        </Box>

        {/* 4 Columns x 2 Rows Categories Grid */}
        <div className="categories-grid">
          {mockCategories.map((cat) => (
            <CategoryCard key={cat.id} category={cat} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TopCategoriesSection;
