import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const databaseConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'tu_usuario',
  password: 'tu_contraseña',
  database: 'gymplus',
  entities: ['dist/**/*.entity{.ts,.js}'],
  synchronize: true, // Solo para desarrollo, en producción debería ser false
};