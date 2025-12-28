const fs = require('fs');

const { GITHUB_USER_NAME, GITHUB_YEAR } = require('./config');

async function fetchActivity() {
    const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
    const USER_NAME = GITHUB_USER_NAME;
    const YEAR = GITHUB_YEAR;

    if (!GITHUB_TOKEN) {
        console.error("Error: GITHUB_TOKEN not found in environment.");
        process.exit(1);
    }

    const from_date = `${YEAR}-01-01T00:00:00Z`;
    const to_date = `${YEAR}-12-31T23:59:59Z`;

    const query = `
    query($userName:String!, $from:DateTime!, $to:DateTime!) {
      user(login: $userName) {
        name
        login
        bio
        avatarUrl
        contributionsCollection(from: $from, to: $to) {
          totalCommitContributions
          totalPullRequestContributions
          totalIssueContributions
          totalPullRequestReviewContributions
          contributionCalendar {
            totalContributions
            weeks {
              contributionDays {
                contributionCount
                date
              }
            }
          }
          commitContributionsByRepository(maxRepositories: 100) {
            repository {
              name
              owner { login }
              url
              description
              stargazerCount
              primaryLanguage { name }
            }
            contributions {
              totalCount
            }
          }
          pullRequestContributionsByRepository(maxRepositories: 100) {
            repository {
              name
              url
            }
            contributions {
              totalCount
            }
          }
        }
      }
    }
    `;

    const variables = {
        userName: USER_NAME,
        from: from_date,
        to: to_date
    };

    console.log(`Fetching activity for ${USER_NAME} in ${YEAR}...`);

    try {
        const response = await fetch("https://api.github.com/graphql", {
            method: "POST",
            headers: {
                "Authorization": `bearer ${GITHUB_TOKEN}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ query, variables })
        });

        const data = await response.json();

        if (data.errors) {
            console.error("GraphQL Errors:", JSON.stringify(data.errors, null, 2));
            return;
        }

        fs.writeFileSync("activity_data.json", JSON.stringify(data, null, 2), "utf-8");
        console.log("Data saved to activity_data.json");
    } catch (error) {
        console.error("An error occurred:", error);
    }
}

fetchActivity();
