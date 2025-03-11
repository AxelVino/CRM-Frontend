function loadScript(src) {
    return new Promise((resolve, reject) => {

        let script = document.querySelector(`script[src="${src}"]`);
        if (script) {
            script.remove();
        }
        script = document.createElement("script");
        script.src = src;
        script.type = "module";
        script.onload = () => resolve();
        script.onerror = (err) => reject(err);
        document.body.appendChild(script);
    });
}

export { loadScript };