import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import {
  Box,
  Typography,
  InputBase,
  Button,
  Select,
  MenuItem,
  FormControl,
  Radio,
  RadioGroup,
  FormControlLabel,
  Checkbox,
  CircularProgress,
  IconButton,
  Pagination,
  Collapse,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import FilterListIcon from '@mui/icons-material/FilterList';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ClearIcon from '@mui/icons-material/Clear';

import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import { getCategories, getJobs } from '../../services/api';
import './Jobs.css';

const CITY_MAP = [
  { id: 0, slug: 'all', name: 'Địa điểm' },
  { id: 1, slug: 'hanoi', name: 'Hà Nội' },
  { id: 2, slug: 'hcm', name: 'TP. Hồ Chí Minh' },
  { id: 3, slug: 'danang', name: 'Đà Nẵng' },
  { id: 4, slug: 'haiphong', name: 'Hải Phòng' },
  { id: 5, slug: 'cantho', name: 'Cần Thơ' },
  { id: 6, slug: 'binhduong', name: 'Bình Dương' },
  { id: 7, slug: 'dongnai', name: 'Đồng Nai' },
  { id: 8, slug: 'bacninh', name: 'Bắc Ninh' },
];

const EXPERIENCE_LEVELS = [
  'Tất cả',
  'Không yêu cầu',
  'Dưới 1 năm',
  '1 năm',
  '2 năm',
  '3 năm',
  '4 năm',
  '5 năm',
  'Trên 5 năm',
];

const SALARY_RANGES = [
  'Tất cả',
  'Dưới 10 triệu',
  '10 - 15 triệu',
  '15 - 20 triệu',
  '20 - 25 triệu',
  '25 - 30 triệu',
  'Trên 30 triệu',
  'Thỏa thuận',
];

const PAGE_SIZE = 20;

const Jobs = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // URL search params
  const searchParams = new URLSearchParams(location.search);
  const initialKeyword = searchParams.get('keyword') || '';
  const initialCategorySlug = searchParams.get('category_slug') || '';
  const initialCategoryName = searchParams.get('category_name') || '';
  const initialCityId = searchParams.get('city_id') ? Number(searchParams.get('city_id')) : 0;
  const initialPage = searchParams.get('page') ? Number(searchParams.get('page')) : 1;

  // Search Bar States
  const [keyword, setKeyword] = useState(initialKeyword);
  const [selectedCityId, setSelectedCityId] = useState(initialCityId);

  // Filter States
  const [categorySlug, setCategorySlug] = useState(initialCategorySlug);
  const [categoryName, setCategoryName] = useState(initialCategoryName);
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [selectedExp, setSelectedExp] = useState([]);
  const [selectedSalary, setSelectedSalary] = useState([]);
  const [searchTarget, setSearchTarget] = useState('title'); // 'title' | 'company' | 'all'
  const [sortOption, setSortOption] = useState('latest'); // 'latest' | 'salary' | 'default'

  // Data States
  const [categoryGroups, setCategoryGroups] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(false);
  const [expandedGroups, setExpandedGroups] = useState({});

  const [jobs, setJobs] = useState([]);
  const [totalJobs, setTotalJobs] = useState(0);
  const [loadingJobs, setLoadingJobs] = useState(false);

  // 1. Fetch Category Groups on Mount
  useEffect(() => {
    const fetchCats = async () => {
      setLoadingCategories(true);
      try {
        const data = await getCategories();
        if (Array.isArray(data)) {
          setCategoryGroups(data);
          // Expand first 2 groups by default
          const initialExpanded = {};
          data.slice(0, 2).forEach((g) => {
            initialExpanded[g.id] = true;
          });
          setExpandedGroups(initialExpanded);

          // If categorySlug exists but categoryName is empty, look up the name
          if (categorySlug && !categoryName) {
            data.forEach((g) => {
              if (g.group_slug === categorySlug) {
                setCategoryName(g.group_name);
              }
              if (Array.isArray(g.categories)) {
                const foundSub = g.categories.find((c) => c.slug === categorySlug);
                if (foundSub) {
                  setCategoryName(foundSub.name);
                }
              }
            });
          }
        }
      } catch (err) {
        console.error('Error fetching categories:', err);
      } finally {
        setLoadingCategories(false);
      }
    };

    fetchCats();
  }, [categorySlug, categoryName]);

  // 2. Sync State when URL parameters change
  useEffect(() => {
    const qKeyword = searchParams.get('keyword') || '';
    const qCatSlug = searchParams.get('category_slug') || '';
    const qCatName = searchParams.get('category_name') || '';
    const qCityId = searchParams.get('city_id') ? Number(searchParams.get('city_id')) : 0;
    const qPage = searchParams.get('page') ? Number(searchParams.get('page')) : 1;

    setKeyword(qKeyword);
    setCategorySlug(qCatSlug);
    setCategoryName(qCatName);
    setSelectedCityId(qCityId);
    setCurrentPage(qPage);
  }, [location.search]);

  // 3. Fetch Jobs based on active filters
  useEffect(() => {
    const fetchJobsData = async () => {
      setLoadingJobs(true);
      try {
        const params = {
          page: currentPage,
        };
        if (keyword.trim()) params.keyword = keyword.trim();
        let jobList = [];
        let totalCount = 0;

        if (!categorySlug || categorySlug === 'all') {
          const res = await getJobs({
            page: currentPage,
            keyword: keyword.trim() || undefined,
            city_id: selectedCityId && selectedCityId > 0 ? selectedCityId : undefined,
          });
          jobList = res.data || [];
          totalCount = res.total || 0;
        } else {
          // Fetch all jobs and filter accurately by category / specialty / slug
          const allRes = await getJobs({
            page: 1,
            keyword: keyword.trim() || undefined,
            city_id: selectedCityId && selectedCityId > 0 ? selectedCityId : undefined,
          });
          const allList = allRes.data || [];
          const searchSlug = (categorySlug || '').trim().toLowerCase();
          const searchName = (categoryName || '').trim().toLowerCase();

          const toSlug = (str = '') =>
            str
              .normalize('NFD')
              .replace(/[\u0300-\u036f]/g, '')
              .replace(/đ/g, 'd')
              .replace(/Đ/g, 'd')
              .toLowerCase()
              .replace(/[^a-z0-9]+/g, '-')
              .replace(/(^-|-$)+/g, '');

          const matchedJobs = allList.filter((j) => {
            const jCat = (j.category || '').trim().toLowerCase();
            const jSpec = (j.specialty || '').trim().toLowerCase();
            const jCatSlug = toSlug(jCat);
            const jSpecSlug = toSlug(jSpec);

            const matchName =
              searchName &&
              ((jCat && (jCat === searchName || jCat.includes(searchName) || searchName.includes(jCat))) ||
               (jSpec && (jSpec === searchName || jSpec.includes(searchName) || searchName.includes(jSpec))));

            const matchSlug =
              searchSlug &&
              ((jCatSlug && (jCatSlug === searchSlug || jCatSlug.includes(searchSlug) || searchSlug.includes(jCatSlug))) ||
               (jSpecSlug && (jSpecSlug === searchSlug || jSpecSlug.includes(searchSlug) || searchSlug.includes(jSpecSlug))));

            return Boolean(matchName || matchSlug);
          });

          jobList = matchedJobs;
          totalCount = matchedJobs.length;
        }


        // Client-side refined filtering by Experience if selected
        if (selectedExp.length > 0 && !selectedExp.includes('Tất cả')) {
          jobList = jobList.filter((j) => {
            if (!j.experience_level) return false;
            return selectedExp.some((exp) =>
              j.experience_level.toLowerCase().includes(exp.toLowerCase())
            );
          });
          totalCount = jobList.length;
        }

        // Client-side sorting
        if (sortOption === 'latest') {
          jobList = [...jobList].reverse();
        } else if (sortOption === 'salary') {
          jobList = [...jobList].sort((a, b) => {
            const maxA = a.salary?.max || 0;
            const maxB = b.salary?.max || 0;
            return maxB - maxA;
          });
        }

        setJobs(jobList);
        setTotalJobs(totalCount);
      } catch (err) {
        console.error('Error fetching jobs in /jobs:', err);
        setJobs([]);
        setTotalJobs(0);
      } finally {
        setLoadingJobs(false);
      }
    };

    fetchJobsData();
  }, [keyword, categorySlug, categoryName, selectedCityId, currentPage, selectedExp, sortOption]);

  // Update URL Query params cleanly
  const updateUrlParams = (newParams) => {
    const nextParams = new URLSearchParams(location.search);
    Object.entries(newParams).forEach(([key, val]) => {
      if (val === undefined || val === null || val === '' || val === 0 || val === 'all') {
        nextParams.delete(key);
      } else {
        nextParams.set(key, val);
      }
    });
    navigate({ search: nextParams.toString() }, { replace: true });
  };

  // Handle Search Submission
  const handleSearchSubmit = (e) => {
    if (e) e.preventDefault();
    setCurrentPage(1);
    updateUrlParams({
      keyword: keyword.trim(),
      city_id: selectedCityId,
      page: 1,
    });
  };

  // Handle Category Selection from Sidebar / Header
  const handleSelectCategory = (cat, group) => {
    let newSlug = '';
    let newName = '';

    if (cat) {
      newSlug = cat.slug;
      newName = cat.name;
    } else if (group) {
      newSlug = group.group_slug;
      newName = group.group_name;
    }

    setCategorySlug(newSlug);
    setCategoryName(newName);
    setCurrentPage(1);
    updateUrlParams({
      category_slug: newSlug,
      category_name: newName,
      page: 1,
    });
  };

  const handleClearCategory = () => {
    setCategorySlug('');
    setCategoryName('');
    setCurrentPage(1);
    updateUrlParams({
      category_slug: '',
      category_name: '',
      page: 1,
    });
  };

  // Toggle group expansion in sidebar
  const toggleGroupExpand = (groupId) => {
    setExpandedGroups((prev) => ({
      ...prev,
      [groupId]: !prev[groupId],
    }));
  };

  // Experience level checkbox toggle
  const handleExpToggle = (exp) => {
    if (exp === 'Tất cả') {
      setSelectedExp([]);
      return;
    }
    setSelectedExp((prev) =>
      prev.includes(exp) ? prev.filter((item) => item !== exp) : [...prev, exp]
    );
  };

  // Reset all filters
  const handleResetFilters = () => {
    setSelectedExp([]);
    setSelectedSalary([]);
    setSelectedCityId(0);
    setCategorySlug('');
    setCategoryName('');
    setKeyword('');
    setCurrentPage(1);
    navigate('/jobs');
  };

  // Helper formatting functions for Job Card
  const formatSalary = (salary) => {
    if (!salary) return 'Thỏa thuận';
    if (typeof salary === 'string') return salary;
    const { min, max, is_negotiable, type, currency } = salary;
    if (is_negotiable || type === 'AGREEMENT') return 'Thoả thuận';
    if (min && max) {
      return `${(min / 1000000).toLocaleString('vi-VN')} - ${(max / 1000000).toLocaleString('vi-VN')} triệu`;
    }
    if (max) {
      if (currency === 'USD') return `Tới ${max.toLocaleString('en-US')} USD`;
      return `Tới ${(max / 1000000).toLocaleString('vi-VN')} triệu`;
    }
    if (min) {
      if (currency === 'USD') return `Từ ${min.toLocaleString('en-US')} USD`;
      return `Từ ${(min / 1000000).toLocaleString('vi-VN')} triệu`;
    }
    return 'Thoả thuận';
  };

  const formatLocation = (job) => {
    if (Array.isArray(job.work_location) && job.work_location.length > 0) {
      return job.work_location
        .map((loc) => loc.city_name || loc.address_detail)
        .filter(Boolean)
        .join(', ') || 'Hà Nội';
    }
    return job.location || 'Toàn quốc';
  };

  const totalPages = Math.max(1, Math.ceil(totalJobs / PAGE_SIZE));
  const todayStr = new Date().toLocaleDateString('vi-VN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });

  const displayCategoryTitle = categoryName || keyword || 'tất cả ngành nghề';

  return (
    <div className="jobs-page">
      <Navbar />

      <main className="jobs-main">
        {/* 1. Green Header Search Bar */}
        <div className="jobs-header-search">
          <div className="topcv-container">
            <form onSubmit={handleSearchSubmit} className="jobs-search-bar">
              {/* Category Pill / Tag inside search */}
              {categoryName ? (
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 0.8,
                    backgroundColor: '#e6f7ef',
                    color: '#00b14f',
                    borderRadius: '20px',
                    px: 1.5,
                    py: 0.5,
                    fontSize: '13px',
                    fontWeight: 700,
                    maxWidth: { xs: '120px', sm: '200px' },
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    border: '1px solid #b2ebd0',
                  }}
                >
                  <span style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {categoryName}
                  </span>
                  <ClearIcon
                    onClick={handleClearCategory}
                    sx={{ fontSize: '15px', cursor: 'pointer', '&:hover': { color: '#d32f2f' } }}
                  />
                </Box>
              ) : (
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 0.5,
                    color: '#495057',
                    fontSize: '13.5px',
                    fontWeight: 600,
                    pr: 1,
                  }}
                >
                  <FilterListIcon sx={{ fontSize: '18px', color: '#00b14f' }} />
                  <span style={{ display: 'none', md: 'inline' }}>Danh mục</span>
                </Box>
              )}

              {/* Keyword Input */}
              <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', ml: 1 }}>
                <InputBase
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  placeholder="Vị trí tuyển dụng, tên công ty..."
                  sx={{
                    width: '100%',
                    fontSize: '14.5px',
                    fontWeight: 500,
                    color: '#212529',
                    '& input::placeholder': {
                      color: '#888888',
                      opacity: 1,
                    },
                  }}
                />
              </Box>

              {/* Divider */}
              <Box
                sx={{
                  display: { xs: 'none', sm: 'block' },
                  height: '24px',
                  width: '1px',
                  backgroundColor: '#e0e0e0',
                  mx: 1.5,
                }}
              />

              {/* Location Selector */}
              <Box sx={{ display: 'flex', alignItems: 'center', minWidth: { xs: '80px', sm: '130px' } }}>
                <LocationOnOutlinedIcon sx={{ color: '#666', fontSize: '18px', mr: 0.5 }} />
                <FormControl variant="standard" fullWidth>
                  <Select
                    value={selectedCityId}
                    onChange={(e) => {
                      setSelectedCityId(Number(e.target.value));
                      updateUrlParams({ city_id: Number(e.target.value), page: 1 });
                    }}
                    disableUnderline
                    IconComponent={KeyboardArrowDownIcon}
                    sx={{
                      fontSize: '13.5px',
                      fontWeight: 600,
                      color: '#212529',
                      '& .MuiSelect-select': {
                        py: 0.5,
                        pr: '20px !important',
                      },
                    }}
                  >
                    {CITY_MAP.map((c) => (
                      <MenuItem key={c.id} value={c.id}>
                        {c.name}
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
                  px: 3,
                  py: 1,
                  fontSize: '14.5px',
                  fontWeight: 700,
                  textTransform: 'none',
                  ml: 1,
                  boxShadow: 'none',
                  '&:hover': {
                    backgroundColor: '#009643',
                    boxShadow: 'none',
                  },
                }}
              >
                Tìm kiếm
              </Button>
            </form>
          </div>
        </div>

        {/* 2. Summary & Breadcrumbs Section */}
        <div className="jobs-summary-section">
          <div className="topcv-container">
            {/* Breadcrumb */}
            <div className="jobs-breadcrumb">
              <Link to="/">Trang chủ</Link>
              <ChevronRightIcon sx={{ fontSize: '14px', color: '#adb5bd' }} />
              <span>Việc làm</span>
              {categoryName && (
                <>
                  <ChevronRightIcon sx={{ fontSize: '14px', color: '#adb5bd' }} />
                  <span style={{ color: '#212529', fontWeight: 600 }}>{categoryName}</span>
                </>
              )}
            </div>

            {/* Title & Notification Row */}
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: 2,
              }}
            >
              <div className="jobs-result-title">
                Tuyển dụng <span className="highlight-count">{totalJobs} việc làm {displayCategoryTitle}</span> [Update {todayStr}]
              </div>

              <Button
                variant="outlined"
                startIcon={<NotificationsNoneIcon />}
                sx={{
                  color: '#00b14f',
                  borderColor: '#b2ebd0',
                  backgroundColor: '#f4fbf7',
                  borderRadius: '20px',
                  textTransform: 'none',
                  fontWeight: 700,
                  fontSize: '13px',
                  px: 2,
                  py: 0.6,
                  '&:hover': {
                    borderColor: '#00b14f',
                    backgroundColor: '#e6f7ef',
                  },
                }}
              >
                Tạo thông báo việc làm
              </Button>
            </Box>

            {/* City highlight banner */}
            <div className="jobs-location-alert">
              <span>
                Tìm thấy <strong>{totalJobs}</strong> cơ hội việc làm phù hợp với tiêu chí của bạn.
              </span>
              <span
                className="jobs-location-alert-link"
                onClick={() => {
                  setSelectedCityId(2);
                  updateUrlParams({ city_id: 2, page: 1 });
                }}
              >
                Xem việc làm tại TP. Hồ Chí Minh →
              </span>
            </div>
          </div>
        </div>

        {/* 3. Main Content Container: Sidebar + Job Results */}
        <div className="topcv-container">
          <div className="jobs-content-container">
            {/* Left Sidebar: Lọc nâng cao */}
            <aside className="jobs-sidebar">
              <div className="sidebar-title">
                <FilterListIcon sx={{ color: '#00b14f', fontSize: '20px' }} />
                <span>Lọc nâng cao</span>
              </div>

              {/* 1. Theo danh mục nghề */}
              <div className="sidebar-section">
                <div className="sidebar-section-title">
                  <span>Theo danh mục nghề</span>
                </div>

                {loadingCategories ? (
                  <Box sx={{ display: 'flex', justifyContent: 'center', py: 2 }}>
                    <CircularProgress size={20} sx={{ color: '#00b14f' }} />
                  </Box>
                ) : categoryGroups.length > 0 ? (
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                    {categoryGroups.map((group) => {
                      const isGroupActive =
                        categorySlug === group.group_slug ||
                        categoryName.toLowerCase() === group.group_name.toLowerCase();
                      const isExpanded = !!expandedGroups[group.id];

                      return (
                        <Box key={group.id} sx={{ mb: 0.5 }}>
                          {/* Parent Group Header */}
                          <Box
                            sx={{
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                              py: 0.6,
                              px: 0.8,
                              borderRadius: '6px',
                              cursor: 'pointer',
                              backgroundColor: isGroupActive ? '#f4fbf7' : 'transparent',
                              '&:hover': { backgroundColor: '#f4fbf7' },
                            }}
                          >
                            <Typography
                              onClick={() => handleSelectCategory(null, group)}
                              sx={{
                                fontSize: '13.5px',
                                fontWeight: isGroupActive ? 700 : 600,
                                color: isGroupActive ? '#00b14f' : '#212529',
                                flex: 1,
                              }}
                            >
                              {group.group_name}
                            </Typography>
                            {Array.isArray(group.categories) && group.categories.length > 0 && (
                              <IconButton
                                size="small"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  toggleGroupExpand(group.id);
                                }}
                                sx={{ p: 0.2 }}
                              >
                                {isExpanded ? (
                                  <KeyboardArrowUpIcon sx={{ fontSize: '18px', color: '#888' }} />
                                ) : (
                                  <KeyboardArrowDownIcon sx={{ fontSize: '18px', color: '#888' }} />
                                )}
                              </IconButton>
                            )}
                          </Box>

                          {/* Subcategories list */}
                          <Collapse in={isExpanded} timeout="auto" unmountOnExit>
                            <Box sx={{ pl: 1.5, pt: 0.5, display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                              {group.categories?.map((cat) => {
                                const isSubActive =
                                  categorySlug === cat.slug ||
                                  categoryName.toLowerCase() === cat.name.toLowerCase();

                                return (
                                  <Box
                                    key={cat.id || cat.slug}
                                    onClick={() => handleSelectCategory(cat, group)}
                                    sx={{
                                      display: 'flex',
                                      alignItems: 'center',
                                      py: 0.4,
                                      px: 0.8,
                                      borderRadius: '4px',
                                      cursor: 'pointer',
                                      backgroundColor: isSubActive ? '#e6f7ef' : 'transparent',
                                      '&:hover': {
                                        backgroundColor: '#e6f7ef',
                                        '& .subcat-name': { color: '#00b14f' },
                                      },
                                    }}
                                  >
                                    <Checkbox
                                      size="small"
                                      checked={isSubActive}
                                      sx={{
                                        p: 0.4,
                                        mr: 0.8,
                                        color: '#00b14f',
                                        '&.Mui-checked': { color: '#00b14f' },
                                      }}
                                    />
                                    <Typography
                                      className="subcat-name"
                                      sx={{
                                        fontSize: '12.5px',
                                        fontWeight: isSubActive ? 700 : 500,
                                        color: isSubActive ? '#00b14f' : '#495057',
                                      }}
                                    >
                                      {cat.name}
                                    </Typography>
                                  </Box>
                                );
                              })}
                            </Box>
                          </Collapse>
                        </Box>
                      );
                    })}
                  </Box>
                ) : (
                  <Typography sx={{ fontSize: '12px', color: '#888' }}>
                    Không có danh mục nào
                  </Typography>
                )}
              </div>

              {/* 3. Kinh nghiệm */}
              <div className="sidebar-section">
                <div className="sidebar-section-title">
                  <span>Kinh nghiệm</span>
                </div>
                <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 0.5 }}>
                  {EXPERIENCE_LEVELS.map((exp) => (
                    <Box
                      key={exp}
                      onClick={() => handleExpToggle(exp)}
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        cursor: 'pointer',
                      }}
                    >
                      <Checkbox
                        size="small"
                        checked={exp === 'Tất cả' ? selectedExp.length === 0 : selectedExp.includes(exp)}
                        sx={{
                          p: 0.4,
                          mr: 0.4,
                          color: '#00b14f',
                          '&.Mui-checked': { color: '#00b14f' },
                        }}
                      />
                      <Typography sx={{ fontSize: '12.5px', color: '#495057' }}>
                        {exp}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </div>

              {/* 4. Mức lương */}
              <div className="sidebar-section">
                <div className="sidebar-section-title">
                  <span>Mức lương</span>
                </div>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                  {SALARY_RANGES.map((sal) => (
                    <Box
                      key={sal}
                      onClick={() => {
                        setSelectedSalary((prev) =>
                          prev.includes(sal) ? prev.filter((s) => s !== sal) : [...prev, sal]
                        );
                      }}
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        cursor: 'pointer',
                      }}
                    >
                      <Checkbox
                        size="small"
                        checked={selectedSalary.includes(sal)}
                        sx={{
                          p: 0.4,
                          mr: 0.4,
                          color: '#00b14f',
                          '&.Mui-checked': { color: '#00b14f' },
                        }}
                      />
                      <Typography sx={{ fontSize: '12.5px', color: '#495057' }}>
                        {sal}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </div>

              {/* Reset / Save Filter Button */}
              <Box sx={{ pt: 1, display: 'flex', gap: 1 }}>
                <Button
                  fullWidth
                  variant="outlined"
                  onClick={handleResetFilters}
                  sx={{
                    textTransform: 'none',
                    fontWeight: 600,
                    fontSize: '13px',
                    borderColor: '#dee2e6',
                    color: '#6c757d',
                    borderRadius: '8px',
                    '&:hover': {
                      borderColor: '#adb5bd',
                      backgroundColor: '#f8f9fa',
                    },
                  }}
                >
                  Xóa bộ lọc
                </Button>
                <Button
                  fullWidth
                  variant="contained"
                  sx={{
                    textTransform: 'none',
                    fontWeight: 700,
                    fontSize: '13px',
                    backgroundColor: '#00b14f',
                    color: '#ffffff',
                    borderRadius: '8px',
                    boxShadow: 'none',
                    '&:hover': {
                      backgroundColor: '#009643',
                      boxShadow: 'none',
                    },
                  }}
                >
                  ★ Lưu bộ lọc
                </Button>
              </Box>
            </aside>

            {/* Right Column: Jobs Result Listing */}
            <div className="jobs-main-area">
              {/* Top Controls Bar: Search by / Sort by */}
              <div className="jobs-controls-bar">
                {/* Search Target Mode */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Typography sx={{ fontSize: '13.5px', color: '#495057', fontWeight: 600 }}>
                    Tìm kiếm theo:
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 0.8 }}>
                    <Button
                      size="small"
                      onClick={() => setSearchTarget('title')}
                      sx={{
                        borderRadius: '20px',
                        textTransform: 'none',
                        fontSize: '12.5px',
                        fontWeight: 600,
                        px: 1.5,
                        py: 0.3,
                        backgroundColor: searchTarget === 'title' ? '#e6f7ef' : '#f8f9fa',
                        color: searchTarget === 'title' ? '#00b14f' : '#6c757d',
                        border: '1px solid',
                        borderColor: searchTarget === 'title' ? '#b2ebd0' : '#e9ecef',
                        '&:hover': { backgroundColor: '#e6f7ef', color: '#00b14f' },
                      }}
                    >
                      {searchTarget === 'title' && '✓ '}Tên việc làm
                    </Button>
                    <Button
                      size="small"
                      onClick={() => setSearchTarget('company')}
                      sx={{
                        borderRadius: '20px',
                        textTransform: 'none',
                        fontSize: '12.5px',
                        fontWeight: 600,
                        px: 1.5,
                        py: 0.3,
                        backgroundColor: searchTarget === 'company' ? '#e6f7ef' : '#f8f9fa',
                        color: searchTarget === 'company' ? '#00b14f' : '#6c757d',
                        border: '1px solid',
                        borderColor: searchTarget === 'company' ? '#b2ebd0' : '#e9ecef',
                        '&:hover': { backgroundColor: '#e6f7ef', color: '#00b14f' },
                      }}
                    >
                      {searchTarget === 'company' && '✓ '}Tên công ty
                    </Button>
                    <Button
                      size="small"
                      onClick={() => setSearchTarget('all')}
                      sx={{
                        borderRadius: '20px',
                        textTransform: 'none',
                        fontSize: '12.5px',
                        fontWeight: 600,
                        px: 1.5,
                        py: 0.3,
                        backgroundColor: searchTarget === 'all' ? '#e6f7ef' : '#f8f9fa',
                        color: searchTarget === 'all' ? '#00b14f' : '#6c757d',
                        border: '1px solid',
                        borderColor: searchTarget === 'all' ? '#b2ebd0' : '#e9ecef',
                        '&:hover': { backgroundColor: '#e6f7ef', color: '#00b14f' },
                      }}
                    >
                      {searchTarget === 'all' && '✓ '}Cả hai
                    </Button>
                  </Box>
                </Box>

                {/* Sort Option */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Typography sx={{ fontSize: '13.5px', color: '#495057', fontWeight: 600 }}>
                    ⇅ Sắp xếp theo:
                  </Typography>
                  <FormControl size="small">
                    <Select
                      value={sortOption}
                      onChange={(e) => setSortOption(e.target.value)}
                      sx={{
                        fontSize: '13px',
                        fontWeight: 600,
                        borderRadius: '8px',
                        '& .MuiSelect-select': { py: 0.6, px: 1.5 },
                      }}
                    >
                      <MenuItem value="latest">Mới nhất</MenuItem>
                      <MenuItem value="salary">Lương cao nhất</MenuItem>
                      <MenuItem value="default">Mặc định</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              </div>

              {/* Jobs List */}
              {loadingJobs ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
                  <CircularProgress sx={{ color: '#00b14f' }} />
                </Box>
              ) : jobs.length > 0 ? (
                <div className="jobs-list-horizontal">
                  {jobs.map((job) => {
                    const companyName = job.company?.name || (typeof job.company === 'string' ? job.company : 'Công ty Cổ phần Doanh nghiệp');
                    const companyLogo = job.company?.logo_url;
                    const salaryFormatted = formatSalary(job.salary);
                    const locationFormatted = formatLocation(job);
                    const expFormatted = job.experience_level || 'Không yêu cầu kinh nghiệm';

                    return (
                      <div
                        key={job.id}
                        className="job-item-card"
                        onClick={() => navigate(`/job/${job.slug || job.id}`)}
                      >
                        {/* Company Logo */}
                        <div className="job-item-logo">
                          {companyLogo ? (
                            <img src={companyLogo} alt={companyName} />
                          ) : (
                            <Typography sx={{ fontWeight: 800, fontSize: '14px', color: '#00b14f' }}>
                              {companyName.substring(0, 2).toUpperCase()}
                            </Typography>
                          )}
                        </div>

                        {/* Job Details */}
                        <div className="job-item-details">
                          {/* Header: Title + Salary */}
                          <div className="job-item-header">
                            <div className="job-item-title">
                              <span>{job.title}</span>
                              <CheckCircleIcon className="verified-icon" />
                            </div>
                            <div className="job-item-salary">
                              <span>●</span> {salaryFormatted}
                            </div>
                          </div>

                          {/* Company Name */}
                          <div className="job-item-company">{companyName.toUpperCase()}</div>

                          {/* Location & Experience Pills */}
                          <div className="job-item-pills">
                            <span className="job-pill">{locationFormatted}</span>
                            <span className="job-pill">{expFormatted}</span>
                            {job.job_type && (
                              <span className="job-pill">
                                {job.job_type === 'FULL_TIME' ? 'Toàn thời gian' : job.job_type}
                              </span>
                            )}
                          </div>

                          {/* Footer Tags & Post Date */}
                          <div className="job-item-footer">
                            <div className="job-item-tags">
                              <span>{job.specialty || job.category || 'Chuyên môn'}</span>
                              <span>•</span>
                              <span>{job.quantity ? `Tuyển ${job.quantity} người` : 'Tuyển liên tục'}</span>
                            </div>
                            <div className="job-item-post-date">
                              {job.is_hot ? '🔥 Đang tuyển gấp' : 'Đăng hôm nay'}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <Box
                  sx={{
                    backgroundColor: '#ffffff',
                    borderRadius: '12px',
                    p: 6,
                    textAlign: 'center',
                    border: '1px solid #e9ecef',
                  }}
                >
                  <Typography variant="h6" sx={{ color: '#495057', fontWeight: 700, mb: 1 }}>
                    Không tìm thấy việc làm phù hợp
                  </Typography>
                  <Typography sx={{ color: '#868e96', fontSize: '14px', mb: 3 }}>
                    Hãy thử điều chỉnh bộ lọc, tìm kiếm theo từ khóa khác hoặc xóa bớt tiêu chí lọc.
                  </Typography>
                  <Button
                    variant="contained"
                    onClick={handleResetFilters}
                    sx={{
                      backgroundColor: '#00b14f',
                      color: '#ffffff',
                      borderRadius: '20px',
                      textTransform: 'none',
                      fontWeight: 700,
                      px: 3,
                      '&:hover': { backgroundColor: '#009643' },
                    }}
                  >
                    Xem tất cả việc làm
                  </Button>
                </Box>
              )}

              {/* Bottom Pagination */}
              {totalPages > 1 && (
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3, mb: 2 }}>
                  <Pagination
                    count={totalPages}
                    page={currentPage}
                    onChange={(_, page) => {
                      setCurrentPage(page);
                      updateUrlParams({ page });
                      window.scrollTo({ top: 120, behavior: 'smooth' });
                    }}
                    sx={{
                      '& .Mui-selected': {
                        backgroundColor: '#00b14f !important',
                        color: '#ffffff',
                        fontWeight: 700,
                      },
                    }}
                  />
                </Box>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Jobs;
