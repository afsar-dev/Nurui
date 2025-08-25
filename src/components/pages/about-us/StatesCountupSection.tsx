"use client";

import { useEffect, useState } from "react";
import StatesCountup from "@/components/common/StatesCountup";
import { Index } from "@/registry/components-registry";
import { useInView } from "react-intersection-observer";

type GitHubData = {
  stars: number;
  contributors: number;
  developersUsing: number;
};

type MetricsData = {
  count: number;
  description: string;
};

const StatesCount = () => {
  const { ref, inView } = useInView();
  const [githubData, setGithubData] = useState<GitHubData>({
    stars: 14, // Fallback value
    contributors: 3, // Fallback value
    developersUsing: 17, // Fallback value
  });
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const fetchGitHubData = async () => {
      try {
        setIsLoading(true);
        setHasError(false);

        const [repoResponse, contributorsResponse] = await Promise.all([
          fetch("https://api.github.com/repos/afsar-dev/Nurui"),
          fetch("https://api.github.com/repos/afsar-dev/Nurui/contributors"),
        ]);

        if (!repoResponse.ok || !contributorsResponse.ok) {
          throw new Error(
            `GitHub API error: ${repoResponse.status} ${contributorsResponse.status}`,
          );
        }

        const [repoData, contributorsData] = await Promise.all([
          repoResponse.json(),
          contributorsResponse.json(),
        ]);

        const developersUsing =
          (repoData.watchers_count || 0) + (repoData.forks_count || 0);

        setGithubData({
          stars: repoData.stargazers_count || 14,
          contributors: Array.isArray(contributorsData)
            ? contributorsData.length
            : 3,
          developersUsing: developersUsing || 17,
        });
      } catch (error) {
        console.error("Failed to fetch GitHub data:", error);
        setHasError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchGitHubData();
  }, []);

  const metricsData: MetricsData[] = [
    {
      count: Object.keys(Index).length, 
      description: "Components available in the library",
    },
    {
      count: githubData.developersUsing, 
      description: "Developers using nurui",
    },
    {
      count: githubData.contributors, 
      description: "Open-source contributors",
    },
    {
      count: githubData.stars, 
      description: "GitHub stars",
    },
  ];

  return (
    <section ref={ref} className="container">
      <div className="space-y-10 lg:space-y-12 xl:space-y-16 shadow-xl dark:shadow-none bg-white dark:bg-white/5 p-6 md:p-8 xl:p-10 rounded-xl border border-[var(--glass-color-3)]">
        <h1 className="px-4 text-2xl md:text-4xl xl:text-6xl font-semibold text-center">
          nurui.com by the numbers
        </h1>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center xl:divide-x xl:divide-[var(--border-color)]">
          {metricsData?.map((data) => (
            <StatesCountup
              key={data?.description}
              count={data?.count}
              title={data?.description}
              isView={inView && !isLoading}
            />
          ))}
        </div>
        {isLoading && (
          <div className="text-center text-sm text-gray-500">
            Loading GitHub stats...
          </div>
        )}
        {hasError && !isLoading && (
          <div className="text-center text-sm text-yellow-500">
            Using cached values - GitHub API temporarily unavailable
          </div>
        )}
      </div>
    </section>
  );
};

export default StatesCount;
