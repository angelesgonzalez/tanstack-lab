import { createFileRoute } from "@tanstack/react-router";
import { getHouses } from "#/lib/api";
import { toHouseCardVM } from "#/lib/mappers";
import { HouseCard } from "#/components/HouseCard";


export const Route = createFileRoute("/")({
  staleTime: 60 * 60 * 1000,
  loader: async () => {
    const houses = await getHouses();
    return houses.map(toHouseCardVM);
  },
  component: Home,
});

function Home() {
  const houseCards = Route.useLoaderData();

  return (
    <div>
      <h1 className="font-mono text-xs uppercase tracking-widest text-zinc-500">
        {houseCards.length} rural houses
      </h1>
      <div className="mt-8 grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
        {houseCards.map((house) => (
          <HouseCard key={house.id} house={house} />
        ))}
      </div>
    </div>
  );
}
