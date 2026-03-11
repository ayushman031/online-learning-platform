import { useState, useEffect } from 'react';
import { BookOpen, Award, Clock, PlayCircle } from 'lucide-react';
import styled from 'styled-components';

const DashboardContainer = styled.div`
  padding: 3rem 0;
`;

const DashboardGrid = styled.div`
  display: grid;
  grid-template-columns: 250px 1fr;
  gap: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const Sidebar = styled.div`
  background: var(--surface-color);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-lg);
  padding: 1.5rem;
  height: max-content;

  .nav-item {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 1rem;
    border-radius: var(--radius-md);
    color: var(--text-secondary);
    transition: var(--transition);
    cursor: pointer;
    font-weight: 500;

    &:hover, &.active {
      background: rgba(79, 70, 229, 0.1);
      color: var(--primary);
    }
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const StatCard = styled.div`
  background: var(--surface-color);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-lg);
  padding: 1.5rem;
  display: flex;
  align-items: center;
  gap: 1rem;

  .icon-wrapper {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: rgba(79, 70, 229, 0.1);
    color: var(--primary);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .details {
    h4 {
      font-size: 0.875rem;
      color: var(--text-secondary);
      font-weight: 500;
    }
    span {
      font-size: 1.5rem;
      font-weight: 700;
    }
  }
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
`;

const EnrolledCourseCard = styled.div`
  background: var(--surface-color);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-lg);
  padding: 1.5rem;
  display: flex;
  gap: 1.5rem;
  align-items: center;

  img {
    width: 120px;
    height: 80px;
    object-fit: cover;
    border-radius: var(--radius-md);
  }

  .info {
    flex: 1;

    h4 {
      font-size: 1.1rem;
      margin-bottom: 0.5rem;
    }

    .progress-bar-container {
      width: 100%;
      height: 8px;
      background: var(--border-color);
      border-radius: 4px;
      margin-top: 0.5rem;
      overflow: hidden;

      .progress {
        height: 100%;
        background: var(--primary);
        border-radius: 4px;
      }
    }

    .progress-text {
      font-size: 0.8rem;
      color: var(--text-secondary);
      margin-top: 0.25rem;
    }
  }

  .action {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
  }
`;

const Dashboard = () => {
    const [activeTab, setActiveTab] = useState('courses');
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));

    return (
        <DashboardContainer className="container">
            <div style={{ marginBottom: '2rem' }}>
                <h2 style={{ fontSize: '2rem' }}>Welcome back, {userInfo?.name?.split(' ')[0] || 'Student'}!</h2>
                {userInfo?.email && (
                    <p style={{ color: 'var(--text-secondary)', marginTop: '0.5rem' }}>
                        {userInfo.email}
                    </p>
                )}
            </div>

            <DashboardGrid>
                <Sidebar>
                    <div className={`nav-item ${activeTab === 'courses' ? 'active' : ''}`} onClick={() => setActiveTab('courses')}>
                        <BookOpen size={20} /> My Courses
                    </div>
                    <div className={`nav-item ${activeTab === 'certificates' ? 'active' : ''}`} onClick={() => setActiveTab('certificates')}>
                        <Award size={20} /> Certificates
                    </div>
                </Sidebar>

                <Content>
                    <StatsGrid>
                        <StatCard>
                            <div className="icon-wrapper"><BookOpen size={24} /></div>
                            <div className="details">
                                <h4>Enrolled Courses</h4>
                                <span>3</span>
                            </div>
                        </StatCard>
                        <StatCard>
                            <div className="icon-wrapper"><Clock size={24} /></div>
                            <div className="details">
                                <h4>Hours Learned</h4>
                                <span>12h 45m</span>
                            </div>
                        </StatCard>
                        <StatCard>
                            <div className="icon-wrapper"><Award size={24} /></div>
                            <div className="details">
                                <h4>Certificates</h4>
                                <span>1</span>
                            </div>
                        </StatCard>
                    </StatsGrid>

                    <div style={{ background: 'var(--surface-color)', padding: '2rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)' }}>
                        <h3 style={{ marginBottom: '1.5rem' }}>Continue Learning</h3>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <EnrolledCourseCard>
                                <img src="https://images.unsplash.com/photo-1516116216624-53e697fedbea?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" alt="Course" />
                                <div className="info">
                                    <h4>Complete Web Development Bootcamp</h4>
                                    <div className="progress-bar-container">
                                        <div className="progress" style={{ width: '45%' }}></div>
                                    </div>
                                    <div className="progress-text">45% Complete</div>
                                </div>
                                <div className="action">
                                    <button className="btn btn-primary" style={{ padding: '0.5rem 1rem' }}>
                                        <PlayCircle size={18} /> Continue
                                    </button>
                                </div>
                            </EnrolledCourseCard>

                            <EnrolledCourseCard>
                                <img src="https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" alt="Course" />
                                <div className="info">
                                    <h4>Advanced Machine Learning</h4>
                                    <div className="progress-bar-container">
                                        <div className="progress" style={{ width: '10%' }}></div>
                                    </div>
                                    <div className="progress-text">10% Complete</div>
                                </div>
                                <div className="action">
                                    <button className="btn btn-primary" style={{ padding: '0.5rem 1rem' }}>
                                        <PlayCircle size={18} /> Start
                                    </button>
                                </div>
                            </EnrolledCourseCard>
                        </div>
                    </div>
                </Content>
            </DashboardGrid>
        </DashboardContainer>
    );
};

export default Dashboard;
