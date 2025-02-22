import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import {
  Box,
  Button,
  Container,
  Stack,
  Typography,
  type SxProps,
  type Theme,
} from "@mui/material";
import Link from "next/link";

const styles: Record<string, SxProps<Theme>> = {
  container: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    py: 4,
  },
  logoIcon: {
    fontSize: 80,
    color: "primary.main",
    mb: 3,
  },
  title: {
    fontWeight: 700,
  },
  subtitle: {
    mb: 4,
    maxWidth: 600,
  },
};

export default function Home() {
  return (
    <>
      <Container maxWidth="lg">
        <Box sx={styles.container}>
          <FitnessCenterIcon sx={styles.logoIcon} />

          <Typography
            variant="h2"
            component="h1"
            gutterBottom
            sx={styles.title}
          >
            Bem-vindo ao Gym App
          </Typography>

          <Typography
            variant="h5"
            color="text.secondary"
            sx={styles.subtitle}
          >
            Sistema completo de gerenciamento de academia
          </Typography>

          <Stack direction="row" spacing={2}>
            <Button
              component={Link}
              href="/sign-up"
              variant="contained"
              size="large"
              startIcon={<FitnessCenterIcon />}
            >
              Começar
            </Button>
            <Button variant="outlined" size="large">
              Saiba Mais
            </Button>
          </Stack>
        </Box>
      </Container>
    </>
  );
}
