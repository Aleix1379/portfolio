require('@testing-library/jest-dom');

// Setup for React 18 createRoot
global.document.createElement = (function(originalCreateElement) {
  return function(tagName, options) {
    if (tagName === 'div') {
      const element = originalCreateElement.call(document, tagName, options);
      // Ensure the element has the necessary properties for createRoot
      element.ownerDocument = document;
      return element;
    }
    return originalCreateElement.call(document, tagName, options);
  };
})(global.document.createElement);

// Mock for document.body
if (!global.document.body) {
  global.document.body = global.document.createElement('body');
}
