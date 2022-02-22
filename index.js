const { Client, Intents, MessageEmbed } = require("discord.js");
const { MongoClient } = require("mongodb");
const { Mongoose, connect } = require("mongoose");
var validator = require("validator");
const myID = require("./commands/myID");
const subscription = require("./commands/subscription");
const onceoff = require("./commands/onceoff");
const commandHandler = require("./commandHandler");
require("dotenv").config();
const payfastSettings = require("./Schema/payfastSettings-schema");

const token = process.env.TOKEN;
const mongoURL = process.env.MONGO_URI;

let payfastSettingsCache = {};
const client = new Client({
  intents: [
    "DIRECT_MESSAGES",
    "DIRECT_MESSAGE_REACTIONS",
    "GUILD_MESSAGES",
    "GUILD_MESSAGE_REACTIONS",
    "GUILDS",
  ],
  partials: ["MESSAGE", "CHANNEL", "REACTION"],
});

Mongoose,
  connect(mongoURL, {
    useNewURLParser: true,
    useUnifiedTopology: true,
  })
    .then((m) => {
      console.log("Connected to DB");
    })
    .catch((err) => console.log(err));

client.on("ready", async () => {});

client.on("ready", () => {
  console.log("Bot Is Ready!");
});

// client.on("messageCreate", async (message) => {
//   const command = (settings) => {
//     if (args[0] === "payfast") {
//       if (settings.payfastKey == null) {
//         channel.send(
//           "Payfast Error: Please Set a Payfast Key Using !setPayfast <Key>"
//         );

//         return;
//       }

//       let itemName = args.slice(4).join("+");
//       let itemPrice = args[2];
//       let itemRecurring = args[3];

//       if (args[1] === "subscription") {
//         subscription(args, settings, message);
//       } else if (args[1] === "onceoff") {
//         onceoff(args, settings, message);
//       }
//       message.delete();
//     }
//   };

//   if (args[0] == "myID") {
//     myID(payfastSettings, channel, guild);
//   }

//   if (args[0] == "removePayfast") {
//     const setSettings = await payfastSettings.findOneAndUpdate(
//       {
//         _id: guild.id,
//       },
//       {
//         _id: guild.id,
//         channelId: channel.id,
//         payfastKey: null,
//       },
//       { upsert: true }
//     );

//     channel.send("Payfast Merchent Key Has Been Removed");
//   }

//   if (args[0] == "setPayfast") {
//     if (!member.permissions.has("ADMINSTRATOR")) {
//       channel.send("You do not have permission to run this command.");
//       return;
//     }

//     if (!(args[1].length == 8 && validator.isNumeric(args[1]))) {
//       channel.send(
//         "Invalid Merchent Key. Please Ensure You Have Entered a Valid Key. Type !help for More Information"
//       );
//       return;
//     }

//     const setSettings = await payfastSettings.findOneAndUpdate(
//       {
//         _id: guild.id,
//       },
//       {
//         _id: guild.id,
//         channelId: channel.id,
//         payfastKey: args[1],
//       },
//       { upsert: true }
//     );

//     settings = { _id: guild.id, channelId: channel.id, payfastKey: args[1] };
//     payfastSettingsCache = settings;
//     channel.send(`Your New Payfast Key is ${args[1]}`);
//   }

//   const lineBreak = { name: "\u200B", value: "------------------------" };

//   if (args[0] == "help") {
//     let embed = new MessageEmbed()
//       .setTitle("Payfast Payment Link Generator BOT | Help Commands")
//       .setDescription("View the below commands and utilize ")
//       .setAuthor({
//         name: "Akhil Ishwarlaal",
//         iconURL: "https://i.imgur.com/AfFp7pu.png",
//         url: "https://github.io/devakhil",
//       })
//       .setColor("RED")

//       .addFields(
//         { name: "Regular field title", value: "Some value here" },
//         lineBreak,
//         {
//           name: "Once Off Payment",
//           value: "```!payfast onceoff <amount> <name of product/service>```",
//           inline: false,
//         },

//         {
//           name: "Subscription",
//           value:
//             "```!payfast subscription <inital amount> <recurring amount> <name of product/service>```",
//           inline: false,
//         }
//       );
//     //Send embed message

//     message.channel.send({ embeds: [embed] });

//     console.log(embed);
//   }
// });

client.on("messageCreate", commandHandler);

client.login(token);
