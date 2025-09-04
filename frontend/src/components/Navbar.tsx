import  { useState } from "react";
import {
    AppBar, Toolbar, Typography, Button, IconButton, Menu, MenuItem,
    Avatar, Box, useTheme, useMediaQuery, Drawer, List, ListItemButton,
    ListItemIcon, ListItemText, Divider, CircularProgress, Link as MuiLink
} from "@mui/material";
import {
    Menu as MenuIcon, AccountCircle, Dashboard, AddSharp,
    ContentPasteSearch, Inventory, Summarize, Settings,
    Logout as LogoutIcon, Info
} from "@mui/icons-material";
import { Link as RouterLink } from "react-router-dom";
import { useAuth } from "./AuthContext";



const OAUTH_GITHUB = "/oauth2/authorization/github";

const Navbar = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));
    const { user, loading, setUser } = useAuth();

    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
    const [drawerOpen, setDrawerOpen] = useState(false);

    const handleLogin = () => {
        const host = window.location.host === "localhost:5173"
            ? "http://localhost:8080"
            : window.location.origin;
        window.open(host + OAUTH_GITHUB, "_self");
    };

    const handleLogout = () => {
        const host = window.location.host === "localhost:5173"
            ? "http://localhost:8080"
            : window.location.origin;
        window.open(host + "/logout", "_self");
        setUser(null);
        setAnchorEl(null);
        setDrawerOpen(false);
    };

    const navItems = user ? [
        { text: "Search", icon: <ContentPasteSearch fontSize="small" />, to: "/search" },
        { text: "Dashboard", icon: <Dashboard fontSize="small" />, to: "/dashboard" },
        { text: "Add Product", icon: <AddSharp fontSize="small" />, to: "/AddProduct" },
        { text: "Reports", icon: <Summarize fontSize="small" />, to: "/Reports" },
        { text: "Stock", icon: <Inventory fontSize="small" />, to: "/stock" },
        { text: "Settings", icon: <Settings fontSize="small" />, to: "/settings" },
        { text: "About", icon: <Info fontSize="small" />, to: "/about" }
    ] : [{ text: "Our Products", icon: <Dashboard fontSize="small" />, to: "/Products" },
        { text: "About", icon: <Info fontSize="small" />, to: "/about" }];

    const drawerContent = (
        <Box
            component="nav"
            sx={{ width: 250 }}
            onClick={() => setDrawerOpen(false)}
            onKeyDown={() => setDrawerOpen(false)}
        >
            <List>
                {navItems.map((it) => (
                    <ListItemButton key={it.text} component={RouterLink} to={it.to}>
                        <ListItemIcon>{it.icon}</ListItemIcon>
                        <ListItemText primary={it.text} />
                    </ListItemButton>
                ))}
            </List>
            <Divider />
            <Box sx={{ p: 2 }}>
                {loading ? (
                    <Box sx={{ display: "flex", justifyContent: "center" }}>
                        <CircularProgress size={24} />
                    </Box>
                ) : user ? (
                    <>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
                            <Avatar src={user.avatarUrl} alt={user.login}>
                                {user?.login?.charAt(0).toUpperCase() || <AccountCircle />}
                            </Avatar>
                            <Box>
                                <Typography variant="body2">{user.login}</Typography>
                                <Typography variant="caption" color="text.secondary">{user.email}</Typography>
                            </Box>
                        </Box>
                        <Button startIcon={<LogoutIcon />} variant="outlined" fullWidth onClick={handleLogout}>
                            Logout
                        </Button>
                    </>
                ) : (
                    <Button variant="contained" fullWidth onClick={handleLogin}>
                        Login with GitHub
                    </Button>
                )}
            </Box>
        </Box>
    );

    return (
        <>
            <AppBar position="fixed" color="primary" elevation={1}>
                <Toolbar sx={{ display: "flex", alignItems: "center" }}>
                    {/* LEFT */}
                    <Box sx={{ flex: "0 0 auto", display: "flex", alignItems: "center" }}>
                        {isMobile ? (
                            <IconButton edge="start" color="inherit" onClick={() => setDrawerOpen(true)}>
                                <MenuIcon />
                            </IconButton>
                        ) : (
                            <MuiLink component={RouterLink} to="/" underline="none" color="inherit"
                                     sx={{ display: "flex", alignItems: "center" }}>
                                <Typography variant="h6" sx={{ fontWeight: "bold" }}>Warehouse</Typography>
                            </MuiLink>
                        )}
                    </Box>

                    {/* CENTER */}
                    <Box sx={{ flexGrow: 1, display: "flex", justifyContent: "center" }}>
                        {isMobile ? (
                            <MuiLink component={RouterLink} to="/" underline="none" color="inherit"
                                     sx={{ display: "flex", alignItems: "center" }}>
                                <Typography variant="h6" sx={{ fontWeight: "bold", textAlign: "center" }}>
                                    Warehouse Management
                                </Typography>
                            </MuiLink>
                        ) : (
                            <Box sx={{ display: "flex", gap: 2 }}>
                                {navItems.map((it) => (
                                    <Button key={it.text} color="inherit" startIcon={it.icon}
                                            component={RouterLink} to={it.to}>
                                        {it.text}
                                    </Button>
                                ))}
                            </Box>
                        )}
                    </Box>

                    {/* RIGHT */}
                    <Box sx={{ flex: "0 0 auto", display: "flex", alignItems: "center", gap: 1 }}>
                        {loading ? (
                            <CircularProgress color="inherit" size={20} />
                        ) : user ? (
                            <>
                                {!isMobile && <Typography variant="body2">{user.login}</Typography>}
                                <IconButton color="inherit" onClick={(e) => setAnchorEl(e.currentTarget)}>
                                    <Avatar src={user.avatarUrl} alt={user.login}>
                                        {user?.login ? user.login.charAt(0).toUpperCase() : <AccountCircle />}
                                    </Avatar>
                                </IconButton>
                                <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={() => setAnchorEl(null)}>
                                    <MenuItem onClick={() => setAnchorEl(null)} component="a" href={user.htmlUrl}>
                                        Profile
                                    </MenuItem>
                                    <MenuItem onClick={handleLogout}>Logout</MenuItem>
                                </Menu>
                            </>
                        ) : (
                            <Button color="inherit" variant="outlined" onClick={handleLogin}>
                                Login
                            </Button>
                        )}
                    </Box>
                </Toolbar>
            </AppBar>

            {/* Drawer */}
            <Drawer anchor="left" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
                {drawerContent}
            </Drawer>
        </>
    );
};

export default Navbar;
