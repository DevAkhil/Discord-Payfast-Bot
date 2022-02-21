module.exports = async ({ settings, message }) => {
  //   console.log(`This Message ${message} with args of ${args}`);

  const { channel, guild } = message;

  //   const myID = await payfastSettings.findOne({ _id: guild.id });

  settings.cancelurl
    ? channel.send(`Your Cancel URL is: ${settings.cancelurl}`)
    : channel.send(`You do not have a Cancel URL set`);

  settings.returnurl
    ? channel.send(`Your Return URL is: ${settings.cancelurl}`)
    : channel.send(`You do not have a Return URL set`);
};
