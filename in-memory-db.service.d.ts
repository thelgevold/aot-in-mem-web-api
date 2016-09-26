import { InMemoryDbService } from 'angular-in-memory-web-api/in-memory-web-api';
export declare class InMemoryDataService implements InMemoryDbService {
    createDb(): {
        heroes: {
            id: number;
            name: string;
        }[];
    };
}
