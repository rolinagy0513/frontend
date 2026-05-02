import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import apiServices from "../../services/ApiServices.js";

import "./style/ResetPasswordPage.css"

const ResetPasswordPage = () => {
    const EMAIL_API_PATH = import.meta.env.VITE_API_BASE_EMAIL_URL;
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    const resetToken = searchParams.get('token');

    const [formData, setFormData] = useState({
        newPassword: '',
        confirmationPassword: ''
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (error) setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        if (!resetToken) {
            setError('Invalid or missing reset token.');
            setIsSubmitting(false);
            return;
        }

        if (formData.newPassword !== formData.confirmationPassword) {
            setError('Passwords do not match.');
            setIsSubmitting(false);
            return;
        }

        if (formData.newPassword.length < 8 || !formData.newPassword.match(/.*\d.*/)) {
            setError('Password must be at least 8 characters and contain a number.');
            setIsSubmitting(false);
            return;
        }

        try {
            await apiServices.post(`${EMAIL_API_PATH}/reset-password`, {
                resetToken,
                newPassword: formData.newPassword,
                confirmationPassword: formData.confirmationPassword
            });
            setSuccess(true);
        } catch (err) {
            setError(err.message || 'Reset failed. Your link may have expired.');
        } finally {
            setIsSubmitting(false);
        }
    };

    // Missing token error screen
    if (!resetToken) {
        return (
            <div className="reset-password-page">
                <div className="reset-password-container">
                    <div className="reset-password-header">
                        <h1 className="reset-password-title">Invalid Reset Link</h1>
                        <p className="reset-password-subtitle">
                            The password reset link is missing or malformed.
                        </p>
                    </div>
                    <div className="reset-password-error reset-password-missing-token-error">
                        <span className="reset-password-error-icon">⚠️</span>
                        <span className="reset-password-error-text">
                            Please request a new password reset link.
                        </span>
                    </div>
                    <button
                        onClick={() => navigate('/forgot-password')}
                        className="reset-password-button"
                    >
                        Request New Link
                    </button>
                </div>
            </div>
        );
    }

    // Success screen
    if (success) {
        return (
            <div className="reset-password-success-page">
                <div className="reset-password-success-container">
                    <div className="reset-password-success-icon">
                        <div className="reset-password-success-checkmark">
                            <div className="reset-password-success-check-icon">
                                <span className="reset-password-success-line-tip"></span>
                                <span className="reset-password-success-line-long"></span>
                                <div className="reset-password-success-icon-circle"></div>
                                <div className="reset-password-success-icon-fix"></div>
                            </div>
                        </div>
                    </div>
                    <div className="reset-password-success-header">
                        <h1 className="reset-password-success-title">Password Reset!</h1>
                    </div>
                    <div className="reset-password-success-message">
                        Your password has been changed successfully.
                    </div>
                    <div className="reset-password-success-actions">
                        <button
                            onClick={() => navigate('/')}
                            className="reset-password-success-button"
                        >
                            Go to Login
                        </button>
                    </div>
                    <div className="reset-password-security-reminder">
                        <h3 className="reset-password-security-title">🔐 Security reminder</h3>
                        <p className="reset-password-security-text">
                            Use your new password next time you log in. Keep it safe and don't share it.
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    // Normal form
    return (
        <div className="reset-password-page">
            <div className="reset-password-container">
                <div className="reset-password-header">
                    <h1 className="reset-password-title">Reset Your Password</h1>
                    <p className="reset-password-subtitle">
                        Create a new strong password for your account
                    </p>
                </div>

                {error && (
                    <div className="reset-password-error">
                        <span className="reset-password-error-icon">⚠️</span>
                        <span className="reset-password-error-text">{error}</span>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="reset-password-form">
                    <div className="reset-password-form-group">
                        <label htmlFor="newPassword" className="reset-password-label">
                            New Password
                        </label>
                        <input
                            id="newPassword"
                            type="password"
                            name="newPassword"
                            className="reset-password-input"
                            value={formData.newPassword}
                            onChange={handleChange}
                            placeholder="Enter new password"
                            required
                            disabled={isSubmitting}
                        />
                        <p className="reset-password-input-hint">
                            Minimum 8 characters and at least one number
                        </p>
                    </div>

                    <div className="reset-password-form-group">
                        <label htmlFor="confirmationPassword" className="reset-password-label">
                            Confirm New Password
                        </label>
                        <input
                            id="confirmationPassword"
                            type="password"
                            name="confirmationPassword"
                            className="reset-password-input"
                            value={formData.confirmationPassword}
                            onChange={handleChange}
                            placeholder="Confirm your new password"
                            required
                            disabled={isSubmitting}
                        />
                    </div>

                    <button
                        type="submit"
                        className="reset-password-button"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? (
                            <span className="reset-password-button-loading">
                                <span className="reset-password-spinner"></span>
                                Resetting...
                            </span>
                        ) : (
                            'Reset Password'
                        )}
                    </button>
                </form>

                <div className="reset-password-info-box">
                    <h3 className="reset-password-info-title">💡 Password tips</h3>
                    <ul className="reset-password-info-list">
                        <li className="reset-password-info-item">Use at least 8 characters</li>
                        <li className="reset-password-info-item">Include a mix of letters, numbers, and symbols</li>
                        <li className="reset-password-info-item">Avoid common words or personal information</li>
                        <li className="reset-password-info-item">Don't reuse passwords from other sites</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default ResetPasswordPage;