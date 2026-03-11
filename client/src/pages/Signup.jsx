import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Mail, Lock, User as UserIcon, UserPlus } from 'lucide-react';
import axios from 'axios';

const AuthContainer = styled.div`
  min-height: calc(100vh - 80px);
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
    background: radial-gradient(circle, var(--secondary) 0%, transparent 60%);
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

  input, select {
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
    appearance: none;

    &:focus {
      border-color: var(--primary);
      box-shadow: 0 0 0 2px rgba(79, 70, 229, 0.2);
    }
  }

  select {
     padding: 1rem;
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

const Signup = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('student');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const { data } = await axios.post('/api/auth/register', { name, email, password, role }, {
                withCredentials: true
            });
            localStorage.setItem('userInfo', JSON.stringify(data));
            navigate('/dashboard');
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to register');
        } finally {
            setLoading(false);
        }
    };

    return (
        <AuthContainer>
            <AuthCard>
                <div className="text-center">
                    <h2>Create Account</h2>
                    <p>Join LearnSphere to unlock premium courses</p>
                </div>

                {error && <ErrorMsg>{error}</ErrorMsg>}

                <form onSubmit={handleSignup}>
                    <FormGroup>
                        <UserIcon className="icon" size={20} />
                        <input
                            type="text"
                            placeholder="Full Name"
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </FormGroup>

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
                            placeholder="Password (min 6 chars)"
                            required
                            minLength={6}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </FormGroup>

                    <FormGroup>
                        <select value={role} onChange={(e) => setRole(e.target.value)}>
                            <option value="student">I am a Student</option>
                            <option value="instructor">I am an Instructor</option>
                        </select>
                    </FormGroup>

                    <button
                        type="submit"
                        className="btn btn-primary"
                        style={{ width: '100%', marginTop: '1rem' }}
                        disabled={loading}
                    >
                        {loading ? 'Creating account...' : (
                            <>
                                <UserPlus size={20} /> Sign Up
                            </>
                        )}
                    </button>
                </form>

                <p className="text-center" style={{ marginTop: '2rem' }}>
                    Already have an account? <Link to="/login" style={{ color: 'var(--primary)', fontWeight: '600' }}>Log in</Link>
                </p>
            </AuthCard>
        </AuthContainer>
    );
};

export default Signup;
