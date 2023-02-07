import { Pool } from "pg";
import "dotenv/config";

const {
  POSTGRES_DB,
  POSTGRES_PASSWORD,
  POSTGRES_URL,
  POSTGRES_USER,
  ENV,
  POSTGRES_TEST_DB,
} = process.env;

let Client: Pool = new Pool();
if (ENV === "dev") {
  Client = new Pool({
    host: POSTGRES_URL,
    database: POSTGRES_DB,
    user: POSTGRES_USER,
    password: POSTGRES_PASSWORD,
  });
}
console.log("ENV === " + ENV);
if (ENV === "test") {
  Client = new Pool({
    host: POSTGRES_URL,
    database: POSTGRES_TEST_DB,
    user: POSTGRES_USER,
    password: POSTGRES_PASSWORD,
  });
}
console.log("ENV= " + ENV);
export default Client;
