const fs = require('fs');

function generateSummary(data, year) {
    const user = data.data.user;
    const stats = user.contributionsCollection;
    const calendar = stats.contributionCalendar;

    let summary = [];
    summary.push(`# GitHub Activity Report ${year}`);
    summary.push(`## User: ${user.name} (@${user.login})`);
    if (user.bio) {
        summary.push(`> ${user.bio}`);
    }
    summary.push("");

    summary.push("### 📊 Annual Statistics");
    summary.push(`- **Total Contributions:** ${calendar.totalContributions}`);
    summary.push(`- **Commits:** ${stats.totalCommitContributions}`);
    summary.push(`- **Pull Requests:** ${stats.totalPullRequestContributions}`);
    summary.push(`- **Issues:** ${stats.totalIssueContributions}`);
    summary.push(`- **Code Reviews:** ${stats.totalPullRequestReviewContributions}`);
    summary.push("");

    summary.push("### 🏆 Top Repositories (by Commits)");
    let repos = stats.commitContributionsByRepository;
    repos.sort((a, b) => b.contributions.totalCount - a.contributions.totalCount);

    repos.slice(0, 10).forEach(item => {
        const repo = item.repository;
        const count = item.contributions.totalCount;
        const lang = repo.primaryLanguage ? repo.primaryLanguage.name : "Unknown";
        summary.push(`- **[${repo.name}](${repo.url})** (${count} commits)`);
        summary.push(`  - *${repo.description || 'No description'}*`);
        summary.push(`  - Language: ${lang} | ⭐ ${repo.stargazerCount}`);
    });

    summary.push("");
    summary.push("### 📅 Monthly Contribution Trend");
    summary.push("| Month | Contributions |");
    summary.push("| :--- | :--- |");

    const months = {};
    calendar.weeks.forEach(week => {
        week.contributionDays.forEach(day => {
            const monthStr = day.date.substring(0, 7); // YYYY-MM
            months[monthStr] = (months[monthStr] || 0) + day.contributionCount;
        });
    });

    Object.keys(months).sort().forEach(month => {
        summary.push(`| ${month} | ${months[month]} |`);
    });

    summary.push("");
    summary.push("---");
    summary.push(`Generated on ${new Date().toISOString().replace('T', ' ').substring(0, 19)}`);

    return summary.join("\n");
}

function main() {
    const year = process.env.YEAR || "2025";
    const inputFile = "activity_data.json";

    if (!fs.existsSync(inputFile)) {
        console.error(`Error: ${inputFile} not found. Run node --env-file=.env fetch_activity.js first.`);
        return;
    }

    console.log(`Generating summary from ${inputFile}...`);
    const data = JSON.parse(fs.readFileSync(inputFile, "utf-8"));
    const summaryMd = generateSummary(data, year);

    const outputFile = `summary_${year}.md`;
    fs.writeFileSync(outputFile, summaryMd, "utf-8");
    console.log(`Summary generated: ${outputFile}`);
}

main();
