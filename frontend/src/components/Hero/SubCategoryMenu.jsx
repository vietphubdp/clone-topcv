import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Chip } from '@mui/material';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';

const SubCategoryMenu = ({ category }) => {
  const navigate = useNavigate();
  if (!category) return null;

  const title = category.group_name || category.name || 'Danh mục ngành nghề';
  const groupSlug = category.group_slug || category.slug || '';
  const subCategories = Array.isArray(category.categories) ? category.categories : [];

  const handleTitleClick = () => {
    navigate(`/jobs?category_slug=${encodeURIComponent(groupSlug)}&category_name=${encodeURIComponent(title)}`);
  };

  const handleSubCategoryClick = (item) => {
    const slug = typeof item === 'string' ? '' : item.slug;
    const name = typeof item === 'string' ? item : item.name;
    const querySlug = slug || groupSlug;
    navigate(`/jobs?category_slug=${encodeURIComponent(querySlug)}&category_name=${encodeURIComponent(name)}`);
  };

  return (
    <Box
      className="subcategory-menu-container"
      sx={{
        flex: 1,
        width: '100%',
        height: '350px',
        backgroundColor: '#ffffff',
        borderRadius: '16px',
        boxShadow: '0 4px 16px rgba(0, 0, 0, 0.08)',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        boxSizing: 'border-box',
        overflow: 'hidden',
        animation: 'fadeIn 0.2s ease-in-out',
      }}
    >
      {/* Scrollable Content Container */}
      <Box
        sx={{
          flex: 1,
          overflowY: 'auto',
          p: '20px 24px 45px 24px',
          '&::-webkit-scrollbar': {
            width: '5px',
          },
          '&::-webkit-scrollbar-track': {
            backgroundColor: '#f5f5f5',
            borderRadius: '10px',
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: '#d0d0d0',
            borderRadius: '10px',
            '&:hover': {
              backgroundColor: '#00b14f',
            },
          },
        }}
      >
        {/* Main Sub-industries Section */}
        <Box>
          <Typography
            onClick={handleTitleClick}
            sx={{
              fontSize: '16px',
              fontWeight: 700,
              color: '#212529',
              mb: 2,
              cursor: 'pointer',
              display: 'inline-block',
              transition: 'color 0.2s',
              '&:hover': {
                color: '#00b14f',
              },
            }}
          >
            {title}
          </Typography>

          {subCategories.length > 0 ? (
            <Box
              sx={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '10px 10px',
              }}
            >
              {subCategories.map((item, index) => {
                const label = typeof item === 'string' ? item : item.name;
                const key = item.id || item.slug || index;

                return (
                  <Chip
                    key={key}
                    label={label}
                    onClick={() => handleSubCategoryClick(item)}
                    sx={{
                      backgroundColor: '#f4f6f8',
                      border: '1px solid transparent',
                      borderRadius: '20px',
                      height: 'auto',
                      py: '6px',
                      px: '4px',
                      fontSize: '13px',
                      fontWeight: 500,
                      color: '#495057',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      '& .MuiChip-label': {
                        px: '12px',
                        py: 0,
                      },
                      '&:hover': {
                        backgroundColor: '#e6f7ef',
                        color: '#00b14f',
                        borderColor: '#b2ebd0',
                        transform: 'translateY(-1px)',
                      },
                    }}
                  />
                );
              })}
            </Box>
          ) : (
            <Typography sx={{ fontSize: '13px', color: '#888888', fontStyle: 'italic' }}>
              Chưa có danh mục chi tiết cho nhóm ngành này.
            </Typography>
          )}
        </Box>
      </Box>

      {/* Floating Bottom-Right Scroll Indicator */}
      <Box
        sx={{
          position: 'absolute',
          bottom: '12px',
          right: '16px',
          backgroundColor: '#e6f7ef',
          border: '1px solid #b2ebd0',
          borderRadius: '16px',
          px: '10px',
          py: '3px',
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
          color: '#00b14f',
          fontSize: '12px',
          fontWeight: 600,
          boxShadow: '0 2px 6px rgba(0,0,0,0.06)',
          pointerEvents: 'none',
          zIndex: 5,
        }}
      >
        <KeyboardDoubleArrowDownIcon sx={{ fontSize: '14px' }} />
        Cuộn để xem
      </Box>
    </Box>
  );
};

export default SubCategoryMenu;
