import React, { useRef } from 'react';
import { Box, Typography, Button, IconButton, CircularProgress } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

const FilterBar = ({ activeCategorySlug, setActiveCategorySlug, categories, loadingCategories }) => {
  const tabsContainerRef = useRef(null);

  const handleScroll = (direction) => {
    if (tabsContainerRef.current) {
      const scrollAmount = direction === 'left' ? -250 : 250;
      tabsContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 2 }}>
      {/* Header & Category Tabs Slider */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justify: 'space-between',
          flexWrap: 'wrap',
          gap: 2,
        }}
      >
        {/* Left: Section Title */}
        <Typography
          variant="h5"
          sx={{
            fontWeight: 800,
            color: '#00b14f',
            fontSize: { xs: '20px', md: '24px' },
            letterSpacing: '-0.3px',
            whiteSpace: 'nowrap',
          }}
        >
          Việc làm nổi bật
        </Typography>

        {/* Right: Scrollable Category Tabs & Arrows */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, maxWith: '100%', overflow: 'hidden', flex: 1, justifyContent: 'flex-end' }}>
          {/* Scroll Left Button */}
          <IconButton
            size="small"
            onClick={() => handleScroll('left')}
            sx={{
              width: 32,
              height: 32,
              border: '1px solid #00b14f',
              color: '#00b14f',
              flexShrink: 0,
              '&:hover': { backgroundColor: '#e6f7ef' },
            }}
          >
            <ChevronLeftIcon fontSize="small" />
          </IconButton>

          {/* Scrollable Container for Category Tabs */}
          <Box
            ref={tabsContainerRef}
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              overflowX: 'auto',
              py: 0.5,
              scrollBehavior: 'smooth',
              '&::-webkit-scrollbar': { display: 'none' },
              msOverflowStyle: 'none',
              scrollbarWidth: 'none',
            }}
          >
            {loadingCategories ? (
              <Box sx={{ display: 'flex', alignItems: 'center', px: 2 }}>
                <CircularProgress size={20} sx={{ color: '#00b14f' }} />
              </Box>
            ) : (
              categories.map((cat) => {
                const isActive = activeCategorySlug === cat.slug;
                return (
                  <Button
                    key={cat.id || cat.slug}
                    variant={isActive ? 'contained' : 'text'}
                    onClick={() => setActiveCategorySlug(cat.slug)}
                    sx={{
                      borderRadius: '20px',
                      px: 2.2,
                      py: 0.6,
                      fontWeight: 700,
                      fontSize: '13px',
                      textTransform: 'none',
                      whiteSpace: 'nowrap',
                      flexShrink: 0,
                      backgroundColor: isActive ? '#00b14f' : '#e8ecf0',
                      color: isActive ? '#ffffff' : '#444444',
                      boxShadow: 'none',
                      '&:hover': {
                        backgroundColor: isActive ? '#009643' : '#dbe2e8',
                        boxShadow: 'none',
                      },
                    }}
                  >
                    {cat.name}
                  </Button>
                );
              })
            )}
          </Box>

          {/* Scroll Right Button */}
          <IconButton
            size="small"
            onClick={() => handleScroll('right')}
            sx={{
              width: 32,
              height: 32,
              border: '1px solid #00b14f',
              color: '#00b14f',
              flexShrink: 0,
              '&:hover': { backgroundColor: '#e6f7ef' },
            }}
          >
            <ChevronRightIcon fontSize="small" />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
};

export default FilterBar;
