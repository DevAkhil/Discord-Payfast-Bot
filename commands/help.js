const lineBreak = {
  name: "\u200B",
  value: "------Setup Commands------",
};

const pfBreak = {
  name: "\u200B",
  value: "------Payfast Commands------",
};

const gBreak = {
  name: "\u200B",
  value: "------Glossary------",
};
const space = { name: "\u200B", value: " " };
const { MessageEmbed } = require("discord.js");

module.exports = ({ message }) => {
  let embed = new MessageEmbed()
    .setTitle("Payfast Payment Link Generator BOT | Help Commands")
    .setDescription(
      "Here you can view all available commands and how to use them. Please set your Payfast Merchent ID before attempting to use any other functionality of this bot. View this article if you are unsure what your merchent ID is https://support.payfast.co.za/portal/en/kb/articles/where-is-my-merchant-id-and-key"
    )
    .setAuthor({
      name: "Akhil Ishwarlaal",
      iconURL: "https://i.imgur.com/AfFp7pu.png",
      url: "https://github.io/devakhil",
    })
    .setColor("RED")

    .addFields(
      lineBreak,

      {
        name: "Set Merchent ID",
        value:
          "Set Payfast Merchent ID for link generation (Required)" +
          "```!setID <Payfast Merchent ID>```",
        inline: false,
      },
      {
        name: "View Merchent ID",
        value: "View current Merchent ID for this server" + "```!myID```",
        inline: false,
      },

      {
        name: "Set Return URL (Optional)",
        value:
          "Set the Return URL your customer will visit upon completing payment" +
          "```!setReturnURL```",
        inline: false,
      },

      {
        name: "Set Cancel URL (Optional)",
        value:
          "Set the Return URL your customer will visit upon completing payment" +
          "```!setCancelURL```",
        inline: false,
      },

      {
        name: "Help",
        value:
          "View all available commands and how to use them" + "```!help```",
        inline: false,
      },

      {
        name: "Help",
        value:
          "View all available commands and how to use them" + "```!help```",
        inline: false,
      },

      pfBreak,

      {
        name: "Once Off Payment Link Generator",

        value:
          "Create a once off payment request URL" +
          "```!onceoff <amount> <name of product/service>```",
        inline: false,
      },

      {
        name: "Monthly Subscription Link Generator",
        value:
          "Create a infinite monthly recurring payment request URL" +
          "```!subscription <inital amount> <recurring amount> <name of product/service>```",
        inline: false,
      },
      {
        name: "Custom Subscription Link Generator",
        value:
          "Create a custom recurring payment request URL with frequncy and cycles" +
          "```!subscription <inital amount> <recurring amount> <cycles> <frequency> <name of product/service>```",
        inline: false,
      },
      gBreak,
      {
        name: "Subscription Frequency Types",
        value:
          "When will the recurring amount be charged" +
          "```Monthly```" +
          "```Quarterly```" +
          "```Biannually```" +
          "```Annually```",
        inline: true,
      },
      {
        name: "Cycles",
        value:
          "How many times will this subscriptions occur (eg. 5 with frequency type monthly = 5 months) ***!Tip: 0 = infinite ",

        inline: false,
      }
    );
  //Send embed message

  message.channel.send({ embeds: [embed] });

  console.log(embed);
};
