import {DataSource} from 'typeorm';

const dataSource = new DataSource({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'password',
    database: 'test',
    entities: [],
    synchronize: true,
});

export default dataSource;
