"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { SearchIcon } from "lucide-react";

const Search = () => {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(query);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [query]);

  useEffect(() => {
    if (debouncedQuery && debouncedQuery.length > 3) {
      setLoading(true);
      // Simulate loading before navigation
      setTimeout(() => {
        setLoading(false);
        setQuery("");
        router.push(`/search/${debouncedQuery}`);
      }, 1000); // Adjust the delay as needed
    }
  }, [debouncedQuery, router]);

  return (
    <div className="flex-grow flex mx-8">
      <div className="relative flex-grow">
        {loading ? (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 animate-spin rounded-full border-2 border-gray-700 border-t-transparent h-4 w-4"></div>
        ) : (
          <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
        )}
        <input
          type="text"
          placeholder="ابحث في اكثر من 70 مليون بودكاتس وحلقات "
          className="w-full bg-100 border border-gray-700 rounded-full px-10 py-2 text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>
    </div>
  );
};

export default Search;
