import { useEffect, useState } from "react";
import { getBackendBaseUrl } from "../utils/backendFunctions";
import axios from "axios";

export type Repo = {
    name: string;
    owner: string;
    url: string;
    id: string;
};

export const useRepos = (email: string, isConnected: boolean) => {
    const [repos, setRepos] = useState<Repo[]>([]);

    const getRepos = async (): Promise<Repo[]> => {
        if (!isConnected) return [];

        const baseUrl = getBackendBaseUrl();
        const query = new URLSearchParams({ email });
        console.log(query);
        const response = Object.values(
            (
                await axios.get<
                    {
                        repoName: string;
                        repoOwner: string;
                        repoUrl: string;
                        repoId: string;
                    }[]
                >(`${baseUrl}/github/repos?${query}`)
            ).data
        );
        const rep: Repo[] = response.map((repo) => ({
            name: repo.repoName,
            owner: repo.repoOwner,
            url: repo.repoUrl,
            id: repo.repoId,
        }));

        return rep;

        // return [
        //     {
        //         name: "repo1",
        //         owner: "owner1",
        //         url: "url1",
        //         id: "id1",
        //     },
        //     {
        //         name: "repo2",
        //         owner: "owner2",
        //         url: "url2",
        //         id: "id2",
        //     },
        //     {
        //         name: "repo3",
        //         owner: "owner3",
        //         url: "url3",
        //         id: "id3",
        //     },
        //     {
        //         name: "repo4",
        //         owner: "owner4",
        //         url: "url4",
        //         id: "id4",
        //     },
        //     {
        //         name: "repo5",
        //         owner: "owner5",
        //         url: "url5",
        //         id: "id5",
        //     },
        // ];
    };

    useEffect(() => {
        getRepos().then((repos) => setRepos(repos));
    }, [email, isConnected]);

    return { repos };
};
