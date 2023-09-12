export const encodeEmail = (email) => {
  if (!email) return null;

  const key = 128;
  const encodedKey = key.toString(16);
  const make2DigitsLong = (value) => {
    return value.length === 1 ? "0" + value : value;
  };
  let encodedString = make2DigitsLong(encodedKey);
  for (let n = 0; n < email.length; n++) {
    const charCode = email.charCodeAt(n);
    const encoded = charCode ^ key;
    const value = encoded.toString(16);
    encodedString += make2DigitsLong(value);
  }
  return encodedString;
};

export const decodeEmail = (encodedString) => {
  let email = "";
  const keyInHex = encodedString.substr(0, 2);
  const key = parseInt(keyInHex, 16);
  for (let n = 2; n < encodedString.length; n += 2) {
    const charInHex = encodedString.substr(n, 2);
    const char = parseInt(charInHex, 16);
    const output = char ^ key;
    email += String.fromCharCode(output);
  }
  return email;
};

export const flatListToHierarchical = (
  data = [],
  { idKey = "key", parentKey = "parentId", childrenKey = "children" } = {}
) => {
  const tree = [];
  const childrenOf = {};
  data.forEach((item) => {
    const newItem = { ...item };
    const { [idKey]: id, [parentKey]: parentId = 0 } = newItem;
    childrenOf[id] = childrenOf[id] || [];
    newItem[childrenKey] = childrenOf[id];
    parentId
      ? (childrenOf[parentId] = childrenOf[parentId] || []).push(newItem)
      : tree.push(newItem);
  });
  return tree;
};
export const isJSON = (string) => {
  try {
    JSON.parse(string);
  } catch (err) {
    console.log(err);
    return false;
  }
  return true;
};

export const generateJsonString = (data) => {
  try {
    let result;
    switch (true) {
      case typeof data === "string": {
        result = JSON.parse(data);
        break;
      }
      case typeof data === "object": {
        result = data || {};
        break;
      }
      case Array.isArray(data): {
        result = data;
        break;
      }
      default: {
        result = [];
      }
    }
    return result;
  } catch (e) {
    return [];
  }
};

export function youtubeParser(url) {
  var regExp =
    /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
  var match = url.match(regExp);
  return match && match[7].length == 11 ? match[7] : false;
}
