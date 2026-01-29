import neo4j, { Driver } from "neo4j-driver";
import { config } from "../config";

let driver: Driver | null = null;

export function getDriver(): Driver {
  if (!driver) {
    driver = neo4j.driver(
      config.neo4j.uri,
      neo4j.auth.basic(
        config.neo4j.user,
        config.neo4j.password
      ),
      {
        maxConnectionPoolSize: 50,
        connectionAcquisitionTimeout: 30000, // 30s
        maxConnectionLifetime: 60 * 60 * 1000 // 1 hour
      }
    );
  }
  return driver;
}

export async function closeDriver() {
  if (driver) {
    await driver.close();
    driver = null;
    console.log("🧹 Neo4j driver closed");
  }
}
