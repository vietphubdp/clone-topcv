import React, { useState, useEffect } from 'react';
import { Box, Typography, IconButton, CircularProgress } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import FilterBar from './FilterBar';
import JobCard from './JobCard';
import { getCategories, getJobs } from '../../services/api';
import './HotJobs.css';

const PAGE_SIZE = 20;

const HotJobsSection = () => {
  const [categories, setCategories] = useState([{ id: 'all', name: 'Tất cả', slug: 'all' }]);
  const [loadingCategories, setLoadingCategories] = useState(false);

  const [activeCategorySlug, setActiveCategorySlug] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);

  const [jobs, setJobs] = useState([]);
  const [totalJobs, setTotalJobs] = useState(0);
  const [loadingJobs, setLoadingJobs] = useState(false);

  // Fetch Categories from API on mount
  useEffect(() => {
    const fetchCategoriesData = async () => {
      setLoadingCategories(true);
      try {
        const data = await getCategories();
        // Extract categories from category groups
        const extractedCategories = [];
        if (Array.isArray(data)) {
          data.forEach((group) => {
            if (Array.isArray(group.categories) && group.categories.length > 0) {
              group.categories.forEach((cat) => {
                extractedCategories.push({
                  id: cat.id,
                  name: cat.name,
                  slug: cat.slug,
                });
              });
            } else if (group.group_name && group.group_slug) {
              extractedCategories.push({
                id: group.id,
                name: group.group_name,
                slug: group.group_slug,
              });
            }
          });
        }
        setCategories([{ id: 'all', name: 'Tất cả', slug: 'all' }, ...extractedCategories]);
      } catch (err) {
        console.error('Error loading categories:', err);
      } finally {
        setLoadingCategories(false);
      }
    };

    fetchCategoriesData();
  }, []);

  // Fetch Jobs whenever activeCategorySlug or currentPage changes
  useEffect(() => {
    const fetchJobsData = async () => {
      setLoadingJobs(true);
      try {
        const params = { page: currentPage };
        if (activeCategorySlug && activeCategorySlug !== 'all') {
          params.category_slug = activeCategorySlug;
        }
        const response = await getJobs(params);
        setJobs(response.data || []);
        setTotalJobs(response.total || 0);
      } catch (err) {
        console.error('Error loading jobs:', err);
        setJobs([]);
        setTotalJobs(0);
      } finally {
        setLoadingJobs(false);
      }
    };

    fetchJobsData();
  }, [activeCategorySlug, currentPage]);

  const handleCategoryChange = (slug) => {
    setActiveCategorySlug(slug);
    setCurrentPage(1); // Reset to page 1 when category changes
  };

  const totalPages = Math.max(1, Math.ceil(totalJobs / PAGE_SIZE));

  return (
    <section className="hot-jobs-section">
      <div className="topcv-container">
        {/* Filter & Header Controls */}
        <FilterBar
          activeCategorySlug={activeCategorySlug}
          setActiveCategorySlug={handleCategoryChange}
          categories={categories}
          loadingCategories={loadingCategories}
        />

        {/* Job Cards Grid */}
        {loadingJobs ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
            <CircularProgress sx={{ color: '#00b14f' }} />
          </Box>
        ) : jobs.length > 0 ? (
          <div className="jobs-grid">
            {jobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        ) : (
          <Box sx={{ textAlign: 'center', py: 8, color: '#777' }}>
            <Typography variant="h6">Không tìm thấy việc làm nào phù hợp.</Typography>
          </Box>
        )}

        {/* Bottom Pagination */}
        <div className="jobs-pagination">
          <IconButton
            onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
            disabled={currentPage <= 1 || loadingJobs}
            sx={{
              width: 36,
              height: 36,
              border: '1px solid #00b14f',
              color: '#00b14f',
              '&.Mui-disabled': { borderColor: '#cccccc', color: '#cccccc' },
              '&:hover': { backgroundColor: '#e6f7ef' },
            }}
          >
            <ChevronLeftIcon />
          </IconButton>

          <Typography sx={{ fontSize: '14px', fontWeight: 600, color: '#333333' }}>
            <span style={{ color: '#00b14f', fontWeight: 800 }}>{currentPage}</span> / {totalPages} trang
          </Typography>

          <IconButton
            onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
            disabled={currentPage >= totalPages || loadingJobs}
            sx={{
              width: 36,
              height: 36,
              border: '1px solid #00b14f',
              color: '#00b14f',
              '&.Mui-disabled': { borderColor: '#cccccc', color: '#cccccc' },
              '&:hover': { backgroundColor: '#e6f7ef' },
            }}
          >
            <ChevronRightIcon />
          </IconButton>
        </div>
      </div>
    </section>
  );
};

export default HotJobsSection;
