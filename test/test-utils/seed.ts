import { getConnection } from 'typeorm';
import { User } from '../../src/modules/users/entities/user.entity';

export const testDatasetSeed = async () => {
  const connection = await getConnection();
  const entityManager = connection.createEntityManager();

  entityManager.insert<User>(User, {
    name: 'moa',
    email: 'email@email.com',
    password: '123456'
  });

};