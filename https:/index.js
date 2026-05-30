index.js const { Client, GatewayIntentBits, EmbedBuilder, PermissionsBitField } = require("discord.js");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
  ],
});

// CONFIGURAÇÃO
const PREFIX = "/";
const CANAL_ANUNCIOS = "COLOQUE_ID_DO_CANAL_AQUI";

client.on("ready", () => {
  console.log(`Bot online como ${client.user.tag}`);

  // ANÚNCIOS AUTOMÁTICOS
  setInterval(() => {
    const channel = client.channels.cache.get(CANAL_ANUNCIOS);
    if (!channel) return;

    channel.send(`
🎉 **BAILE DO SALGUEIRO ABERTO!**

🔊 Som rolando
💃 Pista liberada
🔥 Chama a tropa!
    `);
  }, 30 * 60 * 1000); // 30 minutos
});

// COMANDOS
client.on("messageCreate", async (message) => {
  if (message.author.bot) return;

  const args = message.content.slice(PREFIX.length).trim().split(/ +/);
  const cmd = args.shift()?.toLowerCase();

  // ABRIR BAILE
  if (cmd === "abrir") {
    message.channel.send("🔴 BAILE DO SALGUEIRO ABERTO!");
  }

  // FECHAR BAILE
  if (cmd === "fechar") {
    message.channel.send("⚫ BAILE ENCERRADO!");
  }

  // CLEAR CHAT
  if (cmd === "clear") {
    if (!message.member.permissions.has(PermissionsBitField.Flags.ManageMessages)) return;
    const amount = parseInt(args[0]);
    if (!amount) return message.reply("Digite a quantidade!");
    message.channel.bulkDelete(amount);
  }

  // BAN
  if (cmd === "ban") {
    if (!message.member.permissions.has(PermissionsBitField.Flags.BanMembers)) return;
    const user = message.mentions.members.first();
    if (!user) return message.reply("Mencione alguém!");
    user.ban();
    message.channel.send("Usuário banido.");
  }

  // KICK
  if (cmd === "kick") {
    if (!message.member.permissions.has(PermissionsBitField.Flags.KickMembers)) return;
    const user = message.mentions.members.first();
    if (!user) return message.reply("Mencione alguém!");
    user.kick();
    message.channel.send("Usuário expulso.");
  }

  // TICKET SIMPLES
  if (cmd === "ticket") {
    message.guild.channels.create({
      name: `ticket-${message.author.username}`,
      type: 0,
      permissionOverwrites: [
        {
          id: message.guild.id,
          deny: ["ViewChannel"],
        },
        {
          id: message.author.id,
          allow: ["ViewChannel", "SendMessages"],
        },
      ],
    });

    message.reply("🎫 Ticket criado!");
  }
});

client.login("COLOQUE_SEU_TOKEN_AQUI");
