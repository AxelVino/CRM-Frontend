function loadStyle(href) {
    return new Promise((resolve, reject) => {
        let styleLink = document.querySelector(`link[href="${href}"]`);
        if (styleLink) {
            return resolve();
        }

        styleLink = document.createElement('link');
        styleLink.href = href;
        styleLink.rel = 'stylesheet';
        styleLink.type = 'text/css';
        styleLink.onload = () => resolve();
        styleLink.onerror = (err) => reject(err);
        document.head.appendChild(styleLink);
    });
}

export { loadStyle };
