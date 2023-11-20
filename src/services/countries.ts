import { z } from "zod";

const CountrySchema = z.object({
    name: z.object({
        common: z.string(),
        official: z.string(),
    }),
    unMember: z.boolean(),
    region: z.string(),
    latlng: z.array(z.number()).length(2),
    landlocked: z.boolean(),
    area: z.number(),
    flag: z.string(),
    population: z.number(),
});

const CountriesSchema = z.array(CountrySchema);

export type Country = z.infer<typeof CountrySchema>;

export const fetchCountries = async () => {
    try {
        const response = await fetch("https://restcountries.com/v3.1/all"); 
        const json = await response.json();
        const result: Country[] = CountriesSchema.parse(json);
        return result;
    } catch (e: unknown) {
        console.log((e as Error).message);
        return [];
    }
};


