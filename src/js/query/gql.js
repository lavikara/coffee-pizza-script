export default {
  repoQuery: () => `{
    user(login: "lavikara") {
      avatarUrl
      company
      location
      login
      name
      twitterUsername
      websiteUrl
      bio
      starredRepositories(last: 20) {
        totalCount
      }
      followers(first: 20) {
        totalCount
      }
      following(first: 20) {
        totalCount
      }
      topRepositories(last: 20, orderBy: {field: UPDATED_AT, direction: ASC}) {
        nodes {
          forkCount
          isPrivate
          name
          primaryLanguage {
            color
            name
          }
          updatedAt
          stargazerCount
          pullRequests(last: 20) {
            totalCount
          }
        }
        totalCount
      }
    }
  }
  `,
};
