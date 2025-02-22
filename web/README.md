# Gym App - Sistema de Gerenciamento de Academia

Sistema completo de gerenciamento de academia desenvolvido com **Next.js 15**, **Material UI v7** e **TypeScript**.

## 🚀 Tecnologias

- **Next.js 15.5.6** - Framework React com App Router
- **React 19.1.0** - Biblioteca JavaScript para construção de interfaces
- **Material UI v7** - Biblioteca de componentes React com design Material Design
- **TypeScript** - Superset JavaScript com tipagem estática
- **Emotion** - Biblioteca CSS-in-JS para estilização
- **Biome** - Linter e formatador de código

## 📦 Dependências do MUI

O projeto está configurado com as seguintes dependências do Material UI:

- `@mui/material` - Componentes principais do Material UI
- `@emotion/react` - Engine de estilização (Emotion)
- `@emotion/styled` - API styled do Emotion
- `@mui/material-nextjs` - Integração Material UI com Next.js
- `@emotion/cache` - Cache de estilos do Emotion
- `@mui/icons-material` - Ícones Material Design
- `@fontsource/roboto` - Fonte Roboto (fonte padrão do Material UI)

## 🎨 Configuração do Material UI

O projeto está configurado seguindo as melhores práticas do Material UI com Next.js App Router:

### Estrutura de Arquivos

```
src/
├── app/
│   ├── layout.tsx      # Layout raiz com providers do MUI
│   └── page.tsx        # Página inicial
└── theme.ts            # Configuração do tema customizado
```

### Características da Configuração

- **AppRouterCacheProvider**: Gerenciamento de cache de estilos para Next.js App Router
- **ThemeProvider**: Provider do tema Material UI
- **CssBaseline**: Reset de CSS e estilos base consistentes
- **CSS Variables**: Tema configurado com variáveis CSS para melhor performance
- **Font Optimization**: Integração com Next.js Font para otimização da fonte Roboto
- **TypeScript**: Suporte completo com tipagem forte

### Tema Customizado

O arquivo `src/theme.ts` contém a configuração do tema:

```typescript
'use client';
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  cssVariables: true,
  typography: {
    fontFamily: 'var(--font-roboto)',
  },
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});
```

## 🛠️ Scripts Disponíveis

```bash
# Iniciar servidor de desenvolvimento
npm run dev

# Criar build de produção
npm run build

# Iniciar servidor de produção
npm run start

# Executar linter
npm run lint

# Formatar código
npm run format
```

## 🚦 Como Executar

1. **Instalar dependências:**
```bash
npm install
```

2. **Executar em modo de desenvolvimento:**
```bash
npm run dev
```

3. **Acessar o aplicativo:**
Abra [http://localhost:3000](http://localhost:3000) no navegador

## 📝 Recursos do Material UI

O projeto tem acesso a todos os componentes do Material UI v7:

- Layout components (Container, Grid, Stack, Box)
- Inputs (TextField, Button, Select, etc.)
- Navigation (AppBar, Drawer, Menu, etc.)
- Feedback (Dialog, Snackbar, Progress, etc.)
- Data Display (Table, List, Card, etc.)
- E muito mais...

## 🔧 Personalização

Para personalizar o tema, edite o arquivo `src/theme.ts`. Você pode modificar:

- Cores (palette)
- Tipografia (typography)
- Espaçamentos (spacing)
- Breakpoints (breakpoints)
- Componentes (components)

Exemplo de customização de componente:

```typescript
const theme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
  },
});
```

## 📚 Documentação

- [Next.js](https://nextjs.org/docs)
- [Material UI](https://mui.com/material-ui/getting-started/)
- [React](https://react.dev)
- [TypeScript](https://www.typescriptlang.org/docs/)

## 👨‍💻 Desenvolvimento

Este projeto foi configurado com as melhores práticas de desenvolvimento:

- **Biome**: Linter e formatador rápido e eficiente
- **TypeScript**: Tipagem estática para maior segurança
- **Material UI**: Componentes consistentes e acessíveis
- **Next.js**: SSR e otimizações automáticas

---

Desenvolvido com ❤️ usando Next.js e Material UI
