import { getDriver } from "./driver";

export async function runQuery(
  query: string,
  params: Record<string, any> = {}
) {
  const session = getDriver().session();

  try {
    const result = await session.run(query, params);
    return result.records.map(r => r.toObject());
  } catch (err) {
    throw err;
  } finally {
    await session.close(); // 🔥 VERY IMPORTANT
  }
}
