import { ChangeEvent, FormEvent, useState } from "react";
import { useQuery } from '@tanstack/react-query'
import { fetchCountries, Country } from "../services/countries"; 
import { Some } from "../types/util";
import { createSearchParams, useNavigate } from "react-router-dom";

export default function Search() {
    const [country1, setCountry1] = useState<Some<string>>();
    const [country2, setCountry2] = useState<Some<string>>();
    const navigate = useNavigate();

    const {
        isFetching,
        data: countries,
    } = useQuery({
        queryKey: ["/countries"],
        queryFn: fetchCountries
    });

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
        navigate({
            pathname: "/compare",
            search: `?${createSearchParams({
                country1: country1 as string,
                country2: country2 as string,
            })}`,
        });
    };

    const country1Handler = (e: ChangeEvent<HTMLSelectElement>) => {
        setCountry1(e.target.value);
    };

    const country2Handler = (e: ChangeEvent<HTMLSelectElement>) => {
        setCountry2(e.target.value);
    };

    return (
        <div className="flex flex-col">
            <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
                <section className="flex flex-col gap-2">
                    <label>
                        <p className="text-2xl font-bold tracking-tight">Choose a country:</p>
                        <select className="border rounded px-3 py-2" placeholder="Country 1" value={country1} onChange={country1Handler}>
                            {
                                isFetching
                                ? []
                                : countries!.map((country: Country) =>
                                    <option key={country.name.common} value={country.name.common}>
                                        {country.name.common}
                                    </option>
                                )
                            }
                        </select>
                    </label>
                </section>
                <section className="flex flex-col gap-2">
                    <label>
                        <p className="text-2xl font-bold tracking-tight">Choose a country to compare:</p>
                        <select className="border rounded px-3 py-2" placeholder="Country 1" value={country2} onChange={country2Handler}>
                            {
                                isFetching
                                ? []
                                : countries!.map((country: Country) =>
                                    <option key={country.name.common} value={country.name.common}>
                                        {country.name.common}
                                    </option>
                                )
                            }
                        </select>
                    </label>
                </section>
                <input className="border rounded-lg px-3 py-2" type="submit" value="Submit" />
            </form>
        </div>
    );
}
