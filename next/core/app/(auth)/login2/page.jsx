'use client'
import { useState } from 'react';

export default function LoginForm() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://127.0.0.1:8000/api/auth/users/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            if (!response.ok) {
                throw new Error('Registration failed');
            }

            // Регистрация успешна, выполните действия по вашему усмотрению (например, перенаправление на другую страницу)
            console.log('Registration successful');

            // Очищаем форму
            setUsername('');
            setPassword('');
            setError('');
        } catch (error) {
            console.error('Registration error:', error);
            setError('Registration failed');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="username">Username:</label>
                <input
                    type="text"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
            </div>
            <div>
                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            {error && <div>{error}</div>}
            <button type="submit">Register</button>
        </form>
    );
}