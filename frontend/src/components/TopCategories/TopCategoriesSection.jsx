import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, IconButton, CircularProgress } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import CategoryCard from './CategoryCard';
import { getCategories, getJobs } from '../../services/api';
import './TopCategories.css';

const ICON_MAPPING = [
  { keywords: ['bất động sản', 'nhà đất', 'real estate'], type: 'realestate' },
  { keywords: ['xuất nhập khẩu', 'logistics', 'kho vận'], type: 'sales' },
  { keywords: ['xây dựng', 'kiến trúc'], type: 'sales' },
  { keywords: ['kinh doanh', 'bán hàng', 'sales'], type: 'sales' },
  { keywords: ['marketing', 'pr', 'quảng cáo', 'branding', 'communications', 'digital'], type: 'marketing' },
  { keywords: ['chăm sóc khách hàng', 'customer service', 'vận hành', 'tư vấn'], type: 'cs' },
  { keywords: ['nhân sự', 'hành chính', 'pháp chế', 'tuyển dụng', 'hr'], type: 'hr' },
  { keywords: ['lập trình', 'phần mềm', 'công nghệ thông tin', 'it', 'developer'], type: 'it' },
  { keywords: ['tài chính', 'ngân hàng', 'bảo hiểm'], type: 'finance' },
  { keywords: ['kế toán', 'kiểm toán', 'thuế'], type: 'accounting' },
  { keywords: ['lao động phổ thông', 'công nhân'], type: 'cs' },
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

const PAGE_SIZE = 8;

const TopCategoriesSection = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pageIndex, setPageIndex] = useState(0);

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

        // Flatten: Extract child categories from all category groups
        const flatCategories = [];
        rawGroups.forEach((group) => {
          const groupName = group.group_name || group.name || '';
          const groupSlug = group.group_slug || group.slug || '';
          const subCats = Array.isArray(group.categories) ? group.categories : [];

          if (subCats.length > 0) {
            subCats.forEach((cat) => {
              flatCategories.push({
                id: cat.id || `${group.id}-${cat.slug}`,
                name: cat.name,
                slug: cat.slug,
                groupName: groupName,
                groupSlug: groupSlug,
              });
            });
          } else {
            flatCategories.push({
              id: group.id,
              name: groupName,
              slug: groupSlug,
              groupName: groupName,
              groupSlug: groupSlug,
            });
          }
        });

        const toSlug = (str = '') =>
          str
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/đ/g, 'd')
            .replace(/Đ/g, 'd')
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)+/g, '');

        const formatted = flatCategories.map((cat) => {
          const catName = (cat.name || '').trim();
          const catSlug = (cat.slug || '').trim();
          const targetNameLower = catName.toLowerCase();
          const targetSlugLower = catSlug.toLowerCase();

          // Calculate matching job count accurately
          const matchCount = allJobs.filter((j) => {
            const jCat = (j.category || '').trim().toLowerCase();
            const jSpec = (j.specialty || '').trim().toLowerCase();
            const jCatSlug = toSlug(jCat);
            const jSpecSlug = toSlug(jSpec);

            const matchName =
              (jCat && (jCat === targetNameLower || jCat.includes(targetNameLower) || targetNameLower.includes(jCat))) ||
              (jSpec && (jSpec === targetNameLower || jSpec.includes(targetNameLower) || targetNameLower.includes(jSpec)));

            const matchSlug =
              targetSlugLower &&
              ((jCatSlug && (jCatSlug === targetSlugLower || jCatSlug.includes(targetSlugLower) || targetSlugLower.includes(jCatSlug))) ||
               (jSpecSlug && (jSpecSlug === targetSlugLower || jSpecSlug.includes(targetSlugLower) || targetSlugLower.includes(jSpecSlug))));

            return matchName || matchSlug;
          }).length;

          return {
            id: cat.id,
            title: catName,
            slug: catSlug,
            groupName: cat.groupName,
            count: matchCount > 0 ? `${matchCount} việc làm` : 'Đang tuyển dụng',
            iconType: getIconTypeForName(catName),
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

  const totalPages = Math.max(1, Math.ceil(categories.length / PAGE_SIZE));

  const handlePrevPage = () => {
    setPageIndex((prev) => (prev > 0 ? prev - 1 : totalPages - 1));
  };

  const handleNextPage = () => {
    setPageIndex((prev) => (prev < totalPages - 1 ? prev + 1 : 0));
  };

  const displayedCategories = useMemo(() => {
    const start = pageIndex * PAGE_SIZE;
    return categories.slice(start, start + PAGE_SIZE);
  }, [categories, pageIndex]);

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
          {categories.length > PAGE_SIZE && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <IconButton
                size="small"
                onClick={handlePrevPage}
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
                onClick={handleNextPage}
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
          )}
        </Box>

        {/* Categories Grid */}
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 6 }}>
            <CircularProgress sx={{ color: '#00b14f' }} />
          </Box>
        ) : displayedCategories.length > 0 ? (
          <div className="categories-grid">
            {displayedCategories.map((cat) => (
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
