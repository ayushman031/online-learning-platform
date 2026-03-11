import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Mail, Lock, LogIn } from 'lucide-react';
import axios from 'axios';

const AuthContainer = styled.div`
  min-height: calc(100vh - 80px); /* Adjust based on Navbar height */
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 600px;
    height: 600px;
    background: radial-gradient(circle, var(--primary) 0%, transparent 60%);
    opacity: 0.15;
    z-index: -1;
  }
`;

const AuthCard = styled.div`
  width: 100%;
  max-width: 450px;
  background: var(--surface-color);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-xl);
  padding: 3rem;
  box-shadow: var(--shadow-xl);

  .text-center {
    margin-bottom: 2rem;
  }

  h2 {
    font-size: 2rem;
    margin-bottom: 0.5rem;
  }

  p {
    color: var(--text-secondary);
  }
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
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
    background: rgba(15, 23, 42, 0.5);
    border: 1px solid var(--border-color);
    border-radius: var(--radius-md);
    color: var(--text-primary);
    outline: none;
    transition: var(--transition);
    font-size: 1rem;
    font-family: inherit;

    &:focus {
      border-color: var(--primary);
      box-shadow: 0 0 0 2px rgba(79, 70, 229, 0.2);
    }
  }
`;

const ErrorMsg = styled.div`
  color: var(--error);
  font-size: 0.875rem;
  background: rgba(239, 68, 68, 0.1);
  padding: 0.75rem;
  border-radius: var(--radius-md);
  margin-bottom: 1rem;
  border: 1px solid rgba(239, 68, 68, 0.2);
`;

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const { data } = await axios.post('/api/auth/login', { email, password }, {
                withCredentials: true
            });
            // In a real app we'd save user data to context, here we just navigate
            localStorage.setItem('userInfo', JSON.stringify(data));
            navigate('/dashboard');
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to login');
        } finally {
            setLoading(false);
        }
    };

    return (
        <AuthContainer>
            <AuthCard>
                <div className="text-center">
                    <h2>Welcome Back</h2>
                    <p>Sign in to continue your learning journey</p>
                </div>

                {error && <ErrorMsg>{error}</ErrorMsg>}

                <form onSubmit={handleLogin}>
                    <FormGroup>
                        <Mail className="icon" size={20} />
                        <input
                            type="email"
                            placeholder="Email address"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </FormGroup>

                    <FormGroup>
                        <Lock className="icon" size={20} />
                        <input
                            type="password"
                            placeholder="Password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </FormGroup>

                    <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '1.5rem' }}>
                        <Link to="#" style={{ color: 'var(--primary)', fontSize: '0.875rem' }}>Forgot password?</Link>
                    </div>

                    <button
                        type="submit"
                        className="btn btn-primary"
                        style={{ width: '100%' }}
                        disabled={loading}
                    >
                        {loading ? 'Signing in...' : (
                            <>
                                <LogIn size={20} /> Sign In
                            </>
                        )}
                    </button>
                </form>

                <p className="text-center" style={{ marginTop: '2rem' }}>
                    Don't have an account? <Link to="/signup" style={{ color: 'var(--primary)', fontWeight: '600' }}>Sign up</Link>
                </p>
            </AuthCard>
        </AuthContainer>
    );
};

export default Login;
