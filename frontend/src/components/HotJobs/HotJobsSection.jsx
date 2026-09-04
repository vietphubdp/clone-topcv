import React, { useState } from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import FilterBar from './FilterBar';
import JobCard from './JobCard';
import { mockJobs } from '../../data/mockJobs';
import './HotJobs.css';

const HotJobsSection = () => {
  const [activeCategory, setActiveCategory] = useState('office');
  const [selectedLocation, setSelectedLocation] = useState('random');
  const [currentPage, setCurrentPage] = useState(17);

  // Filter jobs logic based on location pill selection
  const filteredJobs = mockJobs.filter((job) => {
    if (selectedLocation === 'random') return true;
    if (selectedLocation === 'hanoi') return job.location.includes('Hà Nội');
    if (selectedLocation === 'hcm') return job.location.includes('Hồ Chí Minh');
    if (selectedLocation === 'mienbac') return job.location.includes('Hà Nội') || job.location.includes('Thanh Hóa');
    if (selectedLocation === 'miennam') return job.location.includes('Hồ Chí Minh') || job.location.includes('Tây Ninh') || job.location.includes('Đồng Nai');
    return true;
  });

  return (
    <section className="hot-jobs-section">
      <div className="topcv-container">
        {/* Filter & Header Controls */}
        <FilterBar
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
          selectedLocation={selectedLocation}
          setSelectedLocation={setSelectedLocation}
        />

        {/* 3 Columns x 4 Rows Job Cards Grid */}
        <div className="jobs-grid">
          {filteredJobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>

        {/* Bottom Pagination */}
        <div className="jobs-pagination">
          <IconButton
            onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
            sx={{
              width: 36,
              height: 36,
              border: '1px solid #00b14f',
              color: '#00b14f',
              '&:hover': { backgroundColor: '#e6f7ef' },
            }}
          >
            <ChevronLeftIcon />
          </IconButton>

          <Typography sx={{ fontSize: '14px', fontWeight: 600, color: '#333333' }}>
            <span style={{ color: '#00b14f', fontWeight: 800 }}>{currentPage}</span> / 122 trang
          </Typography>

          <IconButton
            onClick={() => setCurrentPage((prev) => Math.min(122, prev + 1))}
            sx={{
              width: 36,
              height: 36,
              border: '1px solid #00b14f',
              color: '#00b14f',
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
