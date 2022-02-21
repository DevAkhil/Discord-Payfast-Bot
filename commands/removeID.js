const payfastSettings = require("../Schema/payfastSettings-schema");

module.exports = async ({ channel, guild, settings }) => {
  const removeID = await payfastSettings
    .findOneAndUpdate(
      {
        _id: guild.id,
      },
      {
        _id: guild.id,
        channelId: channel.id,
        payfastKey: null,
      },
      { upsert: true }
    )
    .then((data) => {
      settings = data;
    });

  channel.send("Payfast Merchent ID Has Been Removed");
};
