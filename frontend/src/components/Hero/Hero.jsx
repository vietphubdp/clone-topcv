import React, { useState, useEffect } from 'react';
import SearchBar from './SearchBar';
import CategoryList from './CategoryList';
import BannerSlider from './BannerSlider';
import SubCategoryMenu from './SubCategoryMenu';
import { getCategories } from '../../services/api';
import './Hero.css';

const Hero = () => {
  const [categoryGroups, setCategoryGroups] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(false);
  const [activeCategory, setActiveCategory] = useState(null);

  useEffect(() => {
    let isMounted = true;
    const fetchCategoryGroups = async () => {
      setLoadingCategories(true);
      try {
        const data = await getCategories();
        if (isMounted) {
          setCategoryGroups(Array.isArray(data) ? data : []);
        }
      } catch (err) {
        console.error('Error fetching category groups:', err);
      } finally {
        if (isMounted) {
          setLoadingCategories(false);
        }
      }
    };

    fetchCategoryGroups();
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section className="hero-section">
      <div className="hero-container topcv-container">
        {/* Top Header Title */}
        <h1 className="hero-title">
          TopCV - Tạo CV, Tìm việc làm, Tuyển dụng hiệu quả
        </h1>

        {/* Floating Search Bar */}
        <SearchBar />

        {/* Categories & Banner / SubCategory Menu Row */}
        <div
          className="hero-content-row"
          onMouseLeave={() => setActiveCategory(null)}
        >
          <CategoryList
            categoryGroups={categoryGroups}
            loading={loadingCategories}
            activeCategory={activeCategory}
            onHoverCategory={(cat) => setActiveCategory(cat)}
          />
          {activeCategory ? (
            <SubCategoryMenu category={activeCategory} />
          ) : (
            <BannerSlider />
          )}
        </div>
      </div>
    </section>
  );
};

export default Hero;
