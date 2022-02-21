const lineBreak = {
  name: "\u200B",
  value: "------Command List------",
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
        name: "Once Off Payment Link Generator",

        value:
          "Create a once off payment request URL" +
          "```!onceoff <amount> <name of product/service>```",
        inline: false,
      },

      {
        name: "Monthly Subscription Link Generator",
        value:
          "Create a monthly recurring payment request URL" +
          "```!subscription <inital amount> <recurring amount> <name of product/service>```",
        inline: false,
      },
      {
        name: "Help",
        value:
          "View all available commands and how to use them" +
          "```!subscription <inital amount> <recurring amount> <name of product/service>```",
        inline: false,
      }
    );
  //Send embed message

  message.channel.send({ embeds: [embed] });

  console.log(embed);
};
