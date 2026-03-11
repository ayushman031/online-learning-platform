import { useState, useEffect } from 'react';
import { Search, Filter, Star, Clock } from 'lucide-react';
import styled from 'styled-components';
import axios from 'axios';

const HeaderSection = styled.div`
  background: var(--surface-color);
  padding: 4rem 0;
  border-bottom: 1px solid var(--border-color);
  text-align: center;

  h1 {
    font-size: 3rem;
    margin-bottom: 1rem;
  }
`;

const ControlsContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin: 2rem 0;
  flex-wrap: wrap;

  .search-box {
    flex: 1;
    min-width: 200px;
    position: relative;

    .icon {
      position: absolute;
      left: 1rem;
      top: 50%;
      transform: translateY(-50%);
      color: var(--text-secondary);
    }

    input {
      width: 100%;
      padding: 1rem 1rem 1rem 3rem;
      background: var(--surface-color);
      border: 1px solid var(--border-color);
      border-radius: var(--radius-md);
      color: var(--text-primary);
      font-size: 1rem;
      font-family: inherit;

      &:focus {
        border-color: var(--primary);
        outline: none;
      }
    }
  }

  .filter-btn {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 1rem 1.5rem;
    background: var(--surface-color);
    border: 1px solid var(--border-color);
    border-radius: var(--radius-md);
    color: var(--text-primary);
    cursor: pointer;
    font-size: 1rem;

    &:hover {
      background: rgba(255, 255, 255, 0.05);
    }
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2rem;
`;

const CourseCard = styled.div`
  background: var(--surface-color);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-lg);
  overflow: hidden;
  transition: var(--transition);
  display: flex;
  flex-direction: column;

  &:hover {
    transform: translateY(-5px);
    box-shadow: var(--shadow-xl);
    border-color: var(--primary);
  }

  .thumbnail {
    width: 100%;
    height: 180px;
    background: var(--border-color);
    position: relative;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .content {
    padding: 1.5rem;
    flex: 1;
    display: flex;
    flex-direction: column;

    .category {
      font-size: 0.875rem;
      color: var(--primary);
      font-weight: 600;
      margin-bottom: 0.5rem;
    }

    h3 {
      font-size: 1.25rem;
      margin-bottom: 0.5rem;
    }

    p {
      color: var(--text-secondary);
      font-size: 0.9rem;
      margin-bottom: 1.5rem;
      flex: 1;
    }

    .meta {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-top: 1rem;
      border-top: 1px solid var(--border-color);

      .price {
        font-weight: 700;
        font-size: 1.25rem;
      }
      .rating {
        display: flex;
        align-items: center;
        gap: 0.25rem;
        color: #fbbf24;
      }
    }
  }
`;

const CourseCatalog = () => {
    const [courses, setCourses] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [activeCategory, setActiveCategory] = useState('All');
    const [showFilters, setShowFilters] = useState(false);

    useEffect(() => {
        // In a real app we'd fetch from actual API endpoint: /api/courses
        // For now we use dummy data
        setCourses([
            {
                _id: '1',
                title: 'Complete Web Development Bootcamp',
                category: 'Development',
                description: 'Learn HTML, CSS, JavaScript, React, and Node.js from scratch.',
                price: 89.99,
                thumbnail: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
                rating: 4.8
            },
            {
                _id: '2',
                title: 'Advanced Machine Learning',
                category: 'Data Science',
                description: 'Dive deep into neural networks, deep learning, and AI applications.',
                price: 120.00,
                thumbnail: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
                rating: 4.9
            },
            {
                _id: '3',
                title: 'UI/UX Design Masterclass',
                category: 'Design',
                description: 'Master Figma and learn principles for creating beautiful user interfaces.',
                price: 59.99,
                thumbnail: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
                rating: 4.7
            },
            {
                _id: '4',
                title: 'Full-Stack React Bootcamp',
                category: 'Development',
                description: 'Build production-ready applications with React, Redux, and Next.js.',
                price: 99.99,
                thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
                rating: 4.8
            },
            {
                _id: '5',
                title: 'Python for Data Analysis',
                category: 'Data Science',
                description: 'Learn Pandas, NumPy, and Matplotlib for real-world data science.',
                price: 79.99,
                thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
                rating: 4.6
            },
            {
                _id: '6',
                title: 'Digital Marketing Fundamentals',
                category: 'Marketing',
                description: 'Master SEO, SEM, and social media advertising strategies to grow businesses.',
                price: 49.99,
                thumbnail: 'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
                rating: 4.5
            },
            {
                _id: '7',
                title: 'Introduction to DevOps',
                category: 'Development',
                description: 'Automate deployments with Docker, Kubernetes, and CI/CD pipelines.',
                price: 110.00,
                thumbnail: 'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
                rating: 4.7
            },
            {
                _id: '8',
                title: 'Mastering Typography',
                category: 'Design',
                description: 'Learn to pair font families and create beautiful typographic scaling for the web.',
                price: 39.99,
                thumbnail: 'https://images.unsplash.com/photo-1561070791-36c11767b26a?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
                rating: 4.9
            }
        ]);
    }, []);

    const filteredCourses = courses.filter(course => {
        const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                              course.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = activeCategory === 'All' || course.category === activeCategory;
        
        return matchesSearch && matchesCategory;
    });

    const categories = ['All', ...new Set(courses.map(c => c.category))];

    return (
        <>
            <HeaderSection>
                <div className="container">
                    <h1>Explore Courses</h1>
                    <p style={{ color: 'var(--text-secondary)' }}>Find your next skill from our extensive catalog</p>
                </div>
            </HeaderSection>

            <section className="section">
                <div className="container">
                    <ControlsContainer>
                        <div className="search-box">
                            <Search className="icon" size={20} />
                            <input
                                type="text"
                                placeholder="Search for courses..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <button 
                            className="filter-btn" 
                            onClick={() => setShowFilters(!showFilters)}
                            style={{ background: showFilters ? 'rgba(79, 70, 229, 0.1)' : 'var(--surface-color)' }}
                        >
                            <Filter size={20} /> Filters
                        </button>
                    </ControlsContainer>

                    {showFilters && (
                        <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
                            {categories.map(category => (
                                <button
                                    key={category}
                                    onClick={() => setActiveCategory(category)}
                                    className={`btn ${activeCategory === category ? 'btn-primary' : 'btn-secondary'}`}
                                    style={{ padding: '0.5rem 1rem', fontSize: '0.9rem' }}
                                >
                                    {category}
                                </button>
                            ))}
                        </div>
                    )}

                    <Grid>
                        {filteredCourses.map(course => (
                            <CourseCard key={course._id}>
                                <div className="thumbnail">
                                    <img src={course.thumbnail} alt={course.title} />
                                </div>
                                <div className="content">
                                    <div className="category">{course.category}</div>
                                    <h3>{course.title}</h3>
                                    <p>{course.description}</p>
                                    <div className="meta">
                                        <span className="price">${course.price}</span>
                                        <span className="rating">
                                            <Star size={16} fill="currentColor" /> {course.rating}
                                        </span>
                                    </div>
                                </div>
                            </CourseCard>
                        ))}
                    </Grid>

                    {filteredCourses.length === 0 && (
                        <div className="text-center" style={{ padding: '3rem', color: 'var(--text-secondary)' }}>
                            No courses found matching "{searchTerm}"
                        </div>
                    )}
                </div>
            </section>
        </>
    );
};

export default CourseCatalog;
