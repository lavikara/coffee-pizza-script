import query from "./query/gql";
import dateFormater from "./utils/date";

// Topnav interactivity
const topNavSvgHover = document
  .getElementById("top-nav")
  .querySelectorAll(".top-nav-svg");

topNavSvgHover.forEach((li) => {
  li.addEventListener(
    "mouseenter",
    (event) => {
      event.target.style.color = "#b4b4b4";
      event.target.style.fill = "#b4b4b4";
      event.target.firstElementChild.style.fill = "#b4b4b4";
    },
    false
  );
});

topNavSvgHover.forEach((li) => {
  li.addEventListener(
    "mouseleave",
    (event) => {
      event.target.style.color = "#ffffff";
      event.target.style.fill = "#ffffff";
      event.target.firstElementChild.style.fill = "#ffffff";
    },
    false
  );
});
// ---------------------------------------------------

// Subnav interactivity
const subNavLinks = document.getElementById("links").querySelectorAll("a");
const subNavLinksSvg = document.getElementById("links").querySelectorAll("svg");

const activeTab = (event) => {
  subNavLinks.forEach((a) => {
    a.classList.remove("active");
  });

  subNavLinksSvg.forEach((svg) => {
    svg.style.fill = "#6e7d8f";
  });

  if (event.target.localName === "svg") {
    event.path[1].classList.add("active");
    event.path[0].style.fill = "#4b4b4b";
  } else if (event.target.localName === "path") {
    event.path[2].classList.add("active");
    event.path[1].style.fill = "#4b4b4b";
  } else {
    event.target.classList.add("active");
    event.target.children[0].style.fill = "#4b4b4b";
  }
};

subNavLinks.forEach((a) => {
  a.addEventListener("click", activeTab);
});
// ---------------------------------------------------------

// Display sub nav profile img and user name on scroll using intersection observer
const profileDetailsContainer = document.getElementById(
  "profile-details-container"
);

const subNavLeftSide = document
  .getElementById("sub-nav-left-side")
  .querySelectorAll(".profile-info");

const observerFunction = (entries) => {
  if (entries[0].isIntersecting === false) {
    subNavLeftSide[0].style.opacity = "1";
    subNavLeftSide[1].style.opacity = "1";
    profileDetailsContainer.style.opacity = 0;
  } else {
    profileDetailsContainer.style.opacity = 1;
    subNavLeftSide[0].style.opacity = 0;
    subNavLeftSide[1].style.opacity = 0;
  }
};

const observer = new IntersectionObserver(observerFunction, { threshold: 0.3 });
observer.observe(profileDetailsContainer);
// ------------------------------------------------------------

// Dom render function for repository page
const renderRepos = ({ data }) => {
  const renderTotalRepo = document.getElementById("render-total-repos");
  renderTotalRepo.textContent = data.user.topRepositories.totalCount;

  const profileImg = document.getElementById("render-profile-img");
  profileImg.src = data.user.avatarUrl;

  const profileImg2 = document.getElementById("render-profile-img2");
  profileImg2.src = data.user.avatarUrl;

  const profileImg3 = document.getElementById("render-profile-img3");
  profileImg3.src = data.user.avatarUrl;

  const renderName = document.getElementById("render-name");
  renderName.textContent = data.user.name;

  const renderUserName = document.getElementById("render-user-name");
  renderUserName.textContent = data.user.login;

  const renderUserName2 = document.getElementById("render-user-name2");
  renderUserName2.textContent = data.user.login;

  const bio = document.getElementById("render-bio");
  bio.textContent = data.user.bio;

  const followers = document.getElementById("render-followers");
  followers.textContent = data.user.followers.totalCount;

  const following = document.getElementById("render-following");
  following.textContent = data.user.following.totalCount;

  const stared = document.getElementById("render-stared");
  stared.textContent = data.user.starredRepositories.totalCount;

  const companyName = document.getElementById("render-company-name");
  companyName.textContent = data.user.company;

  const location = document.getElementById("render-location");
  location.textContent = data.user.location;

  const website = document.getElementById("render-website");
  website.textContent = data.user.websiteUrl;

  const twitterName = document.getElementById("render-twitter-name");
  twitterName.textContent = data.user.twitterUsername;

  const repos = data.user.topRepositories.nodes;

  const render = (repo) => {
    repo.updatedAt = dateFormater.formatDate(repo.updatedAt);

    // Create elements needed to build repo card
    const repoContainer = document.createElement("div");
    const repoDetails = document.createElement("div");
    const repoName = document.createElement("div");
    const name = document.createElement("h2");
    const isPrivate = document.createElement("span");
    const otherInfo = document.createElement("div");
    const lang = document.createElement("div");
    const dot = document.createElement("span");
    const langName = document.createElement("h3");
    const starBtn = document.createElement("button");
    const starSvg = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "svg"
    );
    const starSvgPath = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "path"
    );
    const btnText = document.createElement("p");
    const stargazer = document.createElement("div");
    const stargazerSvg = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "svg"
    );
    const stargazerSvgPath = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "path"
    );
    const stargazerCount = document.createElement("p");
    const fork = document.createElement("div");
    const forkSvg = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "svg"
    );
    const forkSvgPath = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "path"
    );
    const forkCount = document.createElement("p");
    const pr = document.createElement("div");
    const prSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    const prSvgPath = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "path"
    );
    const prCount = document.createElement("p");
    const updateInfo = document.createElement("h3");
    // -----------------------------------------------------------

    // Append newly created repo elements into the DOM
    const detailsColumn = document.getElementById("details-column");
    detailsColumn.append(repoContainer);
    repoContainer.append(repoDetails);
    repoDetails.append(repoName);
    repoName.append(name);
    repoName.append(isPrivate);
    repoDetails.append(otherInfo);
    otherInfo.append(lang);
    lang.append(dot);
    lang.append(langName);
    repoContainer.append(starBtn);
    starBtn.append(starSvg);
    starSvg.append(starSvgPath);
    starBtn.append(btnText);
    otherInfo.append(stargazer);
    stargazer.append(stargazerSvg);
    stargazerSvg.append(stargazerSvgPath);
    stargazer.append(stargazerCount);
    otherInfo.append(fork);
    fork.append(forkSvg);
    forkSvg.append(forkSvgPath);
    fork.append(forkCount);
    otherInfo.append(pr);
    pr.append(prSvg);
    prSvg.append(prSvgPath);
    pr.append(prCount);
    otherInfo.append(updateInfo);
    // ----------------------------------------------------------------

    // Set content and attributes of repo elements
    name.textContent = repo.name;
    if (repo.isPrivate === true) {
      isPrivate.textContent = "Private";
    } else {
      isPrivate.remove();
    }

    if (repo.stargazerCount === 0) {
      stargazer.remove();
    } else {
      stargazerCount.textContent = repo.stargazerCount;
    }

    if (repo.forkCount === 0) {
      fork.remove();
    } else {
      forkCount.textContent = repo.forkCount;
    }

    if (repo.pullRequests.totalCount === 0) {
      pr.remove();
    } else {
      prCount.textContent = repo.pullRequests.totalCount;
    }

    if (repo.primaryLanguage === null) {
      lang.remove();
    } else {
      langName.textContent = repo.primaryLanguage.name;
      dot.style.backgroundColor = repo.primaryLanguage.color;
    }

    updateInfo.textContent = `Updated on ${repo.updatedAt}`;
    btnText.textContent = "Star";
    repoContainer.setAttribute("class", "repo-container");
    repoDetails.setAttribute("class", "repo-details");
    repoName.setAttribute("class", "repo-name");
    otherInfo.setAttribute("class", "other-info");
    lang.setAttribute("class", "lang");
    starBtn.setAttribute("class", "star-btn");
    starSvg.setAttribute("aria-hidden", "true");
    starSvg.setAttribute("viewbox", "0 0 16 16");
    starSvg.setAttribute("width", "16");
    starSvg.setAttribute("height", "16");
    starSvg.setAttribute("fill", "#6a737d");
    starSvgPath.setAttribute(
      "d",
      "M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25zm0 2.445L6.615 5.5a.75.75 0 01-.564.41l-3.097.45 2.24 2.184a.75.75 0 01.216.664l-.528 3.084 2.769-1.456a.75.75 0 01.698 0l2.77 1.456-.53-3.084a.75.75 0 01.216-.664l2.24-2.183-3.096-.45a.75.75 0 01-.564-.41L8 2.694v.001z"
    );
    stargazer.setAttribute("class", "stargazer");
    stargazerSvg.setAttribute("aria-hidden", "true");
    stargazerSvg.setAttribute("viewbox", "0 0 16 16");
    stargazerSvg.setAttribute("width", "16");
    stargazerSvg.setAttribute("height", "16");
    stargazerSvg.setAttribute("fill", "#6a737d");
    stargazerSvgPath.setAttribute(
      "d",
      "M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25zm0 2.445L6.615 5.5a.75.75 0 01-.564.41l-3.097.45 2.24 2.184a.75.75 0 01.216.664l-.528 3.084 2.769-1.456a.75.75 0 01.698 0l2.77 1.456-.53-3.084a.75.75 0 01.216-.664l2.24-2.183-3.096-.45a.75.75 0 01-.564-.41L8 2.694v.001z"
    );
    fork.setAttribute("class", "fork");
    forkSvg.setAttribute("aria-hidden", "true");
    forkSvg.setAttribute("viewbox", "0 0 16 16");
    forkSvg.setAttribute("width", "16");
    forkSvg.setAttribute("height", "16");
    forkSvg.setAttribute("fill", "#6a737d");
    forkSvgPath.setAttribute(
      "d",
      "M5 3.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm0 2.122a2.25 2.25 0 10-1.5 0v.878A2.25 2.25 0 005.75 8.5h1.5v2.128a2.251 2.251 0 101.5 0V8.5h1.5a2.25 2.25 0 002.25-2.25v-.878a2.25 2.25 0 10-1.5 0v.878a.75.75 0 01-.75.75h-4.5A.75.75 0 015 6.25v-.878zm3.75 7.378a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm3-8.75a.75.75 0 100-1.5.75.75 0 000 1.5z"
    );
    pr.setAttribute("class", "pull-request");
    prSvg.setAttribute("aria-hidden", "true");
    prSvg.setAttribute("viewbox", "0 0 16 16");
    prSvg.setAttribute("width", "16");
    prSvg.setAttribute("height", "16");
    prSvg.setAttribute("fill", "#6a737d");
    prSvgPath.setAttribute(
      "d",
      "M7.177 3.073L9.573.677A.25.25 0 0110 .854v4.792a.25.25 0 01-.427.177L7.177 3.427a.25.25 0 010-.354zM3.75 2.5a.75.75 0 100 1.5.75.75 0 000-1.5zm-2.25.75a2.25 2.25 0 113 2.122v5.256a2.251 2.251 0 11-1.5 0V5.372A2.25 2.25 0 011.5 3.25zM11 2.5h-1V4h1a1 1 0 011 1v5.628a2.251 2.251 0 101.5 0V5A2.5 2.5 0 0011 2.5zm1 10.25a.75.75 0 111.5 0 .75.75 0 01-1.5 0zM3.75 12a.75.75 0 100 1.5.75.75 0 000-1.5z"
    );
    // -----------------------------------------------------------
  };

  // Map through repos and pass it to render function
  repos.map((repo) => render(repo));
  // -------------------------------------------------------------
};
// ---------------------------------------------------------------

// Fetch data from github graphql API
const fetchData = async () => {
  const options = {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "bearer " + process.env.GITHUB_KEY,
    },
    body: JSON.stringify({
      query: query.repoQuery(),
    }),
  };
  const res = await fetch(process.env.BASE_URL, options);
  const data = await res.json();
  renderRepos(data);
};
// ----------------------------------------------------------------

// Calls fetchData function on load
window.onload = () => {
  fetchData();
};
// ----------------------------------------------------------------
