// src/lib/db.d.ts

declare module '@lib/db.js' {
  const db: {
    query: (sql: string, params?: unknown[]) => Promise<unknown[]>;
  };
  export default db;
}
