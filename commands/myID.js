module.exports = async ({ settings, message }) => {
  //   console.log(`This Message ${message} with args of ${args}`);

  const { channel, guild } = message;

  //   const myID = await payfastSettings.findOne({ _id: guild.id });

  settings.payfastKey
    ? channel.send(`Your Payfast Merchent ID is ${settings.payfastKey}`)
    : channel.send(
        `Payfast Merchent ID not found please set it using !setID <Merchent ID>`
      );
};
