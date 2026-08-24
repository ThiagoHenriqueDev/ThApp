import cors from 'cors';
import express from 'express';
import authRoutes from './modules/auth/routes/auth.route';
import usuarioRoutes from './modules/usuario/routes/usuario.route';

const app = express();

app.use(cors());

app.use(express.json());

// Rota de teste
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.use('/auth', authRoutes);
app.use('/usuarios', usuarioRoutes);

export default app;
