import { Link } from 'react-router-dom';
import { ArrowRight, Play, Star, BookOpen, Clock, Users } from 'lucide-react';
import styled from 'styled-components';

const HeroSection = styled.section`
  padding: 8rem 0 6rem;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: -10%;
    left: -10%;
    width: 500px;
    height: 500px;
    background: var(--primary);
    filter: blur(150px);
    opacity: 0.2;
    border-radius: 50%;
    z-index: -1;
  }

  &::after {
    content: '';
    position: absolute;
    bottom: -10%;
    right: -10%;
    width: 400px;
    height: 400px;
    background: var(--secondary);
    filter: blur(150px);
    opacity: 0.15;
    border-radius: 50%;
    z-index: -1;
  }
`;

const HeroContent = styled.div`
  text-align: center;
  max-width: 800px;
  margin: 0 auto;

  h1 {
    font-size: 4rem;
    margin-bottom: 1.5rem;
    line-height: 1.1;
  }

  p {
    font-size: 1.25rem;
    color: var(--text-secondary);
    margin-bottom: 2.5rem;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1.5rem;
  justify-content: center;
  align-items: center;
`;

const FeaturesSection = styled.section`
  padding: 6rem 0;
  background: rgba(30, 41, 59, 0.3);
`;

const FeatureGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
`;

const FeatureCard = styled.div`
  padding: 2.5rem;
  border-radius: var(--radius-xl);
  background: var(--surface-color);
  border: 1px solid var(--border-color);
  transition: var(--transition);

  &:hover {
    transform: translateY(-5px);
    border-color: var(--primary);
    box-shadow: 0 10px 30px -10px rgba(79, 70, 229, 0.3);
  }

  .icon {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background: rgba(79, 70, 229, 0.1);
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--primary);
    margin-bottom: 1.5rem;
  }

  h3 {
    font-size: 1.5rem;
    margin-bottom: 1rem;
  }

  p {
    color: var(--text-secondary);
  }
`;

const TestimonialsSection = styled.section`
  padding: 6rem 0;
  background: var(--bg-color);
`;

const TestimonialGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
`;

const TestimonialCard = styled.div`
  padding: 2.5rem;
  border-radius: var(--radius-xl);
  background: var(--surface-color);
  border: 1px solid var(--border-color);
  
  .stars {
    color: #fbbf24;
    display: flex;
    gap: 0.25rem;
    margin-bottom: 1.5rem;
  }
  
  p {
    font-size: 1.1rem;
    color: var(--text-primary);
    margin-bottom: 2rem;
    font-style: italic;
  }
  
  .user {
    display: flex;
    align-items: center;
    gap: 1rem;
    
    .avatar {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      background: var(--primary);
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: bold;
      font-size: 1.2rem;
    }
    
    h4 {
      margin-bottom: 0.25rem;
    }
    span {
      font-size: 0.875rem;
      color: var(--text-secondary);
    }
  }
`;

const LandingPage = () => {
    return (
        <>
            <HeroSection>
                <div className="container">
                    <HeroContent>
                        <h1>
                            Master New Skills with <br />
                            <span className="text-gradient">LearnSphere</span>
                        </h1>
                        <p>
                            Unlock your potential with expert-led courses. Join thousands of learners achieving their goals in tech, business, and beyond starting today.
                        </p>
                        <ButtonGroup>
                            <Link to="/courses" className="btn btn-primary" style={{ padding: '1rem 2rem', fontSize: '1.1rem' }}>
                                Explore Courses <ArrowRight size={20} />
                            </Link>
                            <Link to="#demo" className="btn btn-secondary" style={{ padding: '1rem 2rem', fontSize: '1.1rem' }}>
                                <Play size={20} /> Watch Demo
                            </Link>
                        </ButtonGroup>
                    </HeroContent>
                </div>
            </HeroSection>

            <FeaturesSection id="features">
                <div className="container">
                    <div className="text-center">
                        <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Why Choose LearnSphere?</h2>
                        <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto' }}>
                            We provide the best tools, instructors, and community to help you succeed in your career journey.
                        </p>
                    </div>

                    <FeatureGrid>
                        <FeatureCard>
                            <div className="icon">
                                <BookOpen size={30} />
                            </div>
                            <h3>10,000+ Online Courses</h3>
                            <p>Explore a vast array of topics from programming and data science to marketing and design.</p>
                        </FeatureCard>

                        <FeatureCard>
                            <div className="icon">
                                <Users size={30} />
                            </div>
                            <h3>Expert Instructors</h3>
                            <p>Learn directly from industry professionals and educators with years of real-world experience.</p>
                        </FeatureCard>

                        <FeatureCard>
                            <div className="icon">
                                <Clock size={30} />
                            </div>
                            <h3>Lifetime Access</h3>
                            <p>Learn on your schedule. Revisit courses anytime, anywhere, with lifetime access to materials.</p>
                        </FeatureCard>
                    </FeatureGrid>
                </div>
            </FeaturesSection>

            <TestimonialsSection id="testimonials">
                <div className="container">
                    <div className="text-center">
                        <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>What Our Students Say</h2>
                        <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto' }}>
                            Join thousands of satisfied learners who have transformed their careers with LearnSphere.
                        </p>
                    </div>

                    <TestimonialGrid>
                        <TestimonialCard>
                            <div className="stars">
                                <Star fill="currentColor" size={20} /><Star fill="currentColor" size={20} /><Star fill="currentColor" size={20} /><Star fill="currentColor" size={20} /><Star fill="currentColor" size={20} />
                            </div>
                            <p>"LearnSphere completely changed my career trajectory. The Web Development Bootcamp was incredibly comprehensive and the instructors were always available and helpful."</p>
                            <div className="user">
                                <div className="avatar">JD</div>
                                <div>
                                    <h4>John Doe</h4>
                                    <span>Frontend Developer</span>
                                </div>
                            </div>
                        </TestimonialCard>
                        
                        <TestimonialCard>
                            <div className="stars">
                                <Star fill="currentColor" size={20} /><Star fill="currentColor" size={20} /><Star fill="currentColor" size={20} /><Star fill="currentColor" size={20} /><Star fill="currentColor" size={20} />
                            </div>
                            <p>"The Machine Learning courses are top-notch. I went from knowing zero Python to building my own neural networks in just a few months. Highly recommended UI and platform."</p>
                            <div className="user">
                                <div className="avatar">AS</div>
                                <div>
                                    <h4>Alice Smith</h4>
                                    <span>Data Scientist</span>
                                </div>
                            </div>
                        </TestimonialCard>

                        <TestimonialCard>
                            <div className="stars">
                                <Star fill="currentColor" size={20} /><Star fill="currentColor" size={20} /><Star fill="currentColor" size={20} /><Star fill="currentColor" size={20} /><Star fill="currentColor" size={20} />
                            </div>
                            <p>"As a UI/UX designer, I appreciate a beautiful platform. LearnSphere not only teaches great design principles, but the application itself is a testament to those principles."</p>
                            <div className="user">
                                <div className="avatar">MJ</div>
                                <div>
                                    <h4>Mike Johnson</h4>
                                    <span>Product Designer</span>
                                </div>
                            </div>
                        </TestimonialCard>
                    </TestimonialGrid>
                </div>
            </TestimonialsSection>
        </>
    );
};

export default LandingPage;
