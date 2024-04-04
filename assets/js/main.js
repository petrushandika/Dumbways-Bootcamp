window.addEventListener("DOMContentLoaded", () => {
    initRoutes("dayOne", 1, "contentOne", "Creating Card");
    initRoutes("dayTwo", 2, "contentTwo", "Navbar and Contact Form");
    initRoutes("dayThree", 3, "contentThree", "Form Submission");
    initRoutes("dayFour", 4, "contentFour", "My Project Pages");
})

function initRoutes(routesId, startIndex, contentId, paragraphContent) {
    const routes = document.getElementById(routesId);
    const content = document.getElementById(contentId);
    
    const route = document.createElement("a");
    route.textContent = `Day ${startIndex} - ${paragraphContent}`;
    route.setAttribute("href", `Task/Day-${startIndex}`);
    routes.append(route);
}
