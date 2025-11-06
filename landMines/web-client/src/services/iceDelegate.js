

const getBoardDelegate = async () => {
  try {
    const communicator = Ice.initialize();

    const hostname = 'localhost';
    const proxy = communicator.stringToProxy(
      `Service:ws -h ${hostname} -p 9099`
    );

    const printer = await Game.GameServicesPrx.checkedCast(proxy);
    if (printer) {
      const resp = await printer.getBoard();
      console.log(resp);
      return resp;  
    } else {
      console.error(printer);
      return {}
    }
  } catch (ex) {
    console.error(ex.toString());
    throw ex;
  }
};

export { getBoardDelegate };
