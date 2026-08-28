import { createFileRoute, notFound } from "@tanstack/react-router";
import { getHouseById } from "#/lib/api";
import { toHouseDetailVM } from "#/lib/mappers";
import { ReviewItem } from "#/components/ReviewItem";

export const Route = createFileRoute("/houses/$id")({
  staleTime: 60 * 60 * 1000,
  loader: async ({ params }) => {
    const house = await getHouseById({ data: params.id });

    if (!house) {
      throw notFound();
    }

    return toHouseDetailVM(house);
  },
  component: HouseDetailPage,
});

function HouseDetailPage() {
  const detail = Route.useLoaderData();

  return (
    <article>
      <div className="flex items-baseline justify-between">
        <h1 className="text-2xl font-medium">{detail.title}</h1>
        <p className="font-mono text-sm text-zinc-700">{detail.price}</p>
      </div>

      <div className="mt-6 aspect-[16/9] overflow-hidden bg-zinc-200">
        <img
          src={detail.imageUrl}
          alt={detail.title}
          className="h-full w-full object-cover"
        />
      </div>

      <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-[2fr_1fr]">
        <div>
          <h2 className="font-mono text-xs uppercase tracking-widest text-zinc-500">
            Description
          </h2>
          <p className="mt-2 text-zinc-700">{detail.description}</p>
        </div>

        <div className="space-y-4">
          <div>
            <h2 className="font-mono text-xs uppercase tracking-widest text-zinc-500">
              Address
            </h2>
            <p className="mt-2 text-zinc-700">{detail.address}</p>
          </div>
          <div className="flex gap-6 font-mono text-sm text-zinc-700">
            <span>{detail.bedrooms} bd</span>
            <span>{detail.beds} beds</span>
            <span>{detail.bathrooms} ba</span>
          </div>
        </div>
      </div>

      <div className="mt-10">
        <h2 className="font-mono text-xs uppercase tracking-widest text-zinc-500">
          Reviews
        </h2>
        <div className="mt-4 space-y-4">
          {detail.reviews.map((review) => (
            <ReviewItem key={review.id} review={review} />
          ))}
        </div>
      </div>
    </article>
  );
}