const payfastSettings = require("../Schema/payfastSettings-schema");
var validator = require("validator");

module.exports = async ({
  args,
  settings,
  message,
  member,
  guild,
  channel,
}) => {
  if (!member.permissions.has("ADMINSTRATOR")) {
    channel.send("You do not have permission to run this command.");
    return;
  }

  if (!(args[1].length == 8 && validator.isNumeric(args[1]))) {
    channel.send(
      "Invalid Merchent ID: Please Ensure You Have Entered a Valid ID. Type !help for More Information"
    );
    return;
  }

  const setSettings = await payfastSettings
    .findOneAndUpdate(
      {
        _id: guild.id,
      },
      {
        _id: guild.id,
        channelId: channel.id,
        payfastKey: args[1],
      },
      { upsert: true }
    )
    .then((data) => {
      settings = data;
    });

  channel.send(`Success: Your New Payfast Merchent ID is ${args[1]}`);
};
