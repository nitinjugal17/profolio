'use client';

import { useState } from 'react';
import { LoginForm } from '@/components/admin/login-form';
import { ContentUploader } from '@/components/admin/content-uploader';

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');

  const handleLoginSuccess = (pw: string) => {
    setPassword(pw);
    setIsAuthenticated(true);
  };

  if (!isAuthenticated) {
    return <LoginForm onLoginSuccess={handleLoginSuccess} />;
  }
  
  return <ContentUploader password={password} />;
}
