import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, InputBase, Button, MenuItem, Select, FormControl } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const CITY_OPTIONS = [
  { value: 'all', label: 'Địa điểm', cityId: 0 },
  { value: 'hanoi', label: 'Hà Nội', cityId: 1 },
  { value: 'hcm', label: 'TP. Hồ Chí Minh', cityId: 2 },
  { value: 'danang', label: 'Đà Nẵng', cityId: 3 },
  { value: 'haiphong', label: 'Hải Phòng', cityId: 4 },
  { value: 'cantho', label: 'Cần Thơ', cityId: 5 },
  { value: 'binhduong', label: 'Bình Dương', cityId: 6 },
  { value: 'dongnai', label: 'Đồng Nai', cityId: 7 },
  { value: 'bacninh', label: 'Bắc Ninh', cityId: 8 },
];

const SearchBar = () => {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState('');
  const [location, setLocation] = useState('all');

  const handleSearch = (e) => {
    if (e) e.preventDefault();
    const cityObj = CITY_OPTIONS.find((c) => c.value === location);
    const cityId = cityObj && cityObj.cityId > 0 ? cityObj.cityId : 0;

    const params = new URLSearchParams();
    if (keyword.trim()) params.set('keyword', keyword.trim());
    if (cityId > 0) params.set('city_id', cityId);

    navigate(`/jobs?${params.toString()}`);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSearch}
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
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
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
            {CITY_OPTIONS.map((c) => (
              <MenuItem key={c.value} value={c.value}>
                {c.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      {/* Search Button */}
      <Button
        type="submit"
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
