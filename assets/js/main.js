window.addEventListener("DOMContentLoaded", () => {
    initRoutes("routes1", 1, "content1", "Creating Card");
    initRoutes("routes2", 2, "content2", "Navbar and Contact Form");
})

function initRoutes(routesId, startIndex, contentId, paragraphContent) {
    const routes = document.getElementById(routesId);
    const content = document.getElementById(contentId);
    
    const route = document.createElement("a");
    route.textContent = `Day ${startIndex} - ${paragraphContent}`;
    route.setAttribute("href", `Task/Day-${startIndex}`);
    routes.append(route);
}
