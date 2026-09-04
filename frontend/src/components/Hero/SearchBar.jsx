import React, { useState } from 'react';
import { Box, InputBase, Button, MenuItem, Select, FormControl } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const SearchBar = () => {
  const [location, setLocation] = useState('all');

  return (
    <Box
      sx={{
        backgroundColor: '#ffffff',
        borderRadius: { xs: '24px', md: '50px' },
        padding: { xs: '12px 16px', md: '6px 8px 6px 24px' },
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        alignItems: 'center',
        gap: { xs: 1.5, md: 0 },
        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)',
        width: '100%',
        maxWidth: '860px',
        margin: '0 auto',
        boxSizing: 'border-box',
      }}
    >
      {/* Search Query Input */}
      <Box sx={{ width: '100%', flex: 1, display: 'flex', alignItems: 'center' }}>
        <InputBase
          placeholder="Vị trí tuyển dụng, tên công ty"
          sx={{
            ml: 1,
            flex: 1,
            fontSize: '14.5px',
            color: '#212f3f',
            fontWeight: 500,
            '& input::placeholder': {
              color: '#888888',
              opacity: 1,
            },
          }}
        />
      </Box>

      {/* Divider (Desktop Only) */}
      <Box
        sx={{
          display: { xs: 'none', md: 'block' },
          height: '28px',
          width: '1px',
          backgroundColor: '#e0e0e0',
          mx: 2,
        }}
      />

      {/* Location Selector */}
      <Box
        sx={{
          width: { xs: '100%', md: 'auto' },
          display: 'flex',
          alignItems: 'center',
          minWidth: { xs: '100%', md: '140px' },
          borderTop: { xs: '1px solid #f0f0f0', md: 'none' },
          pt: { xs: 1, md: 0 },
        }}
      >
        <LocationOnOutlinedIcon sx={{ color: '#555', fontSize: '20px', mr: 1 }} />
        <FormControl variant="standard" fullWidth sx={{ border: 'none' }}>
          <Select
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            disableUnderline
            IconComponent={KeyboardArrowDownIcon}
            sx={{
              fontSize: '14px',
              fontWeight: 600,
              color: '#212f3f',
              '& .MuiSelect-select': {
                paddingRight: '24px !important',
                py: 0.5,
              },
              '& .MuiSvgIcon-root': {
                color: '#555',
                fontSize: '20px',
              },
            }}
          >
            <MenuItem value="all">Địa điểm</MenuItem>
            <MenuItem value="hanoi">Hà Nội</MenuItem>
            <MenuItem value="hcm">TP. Hồ Chí Minh</MenuItem>
            <MenuItem value="danang">Đà Nẵng</MenuItem>
            <MenuItem value="miennam">Miền Nam</MenuItem>
            <MenuItem value="mienbac">Miền Bắc</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {/* Search Button */}
      <Button
        variant="contained"
        startIcon={<SearchIcon />}
        sx={{
          backgroundColor: '#00b14f',
          color: '#ffffff',
          borderRadius: '30px',
          width: { xs: '100%', md: 'auto' },
          px: 3.5,
          py: 1.2,
          fontSize: '15px',
          fontWeight: 700,
          textTransform: 'none',
          ml: { xs: 0, md: 2 },
          '&:hover': {
            backgroundColor: '#009643',
          },
        }}
      >
        Tìm kiếm
      </Button>
    </Box>
  );
};

export default SearchBar;
