export const randomContaigous = () => {
  return Math.ceil(Math.random() * 5);
};

export const randomOffset = (axis) => {
  switch (axis) {
    case 'x':
      return window.innerWidth * Math.random();
    case 'y':
      return window.innerHeight * Math.random();
  }
};
