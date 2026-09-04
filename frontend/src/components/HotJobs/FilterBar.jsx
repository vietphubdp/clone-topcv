import React, { useState } from 'react';
import { Box, Typography, Button, MenuItem, Select, FormControl, IconButton, Collapse } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import FilterListIcon from '@mui/icons-material/FilterList';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import LightbulbOutlinedIcon from '@mui/icons-material/LightbulbOutlined';
import CloseIcon from '@mui/icons-material/Close';

const FilterBar = ({ activeCategory, setActiveCategory, selectedLocation, setSelectedLocation }) => {
  const [filterType, setFilterType] = useState('diadiem');
  const [showAlert, setShowAlert] = useState(true);

  const locations = [
    { id: 'random', label: 'Ngẫu Nhiên' },
    { id: 'hanoi', label: 'Hà Nội' },
    { id: 'hcm', label: 'Thành phố Hồ Chí Minh (cũ)' },
    { id: 'mienbac', label: 'Miền Bắc' },
    { id: 'miennam', label: 'Miền Nam' },
  ];

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 2 }}>
      {/* Row 1: Section Title, Sub-tabs & View All Controls */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justify: 'space-between',
          flexWrap: 'wrap',
          gap: 2,
        }}
      >
        {/* Left: Section Title & Job Type Tabs */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Typography
            variant="h5"
            sx={{
              fontWeight: 800,
              color: '#00b14f',
              fontSize: { xs: '20px', md: '24px' },
              letterSpacing: '-0.3px',
            }}
          >
            Việc làm nổi bật
          </Typography>

          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button
              variant={activeCategory === 'office' ? 'contained' : 'text'}
              onClick={() => setActiveCategory('office')}
              sx={{
                borderRadius: '20px',
                px: 2.2,
                py: 0.6,
                fontWeight: 700,
                fontSize: '13.5px',
                textTransform: 'none',
                backgroundColor: activeCategory === 'office' ? '#00b14f' : '#e8ecf0',
                color: activeCategory === 'office' ? '#ffffff' : '#444444',
                '&:hover': {
                  backgroundColor: activeCategory === 'office' ? '#009643' : '#dbe2e8',
                },
              }}
            >
              Việc văn phòng
            </Button>
            <Button
              variant={activeCategory === 'general' ? 'contained' : 'text'}
              onClick={() => setActiveCategory('general')}
              sx={{
                borderRadius: '20px',
                px: 2.2,
                py: 0.6,
                fontWeight: 700,
                fontSize: '13.5px',
                textTransform: 'none',
                backgroundColor: activeCategory === 'general' ? '#00b14f' : '#e8ecf0',
                color: activeCategory === 'general' ? '#ffffff' : '#444444',
                '&:hover': {
                  backgroundColor: activeCategory === 'general' ? '#009643' : '#dbe2e8',
                },
              }}
            >
              Việc phổ thông
            </Button>
          </Box>
        </Box>

        {/* Right: View All Link & Arrow Sliders */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Typography
            sx={{
              fontSize: '13.5px',
              fontWeight: 600,
              color: '#212f3f',
              cursor: 'pointer',
              textDecoration: 'underline',
              '&:hover': { color: '#00b14f' },
            }}
          >
            Xem tất cả
          </Typography>
          <Box sx={{ display: 'flex', gap: 0.8 }}>
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
      </Box>

      {/* Row 2: Location Filter Dropdown & Quick Filter Pills */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 2,
          flexWrap: 'wrap',
        }}
      >
        {/* Left Filter Dropdown */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            backgroundColor: '#ffffff',
            border: '1px solid #d0d7de',
            borderRadius: '20px',
            px: 2,
            py: 0.4,
          }}
        >
          <FilterListIcon sx={{ color: '#666', fontSize: '18px', mr: 1 }} />
          <Typography sx={{ fontSize: '13.5px', color: '#666', mr: 1, whiteSpace: 'nowrap' }}>
            Lọc theo:
          </Typography>
          <FormControl variant="standard">
            <Select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              disableUnderline
              IconComponent={KeyboardArrowDownIcon}
              sx={{
                fontSize: '13.5px',
                fontWeight: 600,
                color: '#212f3f',
                '& .MuiSelect-select': { py: 0.4, pr: '20px !important' },
              }}
            >
              <MenuItem value="diadiem">Địa điểm</MenuItem>
              <MenuItem value="nganhnghe">Ngành nghề</MenuItem>
              <MenuItem value="mucluong">Mức lương</MenuItem>
              <MenuItem value="kinhnghiem">Kinh nghiệm</MenuItem>
            </Select>
          </FormControl>
        </Box>

        {/* Location Quick Filter Pills Slider */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flex: 1, overflowX: 'auto', py: 0.5 }}>
          <IconButton
            size="small"
            sx={{
              width: 28,
              height: 28,
              border: '1px solid #00b14f',
              color: '#00b14f',
              flexShrink: 0,
              '&:hover': { backgroundColor: '#e6f7ef' },
            }}
          >
            <ChevronLeftIcon fontSize="small" />
          </IconButton>

          {locations.map((loc) => {
            const isSelected = selectedLocation === loc.id;
            return (
              <Button
                key={loc.id}
                onClick={() => setSelectedLocation(loc.id)}
                sx={{
                  borderRadius: '20px',
                  px: 2,
                  py: 0.5,
                  fontSize: '13px',
                  fontWeight: 600,
                  textTransform: 'none',
                  whiteSpace: 'nowrap',
                  flexShrink: 0,
                  backgroundColor: isSelected ? '#00b14f' : '#e8ecf0',
                  color: isSelected ? '#ffffff' : '#333333',
                  boxShadow: 'none',
                  '&:hover': {
                    backgroundColor: isSelected ? '#009643' : '#dbe2e8',
                    boxShadow: 'none',
                  },
                }}
              >
                {loc.label}
              </Button>
            );
          })}

          <IconButton
            size="small"
            sx={{
              width: 28,
              height: 28,
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

      {/* Row 3: Light Blue Suggestion Alert Bar */}
      <Collapse in={showAlert}>
        <Box
          sx={{
            backgroundColor: '#eaf4ff',
            border: '1px solid #cce3ff',
            borderRadius: '8px',
            px: 2,
            py: 1,
            display: 'flex',
            alignItems: 'center',
            justify: 'space-between',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <LightbulbOutlinedIcon sx={{ color: '#0066cc', fontSize: '20px' }} />
            <Typography sx={{ fontSize: '13px', color: '#004499', fontWeight: 500 }}>
              <strong>Gợi ý:</strong> Di chuột vào tiêu đề việc làm để xem thêm thông tin chi tiết
            </Typography>
          </Box>

          <IconButton
            size="small"
            onClick={() => setShowAlert(false)}
            sx={{ color: '#0066cc', p: 0.3 }}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </Box>
      </Collapse>
    </Box>
  );
};

export default FilterBar;
