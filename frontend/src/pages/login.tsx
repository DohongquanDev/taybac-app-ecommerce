import React, { useState } from 'react';

import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
  Divider,
  Link,
  Paper,
  Grid,
} from '@mui/material';
import { Password, Visibility, VisibilityOff } from '@mui/icons-material';
import FacebookIcon from '@mui/icons-material/Facebook';
import GoogleIcon from '@mui/icons-material/Google';
import ChatIcon from '@mui/icons-material/Chat';
import { useLogin } from '../hooks/UserHook/useLogin';

const LoginPage: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const[email,setEmail] = useState('')
  const [password,setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
   const { login, loading, error, response } = useLogin();

  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev);
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login({
      email,
      password,
      rememberMe,
    });
};
  return (
    <Box bgcolor="#f8f9fa" minHeight="100vh" py={5}>
      <Container maxWidth="sm">
        <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
          <Typography variant="h5" color="primary" fontWeight={600} textAlign="center" mb={3}>
            Đăng Nhập
          </Typography>
          <Box component="form" onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Email hoặc số điện thoại"
              value={email}
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Mật khẩu"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              margin="normal"
              required
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleTogglePassword} edge="end">
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Box display="flex" justifyContent="space-between" alignItems="center" my={2}>
              <FormControlLabel control={<Checkbox />} label="Ghi nhớ đăng nhập" />
              <Link href="#" color="primary" underline="hover">
                Quên mật khẩu?
              </Link>
            </Box>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{ py: 1.5, mb: 2 }}
            >
              Đăng Nhập
            </Button>
            <Divider sx={{ my: 3 }}>hoặc đăng nhập với</Divider>
            <Box display="flex" justifyContent="center" gap={2}>
              <IconButton sx={{ bgcolor: '#3b5998', color: '#fff', '&:hover': { bgcolor: '#314d86' } }}>
                <FacebookIcon />
              </IconButton>
              <IconButton sx={{ bgcolor: '#db4437', color: '#fff', '&:hover': { bgcolor: '#b2362d' } }}>
                <GoogleIcon />
              </IconButton>
              <IconButton sx={{ bgcolor: '#0068ff', color: '#fff', '&:hover': { bgcolor: '#0054d6' } }}>
                <ChatIcon />
              </IconButton>
            </Box>
            <Typography textAlign="center" mt={4}>
              Bạn chưa có tài khoản?{' '}
              <Link href="register.html" color="primary" underline="hover">
                Đăng ký ngay
              </Link>
            </Typography>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default LoginPage;
