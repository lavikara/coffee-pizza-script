import query from "./query/gql";

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
// -----------------------------------------------

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

// Dom render function for repository page
const renderRepos = ({ data }) => {
  console.log(data);
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
