"use client";

import { FormEvent, useMemo, useState } from "react";
import { historyPages } from "./historyPages";
import styles from "./history.module.css";

const filters = [
  "All",
  "People",
  "Ideas & Innovation",
  "Service & Sacrifice",
  "Events",
  "Indigenous"
];

export default function HistorySearch() {
  const [query, setQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");
  const [open, setOpen] = useState(false);

  const results = useMemo(() => {
    const needle = query.trim().toLowerCase();

    return historyPages.filter((page) => {
      const matchesFilter =
        activeFilter === "All" ||
        page.category.toLowerCase().includes(activeFilter.toLowerCase());

      if (!matchesFilter) return false;
      if (!needle) return true;

      const haystack = [
        page.title,
        page.subtitle,
        page.summary,
        page.category,
        ...page.searchTerms
      ]
        .join(" ")
        .toLowerCase();

      return haystack.includes(needle);
    });
  }, [query, activeFilter]);

  function submitSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (results.length === 1) {
      window.location.href = `/history/${results[0].section}/${results[0].slug}`;
      return;
    }
    setOpen(true);
  }

  const showResults = open || query.trim().length > 0 || activeFilter !== "All";

  return (
    <section className={styles.searchSection} aria-labelledby="history-search-title">
      <div className={styles.searchInner}>
        <div className={styles.searchHeading}>
          <p className={styles.sectionKicker}>SEARCH THE RECORD</p>
          <h2 id="history-search-title">People. Events. Ideas. Documents. Stories.</h2>
          <p>
            Search across ECCOOZS History as the archive grows. A result can live in one
            collection and still connect to people, events, service, innovation, and the
            records behind the story.
          </p>
        </div>

        <form className={styles.searchForm} onSubmit={submitSearch}>
          <div className={styles.searchFieldWrap}>
            <span className={styles.searchGlyph} aria-hidden="true">⌕</span>
            <input
              className={styles.searchInput}
              type="search"
              value={query}
              onChange={(event) => {
                setQuery(event.target.value);
                setOpen(true);
              }}
              onFocus={() => setOpen(true)}
              placeholder="Search people, events, inventions, places, collections..."
              aria-label="Search ECCOOZS History"
            />
            <button className={styles.searchButton} type="submit">Search</button>
          </div>

          <div className={styles.searchFilters} aria-label="Filter History search">
            {filters.map((filter) => (
              <button
                key={filter}
                type="button"
                className={activeFilter === filter ? styles.searchFilterActive : ""}
                onClick={() => {
                  setActiveFilter(filter);
                  setOpen(true);
                }}
              >
                {filter}
              </button>
            ))}
          </div>
        </form>

        {showResults ? (
          <div className={styles.searchResults} aria-live="polite">
            <div className={styles.searchResultHeader}>
              <span>
                {results.length} {results.length === 1 ? "result" : "results"}
              </span>
              <button
                type="button"
                onClick={() => {
                  setQuery("");
                  setActiveFilter("All");
                  setOpen(false);
                }}
              >
                Clear
              </button>
            </div>

            {results.length ? (
              <div className={styles.searchResultGrid}>
                {results.map((page) => (
                  <a
                    key={`${page.section}-${page.slug}`}
                    href={`/history/${page.section}/${page.slug}`}
                    className={styles.searchResultCard}
                  >
                    <img src={page.thumbnail} alt="" />
                    <div>
                      <span>{page.category}</span>
                      <strong>{page.title}</strong>
                      <p>{page.summary}</p>
                    </div>
                  </a>
                ))}
              </div>
            ) : (
              <p className={styles.searchEmpty}>
                No matching History pages yet. Try another name, subject, place, or category.
              </p>
            )}
          </div>
        ) : null}
      </div>
    </section>
  );
}
