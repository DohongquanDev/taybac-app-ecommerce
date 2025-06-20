import React from "react";
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Typography,
  IconButton,
  InputBase,
  Badge,
  Link,
} from "@mui/material";
import Grid from '@mui/material/Grid';
import SearchIcon from "@mui/icons-material/Search";
import PhoneIcon from "@mui/icons-material/Phone";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PersonIcon from "@mui/icons-material/Person";

const TopBar = () => {
  return (
    <Box
      sx={{
        bgcolor: "#fff",
        borderBottom: "1px solid #eee",
        py: 1.5,
        boxShadow: "0 2px 6px rgb(0 0 0 / 0.05)", // tạo bóng nhẹ
        position: "sticky",
        top: 0,
        zIndex: 1100,
      }}
    >
      <Box maxWidth="lg" mx="auto" px={2}>
        <Grid container alignItems="center" spacing={2}>
          {/* Logo */}
          <Grid size={{ xs: 6, sm: 3, md: 2 }}>
            <Link href="/" display="block" sx={{ lineHeight: 0 }}>
              <Box
                component="img"
                src="/api/placeholder/120/60"
                alt="Sapa TV Logo"
                sx={{
                  maxHeight: 60,
                  width: "auto",
                  transition: "transform 0.3s",
                  "&:hover": { transform: "scale(1.05)" },
                }}
              />
            </Link>
          </Grid>

          {/* Search Box (ẩn trên xs) */}
          <Grid
            size={{ xs: 12, sm: 6, md: 5 }}
            sx={{
              display: { xs: "none", sm: "flex" },
              justifyContent: "center",
            }}
          >
            <Box
              component="form"
              sx={{
                position: "relative",
                maxWidth: 500,
                width: "100%",
                bgcolor: "#f5f5f5",
                borderRadius: 25,
                px: 2,
                display: "flex",
                alignItems: "center",
                boxShadow: "inset 0 1px 3px rgb(0 0 0 / 0.1)",
                "&:hover": { bgcolor: "#e9e9e9" },
                transition: "background-color 0.3s",
              }}
            >
              <InputBase
                placeholder="Nhập tên sản phẩm, chăm chéo, trầu gác... cần tìm"
                sx={{ flex: 1, fontSize: 14 }}
                inputProps={{ "aria-label": "search products" }}
              />
              <IconButton
                type="submit"
                aria-label="search"
                sx={{
                  p: "10px",
                  color: "primary.main",
                  "&:hover": { bgcolor: "primary.light", color: "white" },
                  transition: "all 0.3s",
                }}
              >
                <SearchIcon />
              </IconButton>
            </Box>
          </Grid>

          {/* Hotline info (ẩn trên xs) */}
          <Grid
            size={{ xs: 6, sm: 3, md: 3 }}
            sx={{ display: { xs: "none", sm: "flex" }, justifyContent: "flex-end" }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <PhoneIcon color="success" sx={{ fontSize: 26 }} />
              <Box sx={{ lineHeight: 1.1 }}>
                <Typography variant="caption" color="text.secondary" fontSize={12}>
                  Hotline Mua Hàng:
                </Typography>
                <Typography fontWeight="bold" fontSize={14}>
                  0974686389
                </Typography>
                <Typography
                  variant="caption"
                  color="text.secondary"
                  mt={0.5}
                  fontSize={12}
                  display="block"
                >
                  Hotline Nhà Hàng:
                </Typography>
                <Typography fontWeight="bold" fontSize={14}>
                  0563456789
                </Typography>
              </Box>
            </Box>
          </Grid>

          {/* User & Cart */}
          <Grid size={{ xs: 6, sm: 12, md: 2 }} sx={{ textAlign: "right" }}>
            <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 3 }}>
              <Link
                component={RouterLink}
                to="/login"
                underline="none"
                color="text.primary"
                sx={{
                  textAlign: "center",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  fontSize: 12,
                  "&:hover": { color: "primary.main" },
                  transition: "color 0.3s",
                }}
              >
                <PersonIcon fontSize="large" />
                <Typography variant="caption" display="block" mt={0.5}>
                  Đăng nhập
                </Typography>
              </Link>

              <Link
                href="#"
                underline="none"
                color="success.main"
                sx={{
                  textAlign: "center",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  fontSize: 12,
                  position: "relative",
                  "&:hover": { color: "success.dark" },
                  transition: "color 0.3s",
                }}
              >
                <Badge badgeContent={3} color="error" sx={{ mb: 0.5 }}>
                  <ShoppingCartIcon fontSize="large" />
                </Badge>
                <Typography variant="caption" display="block" color="text.primary">
                  Giỏ hàng
                </Typography>
              </Link>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default TopBar;