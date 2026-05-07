import { useState } from 'react';
import apiServices from "../../services/ApiServices.js";

import "./style/ForgotPasswordPage.css"

const ForgotPasswordPage = () => {
    const EMAIL_API_PATH = import.meta.env.VITE_API_BASE_EMAIL_URL;

    const [email, setEmail] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError('');

        try {
            await apiServices.post(`${EMAIL_API_PATH}/forgot-password`, { email });
            setSubmitted(true);
        } catch (err) {
            setError('Something went wrong. Please try again.', err);
        } finally {
            setIsSubmitting(false);
        }
    };

    if (submitted) {
        return (
            <div className="forgot-password-success-page">
                <div className="forgot-password-success-container">
                    <div className="forgot-password-success-icon">
                        <div className="forgot-password-success-checkmark">
                            <div className="forgot-password-success-check-icon">
                                <span className="forgot-password-success-line-tip"></span>
                                <span className="forgot-password-success-line-long"></span>
                                <div className="forgot-password-success-icon-circle"></div>
                                <div className="forgot-password-success-icon-fix"></div>
                            </div>
                        </div>
                    </div>
                    <div className="forgot-password-success-header">
                        <h1 className="forgot-password-success-title">Check your email</h1>
                    </div>
                    <div className="forgot-password-success-message">
                        If an account exists for <span className="forgot-password-success-email">{email}</span>,
                        we've sent a password reset link.<br />
                        The link will expire in 1 hour.
                    </div>
                    <div className="forgot-password-success-note">
                        Please check your spam folder if you don't see the email within a few minutes.
                    </div>
                    <div className="forgot-password-security-reminder">
                        <h3 className="forgot-password-security-title">
                            🔒 Security tip
                        </h3>
                        <p className="forgot-password-security-text">
                            Never share this reset link with anyone. If you didn't request this,
                            you can safely ignore this email.
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="forgot-password-page">
            <div className="forgot-password-container">
                <div className="forgot-password-header">
                    <h1 className="forgot-password-title">Forgot Password</h1>
                    <p className="forgot-password-subtitle">
                        Enter your email and we'll send you a link to reset your password
                    </p>
                </div>

                {error && (
                    <div className="forgot-password-error">
                        <span className="forgot-password-error-icon">⚠️</span>
                        <span className="forgot-password-error-text">{error}</span>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="forgot-password-form">
                    <div className="forgot-password-form-group">
                        <label htmlFor="email" className="forgot-password-label">
                            Email address
                        </label>
                        <input
                            id="email"
                            type="email"
                            className="forgot-password-input"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="your@email.com"
                            required
                            disabled={isSubmitting}
                        />
                        <p className="forgot-password-input-hint">
                            We'll send a password reset link to this email
                        </p>
                    </div>

                    <button
                        type="submit"
                        className="forgot-password-button"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? (
                            <span className="forgot-password-button-loading">
                                <span className="forgot-password-spinner"></span>
                                Sending...
                            </span>
                        ) : (
                            'Send Reset Link'
                        )}
                    </button>
                </form>

                <div className="forgot-password-info-box">
                    <h3 className="forgot-password-info-title">📧 What happens next?</h3>
                    <ul className="forgot-password-info-list">
                        <li className="forgot-password-info-item">
                            Check your email inbox for a message from us
                        </li>
                        <li className="forgot-password-info-item">
                            Click the secure link inside (valid for 1 hour)
                        </li>
                        <li className="forgot-password-info-item">
                            Create a new strong password for your account
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default ForgotPasswordPage;