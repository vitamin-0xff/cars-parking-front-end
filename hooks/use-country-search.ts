import { countryApi } from "@/lib/api";
import { CountryFuzzySearch, CountryResponse } from "@/lib/types";
import { useEffect } from "react";

export const useCountrySearch = ({
    serachTerm,
    onResult,
    onError,
    abordController,
    onLoadingStatusChanged
}: { serachTerm: string, onResult: (countries: CountryFuzzySearch[]) => void, onError: (_error: string) => void, abordController: AbortController, onLoadingStatusChanged?: (isLoading: boolean) => void }) => {
    useEffect(() => {
        const searchCountry = async () => {
            if (serachTerm.trim().length < 2) {
                onResult([]);
                return;
            }
            onLoadingStatusChanged?.(true); 
            try {
                const results = await countryApi.fuzzySearch(serachTerm.trim(), abordController.signal);
                onResult(results);
            } catch (e) {
                onError((e as Error).message);
            }
            onLoadingStatusChanged?.(false);
        }
        searchCountry();
        return () => {
            abordController.abort();
        };
    }, [serachTerm]);
}