'use client';

import { SearchIcon } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import { useDebounce } from '@/hooks/useDebounce';
import type { SearchResult } from '@/types/weather';
import { useRouter } from 'next/navigation';

export default function Search() {
  const [location, setLocation] = useState('');

  const [searchValue, setSearchValue] = useState('');
  const debouncedValue = useDebounce(searchValue, 500);

  const [searchOptionsOpen, setSearchOptionsOpen] = useState(false);
  const [searchResults, setSearchResults] = useState<SearchResult[]>();

  const router = useRouter();

  const search = useCallback(async () => {
    if (!debouncedValue) return;

    const res = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${debouncedValue}&count=10&language=en&format=json`);
    const data = await res.json();
    setSearchResults(data.results as SearchResult[]);
  }, [debouncedValue]);

  useEffect(() => {
    if (!debouncedValue) {
      setSearchResults([]);
      return;
    }

    search();
    setSearchOptionsOpen(true);
  }, [debouncedValue, search]);

  function handleOptionSelected(option: SearchResult) {
    // Set search params
    router.push(`/?location=${option.latitude},${option.longitude}`);
    router.refresh();

    // Notify parent for title change
    setLocation(`${option.name}, ${option.country_code.toUpperCase()}`);

    // Reset state
    setSearchValue('');
    setSearchResults([]);
    setSearchOptionsOpen(false);
  }

  function searchBlurred(e: React.FocusEvent<HTMLInputElement, Element>) {
    // If a list option is chosen, don't do anything as handleSelected will sort out click
    if (e.relatedTarget) return;

    setSearchOptionsOpen(false);
  }

  function geoLocateUser() {
    function success(position: GeolocationPosition) {
      router.push(`/?location=${position.coords.latitude},${position.coords.longitude}`);
      router.refresh();

      // Notify parent for title change
      setLocation('Your Location');

      // Reset state
      setSearchOptionsOpen(false);
      setSearchResults([]);
      setSearchValue('');
    }

    function error() {
      alert('Could not locate user');
    }

    if (!navigator.geolocation) {
      alert('Geolocation not supported by your browser');
    } else {
      navigator.geolocation.getCurrentPosition(success, error);
    }
  }

  return (
    <>
      <div className="w-full flex gap-4 lg:gap-8 items-center">
        {/* Searchbox with debounced type-ahead search */}
        <div className="w-full relative grow">
          <div className="flex relative w-full grow">
            <SearchIcon className="absolute top-[1.3rem] left-[1rem] text-slate-400 h-6 w-6" />
            <input
              placeholder="Search for a location"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              onBlur={searchBlurred}
              onFocus={(e) => setSearchOptionsOpen(true)}
              className="pl-12 pr-2 py-5 bg-white grow rounded-xl text-lg"
            />
          </div>
          {searchResults && searchOptionsOpen && (
            <ul className="absolute w-full bg-white">
              {searchResults.map((option) => (
                <li
                  key={option.id}
                  tabIndex={0}
                  role="button"
                  onClick={() => handleOptionSelected(option)}
                  className="px-2 py-4 border w-full grid grid-cols-[min-content_1fr] items-center text-slate-700 hover:text-black hover:bg-slate-200 cursor-pointer"
                >
                  <span className="tracking-wider font-bold text-lg uppercase mr-4 font-mono">{option.country_code}</span>
                  <span className="tracking-wider">
                    {option.name}
                    {option.admin1 ? `, ${option.admin1}` : ''}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Get current location */}
        <button
          className="w-16 h-16 rounded bg-slate-200 hover:bg-slate-300 text-slate-700"
          onClick={geoLocateUser}
          title="Use your current location"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5 m-auto"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polygon points="3 11 22 2 13 21 11 13 3 11" />
          </svg>
        </button>
      </div>
      {location && (
        <h2 className="font-bold text-xl md:text-2xl">
          Weather {location === 'Your Location' ? 'at' : 'in'} <span>{location}</span>
        </h2>
      )}
    </>
  );
}
