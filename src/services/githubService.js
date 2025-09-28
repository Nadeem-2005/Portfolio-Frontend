// services/githubService.js
import axios from 'axios';

// Get token from Vite environment variables
const GITHUB_TOKEN = import.meta.env.VITE_GITHUB_TOKEN;

// Enhanced logging utility
const logger = {
    error: (message, data = null) => {
        console.error(`[GitHubService] ${message}`, data ? { data } : '');
    },
    warn: (message, data = null) => {
        console.warn(`[GitHubService] ${message}`, data ? { data } : '');
    },
    info: (message, data = null) => {
        console.log(`[GitHubService] ${message}`, data ? { data } : '');
    },
    debug: (message, data = null) => {
        console.debug(`[GitHubService] ${message}`, data ? { data } : '');
    }
};

// Validate GitHub token
const validateToken = () => {
    if (!GITHUB_TOKEN) {
        const error = 'GitHub token not found. Please add VITE_GITHUB_TOKEN to your .env file';
        logger.error(error);
        throw new Error(error);
    }

    if (!GITHUB_TOKEN.startsWith('ghp_') && !GITHUB_TOKEN.startsWith('github_pat_')) {
        logger.warn('GitHub token format might be invalid. Expected format: ghp_* or github_pat_*');
    }

    logger.info('GitHub token found and validated');
};

// Retry utility with exponential backoff
const retryWithBackoff = async (operation, maxRetries = 3, baseDelay = 1000) => {
    let lastError;

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
            logger.debug(`Attempt ${attempt}/${maxRetries} for operation`);
            const result = await operation();
            if (attempt > 1) {
                logger.info(`Operation succeeded on attempt ${attempt}`);
            }
            return result;
        } catch (error) {
            lastError = error;
            logger.warn(`Attempt ${attempt}/${maxRetries} failed:`, error.message);

            // Don't retry on certain errors
            if (error.message.includes('token is invalid') ||
                error.message.includes('Access forbidden') ||
                error.message.includes('not found') ||
                attempt === maxRetries) {
                break;
            }

            // Wait before next attempt (exponential backoff)
            if (attempt < maxRetries) {
                const delay = baseDelay * Math.pow(2, attempt - 1) + Math.random() * 1000;
                logger.debug(`Waiting ${delay.toFixed(0)}ms before retry...`);
                await new Promise(resolve => setTimeout(resolve, delay));
            }
        }
    }

    throw lastError;
};

// Rate limit aware request wrapper
const makeGraphQLRequest = async (query, variables = null) => {
    return retryWithBackoff(async () => {
        const requestData = variables ? { query, variables } : { query };
        return await githubClient.post('', requestData);
    });
};

// Validate token on service initialization
try {
    validateToken();
} catch (error) {
    logger.error('Service initialization failed:', error.message);
}

// Create axios instance with enhanced error handling
const githubClient = axios.create({
    baseURL: 'https://api.github.com/graphql',
    headers: {
        'Authorization': `Bearer ${GITHUB_TOKEN}`,
        'Content-Type': 'application/json',
        'Accept': 'application/vnd.github.v4+json',
        'User-Agent': 'Portfolio-App/1.0'
    },
    timeout: 15000, // Increased timeout
});

// Add request interceptor for logging
githubClient.interceptors.request.use(
    (config) => {
        logger.debug('Making GitHub API request', {
            url: config.url,
            method: config.method,
            timeout: config.timeout
        });
        return config;
    },
    (error) => {
        logger.error('Request interceptor error:', error.message);
        return Promise.reject(error);
    }
);

// Add response interceptor for error handling
githubClient.interceptors.response.use(
    (response) => {
        logger.debug('GitHub API response received', {
            status: response.status,
            hasData: !!response.data
        });
        return response;
    },
    (error) => {
        if (error.response) {
            // Server responded with error status
            const { status, data } = error.response;
            logger.error(`GitHub API error (${status}):`, {
                status,
                message: data?.message || 'Unknown error',
                errors: data?.errors || [],
                documentation_url: data?.documentation_url
            });

            // Handle specific GitHub API errors
            if (status === 401) {
                throw new Error('GitHub token is invalid or expired. Please check your VITE_GITHUB_TOKEN.');
            } else if (status === 403) {
                const rateLimitRemaining = error.response.headers['x-ratelimit-remaining'];
                const rateLimitReset = error.response.headers['x-ratelimit-reset'];
                const rateLimitUsed = error.response.headers['x-ratelimit-used'];
                const rateLimitLimit = error.response.headers['x-ratelimit-limit'];

                logger.error('Rate limit info:', {
                    remaining: rateLimitRemaining,
                    used: rateLimitUsed,
                    limit: rateLimitLimit,
                    reset: rateLimitReset
                });

                if (rateLimitRemaining === '0' || parseInt(rateLimitRemaining) === 0) {
                    const resetTime = new Date(parseInt(rateLimitReset) * 1000);
                    const waitTime = Math.max(0, resetTime.getTime() - Date.now());
                    throw new Error(`GitHub API rate limit exceeded. ${waitTime > 0 ? `Resets in ${Math.ceil(waitTime / 60000)} minutes` : 'Try again now'}.`);
                }
                throw new Error('Access forbidden. Check your GitHub token permissions.');
            } else if (status === 404) {
                throw new Error('Repository or user not found. Check your GitHub username and repository names.');
            } else if (status >= 500) {
                throw new Error(`GitHub API server error (${status}). Please try again later.`);
            } else if (status === 422) {
                throw new Error('Invalid request. Check your query parameters.');
            }
        } else if (error.request) {
            // Network error
            logger.error('Network error:', error.message);
            throw new Error('Network error: Unable to connect to GitHub API. Check your internet connection.');
        } else {
            // Other error
            logger.error('Unexpected error:', error.message);
            throw new Error(`Unexpected error: ${error.message}`);
        }

        return Promise.reject(error);
    }
);

// Helper function to format repository name
const formatRepoName = (name) => {
    if (!name || typeof name !== 'string') {
        logger.warn('Invalid repository name provided to formatRepoName:', name);
        return 'Untitled Project';
    }

    try {
        return name
            .replace(/[-_]/g, ' ')
            .split(' ')
            .map(word => {
                if (!word || word.length === 0) return '';
                return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
            })
            .filter(word => word.length > 0)
            .join(' ') || 'Untitled Project';
    } catch (error) {
        logger.error('Error formatting repository name:', error.message);
        return name; // Return original name as fallback
    }
};

// Helper function to extract tech stack
const extractTechStack = (repo) => {
    if (!repo || typeof repo !== 'object') {
        logger.warn('Invalid repository object provided to extractTechStack');
        return [];
    }

    const techStack = [];

    try {
        // Add primary language
        if (repo.primaryLanguage?.name && typeof repo.primaryLanguage.name === 'string') {
            techStack.push(repo.primaryLanguage.name);
        }

        // Add other languages (limit to 3, exclude primary)
        if (repo.languages?.nodes && Array.isArray(repo.languages.nodes)) {
            const otherLanguages = repo.languages.nodes
                .filter(lang => {
                    return lang?.name &&
                           typeof lang.name === 'string' &&
                           lang.name !== repo.primaryLanguage?.name;
                })
                .slice(0, 3)
                .map(lang => lang.name);

            techStack.push(...otherLanguages);
        }
    
    // Add tech-related topics (handle both topics and repositoryTopics)
    const topicsSource = repo.repositoryTopics?.nodes || repo.topics?.nodes || [];
    const techTopics = topicsSource
        .map(node => node.topic?.name)
        .filter(topic => {
            if (!topic || typeof topic !== 'string') return false;
            const techKeywords = ['react', 'node', 'express', 'mongodb', 'firebase',
                                 'nextjs', 'tailwind', 'typescript', 'javascript',
                                 'python', 'django', 'flask', 'postgresql', 'mysql',
                                 'docker', 'aws', 'api', 'graphql', 'redux', 'vite',
                                 'vue', 'angular', 'svelte', 'css', 'html', 'sass',
                                 'bootstrap', 'webpack', 'rollup', 'jest', 'cypress'];
            return techKeywords.some(keyword => topic.toLowerCase().includes(keyword));
        }) || [];
    
        techStack.push(...techTopics);

        // Remove duplicates and ensure all items are strings
        const uniqueTechStack = [...new Set(techStack)]
            .filter(tech => tech && typeof tech === 'string' && tech.trim().length > 0)
            .map(tech => tech.trim());

        logger.debug(`Extracted tech stack for ${repo.name}:`, uniqueTechStack);
        return uniqueTechStack;
    } catch (error) {
        logger.error(`Error extracting tech stack for ${repo.name}:`, error.message);
        return [];
    }
};

// Helper function to generate placeholder image
const generatePlaceholderImage = (repoName) => {
    if (!repoName || typeof repoName !== 'string') {
        logger.warn('Invalid repository name for placeholder image:', repoName);
        repoName = 'Project';
    }

    try {
        // Clean and encode the name
        const cleanName = repoName.replace(/[^a-zA-Z0-9\s-_]/g, '').trim() || 'Project';
        const encodedName = encodeURIComponent(cleanName);
        return `https://ui-avatars.com/api/?name=${encodedName}&size=400&background=0ea5e9&color=fff&bold=true&format=png`;
    } catch (error) {
        logger.error('Error generating placeholder image:', error.message);
        return 'https://ui-avatars.com/api/?name=Project&size=400&background=0ea5e9&color=fff&bold=true&format=png';
    }
};

// Format repository data for ProjectCard
const formatRepository = (repo) => {
    if (!repo || typeof repo !== 'object') {
        logger.warn('Invalid repository object provided to formatRepository');
        return null;
    }

    // Validate required fields
    if (!repo.id || !repo.name || !repo.url) {
        logger.warn('Repository missing required fields (id, name, or url):', {
            id: repo.id,
            name: repo.name,
            url: repo.url
        });
        return null;
    }

    try {
        // Safely extract topics from either structure
        const topicsSource = repo.repositoryTopics?.nodes || repo.topics?.nodes || [];
        const topics = topicsSource
            .map(node => node?.topic?.name)
            .filter(name => name && typeof name === 'string');

        // Generate safe description
        const description = (repo.description && repo.description.trim().length > 0)
            ? repo.description.trim()
            : 'A project showcasing modern development practices and clean code architecture.';

        // Safely handle homepage URL
        const liveUrl = repo.homepageUrl && repo.homepageUrl.trim().length > 0
            ? repo.homepageUrl.trim()
            : null;

        // Generate image URL with fallback
        const imageUrl = repo.openGraphImageUrl && repo.openGraphImageUrl.trim().length > 0
            ? repo.openGraphImageUrl.trim()
            : generatePlaceholderImage(repo.name);

        const formatted = {
            id: repo.id,
            name: repo.name,
            title: formatRepoName(repo.name),
            description,
            url: repo.url,
            githubUrl: repo.url,
            liveUrl,
            imageUrl,
            imageAlt: `${repo.name} project screenshot`,
            techStack: extractTechStack(repo),
            stargazerCount: parseInt(repo.stargazerCount) || 0,
            forkCount: parseInt(repo.forkCount) || 0,
            updatedAt: repo.updatedAt,
            createdAt: repo.createdAt,
            topics,
            // Additional metadata
            isPrivate: Boolean(repo.isPrivate),
            isFork: Boolean(repo.isFork),
            owner: repo.owner?.login || 'unknown',
            defaultBranch: repo.defaultBranchRef?.name || 'main'
        };

        logger.debug(`Formatted repository: ${repo.name}`, {
            techStackCount: formatted.techStack.length,
            topicsCount: formatted.topics.length,
            hasLiveUrl: !!formatted.liveUrl,
            hasImage: !!repo.openGraphImageUrl
        });

        return formatted;
    } catch (error) {
        logger.error(`Error formatting repository ${repo.name}:`, error.message);
        return null;
    }
};

// Fetch featured repositories (specific repos by name)
const fetchFeaturedRepositories = async (username, repoNames, fallbackToRecent = true) => {
    logger.info('Fetching featured repositories', { username, repoNames, fallbackToRecent });

    // Validate inputs
    if (!username || typeof username !== 'string') {
        throw new Error('Invalid username provided');
    }

    if (!Array.isArray(repoNames) || repoNames.length === 0) {
        throw new Error('Invalid repository names provided');
    }

    validateToken();

    try {
        // Create queries for each repository
        const repoQueries = repoNames.map((name, index) => `
            repo${index}: repository(owner: "${username}", name: "${name}") {
                ...RepoFields
            }
        `).join('\n');

        const query = `
            query GetSpecificRepos {
                ${repoQueries}
            }

            fragment RepoFields on Repository {
                id
                name
                description
                url
                homepageUrl
                createdAt
                updatedAt
                primaryLanguage {
                    name
                    color
                }
                languages(first: 5, orderBy: {field: SIZE, direction: DESC}) {
                    nodes {
                        name
                        color
                    }
                    totalSize
                    totalCount
                }
                stargazerCount
                forkCount
                isPrivate
                isFork
                openGraphImageUrl
                repositoryTopics(first: 10) {
                    nodes {
                        topic {
                            name
                        }
                    }
                }
                owner {
                    login
                    avatarUrl
                }
                defaultBranchRef {
                    name
                }
            }
        `;

        logger.debug('Generated GraphQL query for featured repositories:', { query: query.replace(/\s+/g, ' ').trim() });

        const response = await makeGraphQLRequest(query);

        // Handle GraphQL errors
        if (response.data.errors) {
            const errors = response.data.errors;
            logger.error('GraphQL Errors:', errors);

            // Create detailed error message
            const errorMessages = errors.map(err => {
                if (err.type === 'NOT_FOUND') {
                    return `Repository not found: ${err.path?.join('.')}`;
                }
                return err.message;
            }).join('; ');

            if (fallbackToRecent) {
                logger.warn('Falling back to recent repositories due to GraphQL errors');
                return await fetchRepositories(username, repoNames.length);
            }

            throw new Error(`GraphQL Error: ${errorMessages}`);
        }

        // Validate response structure
        if (!response.data?.data) {
            logger.error('Invalid response structure:', response.data);
            throw new Error('Invalid response from GitHub API');
        }

        // Extract and format repositories
        const rawRepos = Object.values(response.data.data).filter(repo => repo !== null);
        logger.info(`Found ${rawRepos.length} repositories out of ${repoNames.length} requested`);

        const repositories = rawRepos
            .map((repo, index) => {
                try {
                    return formatRepository(repo);
                } catch (formatError) {
                    logger.error(`Error formatting repository ${repo?.name || index}:`, formatError.message);
                    return null;
                }
            })
            .filter(repo => repo !== null);

        logger.info(`Successfully formatted ${repositories.length} repositories`);

        // If we didn't get enough repos and fallback is enabled
        if (repositories.length < repoNames.length && fallbackToRecent) {
            logger.info(`Only found ${repositories.length}/${repoNames.length} repositories, fetching additional from recent`);
            try {
                const additionalRepos = await fetchRepositories(
                    username,
                    repoNames.length - repositories.length
                );
                const combined = [...repositories, ...additionalRepos].slice(0, repoNames.length);
                logger.info(`Combined total: ${combined.length} repositories`);
                return combined;
            } catch (fallbackError) {
                logger.error('Fallback fetch failed:', fallbackError.message);
                return repositories; // Return what we have
            }
        }

        return repositories;
    } catch (error) {
        logger.error('Error fetching featured repositories:', {
            message: error.message,
            username,
            repoNames,
            stack: error.stack
        });

        if (fallbackToRecent) {
            logger.info('Attempting fallback to recent repositories...');
            try {
                const fallbackRepos = await fetchRepositories(username, repoNames.length);
                logger.info(`Fallback successful: ${fallbackRepos.length} repositories retrieved`);
                return fallbackRepos;
            } catch (fallbackError) {
                logger.error('Fallback also failed:', fallbackError.message);
                throw new Error(`Both featured and fallback repository fetching failed: ${error.message}`);
            }
        }

        throw error;
    }
};

// Fetch recent repositories (fallback method)
const fetchRepositories = async (username, count = 6) => {
    logger.info('Fetching recent repositories', { username, count });

    // Validate inputs
    if (!username || typeof username !== 'string') {
        throw new Error('Invalid username provided');
    }

    if (count <= 0 || count > 100) {
        throw new Error('Count must be between 1 and 100');
    }

    validateToken();

    const query = `
        query GetRecentRepos($username: String!, $first: Int!) {
            user(login: $username) {
                login
                name
                avatarUrl
                repositories(
                    first: $first
                    orderBy: { field: UPDATED_AT, direction: DESC }
                    privacy: PUBLIC
                    ownerAffiliations: [OWNER]
                ) {
                    totalCount
                    nodes {
                        id
                        name
                        description
                        url
                        homepageUrl
                        createdAt
                        updatedAt
                        primaryLanguage {
                            name
                            color
                        }
                        languages(first: 5, orderBy: {field: SIZE, direction: DESC}) {
                            nodes {
                                name
                                color
                            }
                            totalSize
                            totalCount
                        }
                        stargazerCount
                        forkCount
                        isPrivate
                        isFork
                        openGraphImageUrl
                        repositoryTopics(first: 10) {
                            nodes {
                                topic {
                                    name
                                }
                            }
                        }
                        owner {
                            login
                            avatarUrl
                        }
                        defaultBranchRef {
                            name
                        }
                    }
                }
            }
        }
    `;

    logger.debug('Generated GraphQL query for recent repositories:', {
        username,
        count,
        query: query.replace(/\s+/g, ' ').trim()
    });

    try {
        const response = await makeGraphQLRequest(query, {
            username,
            first: count * 2 // Fetch extra to filter
        });

        if (response.data.errors) {
            const errors = response.data.errors;
            logger.error('GraphQL Errors in fetchRepositories:', errors);
            throw new Error(`GraphQL Error: ${errors.map(e => e.message).join('; ')}`);
        }

        // Validate response structure
        if (!response.data?.data?.user?.repositories?.nodes) {
            logger.error('Invalid response structure for user repositories:', response.data);
            throw new Error('Invalid response structure from GitHub API');
        }

        const repos = response.data.data.user.repositories.nodes;
        logger.info(`Retrieved ${repos.length} raw repositories for user ${username}`);

        // Format and filter repositories
        const filteredRepos = repos.filter(repo => {
            if (!repo) return false;
            if (repo.isFork) {
                logger.debug(`Excluding fork: ${repo.name}`);
                return false;
            }
            if (!repo.description || repo.description.trim().length === 0) {
                logger.debug(`Excluding repo without description: ${repo.name}`);
                return false;
            }
            return true;
        });

        logger.info(`Filtered to ${filteredRepos.length} repositories (excluded forks and repos without descriptions)`);

        const formattedRepos = filteredRepos
            .slice(0, count)
            .map((repo, index) => {
                try {
                    return formatRepository(repo);
                } catch (formatError) {
                    logger.error(`Error formatting repository ${repo?.name || index}:`, formatError.message);
                    return null;
                }
            })
            .filter(repo => repo !== null);

        logger.info(`Successfully formatted ${formattedRepos.length} repositories`);
        return formattedRepos;
    } catch (error) {
        logger.error('Error fetching recent repositories:', {
            message: error.message,
            username,
            count,
            stack: error.stack
        });
        throw error;
    }
};

// Environment and configuration validation
const validateEnvironment = () => {
    const issues = [];

    // Check token
    if (!GITHUB_TOKEN) {
        issues.push('GitHub token not found. Please add VITE_GITHUB_TOKEN to your .env file');
    } else if (!GITHUB_TOKEN.startsWith('ghp_') && !GITHUB_TOKEN.startsWith('github_pat_')) {
        issues.push('GitHub token format might be invalid. Expected format: ghp_* or github_pat_*');
    }

    // Check if we're in development and warn about token exposure
    if (import.meta.env.DEV && GITHUB_TOKEN) {
        logger.info('Development mode: GitHub token loaded successfully');
    }

    if (issues.length > 0) {
        const errorMessage = `GitHub service configuration issues: ${issues.join('; ')}`;
        logger.error(errorMessage);
        throw new Error(errorMessage);
    }

    logger.info('GitHub service environment validation passed');
    return true;
};

// Test GitHub API connectivity
const testConnection = async () => {
    try {
        logger.info('Testing GitHub API connectivity...');
        const query = `
            query TestConnection {
                viewer {
                    login
                    name
                    avatarUrl
                }
                rateLimit {
                    limit
                    remaining
                    resetAt
                    used
                }
            }
        `;

        const response = await makeGraphQLRequest(query);

        if (response.data.errors) {
            throw new Error(response.data.errors[0].message);
        }

        const { viewer, rateLimit } = response.data.data;
        logger.info('GitHub API connection successful', {
            user: viewer.login,
            name: viewer.name,
            rateLimit: {
                remaining: rateLimit.remaining,
                limit: rateLimit.limit,
                used: rateLimit.used
            }
        });

        return {
            success: true,
            user: viewer,
            rateLimit
        };
    } catch (error) {
        logger.error('GitHub API connection test failed:', error.message);
        return {
            success: false,
            error: error.message
        };
    }
};

// Export the service object matching your Projects.jsx imports
export default {
    fetchFeaturedRepositories,
    fetchRepositories,
    validateEnvironment,
    testConnection
};