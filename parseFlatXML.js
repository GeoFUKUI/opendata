import { DOMParser } from "https://code4fukui.github.io/xmldom-es/xmldom.js";

export const parseFlatXML = (xml) => {
  const dom = new DOMParser().parseFromString(xml, "application/xml");
  const data = {};
  const parseDOM = (dom) => {
    if (!dom.childNodes) {
      return;
    }
    for (let i = 0; i < dom.childNodes.length; i++) {
      const c = dom.childNodes[i];
      if (c.childNodes?.length == 1 && c.childNodes[0].nodeType == dom.TEXT_NODE) {
        data[c.nodeName] = c.childNodes[0].nodeValue;
      } else {
        parseDOM(c);
      }
    }
  };
  parseDOM(dom);
  return data;
};
