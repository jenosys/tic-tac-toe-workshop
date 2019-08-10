interface Array<T> {
  randomPick(count: number): Array<T>;
}


Array.prototype.randomPick = function (number: number) {
  let self = this as [];
  let length = self.length;
  let array = self.filter((e, idx) => {
    if (Math.random() < number / (length - idx)) {
      number--;
      return true;
    }
  });

  return array;
};
