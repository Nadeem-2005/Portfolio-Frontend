import axios from 'axios';

class GitHubService {
    constructor() {
        this.baseURL = 'https://api.github.com/graphql';
        this.token = import.meta.env.VITE_GITHUB_TOKEN;
    }

    async fetchRepositories(username, count = 6) {
        const query = `
            query($username: String!, $count: Int!) {
                user(login: $username) {
                    repositories(
                        first: $count
                        orderBy: { field: UPDATED_AT, direction: DESC }
                        privacy: PUBLIC
                        isFork: false
                        ownerAffiliations: [OWNER]
                    ) {
                        nodes {
                            id
                            name
                            description
                            url
                            homepageUrl
                            stargazerCount
                            forkCount
                            createdAt
                            updatedAt
                            primaryLanguage {
                                name
                                color
                            }
                            languages(first: 5) {
                                nodes {
                                    name
                                    color
                                }
                            }
                            repositoryTopics(first: 10) {
                                nodes {
                                    topic {
                                        name
                                    }
                                }
                            }
                            object(expression: "HEAD:README.md") {
                                ... on Blob {
                                    text
                                }
                            }
                            defaultBranchRef {
                                name
                            }
                        }
                    }
                }
            }
        `;

        try {
            const response = await axios.post(
                this.baseURL,
                {
                    query,
                    variables: { username, count }
                },
                {
                    headers: {
                        'Authorization': `Bearer ${this.token}`,
                        'Content-Type': 'application/json',
                    }
                }
            );

            if (response.data.errors) {
                throw new Error(response.data.errors[0].message);
            }

            return this.transformRepositoryData(response.data.data.user.repositories.nodes);
        } catch (error) {
            console.error('Error fetching GitHub repositories:', error);
            throw error;
        }
    }

    transformRepositoryData(repositories) {
        return repositories
            .filter(repo => {
                return repo.description &&
                       repo.description.trim().length > 10 &&
                       repo.name !== repo.name.toLowerCase(); // Filter out simple utility repos
            })
            .map(repo => {
                const languages = repo.languages.nodes.map(lang => lang.name);
                const topics = repo.repositoryTopics.nodes.map(topic => topic.topic.name);
                const techStack = this.createTechStack(languages, topics);

                return {
                    id: repo.id,
                    title: this.formatTitle(repo.name),
                    description: repo.description || `A ${repo.primaryLanguage?.name || 'software'} project showcasing modern development practices.`,
                    techStack: techStack,
                    githubUrl: repo.url,
                    liveUrl: repo.homepageUrl || null,
                    imageUrl: this.generateImageUrl(repo.name),
                    stars: repo.stargazerCount,
                    forks: repo.forkCount,
                    language: repo.primaryLanguage?.name || 'Unknown',
                    languageColor: repo.primaryLanguage?.color || '#586069',
                    topics: topics,
                    createdAt: repo.createdAt,
                    updatedAt: repo.updatedAt
                };
            });
    }

    createTechStack(languages, topics) {
        const commonFrameworks = {
            'javascript': ['React', 'Node.js', 'Express'],
            'typescript': ['React', 'Node.js', 'TypeScript'],
            'python': ['Django', 'Flask', 'FastAPI'],
            'java': ['Spring', 'Maven'],
            'html': ['CSS3', 'JavaScript'],
            'css': ['HTML5', 'JavaScript'],
            'swift': ['iOS', 'Xcode'],
            'kotlin': ['Android'],
            'dart': ['Flutter'],
            'go': ['Gin', 'Echo'],
            'rust': ['Actix', 'Rocket'],
            'php': ['Laravel', 'Symfony'],
            'c#': ['.NET', 'ASP.NET'],
            'ruby': ['Rails'],
            'scala': ['Play', 'Akka']
        };

        const techStack = new Set();

        // Add languages
        languages.forEach(lang => {
            techStack.add(lang);

            // Add common frameworks for each language
            const frameworks = commonFrameworks[lang.toLowerCase()];
            if (frameworks) {
                frameworks.slice(0, 2).forEach(framework => techStack.add(framework));
            }
        });

        // Add relevant topics
        const relevantTopics = topics.filter(topic => {
            const topicLower = topic.toLowerCase();
            return ['react', 'vue', 'angular', 'node', 'express', 'django', 'flask',
                   'spring', 'mongodb', 'postgresql', 'mysql', 'redis', 'docker',
                   'kubernetes', 'aws', 'gcp', 'azure', 'tailwind', 'bootstrap',
                   'graphql', 'api', 'websocket', 'firebase', 'nextjs', 'nestjs'].includes(topicLower);
        });

        relevantTopics.forEach(topic => techStack.add(this.capitalizeFirst(topic)));

        return Array.from(techStack).slice(0, 5); // Limit to 5 items
    }

    formatTitle(repoName) {
        return repoName
            .split('-')
            .map(word => this.capitalizeFirst(word))
            .join(' ');
    }

    capitalizeFirst(str) {
        return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    }

    generateImageUrl(repoName) {
        // Generate a consistent placeholder image based on repo name
        const seed = repoName.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
        const colors = ['4F46E5', '7C3AED', 'DB2777', 'DC2626', 'EA580C', '059669', '0891B2'];
        const color = colors[seed % colors.length];

        return `https://via.placeholder.com/400x300/${color}/FFFFFF?text=${encodeURIComponent(repoName)}`;
    }

    async fetchSpecificRepositories(username, 
        repositoryNames) {
        // Build individual repository queries for each specific repo
        const repositoryQueries = repositoryNames.map((repoName, index) => `
            repo${index}: repository(owner: $username, name: "${repoName}") {
                id
                name
                description
                url
                homepageUrl
                stargazerCount
                forkCount
                createdAt
                updatedAt
                primaryLanguage {
                    name
                    color
                }
                languages(first: 5) {
                    nodes {
                        name
                        color
                    }
                }
                repositoryTopics(first: 10) {
                    nodes {
                        topic {
                            name
                        }
                    }
                }
                object(expression: "HEAD:README.md") {
                    ... on Blob {
                        text
                    }
                }
                defaultBranchRef {
                    name
                }
                isPrivate
                isFork
            }
        `).join('\n');

        const query = `
            query($username: String!) {
                user(login: $username) {
                    ${repositoryQueries}
                }
            }
        `;

        try {
            const response = await axios.post(
                this.baseURL,
                {
                    query,
                    variables: { username }
                },
                {
                    headers: {
                        'Authorization': `Bearer ${this.token}`,
                        'Content-Type': 'application/json',
                    }
                }
            );
            console.log('GitHub API response for specific repositories:', response);

            if (response.data.errors) {
                throw new Error(response.data.errors[0].message);
            }

            // Extract repositories from the response
            const userData = response.data.data.user;
            const repositories = [];

            repositoryNames.forEach((_, index) => {
                const repo = userData[`repo${index}`];
                if (repo && !repo.isPrivate) { // Only include public repositories
                    repositories.push(repo);
                }
            });

            return this.transformRepositoryData(repositories);
        } catch (error) {
            console.error('Error fetching specific repositories:', error);
            throw error;
        }
    }

    async fetchFeaturedRepositories(username, repositoryNames, fallbackToRecent = true) {
        try {
            // First, try to fetch specific repositories
            const specificRepos = await this.fetchSpecificRepositories(username, repositoryNames);

            // If we got some repositories but not enough, and fallback is enabled
            if (specificRepos.length < repositoryNames.length && fallbackToRecent) {
                const missingCount = repositoryNames.length - specificRepos.length;
                console.log(`Found ${specificRepos.length} specific repositories, fetching ${missingCount} recent repositories as fallback`);

                // Fetch recent repositories to fill the gap
                const recentRepos = await this.fetchRepositories(username, missingCount);

                // Filter out any repositories that we already have
                const existingRepoNames = specificRepos.map(repo => repo.title.replace(/\s+/g, '-').toLowerCase());
                const additionalRepos = recentRepos.filter(repo =>
                    !existingRepoNames.includes(repo.title.replace(/\s+/g, '-').toLowerCase())
                );

                return [...specificRepos, ...additionalRepos.slice(0, missingCount)];
            }

            return specificRepos;
        } catch (error) {
            if (fallbackToRecent) {
                console.warn('Failed to fetch specific repositories, falling back to recent repositories:', error);
                return await this.fetchRepositories(username, repositoryNames.length);
            }
            throw error;
        }
    }
}

export default new GitHubService();