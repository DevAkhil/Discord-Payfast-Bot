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

  if (validator.isURL(args[1], { require_protocol: true })) {
    const setSettings = await payfastSettings
      .findOneAndUpdate(
        {
          _id: guild.id,
        },
        {
          _id: guild.id,
          channelId: channel.id,
          returnurl: args[1],
        },
        { upsert: true }
      )
      .then((data) => {
        settings = data;
      });

    return channel.send(`Success: Your New Payfast Return URL is ${args[1]}`);
  }

  return channel.send(
    "Invalid URL Provided. Follow format: ```https://website.com/``` Protocol (eg. https://) required in url"
  );
};
