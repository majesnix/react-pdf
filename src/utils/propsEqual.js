const WHITELISTED_PROPS = ['render', 'onRender', 'paint'];

const propsEqual = (a, b) => {
  const oldPropsKeys = Object.keys(a);
  const newPropsKeys = Object.keys(b);

  if (oldPropsKeys.length !== newPropsKeys.length) {
    return false;
  }

  for (let i = 0; i < oldPropsKeys.length; i++) {
    const propName = oldPropsKeys[i];

    if (WHITELISTED_PROPS.includes(propName)) {
      if (!a[propName] !== !b[propName]) {
        return false;
      }
      continue;
    }

    if (propName !== 'children' && a[propName] !== b[propName]) {
      if (
        typeof a[propName] === 'object' &&
        typeof b[propName] === 'object' &&
        propsEqual(a[propName], b[propName])
      ) {
        continue;
      }

      return false;
    }

    if (
      propName === 'children' &&
      (typeof a[propName] === 'string' ||
        typeof b[propName] === 'string' ||
        typeof a[propName] === 'number' ||
        typeof b[propName] === 'number')
    ) {
      return a[propName] === b[propName];
    }
  }

  return true;
};

export default propsEqual;
