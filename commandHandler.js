const onceoff = require("./commands/onceoff");
const myid = require("./commands/myID");
const subscription = require("./commands/subscription");
const customsubscription = require("./commands/customSubscription");
const setid = require("./commands/setID");
const removeid = require("./commands/removeID");
const help = require("./commands/help");
const setcancelurl = require("./commands/setCancelURL");
const setreturnurl = require("./commands/setReturnURL");
const payfastSettings = require("./Schema/payfastSettings-schema");
const myurl = require("./commands/myURL");

let payfastSettingsCache = {};

const commands = {
  myid,
  onceoff,
  subscription,
  setid,
  removeid,
  help,
  setcancelurl,
  myurl,
  setreturnurl,
  customsubscription,
};

let commandData = {
  args: null,
  settings: payfastSettingsCache,
  message: null,
  member: null,
  channel: null,
  content: null,
  guild: null,
};

module.exports = async (message) => {
  const prefix = "!";
  const { member, channel, content, guild } = message;

  if (!message.content.startsWith(prefix)) return;

  let args = message.content.substring(prefix.length).split(" ");

  const command = args[0].toLowerCase();
  commandData = { args, message, member, channel, content, guild };
  if (commandData?.settings?._id == null) {
    try {
      const getSettings = await payfastSettings
        .findOne({ _id: guild.id })
        .then((data) => {
          payfastSettingsCache = data;
          commandData.settings = data;
          executeCommand();
          console.log("Retrieving From DB");
        });
    } catch (error) {
      channel.send(
        "An error occurd connecting to the database, please try again later"
      );
      console.log(error);
    }
  } else {
    executeCommand();
  }

  function executeCommand() {
    if (command == "help" || command == "setid") {
      return commands[command]?.(commandData);
    }

    if (commandData?.settings?.payfastKey == null) {
      if (commands[command] != null) {
        return channel.send("Please set Merchent ID before using this command");
      } else {
        return;
      }
    }

    return commands[command]?.(commandData);
  }
};
