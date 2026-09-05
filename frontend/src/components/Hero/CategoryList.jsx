import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, IconButton, Tooltip, Skeleton } from '@mui/material';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

const ITEMS_PER_PAGE = 6;

const CategoryList = ({
  categoryGroups = [],
  loading = false,
  activeCategory,
  onHoverCategory,
}) => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.max(1, Math.ceil(categoryGroups.length / ITEMS_PER_PAGE));

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(1);
    }
  }, [totalPages, currentPage]);

  const currentCategories = categoryGroups.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handlePrev = () => {
    setCurrentPage((prev) => Math.max(1, prev - 1));
  };

  const handleNext = () => {
    setCurrentPage((prev) => Math.min(totalPages, prev + 1));
  };

  const handleCategoryClick = (group) => {
    const slug = group.group_slug || group.slug || '';
    const name = group.group_name || group.name || '';
    navigate(`/jobs?category_slug=${encodeURIComponent(slug)}&category_name=${encodeURIComponent(name)}`);
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
          justifyContent: 'space-between',
          flex: 1,
          mb: 1.5,
        }}
      >
        {loading ? (
          Array.from({ length: 6 }).map((_, index) => (
            <Box
              key={index}
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                py: '9px',
                px: '10px',
              }}
            >
              <Skeleton variant="text" width="80%" height={22} />
              <Skeleton variant="circular" width={16} height={16} />
            </Box>
          ))
        ) : currentCategories.length > 0 ? (
          currentCategories.map((group) => {
            const isActive = activeCategory && activeCategory.id === group.id;
            const displayName = group.group_name || group.name;

            return (
              <Tooltip key={group.id} title={displayName} placement="right" arrow>
                <Box
                  onClick={() => handleCategoryClick(group)}
                  onMouseEnter={() => onHoverCategory && onHoverCategory(group)}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
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
                    {displayName}
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
          })
        ) : (
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
            <Typography sx={{ fontSize: '13px', color: '#999999' }}>
              Không có danh mục nào
            </Typography>
          </Box>
        )}
      </Box>

      {/* Pagination Footer */}
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
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
            disabled={currentPage === 1 || loading}
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
            disabled={currentPage === totalPages || loading}
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
