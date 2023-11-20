import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { Country, fetchCountries } from "../services/countries";

const country1 = "country1";
const country2 = "country2";

export default function Compare() {
    const [searchParams] = useSearchParams();

    const {
        data: countries,
    } = useQuery({
        queryKey: ["/countries"],
        queryFn: fetchCountries,
    });

    const {
        data: firstCountry,
    } = useQuery({
        queryKey: ["/first"],
        queryFn: () => {
            return countries!
                .find((country: Country) =>
                    country.name.common === searchParams.get(country1));
        },
        enabled: !!countries,
    });

    const {
        data: secondCountry,
    } = useQuery({
        queryKey: ["/second"],
        queryFn: () => {
            return countries!
                .find((country: Country) =>
                    country.name.common === searchParams.get(country2));
        },
        enabled: !!countries,
    });

    return <div>
        <table className="table-auto">
            <thead>
                <tr>
                    <th>Attribute</th>
                    <th>{searchParams.get(country1)}</th>
                    <th>{searchParams.get(country2)}</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Common Name</td>
                    <td>{ firstCountry?.name.common }</td>
                    <td>{ secondCountry?.name.common }</td>
                </tr>
                <tr>
                    <td>Official Name</td>
                    <td>{ firstCountry?.name.official }</td>
                    <td>{ secondCountry?.name.official }</td>
                </tr>
                <tr>
                    <td>Flag</td>
                    <td>{ `${firstCountry?.flag}` }</td>
                    <td>{ `${secondCountry?.flag}` }</td>
                </tr>
                <tr>
                    <td>Area</td>
                    <td>{ `${firstCountry?.area}km^2` }</td>
                    <td>{ `${secondCountry?.area}km^2` }</td>
                </tr>
                <tr>
                    <td>Population</td>
                    <td>{ `${firstCountry?.population} people` }</td>
                    <td>{ `${secondCountry?.population} people` }</td>
                </tr>
                <tr>
                    <td>Coordinates</td>
                    <td>{ `${firstCountry?.latlng[0]}, ${firstCountry?.latlng[1]}` }</td>
                    <td>{ `${secondCountry?.latlng[0]}, ${firstCountry?.latlng[1]}` }</td>
                </tr>
                <tr>
                    <td>Region</td>
                    <td>{ firstCountry?.region }</td>
                    <td>{ secondCountry?.region }</td>
                </tr>
                <tr>
                    <td>U.N. Member?</td>
                    <td>{ firstCountry?.unMember ? "true" : "false" }</td>
                    <td>{ secondCountry?.unMember ? "true" : "false" }</td>
                </tr>
                <tr>
                    <td>Landlocked?</td>
                    <td>{ firstCountry?.landlocked ? "true" : "false" }</td>
                    <td>{ secondCountry?.landlocked ? "true" : "false" }</td>
                </tr>
            </tbody>
        </table>
    </div>
}
