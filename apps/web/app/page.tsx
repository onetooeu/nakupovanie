import { marketNames } from "../src/markets";

export default function HomePage() {
  return (
    <main>
      <h1>Nakupovanie</h1>
      <p>{marketNames.SK}</p>
      <p>{marketNames.CZ}</p>
    </main>
  );
}
