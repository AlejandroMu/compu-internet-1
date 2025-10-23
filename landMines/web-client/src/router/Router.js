export const Router = (paths) => {

    const route = window.location.pathname;

    const routeComponent = paths[route] || (() => {
        const notFound = document.createElement("p");
        notFound.innerText = "404 - Not Found";
        return notFound;
    });

    return routeComponent();

};
