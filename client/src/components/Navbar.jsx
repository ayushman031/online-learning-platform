import { useState } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, LogIn, UserPlus, Menu, X } from 'lucide-react';
import styled from 'styled-components';

const Nav = styled.nav`
  position: sticky;
  top: 0;
  z-index: 50;
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  background: rgba(15, 23, 42, 0.8);
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  padding: 1rem 0;
`;

const NavContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled(Link)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--text-primary);
  
  span {
    color: var(--primary);
  }
`;

const NavLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;

  @media (max-width: 768px) {
    display: none;
  }

  a {
    font-weight: 500;
    transition: var(--transition);
    color: var(--text-secondary);

    &:hover {
      color: var(--text-primary);
    }
  }
`;

const AuthButtons = styled.div`
  display: flex;
  gap: 1rem;

  @media (max-width: 768px) {
    display: none;
  }
`;

const MobileMenuBtn = styled.button`
  display: none;
  color: var(--text-primary);
  
  @media (max-width: 768px) {
    display: block;
  }
`;

const MobileMenu = styled.div`
  display: none;
  
  @media (max-width: 768px) {
    display: ${props => props.isOpen ? 'flex' : 'none'};
    flex-direction: column;
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: var(--surface-color);
    padding: 1.5rem;
    gap: 1.5rem;
    border-bottom: 1px solid var(--border-color);
    box-shadow: var(--shadow-xl);
    
    a {
      font-weight: 500;
      color: var(--text-primary);
    }
    
    .mobile-auth {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      margin-top: 1rem;
      padding-top: 1rem;
      border-top: 1px solid var(--border-color);
    }
  }
`;

const Navbar = () => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const handleLogout = () => {
        // Clear local storage and let the page refresh/redirect
        localStorage.removeItem('userInfo');
        window.location.href = '/login';
    };

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    }

    return (
        <Nav>
            <div className="container">
                <NavContainer>
                    <Logo to="/">
                        <BookOpen className="text-primary" size={28} color="var(--primary)" />
                        Learn<span>Sphere</span>
                    </Logo>

                    <NavLinks>
                        <Link to="/courses">Courses</Link>
                        <a href="/#features">Features</a>
                        <a href="/#testimonials">Testimonials</a>
                    </NavLinks>

                    <AuthButtons>
                        {userInfo ? (
                            <>
                                <Link to="/dashboard" className="btn btn-primary" style={{ background: 'transparent', border: '1px solid var(--primary)' }}>
                                    Dashboard
                                </Link>
                                <button onClick={handleLogout} className="btn btn-secondary">
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <Link to="/login" className="btn btn-secondary">
                                    <LogIn size={18} />
                                    Login
                                </Link>
                                <Link to="/signup" className="btn btn-primary">
                                    <UserPlus size={18} />
                                    Sign Up
                                </Link>
                            </>
                        )}
                    </AuthButtons>

                    <MobileMenuBtn onClick={toggleMobileMenu}>
                        {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
                    </MobileMenuBtn>
                </NavContainer>

                <MobileMenu isOpen={isMobileMenuOpen}>
                    <Link to="/courses" onClick={toggleMobileMenu}>Courses</Link>
                    <a href="/#features" onClick={toggleMobileMenu}>Features</a>
                    <a href="/#testimonials" onClick={toggleMobileMenu}>Testimonials</a>
                    
                    <div className="mobile-auth">
                        {userInfo ? (
                            <>
                                <Link to="/dashboard" className="btn btn-primary" onClick={toggleMobileMenu}>
                                    Dashboard
                                </Link>
                                <button onClick={() => { toggleMobileMenu(); handleLogout(); }} className="btn btn-secondary">
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <Link to="/login" className="btn btn-secondary" onClick={toggleMobileMenu}>
                                    <LogIn size={18} /> Login
                                </Link>
                                <Link to="/signup" className="btn btn-primary" onClick={toggleMobileMenu}>
                                    <UserPlus size={18} /> Sign Up
                                </Link>
                            </>
                        )}
                    </div>
                </MobileMenu>
            </div>
        </Nav>
    );
};

export default Navbar;
