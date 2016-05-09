//
// This is merely an example of how a custom inline editor implementation could look like
//

export default el => {
    const savedContents = el.innerHTML;
    const textarea = document.createElement('textarea');
    textarea.innerHTML = savedContents;

    el.parentNode.replaceChild(textarea, el);
};
