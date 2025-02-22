"use client";

import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { IconButton, Tooltip, type SxProps, type Theme } from "@mui/material";
import { useThemeMode } from "./ThemeRegistry";

const styles: Record<string, SxProps<Theme>> = {
  iconButton: {
    position: "fixed",
    top: 16,
    right: 16,
    bgcolor: "background.paper",
    boxShadow: 2,
    "&:hover": {
      bgcolor: "action.hover",
    },
  },
};

export function ThemeToggle() {
  const { mode, toggleTheme } = useThemeMode();

  return (
    <Tooltip title={mode === "light" ? "Mudar para tema escuro" : "Mudar para tema claro"}>
      <IconButton
        onClick={toggleTheme}
        color="inherit"
        aria-label="alternar tema"
        sx={styles.iconButton}
      >
        {mode === "light" ? <DarkModeIcon /> : <LightModeIcon />}
      </IconButton>
    </Tooltip>
  );
}

