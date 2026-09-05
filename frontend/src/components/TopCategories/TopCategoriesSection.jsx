import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, IconButton, CircularProgress } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import CategoryCard from './CategoryCard';
import { getCategories, getJobs } from '../../services/api';
import './TopCategories.css';

const ICON_MAPPING = [
  { keywords: ['kinh doanh', 'bán hàng', 'sales'], type: 'sales' },
  { keywords: ['marketing', 'pr', 'quảng cáo'], type: 'marketing' },
  { keywords: ['chăm sóc khách hàng', 'customer service', 'vận hành'], type: 'cs' },
  { keywords: ['nhân sự', 'hành chính', 'pháp chế'], type: 'hr' },
  { keywords: ['công nghệ thông tin', 'it', 'phần mềm', 'lập trình'], type: 'it' },
  { keywords: ['tài chính', 'ngân hàng', 'bảo hiểm'], type: 'finance' },
  { keywords: ['bất động sản'], type: 'realestate' },
  { keywords: ['kế toán', 'kiểm toán', 'thuế'], type: 'accounting' },
];

const getIconTypeForName = (name = '') => {
  const lower = name.toLowerCase();
  for (const item of ICON_MAPPING) {
    if (item.keywords.some((kw) => lower.includes(kw))) {
      return item.type;
    }
  }
  return 'it';
};

const TopCategoriesSection = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const fetchTopCats = async () => {
      setLoading(true);
      try {
        const [catData, jobsData] = await Promise.all([
          getCategories(),
          getJobs({ page: 1 }),
        ]);

        const allJobs = jobsData?.data || [];
        const rawGroups = Array.isArray(catData) ? catData : [];

        const formatted = rawGroups.map((group) => {
          const groupName = group.group_name || group.name || '';
          const groupSlug = group.group_slug || group.slug || '';
          const subCats = Array.isArray(group.categories) ? group.categories : [];

          // Calculate matching job count
          const matchCount = allJobs.filter((j) => {
            const catLower = (j.category || '').toLowerCase();
            const specLower = (j.specialty || '').toLowerCase();
            const gLower = groupName.toLowerCase();
            const gSlug = groupSlug.toLowerCase();

            const isDirectMatch =
              j.category_slug === gSlug ||
              catLower.includes(gLower) ||
              specLower.includes(gLower);

            const isSubMatch = subCats.some((sub) => {
              const subLower = (sub.name || '').toLowerCase();
              const subSlug = (sub.slug || '').toLowerCase();
              return (
                j.category_slug === subSlug ||
                catLower.includes(subLower) ||
                specLower.includes(subLower)
              );
            });

            return isDirectMatch || isSubMatch;
          }).length;

          return {
            id: group.id,
            title: groupName,
            slug: groupSlug,
            count: matchCount > 0 ? `${matchCount} việc làm` : 'Đang tuyển dụng',
            iconType: getIconTypeForName(groupName),
            subCategories: subCats,
          };
        });

        if (isMounted) {
          setCategories(formatted);
        }
      } catch (err) {
        console.error('Error loading top categories:', err);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchTopCats();
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section className="top-categories-section">
      <div className="topcv-container">
        {/* Header Row */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
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
                onClick={() => navigate('/jobs')}
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

        {/* Categories Grid */}
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 6 }}>
            <CircularProgress sx={{ color: '#00b14f' }} />
          </Box>
        ) : categories.length > 0 ? (
          <div className="categories-grid">
            {categories.map((cat) => (
              <CategoryCard key={cat.id} category={cat} />
            ))}
          </div>
        ) : (
          <Box sx={{ textAlign: 'center', py: 4, color: '#777' }}>
            <Typography sx={{ fontSize: '14px' }}>Không có danh mục nào.</Typography>
          </Box>
        )}
      </div>
    </section>
  );
};

export default TopCategoriesSection;
