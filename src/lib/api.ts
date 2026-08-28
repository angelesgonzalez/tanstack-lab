import { createServerFn } from "@tanstack/react-start";
import type { House } from "./types";

export const getHouses = createServerFn({ method: 'GET' }).handler(

    async (): Promise<House[]> => {

        const res = await fetch(`${process.env.API_URL}/api/houses`);

        if (!res.ok) {
            throw new Error(`There's been an error while fetching the houses, check the api.`)
        }

        return res.json();
    },

);

export const getHouseById = createServerFn({ method: "GET" })
    .validator((id: string) => id)
    .handler(async ({ data: id }): Promise<House | undefined> => {
        const res = await fetch(`${process.env.API_URL}/api/houses/${id}`);

        if (!res.ok) {
            throw new Error("Failed to fetch house");
        }

        const text = await res.text();
        if (!text) {
            return undefined;
        }

        return JSON.parse(text);
    });