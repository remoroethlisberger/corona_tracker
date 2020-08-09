export const randomContaigous = () => {
  return Math.ceil(Math.random() * 5);
};

export const randomOffset = (axis) => {
  switch (axis) {
    case 'x':
      return document.documentElement.scrollWidth * Math.random();
    case 'y':
      return document.documentElement.scrollHeight * Math.random();
  }
};
