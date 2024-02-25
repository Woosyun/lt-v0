const f = () => {
  throw new Error('f() error!!');
}

const g = () => {
  try {
    f()
  } catch (error) {
    throw new Error(error.message + "\nand g() error!!");
  }
}
try {
  g();
} catch (error) {
  console.log(error.message);
}