"use client";

import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Link as MuiLink,
  Stack,
  InputAdornment,
  type SxProps,
  type Theme,
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import PersonIcon from "@mui/icons-material/Person";
import Link from "next/link";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

// Função para aplicar máscara de telefone
const applyPhoneMask = (value: string): string => {
  const numbers = value.replace(/\D/g, "");
  
  if (numbers.length <= 2) {
    return numbers;
  }
  if (numbers.length <= 6) {
    return `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`;
  }
  if (numbers.length <= 10) {
    return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 6)}-${numbers.slice(6)}`;
  }
  return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7, 11)}`;
};

// Schema de validação com Zod
const signUpSchema = z.object({
  name: z
    .string()
    .min(1, "Nome é obrigatório")
    .min(3, "Nome deve ter pelo menos 3 caracteres")
    .max(100, "Nome deve ter no máximo 100 caracteres"),
  email: z
    .email("Email inválido"),
  phone: z
    .string()
    .min(1, "Telefone é obrigatório")
    .refine(
      (val) => {
        const numbers = val.replace(/\D/g, "");
        return numbers.length === 10 || numbers.length === 11;
      },
      { message: "Telefone deve ter 10 ou 11 dígitos" }
    ),
});

type SignUpFormData = z.infer<typeof signUpSchema>;

export default function SignUpPage() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
    mode: "onBlur",
  });

  const onSubmit = async (data: SignUpFormData) => {
    console.log("Dados do formulário:", data);
    // Aqui você pode adicionar a lógica de envio para a API
  };

  return (
    <Container maxWidth="sm">
      <Box sx={styles.container}>
        <Stack sx={styles.card}>
          <Box sx={styles.logoBox}>
            <FitnessCenterIcon sx={styles.logoIcon} />
          </Box>

          <Typography component="h1" variant="h4" fontWeight={700} gutterBottom>
            Criar Conta
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
            align="center"
            sx={styles.subtitle}
          >
            Cadastre-se para começar sua jornada fitness
          </Typography>

          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            sx={styles.form}
          >
            <Stack spacing={3}>
              <TextField
                fullWidth
                id="name"
                label="Nome"
                autoComplete="name"
                autoFocus
                {...register("name")}
                error={Boolean(errors.name)}
                helperText={errors.name?.message}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <PersonIcon color="action" />
                      </InputAdornment>
                    ),
                  },
                }}
              />

              <TextField
                fullWidth
                id="email"
                label="Email"
                autoComplete="email"
                {...register("email")}
                error={Boolean(errors.email)}
                helperText={errors.email?.message}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <EmailIcon color="action" />
                      </InputAdornment>
                    ),
                  },
                }}
              />

              <Controller
                name="phone"
                control={control}
                defaultValue=""
                render={({ field: { onChange, value, ...field } }) => (
                  <TextField
                    fullWidth
                    id="phone"
                    label="Telefone"
                    autoComplete="tel"
                    placeholder="(11) 98765-4321"
                    value={value}
                    onChange={(e) => {
                      const maskedValue = applyPhoneMask(e.target.value);
                      onChange(maskedValue);
                    }}
                    error={Boolean(errors.phone)}
                    helperText={errors.phone?.message || "Ex: (11) 98765-4321"}
                    slotProps={{
                      input: {
                        startAdornment: (
                          <InputAdornment position="start">
                            <PhoneIcon color="action" />
                          </InputAdornment>
                        ),
                      },
                    }}
                    {...field}
                  />
                )}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                disabled={isSubmitting}
                sx={styles.submitButton}
              >
                {isSubmitting ? "Cadastrando..." : "Cadastrar"}
              </Button>
            </Stack>
          </Box>

          <Box sx={styles.footerBox}>
            <Typography variant="body2" color="text.secondary">
              Já tem uma conta?{" "}
              <MuiLink
                component={Link}
                href="/auth/signin"
                underline="hover"
                sx={styles.link}
              >
                Entrar
              </MuiLink>
            </Typography>
          </Box>
        </Stack>

        <Typography
          variant="body2"
          color="text.secondary"
          align="center"
          sx={styles.copyright}
        >
          © {new Date().getFullYear()} Gym App. Todos os direitos reservados.
        </Typography>
      </Box>
    </Container>
  );
}

const styles: Record<string, SxProps<Theme>> = {
  container: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    py: 4,
  },
  card: {
    p: 4,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    borderRadius: 2,
  },
  logoBox: {
    width: 56,
    height: 56,
    borderRadius: "50%",
    bgcolor: "primary.main",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    mb: 2,
  },
  logoIcon: {
    fontSize: 32,
    color: "white",
  },
  subtitle: {
    mb: 4,
  },
  form: {
    width: "100%",
  },
  submitButton: {
    mt: 2,
    py: 1.5,
    fontWeight: 600,
    textTransform: "none",
    fontSize: "1rem",
  },
  footerBox: {
    mt: 3,
    textAlign: "center",
  },
  link: {
    fontWeight: 600,
  },
  copyright: {
    mt: 4,
  },
};